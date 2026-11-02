// ============================================
// COMPONENTE PLAYER-MOVEMENT
// WASD + colisión + gravedad en un solo componente.
// Calcula bounding boxes manualmente para evitar
// errores de setFromObject con entidades anidadas.
// Compatible con VR (teleport sigue funcionando).
// ============================================
AFRAME.registerComponent("player-movement", {
  schema: {
    speed: { type: "number", default: 4 },
    radius: { type: "number", default: 0.35 },
  },

  init: function () {
    this.keys = {};
    this.wallBoxes = [];
    this.forward = new THREE.Vector3();
    this.rightDir = new THREE.Vector3();
    this.tempBox = new THREE.Box3();
    this.ready = false;

    // Escuchar teclas
    this.onKeyDown = function (e) {
      this.keys[e.code] = true;
    }.bind(this);
    this.onKeyUp = function (e) {
      this.keys[e.code] = false;
    }.bind(this);
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);

    // Esperar a que la escena renderice un frame para que
    // las matrices de mundo estén actualizadas
    var self = this;
    this.el.sceneEl.addEventListener("loaded", function () {
      setTimeout(function () {
        self.buildCollisionBoxes();
        self.ready = true;
      }, 500);
    });
  },

  // Construir bounding boxes MANUALMENTE desde atributos
  // (no usa setFromObject que puede fallar con grupos anidados)
  buildCollisionBoxes: function () {
    this.wallBoxes = [];
    var walls = document.querySelectorAll(".collidable");
    var self = this;

    walls.forEach(function (wall) {
      // Leer dimensiones desde los atributos HTML
      var h = parseFloat(wall.getAttribute("height") || 1);

      // FILTRO: solo paredes estructurales (height >= 1m)
      // Esto ignora botones de menú (height 0.3-0.4m)
      if (h < 1.0) return;

      // Forzar actualización de la matriz de mundo
      wall.object3D.updateWorldMatrix(true, false);

      // Obtener posición en el MUNDO (no local)
      var worldPos = new THREE.Vector3();
      wall.object3D.getWorldPosition(worldPos);

      var w = parseFloat(wall.getAttribute("width") || 1) / 2;
      h = h / 2;
      var d = parseFloat(wall.getAttribute("depth") || 1) / 2;

      var box = new THREE.Box3(
        new THREE.Vector3(worldPos.x - w, worldPos.y - h, worldPos.z - d),
        new THREE.Vector3(worldPos.x + w, worldPos.y + h, worldPos.z + d),
      );

      self.wallBoxes.push(box);
    });

    console.log("Colision lista:", this.wallBoxes.length, "paredes");

    // Debug: mostrar las cajas que bloquean la zona del pasillo
    var debugCount = 0;
    for (var i = 0; i < this.wallBoxes.length; i++) {
      var b = this.wallBoxes[i];
      // Si la caja está cerca del centro del pasillo
      if (b.min.x < 1 && b.max.x > -1 && b.min.z < 7 && b.max.z > 5) {
        console.log(
          "Caja cerca del spawn:",
          i,
          "X[" + b.min.x.toFixed(1) + "," + b.max.x.toFixed(1) + "]",
          "Y[" + b.min.y.toFixed(1) + "," + b.max.y.toFixed(1) + "]",
          "Z[" + b.min.z.toFixed(1) + "," + b.max.z.toFixed(1) + "]",
        );
        debugCount++;
      }
    }
    if (debugCount === 0) {
      console.log("Ninguna caja bloquea la zona de spawn");
    }
  },

  // Verificar si posición (x, z) colisiona con alguna pared
  checkCollision: function (x, z) {
    var r = this.data.radius;
    // Solo verificar colisión en la franja de altura del jugador (0.2 a 1.5m)
    this.tempBox.min.set(x - r, 0.2, z - r);
    this.tempBox.max.set(x + r, 1.5, z + r);
    for (var i = 0; i < this.wallBoxes.length; i++) {
      if (this.wallBoxes[i].intersectsBox(this.tempBox)) {
        return true;
      }
    }
    return false;
  },

  tick: function (time, delta) {
    if (!this.ready || !delta || delta > 200) return;

    var pos = this.el.object3D.position;

    // GRAVEDAD: rig siempre a nivel del suelo
    pos.y = 0;

    // Solo procesar movimiento si hay teclas presionadas
    var anyKey =
      this.keys["KeyW"] ||
      this.keys["KeyS"] ||
      this.keys["KeyA"] ||
      this.keys["KeyD"] ||
      this.keys["ArrowUp"] ||
      this.keys["ArrowDown"] ||
      this.keys["ArrowLeft"] ||
      this.keys["ArrowRight"];
    if (!anyKey) return;

    var speed = this.data.speed;
    var dt = delta / 1000;

    // Obtener cámara para dirección de mirada
    var cam = this.el.querySelector("[camera]");
    if (!cam) return;

    // Vector "adelante" (sin componente Y)
    this.forward.set(0, 0, -1);
    this.forward.applyQuaternion(cam.object3D.quaternion);
    this.forward.y = 0;
    if (this.forward.length() > 0.001) this.forward.normalize();

    // Vector "derecha" (sin componente Y)
    this.rightDir.set(1, 0, 0);
    this.rightDir.applyQuaternion(cam.object3D.quaternion);
    this.rightDir.y = 0;
    if (this.rightDir.length() > 0.001) this.rightDir.normalize();

    // Calcular dirección según teclas
    var moveX = 0,
      moveZ = 0;

    if (this.keys["KeyW"] || this.keys["ArrowUp"]) {
      moveX += this.forward.x;
      moveZ += this.forward.z;
    }
    if (this.keys["KeyS"] || this.keys["ArrowDown"]) {
      moveX -= this.forward.x;
      moveZ -= this.forward.z;
    }
    if (this.keys["KeyA"] || this.keys["ArrowLeft"]) {
      moveX -= this.rightDir.x;
      moveZ -= this.rightDir.z;
    }
    if (this.keys["KeyD"] || this.keys["ArrowRight"]) {
      moveX += this.rightDir.x;
      moveZ += this.rightDir.z;
    }

    // Normalizar diagonal
    var len = Math.sqrt(moveX * moveX + moveZ * moveZ);
    if (len < 0.01) return;
    moveX = (moveX / len) * speed * dt;
    moveZ = (moveZ / len) * speed * dt;

    var newX = pos.x + moveX;
    var newZ = pos.z + moveZ;

    // SLIDING: verificar cada eje por separado
    var xBlocked = this.checkCollision(newX, pos.z);
    var zBlocked = this.checkCollision(pos.x, newZ);

    if (!xBlocked) pos.x = newX;
    if (!zBlocked) pos.z = newZ;
  },

  remove: function () {
    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("keyup", this.onKeyUp);
  },
});

