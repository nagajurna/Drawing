function Drawing() {
	//container
	const container = document.getElementById("container");
	//image
	const image = document.getElementById("image");
	//canvas
	const canvas = document.getElementById('canvas');
	const ctx = canvas.getContext('2d');
	//handles
	const nwHandle = document.getElementById("nwHandle");
	const seHandle = document.getElementById("seHandle");
	const dragHandle = document.getElementById("dragHandle");
	//buttons
	const convertBtn = document.getElementById("convert");
	const saveBtn = document.getElementById("save");
	const newBtn = document.getElementById("new");
	const newTopBtn = document.getElementById("new-top");
	const undoBtn = document.getElementById("undo");
	const redoBtn = document.getElementById("redo");
	//selects
	const lineWidthSelect = document.getElementById("lineWidthSelect");
	const strokeStyleSelect = document.getElementById("strokeStyleSelect");
	//size
	const size = document.getElementById("size");
	//mode image = false (=> mode canvas=true)
	let im = false;
	//Services
	let historyService = new HistoryService(undoBtn,redoBtn);
	let drawService = DrawService(container,ctx,convertBtn,saveBtn,newBtn,newTopBtn,historyService);
	let resizeService = ResizeService(container,ctx,nwHandle,seHandle,dragHandle,lineWidthSelect,strokeStyleSelect,size,historyService);
	let dragAndDropService = DragAndDropService(container,nwHandle,seHandle,dragHandle);
	
	//load
	const init = () => {
		//canvas
		ctx.canvas.width = container.offsetWidth;
		ctx.canvas.height = container.offsetHeight;
		ctx.lineWidth = parseInt(lineWidthSelect.value);
		ctx.strokeStyle = strokeStyleSelect.value;
		ctx.lineJoin = ctx.lineCap = 'round';
		ctx.fillStyle="#ffffff";
		ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
		//container left position
		container.style.left = (window.innerWidth-container.offsetWidth)/2 + "px";
		//history
		historyService.setHistory({ url: ctx.canvas.toDataURL(), top: container.offsetTop, left: container.offsetLeft }, {reset: true});
		//handles positions
		nwHandle.style.top = (container.offsetTop-nwHandle.offsetHeight) + "px";
		nwHandle.style.left = (container.offsetLeft-nwHandle.offsetWidth) + "px";
		seHandle.style.top = (container.offsetTop+container.offsetHeight) + "px";
		seHandle.style.left = (container.offsetLeft+container.offsetWidth) + "px";
		dragHandle.style.top = (container.offsetTop-dragHandle.offsetHeight) + "px";
		dragHandle.style.left = (container.offsetWidth-dragHandle.offsetWidth)/2 + container.offsetLeft + "px";
		//buttons disabled
		convertBtn.disabled = true;
		saveBtn.disabled = true;
		newBtn.disabled = true;
		newTopBtn.disabled = true;
		//size
		size.innerHTML = ctx.canvas.width + "px X " + ctx.canvas.height + "px";
	};
	
	document.addEventListener('DOMContentLoaded',init, false);

	//resize
	const handlesPosition = () => {
		nwHandle.style.top = (container.offsetTop-nwHandle.offsetHeight) + "px";
		nwHandle.style.left = (container.offsetLeft-nwHandle.offsetWidth) + "px";
		seHandle.style.top = (container.offsetTop+container.offsetHeight) + "px";
		seHandle.style.left = (container.offsetLeft+container.offsetWidth) + "px";
		dragHandle.style.top = (container.offsetTop-dragHandle.offsetHeight) + "px";
		dragHandle.style.left = (container.offsetWidth-dragHandle.offsetWidth)/2 + container.offsetLeft + "px";
	};
	
	window.addEventListener('resize', function() {
		container.style.left = (window.innerWidth-container.offsetWidth)/2 + "px";
		handlesPosition();
	}, false);
	
	//others
	window.addEventListener("load", function(e) {
		window. scrollTo(0, 0);
		if(e.currentTarget.innerWidth < 768) {
			flash(document.getElementById("flash"), "Draw !",1500);
		} 
		
	}, false);
	
	document.addEventListener("touchmove", function(e) { e.preventDefault() }, {passive: false});

	//change line width
	const setLineWidth = () => {
		ctx.lineWidth = parseInt(lineWidthSelect.value);
	};
	
	lineWidthSelect.addEventListener('change', setLineWidth, {capture: false});

	//change line width
	const setStrokeStyle = () => {
		ctx.strokeStyle = strokeStyleSelect.value;
	};
	
	strokeStyleSelect.addEventListener('change', setStrokeStyle, {capture: false});

	//save
	const save = () => {
		im = false;
		let data = canvas.toDataURL().replace(/^data:image\/\w+;base64,/, "");
		let dataInput = document.createElement("input");
		dataInput.setAttribute("name", 'data');
		dataInput.setAttribute("value", data);
		dataInput.setAttribute("type", "hidden");
		
		let myForm = document.createElement("form");
		myForm.method = 'post';
		myForm.action = '/save';
		myForm.appendChild(dataInput);
		
		document.body.appendChild(myForm);
		myForm.submit();
		document.body.removeChild(myForm);
	};
	
	saveBtn.addEventListener('click', save, false);
	
	//convert
	const convert = (e) => {
		if(im===false) {
			im = true;	
			image.src = ctx.canvas.toDataURL('image/png');
			lineWidthSelect.disabled = true;
			strokeStyleSelect.disabled = true;
			redoBtn.disabled = true;
			undoBtn.disabled = true;
			document.body.className = "image";
			e.target.innerHTML = "Convert to drawing";
			flash(document.getElementById("flash"), 'Long touch to save',1200);
		} else {
			im = false;
			lineWidthSelect.disabled = false;
			strokeStyleSelect.disabled = false;
			//history buttons
			let current = historyService.getCurrent();
			let history = historyService.getHistory();
			if(current===0) {
				redoBtn.disabled = false;
			} else if(current===history.length-1) {
				undoBtn.disabled = false;
			} else {
				redoBtn.disabled = false;
				undoBtn.disabled = false;
			}
			document.body.className = "canvas";
			e.target.innerHTML = "Convert to image";
		}
	};
	
	convertBtn.addEventListener('click', convert, false);
	
	const flash = (el,message,ms) => {
		el.innerHTML = message;
		el.style.display = "block";
		el.style.left = (container.offsetWidth-el.offsetWidth)/2 + "px";
		window.setTimeout(() => { el.style.display = "none"; },ms);
	};

	//new
	const newPage = () => {
		im = false;
		convertBtn.disabled = true;
		saveBtn.disabled = true;
		newBtn.disabled = true;
		newTopBtn.disabled = true;
		lineWidthSelect.disabled = false;
		strokeStyleSelect.disabled = false;
		undoBtn.disabled = true;
		document.body.className = "canvas";
		convertBtn.innerHTML = "Convert to image";
		ctx.canvas.width = container.offsetWidth;
		ctx.canvas.height = container.offsetHeight;
		ctx.lineWidth = parseInt(document.getElementById("lineWidthSelect").value);
		if(strokeStyleSelect.value==="#fff") {
			let options = strokeStyleSelect.getElementsByTagName("option");
			for(let i=0; i<options.length; i++) {
				if(options[i].value==='#000') {
					options[i].selected = true;
				} else {
					options[i].selected = false;
				}
			}
		}
		ctx.strokeStyle = document.getElementById("strokeStyleSelect").value;
		ctx.lineJoin = ctx.lineCap = 'round';
		ctx.fillStyle="#ffffff";
		ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
		historyService.setHistory({ url: ctx.canvas.toDataURL(), top: container.offsetTop, left: container.offsetLeft }, {reset: true});
	};
	
	newBtn.addEventListener('click', newPage, false);
	newTopBtn.addEventListener('click', newPage, false);
	
	//history backward
	const historyBackward = (e) => {
		let current = historyService.getCurrent();
		historyService.setCurrent(current-1);
		
		var img = new Image();
		var history = historyService.getHistory();
		let state = history[historyService.getCurrent()];
		img.onload = function() {
			container.style.width = img.width + "px";
			container.style.height = img.height + "px";
			container.style.top = state.top + "px";
			container.style.left = state.left + "px";
			ctx.canvas.width = img.width;
			ctx.canvas.height = img.height;
			ctx.lineWidth = parseInt(document.getElementById("lineWidthSelect").value);
			ctx.strokeStyle = document.getElementById("strokeStyleSelect").value;
			ctx.lineJoin = ctx.lineCap = 'round';
			ctx.drawImage(img,0,0);
			handlesPosition();
			//size
			size.innerHTML = img.width + "px X " + img.height + "px";
		}
		img.src = state.url;
		
		if(historyService.getCurrent()===0) {
			e.target.disabled = true;
		}
		redoBtn.disabled = false;
	}
	
	//history forward
	const historyForward = (e) => {
		let current = historyService.getCurrent();
		historyService.setCurrent(current+1);
		
		var img = new Image();
		var history = historyService.getHistory();
		let state = history[historyService.getCurrent()];
		img.onload = function() {
			container.style.width = img.width + "px";
			container.style.height = img.height + "px";
			container.style.top = state.top + "px";
			container.style.left = state.left + "px";
			ctx.canvas.width = img.width;
			ctx.canvas.height = img.height;
			ctx.lineWidth = parseInt(document.getElementById("lineWidthSelect").value);
			ctx.strokeStyle = document.getElementById("strokeStyleSelect").value;
			ctx.lineJoin = ctx.lineCap = 'round';
			ctx.drawImage(img,0,0);
			handlesPosition();
			//size
			size.innerHTML = img.width + "px X " + img.height + "px";
		}
		img.src = state.url;
		
		if(historyService.getCurrent()===history.length-1) {
			e.target.disabled = true;
		}
		undoBtn.disabled = false;
	}
	
	undoBtn.addEventListener('click', historyBackward, false);
	redoBtn.addEventListener('click', historyForward, false);
}
