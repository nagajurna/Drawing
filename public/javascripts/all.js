"use strict";function DragAndDropService(e,t,f,s){var o={},n=function(t){t.preventDefault(),t.target.style.cursor="move",o.xDif=t.screenX-e.offsetLeft,o.yDif=t.screenY-e.offsetTop},p=function(t){t.preventDefault(),o.xDif&&(e.style.left=t.screenX-o.xDif+"px",e.style.top=t.screenY-o.yDif+"px",nwHandle.style.top=e.offsetTop-nwHandle.offsetHeight+"px",nwHandle.style.left=e.offsetLeft-nwHandle.offsetWidth+"px",f.style.top=e.offsetTop+e.offsetHeight+"px",f.style.left=e.offsetLeft+e.offsetWidth+"px",s.style.top=e.offsetTop-s.offsetHeight+"px",s.style.left=(e.offsetWidth-s.offsetWidth)/2+e.offsetLeft+"px")},r=function(e){e.preventDefault(),e.target.style.cursor="grab",e.target.style.cursor="-webkit-grab",o={}},i=function(t){var f=t.touches[0];o.xDif=f.screenX-e.offsetLeft,o.yDif=f.screenY-e.offsetTop},l=function(t){var n=t.touches[0];t.preventDefault(),o.xDif&&(e.style.left=n.screenX-o.xDif+"px",e.style.top=n.screenY-o.yDif+"px",nwHandle.style.top=e.offsetTop-nwHandle.offsetHeight+"px",nwHandle.style.left=e.offsetLeft-nwHandle.offsetWidth+"px",f.style.top=e.offsetTop+e.offsetHeight+"px",f.style.left=e.offsetLeft+e.offsetWidth+"px",s.style.top=e.offsetTop-s.offsetHeight+"px",s.style.left=(e.offsetWidth-s.offsetWidth)/2+e.offsetLeft+"px")},a=function(e){o={}};s.addEventListener("mousedown",n,{capture:!1}),document.addEventListener("mousemove",p,{capture:!1}),s.addEventListener("mouseup",r,{capture:!1}),s.addEventListener("touchstart",i,{capture:!1}),document.addEventListener("touchmove",l,{capture:!1,passive:!1}),s.addEventListener("touchend",a,{capture:!1})}
"use strict";function DrawService(e,t,n,o,s,i,a){var f=t.canvas,c=!1,r={},u={},d=function(i){i.preventDefault(),1===i.which&&(n.disabled=!1,o.disabled=!1,s.disabled=!1,c=!0,r={x:i.clientX-e.offsetLeft,y:i.clientY-e.offsetTop},t.beginPath(),t.moveTo(r.x,r.y),t.lineTo(r.x,r.y),t.stroke())},v=function(n){n.preventDefault(),c===!0&&(u={x:n.clientX-e.offsetLeft,y:n.clientY-e.offsetTop},t.beginPath(),t.moveTo(r.x,r.y),t.lineTo(u.x,u.y),t.stroke(),r=u)},l=function(){c=!1,i.setHistory(f.toDataURL(),{reset:!1})},p=function(t){n.disabled=!1,o.disabled=!1,s.disabled=!1;var i=t.touches[0];c=!0,r={x:i.clientX-e.offsetLeft,y:i.clientY-e.offsetTop}},L=function(n){n.preventDefault();var o=n.touches[0];if(c){var s={x:o.clientX-e.offsetLeft,y:o.clientY-e.offsetTop};t.beginPath(),t.moveTo(r.x,r.y),t.lineTo(s.x,s.y),t.stroke(),r=s}},y=function(e){c=!1,i.setHistory(f.toDataURL(),{reset:!1})};f.addEventListener("mouseout",function(){c=!1},!1),f.addEventListener("mousedown",d,{capture:!1}),f.addEventListener("mousemove",v,{capture:!1}),f.addEventListener("mouseup",l,{capture:!1}),f.addEventListener("touchstart",p,{capture:!1,passive:!0}),f.addEventListener("touchmove",L,{capture:!1,passive:!1}),f.addEventListener("touchend",y,{capture:!1,passive:!0})}
"use strict";function Drawing(){var e=document.getElementById("container"),t=document.getElementById("image"),n=document.getElementById("canvas"),d=n.getContext("2d"),i=document.getElementById("nwHandle"),a=document.getElementById("seHandle"),o=document.getElementById("dragHandle"),s=document.getElementById("convert"),l=document.getElementById("save"),f=document.getElementById("new"),r=document.getElementById("previous"),c=document.getElementById("next"),h=document.getElementById("lineWidthSelect"),u=document.getElementById("strokeStyleSelect"),g=document.getElementById("size"),m=!1,v=new HistoryService(r,c),y=(DrawService(e,d,s,l,f,v),ResizeService(e,d,i,a,o,h,u,g,v),DragAndDropService(e,i,a,o),function(){d.canvas.width=e.offsetWidth,d.canvas.height=e.offsetHeight,d.lineWidth=parseInt(h.value),d.strokeStyle=u.value,d.lineJoin=d.lineCap="round",d.fillStyle="#ffffff",d.fillRect(0,0,d.canvas.width,d.canvas.height),v.setHistory(n.toDataURL(),{reset:!0}),e.style.left=(window.innerWidth-e.offsetWidth)/2+"px",i.style.top=e.offsetTop-i.offsetHeight+"px",i.style.left=e.offsetLeft-i.offsetWidth+"px",a.style.top=e.offsetTop+e.offsetHeight+"px",a.style.left=e.offsetLeft+e.offsetWidth+"px",o.style.top=e.offsetTop-o.offsetHeight+"px",o.style.left=(e.offsetWidth-o.offsetWidth)/2+e.offsetLeft+"px",s.disabled=!0,l.disabled=!0,f.disabled=!0,g.innerHTML=d.canvas.width+"px X "+d.canvas.height+"px"});document.addEventListener("DOMContentLoaded",y,!1);var p=function(){e.style.left=(window.innerWidth-e.offsetWidth)/2+"px",i.style.top=e.offsetTop-i.offsetHeight+"px",i.style.left=e.offsetLeft-i.offsetWidth+"px",a.style.top=e.offsetTop+e.offsetHeight+"px",a.style.left=e.offsetLeft+e.offsetWidth+"px",o.style.top=e.offsetTop-o.offsetHeight+"px",o.style.left=(e.offsetWidth-o.offsetWidth)/2+e.offsetLeft+"px"};window.addEventListener("resize",p,!1),window.addEventListener("load",function(e){window.scrollTo(0,0),e.currentTarget.innerWidth<768&&L(document.getElementById("flash"),"Draw !",1500)},!1),document.addEventListener("touchmove",function(e){e.preventDefault()},{passive:!1});var w=function(){d.lineWidth=parseInt(h.value)};h.addEventListener("change",w,{capture:!1});var E=function(){d.strokeStyle=u.value};u.addEventListener("change",E,{capture:!1});var I=function(){m=!1;var e=n.toDataURL().replace(/^data:image\/\w+;base64,/,""),t=document.createElement("input");t.setAttribute("name","data"),t.setAttribute("value",e),t.setAttribute("type","hidden");var d=document.createElement("form");d.method="post",d.action="/save",d.appendChild(t),document.body.appendChild(d),d.submit(),document.body.removeChild(d)};l.addEventListener("click",I,!1);var b=function(e){m===!1?(m=!0,t.src=d.canvas.toDataURL("image/png"),h.disabled=!0,u.disabled=!0,document.body.className="image",e.target.innerHTML="To drawing",L(document.getElementById("flash"),"Long touch to save",1200)):(m=!1,h.disabled=!1,u.disabled=!1,document.body.className="canvas",e.target.innerHTML="To image")};s.addEventListener("click",b,!1);var L=function(t,n,d){t.innerHTML=n,t.style.display="block",t.style.left=(e.offsetWidth-t.offsetWidth)/2+"px",window.setTimeout(function(){t.style.display="none"},d)},W=function(){if(m=!1,s.disabled=!0,l.disabled=!0,f.disabled=!0,h.disabled=!1,u.disabled=!1,r.disabled=!0,document.body.className="canvas",s.innerHTML="To image",d.canvas.width=e.offsetWidth,d.canvas.height=e.offsetHeight,d.lineWidth=parseInt(document.getElementById("lineWidthSelect").value),"#fff"===u.value)for(var t=u.getElementsByTagName("option"),i=0;i<t.length;i++)"#000"===t[i].value?t[i].selected=!0:t[i].selected=!1;d.strokeStyle=document.getElementById("strokeStyleSelect").value,d.lineJoin=d.lineCap="round",d.fillStyle="#ffffff",d.fillRect(0,0,d.canvas.width,d.canvas.height),v.setHistory(n.toDataURL(),{reset:!0})};f.addEventListener("click",W,!1);var x=function(t){var n=v.getCurrent();v.setCurrent(n-1);var i=new Image,a=v.getHistory();i.onload=function(){e.style.width=i.width+"px",e.style.height=i.height+"px",d.canvas.width=i.width,d.canvas.height=i.height,d.lineWidth=parseInt(document.getElementById("lineWidthSelect").value),d.strokeStyle=document.getElementById("strokeStyleSelect").value,d.lineJoin=d.lineCap="round",d.drawImage(i,0,0),p()},i.src=a[v.getCurrent()],0===v.getCurrent()&&(t.target.disabled=!0),c.disabled=!1},B=function(t){var n=v.getCurrent();v.setCurrent(n+1);var i=new Image,a=v.getHistory();i.onload=function(){e.style.width=i.width+"px",e.style.height=i.height+"px",d.canvas.width=i.width,d.canvas.height=i.height,d.lineWidth=parseInt(document.getElementById("lineWidthSelect").value),d.strokeStyle=document.getElementById("strokeStyleSelect").value,d.lineJoin=d.lineCap="round",d.drawImage(i,0,0),p()},i.src=a[v.getCurrent()],v.getCurrent()===a.length-1&&(t.target.disabled=!0),r.disabled=!1};r.addEventListener("click",x,!1),c.addEventListener("click",B,!1)}
"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function t(t,e){for(var s=0;s<e.length;s++){var i=e[s];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,s,i){return s&&t(e.prototype,s),i&&t(e,i),e}}(),HistoryService=function(){function t(e,s){_classCallCheck(this,t),this._previousBtn=e,this._nextBtn=s,this._current=null,this._history=[]}return _createClass(t,[{key:"setHistory",value:function(t,e){e.reset===!0?(this._history.length=0,this._history.push(t),this.setCurrent(this._history.length-1),this._previousBtn.disabled=!0,this._nextBtn.disabled=!0):(this.getCurrent()===this._history.length-1?this._history.push(t)>50&&this._history.shift():(this._history.splice(this.getCurrent()+1),this._history.push(t)),this.setCurrent(this._history.length-1),this._previousBtn.disabled=!1,this._nextBtn.disabled=!0)}},{key:"getHistory",value:function(){return this._history}},{key:"setCurrent",value:function(t){this._current=t}},{key:"getCurrent",value:function(){return this._current}}]),t}();
"use strict";function ResizeService(t,e,f,s,o,a,i,n,l,h){var c=!1,p=!1,d=function(t){t.preventDefault(),"seHandle"===t.target.id&&(c=!0),"nwHandle"===t.target.id&&(p=!0)},v=function(a){if(c===!0){a.preventDefault(),a.target.style.cursor="nwse-resize";var i=t.offsetHeight-(t.offsetHeight+t.offsetTop-a.clientY),l=t.offsetWidth-(t.offsetWidth+t.offsetLeft-a.clientX);t.style.height=i+"px",t.style.width=l+"px",f.style.top=t.offsetTop-f.offsetHeight+"px",f.style.left=t.offsetLeft-f.offsetWidth+"px",s.style.top=t.offsetTop+t.offsetHeight+"px",s.style.left=t.offsetLeft+t.offsetWidth+"px",o.style.top=t.offsetTop-o.offsetHeight+"px",o.style.left=(t.offsetWidth-o.offsetWidth)/2+t.offsetLeft+"px",n.innerHTML=l+"px X "+i+"px"}else if(p===!0){a.preventDefault(),a.target.style.cursor="nwse-resize";var h=t.offsetLeft-(t.offsetLeft-a.clientX),d=t.offsetTop-(t.offsetTop-a.clientY),v=t.offsetWidth+(t.offsetLeft-h),r=t.offsetHeight+(t.offsetTop-d),u=canvas.offsetLeft+(t.offsetLeft-h),y=canvas.offsetTop+(t.offsetTop-d);t.style.left=h+"px",t.style.top=d+"px",t.style.width=v+"px",t.style.height=r+"px",e.canvas.style.left=u+"px",e.canvas.style.top=y+"px",f.style.top=t.offsetTop-f.offsetHeight+"px",f.style.left=t.offsetLeft-f.offsetWidth+"px",s.style.top=t.offsetTop+t.offsetHeight+"px",s.style.left=t.offsetLeft+t.offsetWidth+"px",o.style.top=t.offsetTop-o.offsetHeight+"px",o.style.left=(t.offsetWidth-o.offsetWidth)/2+t.offsetLeft+"px",n.innerHTML=v+"px X "+r+"px"}},r=function(f){if(f.preventDefault(),c===!0){c=!1,e.canvas.style.cursor="pointer",document.body.style.cursor="default";var s=e.canvas.toDataURL();e.canvas.width=t.offsetWidth,e.canvas.height=t.offsetHeight,e.fillStyle="#ffffff",e.fillRect(0,0,e.canvas.width,e.canvas.height);var o=new Image;o.onload=function(){e.drawImage(o,0,0,e.canvas.width,e.canvas.height,0,0,e.canvas.width,e.canvas.height),l.setHistory(e.canvas.toDataURL(),{reset:!1})},o.src=s,e.lineWidth=a.value,e.strokeStyle=i.value,e.lineJoin=e.lineCap="round"}else p===!0&&!function(){p=!1,e.canvas.style.cursor="pointer",document.body.style.cursor="default";var f=e.canvas.toDataURL();e.canvas.width=t.offsetWidth,e.canvas.height=t.offsetHeight,e.canvas.style.left="0px",e.canvas.style.top="0px",e.fillStyle="#ffffff",e.fillRect(0,0,e.canvas.width,e.canvas.height);var s=new Image;s.onload=function(){e.drawImage(s,s.width-e.canvas.width,s.height-e.canvas.height,e.canvas.width,e.canvas.height,0,0,e.canvas.width,e.canvas.height),l.setHistory(e.canvas.toDataURL(),{reset:!1})},s.src=f,e.lineWidth=a.value,e.strokeStyle=i.value,e.lineJoin=e.lineCap="round"}()},u=function(t){var e=t.touches[0];"seHandle"===e.target.id&&(c=!0),"nwHandle"===e.target.id&&(p=!0)},y=function(a){var i=a.touches[0];if(c===!0){a.preventDefault();var n=t.offsetHeight-(t.offsetHeight+t.offsetTop-i.clientY),l=t.offsetWidth-(t.offsetWidth+t.offsetLeft-i.clientX);t.style.height=n+"px",t.style.width=l+"px",f.style.top=t.offsetTop-f.offsetHeight+"px",f.style.left=t.offsetLeft-f.offsetWidth+"px",s.style.top=t.offsetTop+t.offsetHeight+"px",s.style.left=t.offsetLeft+t.offsetWidth+"px",o.style.top=t.offsetTop-o.offsetHeight+"px",o.style.left=(t.offsetWidth-o.offsetWidth)/2+t.offsetLeft+"px"}else if(p===!0){a.preventDefault();var h=t.offsetLeft-(t.offsetLeft-i.clientX),d=t.offsetTop-(t.offsetTop-i.clientY),v=t.offsetWidth+(t.offsetLeft-h),r=t.offsetHeight+(t.offsetTop-d),u=canvas.offsetLeft+(t.offsetLeft-h),y=canvas.offsetTop+(t.offsetTop-d);t.style.left=h+"px",t.style.top=d+"px",t.style.width=v+"px",t.style.height=r+"px",e.canvas.style.left=u+"px",e.canvas.style.top=y+"px",f.style.top=t.offsetTop-f.offsetHeight+"px",f.style.left=t.offsetLeft-f.offsetWidth+"px",s.style.top=t.offsetTop+t.offsetHeight+"px",s.style.left=t.offsetLeft+t.offsetWidth+"px",o.style.top=t.offsetTop-o.offsetHeight+"px",o.style.left=(t.offsetWidth-o.offsetWidth)/2+t.offsetLeft+"px"}},g=function(f){c===!0?!function(){c=!1;var f=e.canvas.toDataURL();e.canvas.width=t.offsetWidth,e.canvas.height=t.offsetHeight,e.fillStyle="#ffffff",e.fillRect(0,0,e.canvas.width,e.canvas.height),e.lineWidth=a.value,e.strokeStyle=i.value,e.lineJoin=e.lineCap="round";var s=new Image;s.onload=function(){e.drawImage(s,0,0,e.canvas.width,e.canvas.height,0,0,e.canvas.width,e.canvas.height)},s.src=f}():p===!0&&!function(){p=!1;var f=e.canvas.toDataURL();e.canvas.width=t.offsetWidth,e.canvas.height=t.offsetHeight,e.canvas.style.left="0px",e.canvas.style.top="0px",e.fillStyle="#ffffff",e.fillRect(0,0,e.canvas.width,e.canvas.height),e.lineWidth=a.value,e.strokeStyle=i.value,e.lineJoin=e.lineCap="round";var s=new Image;s.onload=function(){e.drawImage(s,s.width-e.canvas.width,s.height-e.canvas.height,e.canvas.width,e.canvas.height,0,0,e.canvas.width,e.canvas.height)},s.src=f}()};s.addEventListener("mousedown",d,{capture:!1}),f.addEventListener("mousedown",d,{capture:!1}),document.addEventListener("mousemove",v,{capture:!1}),document.addEventListener("mouseup",r,{capture:!1}),s.addEventListener("touchstart",u,{capture:!1}),f.addEventListener("touchstart",u,{capture:!1}),document.addEventListener("touchmove",y,{capture:!1,passive:!1}),document.addEventListener("touchend",g,{capture:!1})}
"use strict";var drawing=Drawing();