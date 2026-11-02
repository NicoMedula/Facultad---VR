// ===== LABORATORIO DE DISTRIBUCIONES DE PROBABILIDAD =====

var PROB_DISTRIBUTIONS = [
  {
    id: "normal",
    name: "Normal",
    kind: "continuous",
    parameters: [
      { key: "mu", label: "mu", step: 0.1 },
      { key: "sigma", label: "sigma", min: 0.0001, step: 0.1 },
    ],
    defaults: { mu: 0, sigma: 1 },
    description: "Modelo continuo simétrico usado para errores, mediciones y fenómenos agregados.",
  },
  {
    id: "student",
    name: "t de Student",
    kind: "continuous",
    parameters: [{ key: "df", label: "nu", min: 0.0001, step: 1 }],
    defaults: { df: 8 },
    description: "Distribución simétrica con colas pesadas, frecuente en muestras pequeñas.",
  },
  {
    id: "chiSquared",
    name: "Chi-cuadrado",
    kind: "continuous",
    parameters: [{ key: "df", label: "nu", min: 0.0001, step: 1 }],
    defaults: { df: 4 },
    description: "Distribución positiva asociada a sumas de cuadrados de normales estándar.",
  },
  {
    id: "fDistribution",
    name: "Distribución F",
    kind: "continuous",
    parameters: [
      { key: "df1", label: "nu1", min: 0.0001, step: 1 },
      { key: "df2", label: "nu2", min: 0.0001, step: 1 },
    ],
    defaults: { df1: 5, df2: 12 },
    description: "Distribución positiva para razones de varianzas independientes.",
  },
  {
    id: "exponential",
    name: "Exponencial",
    kind: "continuous",
    parameters: [{ key: "lambda", label: "lambda", min: 0.0001, step: 0.1 }],
    defaults: { lambda: 1 },
    description: "Modelo de tiempos de espera con tasa constante.",
  },
  {
    id: "cauchy",
    name: "Cauchy",
    kind: "continuous",
    parameters: [
      { key: "x0", label: "x0", step: 0.1 },
      { key: "gamma", label: "gamma", min: 0.0001, step: 0.1 },
    ],
    defaults: { x0: 0, gamma: 1 },
    description: "Distribución simétrica de colas muy pesadas, sin media ni varianza definidas.",
  },
  {
    id: "weibull",
    name: "Weibull",
    kind: "continuous",
    parameters: [
      { key: "k", label: "k", min: 0.0001, step: 0.1 },
      { key: "lambda", label: "lambda", min: 0.0001, step: 0.1 },
    ],
    defaults: { k: 1.5, lambda: 1 },
    description: "Modelo flexible para tiempos de vida y confiabilidad.",
  },
  {
    id: "gamma",
    name: "Gamma",
    kind: "continuous",
    parameters: [
      { key: "alpha", label: "alpha", min: 0.0001, step: 0.1 },
      { key: "theta", label: "theta", min: 0.0001, step: 0.1 },
    ],
    defaults: { alpha: 2, theta: 1 },
    description: "Distribución positiva para tiempos acumulados y variables sesgadas.",
  },
  {
    id: "beta",
    name: "Beta",
    kind: "continuous",
    parameters: [
      { key: "alpha", label: "alpha", min: 0.0001, step: 0.1 },
      { key: "beta", label: "beta", min: 0.0001, step: 0.1 },
    ],
    defaults: { alpha: 2, beta: 5 },
    description: "Distribución sobre [0, 1], ideal para proporciones.",
  },
  {
    id: "logNormal",
    name: "Log-normal",
    kind: "continuous",
    parameters: [
      { key: "mu", label: "mu", step: 0.1 },
      { key: "sigma", label: "sigma", min: 0.0001, step: 0.1 },
    ],
    defaults: { mu: 0, sigma: 0.5 },
    description: "Modelo positivo para variables cuyo logaritmo es normal.",
  },
  {
    id: "logistic",
    name: "Logística",
    kind: "continuous",
    parameters: [
      { key: "mu", label: "mu", step: 0.1 },
      { key: "s", label: "s", min: 0.0001, step: 0.1 },
    ],
    defaults: { mu: 0, s: 1 },
    description: "Distribución simétrica similar a la normal, con acumulada sigmoide.",
  },
  {
    id: "uniformDiscrete",
    name: "Uniforme discreta",
    kind: "discrete",
    parameters: [{ key: "m", label: "caras", min: 2, max: 12, step: 1, integer: true }],
    defaults: { m: 6 },
    description: "Todos los resultados enteros de 1 a m tienen la misma probabilidad.",
  },
  {
    id: "binomial",
    name: "Binomial",
    kind: "discrete",
    parameters: [
      { key: "n", label: "n", min: 1, step: 1, integer: true },
      { key: "p", label: "p", min: 0, max: 1, step: 0.05 },
    ],
    defaults: { n: 10, p: 0.4 },
    description: "Cuenta éxitos en un número fijo de ensayos independientes.",
  },
  {
    id: "negativeBinomial",
    name: "Pascal / binomial negativa",
    kind: "discrete",
    parameters: [
      { key: "r", label: "r", min: 1, step: 1, integer: true },
      { key: "p", label: "p", min: 0, max: 1, step: 0.05 },
    ],
    defaults: { r: 4, p: 0.45 },
    description: "Cuenta fallos antes de alcanzar una cantidad fija de éxitos.",
  },
  {
    id: "poisson",
    name: "Poisson",
    kind: "discrete",
    parameters: [{ key: "lambda", label: "lambda", min: 0.0001, step: 0.5 }],
    defaults: { lambda: 4 },
    description: "Cuenta eventos raros en un intervalo cuando la tasa media es conocida.",
  },
  {
    id: "hypergeometric",
    name: "Hipergeométrica",
    kind: "discrete",
    parameters: [
      { key: "N", label: "N", min: 1, step: 1, integer: true },
      { key: "K", label: "K", min: 1, step: 1, integer: true },
      { key: "n", label: "n", min: 1, step: 1, integer: true },
    ],
    defaults: { N: 40, K: 12, n: 8 },
    description: "Cuenta éxitos al muestrear sin reemplazo desde una población finita.",
  },
];

var PROB_INTERVALS = ["between", "left", "right", "outside"];
var PROB_CASINO_STATIONS = [
  {
    id: "coin",
    label: "Binomial",
    distributionId: "binomial",
    params: { n: 10, p: 0.5 },
    intervalType: "between",
    a: 4,
    b: 6,
    description: "Binomial: cuenta caras en n lanzamientos con probabilidad p.",
    pending: false,
  },
  {
    id: "dice",
    label: "Uniforme discreta",
    distributionId: "uniformDiscrete",
    params: { m: 6 },
    intervalType: "between",
    a: 1,
    b: 6,
    description: "Uniforme discreta: resultado de 1 a m con igual probabilidad.",
    pending: false,
  },
  {
    id: "calls",
    label: "Poisson",
    distributionId: "poisson",
    params: { lambda: 3 },
    intervalType: "between",
    a: 2,
    b: 6,
    description: "Poisson: cuenta autos por minuto con tasa media λ.",
    pending: false,
  },
];
var probabilityState = {
  distributionIndex: 0,
  parameters: { n: 10, p: 0.5 },
  intervalType: "between",
  a: 4,
  b: 6,
  activeStation: "coin",
  observedSamples: [],
  lastCoinFlips: [],
  trialCount: 0,
  lastOutcome: "Elegí una máquina y activá el experimento.",
  machineRunning: false,
};

