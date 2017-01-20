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
	//selects
	const lineWidthSelect = document.getElementById("lineWidthSelect");
	const strokeStyleSelect = document.getElementById("strokeStyleSelect");
	//size
	const size = document.getElementById("size");
	//mode image = false (=> mode canvas=true)
	let im = false;
	//Services
	let drawService = DrawService(container,ctx,convertBtn,saveBtn,newBtn);
	let resizeService = ResizeService(container,ctx,nwHandle,seHandle,dragHandle,lineWidthSelect,strokeStyleSelect,size);
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
		//container position left
		container.style.left = (window.innerWidth-container.offsetWidth)/2 + "px";
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
		//size
		size.innerHTML = ctx.canvas.width + "px X " + ctx.canvas.height + "px";
	};
	
	document.addEventListener('DOMContentLoaded',init, false);

	//resize
	const position = () => {
		container.style.left = (window.innerWidth-container.offsetWidth)/2 + "px";
		nwHandle.style.top = (container.offsetTop-nwHandle.offsetHeight) + "px";
		nwHandle.style.left = (container.offsetLeft-nwHandle.offsetWidth) + "px";
		seHandle.style.top = (container.offsetTop+container.offsetHeight) + "px";
		seHandle.style.left = (container.offsetLeft+container.offsetWidth) + "px";
		dragHandle.style.top = (container.offsetTop-dragHandle.offsetHeight) + "px";
		dragHandle.style.left = (container.offsetWidth-dragHandle.offsetWidth)/2 + container.offsetLeft + "px";
	};
	
	window.addEventListener('resize', position, false);
	
	//others
	window.addEventListener("load", function(e) {
		window. scrollTo(0, 0);
		if(e.currentTarget.innerWidth < 768) {
			flash(document.getElementById("flash"), "Draw !");
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
			document.body.className = "image";
			e.target.innerHTML = "To drawing";
			flash(document.getElementById("flash"), 'Long touch to save');
		} else {
			im = false;
			lineWidthSelect.disabled = false;
			strokeStyleSelect.disabled = false;
			document.body.className = "canvas";
			e.target.innerHTML = "To image";
		}
	};
	
	convertBtn.addEventListener('click', convert, false);
	
	const flash = (el,message) => {
		el.innerHTML = message;
		el.style.display = "block";
		el.style.left = (container.offsetWidth-el.offsetWidth)/2 + "px";
		window.setTimeout(() => { el.style.display = "none"; },1200);
	};

	//new
	const newPage = () => {
		im = false;
		convertBtn.disabled = true;
		saveBtn.disabled = true;
		newBtn.disabled = true;
		lineWidthSelect.disabled = false;
		strokeStyleSelect.disabled = false;
		document.body.className = "canvas";
		convertBtn.innerHTML = "To image";
		ctx.canvas.width = container.offsetWidth;
		ctx.canvas.height = container.offsetHeight;
		ctx.lineWidth = parseInt(document.getElementById("lineWidthSelect").value);
		let options = strokeStyleSelect.getElementsByTagName("option");
		for(let i=0; i<options.length; i++) {
			if(options[i].value==='#000') {
				options[i].selected = true;
			} else {
				options[i].selected = false;
			}
		}
		ctx.strokeStyle = document.getElementById("strokeStyleSelect").value;
		ctx.lineJoin = ctx.lineCap = 'round';
		ctx.fillStyle="#ffffff";
		ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
	};
	
	newBtn.addEventListener('click', newPage, false);
}
