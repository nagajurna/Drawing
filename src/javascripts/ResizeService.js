function ResizeService(container,ctx,nwHandle,seHandle,dragHandle,lineWidthSelect,strokeStyleSelect,size,historyService) {

	let seResize = false;
	
	let nwResize = false;
	
	let mousedown = (e) => {
		e.preventDefault();
		if(e.target.id==='seHandle') {
			seResize = true;
		}
		if(e.currentTarget.id==='nwHandle') {
			nwResize = true;
		}
	};
	
	let mousemove = (e) => {
		if(seResize===true) {
			//maximum move
			if(e.clientY > window.innerHeight - 50 - 20 || e.clientX > window.innerWidth - 20) { return; }
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
			//display size
			size.innerHTML = Math.round(w) + "px X " + Math.round(h) + "px";
			
		} else if(nwResize===true) {
			//maximum move
			if(e.clientY < 20 || e.clientX < 20) { return; }
			e.preventDefault();
			e.target.style.cursor = "nwse-resize";
			//calculate position container + size container + position canvas
			let contLeft = e.clientX;
			let contTop = e.clientY;
			let contWidth = container.offsetWidth + (container.offsetLeft - contLeft);
			let contHeight =  container.offsetHeight + (container.offsetTop - contTop);
			let canvLeft = ctx.canvas.offsetLeft + (container.offsetLeft - contLeft);
			let canvTop = ctx.canvas.offsetTop + (container.offsetTop - contTop);
			//resize and position of container and canvas
			container.style.left = contLeft + "px";
			container.style.top = contTop + "px";
			container.style.width = contWidth + "px";
			container.style.height = contHeight + "px";
			ctx.canvas.style.left = canvLeft + "px";
			ctx.canvas.style.top = canvTop + "px";
			//position handles
			nwHandle.style.top = container.offsetTop-nwHandle.offsetHeight + "px";
			nwHandle.style.left = container.offsetLeft-nwHandle.offsetWidth + "px";
			seHandle.style.top = container.offsetTop + container.offsetHeight + "px";
			seHandle.style.left = container.offsetLeft + container.offsetWidth + "px";
			dragHandle.style.top = container.offsetTop-dragHandle.offsetHeight + "px";
			dragHandle.style.left = (container.offsetWidth-dragHandle.offsetWidth)/2 + container.offsetLeft + "px";
			//display size
			size.innerHTML = Math.round(contWidth) + "px X " + Math.round(contHeight) + "px";
		}
	};
	
	let mouseup = (e) => {
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
				//add to history
				historyService.setHistory({ url: ctx.canvas.toDataURL(), top: container.offsetTop, left: container.offsetLeft }, {reset: false});
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
				//add to history
				historyService.setHistory({ url: ctx.canvas.toDataURL(), top: container.offsetTop, left: container.offsetLeft }, {reset: false});
			}
			img.src = data;
			ctx.lineWidth = lineWidthSelect.value;
			ctx.strokeStyle = strokeStyleSelect.value;
			ctx.lineJoin = ctx.lineCap = 'round';		
		}
	};
	
	let touchstart = (e) => {
		let touch = e.touches[0];
		if(touch.target.id==='seHandle') {
			seResize = true;
		}
		if(touch.target.id==='nwHandle') {
			nwResize = true;
		}
	};
	
	let touchmove = (e) => {
		let touch = e.touches[0];
		if(seResize===true) {
			//maximum move
			if(touch.clientY > window.innerHeight - 50 - 20 || touch.clientX > window.innerWidth - 20) { return; }
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
			//display size
			size.innerHTML = Math.round(w) + "px X " + Math.round(h) + "px";
			
		} else if(nwResize===true) {
			//maximum move
			if(touch.clientY < 20 || touch.clientX < 20) { return; }
			e.preventDefault();
			//calculate position container + size container + position canvas
			let contLeft = touch.clientX;
			let contTop = touch.clientY;
			let contWidth = container.offsetWidth + (container.offsetLeft - contLeft);
			let contHeight =  container.offsetHeight + (container.offsetTop - contTop);
			let canvLeft = ctx.canvas.offsetLeft + (container.offsetLeft - contLeft);
			let canvTop = ctx.canvas.offsetTop + (container.offsetTop - contTop);
			//resize and position of container and canvas
			container.style.left = contLeft + "px";
			container.style.top = contTop + "px";
			container.style.width = contWidth + "px";
			container.style.height = contHeight + "px";
			ctx.canvas.style.left = canvLeft + "px";
			ctx.canvas.style.top = canvTop + "px";
			//position handles
			nwHandle.style.top = container.offsetTop-nwHandle.offsetHeight + "px";
			nwHandle.style.left = container.offsetLeft-nwHandle.offsetWidth + "px";
			seHandle.style.top = container.offsetTop + container.offsetHeight + "px";
			seHandle.style.left = container.offsetLeft + container.offsetWidth + "px";
			dragHandle.style.top = container.offsetTop-dragHandle.offsetHeight + "px";
			dragHandle.style.left = (container.offsetWidth-dragHandle.offsetWidth)/2 + container.offsetLeft + "px";
			//display size
			size.innerHTML = Math.round(w) + "px X " + Math.round(h) + "px";
		}
	};
	
	let touchend = (e) => {
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
				//add to history
				historyService.setHistory({ url: ctx.canvas.toDataURL(), top: container.offsetTop, left: container.offsetLeft }, {reset: false});
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
				//add to history
				historyService.setHistory({ url: ctx.canvas.toDataURL(), top: container.offsetTop, left: container.offsetLeft }, {reset: false});
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