var lanczosCoefficients = [
  676.5203681218851, -1259.1392167224028, 771.3234287776531,
  -176.6150291621406, 12.507343278686905, -0.13857109526572012,
  9.984369578019572e-6, 1.5056327351493116e-7,
];

function clampProbability(value) {
  if (!Number.isFinite(value)) return Number.NaN;
  return Math.min(1, Math.max(0, value));
}

function erf(x) {
  var sign = x < 0 ? -1 : 1;
  var z = Math.abs(x);
  var t = 1 / (1 + 0.3275911 * z);
  var y =
    1 -
    (((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t -
      0.284496736) *
      t +
      0.254829592) *
      t *
      Math.exp(-z * z));
  return sign * y;
}

function logGamma(z) {
  if (z < 0.5) {
    return Math.log(Math.PI) - Math.log(Math.sin(Math.PI * z)) - logGamma(1 - z);
  }
  var x = 0.99999999999980993;
  var shifted = z - 1;
  for (var i = 0; i < lanczosCoefficients.length; i++) {
    x += lanczosCoefficients[i] / (shifted + i + 1);
  }
  var t = shifted + lanczosCoefficients.length - 0.5;
  return 0.5 * Math.log(2 * Math.PI) + (shifted + 0.5) * Math.log(t) - t + Math.log(x);
}

function betaFunction(a, b) {
  return Math.exp(logGamma(a) + logGamma(b) - logGamma(a + b));
}

function betaContinuedFraction(a, b, x) {
  var maxIterations = 200;
  var epsilon = 3e-12;
  var fpMin = 1e-30;
  var qab = a + b;
  var qap = a + 1;
  var qam = a - 1;
  var c = 1;
  var d = 1 - (qab * x) / qap;
  if (Math.abs(d) < fpMin) d = fpMin;
  d = 1 / d;
  var h = d;
  for (var m = 1; m <= maxIterations; m++) {
    var m2 = 2 * m;
    var aa = (m * (b - m) * x) / ((qam + m2) * (a + m2));
    d = 1 + aa * d;
    if (Math.abs(d) < fpMin) d = fpMin;
    c = 1 + aa / c;
    if (Math.abs(c) < fpMin) c = fpMin;
    d = 1 / d;
    h *= d * c;
    aa = (-(a + m) * (qab + m) * x) / ((a + m2) * (qap + m2));
    d = 1 + aa * d;
    if (Math.abs(d) < fpMin) d = fpMin;
    c = 1 + aa / c;
    if (Math.abs(c) < fpMin) c = fpMin;
    d = 1 / d;
    var delta = d * c;
    h *= delta;
    if (Math.abs(delta - 1) < epsilon) break;
  }
  return h;
}

function regularizedBeta(x, a, b) {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  var bt = Math.exp(logGamma(a + b) - logGamma(a) - logGamma(b) + a * Math.log(x) + b * Math.log1p(-x));
  if (x < (a + 1) / (a + b + 2)) {
    return clampProbability((bt * betaContinuedFraction(a, b, x)) / a);
  }
  return clampProbability(1 - (bt * betaContinuedFraction(b, a, 1 - x)) / b);
}

function regularizedGammaP(a, x) {
  if (x <= 0) return 0;
  if (x < a + 1) {
    var sum = 1 / a;
    var del = sum;
    var ap = a;
    for (var n = 1; n <= 200; n++) {
      ap += 1;
      del *= x / ap;
      sum += del;
      if (Math.abs(del) < Math.abs(sum) * 1e-12) break;
    }
    return clampProbability(sum * Math.exp(-x + a * Math.log(x) - logGamma(a)));
  }
  var b = x + 1 - a;
  var c = 1 / 1e-30;
  var d = 1 / b;
  var h = d;
  for (var i = 1; i <= 200; i++) {
    var an = -i * (i - a);
    b += 2;
    d = an * d + b;
    if (Math.abs(d) < 1e-30) d = 1e-30;
    c = b + an / c;
    if (Math.abs(c) < 1e-30) c = 1e-30;
    d = 1 / d;
    var delta = d * c;
    h *= delta;
    if (Math.abs(delta - 1) < 1e-12) break;
  }
  return clampProbability(1 - Math.exp(-x + a * Math.log(x) - logGamma(a)) * h);
}

function logCombination(n, k) {
  if (k < 0 || k > n) return Number.NEGATIVE_INFINITY;
  return logGamma(n + 1) - logGamma(k + 1) - logGamma(n - k + 1);
}

function probValue(params, key, fallback) {
  return params[key] !== undefined ? params[key] : fallback;
}

