// ============================================
// COMPONENTE BTN-ACTION
// Maneja clicks en botones interactivos.
// Funciona con cursor de PC, gaze VR y
// controllers VR (Oculus/Quest).
// ============================================
AFRAME.registerComponent("btn-action", {
  schema: { type: "string" },
  init: function () {
    var self = this;
    var el = this.el;

    // El raycaster intersecta geometría (a-box hijo), así que
    // necesitamos escuchar click tanto en el parent como en hijos
    el.addEventListener("click", function () {
      self.handleClick();
    });

    // Configura el a-box hijo como clickable (hover + click)
    // Usa hasLoaded para cubrir entidades ya inicializadas al momento
    // en que se registra el componente (evita perder el evento loaded)
    function setupBox() {
      var box = el.querySelector("a-box");
      if (!box) return;
      box.classList.add("clickable");
      box.addEventListener("click", function (evt) {
        evt.stopPropagation();
        self.handleClick();
      });
      box.addEventListener("mouseenter", function () {
        box.setAttribute("scale", "1.15 1.15 1.15");
      });
      box.addEventListener("mouseleave", function () {
        box.setAttribute("scale", "1 1 1");
      });
    }
    if (el.hasLoaded) {
      setupBox();
    } else {
      el.addEventListener("loaded", setupBox);
    }
  },
  handleClick: function () {
    var action = this.data;
    console.log("Boton:", action);
    var mathMenu = document.getElementById("math-menu");
    var functionDisplay = document.getElementById("function-display");
    var algMenu = document.getElementById("alg-menu");
    var algDisplay = document.getElementById("algorithm-display");
    var mathMenuVisible =
      mathMenu && mathMenu.getAttribute("visible") !== false;
    var functionDisplayVisible =
      functionDisplay && functionDisplay.getAttribute("visible") !== false;
    var algMenuVisible = algMenu && algMenu.getAttribute("visible") !== false;
    var algDisplayVisible =
      algDisplay && algDisplay.getAttribute("visible") !== false;

    if (action.indexOf("func") === 0 && !mathMenuVisible) return;
    if (action === "back-math" && !functionDisplayVisible) return;
    if (action.indexOf("algo-") === 0 && !algMenuVisible) return;

    if (
      (action === "back-algo" ||
        action === "restart-algo" ||
        action === "pause-algo" ||
        action === "back-step-algo" ||
        action === "slow-algo") &&
      !algDisplayVisible
    ) {
      return;
    }

    track("interaccion", {
      accion: action,
      aula: window.aulaActual || "pasillo",
    });

    switch (action) {
      case "func1":
        showFunction("func1");
        break;
      case "func2":
        showFunction("func2");
        break;
      case "func3":
        showFunction("func3");
        break;
      case "func4":
        showFunction("func4");
        break;
      case "func5":
        showFunction("func5");
        break;
      case "back-math":
        showMathMenu();
        break;
      case "algo-bubble":
        showAlgorithm("bubble");
        break;
      case "algo-insertion":
        showAlgorithm("insertion");
        break;
      case "algo-quick":
        showAlgorithm("quick");
        break;
      case "algo-baraja":
        showAlgorithm("baraja");
        break;
      case "algo-intercambio":
        showAlgorithm("intercambio");
        break;
      case "back-algo":
        stopAlgorithmAnimations({ resetDisplay: true });
        break;
      case "restart-algo":
        if (currentAlgorithm) showAlgorithm(currentAlgorithm);
        break;
      case "pause-algo":
        toggleAlgorithmPause();
        break;
      case "back-step-algo":
        stepAlgorithmBack();
        break;
      case "slow-algo":
        slowAlgorithm();
        break;
      case "show-mru":
        showMRUPlaceholder();
        break;
      case "show-mruv":
        showMRUVExercise();
        break;
      case "simulate-mruv":
        simulateMRUV();
        break;
      case "back-fisica":
        backToFisicaMenu();
        break;
      case "simulate-mru":
        simulateMRU();
        break;
      case "prob-prev":
      case "prob-next":
      case "prob-interval":
      case "prob-a-minus":
      case "prob-a-plus":
      case "prob-b-minus":
      case "prob-b-plus":
      case "prob-station-coin":
      case "prob-station-dice":
      case "prob-station-calls":
      case "prob-run-once":
      case "prob-run-ten":
      case "prob-run-hundred":
      case "prob-reset-observed":
        handleProbabilityAction(action);
        break;
      case "complexity-n-minus":
      case "complexity-n-plus":
      case "complexity-n-big-minus":
      case "complexity-n-big-plus":
      case "complexity-loops-minus":
      case "complexity-loops-plus":
      case "complexity-rec-no":
      case "complexity-rec-simple":
      case "complexity-rec-multiple":
      case "complexity-sort-toggle":
      case "complexity-halving-toggle":
      case "complexity-calcular":
      case "complexity-reset":
        handleComplexityAction(action);
        break;

      case "cpu-fcfs":
        selectCpuAlgorithm("fcfs");
        break;
      case "cpu-sjf":
        selectCpuAlgorithm("sjf");
        break;
      case "cpu-srtf":
        selectCpuAlgorithm("srtf");
        break;
      case "cpu-rr":
        selectCpuAlgorithm("rr");
        break;
      case "cpu-start":
        startCpuScheduler();
        break;
      case "cpu-pause":
        toggleCpuPause();
        break;
      case "cpu-reset":
        resetCpuScheduler();
        break;
      case "cpu-quantum-plus":
        changeCpuQuantum(1);
        break;
      case "cpu-quantum-minus":
        changeCpuQuantum(-1);
        break;
      default:
        if (action.indexOf("prob-param-") === 0) {
          handleProbabilityAction(action);
        } else if (action.indexOf("complexity-") === 0) {
          handleComplexityAction(action);
        }
        break;
    }
  },
});
