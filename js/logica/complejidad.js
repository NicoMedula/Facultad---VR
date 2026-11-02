// ===== LABORATORIO DE COMPLEJIDAD COMPUTACIONAL =====
// Adaptado de C:\Programacion\complexity_simulator:
// el proyecto original analiza AST de Python y estima Big O con
// reglas heuristicas sobre bucles, recursividad, sort y estructuras.

var COMPLEXITY_QUALITATIVE = {
  "O(1)": "Excelente: tiempo constante.",
  "O(log n)": "Excelente: crecimiento muy lento.",
  "O(n)": "Buena: crecimiento lineal.",
  "O(n log n)": "Buena: típica de ordenamientos eficientes.",
  "O(n^2)": "Aceptable solo para entradas pequeñas o medianas.",
  "O(n^3)": "Costosa para entradas medianas o grandes.",
  "O(2^n)": "Muy costosa: viable solo con n pequeño.",
  "O(n!)": "Extrema: evitar para entradas grandes.",
};

var COMPLEXITY_FEEDBACK = {
  "O(1)": { ok: true, msg: "Tiempo constante: el costo no depende del tamaño de la entrada. Es el mejor caso posible." },
  "O(log n)": { ok: true, msg: "Crecimiento logarítmico: aunque la entrada crezca mucho, el costo sube muy poco. Patrón de búsqueda binaria." },
  "O(n)": { ok: true, msg: "Crecimiento lineal: el costo acompaña al tamaño de la entrada de forma proporcional. Eficiente y escalable." },
  "O(n log n)": { ok: true, msg: "Típico de ordenamientos eficientes. Escala muy bien incluso con entradas grandes." },
  "O(n^2)": { ok: false, msg: "Bucles anidados: el costo crece al cuadrado. Sirve para entradas chicas. Tip: un set o diccionario auxiliar suele bajarlo a O(n)." },
  "O(n^3)": { ok: false, msg: "Tres bucles anidados: crecimiento cúbico. Para datos medianos o grandes, revisá algoritmos optimizados o librerías numéricas." },
  "O(2^n)": { ok: false, msg: "Recursividad múltiple: el trabajo se duplica en cada paso. Solo viable con n chico. Tip: memoización o programación dinámica." },
  "O(n!)": { ok: false, msg: "Crecimiento factorial: evitar para entradas grandes. Buscá podas o heurísticas." },
};

var COMPLEXITY_RANK = {
  "O(1)": 0, "O(log n)": 1, "O(n)": 2, "O(n log n)": 3,
  "O(n^2)": 4, "O(n^3)": 5, "O(2^n)": 6, "O(n!)": 7,
};