function createContinuousMath(distribution, params) {
  switch (distribution.id) {
    case "normal": {
      var mu = probValue(params, "mu", 0);
      var sigma = probValue(params, "sigma", 1);
      return {
        pdf: function (x) { return Math.exp(-0.5 * Math.pow((x - mu) / sigma, 2)) / (sigma * Math.sqrt(2 * Math.PI)); },
        cdf: function (x) { return 0.5 * (1 + erf((x - mu) / (sigma * Math.SQRT2))); },
        domain: [mu - 6 * sigma, mu + 6 * sigma],
      };
    }
    case "student": {
      var df = probValue(params, "df", 8);
      var constant = Math.exp(logGamma((df + 1) / 2) - logGamma(df / 2)) / Math.sqrt(df * Math.PI);
      return {
        pdf: function (x) { return constant * Math.pow(1 + (x * x) / df, -(df + 1) / 2); },
        cdf: function (x) {
          var z = df / (df + x * x);
          var ib = regularizedBeta(z, df / 2, 0.5);
          return x >= 0 ? clampProbability(1 - 0.5 * ib) : clampProbability(0.5 * ib);
        },
        domain: [-Math.max(7, Math.sqrt(df) * 4.2), Math.max(7, Math.sqrt(df) * 4.2)],
      };
    }
    case "chiSquared": {
      var dfChi = probValue(params, "df", 4);
      return {
        pdf: function (x) {
          return x <= 0 ? 0 : Math.exp((dfChi / 2 - 1) * Math.log(x) - x / 2 - (dfChi / 2) * Math.log(2) - logGamma(dfChi / 2));
        },
        cdf: function (x) { return regularizedGammaP(dfChi / 2, x / 2); },
        domain: [0, Math.max(8, dfChi + 8 * Math.sqrt(2 * dfChi))],
      };
    }
    case "fDistribution": {
      var df1 = probValue(params, "df1", 5);
      var df2 = probValue(params, "df2", 12);
      return {
        pdf: function (x) {
          if (x <= 0) return 0;
          var numerator = Math.sqrt((Math.pow(df1 * x, df1) * Math.pow(df2, df2)) / Math.pow(df1 * x + df2, df1 + df2));
          return numerator / (x * betaFunction(df1 / 2, df2 / 2));
        },
        cdf: function (x) {
          if (x <= 0) return 0;
          return regularizedBeta((df1 * x) / (df1 * x + df2), df1 / 2, df2 / 2);
        },
        domain: [0, Math.max(7, (df2 / Math.max(1, df2 - 2)) * 7)],
      };
    }
    case "exponential": {
      var lambda = probValue(params, "lambda", 1);
      return {
        pdf: function (x) { return x < 0 ? 0 : lambda * Math.exp(-lambda * x); },
        cdf: function (x) { return x < 0 ? 0 : clampProbability(1 - Math.exp(-lambda * x)); },
        domain: [0, 9 / lambda],
      };
    }
    case "cauchy": {
      var x0 = probValue(params, "x0", 0);
      var gamma = probValue(params, "gamma", 1);
      return {
        pdf: function (x) { return 1 / (Math.PI * gamma * (1 + Math.pow((x - x0) / gamma, 2))); },
        cdf: function (x) { return 0.5 + Math.atan((x - x0) / gamma) / Math.PI; },
        domain: [x0 - 16 * gamma, x0 + 16 * gamma],
      };
    }
    case "weibull": {
      var wk = probValue(params, "k", 1.5);
      var wl = probValue(params, "lambda", 1);
      return {
        pdf: function (x) { return x < 0 ? 0 : (wk / wl) * Math.pow(x / wl, wk - 1) * Math.exp(-Math.pow(x / wl, wk)); },
        cdf: function (x) { return x < 0 ? 0 : clampProbability(1 - Math.exp(-Math.pow(x / wl, wk))); },
        domain: [0, wl * Math.max(5.5, Math.pow(-Math.log(0.0002), 1 / wk))],
      };
    }
    case "gamma": {
      var alpha = probValue(params, "alpha", 2);
      var theta = probValue(params, "theta", 1);
      return {
        pdf: function (x) {
          return x <= 0 ? 0 : Math.exp((alpha - 1) * Math.log(x) - x / theta - logGamma(alpha) - alpha * Math.log(theta));
        },
        cdf: function (x) { return x <= 0 ? 0 : regularizedGammaP(alpha, x / theta); },
        domain: [0, Math.max(8 * theta, alpha * theta + 8 * Math.sqrt(alpha) * theta)],
      };
    }
    case "beta": {
      var ba = probValue(params, "alpha", 2);
      var bb = probValue(params, "beta", 5);
      var betaNorm = betaFunction(ba, bb);
      return {
        pdf: function (x) { return x <= 0 || x >= 1 ? 0 : (Math.pow(x, ba - 1) * Math.pow(1 - x, bb - 1)) / betaNorm; },
        cdf: function (x) { return regularizedBeta(x, ba, bb); },
        domain: [-0.08, 1.08],
      };
    }
    case "logNormal": {
      var lmu = probValue(params, "mu", 0);
      var lsigma = probValue(params, "sigma", 0.5);
      return {
        pdf: function (x) {
          return x <= 0 ? 0 : Math.exp(-Math.pow(Math.log(x) - lmu, 2) / (2 * lsigma * lsigma)) / (x * lsigma * Math.sqrt(2 * Math.PI));
        },
        cdf: function (x) { return x <= 0 ? 0 : 0.5 * (1 + erf((Math.log(x) - lmu) / (lsigma * Math.SQRT2))); },
        domain: [0, Math.exp(lmu + 5 * lsigma)],
      };
    }
    case "logistic": {
      var smu = probValue(params, "mu", 0);
      var ss = probValue(params, "s", 1);
      return {
        pdf: function (x) {
          var z = Math.exp(-(x - smu) / ss);
          return z / (ss * Math.pow(1 + z, 2));
        },
        cdf: function (x) { return 1 / (1 + Math.exp(-(x - smu) / ss)); },
        domain: [smu - 10 * ss, smu + 10 * ss],
      };
    }
  }
  throw new Error(distribution.name + " no es continua.");
}

function makeRange(start, end) {
  var values = [];
  for (var k = start; k <= end; k++) values.push(k);
  return values;
}

function cumulativeFromPmf(pmf, min, k) {
  var total = 0;
  for (var i = min; i <= k; i++) total += pmf(i);
  return clampProbability(total);
}

function createDiscreteMath(distribution, params) {
  switch (distribution.id) {
    case "uniformDiscrete": {
      var m = Math.round(probValue(params, "m", 6));
      var uniPmf = function (k) {
        return Number.isInteger(k) && k >= 1 && k <= m ? 1 / m : 0;
      };
      return {
        pmf: uniPmf,
        cdf: function (k) { return clampProbability(Math.floor(k) / m); },
        support: makeRange(1, m),
      };
    }
    case "binomial": {
      var n = Math.round(probValue(params, "n", 10));
      var p = probValue(params, "p", 0.4);
      var binPmf = function (k) {
        if (!Number.isInteger(k) || k < 0 || k > n) return 0;
        if (p === 0) return k === 0 ? 1 : 0;
        if (p === 1) return k === n ? 1 : 0;
        return Math.exp(logCombination(n, k) + k * Math.log(p) + (n - k) * Math.log1p(-p));
      };
      return { pmf: binPmf, cdf: function (k) { return cumulativeFromPmf(binPmf, 0, Math.floor(k)); }, support: makeRange(0, n) };
    }
    case "negativeBinomial": {
      var r = Math.round(probValue(params, "r", 4));
      var np = probValue(params, "p", 0.45);
      var negPmf = function (k) {
        if (!Number.isInteger(k) || k < 0) return 0;
        if (np === 1) return k === 0 ? 1 : 0;
        if (np === 0) return 0;
        return Math.exp(logCombination(k + r - 1, k) + r * Math.log(np) + k * Math.log1p(-np));
      };
      var support = [];
      var cumulative = 0;
      var maxK = Math.max(80, Math.ceil((r * (1 - np)) / np + 10 * Math.sqrt((r * (1 - np)) / (np * np))));
      for (var k2 = 0; k2 <= Math.min(500, maxK); k2++) {
        support.push(k2);
        cumulative += negPmf(k2);
        if (k2 > r && cumulative > 0.99995) break;
      }
      return { pmf: negPmf, cdf: function (k) { return cumulativeFromPmf(negPmf, 0, Math.floor(k)); }, support: support };
    }
    case "poisson": {
      var pl = probValue(params, "lambda", 4);
      var poiPmf = function (k) {
        if (!Number.isInteger(k) || k < 0) return 0;
        if (pl === 0) return k === 0 ? 1 : 0;
        return Math.exp(k * Math.log(pl) - pl - logGamma(k + 1));
      };
      var poiSupport = [];
      var poiCum = 0;
      var poiMax = Math.max(25, Math.ceil(pl + 10 * Math.sqrt(pl)));
      for (var pk = 0; pk <= Math.min(500, poiMax); pk++) {
        poiSupport.push(pk);
        poiCum += poiPmf(pk);
        if (pk > pl && poiCum > 0.99995) break;
      }
      return { pmf: poiPmf, cdf: function (k) { return cumulativeFromPmf(poiPmf, 0, Math.floor(k)); }, support: poiSupport };
    }
    case "hypergeometric": {
      var N = Math.round(probValue(params, "N", 40));
      var K = Math.round(probValue(params, "K", 12));
      var sample = Math.round(probValue(params, "n", 8));
      var min = Math.max(0, sample - (N - K));
      var max = Math.min(sample, K);
      var denominator = logCombination(N, sample);
      var hypPmf = function (k) {
        if (!Number.isInteger(k) || k < min || k > max) return 0;
        return Math.exp(logCombination(K, k) + logCombination(N - K, sample - k) - denominator);
      };
      return { pmf: hypPmf, cdf: function (k) { return cumulativeFromPmf(hypPmf, min, Math.floor(k)); }, support: makeRange(min, max) };
    }
  }
  throw new Error(distribution.name + " no es discreta.");
}

