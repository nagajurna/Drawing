function DragAndDropService(container,nwHandle,seHandle,dragHandle) {
	
	var container = container;

	var nwHandle = nwHandle;
	
	var seHandle = seHandle;
	
	var dragHandle = dragHandle;
	
	var datas = {};
	
	this.mousedown = function(e) {
		e.preventDefault();
		e.target.style.cursor = "move";
		datas.xDif = e.screenX - container.offsetLeft;
		datas.yDif = e.screenY - container.offsetTop;
	};
	
	this.mousemove = function(e) {
		e.preventDefault();
		if(datas.xDif) {
			container.style.left = e.screenX - datas.xDif + "px";
			container.style.top = e.screenY - datas.yDif + "px";
			
			nwHandle.style.top = (container.offsetTop-20) + "px";
			nwHandle.style.left = (container.offsetLeft-20) + "px";
			seHandle.style.top = (container.offsetTop+container.offsetHeight) + "px";
			seHandle.style.left = (container.offsetLeft+container.offsetWidth) + "px";
			dragHandle.style.top = (container.offsetTop-dragHandle.offsetHeight) + "px";
			dragHandle.style.left = (container.offsetWidth-dragHandle.offsetWidth)/2 + container.offsetLeft + "px";
		}
	};
	
	this.mouseup = function(e) {
		e.preventDefault();
		e.target.style.cursor = "grab";
		e.target.style.cursor = "-webkit-grab";
		datas = {};
	};
	
	dragHandle.addEventListener('mousedown', this.mousedown, {capture: false});
	document.addEventListener('mousemove', this.mousemove, {capture: false});
	dragHandle.addEventListener('mouseup', this.mouseup, {capture: false});
	

	
};
