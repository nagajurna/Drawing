function ResizeService(container,ctx,nwHandle,seHandle,dragHandle) {

	var container = container;
	
	var ctx = ctx;
	
	var lineWidth;
	
	var strokeStyle;
	
	var nwHandle = nwHandle;
	
	var seHandle = seHandle;
	
	var dragHandle = dragHandle;
	
	var seResize = false;
	
	var nwResize = false;
	
	this.setLineWidth = function(lw) {
		lineWidth = lw;
	};
	
	this.getLineWidth = function() {
		return lineWidth;
	};
	
	this.setStrokeStyle = function(ss) {
		strokeStyle = ss;
	};
	
	this.getStrokeStyle = function() {
		return strokeStyle;
	};
	
	this.setCtx = function(context) {
		ctx = context;
	};
	
	this.getContext = function() {
		return ctx;
	};
	
	this.mousedown = function(e) {
		e.preventDefault();
		if(e.target.id==='seHandle') {
			seResize = true;
		}
		if(e.target.id==='nwHandle') {
			nwResize = true;
		}
	};
	
	this.mousemove = function(e) {
		if(seResize===true) {
			e.preventDefault();
			e.target.style.cursor = "nwse-resize";
			//resize container
			var h = container.offsetHeight - (container.offsetHeight + container.offsetTop - e.clientY);
			var w = container.offsetWidth -(container.offsetWidth + container.offsetLeft - e.clientX);
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
			e.target.style.cursor = "nwse-resize";
			var lm = container.offsetLeft - (container.offsetLeft - e.clientX);
			var tm = container.offsetTop - (container.offsetTop - e.clientY);
			var w = container.offsetWidth + (container.offsetLeft - lm);
			var h =  container.offsetHeight + (container.offsetTop - tm);
			var lp = canvas.offsetLeft + (container.offsetLeft - lm);
			var tp = canvas.offsetTop + (container.offsetTop - tm);
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
	
	this.mouseup = function(e) {
		e.preventDefault();
		if(seResize===true) {
			seResize = false;
			ctx.canvas.style.cursor = "pointer";
			document.body.style.cursor = "default";
			//resize canvas and redraw
			//var ctx = canvas.getContext('2d');
			var data = ctx.canvas.toDataURL();
			ctx.canvas.width = container.offsetWidth;
			ctx.canvas.height = container.offsetHeight;
			ctx.fillStyle="#ffffff";
			ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
			ctx.lineWidth = this.getLineWidth();
			ctx.strokeStyle = this.getStrokeStyle();
			ctx.lineJoin = ctx.lineCap = 'round';
			var img = new Image();
			img.onload = function() {
				ctx.drawImage(img,0,0, ctx.canvas.width, ctx.canvas.height,0,0,ctx.canvas.width,ctx.canvas.height);
			}
			img.src = data;
		} else if(nwResize===true) {
			nwResize = false;
			ctx.canvas.style.cursor = "pointer";
			document.body.style.cursor = "default";
			//resize canvas and redraw
			//var ctx = canvas.getContext('2d');
			var data = ctx.canvas.toDataURL();
			ctx.canvas.width = container.offsetWidth;
			ctx.canvas.height = container.offsetHeight;
			ctx.canvas.style.left = "0px";
			ctx.canvas.style.top = "0px";
			ctx.fillStyle="#ffffff";
			ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
			ctx.lineWidth = this.getLineWidth();
			ctx.strokeStyle = this.getStrokeStyle();
			ctx.lineJoin = ctx.lineCap = 'round';
			var img = new Image();
			img.onload = function() {
				ctx.drawImage(img,img.width-ctx.canvas.width,img.height-ctx.canvas.height, ctx.canvas.width, ctx.canvas.height,0,0,ctx.canvas.width,ctx.canvas.height);
			}
			img.src = data;
		}
	}.bind(this);
	
	
	this.touchstart = function(e) {
		var touch = e.touches[0];
		if(touch.target.id==='seHandle') {
			seResize = true;
		}
		if(touch.target.id==='nwHandle') {
			nwResize = true;
		}
	};
	
	this.touchmove = function(e) {
		var touch = e.touches[0];
		if(seResize===true) {
			e.preventDefault();
			//touch.target.style.cursor = "nwse-resize";
			//resize container
			var h = container.offsetHeight - (container.offsetHeight + container.offsetTop - touch.clientY);
			var w = container.offsetWidth -(container.offsetWidth + container.offsetLeft - touch.clientX);
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
			//touch.target.style.cursor = "nwse-resize";
			var lm = container.offsetLeft - (container.offsetLeft - touch.clientX);
			var tm = container.offsetTop - (container.offsetTop - touch.clientY);
			var w = container.offsetWidth + (container.offsetLeft - lm);
			var h =  container.offsetHeight + (container.offsetTop - tm);
			var lp = canvas.offsetLeft + (container.offsetLeft - lm);
			var tp = canvas.offsetTop + (container.offsetTop - tm);
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
	
	this.touchend = function(e) {
		//var touch = e.touches[0];
		//touch.preventDefault();
		if(seResize===true) {
			seResize = false;
			//ctx.canvas.style.cursor = "pointer";
			//document.body.style.cursor = "default";
			//resize canvas and redraw
			//var ctx = canvas.getContext('2d');
			var data = ctx.canvas.toDataURL();
			ctx.canvas.width = container.offsetWidth;
			ctx.canvas.height = container.offsetHeight;
			ctx.fillStyle="#ffffff";
			ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
			ctx.lineWidth = this.getLineWidth();
			ctx.strokeStyle = this.getStrokeStyle();
			ctx.lineJoin = ctx.lineCap = 'round';
			var img = new Image();
			img.onload = function() {
				ctx.drawImage(img,0,0, ctx.canvas.width, ctx.canvas.height,0,0,ctx.canvas.width,ctx.canvas.height);
			}
			img.src = data;
		} else if(nwResize===true) {
			nwResize = false;
			//ctx.canvas.style.cursor = "pointer";
			//document.body.style.cursor = "default";
			//resize canvas and redraw
			//var ctx = canvas.getContext('2d');
			var data = ctx.canvas.toDataURL();
			ctx.canvas.width = container.offsetWidth;
			ctx.canvas.height = container.offsetHeight;
			ctx.canvas.style.left = "0px";
			ctx.canvas.style.top = "0px";
			ctx.fillStyle="#ffffff";
			ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
			ctx.lineWidth = this.getLineWidth();
			ctx.strokeStyle = this.getStrokeStyle();
			ctx.lineJoin = ctx.lineCap = 'round';
			var img = new Image();
			img.onload = function() {
				ctx.drawImage(img,img.width-ctx.canvas.width,img.height-ctx.canvas.height, ctx.canvas.width, ctx.canvas.height,0,0,ctx.canvas.width,ctx.canvas.height);
			}
			img.src = data;
		}
	}.bind(this);
	
	
	seHandle.addEventListener('mousedown', this.mousedown, {capture: false});
	nwHandle.addEventListener('mousedown', this.mousedown, {capture: false});
	document.addEventListener('mousemove', this.mousemove, {capture: false});
	document.addEventListener('mouseup', this.mouseup, {capture: false});
	seHandle.addEventListener('touchstart', this.touchstart, {capture: false});
	nwHandle.addEventListener('touchstart', this.touchstart, {capture: false});
	document.addEventListener('touchmove', this.touchmove, {capture: false, passive: false});
	document.addEventListener('touchend', this.touchend, {capture: false});

	
};
