// ===== CPU SCHEDULER VR LAB (AULA 3) =====

var cpuTimeouts = [];
var cpuSchedulerState = null;
var cpuColors = {
  new: "#9E9E9E",
  ready: "#1E88E5",
  running: "#43A047",
  waiting: "#FDD835",
  terminated: "#E53935",
};
var cpuAlgorithmNames = {
  fcfs: "FCFS",
  sjf: "SJF no preemptivo",
  srtf: "SRTF preemptivo",
  rr: "Round Robin",
};

var cpuProcessTemplate = [
  { id: "P1", arrivalTime: 0, burstTime: 8, ioStart: 3, ioDuration: 2 },
  { id: "P2", arrivalTime: 1, burstTime: 4, ioStart: null, ioDuration: 0 },
  { id: "P3", arrivalTime: 2, burstTime: 9, ioStart: 4, ioDuration: 3 },
  { id: "P4", arrivalTime: 3, burstTime: 5, ioStart: null, ioDuration: 0 },
];

function cloneCpuProcesses() {
  return cpuProcessTemplate.map(function (p) {
    return {
      id: p.id,
      arrivalTime: p.arrivalTime,
      burstTime: p.burstTime,
      ioStart: p.ioStart,
      ioDuration: p.ioDuration,
      remainingTime: p.burstTime,
      executedTime: 0,
      ioRemaining: 0,
      ioDone: false,
      state: "new",
      startTime: null,
      completionTime: null,
      waitingTime: 0,
      responseTime: null,
      entity: null,
    };
  });
}

function ensureCpuState() {
  if (cpuSchedulerState) return cpuSchedulerState;
  cpuSchedulerState = {
    algorithm: "fcfs",
    quantum: 2,
    time: 0,
    readyQueue: [],
    waitingList: [],
    current: null,
    currentQuantum: 0,
    processes: cloneCpuProcesses(),
    gantt: [],
    running: false,
    paused: false,
    finished: false,
    busyTicks: 0,
  };
  return cpuSchedulerState;
}

function clearCpuTimeouts() {
  cpuTimeouts.forEach(clearTimeout);
  cpuTimeouts = [];
}

function scheduleCpuTimeout(cb, delay) {
  var id = setTimeout(function () {
    cpuTimeouts = cpuTimeouts.filter(function (t) {
      return t !== id;
    });
    cb();
  }, delay);
  cpuTimeouts.push(id);
}

function cpuZonePosition(state, index) {
  var map = {
    new: [-3.0 + index * 0.35, 0.34, 1.55],
    ready: [-2.75 + index * 0.35, 0.34, -1.45],
    running: [0, 1.18, 0.03],
    waiting: [1.85 + index * 0.35, 0.34, -1.45],
    terminated: [2.3 + index * 0.35, 0.34, 1.55],
  };
  return map[state] || [0, 0.36, 0];
}

function createCpuProcessEntity(proc, index) {
  var parent = document.getElementById("cpu-processes");
  if (!parent) return null;
  var pos = cpuZonePosition("new", index);
  var el = document.createElement("a-entity");
  el.setAttribute("id", "cpu-proc-" + proc.id);
  el.setAttribute("position", pos.join(" "));
  el.setAttribute("class", "cpu-process");

  var body = document.createElement("a-box");
  body.setAttribute("class", "cpu-process-body");
  body.setAttribute("width", "0.42");
  body.setAttribute("height", "0.42");
  body.setAttribute("depth", "0.42");
  body.setAttribute("color", cpuColors.new);
  body.setAttribute("shadow", "cast: true; receive: true");
  el.appendChild(body);

  var text = document.createElement("a-text");
  text.setAttribute("value", proc.id);
  text.setAttribute("align", "center");
  text.setAttribute("color", "#ffffff");
  text.setAttribute("width", "2");
  text.setAttribute("position", "0 0 0.23");
  el.appendChild(text);

  parent.appendChild(el);
  return el;
}

function moveCpuProcess(proc, state, index, preempted) {
  if (!proc || !proc.entity) return;
  proc.state = state;
  var pos = cpuZonePosition(state, index || 0);
  var body = proc.entity.querySelector(".cpu-process-body");
  if (body) body.setAttribute("color", cpuColors[state]);
  var scalePulse = preempted ? 1.28 : 1;
  proc.entity.setAttribute("scale", scalePulse + " " + scalePulse + " " + scalePulse);
  if (window.gsap) {
    gsap.to(proc.entity.object3D.position, {
      x: pos[0],
      y: pos[1],
      z: pos[2],
      duration: preempted ? 1.7 : 1.35,
      ease: "power2.inOut",
      onComplete: function () {
        proc.entity.setAttribute("position", pos.join(" "));
        proc.entity.setAttribute("scale", "1 1 1");
      },
    });
  } else {
    proc.entity.setAttribute("position", pos.join(" "));
    proc.entity.setAttribute("scale", "1 1 1");
  }
}

