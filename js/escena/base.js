// ============================================
// GENERADOR DE AULAS
// Construye aulas completas desde JavaScript
// para evitar bloques HTML duplicados.
// ============================================
var AULA_CONFIG = {
  width: 9,
  depth: 7,
  height: 4.5,
  wallThickness: 0.3,
};

function vectorToString(value) {
  if (typeof value === "string") return value;
  if (!value) return "0 0 0";
  return (value.x || 0) + " " + (value.y || 0) + " " + (value.z || 0);
}

function getAulaSide(posicionXYZ) {
  var x =
    typeof posicionXYZ === "string"
      ? parseFloat(posicionXYZ.split(" ")[0])
      : posicionXYZ && typeof posicionXYZ.x === "number"
        ? posicionXYZ.x
        : 0;
  return x < 0 ? -1 : 1;
}

function createEl(tag, attrs, children) {
  var el = document.createElement(tag);
  attrs = attrs || {};
  Object.keys(attrs).forEach(function (name) {
    if (attrs[name] !== undefined && attrs[name] !== null) {
      el.setAttribute(name, attrs[name]);
    }
  });
  (children || []).forEach(function (child) {
    el.appendChild(child);
  });
  return el;
}

function appendEl(parent, tag, attrs, children) {
  var el = createEl(tag, attrs, children);
  parent.appendChild(el);
  return el;
}

function wallMaterial(colorParedes, repeat) {
  return (
    "src: #textura-pared; color: " +
    colorParedes +
    "; repeat: " +
    repeat +
    "; roughness: 0.85"
  );
}

function addWall(parent, attrs, colorParedes, repeat) {
  attrs = Object.assign(
    {
      src: "#textura-pared",
      class: "collidable",
      material: wallMaterial(colorParedes, repeat),
      shadow: "cast: true; receive: true",
    },
    attrs,
  );
  return appendEl(parent, "a-box", attrs);
}

function addText(parent, attrs) {
  return appendEl(parent, "a-text", attrs);
}

function addButton(parent, config) {
  var button = appendEl(parent, "a-entity", {
    id: config.id,
    position: config.position,
    rotation: config.rotation,
    class: "clickable",
    "btn-action": config.action,
  });

  appendEl(button, "a-box", {
    width: config.width || "0.9",
    height: config.height || "0.3",
    depth: config.depth || "0.05",
    color: config.color,
    opacity: "0.9",
    animation__mouseenter:
      "property: scale; to: 1.1 1.1 1.1; startEvents: mouseenter; dur: 200",
    animation__mouseleave:
      "property: scale; to: 1 1 1; startEvents: mouseleave; dur: 200",
  });

  addText(button, {
    id: config.labelId,
    value: config.label,
    align: "center",
    color: config.textColor || "#fff",
    width: config.textWidth || "2.5",
    position: config.textPosition || "0 0 0.03",
  });

  return button;
}

