// ===== FUNCIONES DE FÍSICA/MRUV =====

var FISICA_SELECTORS = [
  "#aula4-fisica-menu",
  "#aula4-mruv-display", "#aula4-mruv-simulation", "#aula4-mruv-results",
  "#aula4-mru-display",  "#aula4-mru-simulation",  "#aula4-mru-results",
];

// Timeouts pendientes de mostrar resultados (pueden cancelarse al navegar)
var mruvResultsTimeout = null;
var mruResultsTimeout = null;

function hideFisicaAll() {
  // Cancelar timeouts de resultados pendientes
  if (mruvResultsTimeout) { clearTimeout(mruvResultsTimeout); mruvResultsTimeout = null; }
  if (mruResultsTimeout)  { clearTimeout(mruResultsTimeout);  mruResultsTimeout  = null; }
  // Detener animaciones activas
  if (typeof mruvSimulationRunning !== "undefined" && mruvSimulationRunning) {
    mruvSimulationRunning = false;
    if (mruvAnimationId) { cancelFrame(mruvAnimationId); mruvAnimationId = null; }
  }
  if (typeof mruSimulationRunning !== "undefined" && mruSimulationRunning) {
    mruSimulationRunning = false;
    if (mruAnimationId) { cancelFrame(mruAnimationId); mruAnimationId = null; }
  }
  var aula4 = document.getElementById("aula4");
  if (!aula4) return;
  FISICA_SELECTORS.forEach(function (sel) {
    var el = aula4.querySelector(sel);
    if (el) el.setAttribute("visible", false);
  });
}

function backToFisicaMenu() {
  hideFisicaAll();
  var aula4 = document.getElementById("aula4");
  if (!aula4) return;
  var menu = aula4.querySelector("#aula4-fisica-menu");
  if (menu) menu.setAttribute("visible", true);
}

function showMRUPlaceholder() {
  showMRUExercise();
}

function showMRUExercise() {
  hideFisicaAll();
  var aula4 = document.getElementById("aula4");
  if (!aula4) return;
  var el = aula4.querySelector("#aula4-mru-display");
  if (el) el.setAttribute("visible", true);
}

function showMRUVExercise() {
  hideFisicaAll();
  var aula4 = document.getElementById("aula4");
  if (!aula4) return;
  var el = aula4.querySelector("#aula4-mruv-display");
  if (el) el.setAttribute("visible", true);
}

var mruvSimulationRunning = false;
var mruvSimulationStartTime = 0;
var mruvAnimationId = null;

function simulateMRUV() {
  if (mruvSimulationRunning) return;

  var aula4 = document.getElementById("aula4");
  if (!aula4) return;

  var simulation = aula4.querySelector("#aula4-mruv-simulation");
  var car = aula4.querySelector("#mruv-car");
  var simInfo = aula4.querySelector("#mruv-sim-info");

  if (!simulation || !car) return;

  // Usar hideFisicaAll() en vez de ocultar las cosas a mano
  hideFisicaAll();
  simulation.setAttribute("visible", true);

  // Parámetros de la simulación (según el ejercicio)
  var v0 = 0; // velocidad inicial en m/s
  var a = 2.5; // aceleración en m/s²
  var t_total = 4; // tiempo total en segundos
  var scale = 0.20; // escala de posición en la escena (1 metro = 0.20 unidades)

  // Posición inicial del auto
  var initialX = -2;

  // Función de movimiento: x(t) = x0 + v0*t + 0.5*a*t²
  function getMRUVPosition(t) {
    return initialX + v0 * t + 0.5 * a * t * t * scale;
  }

  // Función para actualizar la información
  function updateMRUVInfo(t) {
    var v = v0 + a * t; // velocidad actual
    var x = v0 * t + 0.5 * a * t * t; // distancia recorrida
    var info =
      "Tiempo: " +
      t.toFixed(2) +
      "s | Velocidad: " +
      v.toFixed(2) +
      "m/s | Distancia: " +
      x.toFixed(2) +
      "m";
    if (simInfo) simInfo.setAttribute("value", info);
  }

  // Función de animación
  function animateMRUV(currentTime) {
    if (!mruvSimulationRunning) return;

    if (mruvSimulationStartTime === 0) {
      mruvSimulationStartTime = currentTime;
    }

    var elapsed = (currentTime - mruvSimulationStartTime) / 1000; // convertir a segundos

    if (elapsed <= t_total) {
      var newX = getMRUVPosition(elapsed);
      car.setAttribute("position", newX + " 0 0");
      updateMRUVInfo(elapsed);
      mruvAnimationId = nextFrame(animateMRUV);
    } else {
      // Simulación completada
      mruvSimulationRunning = false;
      car.setAttribute("position", getMRUVPosition(t_total) + " 0 0");
      updateMRUVInfo(t_total);

      mruvResultsTimeout = setTimeout(showMRUVResults, 1000);
    }
  }

  mruvSimulationRunning = true;
  mruvSimulationStartTime = 0;
  car.setAttribute("position", initialX + " 0 0");
  updateMRUVInfo(0);

  // Iniciar animación
  if (mruvAnimationId) cancelFrame(mruvAnimationId);
  mruvAnimationId = nextFrame(animateMRUV);
}