function layoutCpuQueues() {
  var s = ensureCpuState();
  s.processes.forEach(function (p, i) {
    if (p.state === "new") moveCpuProcess(p, "new", i);
  });
  s.readyQueue.forEach(function (p, i) {
    moveCpuProcess(p, "ready", i);
  });
  s.waitingList.forEach(function (p, i) {
    moveCpuProcess(p, "waiting", i);
  });
  s.processes
    .filter(function (p) {
      return p.state === "terminated";
    })
    .forEach(function (p, i) {
      moveCpuProcess(p, "terminated", i);
    });
  if (s.current) moveCpuProcess(s.current, "running", 0);
}

function updateCpuButtons() {
  var s = ensureCpuState();
  var pauseLabel = document.querySelector("#cpu-btn-pause a-text");
  if (pauseLabel) pauseLabel.setAttribute("value", s.paused ? "Reanudar" : "Pausar");
  ["fcfs", "sjf", "srtf", "rr"].forEach(function (alg) {
    var box = document.querySelector("#cpu-btn-" + alg + " a-box");
    if (box) {
      box.setAttribute("opacity", s.algorithm === alg ? "1" : "0.72");
    }
  });
}

function updateCpuMetrics() {
  var s = ensureCpuState();
  var completed = s.processes.filter(function (p) {
    return p.state === "terminated";
  });
  var avg = function (field) {
    if (!completed.length) return "0.0";
    var sum = completed.reduce(function (acc, p) {
      return acc + (p[field] || 0);
    }, 0);
    return (sum / completed.length).toFixed(1);
  };
  var throughput = s.time > 0 ? (completed.length / s.time).toFixed(2) : "0.00";
  var utilization = s.time > 0 ? ((s.busyTicks / s.time) * 100).toFixed(0) : "0";
  var text =
    "Tiempo actual: " + s.time +
    "\nAlgoritmo: " + cpuAlgorithmNames[s.algorithm] +
    "\nQuantum: " + (s.algorithm === "rr" ? s.quantum : "-") +
    "\nTiempo de espera prom. (WT): " + avg("waitingTime") +
    "\nTiempo de retorno prom. (TAT): " + avg("turnaroundTime") +
    "\nTiempo de respuesta prom.: " + avg("responseTime") +
    "\nProcesos por segundo: " + throughput +
    "\nUtilización de CPU: " + utilization + "%";
  var metrics = document.getElementById("cpu-metrics-text");
  if (metrics) metrics.setAttribute("value", text);
  var status = document.getElementById("cpu-status-text");
  if (status) {
    var current = s.current ? "Ejecutando " + s.current.id : "CPU libre";
    if (s.finished) current = "Simulación finalizada";
    status.setAttribute("value", current);
  }
  var cpuCurrent = document.getElementById("cpu-current-label");
  if (cpuCurrent) {
    cpuCurrent.setAttribute("value", s.current ? s.current.id : "-");
  }
  var table = document.getElementById("cpu-process-table-text");
  if (table) table.setAttribute("value", buildCpuProcessTableText());
  updateCpuButtons();
}

function getCpuStateLabel(state) {
  return {
    new: "Nuevo",
    ready: "Listo",
    running: "Ejecutando",
    waiting: "Espera/E/S",
    terminated: "Terminado",
  }[state] || "-";
}

function buildCpuProcessTableText() {
  var s = ensureCpuState();
  var lines = ["Proceso | Llegada | Ráfaga | E/S ini | E/S dur | Estado"];
  s.processes.forEach(function (p) {
    lines.push(
      p.id +
        " | " +
        p.arrivalTime +
        " | " +
        p.burstTime +
        " | " +
        (p.ioStart === null ? "-" : p.ioStart) +
        " | " +
        (p.ioDuration || "-") +
        " | " +
        getCpuStateLabel(p.state),
    );
  });
  return lines.join("\n");
}

function resetCpuGantt() {
  var parent = document.getElementById("cpu-gantt-blocks");
  if (!parent) return;
  while (parent.firstChild) parent.removeChild(parent.firstChild);
  renderCpuGanttScale();
  renderCpuGanttLegend();
}

