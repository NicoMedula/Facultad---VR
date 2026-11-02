// ============================================
// COMPONENTE AULA-CULLING
// Las paredes no tapan lo que está detrás, así que el visor
// dibujaba todas las aulas a la vez. Solo se muestra el contenido
// (paneles, botones, pupitres) de las aulas que se pueden ver.
// ============================================
AFRAME.registerComponent("aula-culling", {
  init: function () {
    this.aulas = [];
    this.last = 0;
    var self = this;
    this.el.sceneEl.addEventListener("loaded", function () {
      document.querySelectorAll("[generar-aula]").forEach(function (el) {
        var p = el.components["generar-aula"].data.posicionXYZ;
        var floor = document.getElementById(el.id + "-suelo");
        var fp = floor.getAttribute("position");
        self.aulas.push({
          content: el.querySelector(".aula-contenido").object3D,
          z: p.z,
          cx: p.x + fp.x,
          cz: p.z + fp.z,
          hw: parseFloat(floor.getAttribute("width")) / 2,
          hd: parseFloat(floor.getAttribute("height")) / 2,
        });
      });
      self.refresh();
    });
  },

  refresh: function () {
    var pos = this.el.object3D.position;
    var inside = null;
    if (Math.abs(pos.x) > 2.05) {
      inside = this.aulas.find(function (a) {
        return Math.abs(pos.x - a.cx) <= a.hw && Math.abs(pos.z - a.cz) <= a.hd;
      });
    }
    this.aulas.forEach(function (a) {
      // Desde un aula se ve la de enfrente (puertas alineadas);
      // desde el pasillo, las aulas cercanas.
      a.content.visible = inside
        ? Math.abs(a.z - inside.z) < 1
        : Math.abs(pos.z - a.z) < 6;
    });
  },

  tick: function (time) {
    if (time - this.last < 200) return;
    this.last = time;
    this.refresh();
  },
});
