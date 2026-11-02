// ===== FUNCIONES MATEMÁTICAS (AULA 1) =====

var currentFunction = null;
var lastRenderTime = 0;
var isRenderingFunction = false;

// Definición de funciones matemáticas
var mathFunctions = {
  func1: {
    name: "f(x,y) = sin(x) * cos(y)",
    description: "Función trigonométrica que crea ondas entrecruzadas",
    domain: "Dominio: x ∈ [-π, π], y ∈ [-π, π]",
    formula: function (x, z) {
      return Math.sin(x) * Math.cos(z);
    },
  },
  func2: {
    name: "f(x,y) = x² + y²",
    description: "Paraboloide circular - forma de cuenco",
    domain: "Dominio: x ∈ [-2, 2], y ∈ [-2, 2]",
    formula: function (x, z) {
      return (x * x + z * z) * 0.3;
    },
  },
  func3: {
    name: "f(x,y) = sin(sqrt(x²+y²))",
    description: "Ondas circulares concéntricas",
    domain: "Dominio: x ∈ [-3π, 3π], y ∈ [-3π, 3π]",
    formula: function (x, z) {
      return Math.sin(Math.sqrt(x * x + z * z));
    },
  },
  func4: {
    name: "f(x,y) = cos(x) * sin(y)",
    description: "Ondas trigonométricas perpendiculares",
    domain: "Dominio: x ∈ [-π, π], y ∈ [-π, π]",
    formula: function (x, z) {
      return Math.cos(x) * Math.sin(z);
    },
  },
  func5: {
    name: "f(x,y) = e^(-(x²+y²))",
    description: "Distribución gaussiana - campana 3D",
    domain: "Dominio: x ∈ [-2, 2], y ∈ [-2, 2]",
    formula: function (x, z) {
      return Math.exp(-(x * x + z * z));
    },
  },
};

function showMathMenu() {
  document.getElementById("math-menu").setAttribute("visible", true);
  document
    .getElementById("function-display")
    .setAttribute("visible", false);
  document.getElementById("mathHUD").style.display = "none";
}

function showFunction(functionKey) {
  var now = Date.now();
  if (now - lastRenderTime < 1000 || isRenderingFunction) return;
  isRenderingFunction = true;
  lastRenderTime = now;
  currentFunction = functionKey;

  document.getElementById("math-menu").setAttribute("visible", false);
  document
    .getElementById("function-display")
    .setAttribute("visible", true);

  var hud = document.getElementById("mathHUD");
  hud.style.display = "block";
  document.getElementById("functionTitle").textContent = "Cargando...";

  setTimeout(function () {
    generateMathSurface(functionKey);
    isRenderingFunction = false;
  }, 100);
}

function generateMathSurface(functionKey) {
  var surface = document.getElementById("math-surface");
  while (surface.firstChild) {
    surface.removeChild(surface.firstChild);
  }
  if (!mathFunctions[functionKey]) return;
  var func = mathFunctions[functionKey];
  var step = 0.25;
  var range = 2.5;

  try {
    var positions = [];
    var colors = [];
    var triangleCount = 0;

    for (var x = -range; x < range; x += step) {
      for (var z = -range; z < range; z += step) {
        var x1 = x,
          x2 = x + step,
          z1 = z,
          z2 = z + step;
        var y1 = func.formula(x1, z1);
        var y2 = func.formula(x2, z1);
        var y3 = func.formula(x1, z2);
        var y4 = func.formula(x2, z2);
        if (
          !isFinite(y1) ||
          !isFinite(y2) ||
          !isFinite(y3) ||
          !isFinite(y4)
        )
          continue;

        positions.push(x1, y1, z1, x2, y2, z1, x1, y3, z2);
        var avg1 = (y1 + y2 + y3) / 3;
        var n1 = Math.max(0, Math.min(1, (avg1 + 1) / 2));
        var c1 = hslToRgb(240 + n1 * 120, 0.7, 0.6);
        colors.push(c1.r, c1.g, c1.b, c1.r, c1.g, c1.b, c1.r, c1.g, c1.b);

        positions.push(x2, y2, z1, x2, y4, z2, x1, y3, z2);
        var avg2 = (y2 + y4 + y3) / 3;
        var n2 = Math.max(0, Math.min(1, (avg2 + 1) / 2));
        var c2 = hslToRgb(240 + n2 * 120, 0.7, 0.6);
        colors.push(c2.r, c2.g, c2.b, c2.r, c2.g, c2.b, c2.r, c2.g, c2.b);
        triangleCount += 2;
        if (triangleCount > 8000) break;
      }
      if (triangleCount > 8000) break;
    }

    var geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(positions), 3),
    );
    geometry.setAttribute(
      "color",
      new THREE.BufferAttribute(new Float32Array(colors), 3),
    );
    geometry.computeVertexNormals();
    var material = new THREE.MeshBasicMaterial({
      vertexColors: true,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.88,
    });
    var mesh = new THREE.Mesh(geometry, material);
    var meshEl = document.createElement("a-entity");
    meshEl.object3D.add(mesh);
    surface.appendChild(meshEl);
  } catch (error) {
    console.error("Error generando superficie:", error);
  }

  document.getElementById("functionTitle").textContent = func.name;
  document.getElementById("functionDescription").textContent =
    func.description;
  document.getElementById("functionDomain").textContent = func.domain;
  document
    .getElementById("current-function-title")
    .setAttribute("value", func.name);
}

function hslToRgb(h, s, l) {
  h = h / 360;
  var r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    var hue2rgb = function (p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return { r: r, g: g, b: b };
}