function showMRUVResults() {
  var aula4 = document.getElementById("aula4");
  if (!aula4) return;

  // Limpiamos pantalla
  hideFisicaAll();

  var results = aula4.querySelector("#aula4-mruv-results");
  var resultsContent = aula4.querySelector("#results-content");

  if (results) results.setAttribute("visible", true);

  // Parámetros del ejercicio
  var v0 = 0;
  var a = 2.5;
  var t = 4;

  // Cálculos
  var vf = v0 + a * t; // velocidad final
  var x = v0 * t + 0.5 * a * t * t; // distancia recorrida
  var vfKmh = vf * 3.6; // convertir a km/h

  // Formular respuestas
  var resultsText =
    "RESPUESTAS:\n\n" +
    "1. Velocidad final:\n" +
    "   vf = v0 + a·t\n" +
    "   vf = 0 + 2,5 × 4\n" +
    "   vf = " +
    vf.toFixed(2) +
    " m/s (" +
    vfKmh.toFixed(2) +
    " km/h)\n\n" +
    "2. Distancia recorrida:\n" +
    "   x = v0·t + ½·a·t²\n" +
    "   x = 0 + ½ × 2,5 × 4²\n" +
    "   x = ½ × 2,5 × 16\n" +
    "   x = " +
    x.toFixed(2) +
    " metros";

  if (resultsContent) resultsContent.setAttribute("value", resultsText);
}

// ===== FUNCIONES DE FÍSICA/MRU =====

var mruSimulationRunning = false;
var mruSimulationStartTime = 0;
var mruAnimationId = null;

function simulateMRU() {
  if (mruSimulationRunning) return;

  var aula4 = document.getElementById("aula4");
  if (!aula4) return;

  var simulation = aula4.querySelector("#aula4-mru-simulation");
  var car = aula4.querySelector("#mru-car");
  var simInfo = aula4.querySelector("#mru-sim-info");

  if (!simulation || !car) return;

  // Ocultar todo y mostrar solo la simulación
  hideFisicaAll();
  simulation.setAttribute("visible", true);

  // Parámetros: v=20 m/s constante, t_total=4s
  // Escala: 1 m = 0.05 unidades de escena → 80 m = 4 unidades (de -2 a +2)
  var v = 20;
  var t_total = 4;
  var scale = 0.05;
  var initialX = -2;

  function getMRUPosition(t) {
    return initialX + v * t * scale;
  }

  function updateMRUInfo(t) {
    var x = v * t;
    var info =
      "Tiempo: " + t.toFixed(2) + "s" +
      " | Velocidad: " + v + " m/s (cte.)" +
      " | Distancia: " + x.toFixed(1) + " m";
    if (simInfo) simInfo.setAttribute("value", info);
  }

  function animateMRU(currentTime) {
    if (!mruSimulationRunning) return;
    if (mruSimulationStartTime === 0) mruSimulationStartTime = currentTime;
    var elapsed = (currentTime - mruSimulationStartTime) / 1000;

    if (elapsed <= t_total) {
      car.setAttribute("position", getMRUPosition(elapsed) + " 0 0");
      updateMRUInfo(elapsed);
      mruAnimationId = nextFrame(animateMRU);
    } else {
      mruSimulationRunning = false;
      car.setAttribute("position", getMRUPosition(t_total) + " 0 0");
      updateMRUInfo(t_total);
      mruResultsTimeout = setTimeout(showMRUResults, 1000);
    }
  }

  mruSimulationRunning = true;
  mruSimulationStartTime = 0;
  car.setAttribute("position", initialX + " 0 0");
  updateMRUInfo(0);
  if (mruAnimationId) cancelFrame(mruAnimationId);
  mruAnimationId = nextFrame(animateMRU);
}

     function showMRUResults() {
  var aula4 = document.getElementById("aula4");
  if (!aula4) return;

  // ¡ESTO ES CLAVE! Limpiamos toda la pantalla antes de mostrar el resultado
  hideFisicaAll();

  var results = aula4.querySelector("#aula4-mru-results");
  var content = aula4.querySelector("#mru-results-content");

  if (results) results.setAttribute("visible", true);

  var v = 20;
  var t1 = 4;
  var x1 = v * t1;       // 80 m
  var x2 = 60;
  var t2 = x2 / v;       // 3 s

  var text =
    "RESPUESTAS:\n\n" +
    "1. Distancia en " + t1 + " segundos:\n" +
    "   x = v × t\n" +
    "   x = " + v + " × " + t1 + "\n" +
    "   x = " + x1 + " metros\n\n" +
    "2. Tiempo para " + x2 + " metros:\n" +
    "   t = x / v\n" +
    "   t = " + x2 + " / " + v + "\n" +
    "   t = " + t2.toFixed(1) + " segundos";

  if (content) content.setAttribute("value", text);
}
