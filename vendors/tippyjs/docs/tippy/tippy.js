!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.Tippy=t()}(this,function(){"use strict";function e(e){var t=!1,n=0,i=document.createElement("span");return new MutationObserver(function(){e(),t=!1}).observe(i,{attributes:!0}),function(){t||(t=!0,i.setAttribute("x-index",n),n+=1)}}function t(e){var t=!1;return function(){t||(t=!0,setTimeout(function(){t=!1,e()},Ce))}}function n(e){return""!==e&&!isNaN(parseFloat(e))&&isFinite(e)}function i(e,t){Object.keys(t).forEach(function(i){var r="";-1!==["width","height","top","right","bottom","left"].indexOf(i)&&n(t[i])&&(r="px"),e.style[i]=t[i]+r})}function r(e){var t={};return e&&"[object Function]"===t.toString.call(e)}function o(e,t){if(1!==e.nodeType)return[];var n=window.getComputedStyle(e,null);return t?n[t]:n}function a(e){return"HTML"===e.nodeName?e:e.parentNode||e.host}function s(e){if(!e||-1!==["HTML","BODY","#document"].indexOf(e.nodeName))return window.document.body;var t=o(e),n=t.overflow,i=t.overflowX;return/(auto|scroll)/.test(n+t.overflowY+i)?e:s(a(e))}function p(e){var t=e.nodeName;return"BODY"!==t&&("HTML"===t||e.firstElementChild.offsetParent===e)}function l(e){return null!==e.parentNode?l(e.parentNode):e}function f(e){var t=e&&e.offsetParent,n=t&&t.nodeName;return n&&"BODY"!==n&&"HTML"!==n?t:window.document.documentElement}function u(e,t){if(!(e&&e.nodeType&&t&&t.nodeType))return window.document.documentElement;var n=e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING,i=n?e:t,r=n?t:e,o=document.createRange();o.setStart(i,0),o.setEnd(r,0);var a=o.commonAncestorContainer;if(e!==a&&t!==a||i.contains(r))return p(a)?a:f(a);var s=l(e);return s.host?u(s.host,t):u(e,l(t).host)}function c(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"top",n="top"===t?"scrollTop":"scrollLeft",i=e.nodeName;if("BODY"===i||"HTML"===i){var r=window.document.documentElement;return(window.document.scrollingElement||r)[n]}return e[n]}function d(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=c(t,"top"),r=c(t,"left"),o=n?-1:1;return e.top+=i*o,e.bottom+=i*o,e.left+=r*o,e.right+=r*o,e}function h(e,t){var n="x"===t?"Left":"Top",i="Left"===n?"Right":"Bottom";return+e["border"+n+"Width"].split("px")[0]+ +e["border"+i+"Width"].split("px")[0]}function m(e,t,n,i){return Math.max(t["offset"+e],n["client"+e],n["offset"+e],Ie()?n["offset"+e]+i["margin"+("Height"===e?"Top":"Left")]+i["margin"+("Height"===e?"Bottom":"Right")]:0)}function v(){var e=window.document.body,t=window.document.documentElement,n=Ie()&&window.getComputedStyle(t);return{height:m("Height",e,t,n),width:m("Width",e,t,n)}}function g(e){return We({},e,{right:e.left+e.width,bottom:e.top+e.height})}function b(e){var t={};if(Ie())try{t=e.getBoundingClientRect();var n=c(e,"top"),i=c(e,"left");t.top+=n,t.left+=i,t.bottom+=n,t.right+=i}catch(e){}else t=e.getBoundingClientRect();var r={left:t.left,top:t.top,width:t.right-t.left,height:t.bottom-t.top},a="HTML"===e.nodeName?v():{},s=a.width||e.clientWidth||r.right-r.left,p=a.height||e.clientHeight||r.bottom-r.top,l=e.offsetWidth-s,f=e.offsetHeight-p;if(l||f){var u=o(e);l-=h(u,"x"),f-=h(u,"y"),r.width-=l,r.height-=f}return g(r)}function w(e,t){var n=Ie(),i="HTML"===t.nodeName,r=b(e),a=b(t),p=s(e),l=g({top:r.top-a.top,left:r.left-a.left,width:r.width,height:r.height});if(i||"BODY"===t.nodeName){var f=o(t),u=n&&i?0:+f.borderTopWidth.split("px")[0],c=n&&i?0:+f.borderLeftWidth.split("px")[0],h=n&&i?0:+f.marginTop.split("px")[0],m=n&&i?0:+f.marginLeft.split("px")[0];l.top-=u-h,l.bottom-=u-h,l.left-=c-m,l.right-=c-m,l.marginTop=h,l.marginLeft=m}return(n?t.contains(p):t===p&&"BODY"!==p.nodeName)&&(l=d(l,t)),l}function y(e){var t=window.document.documentElement,n=w(e,t),i=Math.max(t.clientWidth,window.innerWidth||0),r=Math.max(t.clientHeight,window.innerHeight||0),o=c(t),a=c(t,"left");return g({top:o-n.top+n.marginTop,left:a-n.left+n.marginLeft,width:i,height:r})}function E(e){var t=e.nodeName;return"BODY"!==t&&"HTML"!==t&&("fixed"===o(e,"position")||E(a(e)))}function O(e,t,n,i){var r={top:0,left:0},o=u(e,t);if("viewport"===i)r=y(o);else{var p=void 0;"scrollParent"===i?(p=s(a(e)),"BODY"===p.nodeName&&(p=window.document.documentElement)):p="window"===i?window.document.documentElement:i;var l=w(p,o);if("HTML"!==p.nodeName||E(o))r=l;else{var f=v(),c=f.height,d=f.width;r.top+=l.top-l.marginTop,r.bottom=c+l.top,r.left+=l.left-l.marginLeft,r.right=d+l.left}}return r.left+=n,r.top+=n,r.right-=n,r.bottom-=n,r}function x(e){return e.width*e.height}function L(e,t,n,i,r){var o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0;if(-1===e.indexOf("auto"))return e;var a=O(n,i,o,r),s={top:{width:a.width,height:t.top-a.top},right:{width:a.right-t.right,height:a.height},bottom:{width:a.width,height:a.bottom-t.bottom},left:{width:t.left-a.left,height:a.height}},p=Object.keys(s).map(function(e){return We({key:e},s[e],{area:x(s[e])})}).sort(function(e,t){return t.area-e.area}),l=p.filter(function(e){var t=e.width,i=e.height;return t>=n.clientWidth&&i>=n.clientHeight}),f=l.length>0?l[0].key:p[0].key,u=e.split("-")[1];return f+(u?"-"+u:"")}function T(e,t,n){return w(n,u(t,n))}function k(e){var t=window.getComputedStyle(e),n=parseFloat(t.marginTop)+parseFloat(t.marginBottom),i=parseFloat(t.marginLeft)+parseFloat(t.marginRight);return{width:e.offsetWidth+i,height:e.offsetHeight+n}}function A(e){var t={left:"right",right:"left",bottom:"top",top:"bottom"};return e.replace(/left|right|bottom|top/g,function(e){return t[e]})}function C(e,t,n){n=n.split("-")[0];var i=k(e),r={width:i.width,height:i.height},o=-1!==["right","left"].indexOf(n),a=o?"top":"left",s=o?"left":"top",p=o?"height":"width",l=o?"width":"height";return r[a]=t[a]+t[p]/2-i[p]/2,r[s]=n===s?t[s]-i[l]:t[A(s)],r}function M(e,t){return Array.prototype.find?e.find(t):e.filter(t)[0]}function S(e,t,n){if(Array.prototype.findIndex)return e.findIndex(function(e){return e[t]===n});var i=M(e,function(e){return e[t]===n});return e.indexOf(i)}function H(e,t,n){return(void 0===n?e:e.slice(0,S(e,"name",n))).forEach(function(e){e.function&&console.warn("`modifier.function` is deprecated, use `modifier.fn`!");var n=e.function||e.fn;e.enabled&&r(n)&&(t=n(t,e))}),t}function D(){if(!this.state.isDestroyed){var e={instance:this,styles:{},attributes:{},flipped:!1,offsets:{}};e.offsets.reference=T(this.state,this.popper,this.reference),e.placement=L(this.options.placement,e.offsets.reference,this.popper,this.reference,this.options.modifiers.flip.boundariesElement,this.options.modifiers.flip.padding),e.originalPlacement=e.placement,e.offsets.popper=C(this.popper,e.offsets.reference,e.placement),e.offsets.popper.position="absolute",e=H(this.modifiers,e),this.state.isCreated?this.options.onUpdate(e):(this.state.isCreated=!0,this.options.onCreate(e))}}function I(e,t){return e.some(function(e){var n=e.name;return e.enabled&&n===t})}function B(e){for(var t=[!1,"ms","webkit","moz","o"],n=e.charAt(0).toUpperCase()+e.slice(1),i=0;i<t.length-1;i++){var r=t[i],o=r?""+r+n:e;if(void 0!==window.document.body.style[o])return o}return null}function F(){return this.state.isDestroyed=!0,I(this.modifiers,"applyStyle")&&(this.popper.removeAttribute("x-placement"),this.popper.style.left="",this.popper.style.position="",this.popper.style.top="",this.popper.style[B("transform")]=""),this.disableEventListeners(),this.options.removeOnDestroy&&this.popper.parentNode.removeChild(this.popper),this}function N(e,t,n,i){var r="BODY"===e.nodeName,o=r?window:e;o.addEventListener(t,n,{passive:!0}),r||N(s(o.parentNode),t,n,i),i.push(o)}function W(e,t,n,i){n.updateBound=i,window.addEventListener("resize",n.updateBound,{passive:!0});var r=s(e);return N(r,"scroll",n.updateBound,n.scrollParents),n.scrollElement=r,n.eventsEnabled=!0,n}function P(){this.state.eventsEnabled||(this.state=W(this.reference,this.options,this.state,this.scheduleUpdate))}function j(e,t){return window.removeEventListener("resize",t.updateBound),t.scrollParents.forEach(function(e){e.removeEventListener("scroll",t.updateBound)}),t.updateBound=null,t.scrollParents=[],t.scrollElement=null,t.eventsEnabled=!1,t}function U(){this.state.eventsEnabled&&(window.cancelAnimationFrame(this.scheduleUpdate),this.state=j(this.reference,this.state))}function q(e,t){Object.keys(t).forEach(function(n){!1!==t[n]?e.setAttribute(n,t[n]):e.removeAttribute(n)})}function R(e,t){var n={position:e.offsets.popper.position},r={"x-placement":e.placement},o=Math.round(e.offsets.popper.left),a=Math.round(e.offsets.popper.top),s=B("transform");return t.gpuAcceleration&&s?(n[s]="translate3d("+o+"px, "+a+"px, 0)",n.top=0,n.left=0,n.willChange="transform"):(n.left=o,n.top=a,n.willChange="top, left"),i(e.instance.popper,We({},n,e.styles)),q(e.instance.popper,We({},r,e.attributes)),e.offsets.arrow&&i(e.arrowElement,e.offsets.arrow),e}function Y(e,t,n,i,r){var o=T(r,t,e),a=L(n.placement,o,t,e,n.modifiers.flip.boundariesElement,n.modifiers.flip.padding);return t.setAttribute("x-placement",a),n}function z(e,t,n){var i=M(e,function(e){return e.name===t}),r=!!i&&e.some(function(e){return e.name===n&&e.enabled&&e.order<i.order});if(!r){var o="`"+t+"`",a="`"+n+"`";console.warn(a+" modifier is required by "+o+" modifier in order to work, be sure to include it before "+o+"!")}return r}function _(e,t){if(!z(e.instance.modifiers,"arrow","keepTogether"))return e;var n=t.element;if("string"==typeof n){if(!(n=e.instance.popper.querySelector(n)))return e}else if(!e.instance.popper.contains(n))return console.warn("WARNING: `arrow.element` must be child of its popper element!"),e;var i=e.placement.split("-")[0],r=g(e.offsets.popper),o=e.offsets.reference,a=-1!==["left","right"].indexOf(i),s=a?"height":"width",p=a?"top":"left",l=a?"left":"top",f=a?"bottom":"right",u=k(n)[s];o[f]-u<r[p]&&(e.offsets.popper[p]-=r[p]-(o[f]-u)),o[p]+u>r[f]&&(e.offsets.popper[p]+=o[p]+u-r[f]);var c=o[p]+o[s]/2-u/2,d=c-g(e.offsets.popper)[p];return d=Math.max(Math.min(r[s]-u,d),0),e.arrowElement=n,e.offsets.arrow={},e.offsets.arrow[p]=Math.round(d),e.offsets.arrow[l]="",e}function K(e){return"end"===e?"start":"start"===e?"end":e}function X(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=je.indexOf(e),i=je.slice(n+1).concat(je.slice(0,n));return t?i.reverse():i}function G(e,t){if(I(e.instance.modifiers,"inner"))return e;if(e.flipped&&e.placement===e.originalPlacement)return e;var n=O(e.instance.popper,e.instance.reference,t.padding,t.boundariesElement),i=e.placement.split("-")[0],r=A(i),o=e.placement.split("-")[1]||"",a=[];switch(t.behavior){case Ue.FLIP:a=[i,r];break;case Ue.CLOCKWISE:a=X(i);break;case Ue.COUNTERCLOCKWISE:a=X(i,!0);break;default:a=t.behavior}return a.forEach(function(s,p){if(i!==s||a.length===p+1)return e;i=e.placement.split("-")[0],r=A(i);var l=g(e.offsets.popper),f=e.offsets.reference,u=Math.floor,c="left"===i&&u(l.right)>u(f.left)||"right"===i&&u(l.left)<u(f.right)||"top"===i&&u(l.bottom)>u(f.top)||"bottom"===i&&u(l.top)<u(f.bottom),d=u(l.left)<u(n.left),h=u(l.right)>u(n.right),m=u(l.top)<u(n.top),v=u(l.bottom)>u(n.bottom),b="left"===i&&d||"right"===i&&h||"top"===i&&m||"bottom"===i&&v,w=-1!==["top","bottom"].indexOf(i),y=!!t.flipVariations&&(w&&"start"===o&&d||w&&"end"===o&&h||!w&&"start"===o&&m||!w&&"end"===o&&v);(c||b||y)&&(e.flipped=!0,(c||b)&&(i=a[p+1]),y&&(o=K(o)),e.placement=i+(o?"-"+o:""),e.offsets.popper=We({},e.offsets.popper,C(e.instance.popper,e.offsets.reference,e.placement)),e=H(e.instance.modifiers,e,"flip"))}),e}function V(e){var t=g(e.offsets.popper),n=e.offsets.reference,i=e.placement.split("-")[0],r=Math.floor,o=-1!==["top","bottom"].indexOf(i),a=o?"right":"bottom",s=o?"left":"top",p=o?"width":"height";return t[a]<r(n[s])&&(e.offsets.popper[s]=r(n[s])-t[p]),t[s]>r(n[a])&&(e.offsets.popper[s]=r(n[a])),e}function J(e,t,n,i){var r=e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),o=+r[1],a=r[2];if(!o)return e;if(0===a.indexOf("%")){var s=void 0;switch(a){case"%p":s=n;break;case"%":case"%r":default:s=i}return g(s)[t]/100*o}if("vh"===a||"vw"===a){return("vh"===a?Math.max(document.documentElement.clientHeight,window.innerHeight||0):Math.max(document.documentElement.clientWidth,window.innerWidth||0))/100*o}return o}function Q(e,t,i,r){var o=[0,0],a=-1!==["right","left"].indexOf(r),s=e.split(/(\+|\-)/).map(function(e){return e.trim()}),p=s.indexOf(M(s,function(e){return-1!==e.search(/,|\s/)}));s[p]&&-1===s[p].indexOf(",")&&console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");var l=-1!==p?[s.slice(0,p).concat([s[p].split(/\s*,\s*|\s+/)[0]]),[s[p].split(/\s*,\s*|\s+/)[1]].concat(s.slice(p+1))]:[s];return l=l.map(function(e,n){var r=(1===n?!a:a)?"height":"width",o=!1;return e.reduce(function(e,t){return""===e[e.length-1]&&-1!==["+","-"].indexOf(t)?(e[e.length-1]=t,o=!0,e):o?(e[e.length-1]+=t,o=!1,e):e.concat(t)},[]).map(function(e){return J(e,r,t,i)})}),l.forEach(function(e,t){e.forEach(function(i,r){n(i)&&(o[t]+=i*("-"===e[r-1]?-1:1))})}),o}function Z(e,t){var i=t.offset,r=e.placement,o=e.offsets,a=o.popper,s=o.reference,p=r.split("-")[0],l=void 0;return l=n(+i)?[+i,0]:Q(i,a,s,p),"left"===p?(a.top+=l[0],a.left-=l[1]):"right"===p?(a.top+=l[0],a.left+=l[1]):"top"===p?(a.left+=l[0],a.top-=l[1]):"bottom"===p&&(a.left+=l[0],a.top+=l[1]),e.popper=a,e}function $(e,t){var n=t.boundariesElement||f(e.instance.popper),i=O(e.instance.popper,e.instance.reference,t.padding,n);t.boundaries=i;var r=t.priority,o=g(e.offsets.popper),a={primary:function(e){var n=o[e];return o[e]<i[e]&&!t.escapeWithReference&&(n=Math.max(o[e],i[e])),Ne({},e,n)},secondary:function(e){var n="right"===e?"left":"top",r=o[n];return o[e]>i[e]&&!t.escapeWithReference&&(r=Math.min(o[n],i[e]-("right"===e?o.width:o.height))),Ne({},n,r)}};return r.forEach(function(e){var t=-1!==["left","top"].indexOf(e)?"primary":"secondary";o=We({},o,a[t](e))}),e.offsets.popper=o,e}function ee(e){var t=e.placement,n=t.split("-")[0],i=t.split("-")[1];if(i){var r=e.offsets.reference,o=g(e.offsets.popper),a=-1!==["bottom","top"].indexOf(n),s=a?"left":"top",p=a?"width":"height",l={start:Ne({},s,r[s]),end:Ne({},s,r[s]+r[p]-o[p])};e.offsets.popper=We({},o,l[i])}return e}function te(e){if(!z(e.instance.modifiers,"hide","preventOverflow"))return e;var t=e.offsets.reference,n=M(e.instance.modifiers,function(e){return"preventOverflow"===e.name}).boundaries;if(t.bottom<n.top||t.left>n.right||t.top>n.bottom||t.right<n.left){if(!0===e.hide)return e;e.hide=!0,e.attributes["x-out-of-boundaries"]=""}else{if(!1===e.hide)return e;e.hide=!1,e.attributes["x-out-of-boundaries"]=!1}return e}function ne(e){var t=e.placement,n=t.split("-")[0],i=g(e.offsets.popper),r=g(e.offsets.reference),o=-1!==["left","right"].indexOf(n),a=-1===["top","left"].indexOf(n);return i[o?"left":"top"]=r[t]-(a?i[o?"width":"height"]:0),e.placement=A(t),e.offsets.popper=g(i),e}function ie(){Ge.touchUser=!0,/(iPad|iPhone|iPod)/g.test(navigator.userAgent)&&!window.MSStream&&document.body.classList.add("tippy-touch"),document.removeEventListener("touchstart",ie)}function re(e){var t=se(e.target,Ze.el),n=se(e.target,Ze.popper);if(n){if(pe(Ve.refs,function(e){return e.popper===n}).settings.interactive)return}if(t){var i=pe(Ve.refs,function(e){return e.el===t}),r=i.popper,o=i.settings,a=o.hideOnClick,s=o.multiple,p=o.trigger;if(!0!==a||Ge.touchUser||clearTimeout(r.getAttribute("data-delay")),!s&&Ge.touchUser||!s&&-1!==p.indexOf("click"))return xe(i);if(!0!==a||-1!==p.indexOf("click"))return}!se(e.target,Ze.controller)&&document.querySelector(Ze.popper)&&xe()}function oe(e){for(var t=[!1,"webkit"],n=e.charAt(0).toUpperCase()+e.slice(1),i=0;i<t.length;i++){var r=t[i],o=r?""+r+n:e;if(void 0!==window.document.body.style[o])return o}return null}function ae(e){return e.replace(/-.+/,"")}function se(e,t){return Element.prototype.matches||(Element.prototype.matches=Element.prototype.matchesSelector||Element.prototype.webkitMatchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||function(e){for(var t=(this.document||this.ownerDocument).querySelectorAll(e),n=t.length;--n>=0&&t.item(n)!==this;);return n>-1}),Element.prototype.closest||(Element.prototype.closest=function(e){for(var t=this;t;){if(t.matches(e))return t;t=t.parentElement}}),e.closest(t)}function pe(e,t){return Array.prototype.find?e.find(t):e.filter(t)[0]}function le(e){var t=e.settings,n=t.position,i=t.popperOptions,r=t.offset,o=t.distance,a=e.el,s=e.popper,p=s.querySelector(Ze.tooltip),l=Ke({placement:n},i||{},{modifiers:Ke({},i?i.modifiers:{},{flip:Ke({padding:parseInt(o)+5},i&&i.modifiers?i.modifiers.flip:{}),offset:Ke({offset:parseInt(r)},i&&i.modifiers?i.modifiers.offset:{})}),onUpdate:function(){s.style[oe("transitionDuration")]="",p.style.top="",p.style.bottom="",p.style.left="",p.style.right="",p.style[ae(s.getAttribute("x-placement"))]=-(o-Je.distance)+"px"}});return new Ye(a,s,l)}function fe(e,t,n){var i=n.position,r=n.distance,o=n.arrow,a=n.animateFill,s=n.inertia,p=n.animation,l=n.arrowSize,f=n.size,u=n.theme,c=n.html,d=document.createElement("div");d.setAttribute("class","tippy-popper"),d.setAttribute("role","tooltip"),d.setAttribute("aria-hidden","true"),d.setAttribute("id","tippy-tooltip-"+e);var h=document.createElement("div");if(h.setAttribute("class","tippy-tooltip tippy-tooltip--"+f+" "+u+"-theme leave"),h.setAttribute("data-animation",p),o){var m=document.createElement("div");m.setAttribute("class","arrow-"+l),m.setAttribute("x-arrow",""),h.appendChild(m)}if(a){h.setAttribute("data-animatefill","");var v=document.createElement("div");v.setAttribute("class","leave"),v.setAttribute("x-circle",""),h.appendChild(v)}s&&h.setAttribute("data-inertia","");var g=document.createElement("div");if(g.setAttribute("class","tippy-tooltip-content"),c){var b=void 0;c instanceof Element?(g.innerHTML=c.innerHTML,b=c.id||"tippy-html-template"):(g.innerHTML=document.getElementById(c.replace("#","")).innerHTML,b=c),d.classList.add("html-template"),d.setAttribute("tabindex","0"),h.setAttribute("data-template-id",b)}else g.innerHTML=t;return h.style[ae(i)]=-(r-Je.distance)+"px",h.appendChild(g),d.appendChild(h),d}function ue(e,t,n){var i=[];return"manual"===e?i:(t.addEventListener(e,n.handleTrigger),i.push({event:e,handler:n.handleTrigger}),"mouseenter"===e&&(t.addEventListener("mouseleave",n.handleMouseleave),i.push({event:"mouseleave",handler:n.handleMouseleave})),"focus"===e&&(t.addEventListener("blur",n.handleBlur),i.push({event:"blur",handler:n.handleBlur})),i)}function ce(e){Ve.refs.push(e)}function de(e){var t=e.title;e.setAttribute("data-original-title",t||"html"),e.removeAttribute("title")}function he(e){var t=e.getBoundingClientRect();return t.top>=0&&t.left>=0&&t.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&t.right<=(window.innerWidth||document.documentElement.clientWidth)}function me(e){var t=this,n=pe(Ve.refs,function(e){return e.el===t}),i=n.popper,r=ae(i.getAttribute("x-placement")),o=Math.round(i.offsetWidth/2),a=Math.round(i.offsetHeight/2),s=document.documentElement.offsetWidth||document.body.offsetWidth,p=e.pageX,l=e.pageY,f=void 0,u=void 0;"top"===r?(f=p-o,u=l-2.5*a):"left"===r?(f=p-2*o-15,u=l-a):"right"===r?(f=p+a,u=l-a):"bottom"===r&&(f=p-o,u=l+a/1.5),"top"!==r&&"bottom"!==r||(p+5+o>s?f=s-5-2*o:p-5-o<0&&(f=5)),i.style[oe("transform")]="translate3d("+f+"px, "+u+"px, 0)"}function ve(e,t){t?window.getComputedStyle(t)[oe("transform")]:window.getComputedStyle(e).opacity}function ge(e,t){e.forEach(function(e){e&&t(e.classList)})}function be(e,t){var n=t;e.forEach(function(e){e&&(n=t,e.hasAttribute("x-circle")&&(n=Math.round(n/1.2)),e.style[oe("transitionDuration")]=n+"ms")})}function we(e,t,n){var i=e.popper.querySelector(Ze.tooltip),r=!1,o=function e(t){t.target===i&&(r=!0,i.removeEventListener("webkitTransitionEnd",e),i.removeEventListener("transitionend",e),n())};i.addEventListener("webkitTransitionEnd",o),i.addEventListener("transitionend",o),clearTimeout(e.transitionendTimeout),e.transitionendTimeout=setTimeout(function(){!r&&n()},t)}function ye(e,t){var n=e.style.visibility;return"show"===t?"visible"===n:"hidden"===n}function Ee(e){var t=e.el,n=(e.popper,e.settings.appendTo),i=e.settings.followCursor;n.appendChild(e.popper),e.popperInstance?(e.popperInstance.update(),!i&&e.popperInstance.enableEventListeners()):(e.popperInstance=le(e),i&&!Ge.touchUser&&(t.addEventListener("mousemove",me),e.popperInstance.disableEventListeners()))}function Oe(e){var t=e.popper,n=e.popperInstance,i=e.settings.stickyDuration,r=function(){return t.style[oe("transitionDuration")]=i+"ms"},o=function(){return t.style[oe("transitionDuration")]=""},a=function t(){n&&n.scheduleUpdate(),r();var i=!e.hidden;window.requestAnimationFrame?i?window.requestAnimationFrame(t):(window.cancelAnimationFrame(t),o()):i?setTimeout(t,20):o()};setTimeout(a,0)}function xe(e){Ve.refs.forEach(function(t){var n=t.popper,i=t.tippyInstance,r=t.settings,o=r.hideOnClick,a=r.hideDuration,s=r.trigger;if(r.appendTo.contains(n)){var p=!0===o||-1!==s.indexOf("focus"),l=!e||n!==e.popper;p&&l&&i.hide(n,a)}})}function Le(e){return e instanceof Element?[e]:[].slice.call(document.querySelectorAll(e))}for(var Te=["native code","[object MutationObserverConstructor]"],ke="undefined"!=typeof window,Ae=["Edge","Trident","Firefox"],Ce=0,Me=0;Me<Ae.length;Me+=1)if(ke&&navigator.userAgent.indexOf(Ae[Me])>=0){Ce=1;break}var Se=ke&&function(e){return Te.some(function(t){return(e||"").toString().indexOf(t)>-1})}(window.MutationObserver),He=Se?e:t,De=void 0,Ie=function(){return void 0===De&&(De=-1!==navigator.appVersion.indexOf("MSIE 10")),De},Be=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},Fe=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),Ne=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e},We=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},Pe=["auto-start","auto","auto-end","top-start","top","top-end","right-start","right","right-end","bottom-end","bottom","bottom-start","left-end","left","left-start"],je=Pe.slice(3),Ue={FLIP:"flip",CLOCKWISE:"clockwise",COUNTERCLOCKWISE:"counterclockwise"},qe={shift:{order:100,enabled:!0,fn:ee},offset:{order:200,enabled:!0,fn:Z,offset:0},preventOverflow:{order:300,enabled:!0,fn:$,priority:["left","right","top","bottom"],padding:5,boundariesElement:"scrollParent"},keepTogether:{order:400,enabled:!0,fn:V},arrow:{order:500,enabled:!0,fn:_,element:"[x-arrow]"},flip:{order:600,enabled:!0,fn:G,behavior:"flip",padding:5,boundariesElement:"viewport"},inner:{order:700,enabled:!1,fn:ne},hide:{order:800,enabled:!0,fn:te},applyStyle:{order:900,enabled:!0,fn:R,onLoad:Y,gpuAcceleration:!0}},Re={placement:"bottom",eventsEnabled:!0,removeOnDestroy:!1,onCreate:function(){},onUpdate:function(){},modifiers:qe},Ye=function(){function e(t,n){var o=this,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};Be(this,e),this.scheduleUpdate=function(){return requestAnimationFrame(o.update)},this.update=He(this.update.bind(this)),this.options=We({},e.Defaults,a),this.state={isDestroyed:!1,isCreated:!1,scrollParents:[]},this.reference=t.jquery?t[0]:t,this.popper=n.jquery?n[0]:n,i(this.popper,{position:"absolute"}),this.options.modifiers={},Object.keys(We({},e.Defaults.modifiers,a.modifiers)).forEach(function(t){o.options.modifiers[t]=We({},e.Defaults.modifiers[t]||{},a.modifiers?a.modifiers[t]:{})}),this.modifiers=Object.keys(this.options.modifiers).map(function(e){return We({name:e},o.options.modifiers[e])}).sort(function(e,t){return e.order-t.order}),this.modifiers.forEach(function(e){e.enabled&&r(e.onLoad)&&e.onLoad(o.reference,o.popper,o.options,e,o.state)}),this.update();var s=this.options.eventsEnabled;s&&this.enableEventListeners(),this.state.eventsEnabled=s}return Fe(e,[{key:"update",value:function(){return D.call(this)}},{key:"destroy",value:function(){return F.call(this)}},{key:"enableEventListeners",value:function(){return P.call(this)}},{key:"disableEventListeners",value:function(){return U.call(this)}}]),e}();Ye.Utils=("undefined"!=typeof window?window:global).PopperUtils,Ye.placements=Pe,Ye.Defaults=Re;var ze=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},_e=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),Ke=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},Xe="undefined"!=typeof window&&(!("addEventListener"in window)||/MSIE 9/i.test(navigator.userAgent)||void 0!==window.operamini),Ge={touchUser:!1,idCounter:1},Ve={refs:[]},Je=!Xe&&Object.freeze({html:!1,position:"top",animation:"shift",animateFill:!0,arrow:!1,arrowSize:"regular",delay:0,hideDelay:0,trigger:"mouseenter focus",duration:375,hideDuration:375,interactive:!1,interactiveBorder:2,theme:"dark",size:"regular",distance:10,offset:0,hideOnClick:!0,multiple:!1,followCursor:!1,inertia:!1,transitionFlip:!0,sticky:!1,stickyDuration:200,appendTo:"undefined"!=typeof document?document.body:null,popperOptions:{}}),Qe=!Xe&&Object.keys(Je),Ze={popper:".tippy-popper",tooltip:".tippy-tooltip",content:".tippy-tooltip-content",circle:"[x-circle]",arrow:"[x-arrow]",el:"[data-tooltipped]",controller:"[data-tippy-controller]"};return"undefined"!=typeof window&&"undefined"!=typeof document&&(Xe||(document.addEventListener("click",re),document.addEventListener("touchstart",ie))),function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(ze(this,e),!Xe){this.selector=t,this.settings=Object.freeze(Ke({},Je,n)),this.callbacks={wait:n.wait,beforeShown:n.beforeShown||new Function,shown:n.shown||new Function,beforeHidden:n.beforeHidden||new Function,hidden:n.hidden||new Function};var i=Le(t);this._createTooltips(i)}}return _e(e,[{key:"_applyIndividualSettings",value:function(e){var t=this,n={};return Qe.forEach(function(i){var r=e.getAttribute("data-"+i.toLowerCase())||t.settings[i];"false"===r&&(r=!1),n[i]=r}),n.arrow&&(n.animateFill=!1),Ke({},this.settings,n)}},{key:"_getEventListenerHandlers",value:function(e,t,n){var i=this,r=(n.position,n.delay),o=n.hideDelay,a=n.hideDuration,s=n.duration,p=n.interactive,l=n.interactiveBorder,f=n.distance,u=n.hideOnClick,c=n.trigger,d=function(){clearTimeout(t.getAttribute("data-delay")),clearTimeout(t.getAttribute("data-hidedelay"))},h=function(){if(d(),"visible"!==t.style.visibility)if(r){var e=setTimeout(function(){return i.show(t,s)},r);t.setAttribute("data-delay",e)}else i.show(t,s)},m=function(e){return i.callbacks.wait?i.callbacks.wait.call(t,h,e):h()},v=function(){if(d(),o){var e=setTimeout(function(){return i.hide(t,a)},o);t.setAttribute("data-hidedelay",e)}else i.hide(t,a)};return{handleTrigger:function(e){var n="click"===e.type,i="visible"===t.style.visibility,r="persistent"!==u;n&&i&&r?v():m(e)},handleMouseleave:function(n){if(p){var i=function n(i){var r=function(){document.removeEventListener("mousemove",n),v()},o=se(i.target,Ze.el),a=se(i.target,Ze.popper)===t,s=o===e,p=-1!==c.indexOf("click");if(o&&o!==e)return r();if(!(a||s||p)&&t.getAttribute("x-placement")){var u=i.clientX,d=i.clientY,h=t.getBoundingClientRect(),m=ae(t.getAttribute("x-placement")),g=parseInt(l),b=g+parseInt(f),w=h.top-d>g,y=d-h.bottom>g,E=h.left-u>g,O=u-h.right>g;"top"===m?w=h.top-d>b:"bottom"===m?y=d-h.bottom>b:"left"===m?E=h.left-u>b:"right"===m&&(O=u-h.right>b),(w||y||E||O)&&r()}};return document.addEventListener("mousemove",i)}v()},handleBlur:function(e){!Ge.touchUser&&e.relatedTarget&&(se(e.relatedTarget,Ze.popper)||v())}}}},{key:"_createTooltips",value:function(t){var n=this;t.forEach(function(e){var t=n._applyIndividualSettings(e),i=t.html,r=t.trigger,o=e.title;if(o||i){var a=Ge.idCounter;e.setAttribute("data-tooltipped",""),e.setAttribute("aria-describedby","tippy-tooltip-"+a),de(e);var s=fe(a,o,t),p=n._getEventListenerHandlers(e,s,t),l=[];r.trim().split(" ").forEach(function(t){return l=l.concat(ue(t,e,p))}),ce({id:a,el:e,popper:s,settings:t,listeners:l,tippyInstance:n}),Ge.idCounter++}}),e.store=Ve}},{key:"getPopperElement",value:function(e){try{return pe(Ve.refs,function(t){return t.el===e}).popper}catch(e){throw new Error("[Tippy error]: Element does not exist in any Tippy instances")}}},{key:"getTooltippedElement",value:function(e){try{return pe(Ve.refs,function(t){return t.popper===e}).el}catch(e){throw new Error("[Tippy error]: Popper does not exist in any Tippy instances")}}},{key:"show",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.settings.duration;this.callbacks.beforeShown.call(e);var i=pe(Ve.refs,function(t){return t.popper===e}),r=e.querySelector(Ze.tooltip),o=e.querySelector(Ze.circle),a=i.el,s=i.settings,p=s.appendTo,l=s.sticky,f=s.interactive,u=s.followCursor,c=s.transitionFlip;be([r,o],0),!p.contains(e)&&Ee(i),i.hidden=!1,e.style.visibility="visible",e.setAttribute("aria-hidden","false"),setTimeout(function(){!u&&i.popperInstance.update(),be([r,o],n),f&&a.classList.add("active"),l&&Oe(i),ve(r,o),ge([r,o],function(e){e.remove("leave"),e.add("enter")}),we(i,n,function(){ye(e,"show")&&!i.onShownFired&&(!c&&r.classList.add("tippy-notransition"),f&&e.focus(),i.onShownFired=!0,t.callbacks.shown.call(e))})},0)}},{key:"hide",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.settings.duration;this.callbacks.beforeHidden.call(e);var i=pe(Ve.refs,function(t){return t.popper===e}),r=e.querySelector(Ze.tooltip),o=e.querySelector(Ze.circle),a=(e.querySelector(Ze.content),i.el),s=i.settings,p=s.appendTo,l=(s.sticky,s.interactive),f=(s.followCursor,s.html),u=s.trigger,c=s.transitionFlip;i.hidden=!0,i.onShownFired=!1,l&&i.el.classList.remove("active"),!c&&r.classList.remove("tippy-notransition"),e.style.visibility="hidden",e.setAttribute("aria-hidden","true"),n===Je.hideDuration?n=parseInt(r.style[oe("transitionDuration")]):be([r,o],n),ge([r,o],function(e){e.remove("enter"),e.add("leave")}),f&&-1!==u.indexOf("click")&&he(a)&&a.focus(),we(i,n,function(){ye(e,"hide")&&p.contains(e)&&(i.popperInstance.disableEventListeners(),p.removeChild(e),t.callbacks.hidden.call(e))})}},{key:"destroy",value:function(e){var t=pe(Ve.refs,function(t){return t.popper===e}),n=t.el,i=t.popperInstance;t.listeners.forEach(function(e){return n.removeEventListener(e.event,e.handler)}),n.removeAttribute("data-tooltipped"),n.removeAttribute("aria-describedby"),i&&i.destroy(),Ve.refs.splice(Ve.refs.map(function(e){return e.popper}).indexOf(e),1)}},{key:"update",value:function(e){var t=pe(Ve.refs,function(t){return t.popper===e}),n=e.querySelector(Ze.content),i=t.el,r=t.settings.html;r?n.innerHTML=r instanceof Element?r.innerHTML:document.getElementById(r.replace("#","")).innerHTML:(n.innerHTML=i.title||i.getAttribute("data-original-title"),de(i))}}]),e}()});
