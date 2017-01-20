function DragAndDropService(container,nwHandle,seHandle,dragHandle) {

	let datas = {};
	
	const mousedown = (e) => {
		e.preventDefault();
		e.target.style.cursor = "move";
		datas.xDif = e.screenX - container.offsetLeft;
		datas.yDif = e.screenY - container.offsetTop;
	};
		
	const mousemove = (e) => {
		e.preventDefault();
		if(datas.xDif) {
			container.style.left = e.screenX - datas.xDif + "px";
			container.style.top = e.screenY - datas.yDif + "px";
			
			nwHandle.style.top = (container.offsetTop-nwHandle.offsetHeight) + "px";
			nwHandle.style.left = (container.offsetLeft-nwHandle.offsetWidth) + "px";
			seHandle.style.top = (container.offsetTop+container.offsetHeight) + "px";
			seHandle.style.left = (container.offsetLeft+container.offsetWidth) + "px";
			dragHandle.style.top = (container.offsetTop-dragHandle.offsetHeight) + "px";
			dragHandle.style.left = (container.offsetWidth-dragHandle.offsetWidth)/2 + container.offsetLeft + "px";
		}
	};
		
	const mouseup = (e) => {
		e.preventDefault();
		e.target.style.cursor = "grab";
		e.target.style.cursor = "-webkit-grab";
		datas = {};
	};
	
	const touchstart = (e) => {
		let touch = e.touches[0];
		datas.xDif = touch.screenX - container.offsetLeft;
		datas.yDif = touch.screenY - container.offsetTop;
	};
	
	const touchmove = (e) => {
		let touch = e.touches[0];
		e.preventDefault();
		if(datas.xDif) {
			container.style.left = touch.screenX - datas.xDif + "px";
			container.style.top = touch.screenY - datas.yDif + "px";
			
			nwHandle.style.top = (container.offsetTop-nwHandle.offsetHeight) + "px";
			nwHandle.style.left = (container.offsetLeft-nwHandle.offsetWidth) + "px";
			seHandle.style.top = (container.offsetTop+container.offsetHeight) + "px";
			seHandle.style.left = (container.offsetLeft+container.offsetWidth) + "px";
			dragHandle.style.top = (container.offsetTop-dragHandle.offsetHeight) + "px";
			dragHandle.style.left = (container.offsetWidth-dragHandle.offsetWidth)/2 + container.offsetLeft + "px";
		}
	};
	
	const touchend = function(e) {
		datas = {};
	};
	
	dragHandle.addEventListener('mousedown', mousedown, {capture: false});
	document.addEventListener('mousemove', mousemove, {capture: false});
	dragHandle.addEventListener('mouseup', mouseup, {capture: false});
	dragHandle.addEventListener('touchstart', touchstart, {capture: false});
	document.addEventListener('touchmove', touchmove, {capture: false, passive: false});
	dragHandle.addEventListener('touchend', touchend, {capture: false});
	
};