var COMPLEXITY_CODE_LIBRARY = [
  {
    id: "const",
    name: "Constante",
    code:
      "def first_item(items):\n" +
      "    return items[0]\n",
    traits: { loops: 0, recursion: "no", sort: false, halving: false },
    metrics: {
      functions: 1,
      loops: 0,
      recursion: "no",
      conditionals: 0,
      calls: 0,
      assigns: 0,
      depth: 1,
    },
    explain: "Acceso directo a un elemento. No depende de n.",
    recommend: "Ideal cuando solo necesitás el primer elemento o un índice fijo.",
  },
  {
    id: "lineal",
    name: "Lineal",
    code:
      "def linear_search(items, target):\n" +
      "    for i in range(len(items)):\n" +
      "        if items[i] == target:\n" +
      "            return i\n" +
      "    return -1\n",
    traits: { loops: 1, recursion: "no", sort: false, halving: false },
    metrics: {
      functions: 1,
      loops: 1,
      recursion: "no",
      conditionals: 1,
      calls: 1,
      assigns: 0,
      depth: 2,
    },
    explain: "Recorre la lista completa en el peor caso.",
    recommend: "Si la lista está ordenada, usá búsqueda binaria para bajar a O(log n).",
  },
  {
    id: "binaria",
    name: "Binaria",
    code:
      "def binary_search(items, target):\n" +
      "    low, high = 0, len(items) - 1\n" +
      "    while low <= high:\n" +
      "        mid = (low + high) // 2\n" +
      "        if items[mid] == target:\n" +
      "            return mid\n" +
      "        if items[mid] < target:\n" +
      "            low = mid + 1\n" +
      "        else:\n" +
      "            high = mid - 1\n" +
      "    return -1\n",
    traits: { loops: 0, recursion: "no", sort: false, halving: true },
    metrics: {
      functions: 1,
      loops: 1,
      recursion: "no",
      conditionals: 2,
      calls: 1,
      assigns: 3,
      depth: 3,
    },
    explain: "Parte el problema a la mitad en cada paso.",
    recommend: "Requiere datos ordenados; si no, ordená primero.",
  },
  {
    id: "ordena",
    name: "Ordena",
    code:
      "def sort_values(values):\n" +
      "    return sorted(values)\n",
    traits: { loops: 0, recursion: "no", sort: true, halving: false },
    metrics: {
      functions: 1,
      loops: 0,
      recursion: "no",
      conditionals: 0,
      calls: 1,
      assigns: 0,
      depth: 1,
    },
    explain: "Usa un algoritmo de ordenamiento eficiente (n log n).",
    recommend: "Si no necesitás un orden total, usá selección parcial (n).",
  },
  {
    id: "doble",
    name: "Doble bucle",
    code:
      "total = 0\n" +
      "for i in range(n):\n" +
      "    for j in range(n):\n" +
      "        total += matrix[i][j]\n",
    traits: { loops: 2, recursion: "no", sort: false, halving: false },
    metrics: {
      functions: 0,
      loops: 2,
      recursion: "no",
      conditionals: 0,
      calls: 1,
      assigns: 2,
      depth: 3,
    },
    explain: "Dos bucles anidados: n * n operaciones.",
    recommend: "Buscá reducir una dimensión o usar estructuras precomputadas.",
  },
  {
    id: "fibo",
    name: "Fibonacci",
    code:
      "def fib(n):\n" +
      "    if n <= 1:\n" +
      "        return n\n" +
      "    return fib(n - 1) + fib(n - 2)\n",
    traits: { loops: 0, recursion: "multiple", sort: false, halving: false },
    metrics: {
      functions: 1,
      loops: 0,
      recursion: "múltiple",
      conditionals: 1,
      calls: 2,
      assigns: 0,
      depth: 2,
    },
    explain: "Cada llamada se divide en dos ramas recursivas.",
    recommend: "Usá memoización o una versión iterativa para bajar a O(n).",
  },
];

// El texto 3D descarta cualquier espacio al inicio de línea:
// se usa U+2800 (blanco en la fuente) para conservar la sangría de Python.
function indentCode(code) {
  return code.replace(/^ +/gm, function (spaces) {
    return spaces.replace(/ /g, "\u2800");
  });
}

function formatAstMetrics(sample) {
  if (!sample || !sample.metrics) return "";
  var m = sample.metrics;
  return (
    "Funciones: " + m.functions + "\n" +
    "Bucles: " + m.loops + "\n" +
    "Recursividad: " + m.recursion + "\n" +
    "Condicionales: " + m.conditionals + "\n" +
    "Llamadas: " + m.calls + "\n" +
    "Asignaciones: " + m.assigns + "\n" +
    "Profundidad: " + m.depth
  );
}

function getComplexitySample(sampleId) {
  return COMPLEXITY_CODE_LIBRARY.find(function (sample) {
    return sample.id === sampleId;
  });
}

function deriveBigO(state) {
  if (state.recursion === "multiple") {
    return state.loops >= 1 ? "O(n!)" : "O(2^n)";
  }
  var candidates = [];
  if (state.loops >= 3) candidates.push("O(n^3)");
  else if (state.loops === 2) candidates.push("O(n^2)");
  else if (state.loops === 1) candidates.push("O(n)");
  else candidates.push(state.halving ? "O(log n)" : "O(1)");
  if (state.sort) candidates.push("O(n log n)");
  if (state.recursion === "simple") candidates.push("O(n)");
  var best = candidates[0];
  candidates.forEach(function (c) {
    if (COMPLEXITY_RANK[c] > COMPLEXITY_RANK[best]) best = c;
  });
  return best;
}

