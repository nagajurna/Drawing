function DrawService(container,ctx,convertBtn,saveBtn,newBtn,historyService,previousBtn) {
	
	let canvas = ctx.canvas;
	
	let drawing = false;
	
	let lastPoint = {};
	
	let currentPoint = {};
		
	const mousedown = (e) => {
		e.preventDefault();
		if(e.which===1) {
			convertBtn.disabled = false;
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
	
	const mousemove = (e) => {
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
	
	const mouseup = () => {
		if(drawing===true) {
			historyService.setHistory({ url: canvas.toDataURL(), top: container.offsetTop, left: container.offsetLeft }, {reset: false});
		}
		drawing = false;
	};
	
	const touchstart = (e) => {
		convertBtn.disabled = false;
		saveBtn.disabled = false;
		newBtn.disabled = false;
		let touch = e.touches[0];
		drawing = true;
		lastPoint={ x: touch.clientX-container.offsetLeft, y: touch.clientY-container.offsetTop };
	};

	const touchmove = (e) => {
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

	const touchend = (e) => {
		drawing = false;
		historyService.setHistory({ url: canvas.toDataURL(), top: container.offsetTop, left: container.offsetLeft }, {reset: false});
	};
	
	canvas.addEventListener('mouseout', () => { drawing = false; }, false);
	canvas.addEventListener("mousedown",mousedown, {capture: false});
	canvas.addEventListener("mousemove",mousemove, {capture: false});
	canvas.addEventListener("mouseup",mouseup, {capture: false});
	canvas.addEventListener("touchstart",touchstart, {capture: false, passive: true});
	canvas.addEventListener("touchmove",touchmove, {capture: false, passive: false});
	canvas.addEventListener("touchend",touchend, {capture: false, passive: true});
};
