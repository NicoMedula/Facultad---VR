function generarAula(id, posicionXYZ, colorParedes, tipo, targetEl) {
  var aula = targetEl || document.createElement("a-entity");
  var scene = document.querySelector("a-scene");
  id = id || "aula";
  tipo = tipo || "base";
  colorParedes = colorParedes || "#ffffff";

  while (aula.firstChild) aula.removeChild(aula.firstChild);
  aula.setAttribute("id", id);
  aula.setAttribute("position", vectorToString(posicionXYZ));
  aula.setAttribute("data-aula-tipo", tipo);

  var content = appendEl(aula, "a-entity", { class: "aula-contenido" });
  addBaseClassroom(aula, content, id, posicionXYZ, colorParedes);
  addAulaSign(aula, id, tipo, posicionXYZ);

  if (tipo === "matematica") {
    buildMathContent(content);
  } else if (tipo === "algoritmos") {
    buildAlgorithmContent(content);
  } else if (tipo === "cpu" || tipo === "fisica" || tipo === "probabilidad" || tipo === "complejidad") {
    buildPlaceholderContent(content, id, tipo, posicionXYZ);
  }

  if (!targetEl && scene) scene.appendChild(aula);
  return aula;
}

AFRAME.registerComponent("generar-aula", {
  schema: {
    posicionXYZ: { type: "vec3", default: { x: 0, y: 0, z: 0 } },
    colorParedes: { type: "color", default: "#ffffff" },
    tipo: { type: "string", default: "base" },
  },

  init: function () {
    generarAula(
      this.el.id,
      this.data.posicionXYZ,
      this.data.colorParedes,
      this.data.tipo,
      this.el,
    );
  },
});
