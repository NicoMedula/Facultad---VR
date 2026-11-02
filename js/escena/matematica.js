function buildMathContent(parent) {
  var menu = appendEl(parent, "a-entity", {
    id: "math-menu",
    position: "-3.2 2.2 0",
    rotation: "0 90 0",
  });
  addText(menu, {
    value: "Análisis Matemático I",
    position: "0 0.8 0",
    align: "center",
    color: "#4CAF50",
    width: "6",
  });
  addText(menu, {
    value: "Seleccioná una función:",
    position: "0 0.5 0",
    align: "center",
    color: "#fff",
    width: "4",
  });

  [
    ["btn-func1", "-1.2 0 0", "func1", "#FF6B6B", "sin(x)*cos(y)", "#fff", "2.5"],
    ["btn-func2", "0 0 0", "func2", "#4ECDC4", "x² + y²", "#fff", "2.5"],
    [
      "btn-func3",
      "1.2 0 0",
      "func3",
      "#45B7D1",
      "sin(sqrt(x²+y²))",
      "#fff",
      "2.2",
    ],
    ["btn-func4", "-0.6 -0.5 0", "func4", "#96CEB4", "cos(x)*sin(y)", "#fff", "2.5"],
    ["btn-func5", "0.6 -0.5 0", "func5", "#FFEAA7", "e^(-(x²+y²))", "#333", "2.5"],
  ].forEach(function (btn) {
    addButton(menu, {
      id: btn[0],
      position: btn[1],
      action: btn[2],
      color: btn[3],
      label: btn[4],
      textColor: btn[5],
      textWidth: btn[6],
    });
  });

  var display = appendEl(parent, "a-entity", {
    id: "function-display",
    visible: false,
    position: "0 0 0",
  });
  addText(display, {
    id: "current-function-title",
    value: "",
    position: "-2 3 0",
    rotation: "0 90 0",
    align: "center",
    color: "#4CAF50",
    width: "6",
  });
  appendEl(display, "a-entity", {
    id: "math-surface",
    position: "0 1.5 0",
    scale: "0.65 0.65 0.65",
  });
  appendEl(display, "a-cylinder", {
    position: "0 1.5 0",
    rotation: "0 0 90",
    height: "2.6",
    radius: "0.011",
    color: "red",
  });
  addText(display, {
    value: "X",
    position: "1.5 1.5 0",
    color: "red",
    width: "2",
  });
  appendEl(display, "a-cylinder", {
    position: "0 1.5 0",
    height: "2.6",
    radius: "0.011",
    color: "green",
  });
  addText(display, {
    value: "Y",
    position: "0 2.95 0",
    color: "green",
    width: "2",
  });
  appendEl(display, "a-cylinder", {
    position: "0 1.5 0",
    rotation: "90 0 0",
    height: "2.6",
    radius: "0.011",
    color: "blue",
  });
  addText(display, {
    value: "Z",
    position: "0 1.5 1.5",
    color: "blue",
    width: "2",
  });
  addButton(display, {
    id: "btn-back-to-menu",
    position: "-3.2 1 0",
    rotation: "0 90 0",
    action: "back-math",
    color: "#9B59B6",
    label: "<- Menú Funciones",
    height: "0.25",
    depth: "0.06",
    textPosition: "0 0 0.04",
  });
}
