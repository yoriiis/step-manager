!function(t){var e={};function s(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,s),i.l=!0,i.exports}s.m=t,s.c=e,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)s.d(n,i,function(e){return t[e]}.bind(null,i));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s="./example/src/scripts/demo.js")}({"./dist/step-manager.js":function(t,e,s){window,t.exports=function(t){var e={};function s(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,s),i.l=!0,i.exports}return s.m=t,s.c=e,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)s.d(n,i,function(e){return t[e]}.bind(null,i));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s="./src/index.js")}({"./src/cache-manager.js":function(t,e,s){"use strict";s.d(e,"default",(function(){return n}));class n{constructor(t){const e=t||{};this.options=Object.assign({cacheMethod:"sessionStorage",keyBrowserStorage:"stepManager"},e)}getDatasFromCache(t){let e=null;const s=window[this.options.cacheMethod].getItem(this.options.keyBrowserStorage)||null;if(null!==s){const n=JSON.parse(s);e=Array.isArray(t)?this.filterDatas(t,n):n}return e}filterDatas(t,e){let s=null;const n=Object.keys(e).filter(e=>t.includes(e));return n.length&&(s={},n.map(t=>s[t]=e[t])),s}setDatasToCache({id:t,datas:e}){let s=this.getDatasFromCache();s||(s={}),s[t]||(s[t]={}),s[t].datas=e,window[this.options.cacheMethod].setItem(`${this.options.keyBrowserStorage}`,JSON.stringify(s))}removeDatasFromCache(){window[this.options.cacheMethod].removeItem(`${this.options.keyBrowserStorage}`)}}},"./src/index.js":function(t,e,s){"use strict";s.r(e);var n=s("./src/manager.js");s.d(e,"Manager",(function(){return n.default}));var i=s("./src/steps.js");s.d(e,"Steps",(function(){return i.default}))},"./src/manager.js":function(t,e,s){"use strict";s.d(e,"default",(function(){return o}));var n=s("./src/router.js"),i=s("./src/cache-manager.js");
/**
 * @license MIT
 * @name StepManager
 * @version 1.2.2
 * @author: Yoriiis
 * @description: StepManager is a library to create flexible and robust multiple steps navigation with hash, validations, browser storage and hook functions.
 * {@link https://github.com/yoriiis/step-manager}
 * @copyright 2020 Yoriiis
 **/class o{constructor(t){const e=t||{};this.options=Object.assign({element:null,datas:{},steps:[],cacheMethod:"sessionStorage",keyBrowserStorage:"stepManager",ignoredHash:[],onComplete:()=>{},onChange:()=>{}},e),this.isCompleted=!1,this.triggerPreviousStep=this.triggerPreviousStep.bind(this),this.triggerNextStep=this.triggerNextStep.bind(this)}init(){this.addEvents();const t=this.analyzeSteps();this.steps=t.steps,this.CacheManager=new i.default({cacheMethod:this.options.cacheMethod,keyBrowserStorage:this.options.keyBrowserStorage}),this.Router=new n.default({defaultRoute:t.defaultRoute,stepsOrder:t.stepsOrder,steps:this.steps,ignoredHash:this.options.ignoredHash,getDatasFromCache:t=>this.CacheManager.getDatasFromCache(t),onChange:this.options.onChange}),this.Router.init()}analyzeSteps(){const t={},e=[];let s;return this.options.steps.forEach((n,i)=>{const o=new n,r=o.id;o.requestOptions=()=>this.options,o.requestDatas=(...t)=>this.CacheManager.getDatasFromCache(t),t[r]=o,e.push({id:r,route:o.route}),0===i&&(s=o.route)}),{steps:t,stepsOrder:e,defaultRoute:s}}addEvents(){this.eventNextStep=new window.Event("nextStep"),this.options.element.addEventListener("nextStep",this.triggerNextStep,!1),this.eventNextStep=new window.Event("previousStep"),this.options.element.addEventListener("previousStep",this.triggerPreviousStep,!1)}triggerNextStep(t){if(!this.isCompleted){const t=this.Router.getRouteId(this.Router.currentRoute),e=this.steps[t].getDatasFromStep();this.CacheManager.setDatasToCache({id:t,datas:e}),this.Router.triggerNext()||this.allStepsComplete()}}triggerPreviousStep(t){this.Router.triggerPrevious()}allStepsComplete(){this.isCompleted=!0,this.options.element.classList.add("loading"),"function"==typeof this.options.onComplete&&this.options.onComplete(this.CacheManager.getDatasFromCache()),this.CacheManager.removeDatasFromCache()}destroy(){this.options.element.removeEventListener("nextStep",this.triggerNextStep),this.options.element.removeEventListener("previousStep",this.triggerPreviousStep),this.Router.setRoute(""),this.Router.destroy(),this.options.element.remove()}}},"./src/router.js":function(t,e,s){"use strict";s.d(e,"default",(function(){return n}));class n{constructor(t){const e=t||{};this.options=Object.assign({defaultRoute:null,stepsOrder:[],steps:{},ignoredHash:[],getDatasFromCache:()=>{},onChange:()=>{}},e),this.reverseNavigation=!1,this.stepCreated=!1,this.applicationReady=!1,this.stepRedirected={},this.hashChanged=this.hashChanged.bind(this)}init(){this.addEvents();const t=this.getRoute();this.currentRoute=""===t?this.options.defaultRoute:t,""===t?this.setRoute(this.currentRoute):this.hashChanged()}addEvents(){window.addEventListener("hashchange",this.hashChanged,!1)}hashChanged(t){const e=this.getRoute();if(this.isIgnoredHashUsedToLeave(e))return void(this.previousRouteBeforeLeaving=this.getPreviousRoute(t));if(this.isIgnoredHashUsedToComeBack(e))return void(this.previousRouteBeforeLeaving=null);const s=this.checkIfTheStepCanBeDisplay({route:e,event:t});this.currentRoute=e,s.canBeDisplayed?this.stepCanBeDisplayed(t,s.fallbackRoute):this.stepCantBeDisplayed(t,s.fallbackRoute)}async stepCanBeDisplayed(t){t&&(this.previousRouteBeforeLeaving?(this.previousRoute=this.previousRouteBeforeLeaving,this.previousRouteBeforeLeaving=null):this.previousRoute=this.stepRedirected.redirect?this.stepRedirected.previousRoute:this.getPreviousRoute(t),this.previousRoute&&(await this.destroyStep(this.previousRoute),await this.createStep(this.currentRoute),this.stepCreated=!0)),this.stepCreated||await this.createStep(this.currentRoute),this.stepRedirected.redirect&&(this.stepRedirected.redirect=!1)}stepCantBeDisplayed(t,e){this.stepRedirected={redirect:!0,previousRoute:this.getPreviousRoute(t)},this.previousRoute=null,e?this.setRoute(e):this.setRoute(this.options.defaultRoute)}checkIfTheStepCanBeDisplay({route:t,event:e}){const s=this.getRouteId(t);if(this.options.steps[s])return this.options.steps[s].canTheStepBeDisplayed();{let t=this.options.defaultRoute;const s=this.getPreviousRoute(e),n=this.getRouteId(s);return s&&this.options.steps[n].fallbackRoute&&(t=this.options.steps[n].fallbackRoute),{canBeDisplayed:!1,fallbackRoute:t}}}async createStep(t){const e=this.getRouteId(t),s=this.options.getDatasFromCache([e]);s?this.options.steps[e].render(s[e].datas):this.options.steps[e].render(),this.applicationReady||(this.applicationReady=!0),"function"==typeof this.options.onChange&&await this.options.onChange("create")}async destroyStep(t){const e=this.getRouteId(t);"function"==typeof this.options.onChange&&await this.options.onChange("destroy"),this.options.steps[e].destroy()}triggerNext(){this.reverseNavigation=!1,this.previousRoute=this.currentRoute;const t=this.getNextStepRoute(this.currentRoute);return"end"!==t&&(this.setRoute(t),!0)}triggerPrevious(){this.reverseNavigation=!0,this.previousRoute=this.currentRoute;const t=this.getPreviousStepRoute(this.previousRoute);this.setRoute(t)}isReverseNavigation(){let t=0,e=0;return this.options.stepsOrder.forEach((s,n)=>{s.route===this.currentRoute&&(t=n),s.route===this.previousRoute&&(e=n)}),t<e}isIgnoredHashUsedToLeave(t){return this.options.ignoredHash.includes(t)}isIgnoredHashUsedToComeBack(t){return null!==this.previousRouteBeforeLeaving&&this.previousRouteBeforeLeaving===t}getRouteId(t){const e=this.options.stepsOrder.find(e=>e.route===t);return e?e.id:null}getPreviousRoute(t){return t&&t.oldURL?t.oldURL.split("#")[1]:null}getPreviousStepRoute(t){const e=parseInt(this.getIndexFromRoute(t)),s=this.options.stepsOrder[e-1];return s?s.route:this.options.defaultRoute}getNextStepRoute(t){const e=parseInt(this.getIndexFromRoute(t)),s=this.options.stepsOrder[e+1];return s?s.route:"end"}getIndexFromRoute(t){return this.options.stepsOrder.findIndex(e=>e.route===t)}getRoute(){return window.location.hash.substr(1)}setRoute(t){window.location.hash=t}destroy(){window.removeEventListener("hashchange",this.hashChanged)}}},"./src/steps.js":function(t,e,s){"use strict";function n(t,e,s){return e in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}s.d(e,"default",(function(){return i}));class i{constructor(){n(this,"fallbackRoute",null),n(this,"optionalStep",!1),this.clickOnCurrentStep=this.clickOnCurrentStep.bind(this)}render(t){this.options=this.requestOptions();const e=this.getTemplate(this.getStepDatasToRender());e instanceof HTMLElement?this.options.element.appendChild(e):this.options.element.insertAdjacentHTML("beforeend",e),this.afterRender(t)}afterRender(t){this.currentStep=this.options.element.querySelector(this.selector),this.addEvents(),t&&this.renderDatasFromCache&&this.renderDatasFromCache(t)}getStepDatasToRender(){return null}destroy(){this.removeEvents(),this.currentStep.remove()}addEvents(){this.currentStep.addEventListener("click",this.clickOnCurrentStep,!1)}clickOnCurrentStep(t){const e=t.target;"button"===e.nodeName.toLowerCase()&&e.hasAttribute("data-step-previous")?this.clickToPreviousStep(t):"button"===e.nodeName.toLowerCase()&&e.hasAttribute("data-step-next")&&this.clickToNextStep(t)}clickToNextStep(t){t.preventDefault(),(this.stepIsReadyToSubmit||this.optionalStep)&&this.options.element.dispatchEvent(new window.CustomEvent("nextStep"))}clickToPreviousStep(t){t.preventDefault(),this.options.element.dispatchEvent(new window.CustomEvent("previousStep"))}checkIfStepIsReadyToSubmit(){this.stepIsReadyToSubmit=null!==this.getDatasFromStep(),this.updateButtonToValidateStep()}updateButtonToValidateStep(){const t=this.currentStep.querySelector("[data-step-next]");this.stepIsReadyToSubmit||this.optionalStep?t.classList.remove("disabled"):t.classList.add("disabled")}removeEvents(){this.currentStep.removeEventListener("click",this.clickOnCurrentStep)}}}})},"./example/src/scripts/custom-steps.js":function(t,e,s){"use strict";s.d(e,"default",(function(){return i}));var n=s("./dist/step-manager.js");class i extends n.Steps{addEvents(){super.addEvents(),[...this.currentStep.querySelectorAll("[data-list-button]")].forEach(t=>{this.onClickOnListButton=t=>{this.clickOnListButton(t)},t.addEventListener("click",this.onClickOnListButton,!1)})}clickOnListButton(t){t.preventDefault(),t.currentTarget.classList.toggle("active"),this.checkIfStepIsReadyToSubmit()}renderDatasFromCache(t){t.forEach(t=>this.currentStep.querySelector(`[data-list-button][data-key="${t.key}"]`).classList.add("active")),this.checkIfStepIsReadyToSubmit()}getDatasFromStep(){const t=[...document.querySelectorAll("[data-list-button].active")].map(t=>({key:t.getAttribute("data-key"),name:t.innerText}));return t.length?t:null}}},"./example/src/scripts/demo.js":function(t,e,s){"use strict";s.r(e);var n=s("./example/src/scripts/step-people.js"),i=s("./example/src/scripts/step-planet.js"),o=s("./example/src/scripts/step-specie.js"),r=s("./dist/step-manager.js");s("./example/src/styles/demo.css");!async function(){const t=await async function(){let t=window.localStorage.getItem("swapi");if(null===t){const e=[];["https://swapi.dev/api/people/?page=1","https://swapi.dev/api/planets/?page=1","https://swapi.dev/api/species/?page=1"].forEach(t=>e.push(fetch(t).then(t=>t.json()))),t=await Promise.all(e).then(([t,e,s])=>({people:t,planets:e,species:s})),window.localStorage.setItem("swapi",JSON.stringify(t))}else t=JSON.parse(t);return t}(),e=document.querySelector("#steps");new r.Manager({element:e,datas:t,steps:[n.default,i.default,o.default],onComplete:t=>{console.log(t),document.querySelector(".container").innerHTML=`<pre>${JSON.stringify(t,null,2)}</pre>`},onChange:async function(t){return new Promise(s=>{e.classList["destroy"===t?"remove":"add"]("active"),setTimeout(()=>{s()},1e3*parseFloat(window.getComputedStyle(e).transitionDuration))})}}).init(),document.querySelector(".loader").classList.remove("active"),document.querySelector("#steps").classList.add("active")}()},"./example/src/scripts/step-people.js":function(t,e,s){"use strict";s.d(e,"default",(function(){return r}));var n=s("./example/src/scripts/custom-steps.js"),i=s("./node_modules/jsx-dom/lib/index.js");function o(t,e,s){return e in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}class r extends n.default{constructor(...t){super(...t),o(this,"id","people"),o(this,"route","people"),o(this,"selector",".step-people")}getTemplate(t){return Object(i.createElement)("div",{className:"step-people"},Object(i.createElement)("h2",{className:"title"},"Choose your favorites people"),Object(i.createElement)("ul",{className:"list"},t.map((t,e)=>Object(i.createElement)("li",{className:"list-item"},Object(i.createElement)("button",{className:"list-button","data-list-button":!0,"data-key":e},t.name)))),Object(i.createElement)("ul",{className:"nav"},Object(i.createElement)("li",{className:"nav-item"},Object(i.createElement)("button",{type:"submit",className:"btn disabled","data-step-next":!0},"Next step"))))}canTheStepBeDisplayed(){return{canBeDisplayed:!0}}getStepDatasToRender(){return this.options.datas.people.results}}},"./example/src/scripts/step-planet.js":function(t,e,s){"use strict";s.d(e,"default",(function(){return o}));var n=s("./example/src/scripts/custom-steps.js");function i(t,e,s){return e in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}class o extends n.default{constructor(...t){super(...t),i(this,"id","planet"),i(this,"route","planet"),i(this,"selector",".step-planet")}getTemplate(t){return`<div class="step-planet">\n                    <h2 class="title">Choose your favorites planet</h2>\n\t\t\t\t\t<ul class="list">\n\t\t\t\t\t\t${t.map((t,e)=>`\n\t\t\t\t\t\t\t<li class="list-item">\n\t\t\t\t\t\t\t\t<button class="list-button" data-list-button data-key="${e}">\n\t\t\t\t\t\t\t\t\t${t.name}\n\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t`).join("")}\n\t\t\t\t\t</ul>\n\t\t\t\t\t<ul class="nav">\n\t\t\t\t\t\t<li class="nav-item">\n\t\t\t\t\t\t\t<button class="btn" data-step-previous>Previous step</button>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t\t<li class="nav-item">\n\t\t\t\t\t\t\t<button type="submit" class="btn btn disabled" data-step-next>Next step</button>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t</ul>\n                </div>`}canTheStepBeDisplayed(){const t=this.requestDatas("people");return{canBeDisplayed:!!(t&&t.people&&t.people.datas)}}getStepDatasToRender(){return this.options.datas.planets.results}}},"./example/src/scripts/step-specie.js":function(t,e,s){"use strict";s.d(e,"default",(function(){return o}));var n=s("./example/src/scripts/custom-steps.js");function i(t,e,s){return e in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}class o extends n.default{constructor(...t){super(...t),i(this,"id","specie"),i(this,"route","specie"),i(this,"selector",".step-specie"),i(this,"fallbackRoute","planet")}getTemplate(t){return`<div class="step-specie">\n                    <h2 class="title">Choose your favorites specie</h2>\n\t\t\t\t\t<ul class="list">\n\t\t\t\t\t\t${t.map((t,e)=>`\n\t\t\t\t\t\t\t<li class="list-item">\n\t\t\t\t\t\t\t\t<button class="list-button" data-list-button data-key="${e}">\n\t\t\t\t\t\t\t\t\t${t.name}\n\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t`).join("")}\n\t\t\t\t\t</ul>\n\t\t\t\t\t<ul class="nav">\n\t\t\t\t\t\t<li class="nav-item">\n\t\t\t\t\t\t\t<button class="btn" data-step-previous>Previous step</button>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t\t<li class="nav-item">\n\t\t\t\t\t\t\t<button type="submit" class="btn disabled" data-step-next>Submit</button>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t</ul>\n                </div>`}canTheStepBeDisplayed(){const t=this.requestDatas("people","planet"),e=t&&t.people&&t.people.datas,s=t&&t.planet&&t.planet.datas;return{canBeDisplayed:!(!e||!s),fallbackRoute:s?this.fallbackRoute:"people"}}getStepDatasToRender(){return this.options.datas.species.results}}},"./example/src/styles/demo.css":function(t,e,s){},"./node_modules/jsx-dom/lib/index.js":function(t,e,s){"use strict";s.d(e,"createElement",(function(){return h}));const n=Object.keys;function i(t){return"string"==typeof t}function o(t){return"number"==typeof t}function r(t){return"object"==typeof t?null!==t:a(t)}function a(t){return"function"==typeof t}function u(t,e){if(t)for(const s of n(t))e(t[s],s)}const c={animationIterationCount:0,borderImageOutset:0,borderImageSlice:0,borderImageWidth:0,boxFlex:0,boxFlexGroup:0,boxOrdinalGroup:0,columnCount:0,columns:0,flex:0,flexGrow:0,flexPositive:0,flexShrink:0,flexNegative:0,flexOrder:0,gridArea:0,gridRow:0,gridRowEnd:0,gridRowSpan:0,gridRowStart:0,gridColumn:0,gridColumnEnd:0,gridColumnSpan:0,gridColumnStart:0,fontWeight:0,lineClamp:0,lineHeight:0,opacity:0,order:0,orphans:0,tabSize:0,widows:0,zIndex:0,zoom:0,fillOpacity:0,floodOpacity:0,stopOpacity:0,strokeDasharray:0,strokeDashoffset:0,strokeMiterlimit:0,strokeOpacity:0,strokeWidth:0};const l=["Webkit","ms","Moz","O"];n(c).forEach(t=>{l.forEach(e=>{c[function(t,e){return t+e.charAt(0).toUpperCase()+e.substring(1)}(e,t)]=0})});function p(t){return Array.isArray(t)?t.map(p).filter(Boolean).join(" "):r(t)?n(t).filter(e=>t[e]).join(" "):function(t){return!(e=t,"boolean"==typeof e||null==t);var e}(t)?""+t:""}const d={animate:0,circle:0,clipPath:0,defs:0,desc:0,ellipse:0,feBlend:0,feColorMatrix:0,feComponentTransfer:0,feComposite:0,feConvolveMatrix:0,feDiffuseLighting:0,feDisplacementMap:0,feDistantLight:0,feFlood:0,feFuncA:0,feFuncB:0,feFuncG:0,feFuncR:0,feGaussianBlur:0,feImage:0,feMerge:0,feMergeNode:0,feMorphology:0,feOffset:0,fePointLight:0,feSpecularLighting:0,feSpotLight:0,feTile:0,feTurbulence:0,filter:0,foreignObject:0,g:0,image:0,line:0,linearGradient:0,marker:0,mask:0,metadata:0,path:0,pattern:0,polygon:0,polyline:0,radialGradient:0,rect:0,stop:0,svg:0,switch:0,symbol:0,text:0,textPath:0,tspan:0,use:0,view:0};function h(t,e,...s){let o;var u;return(i(e)||Array.isArray(e))&&(s.unshift(e),e={}),(e=e||{}).namespaceURI||0!==d[t]||(e={...e,namespaceURI:"http://www.w3.org/2000/svg"}),null==e.children||s.length||({children:s,...e}=e),i(t)?(o=e.namespaceURI?document.createElementNS(e.namespaceURI,t):document.createElement(t),function(t,e){for(const s of n(t))b(s,t[s],e)}(e,o),f(s,o)):a(t)&&(r(t.defaultProps)&&(e={...t.defaultProps,...e}),o=t({...e,children:s})),r(u=e.ref)&&"current"in u?e.ref.current=o:a(e.ref)&&e.ref(o),o}function f(t,e){var s,n;r(n=t)&&"number"==typeof n.length&&"number"!=typeof n.nodeType?m(t,e):i(t)||o(t)?g(document.createTextNode(t),e):null===t?g(document.createComment(""),e):(s=t)&&"number"==typeof s.nodeType&&g(t,e)}function m(t,e){for(const s of t)f(s,e);return e}function g(t,e){e instanceof window.HTMLTemplateElement?e.content.appendChild(t):e.appendChild(t)}function v(t){return t.replace(/[A-Z\d]/g,t=>":"+t.toLowerCase())}function b(t,e,s){switch(t){case"xlinkActuate":case"xlinkArcrole":case"xlinkHref":case"xlinkRole":case"xlinkShow":case"xlinkTitle":case"xlinkType":return void S(s,"http://www.w3.org/1999/xlink",v(t),e);case"xmlnsXlink":return void y(s,v(t),e);case"xmlBase":case"xmlLang":case"xmlSpace":return void S(s,"http://www.w3.org/XML/1998/namespace",v(t),e)}switch(t){case"htmlFor":return void y(s,"for",e);case"dataset":return void u(e,(t,e)=>{null!=t&&(s.dataset[e]=t)});case"innerHTML":case"innerText":case"textContent":return void(s[t]=e);case"spellCheck":return void(s.spellcheck=e);case"class":case"className":return void(a(e)?e(s):y(s,"class",p(e)));case"ref":case"namespaceURI":return;case"style":if(r(e))return void u(e,(t,e)=>{o(t)&&0!==c[e]?s.style[e]=t+"px":s.style[e]=t})}if(a(e)){if("o"===t[0]&&"n"===t[1]){const n=t.toLowerCase();null==s[n]?s[n]=e:s.addEventListener(t,e)}}else!0===e?y(s,t,""):!1!==e&&null!=e&&y(s,t,e)}function y(t,e,s){t.setAttribute(e,s)}function S(t,e,s,n){t.setAttributeNS(e,s,n)}}});