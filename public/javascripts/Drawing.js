function Drawing() {
	//private
	//container
	var container = document.getElementById("container");
	//image
	var image = document.getElementById("image");
	//canvas
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	//handles
	var nwHandle = document.getElementById("nwHandle");
	var seHandle = document.getElementById("seHandle");
	var dragHandle = document.getElementById("dragHandle");
	//buttons
	var convertBtn = document.getElementById("convert");
	var saveBtn = document.getElementById("save");
	var newBtn = document.getElementById("new");
	//selects
	var lineWidthSelect = document.getElementById("lineWidthSelect");
	var strokeStyleSelect = document.getElementById("strokeStyleSelect");
	//mode image = false (=> mode canvas=true)
	var im = false;
	//Services
	//drawService
	var drawService = new DrawService(container,ctx,convertBtn,saveBtn,newBtn);
	//resizeService
	var resizeService = new ResizeService(container,ctx,nwHandle,seHandle,dragHandle);
	//dragAndDropService
	var dragAndDropService = new DragAndDropService(container,nwHandle,seHandle,dragHandle);
	
	this.init = function() {
		//canvas
		ctx.canvas.width = container.offsetWidth;
		ctx.canvas.height = container.offsetHeight;
		ctx.lineWidth = parseInt(document.getElementById("lineWidthSelect").value);
		resizeService.setLineWidth(ctx.lineWidth);
		ctx.strokeStyle = document.getElementById("strokeStyleSelect").value;
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
	};

	//load
	document.onload = this.init();

	//resize
	this.resize = function() {
		container.style.left = (window.innerWidth-container.offsetWidth)/2 + "px";
		nwHandle.style.top = (container.offsetTop-nwHandle.offsetHeight) + "px";
		nwHandle.style.left = (container.offsetLeft-nwHandle.offsetWidth) + "px";
		seHandle.style.top = (container.offsetTop+container.offsetHeight) + "px";
		seHandle.style.left = (container.offsetLeft+container.offsetWidth) + "px";
		dragHandle.style.top = (container.offsetTop-dragHandle.offsetHeight) + "px";
		dragHandle.style.left = (container.offsetWidth-dragHandle.offsetWidth)/2 + container.offsetLeft + "px";
	};
	window.addEventListener('resize', this.resize, false);

	//others
	window.addEventListener("load", function() { window. scrollTo(0, 0); });
	document.addEventListener("touchmove", function(e) { e.preventDefault() }, {passive: false});

	//change line width
	this.setLineWidth = function(e) {
		ctx.lineWidth = parseInt(document.getElementById("lineWidthSelect").value);
		resizeService.setLineWidth(ctx.lineWidth);
	};

	lineWidthSelect.addEventListener('change', this.setLineWidth, {capture: false});

	//change line width
	this.setStrokeStyle = function(e) {
		ctx.strokeStyle = document.getElementById("strokeStyleSelect").value;
		resizeService.setStrokeStyle(ctx.strokeStyle);
	};

	strokeStyleSelect.addEventListener('change', this.setStrokeStyle, {capture: false});

	this.setFileSelect = function(e) {
		if(e.target.files[0].size > 2000000) {
			console.log("too large");
			return;
		}
		if(e.target.files[0].type==="image/png"||e.target.files[0].type==="image/jpeg"||e.target.files[0].type==="image/bmp") {
			var tmppath = URL.createObjectURL(e.target.files[0]);
			console.log(e.target.files[0]);
			var img = new Image();
			img.onload = function() {
				console.log(img.width);
				container.style.width = img.width + "px";
				container.style.height = img.height + "px";
				init();
				ctx.canvas.width = container.offsetWidth;
				ctx.canvas.height = container.offsetHeight;
				ctx.lineWidth = parseInt(document.getElementById("lineWidthSelect").value);
				ctx.lineJoin = ctx.lineCap = 'round';
				ctx.drawImage(img, 0, 0);
			}
			img.src = tmppath;
		} else {
			console.log("ko");
		}
		
	};

//document.getElementById("fileSelect").addEventListener('change', setFileSelect, {capture: false});
//save
//var saveBtn = document.getElementById("save");
//saveBtn.addEventListener('click', function() {
	//var img = canvas.toDataURL().replace(/^data:image\/\w+;base64,/, "");
	//var data = { data: img };
	//var ajax=new XMLHttpRequest();
	//ajax.onreadystatechange = function() {
		//if(this.readyState===4 && this.status===200)
		//{
			//var url = "/download?src=" + this.responseText;
			//var element = document.createElement('a');
			//element.setAttribute('href', url);
			//element.setAttribute('download', this.responseText);
			//element.style.display = "none";
			//document.body.appendChild(element);
			//element.click();
			//document.body.removeChild(element);
			////window.location.assign(url);
		//}
	//}
	//ajax.open("POST",'/save',true);
	//ajax.setRequestHeader("Content-type", "application/json");
	//ajax.send(JSON.stringify(data));
	
//}, false)

	//save
	this.save = function() {
		var data = canvas.toDataURL().replace(/^data:image\/\w+;base64,/, "");
		var dataInput = document.createElement("input");
		dataInput.setAttribute("name", 'data');
		dataInput.setAttribute("value", data);
		dataInput.setAttribute("type", "hidden");
		
		var myForm = document.createElement("form");
		myForm.method = 'post';
		myForm.action = '/save';
		myForm.appendChild(dataInput);
		
		document.body.appendChild(myForm);
		myForm.submit();
		document.body.removeChild(myForm);
	}

	saveBtn.addEventListener('click', this.save, false)

	//convert
	this.convert = function(e) {
		if(im===false) {	
			image.src = ctx.canvas.toDataURL('image/png');
			document.body.className = "image";
			e.target.innerHTML = "To drawing";
			im = true;
		} else {
			document.body.className = "canvas";
			e.target.innerHTML = "To image";
			im = false;
		}
	}

	convertBtn.addEventListener('click', this.convert, false)

	//new
	this.newPage = function() {
		convertBtn.disabled = true;
		saveBtn.disabled = true;
		newBtn.disabled = true;
		document.body.className = "canvas";
		convertBtn.innerHTML = "To image";
		ctx.canvas.width = container.offsetWidth;
		ctx.canvas.height = container.offsetHeight;
		ctx.lineWidth = parseInt(document.getElementById("lineWidthSelect").value);
		resizeService.setLineWidth(ctx.lineWidth);
		var options = strokeStyleSelect.getElementsByTagName("option");
		for(var i=0; i<options.length; i++) {
			if(options[i].value==='#000') {
				options[i].selected = true;
			} else {
				options[i].selected = false;
			}
		}
		ctx.strokeStyle = document.getElementById("strokeStyleSelect").value;
		resizeService.setStrokeStyle(ctx.strokeStyle);
		ctx.lineJoin = ctx.lineCap = 'round';
		ctx.fillStyle="#ffffff";
		ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
	}


	newBtn.addEventListener('click', this.newPage, false)
		
}