// ============================================
// COMPONENTE THUMBSTICK-LOCOMOTION
// Locomoción suave con joystick del Quest.
// Respeta la colisión del player-movement.
// ============================================
AFRAME.registerComponent("thumbstick-locomotion", {
  schema: {
    rig: { type: "selector" },
    camera: { type: "selector" },
    speed: { type: "number", default: 3 },
    deadzone: { type: "number", default: 0.15 },
  },

  init: function () {
    this.axis = { x: 0, y: 0 };
    this.forward = new THREE.Vector3();
    this.rightDir = new THREE.Vector3();

    var self = this;
    this.onAxisMove = function (evt) {
      var a = evt.detail.axis;
      // xr-standard: [0,1]=touchpad, [2,3]=thumbstick
      if (a && a.length >= 4) {
        self.axis.x = a[2];
        self.axis.y = a[3];
      } else if (a && a.length >= 2) {
        self.axis.x = a[0];
        self.axis.y = a[1];
      }
    };
    this.el.addEventListener("axismove", this.onAxisMove);
  },

  tick: function (time, delta) {
    if (!delta || delta > 200) return;
    var dz = this.data.deadzone;
    var ax = Math.abs(this.axis.x) < dz ? 0 : this.axis.x;
    var ay = Math.abs(this.axis.y) < dz ? 0 : this.axis.y;
    if (ax === 0 && ay === 0) return;

    var rig = this.data.rig;
    var cam = this.data.camera;
    if (!rig || !cam) return;

    // Dirección según la cámara (HMD)
    this.forward.set(0, 0, -1).applyQuaternion(cam.object3D.quaternion);
    this.forward.y = 0;
    if (this.forward.length() > 0.001) this.forward.normalize();
    this.rightDir.set(1, 0, 0).applyQuaternion(cam.object3D.quaternion);
    this.rightDir.y = 0;
    if (this.rightDir.length() > 0.001) this.rightDir.normalize();

    // ay es adelante/atrás (negativo = adelante), ax es lateral
    var moveX = this.rightDir.x * ax - this.forward.x * ay;
    var moveZ = this.rightDir.z * ax - this.forward.z * ay;

    var len = Math.sqrt(moveX * moveX + moveZ * moveZ);
    if (len < 0.01) return;
    var dt = delta / 1000;
    var mag = Math.min(Math.sqrt(ax * ax + ay * ay), 1);
    moveX = (moveX / len) * this.data.speed * dt * mag;
    moveZ = (moveZ / len) * this.data.speed * dt * mag;

    var pos = rig.object3D.position;
    var pm = rig.components["player-movement"];
    var newX = pos.x + moveX;
    var newZ = pos.z + moveZ;

    // Reutilizar colisión de player-movement si está lista
    if (pm && pm.ready) {
      if (!pm.checkCollision(newX, pos.z)) pos.x = newX;
      if (!pm.checkCollision(pos.x, newZ)) pos.z = newZ;
    } else {
      pos.x = newX;
      pos.z = newZ;
    }
  },

  remove: function () {
    this.el.removeEventListener("axismove", this.onAxisMove);
  },
});
