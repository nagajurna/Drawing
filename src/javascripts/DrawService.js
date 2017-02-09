function DrawService(container,ctx,convertBtn,saveBtn,newBtn,newTopBtn,historyService,previousBtn) {
	
	let canvas = ctx.canvas;
	
	let drawing = false;
	
	let lastPoint = {};
	
	let currentPoint = {};
	
	let mousedown = (e) => {
		e.preventDefault();
		if(e.which===1) {
			drawing = true;
			lastPoint={ x: e.clientX-container.offsetLeft, y: e.clientY-container.offsetTop };
			//allow single point
			ctx.beginPath();
			ctx.moveTo(lastPoint.x, lastPoint.y);
			ctx.lineTo(lastPoint.x, lastPoint.y);
			ctx.stroke();
			
			
		}
	};
	
	let mousemove = (e) => {
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
	
	let mouseup = () => {
		if(drawing===true) {
			//buttons disabled = false
			convertBtn.disabled = false;
			saveBtn.disabled = false;
			newBtn.disabled = false;
			newTopBtn.disabled = false;
			//add to history
			historyService.setHistory({ url: canvas.toDataURL(), top: container.offsetTop, left: container.offsetLeft }, {reset: false});
			drawing = false;
		}
		
	};
	
	let touchstart = (e) => {
		e.preventDefault();
		let touch = e.touches[0];
		drawing = true;
		lastPoint={ x: touch.clientX-container.offsetLeft, y: touch.clientY-container.offsetTop };
		//allow single point
		ctx.beginPath();
		ctx.moveTo(lastPoint.x, lastPoint.y);
		ctx.lineTo(lastPoint.x, lastPoint.y);
		ctx.stroke();
	};

	let touchmove = (e) => {
		e.preventDefault();
		let touch = e.touches[0];
		if (drawing) {
			let currentPoint={ x: touch.clientX-container.offsetLeft, y: touch.clientY-container.offsetTop };
			ctx.beginPath();
			ctx.moveTo(lastPoint.x, lastPoint.y);
			ctx.lineTo(currentPoint.x, currentPoint.y);
			ctx.stroke();
			lastPoint = currentPoint;
		}
	};

	let touchend = () => {
		if(drawing===true) {
			//buttons disabled = false
			convertBtn.disabled = false;
			saveBtn.disabled = false;
			newBtn.disabled = false;
			newTopBtn.disabled = false;
			//add to history
			historyService.setHistory({ url: canvas.toDataURL(), top: container.offsetTop, left: container.offsetLeft }, {reset: false});
			drawing = false;
		}
	};
	
	canvas.addEventListener('mouseout', () => { drawing = false; }, false);
	
	canvas.addEventListener("mousedown",mousedown, {capture: false});
	canvas.addEventListener("mousemove",mousemove, {capture: false});
	canvas.addEventListener("mouseup",mouseup, {capture: false});
	
	canvas.addEventListener("touchstart",touchstart, {capture: false, passive: false});
	canvas.addEventListener("touchmove",touchmove, {capture: false, passive: false});
	canvas.addEventListener("touchend",touchend, {capture: false, passive: true});
};