function renderCpuGanttScale() {
  var parent = document.getElementById("cpu-gantt-scale");
  if (!parent) return;
  while (parent.firstChild) parent.removeChild(parent.firstChild);
  for (var t = 0; t <= 30; t += 5) {
    var x = t * 0.15;
    appendEl(parent, "a-box", {
      width: "0.012",
      height: "0.12",
      depth: "0.02",
      position: x + " -0.07 0",
      color: "#B0BEC5",
    });
    addText(parent, {
      value: String(t),
      position: x + " 0.03 0.02",
      align: "center",
      color: "#ECEFF1",
      width: "1.2",
    });
  }
  addText(parent, {
    value: "Tiempo ->",
    position: "4.8 0.03 0.02",
    align: "center",
    color: "#ECEFF1",
    width: "1.4",
  });
}

function renderCpuGanttLegend() {
  var parent = document.getElementById("cpu-gantt-legend");
  if (!parent) return;
  while (parent.firstChild) parent.removeChild(parent.firstChild);
  var colors = getCpuProcessColors();
  ["P1", "P2", "P3", "P4"].forEach(function (pid, i) {
    var x = i * 0.5;
    appendEl(parent, "a-box", {
      width: "0.12",
      height: "0.12",
      depth: "0.03",
      position: x + " 0 0",
      color: colors[pid],
    });
    addText(parent, {
      value: pid,
      position: x + 0.16 + " 0 0.02",
      align: "left",
      color: "#E3F2FD",
      width: "1.4",
    });
  });
}

function getCpuProcessColors() {
  return { P1: "#42A5F5", P2: "#66BB6A", P3: "#AB47BC", P4: "#FFA726" };
}

function addCpuGanttBlock(pid, start, duration) {
  var parent = document.getElementById("cpu-gantt-blocks");
  if (!parent) return;
  var colors = getCpuProcessColors();
  var scale = 0.15;
  var width = Math.max(0.11, duration * scale);
  var x = start * scale + width / 2;
  var block = document.createElement("a-entity");
  block.setAttribute("position", x + " 0 0");
  var box = document.createElement("a-box");
  box.setAttribute("width", width);
  box.setAttribute("height", "0.26");
  box.setAttribute("depth", "0.05");
  box.setAttribute("color", colors[pid] || "#B0BEC5");
  block.appendChild(box);
  var label = document.createElement("a-text");
  label.setAttribute("value", pid);
  label.setAttribute("align", "center");
  label.setAttribute("color", "#ffffff");
  label.setAttribute("width", "1.6");
  label.setAttribute("position", "0 0 0.04");
  block.appendChild(label);
  parent.appendChild(block);
}

function recordCpuExecution(pid) {
  var s = ensureCpuState();
  var last = s.gantt[s.gantt.length - 1];
  if (last && last.pid === pid && last.start + last.duration === s.time) {
    last.duration++;
    resetCpuGantt();
    s.gantt.forEach(function (b) {
      addCpuGanttBlock(b.pid, b.start, b.duration);
    });
  } else {
    var block = { pid: pid, start: s.time, duration: 1 };
    s.gantt.push(block);
    addCpuGanttBlock(block.pid, block.start, block.duration);
  }
}

function resetCpuScheduler() {
  clearCpuTimeouts();
  cpuSchedulerState = {
    algorithm: cpuSchedulerState ? cpuSchedulerState.algorithm : "fcfs",
    quantum: cpuSchedulerState ? cpuSchedulerState.quantum : 2,
    time: 0,
    readyQueue: [],
    waitingList: [],
    current: null,
    currentQuantum: 0,
    processes: cloneCpuProcesses(),
    gantt: [],
    running: false,
    paused: false,
    finished: false,
    busyTicks: 0,
  };
  resetCpuGantt();
  var parent = document.getElementById("cpu-processes");
  if (parent) {
    while (parent.firstChild) parent.removeChild(parent.firstChild);
    cpuSchedulerState.processes.forEach(function (p, i) {
      p.entity = createCpuProcessEntity(p, i);
    });
  }
  layoutCpuQueues();
  updateCpuMetrics();
}

function selectCpuAlgorithm(algorithm) {
  var s = ensureCpuState();
  s.algorithm = algorithm;
  resetCpuScheduler();
}

function changeCpuQuantum(delta) {
  var s = ensureCpuState();
  s.quantum = Math.max(1, Math.min(8, s.quantum + delta));
  updateCpuMetrics();
}

function startCpuScheduler() {
  var s = ensureCpuState();
  if (s.finished) resetCpuScheduler();
  s = ensureCpuState();
  if (s.running && !s.paused) return;
  s.running = true;
  s.paused = false;
  updateCpuMetrics();
  scheduleCpuTimeout(runCpuTick, 500);
}

function toggleCpuPause() {
  var s = ensureCpuState();
  if (!s.running || s.finished) return;
  s.paused = !s.paused;
  clearCpuTimeouts();
  updateCpuMetrics();
  if (!s.paused) scheduleCpuTimeout(runCpuTick, 500);
}