// parent = estructura (siempre visible); content = lo que se oculta
// cuando el jugador está lejos del aula (ver componente aula-culling).
function addBaseClassroom(parent, content, id, posicionXYZ, colorParedes) {
  var side = getAulaSide(posicionXYZ);
  var boardX = side * 4;
  var hallX = -side * 4;
  var facingRotation = "0 " + -side * 90 + " 0";
  var deskRotation = "0 " + side * 90 + " 0";

  appendEl(parent, "a-plane", {
    id: id + "-suelo",
    class: "navegable",
    width: AULA_CONFIG.width,
    height: AULA_CONFIG.depth,
    rotation: "-90 0 0",
    position: "0 0.01 0",
    material: "src: #textura-suelo; repeat: 4 3; roughness: 0.7",
    shadow: "receive: true",
  });

  appendEl(parent, "a-plane", {
    width: AULA_CONFIG.width,
    height: AULA_CONFIG.depth,
    rotation: "90 0 0",
    position: "0 3.5 0",
    material: "color: #f0ece4; roughness: 0.9",
  });

  addWall(
    parent,
    {
      width: "0.2",
      height: "3.5",
      depth: "6",
      position: boardX + " 1.75 0",
    },
    colorParedes,
    "3 1.75",
  );
  addWall(
    parent,
    {
      width: "8",
      height: "3.5",
      depth: "0.2",
      position: "0 1.75 -3",
    },
    colorParedes,
    "4 1.75",
  );
  addWall(
    parent,
    {
      width: "8",
      height: "3.5",
      depth: "0.2",
      position: "0 1.75 3",
    },
    colorParedes,
    "4 1.75",
  );
  addWall(
    parent,
    {
      width: "0.2",
      height: "1.2",
      depth: "6",
      position: hallX + " 2.9 0",
    },
    colorParedes,
    "3 0.6",
  );

  appendEl(parent, "a-entity", {
    "gltf-model": "#modelo-puerta",
    position: -side * 3.9 + " 0 0",
    rotation: "0 " + side * 90 + " 0",
    scale: "2 2 2",
    shadow: "cast: true; receive: true",
  });

  appendEl(parent, "a-entity", {
    "gltf-model": "#modelo-pizarra",
    position: side * 3.5 + " 1.3 0",
    rotation: facingRotation,
    scale: "0.5 0.5 0.5",
    shadow: "cast: true; receive: true",
  });

  [
    [side * 1.5, 0, -1.5],
    [side * 1.5, 0, 0],
    [side * 1.5, 0, 1.5],
    [-side * 1, 0, -1.5],
    [-side * 1, 0, 0],
    [-side * 1, 0, 1.5],
  ].forEach(function (position) {
    appendEl(content, "a-entity", {
      class: "pupitre",
      "gltf-model": "#modelo-pupitre",
      position: position.join(" "),
      rotation: deskRotation,
      scale: "0.3 0.3 0.3",
      shadow: "cast: true; receive: true",
    });
  });

  if (LITE) return; // en modo liviano no hay luces puntuales
  appendEl(parent, "a-light", {
    type: "point",
    color: "#FFFFFF",
    intensity: "0.7",
    position: "0 3.2 0",
    distance: "10",
    decay: "2",
  });
  appendEl(parent, "a-light", {
    type: "point",
    color: "#FFFACD",
    intensity: "0.4",
    position: side * 3 + " 2.5 0",
    distance: "5",
    decay: "2",
  });
}

function getAulaDisplayName(id, tipo) {
  var names = {
    matematica: "Análisis Matemático",
    algoritmos: "Algoritmos",
    cpu: "Planificación de CPU",
    fisica: "Física",
    probabilidad: "Probabilidad",
    complejidad: "Complejidad Computacional",
  };
  var match = String(id || "").match(/\d+/);
  var number = match ? match[0] : "?";
  return "Aula " + number + "\n" + (names[tipo] || "Laboratorio");
}

function addAulaSign(parent, id, tipo, posicionXYZ) {
  var side = getAulaSide(posicionXYZ);
  var hallX = -side * 4.08;
  var sign = appendEl(parent, "a-entity", {
    id: id + "-cartel",
    position: hallX + " 1.95 -1.9",
    rotation: "0 " + -side * 90 + " 0",
  });

  appendEl(sign, "a-box", {
    width: "1.62",
    height: "0.72",
    depth: "0.045",
    color: "#92400E",
    opacity: "0.95",
    shadow: "cast: true; receive: true",
  });
  appendEl(sign, "a-box", {
    width: "1.5",
    height: "0.6",
    depth: "0.055",
    position: "0 0 0.02",
    color: "#111827",
    opacity: "0.96",
  });
  addText(sign, {
    value: getAulaDisplayName(id, tipo),
    position: "0 0.01 0.075",
    align: "center",
    color: "#FDE68A",
    width: "2.65",
    wrapCount: "20",
    scale: "0.68 0.68 0.68",
  });
}

function buildPlaceholderContent(parent, id, tipo, posicionXYZ) {
  if (tipo === "fisica") {
    buildFisicaContent(parent, id, posicionXYZ);
  } else if (tipo === "cpu") {
    buildCpuSchedulerContent(parent, id, posicionXYZ);
  } else if (tipo === "probabilidad") {
    buildProbabilityContent(parent, id, posicionXYZ);
  } else if (tipo === "complejidad") {
    buildComplexityContent(parent, id, posicionXYZ);
  } else {
    var side = getAulaSide(posicionXYZ);
    var title = "Simulador de CPU";
    var root = appendEl(parent, "a-entity", {
      id: id + "-sim-root",
      position: side * 3.2 + " 2.2 0",
      rotation: "0 " + -side * 90 + " 0",
    });
    addText(root, {
      value: title,
      position: "0 0.45 0",
      align: "center",
      color: "#42A5F5",
      width: "5.5",
    });
  }
}
