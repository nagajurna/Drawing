var canvas = document.getElementById('c');
var ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
ctx.lineWidth = 4;
ctx.lineJoin = ctx.lineCap = 'round';
//ctx.shadowBlur = 1;
//ctx.shadowColor = 'rgb(0, 0, 0)';

ctx.fillStyle="#ffffff";
ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);

window.addEventListener('resize', function() {
	var data = canvas.toDataURL();
	if(window.innerWidth > canvas.width) {
		ctx.canvas.width = window.innerWidth;
		ctx.fillStyle="#ffffff";
		ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
		ctx.lineWidth = 4;
		ctx.lineJoin = ctx.lineCap = 'round';
		var img = new Image();
		img.onload = function() {
			ctx.drawImage(img,0,0);
		}
		img.src = data;
	}
	if(window.innerHeight > canvas.height) {
		ctx.canvas.height = window.innerHeight;
		ctx.fillStyle="#ffffff";
		ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
		ctx.lineWidth = 4;
		ctx.lineJoin = ctx.lineCap = 'round';
		var img = new Image();
		img.onload = function() {
			ctx.drawImage(img,0,0);
		}
		img.src = data;
	}
	
	
}, false)



var reduce = function() {
	
	
	
		var data=canvas.toDataURL();
		var ratio = canvas.height/canvas.width
		
		var img=new Image();
		img.src=data;
		img.onload=function(){
			w = 600;
			h = ratio*w;
			ctx.canvas.width = w;
			ctx.canvas.height = h;
			console.log(img.width);
			ctx.drawImage(img,0,0,img.width,img.height,0,0,w,h);
		}
}

var saveBtn = document.getElementById("save");
saveBtn.addEventListener('click', function() {
	reduce();
	var data = { data: canvas.toDataURL() };
	var ajax=new XMLHttpRequest();
	ajax.onreadystatechange = function() {
		if(this.readyState===4 && this.status===200)
		{
			console.log(this.responseText);
			document.getElementById("i").src = this.responseText;
			document.getElementById("i").width = ctx.canvas.width;
			document.getElementById("i").height = ctx.canvas.height;
			document.getElementById("i").style.display="block";
			canvas.style.display="none";
		}
	}
	ajax.open("POST",'/save',true);
	ajax.setRequestHeader("Content-type", "application/json");
	ajax.send(JSON.stringify(data));
	
}, false)


var newBtn = document.getElementById("new");
newBtn.addEventListener('click', function() {
	document.getElementById("i").style.display="none";
	document.getElementById("i").src = "";
	canvas.style.display="block";
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	ctx.fillStyle="#ffffff";
	ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
	ctx.lineWidth = 4;
	ctx.lineJoin = ctx.lineCap = 'round';
	//ctx.lineWidth = 1;
	//ctx.lineJoin = ctx.lineCap = 'round';
}, false)

var drawing, lastPoint = [];
//ctx.lineWidth = 2;
//ctx.lineJoin = ctx.lineCap = 'round';
//ctx.shadowBlur = 1;
//ctx.shadowColor = 'rgb(0, 0, 0)';

function mousedown(e) {
  drawing = true;
  lastPoint={ x: e.clientX, y: e.clientY };
  ctx.moveTo(e.clientX, e.clientY);
};

function mousemove(e) {
	if (drawing) {
		var currentPoint={ x: e.clientX, y: e.clientY };
		ctx.beginPath();
		ctx.moveTo(lastPoint.x, lastPoint.y);
		ctx.lineTo(currentPoint.x, currentPoint.y);
		ctx.stroke();
		lastPoint = currentPoint;
	}
};

function mouseup() {
  drawing = false;
};

function touchstart(e) {
  var touch = e.touches[0];
  drawing = true;
  ctx.moveTo(touch.clientX, touch.clientY);
};

function touchmove(e) {
	var touch = e.touches[0];
	if (drawing) {
		ctx.lineTo(touch.clientX, touch.clientY);
		ctx.stroke();
	}
};

function touchend() {
  drawing = false;
  
};



canvas.addEventListener("mousedown",mousedown,false);
canvas.addEventListener("mousemove",mousemove,false);
canvas.addEventListener("mouseup",mouseup,false);
canvas.addEventListener("touchstart",touchstart, {capture: false, passive: true});
canvas.addEventListener("touchmove",touchmove, {capture: false, passive: true});
canvas.addEventListener("touchend",touchend, {capture: false, passive: true});
