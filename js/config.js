// Fuente con tildes, ñ, ¿, ², λ... (la de A-Frame solo trae ASCII).
var textSchema = AFRAME.components.text.schema;
textSchema.font.default = "fonts/roboto-es.json";
textSchema.shader.default = "msdf";
textSchema.negate.default = false;

// Modo liviano para móviles y visores standalone (Quest, etc.):
// sin sombras ni luces puntuales. Forzar con ?lite=1 / ?lite=0.
var DEVICE = AFRAME.utils.device;
var IS_TOUCH_PHONE = DEVICE.isMobile() && !DEVICE.isMobileVR();
var LITE = /[?&]lite=1/.test(location.search) ||
  (!/[?&]lite=0/.test(location.search) && (DEVICE.isMobile() || DEVICE.isMobileVR()));

// En VR inmersivo el navegador deja de llamar a window.requestAnimationFrame,
// así que las animaciones usan el bucle de la sesión XR cuando existe.
function nextFrame(cb) {
  var scene = document.querySelector("a-scene");
  var session = scene && scene.xrSession;
  return session
    ? { xr: session, id: session.requestAnimationFrame(function (t) { cb(t); }) }
    : { id: requestAnimationFrame(cb) };
}
function cancelFrame(handle) {
  if (!handle) return;
  if (handle.xr) handle.xr.cancelAnimationFrame(handle.id);
  else cancelAnimationFrame(handle.id);
}

// GSAP avanza con el tick de A-Frame (también funciona dentro de VR).
AFRAME.registerSystem("gsap-tick", {
  init: function () {
    this.time = window.gsap ? gsap.ticker.time : 0;
    if (window.gsap) gsap.ticker.remove(gsap.updateRoot);
  },
  tick: function (time, delta) {
    if (!window.gsap) return;
    this.time += Math.min(delta || 0, 100) / 1000;
    gsap.updateRoot(this.time);
  },
});
