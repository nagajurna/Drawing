function DragAndDropService(container,nwHandle,seHandle,dragHandle) {

	let c = container, nw = nwHandle, se = seHandle, drag = dragHandle;
	
	let datas = {};
	
	const mousedown = (e) => {
		e.preventDefault();
		e.target.style.cursor = "move";
		datas.xDif = e.screenX - c.offsetLeft;
		datas.yDif = e.screenY - c.offsetTop;
	};
		
	const mousemove = (e) => {
		e.preventDefault();
		if(datas.xDif) {
			c.style.left = e.screenX - datas.xDif + "px";
			c.style.top = e.screenY - datas.yDif + "px";
			
			nw.style.top = (c.offsetTop-nw.offsetHeight) + "px";
			nw.style.left = (c.offsetLeft-nw.offsetWidth) + "px";
			se.style.top = (c.offsetTop+c.offsetHeight) + "px";
			se.style.left = (c.offsetLeft+c.offsetWidth) + "px";
			drag.style.top = (c.offsetTop-drag.offsetHeight) + "px";
			drag.style.left = (c.offsetWidth-drag.offsetWidth)/2 + c.offsetLeft + "px";
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
		datas.xDif = touch.screenX - c.offsetLeft;
		datas.yDif = touch.screenY - c.offsetTop;
	};
	
	const touchmove = (e) => {
		let touch = e.touches[0];
		e.preventDefault();
		if(datas.xDif) {
			c.style.left = touch.screenX - datas.xDif + "px";
			c.style.top = touch.screenY - datas.yDif + "px";
			
			nw.style.top = (c.offsetTop-nw.offsetHeight) + "px";
			nw.style.left = (c.offsetLeft-nw.offsetWidth) + "px";
			se.style.top = (c.offsetTop+c.offsetHeight) + "px";
			se.style.left = (c.offsetLeft+c.offsetWidth) + "px";
			drag.style.top = (c.offsetTop-drag.offsetHeight) + "px";
			drag.style.left = (c.offsetWidth-drag.offsetWidth)/2 + c.offsetLeft + "px";
		}
	};
	
	const touchend = function(e) {
		datas = {};
	};
	
	drag.addEventListener('mousedown', mousedown, {capture: false});
	document.addEventListener('mousemove', mousemove, {capture: false});
	drag.addEventListener('mouseup', mouseup, {capture: false});
	
	drag.addEventListener('touchstart', touchstart, {capture: false});
	document.addEventListener('touchmove', touchmove, {capture: false, passive: false});
	drag.addEventListener('touchend', touchend, {capture: false});
	
};
