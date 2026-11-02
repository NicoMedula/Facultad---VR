// ===== ALGORITMOS DE ORDENAMIENTO (AULA 2) =====

var algorithmTimeouts = [];
var currentAlgorithm = null;
var isSorting = false;
var algorithmState = null;
var algorithmSpeedOptions = [
  { label: "Vel 1x", factor: 1 },
  { label: "Lento", factor: 1.6 },
  { label: "Muy lento", factor: 2.4 },
];

function stopAlgorithmAnimations(opts) {
  opts = opts || {};
  algorithmTimeouts.forEach(clearTimeout);
  algorithmTimeouts = [];
  isSorting = false;
  algorithmState = null;
  var pi = document.getElementById("progress-indicator");
  if (pi && pi.parentNode) pi.parentNode.removeChild(pi);
  var ad = document.getElementById("array-display");
  if (ad && ad.parentNode) ad.parentNode.removeChild(ad);
  if (opts.resetDisplay) {
    var algDisp = document.getElementById("algorithm-display");
    var algMenu = document.getElementById("alg-menu");
    if (algDisp) algDisp.setAttribute("visible", false);
    if (algMenu) algMenu.setAttribute("visible", true);
    currentAlgorithm = null;
    document.getElementById("mathHUD").style.display = "none";
  }
}

function scheduleAlgorithmTimeout(cb, delay) {
  var id = setTimeout(function () {
    algorithmTimeouts = algorithmTimeouts.filter(function (t) {
      return t !== id;
    });
    cb();
  }, delay);
  algorithmTimeouts.push(id);
  return id;
}

function updateAlgorithmControlLabels() {
  var pauseLabel = document.getElementById("pause-algo-label");
  var slowLabel = document.getElementById("slow-algo-label");
  if (pauseLabel) {
    pauseLabel.setAttribute(
      "value",
      algorithmState && algorithmState.paused ? "Reanudar" : "Pausar",
    );
  }
  if (slowLabel) {
    var speedIndex = algorithmState ? algorithmState.speedIndex : 0;
    slowLabel.setAttribute(
      "value",
      algorithmSpeedOptions[speedIndex].label,
    );
  }
}

function resetAlgorithmCubeColors(parent) {
  if (!parent) return;
  var all = parent.querySelectorAll(".algo-cube");
  all.forEach(function (c) {
    var b = c.querySelector(".cube-body");
    if (b) b.setAttribute("color", "#8BC34A");
  });
}

function showAlgorithm(algoKey) {
  stopAlgorithmAnimations();
  currentAlgorithm = algoKey;
  document.getElementById("alg-menu").setAttribute("visible", false);
  document
    .getElementById("algorithm-display")
    .setAttribute("visible", true);
  var title =
    {
      bubble: "Bubble Sort",
      insertion: "Insertion Sort",
      quick: "Quick Sort",
      baraja: "Baraja",
      intercambio: "Intercambio Directo",
    }[algoKey] || "Algoritmo";
  document
    .getElementById("current-algo-title")
    .setAttribute("value", title);
  var hud = document.getElementById("mathHUD");
  hud.style.display = "block";
  document.getElementById("functionTitle").textContent = title;
  var descs = {
    bubble:
      "Compara elementos adyacentes e intercambia si están en orden incorrecto.",
    insertion: "Toma elementos e inserta en la posición correcta.",
    quick: "Selecciona un pivote y reorganiza los elementos.",
    baraja: "Ordena como una baraja: toma cada elemento y lo inserta donde corresponde.",
    intercambio:
      "Compara pares vecinos e intercambia directamente cuando están invertidos.",
  };
  document.getElementById("functionDescription").textContent =
    descs[algoKey] || "";
  document.getElementById("functionDomain").textContent =
    "Observá las comparaciones y los movimientos";

  var arr = generateRandomArray();
  generateAlgorithmBars(arr);
  var steps = getSortingSteps(algoKey, arr.slice());
  animateAlgorithmSteps(steps, 800, algoKey);
}

