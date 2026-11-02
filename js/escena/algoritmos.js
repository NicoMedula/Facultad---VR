function buildAlgorithmContent(parent) {
  var menu = appendEl(parent, "a-entity", {
    id: "alg-menu",
    position: "3.2 2.2 0",
    rotation: "0 -90 0",
  });
  addText(menu, {
    value: "Algoritmos de Ordenamiento",
    position: "0 0.8 0",
    align: "center",
    color: "#2196F3",
    width: "6",
  });
  addText(menu, {
    value: "Seleccioná un algoritmo:",
    position: "0 0.5 0",
    align: "center",
    color: "#fff",
    width: "4",
  });

  [
    ["btn-algo1", "-1.1 0.05 0", "algo-bubble", "#FF6B6B", "Bubble Sort", "0.9", "2.5"],
    ["btn-algo2", "0 0.05 0", "algo-insertion", "#4ECDC4", "Insertion Sort", "0.9", "2.5"],
    ["btn-algo3", "1.1 0.05 0", "algo-quick", "#45B7D1", "Quick Sort", "0.9", "2.5"],
    ["btn-algo4", "-0.75 -0.4 0", "algo-baraja", "#8BC34A", "Baraja", "1.35", "2.5"],
    [
      "btn-algo5",
      "0.75 -0.4 0",
      "algo-intercambio",
      "#FF9800",
      "Intercambio Directo",
      "1.35",
      "2.4",
    ],
  ].forEach(function (btn) {
    addButton(menu, {
      id: btn[0],
      position: btn[1],
      action: btn[2],
      color: btn[3],
      label: btn[4],
      width: btn[5],
      textWidth: btn[6],
    });
  });

  var display = appendEl(parent, "a-entity", {
    id: "algorithm-display",
    visible: false,
    position: "0 0 0",
  });
  addText(display, {
    id: "current-algo-title",
    value: "",
    position: "3.2 2.8 0",
    rotation: "0 -90 0",
    align: "center",
    color: "#2196F3",
    width: "6",
  });
  appendEl(display, "a-entity", {
    id: "algo-surface",
    position: "3.2 1.65 0",
    rotation: "0 -90 0",
  });
  addButton(display, {
    id: "btn-back-to-alg-menu",
    position: "3.2 1.2 -0.8",
    rotation: "0 -90 0",
    action: "back-algo",
    color: "#9B59B6",
    label: "<- Menú Algoritmos",
    height: "0.25",
    depth: "0.06",
    textPosition: "0 0 0.04",
  });
  addButton(display, {
    id: "btn-restart-algo",
    position: "3.2 1.2 0.8",
    rotation: "0 -90 0",
    action: "restart-algo",
    color: "#FF9800",
    label: "Reiniciar",
    height: "0.25",
    depth: "0.06",
    textPosition: "0 0 0.04",
  });
  addButton(display, {
    id: "btn-pause-algo",
    position: "3.2 0.85 -0.95",
    rotation: "0 -90 0",
    action: "pause-algo",
    color: "#2196F3",
    label: "Pausar",
    labelId: "pause-algo-label",
    width: "0.85",
    height: "0.24",
    depth: "0.06",
    textWidth: "2.1",
    textPosition: "0 0 0.04",
  });
  addButton(display, {
    id: "btn-back-step-algo",
    position: "3.2 0.85 0",
    rotation: "0 -90 0",
    action: "back-step-algo",
    color: "#607D8B",
    label: "Atrás",
    width: "0.85",
    height: "0.24",
    depth: "0.06",
    textWidth: "2.1",
    textPosition: "0 0 0.04",
  });
  addButton(display, {
    id: "btn-slow-algo",
    position: "3.2 0.85 0.95",
    rotation: "0 -90 0",
    action: "slow-algo",
    color: "#795548",
    label: "Vel 1x",
    labelId: "slow-algo-label",
    width: "0.85",
    height: "0.24",
    depth: "0.06",
    textWidth: "2.1",
    textPosition: "0 0 0.04",
  });
}
