//container
var container = document.getElementById("container");
//image
var image = document.getElementById("image");
//canvas
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.canvas.width = container.offsetWidth;
ctx.canvas.height = container.offsetHeight;
ctx.lineWidth = parseInt(document.getElementById("lineWidthSelect").value);
ctx.strokeStyle = document.getElementById("strokeStyleSelect").value;
ctx.lineJoin = ctx.lineCap = 'round';
ctx.fillStyle="#ffffff";
ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
//handles
var nwHandle = document.getElementById("nwHandle");
var seHandle = document.getElementById("seHandle");
var dragHandle = document.getElementById("dragHandle");
var convertBtn = document.getElementById("convert");
var saveBtn = document.getElementById("save");
var newBtn = document.getElementById("new");
convertBtn.disabled = true;
saveBtn.disabled = true;
newBtn.disabled = true;
		
var init = function() {
	container.style.left = (window.innerWidth-container.offsetWidth)/2 + "px";
	nwHandle.style.top = (container.offsetTop-nwHandle.offsetHeight) + "px";
	nwHandle.style.left = (container.offsetLeft-nwHandle.offsetWidth) + "px";
	seHandle.style.top = (container.offsetTop+container.offsetHeight) + "px";
	seHandle.style.left = (container.offsetLeft+container.offsetWidth) + "px";
	dragHandle.style.top = (container.offsetTop-dragHandle.offsetHeight) + "px";
	dragHandle.style.left = (container.offsetWidth-dragHandle.offsetWidth)/2 + container.offsetLeft + "px";
};

//load
document.onload = init();
window.addEventListener("load", function() { window. scrollTo(0, 0); });

//resize
window.addEventListener('resize', init, false);

//drawService
var drawService = new DrawService(container,ctx,convertBtn,saveBtn,newBtn);
//resizeService
var resizeService = new ResizeService(container,ctx,nwHandle,seHandle,dragHandle);
resizeService.setLineWidth(ctx.lineWidth);
//dragAndDropService
var dragAndDropService = new DragAndDropService(container,nwHandle,seHandle,dragHandle);

//change line width
var setLineWidth = function(e) {
	ctx.lineWidth = parseInt(document.getElementById("lineWidthSelect").value);
	resizeService.setLineWidth(ctx.lineWidth);
};

document.getElementById("lineWidthSelect").addEventListener('change', setLineWidth, {capture: false});

//change line width
var setStrokeStyle = function(e) {
	ctx.strokeStyle = document.getElementById("strokeStyleSelect").value;
	resizeService.setStrokeStyle(ctx.strokeStyle);
};

document.getElementById("strokeStyleSelect").addEventListener('change', setStrokeStyle, {capture: false});

var setFileSelect = function(e) {
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
saveBtn.addEventListener('click', function() {
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
	  
}, false)

//convert
var im = false;
convertBtn.addEventListener('click', function(e) {
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
	
}, false)



//new
newBtn.addEventListener('click', function() {
	convertBtn.disabled = true;
	saveBtn.disabled = true;
	newBtn.disabled = true;
	document.body.className = "canvas";
	convertBtn.innerHTML = "To image";
	ctx.canvas.width = container.offsetWidth;
	ctx.canvas.height = container.offsetHeight;
	ctx.lineWidth = parseInt(document.getElementById("lineWidthSelect").value);
	ctx.lineJoin = ctx.lineCap = 'round';
	ctx.fillStyle="#ffffff";
	ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
}, false)
		
