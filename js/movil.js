// ============================================
// MODO LIVIANO (móvil / visor standalone)
// Corre antes de que A-Frame inicialice la escena.
// ============================================
if (LITE) {
  document.querySelector("a-scene").setAttribute("shadow", "enabled: false");
  document.querySelectorAll("#pasillo a-light[type=point]").forEach(function (l) {
    l.parentNode.removeChild(l);
  });
  // Compensa la luz de las lámparas que se quitaron.
  document.querySelector("a-light[type=ambient]").setAttribute("intensity", "0.55");
}

// ============================================
// CONTROLES MÓVILES
// Fuera de VR: flechas en pantalla + botón ● para usar
// lo que apunta el círculo. En VR (Cardboard): flechas 3D
// a los pies; mirarlas hace caminar, tocar la pantalla usa botones.
// ============================================
function setMoveKey(key, on) {
  var pm = document.getElementById("rig").components["player-movement"];
  if (pm) pm.keys[key] = on;
}

function clickGazeTarget() {
  var cursorEl = document.querySelector("a-cursor");
  var cursor = cursorEl && cursorEl.components.cursor;
  if (cursor && cursor.intersectedEl) {
    cursor.intersectedEl.emit("click", { cursorEl: cursorEl, intersection: cursor.intersection });
  }
}

var VR_PAD_ARROWS = [
  ["ArrowUp", "0 0.3 0", 0],
  ["ArrowDown", "0 -0.3 0", 180],
  ["ArrowLeft", "-0.3 0 0", 90],
  ["ArrowRight", "0.3 0 0", -90],
];

AFRAME.registerComponent("vr-move-pad", {
  init: function () {
    var self = this;
    this.camera = document.getElementById("camera").object3D;
    this.hovered = null;
    this.yaw = null;
    this.dir = new THREE.Vector3();

    var panel = appendEl(this.el, "a-entity", { position: "0 0 -0.8", rotation: "-50 0 0" });
    VR_PAD_ARROWS.forEach(function (cfg) {
      var arrow = appendEl(panel, "a-entity", { class: "clickable", position: cfg[1] });
      var bg = appendEl(arrow, "a-circle", { radius: "0.13", color: "#1E293B", opacity: "0.75", material: "shader: flat" });
      appendEl(arrow, "a-triangle", {
        position: "0 0 0.005",
        rotation: "0 0 " + cfg[2],
        scale: "0.14 0.14 0.14",
        color: "#FFFFFF",
        material: "shader: flat",
      });
      arrow.addEventListener("mouseenter", function () {
        self.hovered = cfg[0];
        setMoveKey(cfg[0], true);
        bg.setAttribute("color", "#4CAF50");
      });
      arrow.addEventListener("mouseleave", function () {
        if (self.hovered === cfg[0]) self.hovered = null;
        setMoveKey(cfg[0], false);
        bg.setAttribute("color", "#1E293B");
      });
    });
    appendEl(panel, "a-text", {
      value: "Mirá una flecha para caminar\nTocá la pantalla para usar un botón",
      position: "0 -0.55 0",
      align: "center",
      width: "1.2",
      color: "#FFFFFF",
    });
  },

  tick: function () {
    // El panel sigue la posición de la cabeza y gira con ella
    // solo cuando no se está mirando una flecha.
    var cam = this.camera;
    this.el.object3D.position.set(cam.position.x, cam.position.y - 1.0, cam.position.z);
    if (this.hovered) return;
    cam.getWorldDirection(this.dir);
    // dir es el eje +Z de la cabeza (mira hacia -Z).
    var yaw = Math.atan2(this.dir.x, this.dir.z);
    var diff = this.yaw === null ? Infinity : Math.abs(Math.atan2(Math.sin(yaw - this.yaw), Math.cos(yaw - this.yaw)));
    if (diff > 0.6) {
      this.yaw = yaw;
      this.el.object3D.rotation.y = yaw;
    }
  },

  remove: function () {
    VR_PAD_ARROWS.forEach(function (cfg) {
      setMoveKey(cfg[0], false);
    });
  },
});

document.addEventListener("DOMContentLoaded", function () {
  if (!IS_TOUCH_PHONE) return;
  var scene = document.querySelector("a-scene");
  var pad = document.getElementById("mobile-pad");
  document.body.classList.add("touch");
  pad.hidden = false;

  pad.querySelectorAll("[data-key]").forEach(function (btn) {
    var key = btn.getAttribute("data-key");
    function set(on) {
      setMoveKey(key, on);
      btn.classList.toggle("activo", on);
    }
    btn.addEventListener("pointerdown", function (e) {
      e.preventDefault();
      btn.setPointerCapture(e.pointerId);
      set(true);
    });
    ["pointerup", "pointercancel", "lostpointercapture"].forEach(function (type) {
      btn.addEventListener(type, function () {
        set(false);
      });
    });
  });
  document.getElementById("pad-use").addEventListener("click", clickGazeTarget);

  // En VR inmersivo la pantalla no muestra el HTML: se usan las flechas 3D.
  scene.addEventListener("enter-vr", function () {
    if (!scene.xrSession) return;
    pad.hidden = true;
    appendEl(document.getElementById("rig"), "a-entity", { id: "vr-pad", "vr-move-pad": "" });
  });
  scene.addEventListener("exit-vr", function () {
    pad.hidden = false;
    var vrPad = document.getElementById("vr-pad");
    if (vrPad) vrPad.parentNode.removeChild(vrPad);
  });
});
