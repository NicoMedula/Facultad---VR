function buildFisicaContent(parent, id, posicionXYZ) {
  var side = getAulaSide(posicionXYZ);
  var menu = appendEl(parent, "a-entity", {
    id: id + "-fisica-menu",
    position: side * 3.2 + " 2.2 0",
    rotation: "0 " + -side * 90 + " 0",
  });
  addText(menu, {
    value: "Simulador de Física",
    position: "0 0.8 0",
    align: "center",
    color: "#4CAF50",
    width: "6",
  });
  addText(menu, {
    value: "Seleccioná un tipo de movimiento:",
    position: "0 0.5 0",
    align: "center",
    color: "#fff",
    width: "4",
  });

  // Botón MRU
  addButton(menu, {
    id: "btn-mru",
    position: "-0.7 0 0",
    action: "show-mru",
    color: "#2196F3",
    label: "MRU",
    textColor: "#fff",
    textWidth: "2.5",
  });

  // Botón MRUV
  addButton(menu, {
    id: "btn-mruv",
    position: "0.7 0 0",
    action: "show-mruv",
    color: "#FF9800",
    label: "MRUV",
    textColor: "#fff",
    textWidth: "2.5",
  });

  // Entidad para mostrar el ejercicio MRUV
  var mruvDisplay = appendEl(parent, "a-entity", {
    id: id + "-mruv-display",
    visible: false,
    position: side * 3.0 + " 2.6 0",
    rotation: "0 " + -side * 90 + " 0",
  });

  addText(mruvDisplay, {
    id: "mruv-title",
    value: "Ejercicio 2: MRUV",
    position: "0 0.5 0",
    align: "center",
    color: "#FF9800",
    width: "5.5",
    scale: "1.0 1.0 1.0",
  });

  addText(mruvDisplay, {
    id: "mruv-enunciado",
    value: "Un auto está detenido frente a un semáforo en rojo.\nCuando la luz cambia a verde, el conductor acelera\nen línea recta por la avenida. El auto parte del\nreposo con una aceleración constante de 2,5 m/s²\ndurante un tiempo de 4 segundos. Calculá:",
    position: "-1 -0.3 0",
    align: "left",
    color: "#fff",
    width: "3.4",
    wrapCount: "46",
    scale: "0.72 0.72 0.72",
  });

  addText(mruvDisplay, {
    id: "mruv-pregunta",
    value: "1. ¿Qué velocidad alcanza?\n2. ¿Qué distancia recorre?",
    position: "-1 -1.05 0",
    align: "left",
    color: "#FFEB3B",
    width: "3.4",
    wrapCount: "46",
    scale: "0.72 0.72 0.72",
  });

  addButton(mruvDisplay, {
    id: "btn-simular-mruv",
    position: "0 -1.4 0",
    action: "simulate-mruv",
    color: "#4CAF50",
    label: "SIMULAR",
    textColor: "#fff",
    textWidth: "2.5",
    height: "0.3",
    width: "1.0",
  });

  addButton(mruvDisplay, {
    id: "btn-back-mruv",
    position: "0 -1.9 0",
    action: "back-fisica",
    color: "#9B59B6",
    label: "<- Volver",
    textColor: "#fff",
    textWidth: "2.5",
    height: "0.3",
    width: "1.0",
  });

  // Entidad para la simulación (auto animado)
  var simulationArea = appendEl(parent, "a-entity", {
    id: id + "-mruv-simulation",
    visible: false,
    position: side * 3.2 + " 1.3 0",
    rotation: "0 " + -side * 90 + " 0",
  });

  // Auto (representado como un cubo + cilindro)
  var car = appendEl(simulationArea, "a-entity", {
    id: "mruv-car",
    position: "-1.5 0 0",
  });

  appendEl(car, "a-box", {
    width: "0.4",
    height: "0.25",
    depth: "0.8",
    color: "#E53935",
  });

  appendEl(car, "a-cylinder", {
    radius: "0.1",
    height: "0.05",
    color: "#333",
    position: "-0.15 -0.15 -0.25",
    rotation: "90 0 0",
  });

  appendEl(car, "a-cylinder", {
    radius: "0.1",
    height: "0.05",
    color: "#333",
    position: "0.15 -0.15 -0.25",
    rotation: "90 0 0",
  });

  appendEl(car, "a-cylinder", {
    radius: "0.1",
    height: "0.05",
    color: "#333",
    position: "-0.15 -0.15 0.25",
    rotation: "90 0 0",
  });

  appendEl(car, "a-cylinder", {
    radius: "0.1",
    height: "0.05",
    color: "#333",
    position: "0.15 -0.15 0.25",
    rotation: "90 0 0",
  });

  // Línea de referencia en el suelo
  appendEl(simulationArea, "a-plane", {
    width: "5",
    height: "0.02",
    color: "#666",
    position: "0 -0.3 0",
    rotation: "-90 0 0",
  });

  // Marcas de distancia
  for (var i = 0; i <= 5; i++) {
    appendEl(simulationArea, "a-box", {
      width: "0.1",
      height: "0.2",
      depth: "0.02",
      color: "#666",
      position: (-2 + i) + " -0.25 0",
    });
    addText(simulationArea, {
      value: (i * 4) + "m",
      position: (-2 + i) + " 0.1 0",
      align: "center",
      color: "#888",
      width: "1.5",
      scale: "0.35 0.35 0.35",
    });
  }

  // Texto de información durante la simulación
  addText(simulationArea, {
    id: "mruv-sim-info",
    value: "Presionando...",
    position: "0 0.5 0",
    align: "center",
    color: "#FFEB3B",
    width: "4.5",
    scale: "0.75 0.75 0.75",
  });

  // Entidad para mostrar resultados
  var resultsDisplay = appendEl(parent, "a-entity", {
    id: id + "-mruv-results",
    visible: false,
    position: "0 0 0",
  });

  addText(resultsDisplay, {
    id: "results-title",
    value: "Resultados de la Simulación",
    position: side * 3.8+ " 3 0",
    rotation: "0 " + -side * 90 + " 0",
    align: "center",
    color: "#4CAF50",
    width: "6",
  });

  addText(resultsDisplay, {
    id: "results-content",
    value: "",
    position: side * 3.8 + " 2.2 0",
    rotation: "0 " + -side * 90 + " 0",
    align: "left",
    color: "#fff",
    width: "2.8",
    wrapCount: "40",
    scale: "0.75 0.75 0.75",
  });

  addButton(resultsDisplay, {
    id: "btn-back-results",
    position: side * 3.8 + " 0.4 0",
    rotation: "0 " + -side * 90 + " 0",
    action: "back-fisica",
    color: "#9B59B6",
    label: "<- Volver",
    textColor: "#fff",
    textWidth: "2.5",
    height: "0.3",
    width: "0.9",
  });

  // ===== ENTIDADES MRU =====

  var mruDisplay = appendEl(parent, "a-entity", {
    id: id + "-mru-display",
    visible: false,
    position: side * 3.0 + " 2.6 0",
    rotation: "0 " + -side * 90 + " 0",
  });

  addText(mruDisplay, {
    value: "Ejercicio 1: MRU",
    position: "0 0.5 0",
    align: "center",
    color: "#2196F3",
    width: "5.5",
  });

  addText(mruDisplay, {
    value: "Un auto circula a velocidad constante de\n20 m/s (72 km/h) por la autopista\nen línea recta. No acelera ni frena.\nCalculá:",
    position: "-1 -0.2 0",
    align: "left",
    color: "#fff",
    width: "3.4",
    wrapCount: "46",
    scale: "0.72 0.72 0.72",
  });

  addText(mruDisplay, {
    value: "1. ¿Qué distancia recorre en 4 segundos?\n2. ¿En cuánto tiempo recorre 60 m?",
    position: "-1 -1.0 0",
    align: "left",
    color: "#FFEB3B",
    width: "3.4",
    wrapCount: "46",
    scale: "0.72 0.72 0.72",
  });

  addButton(mruDisplay, {
    id: "btn-simular-mru",
    position: "0 -1.4 0",
    action: "simulate-mru",
    color: "#2196F3",
    label: "SIMULAR",
    textColor: "#fff",
    textWidth: "2.5",
    height: "0.3",
    width: "1.0",
  });

  addButton(mruDisplay, {
    id: "btn-back-mru",
    position: "0 -1.9 0",
    action: "back-fisica",
    color: "#9B59B6",
    label: "<- Volver",
    textColor: "#fff",
    textWidth: "2.5",
    height: "0.3",
    width: "1.0",
  });

  // Simulación MRU
  var mruSimulation = appendEl(parent, "a-entity", {
    id: id + "-mru-simulation",
    visible: false,
    position: side * 3.2 + " 1.3 0",
    rotation: "0 " + -side * 90 + " 0",
  });

  var mruCar = appendEl(mruSimulation, "a-entity", {
    id: "mru-car",
    position: "-2 0 0",
  });

  appendEl(mruCar, "a-box", {
    width: "0.4",
    height: "0.25",
    depth: "0.8",
    color: "#1565C0",
  });

  [[-0.15, -0.15, -0.25], [0.15, -0.15, -0.25],
   [-0.15, -0.15,  0.25], [0.15, -0.15,  0.25]].forEach(function (pos) {
    appendEl(mruCar, "a-cylinder", {
      radius: "0.1",
      height: "0.05",
      color: "#333",
      position: pos.join(" "),
      rotation: "90 0 0",
    });
  });

  // Flecha que indica velocidad constante
  appendEl(mruCar, "a-box", {
    width: "0.32",
    height: "0.04",
    depth: "0.04",
    color: "#42A5F5",
    position: "0 0.22 0",
  });
  appendEl(mruCar, "a-box", {
    width: "0.08",
    height: "0.08",
    depth: "0.04",
    color: "#42A5F5",
    position: "0.18 0.22 0",
    rotation: "0 0 45",
  });

  appendEl(mruSimulation, "a-plane", {
    width: "5",
    height: "0.02",
    color: "#666",
    position: "0 -0.3 0",
    rotation: "-90 0 0",
  });

  // Marcas cada 20 m (escala 0.05: 20 m = 1 unidad de escena)
  // La marca de 60 m (mi=3) se resalta en naranja — responde pregunta 2
  for (var mi = 0; mi <= 4; mi++) {
    var isSixtyM = (mi === 3);
    appendEl(mruSimulation, "a-box", {
      width: "0.1",
      height: isSixtyM ? "0.3" : "0.2",
      depth: "0.02",
      color: isSixtyM ? "#FF9800" : "#666",
      position: (-2 + mi) + " -0.25 0",
    });
    addText(mruSimulation, {
      value: (mi * 20) + "m",
      position: (-2 + mi) + " 0.1 0",
      align: "center",
      color: isSixtyM ? "#FF9800" : "#888",
      width: "1.5",
      scale: "0.35 0.35 0.35",
    });
  }

  addText(mruSimulation, {
    id: "mru-sim-info",
    value: "Listo...",
    position: "0 0.55 0",
    align: "center",
    color: "#42A5F5",
    width: "4.5",
    scale: "0.75 0.75 0.75",
  });

  // Resultados MRU
  var mruResultsDisplay = appendEl(parent, "a-entity", {
    id: id + "-mru-results",
    visible: false,
    position: "0 0 0",
  });

  addText(mruResultsDisplay, {
    value: "Resultados de la Simulación",
    position: side * 3.8 + " 3 0",
    rotation: "0 " + -side * 90 + " 0",
    align: "center",
    color: "#2196F3",
    width: "6",
  });

  addText(mruResultsDisplay, {
    id: "mru-results-content",
    value: "",
    position: side * 3.8 + " 2.2 0",
    rotation: "0 " + -side * 90 + " 0",
    align: "left",
    color: "#fff",
    width: "3.4",
    wrapCount: "46",
    scale: "0.7 0.7 0.7",
  });

  addButton(mruResultsDisplay, {
    id: "btn-back-mru-results",
    position: side * 3.8 + " 0.4 0",
    rotation: "0 " + -side * 90 + " 0",
    action: "back-fisica",
    color: "#9B59B6",
    label: "<- Volver",
    textColor: "#fff",
    textWidth: "2.5",
    height: "0.3",
    width: "0.9",
  });
}