function formatProbNumber(value, digits) {
  if (!Number.isFinite(value)) return "no definido";
  var fixed = value.toFixed(digits === undefined ? 3 : digits);
  return fixed.replace(/\.?0+$/, "");
}

function formatProbValue(value) {
  if (!Number.isFinite(value)) return "no definido";
  return value.toFixed(value < 0.0001 && value > 0 ? 6 : 4);
}

function formatProbExpression(type, a, b) {
  var left = formatProbNumber(a, 3);
  var right = formatProbNumber(b, 3);
  if (type === "left") return "P(X <= " + left + ")";
  if (type === "right") return "P(X >= " + left + ")";
  if (type === "outside") return "P(X <= " + left + ") + P(X >= " + right + ")";
  return "P(" + left + " <= X <= " + right + ")";
}

function probabilityIncludedValues(support, type, a, b) {
  return support.filter(function (k) {
    if (type === "left") return k <= Math.floor(a);
    if (type === "right") return k >= Math.ceil(a);
    if (type === "outside") return k <= Math.floor(a) || k >= Math.ceil(b);
    return k >= Math.ceil(a) && k <= Math.floor(b);
  });
}

function calculateProbabilityVR(distribution, params, intervalType, a, b) {
  var expression = formatProbExpression(intervalType, a, b);
  if (distribution.kind === "continuous") {
    var cmath = createContinuousMath(distribution, params);
    var cvalue =
      intervalType === "left"
        ? cmath.cdf(a)
        : intervalType === "right"
          ? 1 - cmath.cdf(a)
          : intervalType === "outside"
            ? cmath.cdf(a) + 1 - cmath.cdf(b)
            : cmath.cdf(b) - cmath.cdf(a);
    return { expression: expression, value: clampProbability(cvalue), math: cmath, includedValues: [] };
  }
  var dmath = createDiscreteMath(distribution, params);
  var included = probabilityIncludedValues(dmath.support, intervalType, a, b);
  var dvalue = included.reduce(function (total, k) { return total + dmath.pmf(k); }, 0);
  return { expression: expression, value: clampProbability(dvalue), math: dmath, includedValues: included };
}

function validateProbabilityInputs(distribution, params, intervalType, a, b) {
  var errors = [];
  distribution.parameters.forEach(function (parameter) {
    var current = params[parameter.key];
    if (!Number.isFinite(current)) errors.push(parameter.label + " debe ser numérico.");
    if (parameter.integer && !Number.isInteger(current)) errors.push(parameter.label + " debe ser entero.");
    if (parameter.min !== undefined && current < parameter.min) errors.push(parameter.label + " debe ser >= " + parameter.min + ".");
    if (parameter.max !== undefined && current > parameter.max) errors.push(parameter.label + " debe ser <= " + parameter.max + ".");
  });
  if ((intervalType === "between" || intervalType === "outside") && a > b) {
    errors.push("Debe cumplirse a <= b.");
  }
  if (distribution.id === "hypergeometric") {
    if (params.K > params.N) errors.push("K debe ser menor o igual que N.");
    if (params.n > params.N) errors.push("n debe ser menor o igual que N.");
  }
  return errors;
}

function getCurrentProbabilityDistribution() {
  return PROB_DISTRIBUTIONS[probabilityState.distributionIndex];
}

function getProbabilityStation(id) {
  var stationId = id || probabilityState.activeStation;
  return PROB_CASINO_STATIONS.find(function (station) {
    return station.id === stationId;
  }) || PROB_CASINO_STATIONS[0];
}

function setProbabilityDistributionById(id) {
  var index = PROB_DISTRIBUTIONS.findIndex(function (item) {
    return item.id === id;
  });
  probabilityState.distributionIndex = index >= 0 ? index : 0;
}

function resetProbabilityObserved(message) {
  probabilityState.observedSamples = [];
  probabilityState.lastCoinFlips = [];
  probabilityState.trialCount = 0;
  probabilityState.machineRunning = false;
  probabilityState.lastOutcome = message || "Datos observados reiniciados.";
}

function applyProbabilityStation(stationId) {
  var station = getProbabilityStation(stationId);
  probabilityState.activeStation = station.id;
  setProbabilityDistributionById(station.distributionId);
  probabilityState.parameters = Object.assign({}, station.params);
  probabilityState.intervalType = station.intervalType;
  probabilityState.a = station.a;
  probabilityState.b = station.b;
  resetProbabilityObserved(station.pending ? station.description : "Estación activa: " + station.label);
}

function resetProbabilityForDistribution() {
  var distribution = getCurrentProbabilityDistribution();
  probabilityState.parameters = Object.assign({}, distribution.defaults);
  probabilityState.a = distribution.kind === "continuous" ? -1 : 2;
  probabilityState.b = distribution.kind === "continuous" ? 1 : 6;
  resetProbabilityObserved();
}