function enqueueCpuReady(proc, preempted) {
  var s = ensureCpuState();
  if (s.readyQueue.indexOf(proc) === -1) s.readyQueue.push(proc);
  moveCpuProcess(proc, "ready", s.readyQueue.indexOf(proc), preempted);
}

function chooseNextCpuProcess() {
  var s = ensureCpuState();
  if (!s.readyQueue.length) return null;

  // FCFS y Round Robin toman el primer proceso de la cola visible.
  if (s.algorithm === "fcfs" || s.algorithm === "rr") {
    return s.readyQueue.shift();
  }

  // SJF no preemptivo: al liberarse la CPU elige la menor rafaga restante.
  // No desaloja al proceso que ya esta ejecutando.
  var bestIndex = 0;
  for (var i = 1; i < s.readyQueue.length; i++) {
    if (s.readyQueue[i].remainingTime < s.readyQueue[bestIndex].remainingTime) {
      bestIndex = i;
    }
  }
  return s.readyQueue.splice(bestIndex, 1)[0];
}

function applySrtfPreemption() {
  var s = ensureCpuState();
  if (s.algorithm !== "srtf" || !s.current || !s.readyQueue.length) return;
  var shortest = s.readyQueue.reduce(function (best, p) {
    return p.remainingTime < best.remainingTime ? p : best;
  }, s.readyQueue[0]);
  // SRTF preemptivo: si un listo tiene menor tiempo restante, expulsa
  // visualmente al proceso actual y lo devuelve a la cola de listos.
  if (shortest.remainingTime < s.current.remainingTime) {
    s.readyQueue = s.readyQueue.filter(function (p) {
      return p !== shortest;
    });
    enqueueCpuReady(s.current, true);
    s.current = shortest;
    s.currentQuantum = 0;
  }
}

function finishCpuProcess(proc) {
  var s = ensureCpuState();
  proc.completionTime = s.time + 1;
  proc.turnaroundTime = proc.completionTime - proc.arrivalTime;
  moveCpuProcess(proc, "terminated", 0);
  s.current = null;
  s.currentQuantum = 0;
}

function sendCpuProcessToIo(proc) {
  var s = ensureCpuState();
  proc.ioDone = true;
  // La E/S se descuenta al inicio de cada tick; se suma una unidad para
  // que una duracion de 2 ocupe dos intervalos completos fuera de la CPU.
  proc.ioRemaining = proc.ioDuration + 1;
  s.waitingList.push(proc);
  moveCpuProcess(proc, "waiting", s.waitingList.length - 1);
  s.current = null;
  s.currentQuantum = 0;
}

function runCpuTick() {
  var s = ensureCpuState();
  if (!s.running || s.paused || s.finished) return;

  s.processes.forEach(function (p) {
    if (p.state === "new" && p.arrivalTime <= s.time) {
      enqueueCpuReady(p, false);
    }
  });

  s.waitingList.slice().forEach(function (p) {
    p.ioRemaining--;
    if (p.ioRemaining <= 0) {
      s.waitingList = s.waitingList.filter(function (wp) {
        return wp !== p;
      });
      enqueueCpuReady(p, false);
    }
  });

  applySrtfPreemption();

  if (!s.current) {
    s.current = chooseNextCpuProcess();
    s.currentQuantum = 0;
  }

  if (s.current) {
    if (s.current.startTime === null) {
      s.current.startTime = s.time;
      s.current.responseTime = s.current.startTime - s.current.arrivalTime;
    }
    moveCpuProcess(s.current, "running", 0);
  }

  s.readyQueue.forEach(function (p) {
    p.waitingTime++;
  });

  if (s.current) {
    s.busyTicks++;
    s.current.executedTime++;
    s.current.remainingTime--;
    s.currentQuantum++;
    recordCpuExecution(s.current.id);

    if (s.current.remainingTime <= 0) {
      finishCpuProcess(s.current);
    } else if (
      s.current.ioStart !== null &&
      !s.current.ioDone &&
      s.current.executedTime === s.current.ioStart
    ) {
      sendCpuProcessToIo(s.current);
    } else if (s.algorithm === "rr" && s.currentQuantum >= s.quantum) {
      var preempted = s.current;
      s.current = null;
      s.currentQuantum = 0;
      // Round Robin: al consumir quantum sin terminar, vuelve al final
      // de la cola de listos con una animacion de expulsion.
      enqueueCpuReady(preempted, true);
    }
  }

  s.time++;
  layoutCpuQueues();
  updateCpuMetrics();

  if (
    s.processes.every(function (p) {
      return p.state === "terminated";
    })
  ) {
    s.finished = true;
    s.running = false;
    updateCpuMetrics();
    return;
  }

  scheduleCpuTimeout(runCpuTick, 1600);
}
