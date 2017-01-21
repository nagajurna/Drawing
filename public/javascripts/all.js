"use strict";function DragAndDropService(e,t,f,s){var o=e,p=t,n=f,r=s,i={},c=function(e){e.preventDefault(),e.target.style.cursor="move",i.xDif=e.screenX-o.offsetLeft,i.yDif=e.screenY-o.offsetTop},u=function(e){e.preventDefault(),i.xDif&&(o.style.left=e.screenX-i.xDif+"px",o.style.top=e.screenY-i.yDif+"px",p.style.top=o.offsetTop-p.offsetHeight+"px",p.style.left=o.offsetLeft-p.offsetWidth+"px",n.style.top=o.offsetTop+o.offsetHeight+"px",n.style.left=o.offsetLeft+o.offsetWidth+"px",r.style.top=o.offsetTop-r.offsetHeight+"px",r.style.left=(o.offsetWidth-r.offsetWidth)/2+o.offsetLeft+"px")},l=function(e){e.preventDefault(),e.target.style.cursor="grab",e.target.style.cursor="-webkit-grab",i={}},a=function(e){var t=e.touches[0];i.xDif=t.screenX-o.offsetLeft,i.yDif=t.screenY-o.offsetTop},d=function(e){var t=e.touches[0];e.preventDefault(),i.xDif&&(o.style.left=t.screenX-i.xDif+"px",o.style.top=t.screenY-i.yDif+"px",p.style.top=o.offsetTop-p.offsetHeight+"px",p.style.left=o.offsetLeft-p.offsetWidth+"px",n.style.top=o.offsetTop+o.offsetHeight+"px",n.style.left=o.offsetLeft+o.offsetWidth+"px",r.style.top=o.offsetTop-r.offsetHeight+"px",r.style.left=(o.offsetWidth-r.offsetWidth)/2+o.offsetLeft+"px")},y=function(e){i={}};r.addEventListener("mousedown",c,{capture:!1}),document.addEventListener("mousemove",u,{capture:!1}),r.addEventListener("mouseup",l,{capture:!1}),r.addEventListener("touchstart",a,{capture:!1}),document.addEventListener("touchmove",d,{capture:!1,passive:!1}),r.addEventListener("touchend",y,{capture:!1})}
"use strict";function DrawService(e,t,n,o,i){var s=e,a=t,f=n,c=o,u=i,d=a.canvas,r=!1,v={},l={},p=function(e){e.preventDefault(),1===e.which&&(f.disabled=!1,c.disabled=!1,u.disabled=!1,r=!0,v={x:e.clientX-s.offsetLeft,y:e.clientY-s.offsetTop},a.beginPath(),a.moveTo(v.x,v.y),a.lineTo(v.x,v.y),a.stroke())},L=function(e){e.preventDefault(),r===!0&&(l={x:e.clientX-s.offsetLeft,y:e.clientY-s.offsetTop},a.beginPath(),a.moveTo(v.x,v.y),a.lineTo(l.x,l.y),a.stroke(),v=l)},h=function(){r=!1},x=function(e){f.disabled=!1,c.disabled=!1,u.disabled=!1;var t=e.touches[0];r=!0,v={x:t.clientX-s.offsetLeft,y:t.clientY-s.offsetTop}},y=function(e){e.preventDefault();var t=e.touches[0];if(r){var n={x:t.clientX-s.offsetLeft,y:t.clientY-s.offsetTop};a.beginPath(),a.moveTo(v.x,v.y),a.lineTo(n.x,n.y),a.stroke(),v=n}},T=function(e){r=!1};d.addEventListener("mouseout",function(){r=!1},!1),d.addEventListener("mousedown",p,{capture:!1}),d.addEventListener("mousemove",L,{capture:!1}),d.addEventListener("mouseup",h,{capture:!1}),d.addEventListener("touchstart",x,{capture:!1,passive:!0}),d.addEventListener("touchmove",y,{capture:!1,passive:!1}),d.addEventListener("touchend",T,{capture:!1,passive:!0})}
"use strict";function Drawing(){var e=document.getElementById("container"),t=document.getElementById("image"),n=document.getElementById("canvas"),d=n.getContext("2d"),i=document.getElementById("nwHandle"),o=document.getElementById("seHandle"),a=document.getElementById("dragHandle"),s=document.getElementById("convert"),l=document.getElementById("save"),f=document.getElementById("new"),c=document.getElementById("lineWidthSelect"),r=document.getElementById("strokeStyleSelect"),m=document.getElementById("size"),u=!1,h=(DrawService(e,d,s,l,f),ResizeService(e,d,i,o,a,c,r,m),DragAndDropService(e,i,o,a),function(){d.canvas.width=e.offsetWidth,d.canvas.height=e.offsetHeight,d.lineWidth=parseInt(c.value),d.strokeStyle=r.value,d.lineJoin=d.lineCap="round",d.fillStyle="#ffffff",d.fillRect(0,0,d.canvas.width,d.canvas.height),e.style.left=(window.innerWidth-e.offsetWidth)/2+"px",i.style.top=e.offsetTop-i.offsetHeight+"px",i.style.left=e.offsetLeft-i.offsetWidth+"px",o.style.top=e.offsetTop+e.offsetHeight+"px",o.style.left=e.offsetLeft+e.offsetWidth+"px",a.style.top=e.offsetTop-a.offsetHeight+"px",a.style.left=(e.offsetWidth-a.offsetWidth)/2+e.offsetLeft+"px",s.disabled=!0,l.disabled=!0,f.disabled=!0,m.innerHTML=d.canvas.width+"px X "+d.canvas.height+"px"});document.addEventListener("DOMContentLoaded",h,!1);var v=function(){e.style.left=(window.innerWidth-e.offsetWidth)/2+"px",i.style.top=e.offsetTop-i.offsetHeight+"px",i.style.left=e.offsetLeft-i.offsetWidth+"px",o.style.top=e.offsetTop+e.offsetHeight+"px",o.style.left=e.offsetLeft+e.offsetWidth+"px",a.style.top=e.offsetTop-a.offsetHeight+"px",a.style.left=(e.offsetWidth-a.offsetWidth)/2+e.offsetLeft+"px"};window.addEventListener("resize",v,!1),window.addEventListener("load",function(e){window.scrollTo(0,0),e.currentTarget.innerWidth<768&&w(document.getElementById("flash"),"Draw !",1500)},!1),document.addEventListener("touchmove",function(e){e.preventDefault()},{passive:!1});var p=function(){d.lineWidth=parseInt(c.value)};c.addEventListener("change",p,{capture:!1});var g=function(){d.strokeStyle=r.value};r.addEventListener("change",g,{capture:!1});var y=function(){u=!1;var e=n.toDataURL().replace(/^data:image\/\w+;base64,/,""),t=document.createElement("input");t.setAttribute("name","data"),t.setAttribute("value",e),t.setAttribute("type","hidden");var d=document.createElement("form");d.method="post",d.action="/save",d.appendChild(t),document.body.appendChild(d),d.submit(),document.body.removeChild(d)};l.addEventListener("click",y,!1);var E=function(e){u===!1?(u=!0,t.src=d.canvas.toDataURL("image/png"),c.disabled=!0,r.disabled=!0,document.body.className="image",e.target.innerHTML="To drawing",w(document.getElementById("flash"),"Long touch to save",1200)):(u=!1,c.disabled=!1,r.disabled=!1,document.body.className="canvas",e.target.innerHTML="To image")};s.addEventListener("click",E,!1);var w=function(t,n,d){t.innerHTML=n,t.style.display="block",t.style.left=(e.offsetWidth-t.offsetWidth)/2+"px",window.setTimeout(function(){t.style.display="none"},d)},L=function(){u=!1,s.disabled=!0,l.disabled=!0,f.disabled=!0,c.disabled=!1,r.disabled=!1,document.body.className="canvas",s.innerHTML="To image",d.canvas.width=e.offsetWidth,d.canvas.height=e.offsetHeight,d.lineWidth=parseInt(document.getElementById("lineWidthSelect").value);for(var t=r.getElementsByTagName("option"),n=0;n<t.length;n++)"#000"===t[n].value?t[n].selected=!0:t[n].selected=!1;d.strokeStyle=document.getElementById("strokeStyleSelect").value,d.lineJoin=d.lineCap="round",d.fillStyle="#ffffff",d.fillRect(0,0,d.canvas.width,d.canvas.height)};f.addEventListener("click",L,!1)}
"use strict";function ResizeService(t,e,f,s,o,a,i,n){var l=!1,h=!1,c=function(t){t.preventDefault(),"seHandle"===t.target.id&&(l=!0),"nwHandle"===t.target.id&&(h=!0)},p=function(a){if(l===!0){a.preventDefault(),a.target.style.cursor="nwse-resize";var i=t.offsetHeight-(t.offsetHeight+t.offsetTop-a.clientY),c=t.offsetWidth-(t.offsetWidth+t.offsetLeft-a.clientX);t.style.height=i+"px",t.style.width=c+"px",f.style.top=t.offsetTop-f.offsetHeight+"px",f.style.left=t.offsetLeft-f.offsetWidth+"px",s.style.top=t.offsetTop+t.offsetHeight+"px",s.style.left=t.offsetLeft+t.offsetWidth+"px",o.style.top=t.offsetTop-o.offsetHeight+"px",o.style.left=(t.offsetWidth-o.offsetWidth)/2+t.offsetLeft+"px",n.innerHTML=c+"px X "+i+"px"}else if(h===!0){a.preventDefault(),a.target.style.cursor="nwse-resize";var p=t.offsetLeft-(t.offsetLeft-a.clientX),d=t.offsetTop-(t.offsetTop-a.clientY),v=t.offsetWidth+(t.offsetLeft-p),r=t.offsetHeight+(t.offsetTop-d),u=canvas.offsetLeft+(t.offsetLeft-p),g=canvas.offsetTop+(t.offsetTop-d);t.style.left=p+"px",t.style.top=d+"px",t.style.width=v+"px",t.style.height=r+"px",e.canvas.style.left=u+"px",e.canvas.style.top=g+"px",f.style.top=t.offsetTop-f.offsetHeight+"px",f.style.left=t.offsetLeft-f.offsetWidth+"px",s.style.top=t.offsetTop+t.offsetHeight+"px",s.style.left=t.offsetLeft+t.offsetWidth+"px",o.style.top=t.offsetTop-o.offsetHeight+"px",o.style.left=(t.offsetWidth-o.offsetWidth)/2+t.offsetLeft+"px",n.innerHTML=v+"px X "+r+"px"}},d=function(f){if(f.preventDefault(),l===!0){l=!1,e.canvas.style.cursor="pointer",document.body.style.cursor="default";var s=e.canvas.toDataURL();e.canvas.width=t.offsetWidth,e.canvas.height=t.offsetHeight,e.fillStyle="#ffffff",e.fillRect(0,0,e.canvas.width,e.canvas.height);var o=new Image;o.onload=function(){e.drawImage(o,0,0,e.canvas.width,e.canvas.height,0,0,e.canvas.width,e.canvas.height)},o.src=s,e.lineWidth=a.value,e.strokeStyle=i.value,e.lineJoin=e.lineCap="round"}else h===!0&&!function(){h=!1,e.canvas.style.cursor="pointer",document.body.style.cursor="default";var f=e.canvas.toDataURL();e.canvas.width=t.offsetWidth,e.canvas.height=t.offsetHeight,e.canvas.style.left="0px",e.canvas.style.top="0px",e.fillStyle="#ffffff",e.fillRect(0,0,e.canvas.width,e.canvas.height);var s=new Image;s.onload=function(){e.drawImage(s,s.width-e.canvas.width,s.height-e.canvas.height,e.canvas.width,e.canvas.height,0,0,e.canvas.width,e.canvas.height)},s.src=f,e.lineWidth=a.value,e.strokeStyle=i.value,e.lineJoin=e.lineCap="round"}()},v=function(t){var e=t.touches[0];"seHandle"===e.target.id&&(l=!0),"nwHandle"===e.target.id&&(h=!0)},r=function(a){var i=a.touches[0];if(l===!0){a.preventDefault();var n=t.offsetHeight-(t.offsetHeight+t.offsetTop-i.clientY),c=t.offsetWidth-(t.offsetWidth+t.offsetLeft-i.clientX);t.style.height=n+"px",t.style.width=c+"px",f.style.top=t.offsetTop-f.offsetHeight+"px",f.style.left=t.offsetLeft-f.offsetWidth+"px",s.style.top=t.offsetTop+t.offsetHeight+"px",s.style.left=t.offsetLeft+t.offsetWidth+"px",o.style.top=t.offsetTop-o.offsetHeight+"px",o.style.left=(t.offsetWidth-o.offsetWidth)/2+t.offsetLeft+"px"}else if(h===!0){a.preventDefault();var p=t.offsetLeft-(t.offsetLeft-i.clientX),d=t.offsetTop-(t.offsetTop-i.clientY),v=t.offsetWidth+(t.offsetLeft-p),r=t.offsetHeight+(t.offsetTop-d),u=canvas.offsetLeft+(t.offsetLeft-p),g=canvas.offsetTop+(t.offsetTop-d);t.style.left=p+"px",t.style.top=d+"px",t.style.width=v+"px",t.style.height=r+"px",e.canvas.style.left=u+"px",e.canvas.style.top=g+"px",f.style.top=t.offsetTop-f.offsetHeight+"px",f.style.left=t.offsetLeft-f.offsetWidth+"px",s.style.top=t.offsetTop+t.offsetHeight+"px",s.style.left=t.offsetLeft+t.offsetWidth+"px",o.style.top=t.offsetTop-o.offsetHeight+"px",o.style.left=(t.offsetWidth-o.offsetWidth)/2+t.offsetLeft+"px"}},u=function(f){l===!0?!function(){l=!1;var f=e.canvas.toDataURL();e.canvas.width=t.offsetWidth,e.canvas.height=t.offsetHeight,e.fillStyle="#ffffff",e.fillRect(0,0,e.canvas.width,e.canvas.height),e.lineWidth=a.value,e.strokeStyle=i.value,e.lineJoin=e.lineCap="round";var s=new Image;s.onload=function(){e.drawImage(s,0,0,e.canvas.width,e.canvas.height,0,0,e.canvas.width,e.canvas.height)},s.src=f}():h===!0&&!function(){h=!1;var f=e.canvas.toDataURL();e.canvas.width=t.offsetWidth,e.canvas.height=t.offsetHeight,e.canvas.style.left="0px",e.canvas.style.top="0px",e.fillStyle="#ffffff",e.fillRect(0,0,e.canvas.width,e.canvas.height),e.lineWidth=a.value,e.strokeStyle=i.value,e.lineJoin=e.lineCap="round";var s=new Image;s.onload=function(){e.drawImage(s,s.width-e.canvas.width,s.height-e.canvas.height,e.canvas.width,e.canvas.height,0,0,e.canvas.width,e.canvas.height)},s.src=f}()};s.addEventListener("mousedown",c,{capture:!1}),f.addEventListener("mousedown",c,{capture:!1}),document.addEventListener("mousemove",p,{capture:!1}),document.addEventListener("mouseup",d,{capture:!1}),s.addEventListener("touchstart",v,{capture:!1}),f.addEventListener("touchstart",v,{capture:!1}),document.addEventListener("touchmove",r,{capture:!1,passive:!1}),document.addEventListener("touchend",u,{capture:!1})}
"use strict";var drawing=Drawing();