function randomNormal(mu, sigma) {
  var u1 = Math.max(Math.random(), 1e-12);
  var u2 = Math.random();
  return mu + sigma * Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

function sampleProbabilityValue(station) {
  var params = probabilityState.parameters;
  if (station.id === "coin") {
    var flips = Math.round(params.n || 10);
    var p = params.p || 0.5;
    var successes = 0;
    var coinFlips = [];
    for (var i = 0; i < flips; i++) {
      var isSuccess = Math.random() < p;
      coinFlips.push(isSuccess);
      if (isSuccess) successes++;
    }
    probabilityState.lastCoinFlips = coinFlips;
    return successes;
  }
  if (station.id === "dice") {
    var faces = Math.round(params.m || 6);
    return 1 + Math.floor(Math.random() * faces);
  }
  if (station.id === "calls") {
    var lambda = params.lambda || 4;
    var threshold = Math.exp(-lambda);
    var product = 1;
    var count = 0;
    do {
      count++;
      product *= Math.random();
    } while (product > threshold);
    return count - 1;
  }
  if (station.id === "wait") {
    return -Math.log(Math.max(Math.random(), 1e-12)) / (params.lambda || 1);
  }
  if (station.id === "normal") {
    return randomNormal(params.mu || 0, params.sigma || 1);
  }
  if (station.id === "student") {
    var df = Math.max(1, Math.round(params.df || 8));
    var z = randomNormal(0, 1);
    var chi = 0;
    for (var c = 0; c < df; c++) {
      var n = randomNormal(0, 1);
      chi += n * n;
    }
    return z / Math.sqrt(chi / df);
  }
  if (station.id === "variance") {
    var vdf = Math.max(1, Math.round(params.df || 4));
    var sum = 0;
    for (var j = 0; j < vdf; j++) {
      var g = randomNormal(0, 1);
      sum += g * g;
    }
    return sum;
  }
  return 0;
}

function runProbabilityExperiment(times) {
  var station = getProbabilityStation();
  if (station.pending) {
    probabilityState.lastOutcome = station.description;
    return;
  }
  probabilityState.machineRunning = true;
  var values = [];
  for (var i = 0; i < times; i++) {
    var value = sampleProbabilityValue(station);
    probabilityState.observedSamples.push(value);
    values.push(value);
  }
  probabilityState.trialCount = probabilityState.observedSamples.length;
  var last = values[values.length - 1];
  probabilityState.lastOutcome =
    "Último: " + formatProbNumber(last, 2) +
    "\nGenerados: +" + times +
    "\nTotal: " + probabilityState.trialCount;
}

function handleProbabilityAction(action) {
  var distribution = getCurrentProbabilityDistribution();
  if (action.indexOf("prob-station-") === 0) {
    applyProbabilityStation(action.replace("prob-station-", ""));
  } else if (action === "prob-run-once") {
    runProbabilityExperiment(1);
  } else if (action === "prob-run-ten") {
    runProbabilityExperiment(10);
  } else if (action === "prob-run-hundred") {
    runProbabilityExperiment(100);
  } else if (action === "prob-reset-observed") {
    resetProbabilityObserved("Datos observados reiniciados.");
  } else if (action === "prob-prev" || action === "prob-next") {
    var delta = action === "prob-prev" ? -1 : 1;
    probabilityState.distributionIndex =
      (probabilityState.distributionIndex + delta + PROB_DISTRIBUTIONS.length) % PROB_DISTRIBUTIONS.length;
    resetProbabilityForDistribution();
  } else if (action === "prob-interval") {
    var currentInterval = PROB_INTERVALS.indexOf(probabilityState.intervalType);
    probabilityState.intervalType = PROB_INTERVALS[(currentInterval + 1) % PROB_INTERVALS.length];
  } else if (action === "prob-a-minus") {
    probabilityState.a -= distribution.kind === "continuous" ? 0.25 : 1;
  } else if (action === "prob-a-plus") {
    probabilityState.a += distribution.kind === "continuous" ? 0.25 : 1;
  } else if (action === "prob-b-minus") {
    probabilityState.b -= distribution.kind === "continuous" ? 0.25 : 1;
  } else if (action === "prob-b-plus") {
    probabilityState.b += distribution.kind === "continuous" ? 0.25 : 1;
  } else if (action.indexOf("prob-param-") === 0) {
    var minus = action.lastIndexOf("-minus") === action.length - 6;
    var plus = action.lastIndexOf("-plus") === action.length - 5;
    var key = action.replace("prob-param-", "").replace("-minus", "").replace("-plus", "");
    var parameter = distribution.parameters.find(function (item) { return item.key === key; });
    if (parameter && (minus || plus)) {
      var nextValue = (probabilityState.parameters[key] || 0) + (plus ? parameter.step : -parameter.step);
      if (parameter.integer) nextValue = Math.round(nextValue);
      if (parameter.min !== undefined) nextValue = Math.max(parameter.min, nextValue);
      if (parameter.max !== undefined) nextValue = Math.min(parameter.max, nextValue);
      probabilityState.parameters[key] = Number(nextValue.toFixed(4));
      resetProbabilityObserved("Parámetro actualizado. Generá nuevos datos.");
    }
  }
  renderProbabilityLab();
}

function clearEntityChildren(el) {
  if (!el) return;
  while (el.firstChild) el.removeChild(el.firstChild);
}

function intervalLabel(type) {
  if (type === "left") return "Cola izquierda: X <= a";
  if (type === "right") return "Cola derecha: X >= a";
  if (type === "outside") return "Exterior: X <= a o X >= b";
  return "Entre límites: a <= X <= b";
}

function isValueIncluded(type, x, a, b) {
  if (type === "left") return x <= a;
  if (type === "right") return x >= a;
  if (type === "outside") return x <= a || x >= b;
  return x >= a && x <= b;
}

function renderProbabilityChart(root, distribution, result) {
  clearEntityChildren(root);
  if (!root || !result.math) return;
  appendEl(root, "a-plane", {
    width: "4.9",
    height: "0.025",
    position: "2.45 -0.18 0",
    color: "#607D8B",
  });

  if (distribution.kind === "continuous") {
    var math = result.math;
    var samples = 48;
    var start = math.domain[0];
    var end = math.domain[1];
    var values = [];
    var maxPdf = 0;
    for (var i = 0; i < samples; i++) {
      var x = start + ((end - start) * i) / (samples - 1);
      var y = math.pdf(x);
      values.push({ x: x, y: y });
      if (Number.isFinite(y)) maxPdf = Math.max(maxPdf, y);
    }
    values.forEach(function (point, index) {
      var h = maxPdf > 0 ? Math.max(0.045, (point.y / maxPdf) * 1.75) : 0.045;
      appendEl(root, "a-box", {
        width: "0.065",
        height: h,
        depth: "0.035",
        position: index * 0.102 + " " + (-0.18 + h / 2) + " 0",
        color: "#FFB74D",
        opacity: "0.95",
      });
      if (index % 8 === 0 || index === samples - 1) {
        addText(root, {
          value: formatProbNumber(point.x, 1),
          position: index * 0.102 + " -0.33 0.04",
          align: "center",
          color: "#CBD5E1",
          width: "1.2",
          scale: "0.18 0.18 0.18",
        });
      }
    });
  } else {
    var support = result.math.support.slice(0, 34);
    var included = {};
    result.includedValues.forEach(function (k) { included[k] = true; });
    var maxP = support.reduce(function (max, k) { return Math.max(max, result.math.pmf(k)); }, 0);
    support.forEach(function (k, index) {
      var p = result.math.pmf(k);
      var h = maxP > 0 ? Math.max(0.045, (p / maxP) * 1.7) : 0.045;
      appendEl(root, "a-box", {
        width: "0.095",
        height: h,
        depth: "0.05",
        position: index * 0.14 + " " + (-0.18 + h / 2) + " 0",
        color: "#FFB74D",
        opacity: "0.95",
      });
      if (support.length <= 16 || index % 2 === 0 || index === support.length - 1) {
        addText(root, {
          value: String(k),
          position: index * 0.14 + " -0.34 0.04",
          align: "center",
          color: "#CBD5E1",
          width: "0.8",
          scale: "0.22 0.22 0.22",
        });
      }
    });
  }

  if (probabilityState.observedSamples.length > 0) {
    var counts = {};
    probabilityState.observedSamples.forEach(function (value) {
      var key = distribution.kind === "discrete" ? Math.round(value) : Number(value).toFixed(1);
      counts[key] = (counts[key] || 0) + 1;
    });
    var maxCount = Object.keys(counts).reduce(function (max, key) {
      return Math.max(max, counts[key]);
    }, 1);

    if (distribution.kind === "discrete") {
      var obsSupport = result.math.support.slice(0, 34);
      Object.keys(counts).forEach(function (key) {
        var k = parseInt(key, 10);
        var obsIndex = obsSupport.indexOf(k);
        if (obsIndex < 0) return;
        var oh = Math.max(0.045, (counts[key] / maxCount) * 1.45);
        appendEl(root, "a-box", {
          width: "0.052",
          height: oh,
          depth: "0.08",
          position: obsIndex * 0.14 + 0.045 + " " + (-0.18 + oh / 2) + " 0.08",
          color: "#EF4444",
          opacity: "0.95",
        });
      });
    } else {
      var domain = result.math.domain || [-4, 4];
      Object.keys(counts).forEach(function (key) {
        var value = parseFloat(key);
        if (!Number.isFinite(value) || value < domain[0] || value > domain[1]) return;
        var ratio = (value - domain[0]) / (domain[1] - domain[0]);
        var ch = Math.max(0.045, (counts[key] / maxCount) * 1.2);
        appendEl(root, "a-box", {
          width: "0.055",
          height: ch,
          depth: "0.08",
          position: Math.max(0, Math.min(4.85, ratio * 4.85)) + " " + (-0.18 + ch / 2) + " 0.08",
          color: "#EF4444",
          opacity: "0.9",
        });
      });
    }
  }
}

function renderProbabilityParameters(root, distribution) {
  clearEntityChildren(root);
  if (!root) return;
  var station = getProbabilityStation();

  function getParameter(key) {
    return distribution.parameters.find(function (item) {
      return item.key === key;
    });
  }

  function addParamButton(parameter, plus, x, y) {
    if (!parameter) return;
    addButton(root, {
      id: "prob-param-" + parameter.key + (plus ? "-plus" : "-minus"),
      position: x + " " + y + " 0.04",
      action: "prob-param-" + parameter.key + (plus ? "-plus" : "-minus"),
      color: plus ? "#2E7D32" : "#3B302B",
      label: plus ? "+" : "-",
      width: "0.34",
      height: "0.26",
      depth: "0.045",
      textWidth: "0.9",
      textPosition: "0 0 0.035",
    });
  }

  function addParamCard(config) {
    var y = Number(config.y);
    appendEl(root, "a-plane", {
      position: "0 " + y + " -0.005",
      width: config.width || "3.65",
      height: config.height || "0.37",
      color: config.color || "#0B1622",
      opacity: "0.82",
      material: "side: double; transparent: true",
    });
  }

  function addParameterRow(config) {
    var parameter = getParameter(config.key);
    var y = Number(config.y);
    addParamCard({ y: y, width: config.width || "3.65", height: config.height || "0.39" });
    addText(root, {
      value: config.symbol,
      position: "-1.58 " + (y + 0.005) + " 0.04",
      align: "center",
      color: config.symbolColor || "#FFFFFF",
      width: "1.15",
      scale: config.symbolScale || "0.92 0.92 0.92",
    });
    addText(root, {
      value: config.title,
      position: "-1.25 " + (y + (config.subtitle ? 0.055 : 0.005)) + " 0.04",
      align: "left",
      color: "#F8FAFC",
      width: "2.55",
      wrapCount: "34",
      scale: "0.39 0.39 0.39",
    });
    if (config.subtitle) {
      addText(root, {
        value: config.subtitle,
        position: "-1.25 " + (y - 0.095) + " 0.04",
        align: "left",
        color: "#93C5FD",
        width: "2.35",
        wrapCount: "34",
        scale: "0.29 0.29 0.29",
      });
    }
    addText(root, {
      value: formatProbNumber(probabilityState.parameters[config.key], config.digits || 3),
      position: (config.valueX || "0.78") + " " + (y + 0.005) + " 0.04",
      align: "center",
      color: "#FFFFFF",
      width: "1.25",
      scale: "1.75 1.75 1.75",
    });
    addParamButton(parameter, false, "1.34", y);
    addParamButton(parameter, true, "1.75", y);
  }

  function addModelFooter(config) {
    var y = Number(config.y);
    appendEl(root, "a-plane", {
      position: "0 " + y + " 0",
      width: config.width || "3.3",
      height: config.height || "0.42",
      color: "#0B1622",
      opacity: "0.72",
      material: "side: double; transparent: true",
    });
    addText(root, {
      value: config.icon || "i",
      position: "-1.45 " + (y + 0.02) + " 0.04",
      align: "center",
      color: "#60A5FA",
      width: "0.5",
      scale: "0.42 0.42 0.42",
    });
    addText(root, {
      value: config.title,
      position: "-1.22 " + (y + 0.085) + " 0.04",
      align: "left",
      color: "#60A5FA",
      width: "2.75",
      wrapCount: "42",
      scale: "0.38 0.38 0.38",
    });
    addText(root, {
      value: config.subtitle,
      position: "-1.22 " + (y - 0.095) + " 0.04",
      align: "left",
      color: "#BFDBFE",
      width: "2.9",
      wrapCount: "50",
      scale: "0.31 0.31 0.31",
    });
  }

  function addCenteredModelText(config) {
    addText(root, {
      value: config.title,
      position: "0 " + config.titleY + " 0.04",
      align: "center",
      color: "#60A5FA",
      width: "3.4",
      scale: "0.42 0.42 0.42",
    });
    addText(root, {
      value: config.subtitle || "Estos valores cambian la distribución teórica.",
      position: "0 " + config.subtitleY + " 0.04",
      align: "center",
      color: "#BFDBFE",
      width: "3.6",
      scale: "0.32 0.32 0.32",
    });
  }

  if (station.id === "coin") {
    addParameterRow({
      key: "n",
      symbol: "n",
      title: "Número de ensayos",
      y: "0.14",
      digits: 0,
      symbolScale: "1.35 1.35 1.35",
    });
    addParameterRow({
      key: "p",
      symbol: "p",
      title: "Probabilidad de éxito",
      y: "-0.33",
      digits: 2,
      symbolScale: "1.35 1.35 1.35",
    });
    appendEl(root, "a-plane", {
      position: "0 -0.64 0.02",
      width: "3.55",
      height: "0.008",
      color: "#94A3B8",
      opacity: "0.35",
      material: "side: double; transparent: true",
    });
    addCenteredModelText({
      title: "Modelo binomial: X ~ Bin(n, p)",
      titleY: "-0.82",
      subtitleY: "-1.03",
    });
  } else if (station.id === "dice") {
    addParameterRow({
      key: "m",
      symbol: "m",
      title: "Número de resultados posibles (caras)",
      subtitle: "caras",
      y: "0.06",
      digits: 0,
      width: "3.75",
      height: "0.45",
      symbolColor: "#60A5FA",
      symbolScale: "0.62 0.62 0.62",
    });
    appendEl(root, "a-plane", {
      position: "0 -0.57 0.02",
      width: "3.55",
      height: "0.008",
      color: "#94A3B8",
      opacity: "0.35",
      material: "side: double; transparent: true",
    });
    addCenteredModelText({
      title: "Modelo uniforme-discreto: X ~ U{1, ..., m}",
      titleY: "-0.76",
      subtitleY: "-0.97",
    });
  } else if (station.id === "calls") {
    appendEl(root, "a-plane", {
      position: "0 0.18 0",
      width: "3.75",
      height: "0.25",
      color: "#1E3A5F",
      opacity: "0.76",
      material: "side: double; transparent: true",
    });
    addText(root, {
      value: "Parámetro",
      position: "-1.65 0.18 0.04",
      align: "left",
      color: "#FFFFFF",
      width: "1.75",
      scale: "0.88 0.88 0.88",
    });
    addText(root, {
      value: "Valor actual",
      position: "0.45 0.18 0.04",
      align: "center",
      color: "#FFFFFF",
      width: "1.75",
      scale: "0.88 0.88 0.88",
    });
    addText(root, {
      value: "Ajustar",
      position: "1.48 0.18 0.04",
      align: "center",
      color: "#FFFFFF",
      width: "1.55",
      scale: "0.88 0.88 0.88",
    });
    addParameterRow({
      key: "lambda",
      symbol: "λ",
      title: "Tasa media de autos",
      subtitle: "Parámetro de Poisson (λ)",
      y: "-0.12",
      digits: 1,
      valueX: "0.45",
      width: "3.75",
      height: "0.45",
      symbolColor: "#60A5FA",
      symbolScale: "1.05 1.05 1.05",
    });
    appendEl(root, "a-plane", {
      position: "0 -0.57 0.02",
      width: "3.75",
      height: "0.008",
      color: "#94A3B8",
      opacity: "0.28",
      material: "side: double; transparent: true",
    });
    addCenteredModelText({
      title: "Modelo de Poisson: X ~ Poisson(λ)",
      titleY: "-0.85",
      subtitleY: "-1.06",
    });
  }
}

function setTextIfPresent(root, selector, value) {
  var el = root.querySelector(selector);
  if (el) el.setAttribute("value", value);
}

function highlightActiveProbabilityMachine(lab) {
  [
    ["#prob-coin-machine", "coin", "#422006"],
    ["#prob-dice-machine", "dice", "#082F49"],
    ["#prob-calls-machine", "calls", "#1A2E05"],
  ].forEach(function (item) {
    var machine = lab.querySelector(item[0]);
    if (!machine) return;
    machine.setAttribute("scale", item[1] === probabilityState.activeStation ? "1.08 1.08 1.08" : "1 1 1");
  });
}

function addDigitalDigit(parent, digit, size, color) {
  var maps = {
    "0": ["a", "b", "c", "d", "e", "f"],
    "1": ["b", "c"],
    "2": ["a", "b", "g", "e", "d"],
    "3": ["a", "b", "g", "c", "d"],
    "4": ["f", "g", "b", "c"],
    "5": ["a", "f", "g", "c", "d"],
    "6": ["a", "f", "g", "e", "c", "d"],
    "7": ["a", "b", "c"],
    "8": ["a", "b", "c", "d", "e", "f", "g"],
    "9": ["a", "b", "c", "d", "f", "g"],
  };
  var active = maps[String(digit)] || [];
  if (!active.length) {
    addText(parent, {
      value: "?",
      position: "0 -0.01 0.01",
      align: "center",
      color: color,
      width: (size * 3).toString(),
      scale: size + " " + size + " " + size,
    });
    return;
  }
  var horizontal = {
    a: [0, 0.5, size * 0.48, size * 0.065],
    g: [0, 0, size * 0.48, size * 0.065],
    d: [0, -0.5, size * 0.48, size * 0.065],
  };
  var vertical = {
    f: [-0.24, 0.25, size * 0.065, size * 0.3],
    b: [0.24, 0.25, size * 0.065, size * 0.3],
    e: [-0.24, -0.25, size * 0.065, size * 0.3],
    c: [0.24, -0.25, size * 0.065, size * 0.3],
  };
  active.forEach(function (segment) {
    var spec = horizontal[segment] || vertical[segment];
    appendEl(parent, "a-box", {
      position: (spec[0] * size) + " " + (spec[1] * size) + " 0",
      width: spec[2].toString(),
      height: spec[3].toString(),
      depth: "0.012",
      color: color,
      opacity: "0.98",
    });
  });
}

function setDigitalNumber(parent, value, places, size, color, gap) {
  clearEntityChildren(parent);
  if (!parent) return;
  var text = value == null ? "" : String(value);
  if (places && text !== "?") text = text.padStart(places, "0");
  if (!text) text = "?";
  gap = gap || size * 0.34;
  var start = -((text.length - 1) * gap) / 2;
  for (var i = 0; i < text.length; i++) {
    var digit = appendEl(parent, "a-entity", {
      position: (start + i * gap) + " 0 0",
    });
    addDigitalDigit(digit, text.charAt(i), size, color);
  }
}

function renderCoinVisuals(lab) {
  var root = lab.querySelector("#prob-coin-visuals");
  clearEntityChildren(root);
  if (!root) return;
  var flips = probabilityState.activeStation === "coin" ? probabilityState.lastCoinFlips : [];
  for (var flip = 0; flip < 10; flip++) {
    var body = lab.querySelector("#prob-coin-flip-body-" + flip);
    var rim = lab.querySelector("#prob-coin-flip-rim-" + flip);
    var faceHead = lab.querySelector("#prob-coin-flip-face-head-" + flip);
    var faceBody = lab.querySelector("#prob-coin-flip-face-body-" + flip);
    var crossA = lab.querySelector("#prob-coin-flip-cross-a-" + flip);
    var crossB = lab.querySelector("#prob-coin-flip-cross-b-" + flip);
    var label = lab.querySelector("#prob-coin-flip-label-" + flip);
    var hasResult = flip < flips.length;
    var isFace = !!flips[flip];
    if (body) {
      body.setAttribute("color", !hasResult ? "#C9BFA8" : isFace ? "#FACC15" : "#9CA3AF");
      body.setAttribute("opacity", hasResult ? "1" : "0.72");
      if (probabilityState.machineRunning && probabilityState.activeStation === "coin" && hasResult) {
        body.removeAttribute("animation__flip");
        body.setAttribute("rotation", "90 0 0");
        (function (coinBody, delay) {
          setTimeout(function () {
            coinBody.setAttribute("animation__flip", "property: rotation; from: 90 0 0; to: 450 0 0; dur: 560; delay: " + delay + "; easing: easeOutCubic");
          }, 0);
        })(body, flip * 42);
      }
    }
    if (rim) {
      rim.setAttribute("color", !hasResult ? "#A78A2D" : isFace ? "#B8860B" : "#64748B");
      rim.setAttribute("opacity", hasResult ? "0.95" : "0.55");
    }
    [faceHead, faceBody].forEach(function (part) {
      if (!part) return;
      part.setAttribute("visible", hasResult && isFace ? "true" : "false");
      part.setAttribute("color", "#B8860B");
    });
    [crossA, crossB].forEach(function (part) {
      if (!part) return;
      part.setAttribute("visible", hasResult && !isFace ? "true" : "false");
    });
    if (label) {
      label.setAttribute("value", hasResult ? "" : "?");
      label.setAttribute("color", "#5B5144");
    }
  }
}

function renderDiceVisuals(lab) {
  var last = probabilityState.activeStation === "dice" && probabilityState.observedSamples.length
    ? Math.round(probabilityState.observedSamples[probabilityState.observedSamples.length - 1])
    : "?";
  setTextIfPresent(lab, "#prob-dice-result", last === "?" ? "Tirá el dado" : "Salió: " + last);
  var cube = lab.querySelector("#prob-dice-cube");
  if (cube && probabilityState.machineRunning && probabilityState.activeStation === "dice") {
    var finalRotations = {
      1: "0 0 0",
      2: "90 0 0",
      3: "0 0 90",
      4: "0 0 -90",
      5: "-90 0 0",
      6: "180 0 0",
    };
    var target = finalRotations[last] || "0 0 0";
    cube.setAttribute("animation__roll", "property: rotation; startEvents: casino-run; from: -360 -720 -360; to: " + target + "; dur: 720; easing: easeOutCubic");
    cube.emit("casino-run");
  } else if (cube && last !== "?") {
    var stableRotations = {
      1: "0 0 0",
      2: "90 0 0",
      3: "0 0 90",
      4: "0 0 -90",
      5: "-90 0 0",
      6: "180 0 0",
    };
    cube.setAttribute("rotation", stableRotations[last] || "0 0 0");
  }
}

function renderCallsVisuals(lab) {
  var last = probabilityState.activeStation === "calls" && probabilityState.observedSamples.length
    ? Math.round(probabilityState.observedSamples[probabilityState.observedSamples.length - 1])
    : 0;
  var visibleCars = Math.min(last, 10);
  for (var i = 0; i < 10; i++) {
    var car = lab.querySelector("#prob-traffic-car-" + i);
    if (!car) continue;
    var isVisible = i < visibleCars;
    var laneY = i % 2 === 0 ? 0.94 : 0.82;
    var x = -0.44 + ((i * 19 + probabilityState.trialCount * 11) % 86) / 100;
    car.setAttribute("visible", isVisible ? "true" : "false");
    if (!isVisible) continue;
    car.setAttribute("position", x + " " + laneY + " 0.23");
    if (probabilityState.machineRunning && probabilityState.activeStation === "calls") {
      car.setAttribute("animation__drive", "property: position; from: -0.58 " + laneY + " 0.23; to: " + x + " " + laneY + " 0.23; dur: 620; delay: " + (i * 65) + "; easing: easeOutCubic");
    }
  }
  var trafficLight = lab.querySelector("#prob-traffic-light");
  if (trafficLight) {
    trafficLight.setAttribute("color", visibleCars > 0 ? "#22C55E" : "#365314");
  }
}

function renderProbabilityMachines(lab, distribution, result) {
  var station = getProbabilityStation();
  var last = probabilityState.observedSamples.length
    ? probabilityState.observedSamples[probabilityState.observedSamples.length - 1]
    : null;
  var coinLast = station.id === "coin" && last !== null ? Math.round(last) : null;
  setTextIfPresent(lab, "#prob-coin-display", coinLast === null ? "Simulá 10 monedas\nCara = éxito" : "Caras: " + coinLast + " de 10\nCruces: " + (10 - coinLast));
  setTextIfPresent(lab, "#prob-dice-display", "Dado justo: caras 1 a 6\nTiradas: " + probabilityState.trialCount);
  setTextIfPresent(lab, "#prob-calls-display", "λ = " + formatProbNumber(probabilityState.parameters.lambda || 3, 1) + " autos/min\nMinuto actual: " + probabilityState.trialCount + "\nAutos que pasaron: " + (station.id === "calls" && last !== null ? Math.round(last) : "-"));
  renderCoinVisuals(lab);
  renderDiceVisuals(lab);
  renderCallsVisuals(lab);
  highlightActiveProbabilityMachine(lab);
}

function renderProbabilityLab() {
  var lab = document.getElementById("probability-lab");
  if (!lab) return;
  var station = getProbabilityStation();
  if (getCurrentProbabilityDistribution().id !== station.distributionId) {
    setProbabilityDistributionById(station.distributionId);
  }
  var distribution = getCurrentProbabilityDistribution();
  var errors = validateProbabilityInputs(
    distribution,
    probabilityState.parameters,
    probabilityState.intervalType,
    probabilityState.a,
    probabilityState.b,
  );
  var result = null;
  if (!errors.length) {
    result = calculateProbabilityVR(
      distribution,
      probabilityState.parameters,
      probabilityState.intervalType,
      probabilityState.a,
      probabilityState.b,
    );
  }

  var title = lab.querySelector("#prob-title");
  var desc = lab.querySelector("#prob-description");
  var theoryBlock = lab.querySelector("#prob-theory-block");
  var chartExplanation = lab.querySelector("#prob-chart-explanation");
  var distName = lab.querySelector("#prob-dist-name");
  var limits = lab.querySelector("#prob-limits-text");
  var resultText = lab.querySelector("#prob-result");
  var outcomeText = lab.querySelector("#prob-last-outcome");
  if (title) {
    var boardTitle = "Distribución observada";
    if (station.id === "coin") boardTitle = "Distribución binomial";
    if (station.id === "dice") boardTitle = "Distribución uniforme discreta";
    if (station.id === "calls") boardTitle = "Distribución de Poisson";
    title.setAttribute(
      "value",
      boardTitle,
    );
  }
  if (theoryBlock) {
    var theoryText = "";
    if (station.id === "coin") {
      theoryText =
        "Experimento: lanzar 10 monedas\n" +
        "X = cantidad de caras obtenidas\n" +
        "Modelo: X ~ Binomial(n = 10, p = 0.5)";
    } else if (station.id === "dice") {
      var faces = Math.round(probabilityState.parameters.m || 6);
      theoryText =
        "Experimento: lanzar un dado justo de " + faces + " caras\n" +
        "X = resultado obtenido\n" +
        "Modelo: X ~ Uniforme{1, ..., " + faces + "}";
    } else if (station.id === "calls") {
      var lambda = formatProbNumber(probabilityState.parameters.lambda || 3, 1);
      theoryText =
        "Experimento: contar autos durante 1 minuto\n" +
        "X = cantidad de autos que pasan\n" +
        "Modelo: X ~ Poisson(λ = " + lambda + ")";
    }
    theoryBlock.setAttribute(
      "value",
      theoryText,
    );
  }
  if (chartExplanation) {
    var chartText = "";
    if (station.id === "coin") {
      chartText = "La gráfica muestra la probabilidad teórica de obtener de 0 a 10 caras.";
    } else if (station.id === "dice") {
      chartText = "La gráfica muestra que cada cara tiene la misma probabilidad.";
    } else if (station.id === "calls") {
      chartText = "La gráfica muestra la probabilidad de contar distintas cantidades de autos por minuto.";
    }
    chartExplanation.setAttribute(
      "value",
      chartText,
    );
  }
  if (desc) {
    var baseDesc = station.label + " | " + station.description;
    if (station.id === "coin") {
      baseDesc =
        "Binomial: caras en 10 lanzamientos" +
        "\np = probabilidad de cara en cada lanzamiento";
    } else if (station.id === "dice") {
      baseDesc =
        "Uniforme discreta: resultado de un dado justo" +
        "\nCada cara tiene la misma probabilidad";
    } else if (station.id === "calls") {
      baseDesc =
        "Poisson: autos que pasan por minuto" +
        "\nλ = promedio esperado de autos por minuto";
    }
    desc.setAttribute("value", baseDesc);
  }
  if (distName) distName.setAttribute("value", station.label + " -> " + distribution.name);
  if (limits) {
    limits.setAttribute(
      "value",
      "Intentos: " + probabilityState.trialCount +
        " | Intervalo: " + intervalLabel(probabilityState.intervalType),
    );
  }
  if (resultText) {
    var observedLegend = probabilityState.observedSamples.length > 0
      ? "\nBarra roja: resultado simulado"
      : "\nResultado simulado: aparecerá al ejecutar";
    resultText.setAttribute(
      "value",
      errors.length
        ? "Corregí los datos: " + errors.join(" ")
        : "Barras doradas: probabilidad teórica" + observedLegend,
    );
  }
  if (outcomeText) {
    var initialMessage = "Activá una máquina para generar datos.";
    if (station.id === "coin") {
      initialMessage = "Lanzá 10 monedas y compará el resultado con la distribución teórica.";
    } else if (station.id === "dice") {
      initialMessage = "Lanzá el dado y compará el resultado con la distribución teórica.";
    } else if (station.id === "calls") {
      initialMessage = "Avanzá un minuto y compará la cantidad de autos con la distribución teórica.";
    }
    outcomeText.setAttribute(
      "value",
      probabilityState.observedSamples.length === 0
        ? initialMessage
        : probabilityState.lastOutcome || initialMessage,
    );
  }
  renderProbabilityParameters(lab.querySelector("#prob-param-rows"), distribution);
  renderProbabilityChart(lab.querySelector("#prob-chart"), distribution, result || {});
  renderProbabilityMachines(lab, distribution, result || {});
  probabilityState.machineRunning = false;
}