function generateRandomArray() {
  var numbers = [1, 2, 3, 4, 5, 6, 7];
  for (var i = numbers.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = numbers[i];
    numbers[i] = numbers[j];
    numbers[j] = temp;
  }
  return numbers;
}

function generateAlgorithmBars(array) {
  var parent = document.getElementById("algo-surface");
  while (parent.firstChild) parent.removeChild(parent.firstChild);
  var spacing = 0.55;
  var totalWidth = (array.length - 1) * spacing;
  var cubeSize = 0.45;

  for (var i = 0; i < array.length; i++) {
    var val = array[i];
    var x = -totalWidth / 2 + i * spacing;
    var cc = document.createElement("a-entity");
    cc.setAttribute("position", x + " " + cubeSize / 2 + " 0");
    cc.setAttribute("class", "algo-cube");
    cc.setAttribute("data-index", i);
    cc.setAttribute("data-value", val);

    var cube = document.createElement("a-box");
    cube.setAttribute("width", cubeSize);
    cube.setAttribute("height", cubeSize);
    cube.setAttribute("depth", cubeSize);
    cube.setAttribute("color", "#4CAF50");
    cube.setAttribute("class", "cube-body");
    cc.appendChild(cube);

    var text = document.createElement("a-text");
    text.setAttribute("value", val.toString());
    text.setAttribute("align", "center");
    text.setAttribute("color", "#ffffff");
    text.setAttribute("width", 2.5);
    text.setAttribute("position", "0 0 " + (cubeSize / 2 + 0.01));
    cc.appendChild(text);

    parent.appendChild(cc);
  }
}

function getSortingSteps(algo, arr) {
  var steps = [];
  if (algo === "bubble" || algo === "intercambio") {
    for (var i = 0; i < arr.length - 1; i++) {
      for (var j = 0; j < arr.length - 1 - i; j++) {
        steps.push({ type: "compare", i: j, j: j + 1 });
        if (arr[j] > arr[j + 1]) {
          var t = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = t;
          steps.push({ type: "swap", i: j, j: j + 1 });
        }
      }
    }
  } else if (algo === "insertion" || algo === "baraja") {
    for (var i2 = 1; i2 < arr.length; i2++) {
      var j2 = i2;
      while (j2 > 0) {
        steps.push({ type: "compare", i: j2 - 1, j: j2 });
        if (arr[j2 - 1] > arr[j2]) {
          var t2 = arr[j2 - 1];
          arr[j2 - 1] = arr[j2];
          arr[j2] = t2;
          steps.push({ type: "swap", i: j2 - 1, j: j2 });
        } else break;
        j2--;
      }
    }
  } else if (algo === "quick") {
    (function qsort(a, lo, hi) {
      if (lo >= hi) return;
      var pivot = a[hi],
        p = lo;
      steps.push({ type: "pivot", index: hi });
      for (var k = lo; k < hi; k++) {
        steps.push({ type: "compare", i: k, j: hi });
        if (a[k] < pivot) {
          var tmp = a[k];
          a[k] = a[p];
          a[p] = tmp;
          steps.push({ type: "swap", i: k, j: p });
          p++;
        }
      }
      var tmp2 = a[p];
      a[p] = a[hi];
      a[hi] = tmp2;
      steps.push({ type: "swap", i: p, j: hi });
      qsort(a, lo, p - 1);
      qsort(a, p + 1, hi);
    })(arr, 0, arr.length - 1);
  }
  return steps;
}

function animateAlgorithmSteps(steps, delayMs, algorithmType) {
  isSorting = true;
  algorithmState = {
    steps: steps,
    stepIndex: 0,
    baseDelay: delayMs,
    speedIndex: 0,
    paused: false,
    locked: false,
    finished: false,
    parent: document.getElementById("algo-surface"),
    algorithmType: algorithmType,
  };
  updateAlgorithmControlLabels();
  scheduleNextAlgorithmStep(300);
}