function deriveReason(state, bigO) {
  var traits =
    "Bucles anidados sobre n: " + state.loops + "\n" +
    "Recursividad: " + (state.recursion === "multiple" ? "múltiple" : state.recursion) + "\n" +
    "Ordena (sort): " + (state.sort ? "sí" : "no") + "\n" +
    "Divide a la mitad: " + (state.halving ? "sí" : "no");
  var why;
  if (state.recursion === "multiple") why = "La recursividad múltiple domina el costo.";
  else if (state.loops >= 2) why = state.loops + " bucles anidados elevan n a la potencia " + state.loops + ".";
  else if (state.sort && COMPLEXITY_RANK[bigO] === COMPLEXITY_RANK["O(n log n)"]) why = "La operación de ordenamiento domina con crecimiento n log n.";
  else if (state.loops === 1) why = "Un único recorrido de la entrada da crecimiento lineal.";
  else if (state.halving) why = "Descartar la mitad en cada paso da crecimiento logarítmico.";
  else why = "No hay bucles ni recursividad que dependan de n.";
  return { traits: traits, why: why };
}

var complexityState = {
  n: 1000,
  loops: 1,
  recursion: "no",
  sort: false,
  halving: false,
  sampleId: null,
  easyMode: true,
  calculated: false,
  result: null,
};

function complexityValue(label, n) {
  if (label === "O(1)") return 1;
  if (label === "O(log n)") return Math.log2(Math.max(2, n));
  if (label === "O(n)") return n;
  if (label === "O(n log n)") return n * Math.log2(Math.max(2, n));
  if (label === "O(n^2)") return n * n;
  if (label === "O(n^3)") return n * n * n;
  if (label === "O(2^n)") return Math.pow(2, Math.min(n, 30));
  if (label === "O(n!)") {
    var total = 1;
    for (var i = 2; i <= Math.min(n, 12); i++) total *= i;
    return total;
  }
  return n;
}

function formatComplexityOps(value) {
  if (!Number.isFinite(value)) return "muy grande";
  if (value >= 1000000) return value.toExponential(2);
  return Math.round(value).toString();
}

function complexityColor(label) {
  if (label === "O(1)") return "#22C55E";
  if (label === "O(log n)") return "#14B8A6";
  if (label === "O(n)") return "#3B82F6";
  if (label === "O(n log n)") return "#8B5CF6";
  if (label === "O(n^2)") return "#F59E0B";
  if (label === "O(n^3)") return "#F97316";
  return "#EF4444";
}

function handleComplexityAction(action) {
  var s = complexityState;
  if (action.indexOf("complexity-code-") === 0) {
    var sampleId = action.slice("complexity-code-".length);
    var sample = getComplexitySample(sampleId);
    if (sample) {
      s.sampleId = sample.id;
      s.loops = sample.traits.loops;
      s.recursion = sample.traits.recursion;
      s.sort = sample.traits.sort;
      s.halving = sample.traits.halving;
      s.result = deriveBigO(s);
      s.calculated = true;
    }
    renderComplexityLab();
    return;
  }
  if (action === "complexity-mode-toggle") {
    s.easyMode = !s.easyMode;
    renderComplexityLab();
    return;
  }
  if (action === "complexity-n-minus") s.n = Math.max(10, s.n - 10);
  else if (action === "complexity-n-plus") s.n = Math.min(2000, s.n + 10);
  else if (action === "complexity-n-big-minus") s.n = Math.max(10, s.n - 100);
  else if (action === "complexity-n-big-plus") s.n = Math.min(2000, s.n + 100);
  else if (action === "complexity-loops-minus") { s.loops = Math.max(0, s.loops - 1); s.calculated = false; s.sampleId = null; }
  else if (action === "complexity-loops-plus") { s.loops = Math.min(3, s.loops + 1); s.calculated = false; s.sampleId = null; }
  else if (action === "complexity-rec-no") { s.recursion = "no"; s.calculated = false; s.sampleId = null; }
  else if (action === "complexity-rec-simple") { s.recursion = "simple"; s.calculated = false; s.sampleId = null; }
  else if (action === "complexity-rec-multiple") { s.recursion = "multiple"; s.calculated = false; s.sampleId = null; }
  else if (action === "complexity-sort-toggle") { s.sort = !s.sort; s.calculated = false; s.sampleId = null; }
  else if (action === "complexity-halving-toggle") { s.halving = !s.halving; s.calculated = false; s.sampleId = null; }
  else if (action === "complexity-calcular") { s.result = deriveBigO(s); s.calculated = true; }
  else if (action === "complexity-reset") {
    s.loops = 1; s.recursion = "no"; s.sort = false; s.halving = false;
    s.n = 1000; s.calculated = false; s.result = null; s.sampleId = null;
  }
  renderComplexityLab();
}

