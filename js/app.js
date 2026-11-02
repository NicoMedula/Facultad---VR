// ===== EVENT LISTENERS =====
// Los botones se manejan via componente btn-action (registrado arriba)
// Solo queda el manejo de VR enter/exit

document.addEventListener("DOMContentLoaded", function () {
  var scene = document.querySelector("a-scene");

  scene.addEventListener("loaded", function () {
    console.log("Facultad Virtual VR cargada correctamente");
    console.log("Aula 1: Análisis Matemático | Aula 2: Algoritmos");
    console.log("Aula 4: Física (MRUV)");
  });

  scene.addEventListener("enter-vr", function () {
    document.querySelector(".info-panel").style.display = "none";
    var hud = document.getElementById("mathHUD");
    if (hud) hud.style.display = "none";
    // Ocultar cursor gaze en visores (se usan laser-controls de los controladores).
    // En el celular (Cardboard) el círculo es la única forma de apuntar.
    var cursor = document.querySelector("a-cursor");
    if (cursor && !IS_TOUCH_PHONE) cursor.setAttribute("visible", false);
  });
  scene.addEventListener("exit-vr", function () {
    document.querySelector(".info-panel").style.display = "block";
    // Restaurar cursor gaze para modo escritorio
    var cursor = document.querySelector("a-cursor");
    if (cursor) cursor.setAttribute("visible", true);
  });
});
