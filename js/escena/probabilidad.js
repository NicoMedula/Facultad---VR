function buildProbabilityContent(parent, id, posicionXYZ) {
  var side = getAulaSide(posicionXYZ);
  var frontX = side * 3.82;
  var frontRot = "0 " + -side * 90 + " 0";
  var rightWallX = -side * 3.82;
  var rightMachineX = -side * 3.15;
  var rightWallRot = "0 " + side * 90 + " 0";

  parent.querySelectorAll(".pupitre").forEach(function (desk) {
    desk.parentNode.removeChild(desk);
  });

  var root = appendEl(parent, "a-entity", {
    id: "probability-lab",
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
      color: config.color || "#101820",
      opacity: config.opacity || "0.9",
      material: "side: double",
    });
    appendEl(panel, "a-plane", {
      width: config.width,
      height: "0.03",
      position: "0 " + (config.height / 2 - 0.05) + " 0.012",
      color: config.accent || "#26A69A",
      opacity: "0.95",
    });
    return panel;
  }

  function expandProbabilityClassroom() {
    var aulaEl = parent.closest("[data-aula-tipo]") || parent;
    var floor = aulaEl.querySelector("#" + id + "-suelo");
    if (floor) {
      floor.setAttribute("width", "9.6");
      floor.setAttribute("height", "10.8");
      floor.setAttribute("position", "0.8 0.01 -1.925");
      floor.setAttribute("material", "src: #textura-suelo; repeat: 4.8 5.4; roughness: 0.7");
    }

    aulaEl.querySelectorAll(".collidable").forEach(function (wall) {
      var width = parseFloat(wall.getAttribute("width") || 0);
      var depth = parseFloat(wall.getAttribute("depth") || 0);
      var pos = wall.getAttribute("position");
      var p = typeof pos === "string" ? pos.split(" ").map(parseFloat) : [pos.x, pos.y, pos.z];
      if (Math.abs(depth - 0.2) < 0.02 && Math.abs(p[2] + 3) < 0.05) {
        wall.setAttribute("width", "9.6");
        wall.setAttribute("position", "0.8 1.75 -7.2");
        wall.setAttribute("material", wallMaterial(colorParedes, "4.8 1.75"));
      } else if (Math.abs(depth - 0.2) < 0.02 && Math.abs(p[2] - 3) < 0.05) {
        wall.setAttribute("width", "9.6");
        wall.setAttribute("position", "0.8 1.75 3.35");
        wall.setAttribute("material", wallMaterial(colorParedes, "4.8 1.75"));
      } else if (Math.abs(width - 0.2) < 0.02 && Math.abs(p[0] - side * 4) < 0.1) {
        wall.setAttribute("depth", "12");
        wall.setAttribute("position", side * 4 + " 1.75 -1.925");
        wall.setAttribute("material", wallMaterial(colorParedes, "5.25 1.75"));
      } else if (Math.abs(width - 0.2) < 0.02 && Math.abs(p[0] + side * 4) < 0.1) {
        wall.setAttribute("height", "1.2");
        wall.setAttribute("depth", "10.55");
        wall.setAttribute("position", -side * 5.6 + " 2.9 -1.925");
        wall.setAttribute("material", wallMaterial(colorParedes, "5.25 0.6"));
      }
    });

    aulaEl.querySelectorAll(":scope > a-plane").forEach(function (plane) {
      var pos = plane.getAttribute("position");
      var p = typeof pos === "string" ? pos.split(" ").map(parseFloat) : pos ? [pos.x, pos.y, pos.z] : [0, 0, 0];
      if (Math.abs(p[1] - 3.5) < 0.05) {
        plane.setAttribute("width", "9.6");
        plane.setAttribute("height", "10.8");
        plane.setAttribute("position", "0.8 3.5 -1.925");
      }
    });

    var blackboard = aulaEl.querySelector("[gltf-model='#modelo-pizarra']");
    if (blackboard) blackboard.setAttribute("position", side * 3.5 + " 1.3 0");
  }

  expandProbabilityClassroom();

  [
    [-1.45, 0, 1.25],
    [0, 0, 1.25],
    [1.45, 0, 1.25],
    [-1.45, 0, 0.25],
    [0, 0, 0.25],
    [1.45, 0, 0.25],
  ].forEach(function (pos) {
    appendEl(root, "a-entity", {
      class: "prob-audience-chair",
      "gltf-model": "#modelo-pupitre",
      position: pos.join(" "),
      rotation: "0 -90 0",
      scale: "0.24 0.24 0.24",
      shadow: "cast: true; receive: true",
    });
  });

  var centerTable = appendEl(root, "a-entity", {
    id: "prob-center-table-group",
    position: "0 0 2.25",
    rotation: "0 180 0",
  });

  appendEl(centerTable, "a-box", {
    id: "casino-center-table",
    position: "0 0.38 0",
    width: "2.45",
    height: "0.14",
    depth: "1.75",
    color: "#3B2414",
    visible: "false",
    material: "roughness: 0.45; metalness: 0.08",
    shadow: "cast: true; receive: true",
  });
  appendEl(centerTable, "a-box", {
    position: "0 0.47 0",
    width: "2.25",
    height: "0.035",
    depth: "1.55",
    color: "#0F766E",
    opacity: "0.92",
    visible: "false",
    shadow: "receive: true",
  });
  appendEl(centerTable, "a-box", {
    position: "0 0.515 -0.79",
    width: "2.35",
    height: "0.035",
    depth: "0.045",
    color: "#F59E0B",
    visible: "false",
  });
  appendEl(centerTable, "a-box", {
    position: "0 0.515 0.79",
    width: "2.35",
    height: "0.035",
    depth: "0.045",
    color: "#F59E0B",
    visible: "false",
  });
  appendEl(centerTable, "a-box", {
    position: "-1.18 0.515 0",
    width: "0.045",
    height: "0.035",
    depth: "1.6",
    color: "#F59E0B",
    visible: "false",
  });
  appendEl(centerTable, "a-box", {
    position: "1.18 0.515 0",
    width: "0.045",
    height: "0.035",
    depth: "1.6",
    color: "#F59E0B",
    visible: "false",
  });

  appendEl(centerTable, "a-box", {
    id: "prob-chart-panel",
    position: "0 1.48 -0.55",
    width: "4.05",
    height: "2.58",
    depth: "0.06",
    color: "#0B1115",
    opacity: "0.97",
    shadow: "cast: true; receive: true",
  });
  appendEl(centerTable, "a-box", {
    position: "0 2.78 -0.51",
    width: "4.18",
    height: "0.07",
    depth: "0.09",
    color: "#6B3F18",
    shadow: "cast: true; receive: true",
  });
  appendEl(centerTable, "a-box", {
    position: "0 0.16 -0.51",
    width: "4.18",
    height: "0.07",
    depth: "0.09",
    color: "#6B3F18",
    shadow: "cast: true; receive: true",
  });
  appendEl(centerTable, "a-box", {
    position: "-2.06 1.48 -0.51",
    width: "0.07",
    height: "2.61",
    depth: "0.09",
    color: "#6B3F18",
    shadow: "cast: true; receive: true",
  });
  appendEl(centerTable, "a-box", {
    position: "2.06 1.48 -0.51",
    width: "0.07",
    height: "2.61",
    depth: "0.09",
    color: "#6B3F18",
    shadow: "cast: true; receive: true",
  });
  appendEl(centerTable, "a-box", {
    position: "0 0.48 -0.55",
    width: "0.12",
    height: "0.9",
    depth: "0.08",
    color: "#3B2414",
    visible: "false",
    shadow: "cast: true; receive: true",
  });
  appendEl(centerTable, "a-entity", {
    id: "prob-chart",
    position: "-1.65 0.8 -0.49",
    rotation: "0 0 0",
    scale: "0.64 0.64 0.64",
  });
  addText(centerTable, {
    id: "prob-title",
    value: "Distribución observada",
    position: "0 2.5 -0.48",
    rotation: "0 0 0",
    align: "center",
    color: "#E5E7EB",
    width: "4.6",
    scale: "0.74 0.74 0.74",
  });
  addText(centerTable, {
    id: "prob-theory-block",
    value: "",
    position: "0 1.93 -0.48",
    rotation: "0 0 0",
    align: "center",
    color: "#DBEAFE",
    width: "4.2",
    wrapCount: "62",
    scale: "0.42 0.42 0.42",
  });
  addText(centerTable, {
    id: "prob-chart-explanation",
    value: "",
    position: "0 2.23 -0.48",
    rotation: "0 0 0",
    align: "center",
    color: "#FDE68A",
    width: "4.1",
    wrapCount: "58",
    scale: "0.42 0.42 0.42",
  });
  addText(centerTable, {
    id: "prob-result",
    value: "",
    position: "1.12 1.22 -0.48",
    rotation: "0 0 0",
    align: "left",
    color: "#FFFFFF",
    width: "2.05",
    wrapCount: "28",
    scale: "0.48 0.48 0.48",
  });
  addText(centerTable, {
    id: "prob-last-outcome",
    value: "",
    position: "0 1.6 -0.48",
    rotation: "0 0 0",
    align: "center",
    color: "#FDE68A",
    width: "3.5",
    wrapCount: "44",
    scale: "0.4 0.4 0.4",
  });
  addButton(centerTable, {
    id: "prob-run-once-main",
    position: "-1.12 0.36 -0.47",
    rotation: "0 0 0",
    action: "prob-run-once",
    color: "#16A34A",
    label: "Jugar 1",
    width: "0.72",
    height: "0.2",
    textWidth: "1.8",
    textPosition: "0 0 0.04",
  });
  addButton(centerTable, {
    id: "prob-run-ten-main",
    position: "-0.35 0.36 -0.47",
    rotation: "0 0 0",
    action: "prob-run-ten",
    color: "#D97706",
    label: "Jugar 10",
    width: "0.76",
    height: "0.2",
    textWidth: "1.9",
    textPosition: "0 0 0.04",
  });
  addButton(centerTable, {
    id: "prob-run-hundred-main",
    position: "0.47 0.36 -0.47",
    rotation: "0 0 0",
    action: "prob-run-hundred",
    color: "#075985",
    label: "Jugar 100",
    width: "0.84",
    height: "0.2",
    textWidth: "2.05",
    textPosition: "0 0 0.04",
  });
  addButton(centerTable, {
    id: "prob-reset-main",
    position: "1.28 0.36 -0.47",
    rotation: "0 0 0",
    action: "prob-reset-observed",
    color: "#991B1B",
    label: "Reset",
    width: "0.66",
    height: "0.2",
    textWidth: "1.7",
    textPosition: "0 0 0.04",
  });

  var board = addPanel({
    id: "prob-board",
    position: frontX + " 2.05 0",
    rotation: frontRot,
    width: 4.6,
    height: 1.18,
    accent: "#F59E0B",
    color: "#16110A",
  });
  addText(board, {
    id: "prob-board-title",
    value: "Probabilidad teórica vs frecuencia observada",
    position: "0 0.4 0.03",
    align: "center",
    color: "#FDE68A",
    width: "4.3",
    scale: "0.78 0.78 0.78",
  });
  addText(board, {
    id: "prob-description",
    value: "",
    position: "0 0.08 0.03",
    align: "center",
    color: "#FFEDD5",
    width: "4.1",
    wrapCount: "50",
    scale: "0.58 0.58 0.58",
  });
  appendEl(board, "a-box", {
    width: "0.38",
    height: "0.1",
    depth: "0.015",
    position: "-1.2 -0.36 0.035",
    color: "#FDE047",
  });
  addText(board, {
    value: "Teoría esperada",
    position: "-0.78 -0.36 0.045",
    align: "left",
    color: "#F8FAFC",
    width: "4",
    scale: "0.46 0.46 0.46",
  });
  appendEl(board, "a-box", {
    width: "0.02",
    height: "0.32",
    depth: "0.01",
    position: "0.1 -0.36 0.04",
    color: "#64748B",
    opacity: "0.8",
  });
  appendEl(board, "a-box", {
    width: "0.38",
    height: "0.1",
    depth: "0.015",
    position: "0.62 -0.36 0.035",
    color: "#EF4444",
  });
  addText(board, {
    value: "Datos generados",
    position: "1.04 -0.36 0.045",
    align: "left",
    color: "#F8FAFC",
    width: "4",
    scale: "0.46 0.46 0.46",
  });

  function addMachineBase(config) {
    var backZ = parseFloat(config.backZ || "-0.52");
    var machine = appendEl(root, "a-entity", {
      id: config.id,
      position: config.position,
      rotation: config.rotation,
    });
    appendEl(machine, "a-box", {
      width: config.width || "1.35",
      height: "0.12",
      depth: config.depth || "1.05",
      position: "0 0.45 0",
      color: config.tableColor || "#2F1B11",
      shadow: "cast: true; receive: true",
    });
    appendEl(machine, "a-box", {
      width: config.width || "1.35",
      height: "0.75",
      depth: "0.12",
      position: "0 0.9 " + backZ,
      color: config.bodyColor || "#111827",
      opacity: "0.94",
      shadow: "cast: true; receive: true",
    });
    appendEl(machine, "a-plane", {
      width: (parseFloat(config.width || "1.35") - 0.18).toString(),
      height: "0.36",
      position: "0 0.98 " + (backZ + 0.064),
      color: "#020617",
      opacity: "0.92",
    });
    addText(machine, {
      id: config.displayId,
      value: "",
      position: "0 1.02 " + (backZ + 0.075),
      align: "center",
      color: config.accent || "#FDE68A",
      width: "2.35",
      wrapCount: "28",
      scale: "0.55 0.55 0.55",
    });
    addButton(machine, {
      id: config.buttonId,
      position: config.selectPosition || "-0.36 0.55 0.38",
      rotation: "-65 0 0",
      action: config.stationAction,
      color: config.accentDark || "#0F766E",
      label: config.selectLabel || "Elegir",
      width: config.selectWidth || "0.58",
      height: config.selectHeight || "0.22",
      depth: config.selectDepth || "0.05",
      textWidth: config.selectTextWidth || "1.7",
      textPosition: config.selectTextPosition || "0 0 0.04",
    });
    addButton(machine, {
      id: config.runButtonId,
      position: config.runPosition || "0.34 0.55 0.38",
      rotation: "-65 0 0",
      action: config.runAction || "prob-run-once",
      color: config.accent || "#F59E0B",
      label: config.runLabel || "Activar",
      width: config.runWidth || "0.66",
      height: config.runHeight || "0.22",
      depth: config.runDepth || "0.05",
      textWidth: config.runTextWidth || "1.8",
      textPosition: config.runTextPosition || "0 0 0.04",
    });
    appendEl(machine, "a-entity", {
      id: config.visualId,
      position: "0 0.63 0.03",
    });
    return machine;
  }

  function addStationBadge(parentEl, config) {
    var badge = appendEl(parentEl, "a-entity", {
      position: config.position,
      rotation: config.rotation || "0 0 0",
    });
    appendEl(badge, "a-plane", {
      width: config.width || "1.08",
      height: config.height || "0.32",
      color: config.color || "#020617",
      opacity: config.opacity || "0.94",
    });
    addText(badge, {
      value: config.title,
      position: "0 0.075 0.026",
      align: "center",
      color: config.titleColor || "#FFFFFF",
      width: config.titleWidth || "2.6",
      wrapCount: config.titleWrap || "26",
      scale: config.titleScale || "0.42 0.42 0.42",
    });
    addText(badge, {
      value: config.subtitle,
      position: "0 -0.08 0.026",
      align: "center",
      color: config.subtitleColor || "#CBD5E1",
      width: config.subtitleWidth || "2.8",
      wrapCount: config.subtitleWrap || "32",
      scale: config.subtitleScale || "0.31 0.31 0.31",
    });
    return badge;
  }

  function addMachineHeader(parentEl, config) {
    appendEl(parentEl, "a-box", {
      width: config.width || "1.08",
      height: config.height || "0.42",
      depth: "0.04",
      position: config.position,
      color: config.color || "#052E16",
      opacity: "0.98",
    });
    addText(parentEl, {
      value: config.title,
      position: config.titlePosition,
      align: "center",
      color: config.titleColor || "#FDE68A",
      width: config.titleWidth || "2.5",
      wrapCount: config.titleWrap || "22",
      scale: config.titleScale || "0.5 0.5 0.5",
    });
    addText(parentEl, {
      value: config.subtitle,
      position: config.subtitlePosition,
      align: "center",
      color: config.subtitleColor || "#E0F2FE",
      width: config.subtitleWidth || "2.8",
      wrapCount: config.subtitleWrap || "28",
      scale: config.subtitleScale || "0.36 0.36 0.36",
    });
  }

  var coinMachine = appendEl(root, "a-entity", {
    id: "prob-coin-machine",
    position: side * 3.15 + " 0 -2.05",
    rotation: frontRot,
    scale: "1.08 1.08 1.08",
  });
  appendEl(coinMachine, "a-box", {
    width: "1.34",
    height: "1.82",
    depth: "0.6",
    position: "0 1.04 -0.04",
    color: "#190D08",
    shadow: "cast: true; receive: true",
  });
  appendEl(coinMachine, "a-box", {
    width: "1.46",
    height: "0.18",
    depth: "0.72",
    position: "0 0.18 0",
    color: "#12362D",
    shadow: "cast: true; receive: true",
  });
  appendEl(coinMachine, "a-box", {
    width: "1.22",
    height: "1.62",
    depth: "0.035",
    position: "0 1.08 0.275",
    color: "#2A170B",
    opacity: "0.98",
  });
  addMachineHeader(coinMachine, {
    position: "0 1.78 0.31",
    width: "1.12",
    height: "0.32",
    color: "#06311F",
    title: "BINOMIAL",
    subtitle: "monedas: 10 lanzamientos",
    titlePosition: "0 1.84 0.34",
    subtitlePosition: "0 1.71 0.34",
    titleColor: "#FDE68A",
    subtitleColor: "#DCFCE7",
    titleScale: "0.54 0.54 0.54",
    subtitleScale: "0.3 0.3 0.3",
  });
  appendEl(coinMachine, "a-box", {
    width: "1.12",
    height: "0.56",
    depth: "0.045",
    position: "0 1.31 0.302",
    color: "#0F3B2D",
    opacity: "0.98",
  });
  appendEl(coinMachine, "a-plane", {
    width: "1.03",
    height: "0.47",
    position: "0 1.31 0.328",
    color: "#E7E0CE",
    opacity: "0.98",
  });
  for (var flip = 0; flip < 10; flip++) {
    var row = Math.floor(flip / 5);
    var col = flip % 5;
    var x = -0.4 + col * 0.2;
    var y = 1.39 - row * 0.19;
    appendEl(coinMachine, "a-cylinder", {
      id: "prob-coin-flip-body-" + flip,
      position: x + " " + y + " 0.36",
      rotation: "90 0 0",
      radius: "0.075",
      height: "0.018",
      color: "#C9BFA8",
      opacity: "0.98",
    });
    appendEl(coinMachine, "a-ring", {
      id: "prob-coin-flip-rim-" + flip,
      position: x + " " + y + " 0.374",
      "radius-inner": "0.061",
      "radius-outer": "0.073",
      color: "#A78A2D",
      opacity: "0.9",
    });
    appendEl(coinMachine, "a-circle", {
      id: "prob-coin-flip-face-head-" + flip,
      position: x + " " + (y + 0.017) + " 0.379",
      radius: "0.019",
      color: "#A98213",
      visible: "false",
    });
    appendEl(coinMachine, "a-circle", {
      id: "prob-coin-flip-face-body-" + flip,
      position: x + " " + (y - 0.024) + " 0.379",
      radius: "0.031",
      scale: "1.4 0.72 1",
      color: "#A98213",
      visible: "false",
    });
    appendEl(coinMachine, "a-box", {
      id: "prob-coin-flip-cross-a-" + flip,
      position: x + " " + y + " 0.379",
      rotation: "0 0 45",
      width: "0.09",
      height: "0.012",
      depth: "0.006",
      color: "#334155",
      visible: "false",
    });
    appendEl(coinMachine, "a-box", {
      id: "prob-coin-flip-cross-b-" + flip,
      position: x + " " + y + " 0.379",
      rotation: "0 0 -45",
      width: "0.09",
      height: "0.012",
      depth: "0.006",
      color: "#334155",
      visible: "false",
    });
    addText(coinMachine, {
      id: "prob-coin-flip-label-" + flip,
      value: "?",
      position: x + " " + (y - 0.012) + " 0.373",
      align: "center",
      color: "#3B2A16",
      width: "0.45",
      wrapCount: "4",
      scale: "0.28 0.28 0.28",
    });
  }
  addText(coinMachine, {
    value: "cara = rostro   cruz = X",
    position: "0 1.05 0.353",
    align: "center",
    color: "#D7F5E6",
    width: "2.2",
    wrapCount: "22",
    scale: "0.26 0.26 0.26",
  });
  appendEl(coinMachine, "a-box", {
    width: "1.03",
    height: "0.24",
    depth: "0.035",
    position: "0 0.9 0.326",
    color: "#07120C",
    opacity: "0.98",
  });
  addText(coinMachine, {
    id: "prob-coin-display",
    value: "",
    position: "0 0.9 0.353",
    align: "center",
    color: "#FDE68A",
    width: "2.2",
    wrapCount: "24",
    scale: "0.42 0.42 0.42",
  });
  appendEl(coinMachine, "a-box", {
    width: "1.02",
    height: "0.08",
    depth: "0.08",
    position: "0 0.72 0.315",
    color: "#111827",
  });
  appendEl(coinMachine, "a-box", {
    width: "1.04",
    height: "0.14",
    depth: "0.24",
    position: "0 0.43 0.2",
    color: "#0F172A",
    shadow: "cast: true; receive: true",
  });
  appendEl(coinMachine, "a-box", {
    width: "0.96",
    height: "0.025",
    depth: "0.2",
    position: "0 0.51 0.31",
    color: "#F59E0B",
  });
  addButton(coinMachine, {
    id: "prob-coin-select",
    position: "-0.3 0.62 0.35",
    rotation: "-12 0 0",
    action: "prob-station-coin",
    color: "#0F766E",
    label: "Elegir",
    width: "0.44",
    height: "0.16",
    depth: "0.045",
    textWidth: "1.2",
    textPosition: "0 0 0.035",
  });
  addButton(coinMachine, {
    id: "prob-coin-run",
    position: "0.31 0.62 0.35",
    rotation: "-12 0 0",
    action: "prob-run-once",
    color: "#B45309",
    label: "Simular",
    width: "0.44",
    height: "0.16",
    depth: "0.045",
    textWidth: "1.15",
    textPosition: "0 0 0.035",
  });
  appendEl(coinMachine, "a-entity", {
    id: "prob-coin-visuals",
    position: "0 0.39 0.32",
  });

  var diceMachine = addMachineBase({
    id: "prob-dice-machine",
    position: side * 3.15 + " 0 0",
    rotation: frontRot,
    displayId: "prob-dice-display",
    buttonId: "prob-dice-select",
    runButtonId: "prob-dice-run",
    visualId: "prob-dice-visuals",
    stationAction: "prob-station-dice",
    runAction: "prob-run-once",
    runLabel: "x1",
    selectPosition: "-0.54 0.54 0.43",
    selectWidth: "0.34",
    selectHeight: "0.17",
    selectDepth: "0.04",
    selectTextWidth: "0.95",
    selectTextPosition: "0 0 0.032",
    runPosition: "-0.18 0.54 0.43",
    runWidth: "0.3",
    runHeight: "0.17",
    runDepth: "0.04",
    runTextWidth: "0.9",
    runTextPosition: "0 0 0.032",
    accent: "#38BDF8",
    accentDark: "#0369A1",
    bodyColor: "#082F49",
    width: "1.55",
    depth: "1.12",
  });
  diceMachine.setAttribute("scale", "1.08 1.08 1.08");
  addMachineHeader(diceMachine, {
    position: "0 1.2 -0.455",
    width: "1.34",
    height: "0.36",
    color: "#031A2D",
    title: "UNIFORME\nDISCRETA",
    subtitle: "dado justo: caras 1 a 6",
    titlePosition: "0 1.28 -0.385",
    subtitlePosition: "0 1.13 -0.385",
    titleColor: "#7DD3FC",
    subtitleColor: "#E0F2FE",
    titleScale: "0.42 0.42 0.42",
    subtitleScale: "0.32 0.32 0.32",
  });
  addButton(diceMachine, {
    id: "prob-dice-run-ten",
    position: "0.16 0.54 0.43",
    rotation: "-65 0 0",
    action: "prob-run-ten",
    color: "#0284C7",
    label: "x10",
    width: "0.3",
    height: "0.17",
    depth: "0.04",
    textWidth: "0.9",
    textPosition: "0 0 0.032",
  });
  addButton(diceMachine, {
    id: "prob-dice-run-hundred",
    position: "0.52 0.54 0.43",
    rotation: "-65 0 0",
    action: "prob-run-hundred",
    color: "#075985",
    label: "x100",
    width: "0.34",
    height: "0.17",
    depth: "0.04",
    textWidth: "0.95",
    textPosition: "0 0 0.032",
  });
  function addDiePip(parentEl, position, rotation) {
    appendEl(parentEl, "a-circle", {
      position: position,
      rotation: rotation,
      radius: "0.026",
      color: "#111827",
      opacity: "0.98",
    });
  }

  function addDieFace(parentEl, face, value) {
    var side = 0.226;
    var offset = 0.088;
    var positions = {
      1: [[0, 0]],
      2: [[-offset, offset], [offset, -offset]],
      3: [[-offset, offset], [0, 0], [offset, -offset]],
      4: [[-offset, offset], [offset, offset], [-offset, -offset], [offset, -offset]],
      5: [[-offset, offset], [offset, offset], [0, 0], [-offset, -offset], [offset, -offset]],
      6: [[-offset, offset], [offset, offset], [-offset, 0], [offset, 0], [-offset, -offset], [offset, -offset]],
    }[value] || [];
    positions.forEach(function (pip) {
      var u = pip[0];
      var v = pip[1];
      if (face === "front") addDiePip(parentEl, u + " " + v + " " + side, "0 0 0");
      if (face === "back") addDiePip(parentEl, (-u) + " " + v + " " + (-side), "0 180 0");
      if (face === "right") addDiePip(parentEl, side + " " + v + " " + (-u), "0 90 0");
      if (face === "left") addDiePip(parentEl, (-side) + " " + v + " " + u, "0 -90 0");
      if (face === "top") addDiePip(parentEl, u + " " + side + " " + (-v), "-90 0 0");
      if (face === "bottom") addDiePip(parentEl, u + " " + (-side) + " " + v, "90 0 0");
    });
  }

  var diceCube = appendEl(diceMachine, "a-entity", {
    id: "prob-dice-cube",
    position: "0 0.78 0.08",
    rotation: "0 0 0",
  });
  appendEl(diceCube, "a-box", {
    width: "0.44",
    height: "0.44",
    depth: "0.44",
    color: "#F8FAFC",
    shadow: "cast: true; receive: true",
  });
  addDieFace(diceCube, "front", 5);
  addDieFace(diceCube, "right", 3);
  addDieFace(diceCube, "top", 1);
  addDieFace(diceCube, "back", 2);
  addDieFace(diceCube, "left", 4);
  addDieFace(diceCube, "bottom", 6);
  addText(diceMachine, {
    id: "prob-dice-result",
    value: "",
    position: "0 0.38 0.42",
    rotation: "-65 0 0",
    align: "center",
    color: "#E0F2FE",
    width: "1.9",
    scale: "0.36 0.36 0.36",
  });

  var callsMachine = appendEl(root, "a-entity", {
    id: "prob-calls-machine",
    position: side * 3.15 + " 0 2.05",
    rotation: frontRot,
    scale: "1.08 1.08 1.08",
  });
  appendEl(callsMachine, "a-box", {
    width: "1.46",
    height: "2.18",
    depth: "0.36",
    position: "0 1.25 -0.04",
    color: "#071D12",
    shadow: "cast: true; receive: true",
  });
  appendEl(callsMachine, "a-box", {
    width: "1.56",
    height: "0.16",
    depth: "0.5",
    position: "0 0.18 0",
    color: "#202A2E",
    shadow: "cast: true; receive: true",
  });
  addMachineHeader(callsMachine, {
    position: "0 1.98 0.155",
    width: "1.24",
    height: "0.38",
    color: "#030B07",
    title: "POISSON",
    subtitle: "autos que pasan por minuto",
    titlePosition: "0 2.06 0.18",
    subtitlePosition: "0 1.9 0.18",
    titleColor: "#D9F99D",
    subtitleColor: "#ECFCCB",
    titleScale: "0.58 0.58 0.58",
    subtitleScale: "0.31 0.31 0.31",
  });
  appendEl(callsMachine, "a-box", {
    width: "1.1",
    height: "0.3",
    depth: "0.028",
    position: "0 1.62 0.165",
    color: "#06130D",
    opacity: "0.98",
  });
  addText(callsMachine, {
    id: "prob-calls-display",
    value: "",
    position: "0 1.62 0.187",
    align: "center",
    color: "#F8FAFC",
    width: "2.15",
    wrapCount: "28",
    scale: "0.4 0.4 0.4",
  });
  addText(callsMachine, {
    value: "CALLE POR MINUTO",
    position: "0 1.37 0.18",
    align: "center",
    color: "#BAE6FD",
    width: "2.1",
    wrapCount: "24",
    scale: "0.31 0.31 0.31",
  });
  appendEl(callsMachine, "a-box", {
    width: "0.33",
    height: "0.01",
    depth: "0.01",
    position: "-0.47 1.37 0.18",
    color: "#38BDF8",
  });
  appendEl(callsMachine, "a-box", {
    width: "0.33",
    height: "0.01",
    depth: "0.01",
    position: "0.47 1.37 0.18",
    color: "#38BDF8",
  });
  appendEl(callsMachine, "a-entity", {
    id: "prob-traffic-scene",
    position: "0 0 0",
  });
  appendEl(callsMachine, "a-box", {
    position: "0 0.88 0.185",
    width: "1.08",
    height: "0.38",
    depth: "0.035",
    color: "#374151",
    opacity: "0.98",
  });
  for (var stripe = 0; stripe < 5; stripe++) {
    appendEl(callsMachine, "a-box", {
      position: (-0.42 + stripe * 0.21) + " 0.88 0.212",
      width: "0.09",
      height: "0.012",
      depth: "0.008",
      color: "#F8FAFC",
    });
  }
  appendEl(callsMachine, "a-box", {
    position: "-0.54 0.88 0.212",
    width: "0.018",
    height: "0.38",
    depth: "0.008",
    color: "#FACC15",
  });
  appendEl(callsMachine, "a-cylinder", {
    position: "0.52 1.12 0.2",
    radius: "0.025",
    height: "0.18",
    color: "#475569",
  });
  appendEl(callsMachine, "a-sphere", {
    id: "prob-traffic-light",
    position: "0.52 1.22 0.2",
    radius: "0.035",
    color: "#22C55E",
  });
  for (var car = 0; car < 10; car++) {
    var carEl = appendEl(callsMachine, "a-entity", {
      id: "prob-traffic-car-" + car,
      position: "0 0.88 0.23",
      visible: "false",
    });
    appendEl(carEl, "a-box", {
      width: "0.14",
      height: "0.055",
      depth: "0.045",
      position: "0 0 0",
      color: car % 3 === 0 ? "#F97316" : car % 3 === 1 ? "#38BDF8" : "#A3E635",
    });
    appendEl(carEl, "a-box", {
      width: "0.075",
      height: "0.04",
      depth: "0.04",
      position: "-0.012 0.04 0",
      color: "#E0F2FE",
    });
    [-0.045, 0.045].forEach(function (wheelX) {
      appendEl(carEl, "a-cylinder", {
        position: wheelX + " -0.035 0.026",
        rotation: "90 0 0",
        radius: "0.018",
        height: "0.012",
        color: "#111827",
      });
    });
  }
  addButton(callsMachine, {
    id: "prob-calls-select",
    position: "-0.31 0.42 0.31",
    rotation: "-10 0 0",
    action: "prob-station-calls",
    color: "#0369A1",
    label: "Elegir λ",
    width: "0.52",
    height: "0.17",
    depth: "0.045",
    textWidth: "1.35",
    textPosition: "0 0 0.035",
  });
  addButton(callsMachine, {
    id: "prob-calls-run",
    position: "0.31 0.42 0.31",
    rotation: "-10 0 0",
    action: "prob-run-once",
    color: "#38BDF8",
    label: "Avanzar minuto",
    width: "0.5",
    height: "0.17",
    depth: "0.045",
    textColor: "#082F49",
    textWidth: "1.7",
    textPosition: "0 0 0.035",
  });
  appendEl(callsMachine, "a-entity", {
    id: "prob-calls-visuals",
    position: "0 0.68 0.18",
  });

  var controls = addPanel({
    id: "prob-controls",
    position: "0 2.15 -5.03",
    rotation: "0 0 0",
    width: 2.6,
    height: 0.72,
    accent: "#22C55E",
    color: "#052E16",
    opacity: "0.86",
  });
  addText(controls, {
    id: "prob-dist-name",
    value: "",
    position: "0 0.18 0.03",
    align: "center",
    color: "#DCFCE7",
    width: "2.5",
    scale: "0.62 0.62 0.62",
  });
  addText(controls, {
    id: "prob-limits-text",
    value: "",
    position: "0 -0.12 0.03",
    align: "center",
    color: "#BBF7D0",
    width: "2.5",
    scale: "0.52 0.52 0.52",
  });
  var paramPanel = appendEl(root, "a-entity", {
    id: "prob-param-panel",
    position: "0 2.05 -2.62",
    rotation: "0 0 0",
  });
  appendEl(paramPanel, "a-plane", {
    position: "0 0 -0.018",
    width: "4.45",
    height: "2.62",
    color: "#0D1720",
    opacity: "0.88",
    material: "side: double; transparent: true; roughness: 0.7; metalness: 0.05",
  });
  appendEl(paramPanel, "a-plane", {
    position: "0 0 -0.015",
    width: "4.56",
    height: "2.73",
    color: "#60A5FA",
    opacity: "0.22",
    material: "side: double; transparent: true",
  });
  appendEl(paramPanel, "a-plane", {
    position: "0 0 0.002",
    width: "4.32",
    height: "2.46",
    color: "#111827",
    opacity: "0.78",
    material: "side: double; transparent: true",
  });
  addText(paramPanel, {
    value: "Parámetros del modelo",
    position: "0 0.85 0.04",
    align: "center",
    color: "#E5F2FF",
    width: "4.2",
    scale: "0.9 0.9 0.9",
  });
  addText(paramPanel, {
    value: "Ajustá los parámetros matemáticos que definen la distribución teórica",
    position: "0 0.61 0.04",
    align: "center",
    color: "#93C5FD",
    width: "4",
    scale: "0.44 0.44 0.44",
  });
  appendEl(paramPanel, "a-plane", {
    position: "0 0.41 0.025",
    width: "3.62",
    height: "0.012",
    color: "#60A5FA",
    opacity: "0.55",
    material: "side: double; transparent: true",
  });
  appendEl(paramPanel, "a-entity", {
    id: "prob-param-rows",
    position: "0 0.02 0.06",
    scale: "1 1 1",
  });

  setTimeout(function () {
    renderProbabilityLab();
  }, 0);
}
