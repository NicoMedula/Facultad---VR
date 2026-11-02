// ============================================
// COMPONENTE TRACK-RECORRIDO
// Detecta en que aula esta el jugador y reporta
// entrada/salida con permanencia a GA4 + Clarity.
// ============================================
AFRAME.registerComponent("track-recorrido", {
  init: function () {
    this.zonas = [];
    this.actual = null;
    this.desde = 0;
    this.ultimoTick = 0;
    var self = this;

    // Las aulas ya vienen parseadas por el componente generar-aula
    this.el.sceneEl.addEventListener("loaded", function () {
      document.querySelectorAll("[generar-aula]").forEach(function (el) {
        var cfg = el.components["generar-aula"].data;
        self.zonas.push({
          nombre: el.id,
          tipo: cfg.tipo,
          x: cfg.posicionXYZ.x,
          z: cfg.posicionXYZ.z,
        });
      });
    });

    this.onUnload = function () {
      self.salir();
    };
    window.addEventListener("pagehide", this.onUnload);
  },

  zonaEn: function (x, z) {
    for (var i = 0; i < this.zonas.length; i++) {
      var a = this.zonas[i];
      if (
        Math.abs(x - a.x) <= 4 &&
        Math.abs(z - a.z) <= 3
      ) {
        return a;
      }
    }
    return null;
  },

  salir: function () {
    if (!this.actual) return;
    track("salir_aula", {
      aula: this.actual.nombre,
      tipo: this.actual.tipo,
      segundos: Math.round((Date.now() - this.desde) / 1000),
    });
    this.actual = null;
    window.aulaActual = "pasillo";
  },

  tick: function (time) {
    if (time - this.ultimoTick < 500) return;
    this.ultimoTick = time;

    var p = this.el.object3D.position;
    var zona = this.zonaEn(p.x, p.z);
    if (zona === this.actual) return;

    this.salir();
    if (zona) {
      this.actual = zona;
      this.desde = Date.now();
      window.aulaActual = zona.nombre;
      track("entrar_aula", { aula: zona.nombre, tipo: zona.tipo });
    }
  },

  remove: function () {
    window.removeEventListener("pagehide", this.onUnload);
  },
});