function getAlgorithmDelay() {
  if (!algorithmState) return 800;
  return (
    algorithmState.baseDelay *
    algorithmSpeedOptions[algorithmState.speedIndex].factor
  );
}

function findAlgorithmCube(idx) {
  if (!algorithmState || !algorithmState.parent) return null;
  return algorithmState.parent.querySelector(
    '.algo-cube[data-index="' + idx + '"]',
  );
}

function readAlgorithmCubePos(el) {
  if (!el) return [0, 0, 0];
  var p = el.getAttribute("position");
  if (!p) return [0, 0, 0];
  if (typeof p === "string") {
    var pp = p.split(" ").map(parseFloat);
    return [pp[0] || 0, pp[1] || 0, pp[2] || 0];
  }
  return [p.x || 0, p.y || 0, p.z || 0];
}

function performAlgorithmSwap(i, j, dur, cb) {
  var aEl = findAlgorithmCube(i);
  var bEl = findAlgorithmCube(j);
  if (!aEl || !bEl) {
    if (cb) cb();
    return;
  }

  var posA = readAlgorithmCubePos(aEl);
  var posB = readAlgorithmCubePos(bEl);

  aEl.setAttribute("animation__swap", {
    property: "position",
    to: posB[0] + " " + posA[1] + " " + posA[2],
    dur: dur,
    easing: "easeInOutQuad",
  });
  bEl.setAttribute("animation__swap", {
    property: "position",
    to: posA[0] + " " + posB[1] + " " + posB[2],
    dur: dur,
    easing: "easeInOutQuad",
  });

  var bodyA = aEl.querySelector(".cube-body");
  var bodyB = bEl.querySelector(".cube-body");
  if (bodyA) bodyA.setAttribute("color", "#FF9800");
  if (bodyB) bodyB.setAttribute("color", "#FF9800");

  scheduleAlgorithmTimeout(function () {
    var idxA = aEl.getAttribute("data-index");
    var idxB = bEl.getAttribute("data-index");
    aEl.setAttribute("data-index", idxB);
    bEl.setAttribute("data-index", idxA);
    aEl.setAttribute(
      "position",
      posB[0] + " " + posA[1] + " " + posA[2],
    );
    bEl.setAttribute(
      "position",
      posA[0] + " " + posB[1] + " " + posB[2],
    );
    if (bodyA) bodyA.setAttribute("color", "#8BC34A");
    if (bodyB) bodyB.setAttribute("color", "#8BC34A");
    aEl.removeAttribute("animation__swap");
    bEl.removeAttribute("animation__swap");
    if (cb) cb();
  }, dur);
}

function applyAlgorithmStep(step, cb) {
  if (!algorithmState) {
    if (cb) cb();
    return;
  }
  var parent = algorithmState.parent;
  var factor = algorithmSpeedOptions[algorithmState.speedIndex].factor;
  resetAlgorithmCubeColors(parent);

  if (step.type === "compare") {
    var cA = findAlgorithmCube(step.i);
    var cB = findAlgorithmCube(step.j);
    if (cA) {
      var b = cA.querySelector(".cube-body");
      if (b) b.setAttribute("color", "#FFEB3B");
    }
    if (cB) {
      var b2 = cB.querySelector(".cube-body");
      if (b2) b2.setAttribute("color", "#FFEB3B");
    }
    scheduleAlgorithmTimeout(function () {
      if (cb) cb();
    }, 280 * factor);
  } else if (step.type === "swap") {
    performAlgorithmSwap(step.i, step.j, 600 * factor, cb);
  } else if (step.type === "pivot") {
    var pv = findAlgorithmCube(step.index);
    if (pv) {
      var pb = pv.querySelector(".cube-body");
      if (pb) pb.setAttribute("color", "#9C27B0");
    }
    scheduleAlgorithmTimeout(function () {
      if (cb) cb();
    }, 350 * factor);
  } else if (cb) {
    cb();
  }
}

