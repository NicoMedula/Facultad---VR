// Google Analytics (gtag.js)
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-1M4P3YW254');

// Microsoft Clarity
(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "ykqukwh9qj");

// Envía un evento a GA4 y a Clarity con el mismo nombre
function track(nombre, params) {
  params = params || {};
  if (window.gtag) gtag("event", nombre, params);
  if (window.clarity) clarity("event", nombre);
}
