function buildCpuSchedulerContent(parent, id, posicionXYZ) {
  var side = getAulaSide(posicionXYZ);
  var frontX = side * 3.86;
  var frontRot = "0 " + -side * 90 + " 0";

  parent.querySelectorAll(".pupitre").forEach(function (desk, i) {
    var x = i < 3 ? -side * 3.05 : side * 3.05;
    var z = [-2.2, 0, 2.2][i % 3];
    desk.setAttribute("position", x + " 0 " + z);
    desk.setAttribute("scale", "0.22 0.22 0.22");
  });

  var root = appendEl(parent, "a-entity", {
    id: "cpu-lab",
    position: "0 0.03 0",
  });

  function addCpuPanel(config) {
    var panel = appendEl(root, "a-entity", {
      id: config.id,
      position: config.position,
      rotation: config.rotation,
    });
    appendEl(panel, "a-plane", {
      width: config.width,
      height: config.height,
      color: config.color || "#0F1720",
      opacity: config.opacity || "0.88",
      material: "side: double",
    });
    appendEl(panel, "a-plane", {
      width: config.width,
      height: "0.025",
      position: "0 " + (config.height / 2 - 0.04) + " 0.012",
      color: config.accent || "#42A5F5",
      opacity: "0.9",
    });
    return panel;
  }

  var frontPanel = addCpuPanel({
    id: "cpu-front-panel",
    position: frontX + " 2.0 -0.15",
    rotation: frontRot,
    width: 5.8,
    height: 2.2,
    accent: "#64B5F6",
  });
  addText(frontPanel, {
    value: "LABORATORIO DE PLANIFICACI\u00d3N DE CPU",
    position: "0 0.88 0.03",
    align: "center",
    color: "#90CAF9",
    width: "5.2",
  });
  addText(frontPanel, {
    value: "Visualizá cómo diferentes algoritmos asignan la CPU a los procesos.",
    position: "0 0.63 0.03",
    align: "center",
    color: "#E3F2FD",
    width: "4.8",
    "wrap-count": "72",
  });
  addText(frontPanel, {
    value: "DIAGRAMA DE GANTT",
    position: "0 0.45 0.03",
    align: "center",
    color: "#BBDEFB",
    width: "3.5",
  });
  appendEl(frontPanel, "a-plane", {
    width: "5.0",
    height: "0.55",
    position: "0 0.02 0.025",
    color: "#050B12",
    opacity: "0.82",
  });
  appendEl(frontPanel, "a-entity", {
    id: "cpu-gantt-scale",
    position: "-2.25 0.28 0.05",
  });
  appendEl(frontPanel, "a-entity", {
    id: "cpu-gantt-blocks",
    position: "-2.25 -0.03 0.06",
  });
  appendEl(frontPanel, "a-entity", {
    id: "cpu-gantt-legend",
    position: "-2.2 -0.42 0.05",
  });
  addText(frontPanel, {
    value:
      "¿Qué es el diagrama de Gantt?\nMuestra en una línea de tiempo qué proceso se ejecuta en la CPU. Cada bloque representa un intervalo continuo de ejecución.",
    position: "0 -0.8 0.03",
    align: "center",
    color: "#CFD8DC",
    width: "4.8",
    "wrap-count": "64",
  });

  var leftPanel = addCpuPanel({
    id: "cpu-left-panel",
    position: "0 1.85 -2.88",
    rotation: "0 0 0",
    width: 3.2,
    height: 2.35,
    accent: "#29B6F6",
  });
  addText(leftPanel, {
    value: "ALGORITMOS DE PLANIFICACI\u00d3N",
    position: "0 0.94 0.03",
    align: "center",
    color: "#FFFFFF",
    width: "3.3",
  });
  [
    ["cpu-btn-fcfs", "0 0.58 0", "cpu-fcfs", "#1565C0", "FCFS"],
    ["cpu-btn-sjf", "0 0.24 0", "cpu-sjf", "#2E7D32", "SJF"],
    ["cpu-btn-srtf", "0 -0.1 0", "cpu-srtf", "#6A1B9A", "SRTF"],
    ["cpu-btn-rr", "0 -0.44 0", "cpu-rr", "#EF6C00", "ROUND ROBIN"],
  ].forEach(function (btn) {
    addButton(leftPanel, {
      id: btn[0],
      position: btn[1],
      action: btn[2],
      color: btn[3],
      label: btn[4],
      width: "2.55",
      height: "0.26",
      depth: "0.06",
      textWidth: "3.2",
      textPosition: "0 0 0.04",
    });
  });

  var controlPanel = addCpuPanel({
    id: "cpu-controls",
    position: "0 0.8 -2.88",
    rotation: "0 0 0",
    width: 3.2,
    height: 0.9,
    accent: "#81C784",
  });
  addText(controlPanel, {
    value: "CONTROLES",
    position: "0 0.33 0.03",
    align: "center",
    color: "#FFFFFF",
    width: "3",
  });
  [
    ["cpu-btn-start", "-0.92 0.02 0", "cpu-start", "#2E7D32", "INICIAR"],
    ["cpu-btn-pause", "0 0.02 0", "cpu-pause", "#B8860B", "PAUSAR"],
    ["cpu-btn-reset", "0.92 0.02 0", "cpu-reset", "#C62828", "REINICIAR"],
    ["cpu-btn-qminus", "-0.5 -0.28 0", "cpu-quantum-minus", "#1565C0", "QUANTUM -"],
    ["cpu-btn-qplus", "0.5 -0.28 0", "cpu-quantum-plus", "#1565C0", "QUANTUM +"],
  ].forEach(function (btn) {
    addButton(controlPanel, {
      id: btn[0],
      position: btn[1],
      action: btn[2],
      color: btn[3],
      label: btn[4],
      width: "0.82",
      height: "0.24",
      depth: "0.06",
      textWidth: "2.2",
      textPosition: "0 0 0.04",
    });
  });

  var metrics = addCpuPanel({
    id: "cpu-metrics-panel",
    position: "0 1.9 2.88",
    rotation: "0 180 0",
    width: 3.25,
    height: 2.05,
    accent: "#90CAF9",
  });
  addText(metrics, {
    value: "M\u00c9TRICAS",
    position: "0 0.82 0.03",
    align: "center",
    color: "#FFFFFF",
    width: "3",
  });
  addText(metrics, {
    id: "cpu-metrics-text",
    value: "",
    position: "-1.45 0.52 0.03",
    align: "left",
    color: "#E3F2FD",
    width: "3.1",
  });

  var table = addCpuPanel({
    id: "cpu-process-table-panel",
    position: "0 0.72 2.88",
    rotation: "0 180 0",
    width: 3.25,
    height: 1.05,
    accent: "#4FC3F7",
  });
  addText(table, {
    value: "TABLA DE PROCESOS",
    position: "0 0.39 0.03",
    align: "center",
    color: "#FFFFFF",
    width: "3",
  });
  addText(table, {
    id: "cpu-process-table-text",
    value: "",
    position: "-1.5 0.18 0.03",
    align: "left",
    color: "#E0F7FA",
    width: "3.15",
  });

  appendEl(root, "a-box", {
    id: "cpu-machine",
    position: "0 0.72 0",
    width: "1.05",
    height: "1.0",
    depth: "1.05",
    color: "#263238",
    metalness: "0.25",
    roughness: "0.45",
    shadow: "cast: true; receive: true",
  });
  appendEl(root, "a-box", {
    position: "0 1.25 0",
    width: "0.86",
    height: "0.08",
    depth: "0.86",
    color: "#80DEEA",
    opacity: "0.7",
  });
  addText(root, {
    value: "CPU",
    position: "0 1.36 0.58",
    align: "center",
    color: "#69F0AE",
    width: "3",
  });
  addText(root, {
    id: "cpu-current-label",
    value: "-",
    position: "0 0.82 0.56",
    align: "center",
    color: "#FFFFFF",
    width: "3",
  });
  addText(root, {
    value: "La CPU ejecuta un solo proceso a la vez.",
    position: "0 0.15 0.75",
    align: "center",
    color: "#E8F5E9",
    width: "3.2",
  });

  [
    ["Nuevo", "Procesos que acaban de llegar.", "-2.65 0.04 1.55", "#9E9E9E"],
    ["Cola de Listos", "Esperan disponibilidad de CPU.", "-2.25 0.04 -1.45", "#1E88E5"],
    ["Ejecutando / CPU", "Proceso activo en este instante.", "0 0.04 -1.35", "#43A047"],
    ["Espera / E/S", "Esperan Entrada/Salida.", "2.2 0.04 -1.45", "#FDD835"],
    ["Terminados", "Procesos finalizados.", "2.65 0.04 1.55", "#E53935"],
  ].forEach(function (zone) {
    var parts = zone[2].split(" ");
    appendEl(root, "a-plane", {
      position: zone[2],
      rotation: "-90 0 0",
      width: "1.85",
      height: "1.05",
      color: zone[3],
      opacity: "0.22",
    });
    addText(root, {
      value: zone[0],
      position: parts[0] + " 0.12 " + parts[2],
      rotation: "-90 0 0",
      align: "center",
      color: zone[3],
      width: "3.2",
    });
    addText(root, {
      value: zone[1],
      position: parts[0] + " 0.11 " + (parseFloat(parts[2]) + 0.34),
      rotation: "-90 0 0",
      align: "center",
      color: "#ECEFF1",
      width: "2.2",
    });
  });

  var flow = addCpuPanel({
    id: "cpu-flow-panel",
    position: "0 0.08 2.28",
    rotation: "-75 180 0",
    width: 5.4,
    height: 0.72,
    accent: "#78909C",
    opacity: "0.82",
  });
  addText(flow, {
    value: "\u00bfC\u00d3MO FUNCIONA?",
    position: "0 0.22 0.03",
    align: "center",
    color: "#B3E5FC",
    width: "4",
  });
  addText(flow, {
    value: "1. Llegada  ->  2. Listo  ->  3. Ejecución  ->  4. E/S si aplica  ->  5. Termina",
    position: "0 -0.07 0.03",
    align: "center",
    color: "#FFFFFF",
    width: "5.2",
  });

  addText(root, {
    id: "cpu-status-text",
    value: "Elegí un algoritmo y pulsá Iniciar",
    position: "0 2.92 -2.25",
    align: "center",
    color: "#E3F2FD",
    width: "5.5",
  });

  appendEl(root, "a-entity", { id: "cpu-processes" });
  setTimeout(function () {
    resetCpuScheduler();
  }, 0);
}
