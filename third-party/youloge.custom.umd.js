!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){"use strict";class e extends HTMLParagraphElement{constructor(){super();var e=this.parentNode;function t(e){return(e.innerText||e.textContent).split(/\s+/g).length}var n="Words: "+t(e),i=this.attachShadow({mode:"open"}),d=document.createElement("span");d.textContent=n,i.appendChild(d),setInterval((function(){var n="Words: "+t(e);d.textContent=n}),200)}}customElements.define("youloge-drive",e,{extends:"div"}),customElements.define("person-details",class extends HTMLElement{constructor(){super();const e=document.createElement("div");e.innerHTML='\n        <style>\n          :host {\n            display: block;\n          }\n        </style>\n        <div class="card">\n          <h1>Person Details</h1>\n          <button>Edit</button>\n          <div>\n            <slot></slot>\n          </div>\n        </div>\n      ';const t=this.attachShadow({mode:"open"}),n=document.createElement("style");n.textContent="\n        div { padding: 10px; border: 1px solid gray; width: 200px; margin: 10px; }\n        h2 { margin: 0 0 10px; }\n        ul { margin: 0; }\n        p { margin: 10px 0; }\n      ",t.appendChild(n),t.appendChild(e.cloneNode(!0))}}),customElements.define("edit-word",class extends HTMLElement{constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("form"),n=document.createElement("input"),i=document.createElement("span"),d=document.createElement("style");function s(){i.style.display="inline-block",t.style.display="none",i.textContent=n.value,n.style.width=i.clientWidth+"px"}d.textContent="span { background-color: #eef; padding: 0 2px }",e.appendChild(d),e.appendChild(t),e.appendChild(i),i.textContent=this.textContent,n.value=this.textContent,t.appendChild(n),t.style.display="none",i.style.display="inline-block",n.style.width=i.clientWidth+"px",this.setAttribute("tabindex","0"),n.setAttribute("required","required"),this.style.display="inline-block",this.addEventListener("click",(()=>{i.style.display="none",t.style.display="inline-block",n.focus(),n.setSelectionRange(0,n.value.length)})),t.addEventListener("submit",(e=>{s(),e.preventDefault()})),n.addEventListener("blur",s)}})}));