var drawing = new Drawing();
//document on load
document.onload = drawing.init();
//window on resize
window.addEventListener('resize', drawing.position, false);
//others
window.addEventListener("load", function(e) { 
	window. scrollTo(0, 0);
	if(e.currentTarget.innerWidth < 768) {
		drawing.flash(document.getElementById("flash"), "Draw !");
	} 
	
	}, false);
document.addEventListener("touchmove", function(e) { e.preventDefault() }, {passive: false});
