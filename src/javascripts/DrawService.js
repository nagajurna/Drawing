function DrawService(container,ctx,convertBtn,saveBtn,newBtn) {
	
	let c = container, context = ctx, cBtn = convertBtn, sBtn = saveBtn, nBtn = newBtn;
	
	let canvas = context.canvas;
	
	let drawing = false;
	
	let lastPoint = {};
	
	let currentPoint = {};
		
	const mousedown = (e) => {
		e.preventDefault();
		if(e.which===1) {
			cBtn.disabled = false;
			sBtn.disabled = false;
			nBtn.disabled = false;
			drawing = true;
			lastPoint={ x: e.clientX-c.offsetLeft, y: e.clientY-c.offsetTop };
			context.beginPath();
			context.moveTo(lastPoint.x, lastPoint.y);
			context.lineTo(lastPoint.x, lastPoint.y);
			context.stroke();
		}
	};
	
	const mousemove = (e) => {
		e.preventDefault();
		if (drawing===true) {
			currentPoint={ x: e.clientX-c.offsetLeft, y: e.clientY-c.offsetTop };
			context.beginPath();
			context.moveTo(lastPoint.x, lastPoint.y);
			context.lineTo(currentPoint.x, currentPoint.y);
			context.stroke();
			lastPoint = currentPoint;
		}
	};
	
	const mouseup = () => {
		drawing = false;
	};
	
	const touchstart = (e) => {
		cBtn.disabled = false;
		sBtn.disabled = false;
		nBtn.disabled = false;
		let touch = e.touches[0];
		drawing = true;
		lastPoint={ x: touch.clientX-c.offsetLeft, y: touch.clientY-c.offsetTop };
	};

	const touchmove = (e) => {
		e.preventDefault();
		let touch = e.touches[0];
		if (drawing) {
			let currentPoint={ x: touch.clientX-c.offsetLeft, y: touch.clientY-c.offsetTop };
			context.beginPath();
			context.moveTo(lastPoint.x, lastPoint.y);
			context.lineTo(currentPoint.x, currentPoint.y);
			context.stroke();
			lastPoint = currentPoint;
		}
	};

	const touchend = (e) => {
		drawing = false;
	};
	
	canvas.addEventListener('mouseout', () => { drawing = false; }, false);
	canvas.addEventListener("mousedown",mousedown, {capture: false});
	canvas.addEventListener("mousemove",mousemove, {capture: false});
	canvas.addEventListener("mouseup",mouseup, {capture: false});
	canvas.addEventListener("touchstart",touchstart, {capture: false, passive: true});
	canvas.addEventListener("touchmove",touchmove, {capture: false, passive: false});
	canvas.addEventListener("touchend",touchend, {capture: false, passive: true});
};