function scheduleNextAlgorithmStep(delayOverride) {
  if (
    !algorithmState ||
    algorithmState.paused ||
    algorithmState.locked ||
    algorithmState.finished
  ) {
    return;
  }
  var delay =
    typeof delayOverride === "number" ? delayOverride : getAlgorithmDelay();
  scheduleAlgorithmTimeout(function () {
    runNextAlgorithmStep();
  }, delay);
}

function runNextAlgorithmStep() {
  if (
    !algorithmState ||
    algorithmState.paused ||
    algorithmState.locked ||
    algorithmState.finished
  ) {
    return;
  }
  if (algorithmState.stepIndex >= algorithmState.steps.length) {
    finishAlgorithmAnimation();
    return;
  }

  var step = algorithmState.steps[algorithmState.stepIndex];
  algorithmState.locked = true;
  applyAlgorithmStep(step, function () {
    if (!algorithmState) return;
    algorithmState.stepIndex++;
    algorithmState.locked = false;
    if (algorithmState.stepIndex >= algorithmState.steps.length) {
      finishAlgorithmAnimation();
    } else {
      scheduleNextAlgorithmStep();
    }
  });
}

function finishAlgorithmAnimation() {
  if (!algorithmState) return;
  resetAlgorithmCubeColors(algorithmState.parent);
  algorithmState.finished = true;
  algorithmState.paused = false;
  isSorting = false;
  updateAlgorithmControlLabels();
  document.getElementById("functionDomain").textContent =
    "¡Ordenamiento completado!";
}

function toggleAlgorithmPause() {
  if (!algorithmState || algorithmState.finished) return;
  algorithmState.paused = !algorithmState.paused;
  if (algorithmState.paused) {
    if (!algorithmState.locked) {
      algorithmTimeouts.forEach(clearTimeout);
      algorithmTimeouts = [];
    }
    document.getElementById("functionDomain").textContent =
      "Animación pausada";
  } else {
    isSorting = true;
    document.getElementById("functionDomain").textContent =
      "Animación reanudada";
    scheduleNextAlgorithmStep(250);
  }
  updateAlgorithmControlLabels();
}

function stepAlgorithmBack() {
  if (!algorithmState || algorithmState.locked) return;
  algorithmTimeouts.forEach(clearTimeout);
  algorithmTimeouts = [];
  algorithmState.paused = true;
  algorithmState.finished = false;
  isSorting = true;
  updateAlgorithmControlLabels();

  var previousSwap = null;
  while (algorithmState.stepIndex > 0) {
    algorithmState.stepIndex--;
    var step = algorithmState.steps[algorithmState.stepIndex];
    if (step.type === "swap") {
      previousSwap = step;
      break;
    }
  }

  if (!previousSwap) {
    resetAlgorithmCubeColors(algorithmState.parent);
    document.getElementById("functionDomain").textContent =
      "Ya estás al inicio del ordenamiento";
    return;
  }

  algorithmState.locked = true;
  document.getElementById("functionDomain").textContent =
    "Retrocediendo un intercambio";
  applyAlgorithmStep(previousSwap, function () {
    if (!algorithmState) return;
    algorithmState.locked = false;
    resetAlgorithmCubeColors(algorithmState.parent);
  });
}

function slowAlgorithm() {
  if (!algorithmState) return;
  algorithmState.speedIndex =
    (algorithmState.speedIndex + 1) % algorithmSpeedOptions.length;
  updateAlgorithmControlLabels();
  document.getElementById("functionDomain").textContent =
    "Velocidad: " + algorithmSpeedOptions[algorithmState.speedIndex].label;
  if (
    !algorithmState.paused &&
    !algorithmState.locked &&
    !algorithmState.finished
  ) {
    algorithmTimeouts.forEach(clearTimeout);
    algorithmTimeouts = [];
    scheduleNextAlgorithmStep(250);
  }
}