function renderComplexityChart(root, selectedBigO) {
  clearEntityChildren(root);
  if (!root) return;

  selectedBigO = selectedBigO || "O(n^2)";
  var hardCap = selectedBigO === "O(2^n)" || selectedBigO === "O(n!)" ? 30 : 2000;
  var maxN = Math.max(10, Math.min(hardCap, complexityState.n));
  var width = 2.45;
  var height = 0.82;
  var originX = 0.12;
  var originY = 0.08;
  var points = [];
  var samples = 42;
  var maxLog = 1;

  for (var i = 0; i < samples; i++) {
    var n = 1 + Math.round(((maxN - 1) * i) / (samples - 1));
    var value = complexityValue(selectedBigO, n);
    var logValue = Math.log10(value + 1);
    maxLog = Math.max(maxLog, logValue);
    points.push({ n: n, value: value, logValue: logValue });
  }

  points.forEach(function (point) {
    point.x = originX + ((point.n - 1) / (maxN - 1)) * width;
    point.y = originY + (point.logValue / maxLog) * height;
  });

  function addLine(x1, y1, x2, y2, color, thickness) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    var length = Math.sqrt(dx * dx + dy * dy);
    var angle = Math.atan2(dy, dx) * 180 / Math.PI;
    appendEl(root, "a-plane", {
      width: length,
      height: thickness || "0.018",
      position: ((x1 + x2) / 2) + " " + ((y1 + y2) / 2) + " 0.02",
      rotation: "0 0 " + angle,
      color: color,
      opacity: "0.95",
      material: "side: double",
    });
  }

  appendEl(root, "a-plane", {
    width: "2.8",
    height: "1.05",
    position: "1.35 0.46 -0.01",
    color: "#050505",
    opacity: "0.35",
    material: "side: double",
  });
  appendEl(root, "a-plane", {
    width: width,
    height: "0.025",
    position: (originX + width / 2) + " " + originY + " 0.01",
    color: "#78716C",
    material: "side: double",
  });
  appendEl(root, "a-plane", {
    width: "0.025",
    height: height,
    position: originX + " " + (originY + height / 2) + " 0.01",
    color: "#78716C",
    material: "side: double",
  });

  for (var s = 0; s < points.length - 1; s++) {
    addLine(points[s].x, points[s].y, points[s + 1].x, points[s + 1].y, complexityColor(selectedBigO), "0.022");
  }

  points.forEach(function (point, index) {
    if (index % 8 !== 0 && index !== points.length - 1) return;
    appendEl(root, "a-circle", {
      radius: "0.035",
      position: point.x + " " + point.y + " 0.04",
      color: complexityColor(selectedBigO),
      material: "side: double",
    });
    addText(root, {
      value: String(point.n),
      position: point.x + " " + (originY - 0.11) + " 0.04",
      align: "center",
      color: "#D6D3D1",
      width: "0.7",
      scale: "0.24 0.24 0.24",
    });
  });

  var markerN = Math.max(1, Math.min(maxN, complexityState.n));
  var markerValue = complexityValue(selectedBigO, markerN);
  var markerLog = Math.log10(markerValue + 1);
  var markerX = originX + ((markerN - 1) / (maxN - 1)) * width;
  var markerY = originY + (markerLog / maxLog) * height;
  addLine(markerX, originY, markerX, markerY, "#FDE68A", "0.014");
  appendEl(root, "a-circle", {
    radius: "0.055",
    position: markerX + " " + markerY + " 0.06",
    color: "#FDE68A",
    material: "side: double",
  });
  addText(root, {
    value: selectedBigO,
    position: "1.38 1.02 0.05",
    align: "center",
    color: complexityColor(selectedBigO),
    width: "2.6",
    scale: "0.42 0.42 0.42",
  });
  addText(root, {
    value: "n",
    position: (originX + width + 0.17) + " " + (originY - 0.01) + " 0.04",
    align: "center",
    color: "#E7E5E4",
    width: "0.5",
    scale: "0.32 0.32 0.32",
  });
  addText(root, {
    value: "ops",
    position: (originX - 0.08) + " " + (originY + height + 0.12) + " 0.04",
    align: "center",
    color: "#E7E5E4",
    width: "0.7",
    scale: "0.28 0.28 0.28",
  });
  addText(root, {
    value:
      "n=" + complexityState.n +
      "  ops~" + formatComplexityOps(complexityValue(selectedBigO, Math.min(complexityState.n, maxN))),
    position: "1.38 -0.17 0.04",
    align: "center",
    color: "#FFFFFF",
    width: "2.7",
    scale: "0.31 0.31 0.31",
  });
}

