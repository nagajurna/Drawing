function DrawService(container,ctx,saveBtn,newBtn) {
	
	var container = container;
	
	var canvas = ctx.canvas;
	
	var saveBtn = saveBtn;
	
	var newBtn = newBtn;
	
	var drawing = false;
	
	var lastPoint = {};
	
	var currentPoint = {};
	
	canvas.addEventListener('mouseout', function() {
		drawing = false;
		}, false);
	
	this.mousedown = function(e) {
		e.preventDefault();
		if(e.which===1) {
			saveBtn.disabled = false;
			newBtn.disabled = false;
			drawing = true;
			lastPoint={ x: e.clientX-container.offsetLeft, y: e.clientY-container.offsetTop };
			ctx.beginPath();
			ctx.moveTo(lastPoint.x, lastPoint.y);
			ctx.lineTo(lastPoint.x, lastPoint.y);
			ctx.stroke();
		}
	};
	
	this.mousemove = function(e) {
		e.preventDefault();
		if (drawing===true) {
			currentPoint={ x: e.clientX-container.offsetLeft, y: e.clientY-container.offsetTop };
			ctx.beginPath();
			ctx.moveTo(lastPoint.x, lastPoint.y);
			ctx.lineTo(currentPoint.x, currentPoint.y);
			ctx.stroke();
			lastPoint = currentPoint;
		}
		
		
	};
	
	this.mouseup = function() {
		drawing = false;
	};
	
	this.touchstart = function(e) {
		saveBtn.disabled = false;
		newBtn.disabled = false;
		var touch = e.touches[0];
		drawing = true;
		lastPoint={ x: touch.clientX-container.offsetLeft, y: touch.clientY-container.offsetTop };
	};

	this.touchmove = function(e) {
		var touch = e.touches[0];
		if (drawing) {
			var currentPoint={ x: touch.clientX-container.offsetLeft, y: touch.clientY-container.offsetTop };
			ctx.beginPath();
			ctx.moveTo(lastPoint.x, lastPoint.y);
			ctx.lineTo(currentPoint.x, currentPoint.y);
			ctx.stroke();
			lastPoint = currentPoint;
		}
	};

	this.touchend = function() {
		drawing = false;
	};
	
	canvas.addEventListener("mousedown",this.mousedown, {capture: false});
	canvas.addEventListener("mousemove",this.mousemove, {capture: false});
	canvas.addEventListener("mouseup",this.mouseup, {capture: false});
	canvas.addEventListener("touchstart",this.touchstart, {capture: false, passive: true});
	canvas.addEventListener("touchmove",this.touchmove, {capture: false, passive: true});
	canvas.addEventListener("touchend",this.touchend, {capture: false, passive: true});
	
}
