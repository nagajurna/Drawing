function ResizeService(container,ctx,nwHandle,seHandle,dragHandle,lineWidthSelect,strokeStyleSelect,size) {

	let seResize = false;
	
	let nwResize = false;
	
	const mousedown = (e) => {
		e.preventDefault();
		if(e.target.id==='seHandle') {
			seResize = true;
		}
		if(e.target.id==='nwHandle') {
			nwResize = true;
		}
	};
	
	const mousemove = (e) => {
		if(seResize===true) {
			e.preventDefault();
			e.target.style.cursor = "nwse-resize";
			//resize container
			let h = container.offsetHeight - (container.offsetHeight + container.offsetTop - e.clientY);
			let w = container.offsetWidth -(container.offsetWidth + container.offsetLeft - e.clientX);
			container.style.height = h + "px";
			container.style.width = w + "px";
			//position handles
			nwHandle.style.top = container.offsetTop-nwHandle.offsetHeight + "px";
			nwHandle.style.left = container.offsetLeft-nwHandle.offsetWidth + "px";
			seHandle.style.top = container.offsetTop + container.offsetHeight + "px";
			seHandle.style.left = container.offsetLeft + container.offsetWidth + "px";
			dragHandle.style.top = container.offsetTop-dragHandle.offsetHeight + "px";
			dragHandle.style.left = (container.offsetWidth-dragHandle.offsetWidth)/2 + container.offsetLeft + "px";
			//size
			size.innerHTML = w + "px X " + h + "px";
			
		} else if(nwResize===true) {
			e.preventDefault();
			e.target.style.cursor = "nwse-resize";
			let lm = container.offsetLeft - (container.offsetLeft - e.clientX);
			let tm = container.offsetTop - (container.offsetTop - e.clientY);
			let w = container.offsetWidth + (container.offsetLeft - lm);
			let h =  container.offsetHeight + (container.offsetTop - tm);
			let lp = canvas.offsetLeft + (container.offsetLeft - lm);
			let tp = canvas.offsetTop + (container.offsetTop - tm);
			//resize and position of container and canvas
			container.style.left = lm + "px";
			container.style.top = tm + "px";
			container.style.width = w + "px";
			container.style.height = h + "px";
			ctx.canvas.style.left = lp + "px";
			ctx.canvas.style.top = tp + "px";
			//position handles
			nwHandle.style.top = container.offsetTop-nwHandle.offsetHeight + "px";
			nwHandle.style.left = container.offsetLeft-nwHandle.offsetWidth + "px";
			seHandle.style.top = container.offsetTop + container.offsetHeight + "px";
			seHandle.style.left = container.offsetLeft + container.offsetWidth + "px";
			dragHandle.style.top = container.offsetTop-dragHandle.offsetHeight + "px";
			dragHandle.style.left = (container.offsetWidth-dragHandle.offsetWidth)/2 + container.offsetLeft + "px";
			//size
			size.innerHTML = w + "px X " + h + "px";
		}
	};
	
	const mouseup = (e) => {
		e.preventDefault();
		if(seResize===true) {
			seResize = false;
			ctx.canvas.style.cursor = "pointer";
			document.body.style.cursor = "default";
			//resize canvas and redraw
			let data = ctx.canvas.toDataURL();
			ctx.canvas.width = container.offsetWidth;
			ctx.canvas.height = container.offsetHeight;
			ctx.fillStyle="#ffffff";
			ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
			var img = new Image();
			img.onload = function() {
				ctx.drawImage(img,0,0, ctx.canvas.width, ctx.canvas.height,0,0,ctx.canvas.width,ctx.canvas.height);
			}
			img.src = data;
			ctx.lineWidth = lineWidthSelect.value;
			ctx.strokeStyle = strokeStyleSelect.value;
			ctx.lineJoin = ctx.lineCap = 'round';
		} else if(nwResize===true) {
			nwResize = false;
			ctx.canvas.style.cursor = "pointer";
			document.body.style.cursor = "default";
			//resize canvas and redraw
			let data = ctx.canvas.toDataURL();
			ctx.canvas.width = container.offsetWidth;
			ctx.canvas.height = container.offsetHeight;
			ctx.canvas.style.left = "0px";
			ctx.canvas.style.top = "0px";
			ctx.fillStyle="#ffffff";
			ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
			let img = new Image();
			img.onload = function() {
				ctx.drawImage(img,img.width-ctx.canvas.width,img.height-ctx.canvas.height, ctx.canvas.width, ctx.canvas.height,0,0,ctx.canvas.width,ctx.canvas.height);
			}
			img.src = data;
			ctx.lineWidth = lineWidthSelect.value;
			ctx.strokeStyle = strokeStyleSelect.value;
			ctx.lineJoin = ctx.lineCap = 'round';
		}
	};
	
	const touchstart = (e) => {
		let touch = e.touches[0];
		if(touch.target.id==='seHandle') {
			seResize = true;
		}
		if(touch.target.id==='nwHandle') {
			nwResize = true;
		}
	};
	
	const touchmove = (e) => {
		let touch = e.touches[0];
		if(seResize===true) {
			e.preventDefault();
			//resize container
			let h = container.offsetHeight - (container.offsetHeight + container.offsetTop - touch.clientY);
			let w = container.offsetWidth -(container.offsetWidth + container.offsetLeft - touch.clientX);
			container.style.height = h + "px";
			container.style.width = w + "px";
			//position handles
			nwHandle.style.top = container.offsetTop-nwHandle.offsetHeight + "px";
			nwHandle.style.left = container.offsetLeft-nwHandle.offsetWidth + "px";
			seHandle.style.top = container.offsetTop + container.offsetHeight + "px";
			seHandle.style.left = container.offsetLeft + container.offsetWidth + "px";
			dragHandle.style.top = container.offsetTop-dragHandle.offsetHeight + "px";
			dragHandle.style.left = (container.offsetWidth-dragHandle.offsetWidth)/2 + container.offsetLeft + "px";
			
		} else if(nwResize===true) {
			e.preventDefault();
			let lm = container.offsetLeft - (container.offsetLeft - touch.clientX);
			let tm = container.offsetTop - (container.offsetTop - touch.clientY);
			let w = container.offsetWidth + (container.offsetLeft - lm);
			let h =  container.offsetHeight + (container.offsetTop - tm);
			let lp = canvas.offsetLeft + (container.offsetLeft - lm);
			let tp = canvas.offsetTop + (container.offsetTop - tm);
			//resize and position of container and canvas
			container.style.left = lm + "px";
			container.style.top = tm + "px";
			container.style.width = w + "px";
			container.style.height = h + "px";
			ctx.canvas.style.left = lp + "px";
			ctx.canvas.style.top = tp + "px";
			//position handles
			nwHandle.style.top = container.offsetTop-nwHandle.offsetHeight + "px";
			nwHandle.style.left = container.offsetLeft-nwHandle.offsetWidth + "px";
			seHandle.style.top = container.offsetTop + container.offsetHeight + "px";
			seHandle.style.left = container.offsetLeft + container.offsetWidth + "px";
			dragHandle.style.top = container.offsetTop-dragHandle.offsetHeight + "px";
			dragHandle.style.left = (container.offsetWidth-dragHandle.offsetWidth)/2 + container.offsetLeft + "px";
		}
	};
	
	const touchend = (e) => {
		if(seResize===true) {
			seResize = false;
			//resize canvas and redraw
			let data = ctx.canvas.toDataURL();
			ctx.canvas.width = container.offsetWidth;
			ctx.canvas.height = container.offsetHeight;
			ctx.fillStyle="#ffffff";
			ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
			ctx.lineWidth = lineWidthSelect.value;
			ctx.strokeStyle = strokeStyleSelect.value;
			ctx.lineJoin = ctx.lineCap = 'round';
			let img = new Image();
			img.onload = function() {
				ctx.drawImage(img,0,0, ctx.canvas.width, ctx.canvas.height,0,0,ctx.canvas.width,ctx.canvas.height);
			}
			img.src = data;
		} else if(nwResize===true) {
			nwResize = false;
			//resize canvas and redraw
			let data = ctx.canvas.toDataURL();
			ctx.canvas.width = container.offsetWidth;
			ctx.canvas.height = container.offsetHeight;
			ctx.canvas.style.left = "0px";
			ctx.canvas.style.top = "0px";
			ctx.fillStyle="#ffffff";
			ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
			ctx.lineWidth = lineWidthSelect.value;
			ctx.strokeStyle = strokeStyleSelect.value;
			ctx.lineJoin = ctx.lineCap = 'round';
			let img = new Image();
			img.onload = function() {
				ctx.drawImage(img,img.width-ctx.canvas.width,img.height-ctx.canvas.height, ctx.canvas.width, ctx.canvas.height,0,0,ctx.canvas.width,ctx.canvas.height);
			}
			img.src = data;
		}
	};
	
	
	seHandle.addEventListener('mousedown', mousedown, {capture: false});
	nwHandle.addEventListener('mousedown', mousedown, {capture: false});
	document.addEventListener('mousemove', mousemove, {capture: false});
	document.addEventListener('mouseup', mouseup, {capture: false});
	seHandle.addEventListener('touchstart', touchstart, {capture: false});
	nwHandle.addEventListener('touchstart', touchstart, {capture: false});
	document.addEventListener('touchmove', touchmove, {capture: false, passive: false});
	document.addEventListener('touchend', touchend, {capture: false});
};