function renderComplexityLab() {
  var lab = document.getElementById("complexity-lab");
  if (!lab) return;
  var s = complexityState;

  var caseName = lab.querySelector("#complexity-case-name");
  var sortLabel = lab.querySelector("#complexity-sort-label");
  var halvingLabel = lab.querySelector("#complexity-halving-label");
  var codeTitle = lab.querySelector("#complexity-code-title");
  var code = lab.querySelector("#complexity-code");
  var result = lab.querySelector("#complexity-result");
  var metrics = lab.querySelector("#complexity-metrics");
  var recommendation = lab.querySelector("#complexity-recommendation");
  var chart = lab.querySelector("#complexity-chart");
  var selectedSample = s.sampleId ? getComplexitySample(s.sampleId) : null;
  if (sortLabel) sortLabel.setAttribute("value", "");
  if (halvingLabel) halvingLabel.setAttribute("value", "");

  var preview = s.result || deriveBigO(s);
  var info = deriveReason(s, preview);
  if (selectedSample) {
    if (codeTitle) codeTitle.setAttribute("value", "CÓDIGO: " + selectedSample.name);
    if (code) code.setAttribute("value", indentCode(selectedSample.code));
  } else {
    if (codeTitle) codeTitle.setAttribute("value", "TU SELECCIÓN");
    if (code) code.setAttribute("value", info.traits);
  }

  if (!s.calculated) {
    if (caseName) caseName.setAttribute("value", "Esperando selección");
    if (result) result.setAttribute("value", "Seleccioná una complejidad en el panel izquierdo");
    if (metrics) metrics.setAttribute("value", "Métricas de ejecución de código.");
    if (recommendation) recommendation.setAttribute("value", "");
    clearEntityChildren(chart);
    return;
  }

  var bigO = s.result;
  var ops = complexityValue(bigO, s.n);

  if (caseName) caseName.setAttribute("value", "Complejidad: " + bigO);
  if (result) {
    result.setAttribute(
      "value",
      "Función del comportamiento: " + bigO +
        " | ops aprox. (n=" + s.n + "): " + formatComplexityOps(ops) +
        "\n" + (COMPLEXITY_QUALITATIVE[bigO] || ""),
    );
  }

  if (selectedSample) {
    if (codeTitle) codeTitle.setAttribute("value", "ESTRUCTURA: " + selectedSample.name);
    if (code) code.setAttribute("value", indentCode(selectedSample.code));

    if (metrics) {
      metrics.setAttribute(
        "value",
        "RESUMEN DE MÉTRICAS ESTRUCTURALES:\n" +
          formatAstMetrics(selectedSample) +
          "\n\nEXPLICACIÓN:\n" + selectedSample.explain,
      );
    }
    if (recommendation) {
      recommendation.setAttribute(
        "value",
        "RECOMENDACIONES DE OPTIMIZACIÓN:\n" + selectedSample.recommend,
      );
    }
  }

  renderComplexityChart(chart, bigO);
}
