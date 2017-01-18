var drawing = new Drawing();
//document on load
document.onload = drawing.init();
//window on resize
window.addEventListener('resize', drawing.position, false);
//others
window.addEventListener("load", function() { window. scrollTo(0, 0); });
document.addEventListener("touchmove", function(e) { e.preventDefault() }, {passive: false});
