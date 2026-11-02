function buildComplexityContent(parent, id, posicionXYZ) {
  var side = getAulaSide(posicionXYZ);
  var frontX = side * 3.82;
  var frontRot = "0 " + -side * 90 + " 0";

  parent.querySelectorAll(".pupitre").forEach(function (desk, i) {
    var x = i < 3 ? -side * 3.0 : side * 3.0;
    var z = [-2.15, 0, 2.15][i % 3];
    desk.setAttribute("position", x + " 0 " + z);
    desk.setAttribute("scale", "0.22 0.22 0.22");
  });

  var root = appendEl(parent, "a-entity", {
    id: "complexity-lab",
    position: "0 0.03 0",
  });

  function addPanel(config) {
    var panel = appendEl(root, "a-entity", {
      id: config.id,
      position: config.position,
      rotation: config.rotation,
    });
    appendEl(panel, "a-plane", {
      width: config.width,
      height: config.height,
      color: config.color || "#17120B",
      opacity: config.opacity || "0.9",
      material: "side: double",
    });
    appendEl(panel, "a-plane", {
      width: config.width,
      height: "0.03",
      position: "0 " + (config.height / 2 - 0.05) + " 0.012",
      color: config.accent || "#F97316",
      opacity: "0.95",
    });
    return panel;
  }

  var board = addPanel({
    id: "complexity-board",
    position: frontX + " 2.05 0",
    rotation: frontRot,
    width: 5.95,
    height: 2.35,
    accent: "#F97316",
  });
  addText(board, {
    value: "Simulador de Complejidad Computacional",
    position: "0 0.93 0.03",
    align: "center",
    color: "#FDBA74",
    width: "5.6",
  });
  addText(board, {
    id: "complexity-code-title",
    value: "",
    position: "-2.55 0.72 0.03",
    align: "left",
    color: "#FFEDD5",
    width: "3.1",
    scale: "0.6 0.6 0.6",
  });
  addText(board, {
    id: "complexity-code",
    value: "",
    position: "-2.55 0.18 0.03",
    align: "left",
    color: "#E7E5E4",
    width: "3.0",
    wrapCount: "48",
    scale: "0.55 0.55 0.55",
  });
  appendEl(board, "a-plane", {
    width: "2.8",
    height: "1.05",
    position: "1.15 0.12 0.025",
    color: "#070707",
    opacity: "0.84",
  });
  appendEl(board, "a-entity", {
    id: "complexity-chart",
    position: "-0.15 -0.38 0.06",
  });
  addText(board, {
    id: "complexity-result",
    value: "",
    position: "0 -0.79 0.03",
    align: "center",
    color: "#FFFFFF",
    width: "5.4",
    "wrap-count": "56",
    scale: "0.68 0.68 0.68",
  });

  var controls = addPanel({
    id: "complexity-controls",
    position: "0 1.72 -2.88",
    rotation: "0 0 0",
    width: 3.5,
    height: 3.3,
    accent: "#FB923C",
  });
  addText(controls, {
    value: "ANALIZÁ TU CÓDIGO",
    position: "0 1.5 0.03",
    align: "center",
    color: "#FFFFFF",
    width: "3.3",
  });
  addText(controls, {
    id: "complexity-case-name",
    value: "Sin calcular",
    position: "0 1.28 0.03",
    align: "center",
    color: "#FDBA74",
    width: "3.2",
    scale: "0.7 0.7 0.7",
  });

  // --- NUEVO PANEL IZQUIERDO: SELECCIÓN DIRECTA DE COMPLEJIDADES ---
  var advanced = appendEl(controls, "a-entity", {
    id: "complexity-advanced",
    position: "0 0 0",
  });

  addText(advanced, {
    value: "Seleccioná una complejidad:",
    position: "0 1.06 0.03",
    align: "center",
    color: "#FDBA74",
    width: "3.2",
    scale: "0.75 0.75 0.75",
  });

  [
    ["const", "Constante O(1)", "0.70", "#1D4ED8"],
    ["lineal", "Lineal O(n)", "0.40", "#1D4ED8"],
    ["binaria", "Binaria O(log n)", "0.10", "#1D4ED8"],
    ["ordena", "Ordena O(n log n)", "-0.20", "#1D4ED8"],
    ["doble", "Cuadrática O(n^2)", "-0.50", "#1D4ED8"],
    ["fibo", "Exponencial O(2^n)", "-0.80", "#1D4ED8"],
  ].forEach(function (btn) {
    addButton(advanced, {
      id: "complexity-code-" + btn[0],
      position: "0 " + btn[2] + " 0",
      action: "complexity-code-" + btn[0],
      color: btn[3],
      label: btn[1],
      width: "2.6",
      height: "0.24",
      textWidth: "2.8",
      textPosition: "0 0 0.04",
    });
  });

  addText(advanced, {
    value: "Tocá cualquier caso para cargar gráficas y métricas",
    position: "0 -1.15 0.03",
    align: "center",
    color: "#A8A29E",
    width: "3.2",
    scale: "0.55 0.55 0.55",
  });


  var metrics = addPanel({
    id: "complexity-metrics-panel",
    position: "0 1.75 2.88",
    rotation: "0 180 0",
    width: 3.65,
    height: 2.45,
    accent: "#A3E635",
  });
  addText(metrics, {
    value: "MÉTRICAS AST",
    position: "0 1.06 0.03",
    align: "center",
    color: "#FFFFFF",
    width: "3.0",
    scale: "0.7 0.7 0.7",
  });
  addText(metrics, {
    id: "complexity-metrics",
    value: "",
    position: "-1.55 0.46 0.03",
    align: "left",
    color: "#ECFCCB",
    width: "3.15",
    wrapCount: "52",
    scale: "0.56 0.56 0.56",
  });
  addText(metrics, {
    id: "complexity-recommendation",
    value: "",
    position: "-1.55 -0.82 0.03",
    align: "left",
    color: "#FFFFFF",
    width: "3.15",
    wrapCount: "52",
    scale: "0.54 0.54 0.54",
  });

  setTimeout(function () {
    renderComplexityLab();
  }, 0);
}
