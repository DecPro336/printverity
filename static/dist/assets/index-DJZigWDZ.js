(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();function g0(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var eg={exports:{}},Jl={},tg={exports:{}},Ye={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Qa=Symbol.for("react.element"),_0=Symbol.for("react.portal"),v0=Symbol.for("react.fragment"),x0=Symbol.for("react.strict_mode"),S0=Symbol.for("react.profiler"),y0=Symbol.for("react.provider"),M0=Symbol.for("react.context"),E0=Symbol.for("react.forward_ref"),w0=Symbol.for("react.suspense"),T0=Symbol.for("react.memo"),b0=Symbol.for("react.lazy"),Uf=Symbol.iterator;function A0(t){return t===null||typeof t!="object"?null:(t=Uf&&t[Uf]||t["@@iterator"],typeof t=="function"?t:null)}var ng={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},ig=Object.assign,rg={};function Ws(t,e,n){this.props=t,this.context=e,this.refs=rg,this.updater=n||ng}Ws.prototype.isReactComponent={};Ws.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Ws.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function sg(){}sg.prototype=Ws.prototype;function uh(t,e,n){this.props=t,this.context=e,this.refs=rg,this.updater=n||ng}var dh=uh.prototype=new sg;dh.constructor=uh;ig(dh,Ws.prototype);dh.isPureReactComponent=!0;var Ff=Array.isArray,ag=Object.prototype.hasOwnProperty,hh={current:null},og={key:!0,ref:!0,__self:!0,__source:!0};function lg(t,e,n){var i,r={},s=null,a=null;if(e!=null)for(i in e.ref!==void 0&&(a=e.ref),e.key!==void 0&&(s=""+e.key),e)ag.call(e,i)&&!og.hasOwnProperty(i)&&(r[i]=e[i]);var o=arguments.length-2;if(o===1)r.children=n;else if(1<o){for(var l=Array(o),c=0;c<o;c++)l[c]=arguments[c+2];r.children=l}if(t&&t.defaultProps)for(i in o=t.defaultProps,o)r[i]===void 0&&(r[i]=o[i]);return{$$typeof:Qa,type:t,key:s,ref:a,props:r,_owner:hh.current}}function C0(t,e){return{$$typeof:Qa,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function fh(t){return typeof t=="object"&&t!==null&&t.$$typeof===Qa}function R0(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Of=/\/+/g;function Mc(t,e){return typeof t=="object"&&t!==null&&t.key!=null?R0(""+t.key):e.toString(36)}function tl(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var a=!1;if(t===null)a=!0;else switch(s){case"string":case"number":a=!0;break;case"object":switch(t.$$typeof){case Qa:case _0:a=!0}}if(a)return a=t,r=r(a),t=i===""?"."+Mc(a,0):i,Ff(r)?(n="",t!=null&&(n=t.replace(Of,"$&/")+"/"),tl(r,e,n,"",function(c){return c})):r!=null&&(fh(r)&&(r=C0(r,n+(!r.key||a&&a.key===r.key?"":(""+r.key).replace(Of,"$&/")+"/")+t)),e.push(r)),1;if(a=0,i=i===""?".":i+":",Ff(t))for(var o=0;o<t.length;o++){s=t[o];var l=i+Mc(s,o);a+=tl(s,e,n,l,r)}else if(l=A0(t),typeof l=="function")for(t=l.call(t),o=0;!(s=t.next()).done;)s=s.value,l=i+Mc(s,o++),a+=tl(s,e,n,l,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return a}function oo(t,e,n){if(t==null)return t;var i=[],r=0;return tl(t,i,"","",function(s){return e.call(n,s,r++)}),i}function P0(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var hn={current:null},nl={transition:null},N0={ReactCurrentDispatcher:hn,ReactCurrentBatchConfig:nl,ReactCurrentOwner:hh};function cg(){throw Error("act(...) is not supported in production builds of React.")}Ye.Children={map:oo,forEach:function(t,e,n){oo(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return oo(t,function(){e++}),e},toArray:function(t){return oo(t,function(e){return e})||[]},only:function(t){if(!fh(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};Ye.Component=Ws;Ye.Fragment=v0;Ye.Profiler=S0;Ye.PureComponent=uh;Ye.StrictMode=x0;Ye.Suspense=w0;Ye.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=N0;Ye.act=cg;Ye.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=ig({},t.props),r=t.key,s=t.ref,a=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,a=hh.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var o=t.type.defaultProps;for(l in e)ag.call(e,l)&&!og.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&o!==void 0?o[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){o=Array(l);for(var c=0;c<l;c++)o[c]=arguments[c+2];i.children=o}return{$$typeof:Qa,type:t.type,key:r,ref:s,props:i,_owner:a}};Ye.createContext=function(t){return t={$$typeof:M0,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:y0,_context:t},t.Consumer=t};Ye.createElement=lg;Ye.createFactory=function(t){var e=lg.bind(null,t);return e.type=t,e};Ye.createRef=function(){return{current:null}};Ye.forwardRef=function(t){return{$$typeof:E0,render:t}};Ye.isValidElement=fh;Ye.lazy=function(t){return{$$typeof:b0,_payload:{_status:-1,_result:t},_init:P0}};Ye.memo=function(t,e){return{$$typeof:T0,type:t,compare:e===void 0?null:e}};Ye.startTransition=function(t){var e=nl.transition;nl.transition={};try{t()}finally{nl.transition=e}};Ye.unstable_act=cg;Ye.useCallback=function(t,e){return hn.current.useCallback(t,e)};Ye.useContext=function(t){return hn.current.useContext(t)};Ye.useDebugValue=function(){};Ye.useDeferredValue=function(t){return hn.current.useDeferredValue(t)};Ye.useEffect=function(t,e){return hn.current.useEffect(t,e)};Ye.useId=function(){return hn.current.useId()};Ye.useImperativeHandle=function(t,e,n){return hn.current.useImperativeHandle(t,e,n)};Ye.useInsertionEffect=function(t,e){return hn.current.useInsertionEffect(t,e)};Ye.useLayoutEffect=function(t,e){return hn.current.useLayoutEffect(t,e)};Ye.useMemo=function(t,e){return hn.current.useMemo(t,e)};Ye.useReducer=function(t,e,n){return hn.current.useReducer(t,e,n)};Ye.useRef=function(t){return hn.current.useRef(t)};Ye.useState=function(t){return hn.current.useState(t)};Ye.useSyncExternalStore=function(t,e,n){return hn.current.useSyncExternalStore(t,e,n)};Ye.useTransition=function(){return hn.current.useTransition()};Ye.version="18.3.1";tg.exports=Ye;var te=tg.exports;const L0=g0(te);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var D0=te,I0=Symbol.for("react.element"),U0=Symbol.for("react.fragment"),F0=Object.prototype.hasOwnProperty,O0=D0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,k0={key:!0,ref:!0,__self:!0,__source:!0};function ug(t,e,n){var i,r={},s=null,a=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(a=e.ref);for(i in e)F0.call(e,i)&&!k0.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:I0,type:t,key:s,ref:a,props:r,_owner:O0.current}}Jl.Fragment=U0;Jl.jsx=ug;Jl.jsxs=ug;eg.exports=Jl;var u=eg.exports,dg={exports:{}},Nn={},hg={exports:{}},fg={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(k,z){var D=k.length;k.push(z);e:for(;0<D;){var Y=D-1>>>1,oe=k[Y];if(0<r(oe,z))k[Y]=z,k[D]=oe,D=Y;else break e}}function n(k){return k.length===0?null:k[0]}function i(k){if(k.length===0)return null;var z=k[0],D=k.pop();if(D!==z){k[0]=D;e:for(var Y=0,oe=k.length,ge=oe>>>1;Y<ge;){var He=2*(Y+1)-1,ke=k[He],Ie=He+1,Z=k[Ie];if(0>r(ke,D))Ie<oe&&0>r(Z,ke)?(k[Y]=Z,k[Ie]=D,Y=Ie):(k[Y]=ke,k[He]=D,Y=He);else if(Ie<oe&&0>r(Z,D))k[Y]=Z,k[Ie]=D,Y=Ie;else break e}}return z}function r(k,z){var D=k.sortIndex-z.sortIndex;return D!==0?D:k.id-z.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var a=Date,o=a.now();t.unstable_now=function(){return a.now()-o}}var l=[],c=[],f=1,p=null,d=3,m=!1,_=!1,E=!1,v=typeof setTimeout=="function"?setTimeout:null,h=typeof clearTimeout=="function"?clearTimeout:null,g=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function M(k){for(var z=n(c);z!==null;){if(z.callback===null)i(c);else if(z.startTime<=k)i(c),z.sortIndex=z.expirationTime,e(l,z);else break;z=n(c)}}function x(k){if(E=!1,M(k),!_)if(n(l)!==null)_=!0,I(w);else{var z=n(c);z!==null&&U(x,z.startTime-k)}}function w(k,z){_=!1,E&&(E=!1,h(y),y=-1),m=!0;var D=d;try{for(M(z),p=n(l);p!==null&&(!(p.expirationTime>z)||k&&!P());){var Y=p.callback;if(typeof Y=="function"){p.callback=null,d=p.priorityLevel;var oe=Y(p.expirationTime<=z);z=t.unstable_now(),typeof oe=="function"?p.callback=oe:p===n(l)&&i(l),M(z)}else i(l);p=n(l)}if(p!==null)var ge=!0;else{var He=n(c);He!==null&&U(x,He.startTime-z),ge=!1}return ge}finally{p=null,d=D,m=!1}}var b=!1,A=null,y=-1,C=5,N=-1;function P(){return!(t.unstable_now()-N<C)}function H(){if(A!==null){var k=t.unstable_now();N=k;var z=!0;try{z=A(!0,k)}finally{z?W():(b=!1,A=null)}}else b=!1}var W;if(typeof g=="function")W=function(){g(H)};else if(typeof MessageChannel<"u"){var L=new MessageChannel,j=L.port2;L.port1.onmessage=H,W=function(){j.postMessage(null)}}else W=function(){v(H,0)};function I(k){A=k,b||(b=!0,W())}function U(k,z){y=v(function(){k(t.unstable_now())},z)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(k){k.callback=null},t.unstable_continueExecution=function(){_||m||(_=!0,I(w))},t.unstable_forceFrameRate=function(k){0>k||125<k?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):C=0<k?Math.floor(1e3/k):5},t.unstable_getCurrentPriorityLevel=function(){return d},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(k){switch(d){case 1:case 2:case 3:var z=3;break;default:z=d}var D=d;d=z;try{return k()}finally{d=D}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(k,z){switch(k){case 1:case 2:case 3:case 4:case 5:break;default:k=3}var D=d;d=k;try{return z()}finally{d=D}},t.unstable_scheduleCallback=function(k,z,D){var Y=t.unstable_now();switch(typeof D=="object"&&D!==null?(D=D.delay,D=typeof D=="number"&&0<D?Y+D:Y):D=Y,k){case 1:var oe=-1;break;case 2:oe=250;break;case 5:oe=1073741823;break;case 4:oe=1e4;break;default:oe=5e3}return oe=D+oe,k={id:f++,callback:z,priorityLevel:k,startTime:D,expirationTime:oe,sortIndex:-1},D>Y?(k.sortIndex=D,e(c,k),n(l)===null&&k===n(c)&&(E?(h(y),y=-1):E=!0,U(x,D-Y))):(k.sortIndex=oe,e(l,k),_||m||(_=!0,I(w))),k},t.unstable_shouldYield=P,t.unstable_wrapCallback=function(k){var z=d;return function(){var D=d;d=z;try{return k.apply(this,arguments)}finally{d=D}}}})(fg);hg.exports=fg;var B0=hg.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var z0=te,Pn=B0;function se(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var pg=new Set,Ra={};function Xr(t,e){Fs(t,e),Fs(t+"Capture",e)}function Fs(t,e){for(Ra[t]=e,t=0;t<e.length;t++)pg.add(e[t])}var Bi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Ru=Object.prototype.hasOwnProperty,H0=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,kf={},Bf={};function V0(t){return Ru.call(Bf,t)?!0:Ru.call(kf,t)?!1:H0.test(t)?Bf[t]=!0:(kf[t]=!0,!1)}function G0(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function j0(t,e,n,i){if(e===null||typeof e>"u"||G0(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function fn(t,e,n,i,r,s,a){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=a}var Yt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Yt[t]=new fn(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Yt[e]=new fn(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Yt[t]=new fn(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Yt[t]=new fn(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Yt[t]=new fn(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Yt[t]=new fn(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Yt[t]=new fn(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Yt[t]=new fn(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Yt[t]=new fn(t,5,!1,t.toLowerCase(),null,!1,!1)});var ph=/[\-:]([a-z])/g;function mh(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(ph,mh);Yt[e]=new fn(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(ph,mh);Yt[e]=new fn(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(ph,mh);Yt[e]=new fn(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Yt[t]=new fn(t,1,!1,t.toLowerCase(),null,!1,!1)});Yt.xlinkHref=new fn("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Yt[t]=new fn(t,1,!1,t.toLowerCase(),null,!0,!0)});function gh(t,e,n,i){var r=Yt.hasOwnProperty(e)?Yt[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(j0(e,n,r,i)&&(n=null),i||r===null?V0(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var ji=z0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,lo=Symbol.for("react.element"),hs=Symbol.for("react.portal"),fs=Symbol.for("react.fragment"),_h=Symbol.for("react.strict_mode"),Pu=Symbol.for("react.profiler"),mg=Symbol.for("react.provider"),gg=Symbol.for("react.context"),vh=Symbol.for("react.forward_ref"),Nu=Symbol.for("react.suspense"),Lu=Symbol.for("react.suspense_list"),xh=Symbol.for("react.memo"),er=Symbol.for("react.lazy"),_g=Symbol.for("react.offscreen"),zf=Symbol.iterator;function Zs(t){return t===null||typeof t!="object"?null:(t=zf&&t[zf]||t["@@iterator"],typeof t=="function"?t:null)}var bt=Object.assign,Ec;function ha(t){if(Ec===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Ec=e&&e[1]||""}return`
`+Ec+t}var wc=!1;function Tc(t,e){if(!t||wc)return"";wc=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var i=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){i=c}t.call(e.prototype)}else{try{throw Error()}catch(c){i=c}t()}}catch(c){if(c&&i&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),s=i.stack.split(`
`),a=r.length-1,o=s.length-1;1<=a&&0<=o&&r[a]!==s[o];)o--;for(;1<=a&&0<=o;a--,o--)if(r[a]!==s[o]){if(a!==1||o!==1)do if(a--,o--,0>o||r[a]!==s[o]){var l=`
`+r[a].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=a&&0<=o);break}}}finally{wc=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?ha(t):""}function W0(t){switch(t.tag){case 5:return ha(t.type);case 16:return ha("Lazy");case 13:return ha("Suspense");case 19:return ha("SuspenseList");case 0:case 2:case 15:return t=Tc(t.type,!1),t;case 11:return t=Tc(t.type.render,!1),t;case 1:return t=Tc(t.type,!0),t;default:return""}}function Du(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case fs:return"Fragment";case hs:return"Portal";case Pu:return"Profiler";case _h:return"StrictMode";case Nu:return"Suspense";case Lu:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case gg:return(t.displayName||"Context")+".Consumer";case mg:return(t._context.displayName||"Context")+".Provider";case vh:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case xh:return e=t.displayName||null,e!==null?e:Du(t.type)||"Memo";case er:e=t._payload,t=t._init;try{return Du(t(e))}catch{}}return null}function X0(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Du(e);case 8:return e===_h?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function mr(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function vg(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function $0(t){var e=vg(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(a){i=""+a,s.call(this,a)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(a){i=""+a},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function co(t){t._valueTracker||(t._valueTracker=$0(t))}function xg(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=vg(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function Sl(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Iu(t,e){var n=e.checked;return bt({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Hf(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=mr(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function Sg(t,e){e=e.checked,e!=null&&gh(t,"checked",e,!1)}function Uu(t,e){Sg(t,e);var n=mr(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?Fu(t,e.type,n):e.hasOwnProperty("defaultValue")&&Fu(t,e.type,mr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Vf(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function Fu(t,e,n){(e!=="number"||Sl(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var fa=Array.isArray;function bs(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+mr(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function Ou(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(se(91));return bt({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Gf(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(se(92));if(fa(n)){if(1<n.length)throw Error(se(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:mr(n)}}function yg(t,e){var n=mr(e.value),i=mr(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function jf(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function Mg(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function ku(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?Mg(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var uo,Eg=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(uo=uo||document.createElement("div"),uo.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=uo.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function Pa(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var va={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Y0=["Webkit","ms","Moz","O"];Object.keys(va).forEach(function(t){Y0.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),va[e]=va[t]})});function wg(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||va.hasOwnProperty(t)&&va[t]?(""+e).trim():e+"px"}function Tg(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=wg(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var q0=bt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Bu(t,e){if(e){if(q0[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(se(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(se(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(se(61))}if(e.style!=null&&typeof e.style!="object")throw Error(se(62))}}function zu(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Hu=null;function Sh(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Vu=null,As=null,Cs=null;function Wf(t){if(t=to(t)){if(typeof Vu!="function")throw Error(se(280));var e=t.stateNode;e&&(e=rc(e),Vu(t.stateNode,t.type,e))}}function bg(t){As?Cs?Cs.push(t):Cs=[t]:As=t}function Ag(){if(As){var t=As,e=Cs;if(Cs=As=null,Wf(t),e)for(t=0;t<e.length;t++)Wf(e[t])}}function Cg(t,e){return t(e)}function Rg(){}var bc=!1;function Pg(t,e,n){if(bc)return t(e,n);bc=!0;try{return Cg(t,e,n)}finally{bc=!1,(As!==null||Cs!==null)&&(Rg(),Ag())}}function Na(t,e){var n=t.stateNode;if(n===null)return null;var i=rc(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(se(231,e,typeof n));return n}var Gu=!1;if(Bi)try{var Qs={};Object.defineProperty(Qs,"passive",{get:function(){Gu=!0}}),window.addEventListener("test",Qs,Qs),window.removeEventListener("test",Qs,Qs)}catch{Gu=!1}function K0(t,e,n,i,r,s,a,o,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(f){this.onError(f)}}var xa=!1,yl=null,Ml=!1,ju=null,Z0={onError:function(t){xa=!0,yl=t}};function Q0(t,e,n,i,r,s,a,o,l){xa=!1,yl=null,K0.apply(Z0,arguments)}function J0(t,e,n,i,r,s,a,o,l){if(Q0.apply(this,arguments),xa){if(xa){var c=yl;xa=!1,yl=null}else throw Error(se(198));Ml||(Ml=!0,ju=c)}}function $r(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function Ng(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Xf(t){if($r(t)!==t)throw Error(se(188))}function ex(t){var e=t.alternate;if(!e){if(e=$r(t),e===null)throw Error(se(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return Xf(r),t;if(s===i)return Xf(r),e;s=s.sibling}throw Error(se(188))}if(n.return!==i.return)n=r,i=s;else{for(var a=!1,o=r.child;o;){if(o===n){a=!0,n=r,i=s;break}if(o===i){a=!0,i=r,n=s;break}o=o.sibling}if(!a){for(o=s.child;o;){if(o===n){a=!0,n=s,i=r;break}if(o===i){a=!0,i=s,n=r;break}o=o.sibling}if(!a)throw Error(se(189))}}if(n.alternate!==i)throw Error(se(190))}if(n.tag!==3)throw Error(se(188));return n.stateNode.current===n?t:e}function Lg(t){return t=ex(t),t!==null?Dg(t):null}function Dg(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=Dg(t);if(e!==null)return e;t=t.sibling}return null}var Ig=Pn.unstable_scheduleCallback,$f=Pn.unstable_cancelCallback,tx=Pn.unstable_shouldYield,nx=Pn.unstable_requestPaint,Rt=Pn.unstable_now,ix=Pn.unstable_getCurrentPriorityLevel,yh=Pn.unstable_ImmediatePriority,Ug=Pn.unstable_UserBlockingPriority,El=Pn.unstable_NormalPriority,rx=Pn.unstable_LowPriority,Fg=Pn.unstable_IdlePriority,ec=null,mi=null;function sx(t){if(mi&&typeof mi.onCommitFiberRoot=="function")try{mi.onCommitFiberRoot(ec,t,void 0,(t.current.flags&128)===128)}catch{}}var ei=Math.clz32?Math.clz32:lx,ax=Math.log,ox=Math.LN2;function lx(t){return t>>>=0,t===0?32:31-(ax(t)/ox|0)|0}var ho=64,fo=4194304;function pa(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function wl(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,a=n&268435455;if(a!==0){var o=a&~r;o!==0?i=pa(o):(s&=a,s!==0&&(i=pa(s)))}else a=n&~r,a!==0?i=pa(a):s!==0&&(i=pa(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-ei(e),r=1<<n,i|=t[n],e&=~r;return i}function cx(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ux(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var a=31-ei(s),o=1<<a,l=r[a];l===-1?(!(o&n)||o&i)&&(r[a]=cx(o,e)):l<=e&&(t.expiredLanes|=o),s&=~o}}function Wu(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function Og(){var t=ho;return ho<<=1,!(ho&4194240)&&(ho=64),t}function Ac(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Ja(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-ei(e),t[e]=n}function dx(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-ei(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function Mh(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-ei(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var ct=0;function kg(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var Bg,Eh,zg,Hg,Vg,Xu=!1,po=[],or=null,lr=null,cr=null,La=new Map,Da=new Map,nr=[],hx="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Yf(t,e){switch(t){case"focusin":case"focusout":or=null;break;case"dragenter":case"dragleave":lr=null;break;case"mouseover":case"mouseout":cr=null;break;case"pointerover":case"pointerout":La.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Da.delete(e.pointerId)}}function Js(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=to(e),e!==null&&Eh(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function fx(t,e,n,i,r){switch(e){case"focusin":return or=Js(or,t,e,n,i,r),!0;case"dragenter":return lr=Js(lr,t,e,n,i,r),!0;case"mouseover":return cr=Js(cr,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return La.set(s,Js(La.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,Da.set(s,Js(Da.get(s)||null,t,e,n,i,r)),!0}return!1}function Gg(t){var e=Nr(t.target);if(e!==null){var n=$r(e);if(n!==null){if(e=n.tag,e===13){if(e=Ng(n),e!==null){t.blockedOn=e,Vg(t.priority,function(){zg(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function il(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=$u(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);Hu=i,n.target.dispatchEvent(i),Hu=null}else return e=to(n),e!==null&&Eh(e),t.blockedOn=n,!1;e.shift()}return!0}function qf(t,e,n){il(t)&&n.delete(e)}function px(){Xu=!1,or!==null&&il(or)&&(or=null),lr!==null&&il(lr)&&(lr=null),cr!==null&&il(cr)&&(cr=null),La.forEach(qf),Da.forEach(qf)}function ea(t,e){t.blockedOn===e&&(t.blockedOn=null,Xu||(Xu=!0,Pn.unstable_scheduleCallback(Pn.unstable_NormalPriority,px)))}function Ia(t){function e(r){return ea(r,t)}if(0<po.length){ea(po[0],t);for(var n=1;n<po.length;n++){var i=po[n];i.blockedOn===t&&(i.blockedOn=null)}}for(or!==null&&ea(or,t),lr!==null&&ea(lr,t),cr!==null&&ea(cr,t),La.forEach(e),Da.forEach(e),n=0;n<nr.length;n++)i=nr[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<nr.length&&(n=nr[0],n.blockedOn===null);)Gg(n),n.blockedOn===null&&nr.shift()}var Rs=ji.ReactCurrentBatchConfig,Tl=!0;function mx(t,e,n,i){var r=ct,s=Rs.transition;Rs.transition=null;try{ct=1,wh(t,e,n,i)}finally{ct=r,Rs.transition=s}}function gx(t,e,n,i){var r=ct,s=Rs.transition;Rs.transition=null;try{ct=4,wh(t,e,n,i)}finally{ct=r,Rs.transition=s}}function wh(t,e,n,i){if(Tl){var r=$u(t,e,n,i);if(r===null)Oc(t,e,i,bl,n),Yf(t,i);else if(fx(r,t,e,n,i))i.stopPropagation();else if(Yf(t,i),e&4&&-1<hx.indexOf(t)){for(;r!==null;){var s=to(r);if(s!==null&&Bg(s),s=$u(t,e,n,i),s===null&&Oc(t,e,i,bl,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else Oc(t,e,i,null,n)}}var bl=null;function $u(t,e,n,i){if(bl=null,t=Sh(i),t=Nr(t),t!==null)if(e=$r(t),e===null)t=null;else if(n=e.tag,n===13){if(t=Ng(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return bl=t,null}function jg(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(ix()){case yh:return 1;case Ug:return 4;case El:case rx:return 16;case Fg:return 536870912;default:return 16}default:return 16}}var sr=null,Th=null,rl=null;function Wg(){if(rl)return rl;var t,e=Th,n=e.length,i,r="value"in sr?sr.value:sr.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var a=n-t;for(i=1;i<=a&&e[n-i]===r[s-i];i++);return rl=r.slice(t,1<i?1-i:void 0)}function sl(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function mo(){return!0}function Kf(){return!1}function Ln(t){function e(n,i,r,s,a){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=a,this.currentTarget=null;for(var o in t)t.hasOwnProperty(o)&&(n=t[o],this[o]=n?n(s):s[o]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?mo:Kf,this.isPropagationStopped=Kf,this}return bt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=mo)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=mo)},persist:function(){},isPersistent:mo}),e}var Xs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},bh=Ln(Xs),eo=bt({},Xs,{view:0,detail:0}),_x=Ln(eo),Cc,Rc,ta,tc=bt({},eo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ah,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==ta&&(ta&&t.type==="mousemove"?(Cc=t.screenX-ta.screenX,Rc=t.screenY-ta.screenY):Rc=Cc=0,ta=t),Cc)},movementY:function(t){return"movementY"in t?t.movementY:Rc}}),Zf=Ln(tc),vx=bt({},tc,{dataTransfer:0}),xx=Ln(vx),Sx=bt({},eo,{relatedTarget:0}),Pc=Ln(Sx),yx=bt({},Xs,{animationName:0,elapsedTime:0,pseudoElement:0}),Mx=Ln(yx),Ex=bt({},Xs,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),wx=Ln(Ex),Tx=bt({},Xs,{data:0}),Qf=Ln(Tx),bx={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Ax={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Cx={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Rx(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=Cx[t])?!!e[t]:!1}function Ah(){return Rx}var Px=bt({},eo,{key:function(t){if(t.key){var e=bx[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=sl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Ax[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ah,charCode:function(t){return t.type==="keypress"?sl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?sl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Nx=Ln(Px),Lx=bt({},tc,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Jf=Ln(Lx),Dx=bt({},eo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ah}),Ix=Ln(Dx),Ux=bt({},Xs,{propertyName:0,elapsedTime:0,pseudoElement:0}),Fx=Ln(Ux),Ox=bt({},tc,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),kx=Ln(Ox),Bx=[9,13,27,32],Ch=Bi&&"CompositionEvent"in window,Sa=null;Bi&&"documentMode"in document&&(Sa=document.documentMode);var zx=Bi&&"TextEvent"in window&&!Sa,Xg=Bi&&(!Ch||Sa&&8<Sa&&11>=Sa),ep=" ",tp=!1;function $g(t,e){switch(t){case"keyup":return Bx.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Yg(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var ps=!1;function Hx(t,e){switch(t){case"compositionend":return Yg(e);case"keypress":return e.which!==32?null:(tp=!0,ep);case"textInput":return t=e.data,t===ep&&tp?null:t;default:return null}}function Vx(t,e){if(ps)return t==="compositionend"||!Ch&&$g(t,e)?(t=Wg(),rl=Th=sr=null,ps=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Xg&&e.locale!=="ko"?null:e.data;default:return null}}var Gx={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function np(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!Gx[t.type]:e==="textarea"}function qg(t,e,n,i){bg(i),e=Al(e,"onChange"),0<e.length&&(n=new bh("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var ya=null,Ua=null;function jx(t){a_(t,0)}function nc(t){var e=_s(t);if(xg(e))return t}function Wx(t,e){if(t==="change")return e}var Kg=!1;if(Bi){var Nc;if(Bi){var Lc="oninput"in document;if(!Lc){var ip=document.createElement("div");ip.setAttribute("oninput","return;"),Lc=typeof ip.oninput=="function"}Nc=Lc}else Nc=!1;Kg=Nc&&(!document.documentMode||9<document.documentMode)}function rp(){ya&&(ya.detachEvent("onpropertychange",Zg),Ua=ya=null)}function Zg(t){if(t.propertyName==="value"&&nc(Ua)){var e=[];qg(e,Ua,t,Sh(t)),Pg(jx,e)}}function Xx(t,e,n){t==="focusin"?(rp(),ya=e,Ua=n,ya.attachEvent("onpropertychange",Zg)):t==="focusout"&&rp()}function $x(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return nc(Ua)}function Yx(t,e){if(t==="click")return nc(e)}function qx(t,e){if(t==="input"||t==="change")return nc(e)}function Kx(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var ii=typeof Object.is=="function"?Object.is:Kx;function Fa(t,e){if(ii(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!Ru.call(e,r)||!ii(t[r],e[r]))return!1}return!0}function sp(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function ap(t,e){var n=sp(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=sp(n)}}function Qg(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Qg(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function Jg(){for(var t=window,e=Sl();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Sl(t.document)}return e}function Rh(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function Zx(t){var e=Jg(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&Qg(n.ownerDocument.documentElement,n)){if(i!==null&&Rh(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=ap(n,s);var a=ap(n,i);r&&a&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==a.node||t.focusOffset!==a.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(a.node,a.offset)):(e.setEnd(a.node,a.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var Qx=Bi&&"documentMode"in document&&11>=document.documentMode,ms=null,Yu=null,Ma=null,qu=!1;function op(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;qu||ms==null||ms!==Sl(i)||(i=ms,"selectionStart"in i&&Rh(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Ma&&Fa(Ma,i)||(Ma=i,i=Al(Yu,"onSelect"),0<i.length&&(e=new bh("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=ms)))}function go(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var gs={animationend:go("Animation","AnimationEnd"),animationiteration:go("Animation","AnimationIteration"),animationstart:go("Animation","AnimationStart"),transitionend:go("Transition","TransitionEnd")},Dc={},e_={};Bi&&(e_=document.createElement("div").style,"AnimationEvent"in window||(delete gs.animationend.animation,delete gs.animationiteration.animation,delete gs.animationstart.animation),"TransitionEvent"in window||delete gs.transitionend.transition);function ic(t){if(Dc[t])return Dc[t];if(!gs[t])return t;var e=gs[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in e_)return Dc[t]=e[n];return t}var t_=ic("animationend"),n_=ic("animationiteration"),i_=ic("animationstart"),r_=ic("transitionend"),s_=new Map,lp="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function xr(t,e){s_.set(t,e),Xr(e,[t])}for(var Ic=0;Ic<lp.length;Ic++){var Uc=lp[Ic],Jx=Uc.toLowerCase(),eS=Uc[0].toUpperCase()+Uc.slice(1);xr(Jx,"on"+eS)}xr(t_,"onAnimationEnd");xr(n_,"onAnimationIteration");xr(i_,"onAnimationStart");xr("dblclick","onDoubleClick");xr("focusin","onFocus");xr("focusout","onBlur");xr(r_,"onTransitionEnd");Fs("onMouseEnter",["mouseout","mouseover"]);Fs("onMouseLeave",["mouseout","mouseover"]);Fs("onPointerEnter",["pointerout","pointerover"]);Fs("onPointerLeave",["pointerout","pointerover"]);Xr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Xr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Xr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Xr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Xr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Xr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ma="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),tS=new Set("cancel close invalid load scroll toggle".split(" ").concat(ma));function cp(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,J0(i,e,void 0,t),t.currentTarget=null}function a_(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var a=i.length-1;0<=a;a--){var o=i[a],l=o.instance,c=o.currentTarget;if(o=o.listener,l!==s&&r.isPropagationStopped())break e;cp(r,o,c),s=l}else for(a=0;a<i.length;a++){if(o=i[a],l=o.instance,c=o.currentTarget,o=o.listener,l!==s&&r.isPropagationStopped())break e;cp(r,o,c),s=l}}}if(Ml)throw t=ju,Ml=!1,ju=null,t}function _t(t,e){var n=e[ed];n===void 0&&(n=e[ed]=new Set);var i=t+"__bubble";n.has(i)||(o_(e,t,2,!1),n.add(i))}function Fc(t,e,n){var i=0;e&&(i|=4),o_(n,t,i,e)}var _o="_reactListening"+Math.random().toString(36).slice(2);function Oa(t){if(!t[_o]){t[_o]=!0,pg.forEach(function(n){n!=="selectionchange"&&(tS.has(n)||Fc(n,!1,t),Fc(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[_o]||(e[_o]=!0,Fc("selectionchange",!1,e))}}function o_(t,e,n,i){switch(jg(e)){case 1:var r=mx;break;case 4:r=gx;break;default:r=wh}n=r.bind(null,e,n,t),r=void 0,!Gu||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function Oc(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var a=i.tag;if(a===3||a===4){var o=i.stateNode.containerInfo;if(o===r||o.nodeType===8&&o.parentNode===r)break;if(a===4)for(a=i.return;a!==null;){var l=a.tag;if((l===3||l===4)&&(l=a.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;a=a.return}for(;o!==null;){if(a=Nr(o),a===null)return;if(l=a.tag,l===5||l===6){i=s=a;continue e}o=o.parentNode}}i=i.return}Pg(function(){var c=s,f=Sh(n),p=[];e:{var d=s_.get(t);if(d!==void 0){var m=bh,_=t;switch(t){case"keypress":if(sl(n)===0)break e;case"keydown":case"keyup":m=Nx;break;case"focusin":_="focus",m=Pc;break;case"focusout":_="blur",m=Pc;break;case"beforeblur":case"afterblur":m=Pc;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":m=Zf;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":m=xx;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":m=Ix;break;case t_:case n_:case i_:m=Mx;break;case r_:m=Fx;break;case"scroll":m=_x;break;case"wheel":m=kx;break;case"copy":case"cut":case"paste":m=wx;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":m=Jf}var E=(e&4)!==0,v=!E&&t==="scroll",h=E?d!==null?d+"Capture":null:d;E=[];for(var g=c,M;g!==null;){M=g;var x=M.stateNode;if(M.tag===5&&x!==null&&(M=x,h!==null&&(x=Na(g,h),x!=null&&E.push(ka(g,x,M)))),v)break;g=g.return}0<E.length&&(d=new m(d,_,null,n,f),p.push({event:d,listeners:E}))}}if(!(e&7)){e:{if(d=t==="mouseover"||t==="pointerover",m=t==="mouseout"||t==="pointerout",d&&n!==Hu&&(_=n.relatedTarget||n.fromElement)&&(Nr(_)||_[zi]))break e;if((m||d)&&(d=f.window===f?f:(d=f.ownerDocument)?d.defaultView||d.parentWindow:window,m?(_=n.relatedTarget||n.toElement,m=c,_=_?Nr(_):null,_!==null&&(v=$r(_),_!==v||_.tag!==5&&_.tag!==6)&&(_=null)):(m=null,_=c),m!==_)){if(E=Zf,x="onMouseLeave",h="onMouseEnter",g="mouse",(t==="pointerout"||t==="pointerover")&&(E=Jf,x="onPointerLeave",h="onPointerEnter",g="pointer"),v=m==null?d:_s(m),M=_==null?d:_s(_),d=new E(x,g+"leave",m,n,f),d.target=v,d.relatedTarget=M,x=null,Nr(f)===c&&(E=new E(h,g+"enter",_,n,f),E.target=M,E.relatedTarget=v,x=E),v=x,m&&_)t:{for(E=m,h=_,g=0,M=E;M;M=Kr(M))g++;for(M=0,x=h;x;x=Kr(x))M++;for(;0<g-M;)E=Kr(E),g--;for(;0<M-g;)h=Kr(h),M--;for(;g--;){if(E===h||h!==null&&E===h.alternate)break t;E=Kr(E),h=Kr(h)}E=null}else E=null;m!==null&&up(p,d,m,E,!1),_!==null&&v!==null&&up(p,v,_,E,!0)}}e:{if(d=c?_s(c):window,m=d.nodeName&&d.nodeName.toLowerCase(),m==="select"||m==="input"&&d.type==="file")var w=Wx;else if(np(d))if(Kg)w=qx;else{w=$x;var b=Xx}else(m=d.nodeName)&&m.toLowerCase()==="input"&&(d.type==="checkbox"||d.type==="radio")&&(w=Yx);if(w&&(w=w(t,c))){qg(p,w,n,f);break e}b&&b(t,d,c),t==="focusout"&&(b=d._wrapperState)&&b.controlled&&d.type==="number"&&Fu(d,"number",d.value)}switch(b=c?_s(c):window,t){case"focusin":(np(b)||b.contentEditable==="true")&&(ms=b,Yu=c,Ma=null);break;case"focusout":Ma=Yu=ms=null;break;case"mousedown":qu=!0;break;case"contextmenu":case"mouseup":case"dragend":qu=!1,op(p,n,f);break;case"selectionchange":if(Qx)break;case"keydown":case"keyup":op(p,n,f)}var A;if(Ch)e:{switch(t){case"compositionstart":var y="onCompositionStart";break e;case"compositionend":y="onCompositionEnd";break e;case"compositionupdate":y="onCompositionUpdate";break e}y=void 0}else ps?$g(t,n)&&(y="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(y="onCompositionStart");y&&(Xg&&n.locale!=="ko"&&(ps||y!=="onCompositionStart"?y==="onCompositionEnd"&&ps&&(A=Wg()):(sr=f,Th="value"in sr?sr.value:sr.textContent,ps=!0)),b=Al(c,y),0<b.length&&(y=new Qf(y,t,null,n,f),p.push({event:y,listeners:b}),A?y.data=A:(A=Yg(n),A!==null&&(y.data=A)))),(A=zx?Hx(t,n):Vx(t,n))&&(c=Al(c,"onBeforeInput"),0<c.length&&(f=new Qf("onBeforeInput","beforeinput",null,n,f),p.push({event:f,listeners:c}),f.data=A))}a_(p,e)})}function ka(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Al(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=Na(t,n),s!=null&&i.unshift(ka(t,s,r)),s=Na(t,e),s!=null&&i.push(ka(t,s,r))),t=t.return}return i}function Kr(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function up(t,e,n,i,r){for(var s=e._reactName,a=[];n!==null&&n!==i;){var o=n,l=o.alternate,c=o.stateNode;if(l!==null&&l===i)break;o.tag===5&&c!==null&&(o=c,r?(l=Na(n,s),l!=null&&a.unshift(ka(n,l,o))):r||(l=Na(n,s),l!=null&&a.push(ka(n,l,o)))),n=n.return}a.length!==0&&t.push({event:e,listeners:a})}var nS=/\r\n?/g,iS=/\u0000|\uFFFD/g;function dp(t){return(typeof t=="string"?t:""+t).replace(nS,`
`).replace(iS,"")}function vo(t,e,n){if(e=dp(e),dp(t)!==e&&n)throw Error(se(425))}function Cl(){}var Ku=null,Zu=null;function Qu(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Ju=typeof setTimeout=="function"?setTimeout:void 0,rS=typeof clearTimeout=="function"?clearTimeout:void 0,hp=typeof Promise=="function"?Promise:void 0,sS=typeof queueMicrotask=="function"?queueMicrotask:typeof hp<"u"?function(t){return hp.resolve(null).then(t).catch(aS)}:Ju;function aS(t){setTimeout(function(){throw t})}function kc(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),Ia(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);Ia(e)}function ur(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function fp(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var $s=Math.random().toString(36).slice(2),hi="__reactFiber$"+$s,Ba="__reactProps$"+$s,zi="__reactContainer$"+$s,ed="__reactEvents$"+$s,oS="__reactListeners$"+$s,lS="__reactHandles$"+$s;function Nr(t){var e=t[hi];if(e)return e;for(var n=t.parentNode;n;){if(e=n[zi]||n[hi]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=fp(t);t!==null;){if(n=t[hi])return n;t=fp(t)}return e}t=n,n=t.parentNode}return null}function to(t){return t=t[hi]||t[zi],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function _s(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(se(33))}function rc(t){return t[Ba]||null}var td=[],vs=-1;function Sr(t){return{current:t}}function vt(t){0>vs||(t.current=td[vs],td[vs]=null,vs--)}function mt(t,e){vs++,td[vs]=t.current,t.current=e}var gr={},sn=Sr(gr),xn=Sr(!1),kr=gr;function Os(t,e){var n=t.type.contextTypes;if(!n)return gr;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function Sn(t){return t=t.childContextTypes,t!=null}function Rl(){vt(xn),vt(sn)}function pp(t,e,n){if(sn.current!==gr)throw Error(se(168));mt(sn,e),mt(xn,n)}function l_(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(se(108,X0(t)||"Unknown",r));return bt({},n,i)}function Pl(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||gr,kr=sn.current,mt(sn,t),mt(xn,xn.current),!0}function mp(t,e,n){var i=t.stateNode;if(!i)throw Error(se(169));n?(t=l_(t,e,kr),i.__reactInternalMemoizedMergedChildContext=t,vt(xn),vt(sn),mt(sn,t)):vt(xn),mt(xn,n)}var Ri=null,sc=!1,Bc=!1;function c_(t){Ri===null?Ri=[t]:Ri.push(t)}function cS(t){sc=!0,c_(t)}function yr(){if(!Bc&&Ri!==null){Bc=!0;var t=0,e=ct;try{var n=Ri;for(ct=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}Ri=null,sc=!1}catch(r){throw Ri!==null&&(Ri=Ri.slice(t+1)),Ig(yh,yr),r}finally{ct=e,Bc=!1}}return null}var xs=[],Ss=0,Nl=null,Ll=0,Fn=[],On=0,Br=null,Li=1,Di="";function Rr(t,e){xs[Ss++]=Ll,xs[Ss++]=Nl,Nl=t,Ll=e}function u_(t,e,n){Fn[On++]=Li,Fn[On++]=Di,Fn[On++]=Br,Br=t;var i=Li;t=Di;var r=32-ei(i)-1;i&=~(1<<r),n+=1;var s=32-ei(e)+r;if(30<s){var a=r-r%5;s=(i&(1<<a)-1).toString(32),i>>=a,r-=a,Li=1<<32-ei(e)+r|n<<r|i,Di=s+t}else Li=1<<s|n<<r|i,Di=t}function Ph(t){t.return!==null&&(Rr(t,1),u_(t,1,0))}function Nh(t){for(;t===Nl;)Nl=xs[--Ss],xs[Ss]=null,Ll=xs[--Ss],xs[Ss]=null;for(;t===Br;)Br=Fn[--On],Fn[On]=null,Di=Fn[--On],Fn[On]=null,Li=Fn[--On],Fn[On]=null}var Rn=null,Cn=null,St=!1,Qn=null;function d_(t,e){var n=zn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function gp(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,Rn=t,Cn=ur(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,Rn=t,Cn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Br!==null?{id:Li,overflow:Di}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=zn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,Rn=t,Cn=null,!0):!1;default:return!1}}function nd(t){return(t.mode&1)!==0&&(t.flags&128)===0}function id(t){if(St){var e=Cn;if(e){var n=e;if(!gp(t,e)){if(nd(t))throw Error(se(418));e=ur(n.nextSibling);var i=Rn;e&&gp(t,e)?d_(i,n):(t.flags=t.flags&-4097|2,St=!1,Rn=t)}}else{if(nd(t))throw Error(se(418));t.flags=t.flags&-4097|2,St=!1,Rn=t}}}function _p(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;Rn=t}function xo(t){if(t!==Rn)return!1;if(!St)return _p(t),St=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Qu(t.type,t.memoizedProps)),e&&(e=Cn)){if(nd(t))throw h_(),Error(se(418));for(;e;)d_(t,e),e=ur(e.nextSibling)}if(_p(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(se(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){Cn=ur(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}Cn=null}}else Cn=Rn?ur(t.stateNode.nextSibling):null;return!0}function h_(){for(var t=Cn;t;)t=ur(t.nextSibling)}function ks(){Cn=Rn=null,St=!1}function Lh(t){Qn===null?Qn=[t]:Qn.push(t)}var uS=ji.ReactCurrentBatchConfig;function na(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(se(309));var i=n.stateNode}if(!i)throw Error(se(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(a){var o=r.refs;a===null?delete o[s]:o[s]=a},e._stringRef=s,e)}if(typeof t!="string")throw Error(se(284));if(!n._owner)throw Error(se(290,t))}return t}function So(t,e){throw t=Object.prototype.toString.call(e),Error(se(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function vp(t){var e=t._init;return e(t._payload)}function f_(t){function e(h,g){if(t){var M=h.deletions;M===null?(h.deletions=[g],h.flags|=16):M.push(g)}}function n(h,g){if(!t)return null;for(;g!==null;)e(h,g),g=g.sibling;return null}function i(h,g){for(h=new Map;g!==null;)g.key!==null?h.set(g.key,g):h.set(g.index,g),g=g.sibling;return h}function r(h,g){return h=pr(h,g),h.index=0,h.sibling=null,h}function s(h,g,M){return h.index=M,t?(M=h.alternate,M!==null?(M=M.index,M<g?(h.flags|=2,g):M):(h.flags|=2,g)):(h.flags|=1048576,g)}function a(h){return t&&h.alternate===null&&(h.flags|=2),h}function o(h,g,M,x){return g===null||g.tag!==6?(g=Xc(M,h.mode,x),g.return=h,g):(g=r(g,M),g.return=h,g)}function l(h,g,M,x){var w=M.type;return w===fs?f(h,g,M.props.children,x,M.key):g!==null&&(g.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===er&&vp(w)===g.type)?(x=r(g,M.props),x.ref=na(h,g,M),x.return=h,x):(x=hl(M.type,M.key,M.props,null,h.mode,x),x.ref=na(h,g,M),x.return=h,x)}function c(h,g,M,x){return g===null||g.tag!==4||g.stateNode.containerInfo!==M.containerInfo||g.stateNode.implementation!==M.implementation?(g=$c(M,h.mode,x),g.return=h,g):(g=r(g,M.children||[]),g.return=h,g)}function f(h,g,M,x,w){return g===null||g.tag!==7?(g=Or(M,h.mode,x,w),g.return=h,g):(g=r(g,M),g.return=h,g)}function p(h,g,M){if(typeof g=="string"&&g!==""||typeof g=="number")return g=Xc(""+g,h.mode,M),g.return=h,g;if(typeof g=="object"&&g!==null){switch(g.$$typeof){case lo:return M=hl(g.type,g.key,g.props,null,h.mode,M),M.ref=na(h,null,g),M.return=h,M;case hs:return g=$c(g,h.mode,M),g.return=h,g;case er:var x=g._init;return p(h,x(g._payload),M)}if(fa(g)||Zs(g))return g=Or(g,h.mode,M,null),g.return=h,g;So(h,g)}return null}function d(h,g,M,x){var w=g!==null?g.key:null;if(typeof M=="string"&&M!==""||typeof M=="number")return w!==null?null:o(h,g,""+M,x);if(typeof M=="object"&&M!==null){switch(M.$$typeof){case lo:return M.key===w?l(h,g,M,x):null;case hs:return M.key===w?c(h,g,M,x):null;case er:return w=M._init,d(h,g,w(M._payload),x)}if(fa(M)||Zs(M))return w!==null?null:f(h,g,M,x,null);So(h,M)}return null}function m(h,g,M,x,w){if(typeof x=="string"&&x!==""||typeof x=="number")return h=h.get(M)||null,o(g,h,""+x,w);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case lo:return h=h.get(x.key===null?M:x.key)||null,l(g,h,x,w);case hs:return h=h.get(x.key===null?M:x.key)||null,c(g,h,x,w);case er:var b=x._init;return m(h,g,M,b(x._payload),w)}if(fa(x)||Zs(x))return h=h.get(M)||null,f(g,h,x,w,null);So(g,x)}return null}function _(h,g,M,x){for(var w=null,b=null,A=g,y=g=0,C=null;A!==null&&y<M.length;y++){A.index>y?(C=A,A=null):C=A.sibling;var N=d(h,A,M[y],x);if(N===null){A===null&&(A=C);break}t&&A&&N.alternate===null&&e(h,A),g=s(N,g,y),b===null?w=N:b.sibling=N,b=N,A=C}if(y===M.length)return n(h,A),St&&Rr(h,y),w;if(A===null){for(;y<M.length;y++)A=p(h,M[y],x),A!==null&&(g=s(A,g,y),b===null?w=A:b.sibling=A,b=A);return St&&Rr(h,y),w}for(A=i(h,A);y<M.length;y++)C=m(A,h,y,M[y],x),C!==null&&(t&&C.alternate!==null&&A.delete(C.key===null?y:C.key),g=s(C,g,y),b===null?w=C:b.sibling=C,b=C);return t&&A.forEach(function(P){return e(h,P)}),St&&Rr(h,y),w}function E(h,g,M,x){var w=Zs(M);if(typeof w!="function")throw Error(se(150));if(M=w.call(M),M==null)throw Error(se(151));for(var b=w=null,A=g,y=g=0,C=null,N=M.next();A!==null&&!N.done;y++,N=M.next()){A.index>y?(C=A,A=null):C=A.sibling;var P=d(h,A,N.value,x);if(P===null){A===null&&(A=C);break}t&&A&&P.alternate===null&&e(h,A),g=s(P,g,y),b===null?w=P:b.sibling=P,b=P,A=C}if(N.done)return n(h,A),St&&Rr(h,y),w;if(A===null){for(;!N.done;y++,N=M.next())N=p(h,N.value,x),N!==null&&(g=s(N,g,y),b===null?w=N:b.sibling=N,b=N);return St&&Rr(h,y),w}for(A=i(h,A);!N.done;y++,N=M.next())N=m(A,h,y,N.value,x),N!==null&&(t&&N.alternate!==null&&A.delete(N.key===null?y:N.key),g=s(N,g,y),b===null?w=N:b.sibling=N,b=N);return t&&A.forEach(function(H){return e(h,H)}),St&&Rr(h,y),w}function v(h,g,M,x){if(typeof M=="object"&&M!==null&&M.type===fs&&M.key===null&&(M=M.props.children),typeof M=="object"&&M!==null){switch(M.$$typeof){case lo:e:{for(var w=M.key,b=g;b!==null;){if(b.key===w){if(w=M.type,w===fs){if(b.tag===7){n(h,b.sibling),g=r(b,M.props.children),g.return=h,h=g;break e}}else if(b.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===er&&vp(w)===b.type){n(h,b.sibling),g=r(b,M.props),g.ref=na(h,b,M),g.return=h,h=g;break e}n(h,b);break}else e(h,b);b=b.sibling}M.type===fs?(g=Or(M.props.children,h.mode,x,M.key),g.return=h,h=g):(x=hl(M.type,M.key,M.props,null,h.mode,x),x.ref=na(h,g,M),x.return=h,h=x)}return a(h);case hs:e:{for(b=M.key;g!==null;){if(g.key===b)if(g.tag===4&&g.stateNode.containerInfo===M.containerInfo&&g.stateNode.implementation===M.implementation){n(h,g.sibling),g=r(g,M.children||[]),g.return=h,h=g;break e}else{n(h,g);break}else e(h,g);g=g.sibling}g=$c(M,h.mode,x),g.return=h,h=g}return a(h);case er:return b=M._init,v(h,g,b(M._payload),x)}if(fa(M))return _(h,g,M,x);if(Zs(M))return E(h,g,M,x);So(h,M)}return typeof M=="string"&&M!==""||typeof M=="number"?(M=""+M,g!==null&&g.tag===6?(n(h,g.sibling),g=r(g,M),g.return=h,h=g):(n(h,g),g=Xc(M,h.mode,x),g.return=h,h=g),a(h)):n(h,g)}return v}var Bs=f_(!0),p_=f_(!1),Dl=Sr(null),Il=null,ys=null,Dh=null;function Ih(){Dh=ys=Il=null}function Uh(t){var e=Dl.current;vt(Dl),t._currentValue=e}function rd(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function Ps(t,e){Il=t,Dh=ys=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(_n=!0),t.firstContext=null)}function Vn(t){var e=t._currentValue;if(Dh!==t)if(t={context:t,memoizedValue:e,next:null},ys===null){if(Il===null)throw Error(se(308));ys=t,Il.dependencies={lanes:0,firstContext:t}}else ys=ys.next=t;return e}var Lr=null;function Fh(t){Lr===null?Lr=[t]:Lr.push(t)}function m_(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,Fh(e)):(n.next=r.next,r.next=n),e.interleaved=n,Hi(t,i)}function Hi(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var tr=!1;function Oh(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function g_(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Ui(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function dr(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,et&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,Hi(t,n)}return r=i.interleaved,r===null?(e.next=e,Fh(i)):(e.next=r.next,r.next=e),i.interleaved=e,Hi(t,n)}function al(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,Mh(t,n)}}function xp(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=a:s=s.next=a,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function Ul(t,e,n,i){var r=t.updateQueue;tr=!1;var s=r.firstBaseUpdate,a=r.lastBaseUpdate,o=r.shared.pending;if(o!==null){r.shared.pending=null;var l=o,c=l.next;l.next=null,a===null?s=c:a.next=c,a=l;var f=t.alternate;f!==null&&(f=f.updateQueue,o=f.lastBaseUpdate,o!==a&&(o===null?f.firstBaseUpdate=c:o.next=c,f.lastBaseUpdate=l))}if(s!==null){var p=r.baseState;a=0,f=c=l=null,o=s;do{var d=o.lane,m=o.eventTime;if((i&d)===d){f!==null&&(f=f.next={eventTime:m,lane:0,tag:o.tag,payload:o.payload,callback:o.callback,next:null});e:{var _=t,E=o;switch(d=e,m=n,E.tag){case 1:if(_=E.payload,typeof _=="function"){p=_.call(m,p,d);break e}p=_;break e;case 3:_.flags=_.flags&-65537|128;case 0:if(_=E.payload,d=typeof _=="function"?_.call(m,p,d):_,d==null)break e;p=bt({},p,d);break e;case 2:tr=!0}}o.callback!==null&&o.lane!==0&&(t.flags|=64,d=r.effects,d===null?r.effects=[o]:d.push(o))}else m={eventTime:m,lane:d,tag:o.tag,payload:o.payload,callback:o.callback,next:null},f===null?(c=f=m,l=p):f=f.next=m,a|=d;if(o=o.next,o===null){if(o=r.shared.pending,o===null)break;d=o,o=d.next,d.next=null,r.lastBaseUpdate=d,r.shared.pending=null}}while(!0);if(f===null&&(l=p),r.baseState=l,r.firstBaseUpdate=c,r.lastBaseUpdate=f,e=r.shared.interleaved,e!==null){r=e;do a|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);Hr|=a,t.lanes=a,t.memoizedState=p}}function Sp(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(se(191,r));r.call(i)}}}var no={},gi=Sr(no),za=Sr(no),Ha=Sr(no);function Dr(t){if(t===no)throw Error(se(174));return t}function kh(t,e){switch(mt(Ha,e),mt(za,t),mt(gi,no),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:ku(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=ku(e,t)}vt(gi),mt(gi,e)}function zs(){vt(gi),vt(za),vt(Ha)}function __(t){Dr(Ha.current);var e=Dr(gi.current),n=ku(e,t.type);e!==n&&(mt(za,t),mt(gi,n))}function Bh(t){za.current===t&&(vt(gi),vt(za))}var Mt=Sr(0);function Fl(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var zc=[];function zh(){for(var t=0;t<zc.length;t++)zc[t]._workInProgressVersionPrimary=null;zc.length=0}var ol=ji.ReactCurrentDispatcher,Hc=ji.ReactCurrentBatchConfig,zr=0,wt=null,Ft=null,Vt=null,Ol=!1,Ea=!1,Va=0,dS=0;function Zt(){throw Error(se(321))}function Hh(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!ii(t[n],e[n]))return!1;return!0}function Vh(t,e,n,i,r,s){if(zr=s,wt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,ol.current=t===null||t.memoizedState===null?mS:gS,t=n(i,r),Ea){s=0;do{if(Ea=!1,Va=0,25<=s)throw Error(se(301));s+=1,Vt=Ft=null,e.updateQueue=null,ol.current=_S,t=n(i,r)}while(Ea)}if(ol.current=kl,e=Ft!==null&&Ft.next!==null,zr=0,Vt=Ft=wt=null,Ol=!1,e)throw Error(se(300));return t}function Gh(){var t=Va!==0;return Va=0,t}function ci(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Vt===null?wt.memoizedState=Vt=t:Vt=Vt.next=t,Vt}function Gn(){if(Ft===null){var t=wt.alternate;t=t!==null?t.memoizedState:null}else t=Ft.next;var e=Vt===null?wt.memoizedState:Vt.next;if(e!==null)Vt=e,Ft=t;else{if(t===null)throw Error(se(310));Ft=t,t={memoizedState:Ft.memoizedState,baseState:Ft.baseState,baseQueue:Ft.baseQueue,queue:Ft.queue,next:null},Vt===null?wt.memoizedState=Vt=t:Vt=Vt.next=t}return Vt}function Ga(t,e){return typeof e=="function"?e(t):e}function Vc(t){var e=Gn(),n=e.queue;if(n===null)throw Error(se(311));n.lastRenderedReducer=t;var i=Ft,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var a=r.next;r.next=s.next,s.next=a}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var o=a=null,l=null,c=s;do{var f=c.lane;if((zr&f)===f)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:t(i,c.action);else{var p={lane:f,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(o=l=p,a=i):l=l.next=p,wt.lanes|=f,Hr|=f}c=c.next}while(c!==null&&c!==s);l===null?a=i:l.next=o,ii(i,e.memoizedState)||(_n=!0),e.memoizedState=i,e.baseState=a,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,wt.lanes|=s,Hr|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function Gc(t){var e=Gn(),n=e.queue;if(n===null)throw Error(se(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var a=r=r.next;do s=t(s,a.action),a=a.next;while(a!==r);ii(s,e.memoizedState)||(_n=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function v_(){}function x_(t,e){var n=wt,i=Gn(),r=e(),s=!ii(i.memoizedState,r);if(s&&(i.memoizedState=r,_n=!0),i=i.queue,jh(M_.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||Vt!==null&&Vt.memoizedState.tag&1){if(n.flags|=2048,ja(9,y_.bind(null,n,i,r,e),void 0,null),Gt===null)throw Error(se(349));zr&30||S_(n,e,r)}return r}function S_(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=wt.updateQueue,e===null?(e={lastEffect:null,stores:null},wt.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function y_(t,e,n,i){e.value=n,e.getSnapshot=i,E_(e)&&w_(t)}function M_(t,e,n){return n(function(){E_(e)&&w_(t)})}function E_(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!ii(t,n)}catch{return!0}}function w_(t){var e=Hi(t,1);e!==null&&ti(e,t,1,-1)}function yp(t){var e=ci();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Ga,lastRenderedState:t},e.queue=t,t=t.dispatch=pS.bind(null,wt,t),[e.memoizedState,t]}function ja(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=wt.updateQueue,e===null?(e={lastEffect:null,stores:null},wt.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function T_(){return Gn().memoizedState}function ll(t,e,n,i){var r=ci();wt.flags|=t,r.memoizedState=ja(1|e,n,void 0,i===void 0?null:i)}function ac(t,e,n,i){var r=Gn();i=i===void 0?null:i;var s=void 0;if(Ft!==null){var a=Ft.memoizedState;if(s=a.destroy,i!==null&&Hh(i,a.deps)){r.memoizedState=ja(e,n,s,i);return}}wt.flags|=t,r.memoizedState=ja(1|e,n,s,i)}function Mp(t,e){return ll(8390656,8,t,e)}function jh(t,e){return ac(2048,8,t,e)}function b_(t,e){return ac(4,2,t,e)}function A_(t,e){return ac(4,4,t,e)}function C_(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function R_(t,e,n){return n=n!=null?n.concat([t]):null,ac(4,4,C_.bind(null,e,t),n)}function Wh(){}function P_(t,e){var n=Gn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Hh(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function N_(t,e){var n=Gn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Hh(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function L_(t,e,n){return zr&21?(ii(n,e)||(n=Og(),wt.lanes|=n,Hr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,_n=!0),t.memoizedState=n)}function hS(t,e){var n=ct;ct=n!==0&&4>n?n:4,t(!0);var i=Hc.transition;Hc.transition={};try{t(!1),e()}finally{ct=n,Hc.transition=i}}function D_(){return Gn().memoizedState}function fS(t,e,n){var i=fr(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},I_(t))U_(e,n);else if(n=m_(t,e,n,i),n!==null){var r=un();ti(n,t,i,r),F_(n,e,i)}}function pS(t,e,n){var i=fr(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(I_(t))U_(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var a=e.lastRenderedState,o=s(a,n);if(r.hasEagerState=!0,r.eagerState=o,ii(o,a)){var l=e.interleaved;l===null?(r.next=r,Fh(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=m_(t,e,r,i),n!==null&&(r=un(),ti(n,t,i,r),F_(n,e,i))}}function I_(t){var e=t.alternate;return t===wt||e!==null&&e===wt}function U_(t,e){Ea=Ol=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function F_(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,Mh(t,n)}}var kl={readContext:Vn,useCallback:Zt,useContext:Zt,useEffect:Zt,useImperativeHandle:Zt,useInsertionEffect:Zt,useLayoutEffect:Zt,useMemo:Zt,useReducer:Zt,useRef:Zt,useState:Zt,useDebugValue:Zt,useDeferredValue:Zt,useTransition:Zt,useMutableSource:Zt,useSyncExternalStore:Zt,useId:Zt,unstable_isNewReconciler:!1},mS={readContext:Vn,useCallback:function(t,e){return ci().memoizedState=[t,e===void 0?null:e],t},useContext:Vn,useEffect:Mp,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,ll(4194308,4,C_.bind(null,e,t),n)},useLayoutEffect:function(t,e){return ll(4194308,4,t,e)},useInsertionEffect:function(t,e){return ll(4,2,t,e)},useMemo:function(t,e){var n=ci();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=ci();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=fS.bind(null,wt,t),[i.memoizedState,t]},useRef:function(t){var e=ci();return t={current:t},e.memoizedState=t},useState:yp,useDebugValue:Wh,useDeferredValue:function(t){return ci().memoizedState=t},useTransition:function(){var t=yp(!1),e=t[0];return t=hS.bind(null,t[1]),ci().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=wt,r=ci();if(St){if(n===void 0)throw Error(se(407));n=n()}else{if(n=e(),Gt===null)throw Error(se(349));zr&30||S_(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,Mp(M_.bind(null,i,s,t),[t]),i.flags|=2048,ja(9,y_.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=ci(),e=Gt.identifierPrefix;if(St){var n=Di,i=Li;n=(i&~(1<<32-ei(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=Va++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=dS++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},gS={readContext:Vn,useCallback:P_,useContext:Vn,useEffect:jh,useImperativeHandle:R_,useInsertionEffect:b_,useLayoutEffect:A_,useMemo:N_,useReducer:Vc,useRef:T_,useState:function(){return Vc(Ga)},useDebugValue:Wh,useDeferredValue:function(t){var e=Gn();return L_(e,Ft.memoizedState,t)},useTransition:function(){var t=Vc(Ga)[0],e=Gn().memoizedState;return[t,e]},useMutableSource:v_,useSyncExternalStore:x_,useId:D_,unstable_isNewReconciler:!1},_S={readContext:Vn,useCallback:P_,useContext:Vn,useEffect:jh,useImperativeHandle:R_,useInsertionEffect:b_,useLayoutEffect:A_,useMemo:N_,useReducer:Gc,useRef:T_,useState:function(){return Gc(Ga)},useDebugValue:Wh,useDeferredValue:function(t){var e=Gn();return Ft===null?e.memoizedState=t:L_(e,Ft.memoizedState,t)},useTransition:function(){var t=Gc(Ga)[0],e=Gn().memoizedState;return[t,e]},useMutableSource:v_,useSyncExternalStore:x_,useId:D_,unstable_isNewReconciler:!1};function Kn(t,e){if(t&&t.defaultProps){e=bt({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function sd(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:bt({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var oc={isMounted:function(t){return(t=t._reactInternals)?$r(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=un(),r=fr(t),s=Ui(i,r);s.payload=e,n!=null&&(s.callback=n),e=dr(t,s,r),e!==null&&(ti(e,t,r,i),al(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=un(),r=fr(t),s=Ui(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=dr(t,s,r),e!==null&&(ti(e,t,r,i),al(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=un(),i=fr(t),r=Ui(n,i);r.tag=2,e!=null&&(r.callback=e),e=dr(t,r,i),e!==null&&(ti(e,t,i,n),al(e,t,i))}};function Ep(t,e,n,i,r,s,a){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,a):e.prototype&&e.prototype.isPureReactComponent?!Fa(n,i)||!Fa(r,s):!0}function O_(t,e,n){var i=!1,r=gr,s=e.contextType;return typeof s=="object"&&s!==null?s=Vn(s):(r=Sn(e)?kr:sn.current,i=e.contextTypes,s=(i=i!=null)?Os(t,r):gr),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=oc,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function wp(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&oc.enqueueReplaceState(e,e.state,null)}function ad(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},Oh(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=Vn(s):(s=Sn(e)?kr:sn.current,r.context=Os(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(sd(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&oc.enqueueReplaceState(r,r.state,null),Ul(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function Hs(t,e){try{var n="",i=e;do n+=W0(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function jc(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function od(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var vS=typeof WeakMap=="function"?WeakMap:Map;function k_(t,e,n){n=Ui(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){zl||(zl=!0,_d=i),od(t,e)},n}function B_(t,e,n){n=Ui(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){od(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){od(t,e),typeof i!="function"&&(hr===null?hr=new Set([this]):hr.add(this));var a=e.stack;this.componentDidCatch(e.value,{componentStack:a!==null?a:""})}),n}function Tp(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new vS;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=LS.bind(null,t,e,n),e.then(t,t))}function bp(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Ap(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Ui(-1,1),e.tag=2,dr(n,e,1))),n.lanes|=1),t)}var xS=ji.ReactCurrentOwner,_n=!1;function cn(t,e,n,i){e.child=t===null?p_(e,null,n,i):Bs(e,t.child,n,i)}function Cp(t,e,n,i,r){n=n.render;var s=e.ref;return Ps(e,r),i=Vh(t,e,n,i,s,r),n=Gh(),t!==null&&!_n?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Vi(t,e,r)):(St&&n&&Ph(e),e.flags|=1,cn(t,e,i,r),e.child)}function Rp(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!Jh(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,z_(t,e,s,i,r)):(t=hl(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var a=s.memoizedProps;if(n=n.compare,n=n!==null?n:Fa,n(a,i)&&t.ref===e.ref)return Vi(t,e,r)}return e.flags|=1,t=pr(s,i),t.ref=e.ref,t.return=e,e.child=t}function z_(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(Fa(s,i)&&t.ref===e.ref)if(_n=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(_n=!0);else return e.lanes=t.lanes,Vi(t,e,r)}return ld(t,e,n,i,r)}function H_(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},mt(Es,bn),bn|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,mt(Es,bn),bn|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,mt(Es,bn),bn|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,mt(Es,bn),bn|=i;return cn(t,e,r,n),e.child}function V_(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function ld(t,e,n,i,r){var s=Sn(n)?kr:sn.current;return s=Os(e,s),Ps(e,r),n=Vh(t,e,n,i,s,r),i=Gh(),t!==null&&!_n?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Vi(t,e,r)):(St&&i&&Ph(e),e.flags|=1,cn(t,e,n,r),e.child)}function Pp(t,e,n,i,r){if(Sn(n)){var s=!0;Pl(e)}else s=!1;if(Ps(e,r),e.stateNode===null)cl(t,e),O_(e,n,i),ad(e,n,i,r),i=!0;else if(t===null){var a=e.stateNode,o=e.memoizedProps;a.props=o;var l=a.context,c=n.contextType;typeof c=="object"&&c!==null?c=Vn(c):(c=Sn(n)?kr:sn.current,c=Os(e,c));var f=n.getDerivedStateFromProps,p=typeof f=="function"||typeof a.getSnapshotBeforeUpdate=="function";p||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==i||l!==c)&&wp(e,a,i,c),tr=!1;var d=e.memoizedState;a.state=d,Ul(e,i,a,r),l=e.memoizedState,o!==i||d!==l||xn.current||tr?(typeof f=="function"&&(sd(e,n,f,i),l=e.memoizedState),(o=tr||Ep(e,n,o,i,d,l,c))?(p||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(e.flags|=4194308)):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),a.props=i,a.state=l,a.context=c,i=o):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{a=e.stateNode,g_(t,e),o=e.memoizedProps,c=e.type===e.elementType?o:Kn(e.type,o),a.props=c,p=e.pendingProps,d=a.context,l=n.contextType,typeof l=="object"&&l!==null?l=Vn(l):(l=Sn(n)?kr:sn.current,l=Os(e,l));var m=n.getDerivedStateFromProps;(f=typeof m=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==p||d!==l)&&wp(e,a,i,l),tr=!1,d=e.memoizedState,a.state=d,Ul(e,i,a,r);var _=e.memoizedState;o!==p||d!==_||xn.current||tr?(typeof m=="function"&&(sd(e,n,m,i),_=e.memoizedState),(c=tr||Ep(e,n,c,i,d,_,l)||!1)?(f||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(i,_,l),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(i,_,l)),typeof a.componentDidUpdate=="function"&&(e.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof a.componentDidUpdate!="function"||o===t.memoizedProps&&d===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&d===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=_),a.props=i,a.state=_,a.context=l,i=c):(typeof a.componentDidUpdate!="function"||o===t.memoizedProps&&d===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&d===t.memoizedState||(e.flags|=1024),i=!1)}return cd(t,e,n,i,s,r)}function cd(t,e,n,i,r,s){V_(t,e);var a=(e.flags&128)!==0;if(!i&&!a)return r&&mp(e,n,!1),Vi(t,e,s);i=e.stateNode,xS.current=e;var o=a&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&a?(e.child=Bs(e,t.child,null,s),e.child=Bs(e,null,o,s)):cn(t,e,o,s),e.memoizedState=i.state,r&&mp(e,n,!0),e.child}function G_(t){var e=t.stateNode;e.pendingContext?pp(t,e.pendingContext,e.pendingContext!==e.context):e.context&&pp(t,e.context,!1),kh(t,e.containerInfo)}function Np(t,e,n,i,r){return ks(),Lh(r),e.flags|=256,cn(t,e,n,i),e.child}var ud={dehydrated:null,treeContext:null,retryLane:0};function dd(t){return{baseLanes:t,cachePool:null,transitions:null}}function j_(t,e,n){var i=e.pendingProps,r=Mt.current,s=!1,a=(e.flags&128)!==0,o;if((o=a)||(o=t!==null&&t.memoizedState===null?!1:(r&2)!==0),o?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),mt(Mt,r&1),t===null)return id(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(a=i.children,t=i.fallback,s?(i=e.mode,s=e.child,a={mode:"hidden",children:a},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=a):s=uc(a,i,0,null),t=Or(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=dd(n),e.memoizedState=ud,t):Xh(e,a));if(r=t.memoizedState,r!==null&&(o=r.dehydrated,o!==null))return SS(t,e,a,i,o,r,n);if(s){s=i.fallback,a=e.mode,r=t.child,o=r.sibling;var l={mode:"hidden",children:i.children};return!(a&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=pr(r,l),i.subtreeFlags=r.subtreeFlags&14680064),o!==null?s=pr(o,s):(s=Or(s,a,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,a=t.child.memoizedState,a=a===null?dd(n):{baseLanes:a.baseLanes|n,cachePool:null,transitions:a.transitions},s.memoizedState=a,s.childLanes=t.childLanes&~n,e.memoizedState=ud,i}return s=t.child,t=s.sibling,i=pr(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function Xh(t,e){return e=uc({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function yo(t,e,n,i){return i!==null&&Lh(i),Bs(e,t.child,null,n),t=Xh(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function SS(t,e,n,i,r,s,a){if(n)return e.flags&256?(e.flags&=-257,i=jc(Error(se(422))),yo(t,e,a,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=uc({mode:"visible",children:i.children},r,0,null),s=Or(s,r,a,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&Bs(e,t.child,null,a),e.child.memoizedState=dd(a),e.memoizedState=ud,s);if(!(e.mode&1))return yo(t,e,a,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var o=i.dgst;return i=o,s=Error(se(419)),i=jc(s,i,void 0),yo(t,e,a,i)}if(o=(a&t.childLanes)!==0,_n||o){if(i=Gt,i!==null){switch(a&-a){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|a)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,Hi(t,r),ti(i,t,r,-1))}return Qh(),i=jc(Error(se(421))),yo(t,e,a,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=DS.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,Cn=ur(r.nextSibling),Rn=e,St=!0,Qn=null,t!==null&&(Fn[On++]=Li,Fn[On++]=Di,Fn[On++]=Br,Li=t.id,Di=t.overflow,Br=e),e=Xh(e,i.children),e.flags|=4096,e)}function Lp(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),rd(t.return,e,n)}function Wc(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function W_(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(cn(t,e,i.children,n),i=Mt.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Lp(t,n,e);else if(t.tag===19)Lp(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(mt(Mt,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&Fl(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),Wc(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&Fl(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}Wc(e,!0,n,null,s);break;case"together":Wc(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function cl(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Vi(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Hr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(se(153));if(e.child!==null){for(t=e.child,n=pr(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=pr(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function yS(t,e,n){switch(e.tag){case 3:G_(e),ks();break;case 5:__(e);break;case 1:Sn(e.type)&&Pl(e);break;case 4:kh(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;mt(Dl,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(mt(Mt,Mt.current&1),e.flags|=128,null):n&e.child.childLanes?j_(t,e,n):(mt(Mt,Mt.current&1),t=Vi(t,e,n),t!==null?t.sibling:null);mt(Mt,Mt.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return W_(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),mt(Mt,Mt.current),i)break;return null;case 22:case 23:return e.lanes=0,H_(t,e,n)}return Vi(t,e,n)}var X_,hd,$_,Y_;X_=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};hd=function(){};$_=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,Dr(gi.current);var s=null;switch(n){case"input":r=Iu(t,r),i=Iu(t,i),s=[];break;case"select":r=bt({},r,{value:void 0}),i=bt({},i,{value:void 0}),s=[];break;case"textarea":r=Ou(t,r),i=Ou(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=Cl)}Bu(n,i);var a;n=null;for(c in r)if(!i.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var o=r[c];for(a in o)o.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Ra.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in i){var l=i[c];if(o=r!=null?r[c]:void 0,i.hasOwnProperty(c)&&l!==o&&(l!=null||o!=null))if(c==="style")if(o){for(a in o)!o.hasOwnProperty(a)||l&&l.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in l)l.hasOwnProperty(a)&&o[a]!==l[a]&&(n||(n={}),n[a]=l[a])}else n||(s||(s=[]),s.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,o=o?o.__html:void 0,l!=null&&o!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Ra.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&_t("scroll",t),s||o===l||(s=[])):(s=s||[]).push(c,l))}n&&(s=s||[]).push("style",n);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};Y_=function(t,e,n,i){n!==i&&(e.flags|=4)};function ia(t,e){if(!St)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function Qt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function MS(t,e,n){var i=e.pendingProps;switch(Nh(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Qt(e),null;case 1:return Sn(e.type)&&Rl(),Qt(e),null;case 3:return i=e.stateNode,zs(),vt(xn),vt(sn),zh(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(xo(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Qn!==null&&(Sd(Qn),Qn=null))),hd(t,e),Qt(e),null;case 5:Bh(e);var r=Dr(Ha.current);if(n=e.type,t!==null&&e.stateNode!=null)$_(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(se(166));return Qt(e),null}if(t=Dr(gi.current),xo(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[hi]=e,i[Ba]=s,t=(e.mode&1)!==0,n){case"dialog":_t("cancel",i),_t("close",i);break;case"iframe":case"object":case"embed":_t("load",i);break;case"video":case"audio":for(r=0;r<ma.length;r++)_t(ma[r],i);break;case"source":_t("error",i);break;case"img":case"image":case"link":_t("error",i),_t("load",i);break;case"details":_t("toggle",i);break;case"input":Hf(i,s),_t("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},_t("invalid",i);break;case"textarea":Gf(i,s),_t("invalid",i)}Bu(n,s),r=null;for(var a in s)if(s.hasOwnProperty(a)){var o=s[a];a==="children"?typeof o=="string"?i.textContent!==o&&(s.suppressHydrationWarning!==!0&&vo(i.textContent,o,t),r=["children",o]):typeof o=="number"&&i.textContent!==""+o&&(s.suppressHydrationWarning!==!0&&vo(i.textContent,o,t),r=["children",""+o]):Ra.hasOwnProperty(a)&&o!=null&&a==="onScroll"&&_t("scroll",i)}switch(n){case"input":co(i),Vf(i,s,!0);break;case"textarea":co(i),jf(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=Cl)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{a=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=Mg(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=a.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=a.createElement(n,{is:i.is}):(t=a.createElement(n),n==="select"&&(a=t,i.multiple?a.multiple=!0:i.size&&(a.size=i.size))):t=a.createElementNS(t,n),t[hi]=e,t[Ba]=i,X_(t,e,!1,!1),e.stateNode=t;e:{switch(a=zu(n,i),n){case"dialog":_t("cancel",t),_t("close",t),r=i;break;case"iframe":case"object":case"embed":_t("load",t),r=i;break;case"video":case"audio":for(r=0;r<ma.length;r++)_t(ma[r],t);r=i;break;case"source":_t("error",t),r=i;break;case"img":case"image":case"link":_t("error",t),_t("load",t),r=i;break;case"details":_t("toggle",t),r=i;break;case"input":Hf(t,i),r=Iu(t,i),_t("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=bt({},i,{value:void 0}),_t("invalid",t);break;case"textarea":Gf(t,i),r=Ou(t,i),_t("invalid",t);break;default:r=i}Bu(n,r),o=r;for(s in o)if(o.hasOwnProperty(s)){var l=o[s];s==="style"?Tg(t,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&Eg(t,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&Pa(t,l):typeof l=="number"&&Pa(t,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(Ra.hasOwnProperty(s)?l!=null&&s==="onScroll"&&_t("scroll",t):l!=null&&gh(t,s,l,a))}switch(n){case"input":co(t),Vf(t,i,!1);break;case"textarea":co(t),jf(t);break;case"option":i.value!=null&&t.setAttribute("value",""+mr(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?bs(t,!!i.multiple,s,!1):i.defaultValue!=null&&bs(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=Cl)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Qt(e),null;case 6:if(t&&e.stateNode!=null)Y_(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(se(166));if(n=Dr(Ha.current),Dr(gi.current),xo(e)){if(i=e.stateNode,n=e.memoizedProps,i[hi]=e,(s=i.nodeValue!==n)&&(t=Rn,t!==null))switch(t.tag){case 3:vo(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&vo(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[hi]=e,e.stateNode=i}return Qt(e),null;case 13:if(vt(Mt),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(St&&Cn!==null&&e.mode&1&&!(e.flags&128))h_(),ks(),e.flags|=98560,s=!1;else if(s=xo(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(se(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(se(317));s[hi]=e}else ks(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Qt(e),s=!1}else Qn!==null&&(Sd(Qn),Qn=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||Mt.current&1?Ot===0&&(Ot=3):Qh())),e.updateQueue!==null&&(e.flags|=4),Qt(e),null);case 4:return zs(),hd(t,e),t===null&&Oa(e.stateNode.containerInfo),Qt(e),null;case 10:return Uh(e.type._context),Qt(e),null;case 17:return Sn(e.type)&&Rl(),Qt(e),null;case 19:if(vt(Mt),s=e.memoizedState,s===null)return Qt(e),null;if(i=(e.flags&128)!==0,a=s.rendering,a===null)if(i)ia(s,!1);else{if(Ot!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(a=Fl(t),a!==null){for(e.flags|=128,ia(s,!1),i=a.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,a=s.alternate,a===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=a.childLanes,s.lanes=a.lanes,s.child=a.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=a.memoizedProps,s.memoizedState=a.memoizedState,s.updateQueue=a.updateQueue,s.type=a.type,t=a.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return mt(Mt,Mt.current&1|2),e.child}t=t.sibling}s.tail!==null&&Rt()>Vs&&(e.flags|=128,i=!0,ia(s,!1),e.lanes=4194304)}else{if(!i)if(t=Fl(a),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),ia(s,!0),s.tail===null&&s.tailMode==="hidden"&&!a.alternate&&!St)return Qt(e),null}else 2*Rt()-s.renderingStartTime>Vs&&n!==1073741824&&(e.flags|=128,i=!0,ia(s,!1),e.lanes=4194304);s.isBackwards?(a.sibling=e.child,e.child=a):(n=s.last,n!==null?n.sibling=a:e.child=a,s.last=a)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Rt(),e.sibling=null,n=Mt.current,mt(Mt,i?n&1|2:n&1),e):(Qt(e),null);case 22:case 23:return Zh(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?bn&1073741824&&(Qt(e),e.subtreeFlags&6&&(e.flags|=8192)):Qt(e),null;case 24:return null;case 25:return null}throw Error(se(156,e.tag))}function ES(t,e){switch(Nh(e),e.tag){case 1:return Sn(e.type)&&Rl(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return zs(),vt(xn),vt(sn),zh(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return Bh(e),null;case 13:if(vt(Mt),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(se(340));ks()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return vt(Mt),null;case 4:return zs(),null;case 10:return Uh(e.type._context),null;case 22:case 23:return Zh(),null;case 24:return null;default:return null}}var Mo=!1,tn=!1,wS=typeof WeakSet=="function"?WeakSet:Set,Ee=null;function Ms(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){At(t,e,i)}else n.current=null}function fd(t,e,n){try{n()}catch(i){At(t,e,i)}}var Dp=!1;function TS(t,e){if(Ku=Tl,t=Jg(),Rh(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var a=0,o=-1,l=-1,c=0,f=0,p=t,d=null;t:for(;;){for(var m;p!==n||r!==0&&p.nodeType!==3||(o=a+r),p!==s||i!==0&&p.nodeType!==3||(l=a+i),p.nodeType===3&&(a+=p.nodeValue.length),(m=p.firstChild)!==null;)d=p,p=m;for(;;){if(p===t)break t;if(d===n&&++c===r&&(o=a),d===s&&++f===i&&(l=a),(m=p.nextSibling)!==null)break;p=d,d=p.parentNode}p=m}n=o===-1||l===-1?null:{start:o,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(Zu={focusedElem:t,selectionRange:n},Tl=!1,Ee=e;Ee!==null;)if(e=Ee,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Ee=t;else for(;Ee!==null;){e=Ee;try{var _=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(_!==null){var E=_.memoizedProps,v=_.memoizedState,h=e.stateNode,g=h.getSnapshotBeforeUpdate(e.elementType===e.type?E:Kn(e.type,E),v);h.__reactInternalSnapshotBeforeUpdate=g}break;case 3:var M=e.stateNode.containerInfo;M.nodeType===1?M.textContent="":M.nodeType===9&&M.documentElement&&M.removeChild(M.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(se(163))}}catch(x){At(e,e.return,x)}if(t=e.sibling,t!==null){t.return=e.return,Ee=t;break}Ee=e.return}return _=Dp,Dp=!1,_}function wa(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&fd(e,n,s)}r=r.next}while(r!==i)}}function lc(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function pd(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function q_(t){var e=t.alternate;e!==null&&(t.alternate=null,q_(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[hi],delete e[Ba],delete e[ed],delete e[oS],delete e[lS])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function K_(t){return t.tag===5||t.tag===3||t.tag===4}function Ip(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||K_(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function md(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Cl));else if(i!==4&&(t=t.child,t!==null))for(md(t,e,n),t=t.sibling;t!==null;)md(t,e,n),t=t.sibling}function gd(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(gd(t,e,n),t=t.sibling;t!==null;)gd(t,e,n),t=t.sibling}var Wt=null,Zn=!1;function Yi(t,e,n){for(n=n.child;n!==null;)Z_(t,e,n),n=n.sibling}function Z_(t,e,n){if(mi&&typeof mi.onCommitFiberUnmount=="function")try{mi.onCommitFiberUnmount(ec,n)}catch{}switch(n.tag){case 5:tn||Ms(n,e);case 6:var i=Wt,r=Zn;Wt=null,Yi(t,e,n),Wt=i,Zn=r,Wt!==null&&(Zn?(t=Wt,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Wt.removeChild(n.stateNode));break;case 18:Wt!==null&&(Zn?(t=Wt,n=n.stateNode,t.nodeType===8?kc(t.parentNode,n):t.nodeType===1&&kc(t,n),Ia(t)):kc(Wt,n.stateNode));break;case 4:i=Wt,r=Zn,Wt=n.stateNode.containerInfo,Zn=!0,Yi(t,e,n),Wt=i,Zn=r;break;case 0:case 11:case 14:case 15:if(!tn&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,a=s.destroy;s=s.tag,a!==void 0&&(s&2||s&4)&&fd(n,e,a),r=r.next}while(r!==i)}Yi(t,e,n);break;case 1:if(!tn&&(Ms(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(o){At(n,e,o)}Yi(t,e,n);break;case 21:Yi(t,e,n);break;case 22:n.mode&1?(tn=(i=tn)||n.memoizedState!==null,Yi(t,e,n),tn=i):Yi(t,e,n);break;default:Yi(t,e,n)}}function Up(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new wS),e.forEach(function(i){var r=IS.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function Xn(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,a=e,o=a;e:for(;o!==null;){switch(o.tag){case 5:Wt=o.stateNode,Zn=!1;break e;case 3:Wt=o.stateNode.containerInfo,Zn=!0;break e;case 4:Wt=o.stateNode.containerInfo,Zn=!0;break e}o=o.return}if(Wt===null)throw Error(se(160));Z_(s,a,r),Wt=null,Zn=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(c){At(r,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)Q_(e,t),e=e.sibling}function Q_(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Xn(e,t),ai(t),i&4){try{wa(3,t,t.return),lc(3,t)}catch(E){At(t,t.return,E)}try{wa(5,t,t.return)}catch(E){At(t,t.return,E)}}break;case 1:Xn(e,t),ai(t),i&512&&n!==null&&Ms(n,n.return);break;case 5:if(Xn(e,t),ai(t),i&512&&n!==null&&Ms(n,n.return),t.flags&32){var r=t.stateNode;try{Pa(r,"")}catch(E){At(t,t.return,E)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,a=n!==null?n.memoizedProps:s,o=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{o==="input"&&s.type==="radio"&&s.name!=null&&Sg(r,s),zu(o,a);var c=zu(o,s);for(a=0;a<l.length;a+=2){var f=l[a],p=l[a+1];f==="style"?Tg(r,p):f==="dangerouslySetInnerHTML"?Eg(r,p):f==="children"?Pa(r,p):gh(r,f,p,c)}switch(o){case"input":Uu(r,s);break;case"textarea":yg(r,s);break;case"select":var d=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var m=s.value;m!=null?bs(r,!!s.multiple,m,!1):d!==!!s.multiple&&(s.defaultValue!=null?bs(r,!!s.multiple,s.defaultValue,!0):bs(r,!!s.multiple,s.multiple?[]:"",!1))}r[Ba]=s}catch(E){At(t,t.return,E)}}break;case 6:if(Xn(e,t),ai(t),i&4){if(t.stateNode===null)throw Error(se(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(E){At(t,t.return,E)}}break;case 3:if(Xn(e,t),ai(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{Ia(e.containerInfo)}catch(E){At(t,t.return,E)}break;case 4:Xn(e,t),ai(t);break;case 13:Xn(e,t),ai(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(qh=Rt())),i&4&&Up(t);break;case 22:if(f=n!==null&&n.memoizedState!==null,t.mode&1?(tn=(c=tn)||f,Xn(e,t),tn=c):Xn(e,t),ai(t),i&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!f&&t.mode&1)for(Ee=t,f=t.child;f!==null;){for(p=Ee=f;Ee!==null;){switch(d=Ee,m=d.child,d.tag){case 0:case 11:case 14:case 15:wa(4,d,d.return);break;case 1:Ms(d,d.return);var _=d.stateNode;if(typeof _.componentWillUnmount=="function"){i=d,n=d.return;try{e=i,_.props=e.memoizedProps,_.state=e.memoizedState,_.componentWillUnmount()}catch(E){At(i,n,E)}}break;case 5:Ms(d,d.return);break;case 22:if(d.memoizedState!==null){Op(p);continue}}m!==null?(m.return=d,Ee=m):Op(p)}f=f.sibling}e:for(f=null,p=t;;){if(p.tag===5){if(f===null){f=p;try{r=p.stateNode,c?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(o=p.stateNode,l=p.memoizedProps.style,a=l!=null&&l.hasOwnProperty("display")?l.display:null,o.style.display=wg("display",a))}catch(E){At(t,t.return,E)}}}else if(p.tag===6){if(f===null)try{p.stateNode.nodeValue=c?"":p.memoizedProps}catch(E){At(t,t.return,E)}}else if((p.tag!==22&&p.tag!==23||p.memoizedState===null||p===t)&&p.child!==null){p.child.return=p,p=p.child;continue}if(p===t)break e;for(;p.sibling===null;){if(p.return===null||p.return===t)break e;f===p&&(f=null),p=p.return}f===p&&(f=null),p.sibling.return=p.return,p=p.sibling}}break;case 19:Xn(e,t),ai(t),i&4&&Up(t);break;case 21:break;default:Xn(e,t),ai(t)}}function ai(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(K_(n)){var i=n;break e}n=n.return}throw Error(se(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(Pa(r,""),i.flags&=-33);var s=Ip(t);gd(t,s,r);break;case 3:case 4:var a=i.stateNode.containerInfo,o=Ip(t);md(t,o,a);break;default:throw Error(se(161))}}catch(l){At(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function bS(t,e,n){Ee=t,J_(t)}function J_(t,e,n){for(var i=(t.mode&1)!==0;Ee!==null;){var r=Ee,s=r.child;if(r.tag===22&&i){var a=r.memoizedState!==null||Mo;if(!a){var o=r.alternate,l=o!==null&&o.memoizedState!==null||tn;o=Mo;var c=tn;if(Mo=a,(tn=l)&&!c)for(Ee=r;Ee!==null;)a=Ee,l=a.child,a.tag===22&&a.memoizedState!==null?kp(r):l!==null?(l.return=a,Ee=l):kp(r);for(;s!==null;)Ee=s,J_(s),s=s.sibling;Ee=r,Mo=o,tn=c}Fp(t)}else r.subtreeFlags&8772&&s!==null?(s.return=r,Ee=s):Fp(t)}}function Fp(t){for(;Ee!==null;){var e=Ee;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:tn||lc(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!tn)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:Kn(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&Sp(e,s,i);break;case 3:var a=e.updateQueue;if(a!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}Sp(e,a,n)}break;case 5:var o=e.stateNode;if(n===null&&e.flags&4){n=o;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var f=c.memoizedState;if(f!==null){var p=f.dehydrated;p!==null&&Ia(p)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(se(163))}tn||e.flags&512&&pd(e)}catch(d){At(e,e.return,d)}}if(e===t){Ee=null;break}if(n=e.sibling,n!==null){n.return=e.return,Ee=n;break}Ee=e.return}}function Op(t){for(;Ee!==null;){var e=Ee;if(e===t){Ee=null;break}var n=e.sibling;if(n!==null){n.return=e.return,Ee=n;break}Ee=e.return}}function kp(t){for(;Ee!==null;){var e=Ee;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{lc(4,e)}catch(l){At(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){At(e,r,l)}}var s=e.return;try{pd(e)}catch(l){At(e,s,l)}break;case 5:var a=e.return;try{pd(e)}catch(l){At(e,a,l)}}}catch(l){At(e,e.return,l)}if(e===t){Ee=null;break}var o=e.sibling;if(o!==null){o.return=e.return,Ee=o;break}Ee=e.return}}var AS=Math.ceil,Bl=ji.ReactCurrentDispatcher,$h=ji.ReactCurrentOwner,Hn=ji.ReactCurrentBatchConfig,et=0,Gt=null,Dt=null,$t=0,bn=0,Es=Sr(0),Ot=0,Wa=null,Hr=0,cc=0,Yh=0,Ta=null,gn=null,qh=0,Vs=1/0,Ci=null,zl=!1,_d=null,hr=null,Eo=!1,ar=null,Hl=0,ba=0,vd=null,ul=-1,dl=0;function un(){return et&6?Rt():ul!==-1?ul:ul=Rt()}function fr(t){return t.mode&1?et&2&&$t!==0?$t&-$t:uS.transition!==null?(dl===0&&(dl=Og()),dl):(t=ct,t!==0||(t=window.event,t=t===void 0?16:jg(t.type)),t):1}function ti(t,e,n,i){if(50<ba)throw ba=0,vd=null,Error(se(185));Ja(t,n,i),(!(et&2)||t!==Gt)&&(t===Gt&&(!(et&2)&&(cc|=n),Ot===4&&ir(t,$t)),yn(t,i),n===1&&et===0&&!(e.mode&1)&&(Vs=Rt()+500,sc&&yr()))}function yn(t,e){var n=t.callbackNode;ux(t,e);var i=wl(t,t===Gt?$t:0);if(i===0)n!==null&&$f(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&$f(n),e===1)t.tag===0?cS(Bp.bind(null,t)):c_(Bp.bind(null,t)),sS(function(){!(et&6)&&yr()}),n=null;else{switch(kg(i)){case 1:n=yh;break;case 4:n=Ug;break;case 16:n=El;break;case 536870912:n=Fg;break;default:n=El}n=ov(n,ev.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function ev(t,e){if(ul=-1,dl=0,et&6)throw Error(se(327));var n=t.callbackNode;if(Ns()&&t.callbackNode!==n)return null;var i=wl(t,t===Gt?$t:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=Vl(t,i);else{e=i;var r=et;et|=2;var s=nv();(Gt!==t||$t!==e)&&(Ci=null,Vs=Rt()+500,Fr(t,e));do try{PS();break}catch(o){tv(t,o)}while(!0);Ih(),Bl.current=s,et=r,Dt!==null?e=0:(Gt=null,$t=0,e=Ot)}if(e!==0){if(e===2&&(r=Wu(t),r!==0&&(i=r,e=xd(t,r))),e===1)throw n=Wa,Fr(t,0),ir(t,i),yn(t,Rt()),n;if(e===6)ir(t,i);else{if(r=t.current.alternate,!(i&30)&&!CS(r)&&(e=Vl(t,i),e===2&&(s=Wu(t),s!==0&&(i=s,e=xd(t,s))),e===1))throw n=Wa,Fr(t,0),ir(t,i),yn(t,Rt()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(se(345));case 2:Pr(t,gn,Ci);break;case 3:if(ir(t,i),(i&130023424)===i&&(e=qh+500-Rt(),10<e)){if(wl(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){un(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=Ju(Pr.bind(null,t,gn,Ci),e);break}Pr(t,gn,Ci);break;case 4:if(ir(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var a=31-ei(i);s=1<<a,a=e[a],a>r&&(r=a),i&=~s}if(i=r,i=Rt()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*AS(i/1960))-i,10<i){t.timeoutHandle=Ju(Pr.bind(null,t,gn,Ci),i);break}Pr(t,gn,Ci);break;case 5:Pr(t,gn,Ci);break;default:throw Error(se(329))}}}return yn(t,Rt()),t.callbackNode===n?ev.bind(null,t):null}function xd(t,e){var n=Ta;return t.current.memoizedState.isDehydrated&&(Fr(t,e).flags|=256),t=Vl(t,e),t!==2&&(e=gn,gn=n,e!==null&&Sd(e)),t}function Sd(t){gn===null?gn=t:gn.push.apply(gn,t)}function CS(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!ii(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function ir(t,e){for(e&=~Yh,e&=~cc,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-ei(e),i=1<<n;t[n]=-1,e&=~i}}function Bp(t){if(et&6)throw Error(se(327));Ns();var e=wl(t,0);if(!(e&1))return yn(t,Rt()),null;var n=Vl(t,e);if(t.tag!==0&&n===2){var i=Wu(t);i!==0&&(e=i,n=xd(t,i))}if(n===1)throw n=Wa,Fr(t,0),ir(t,e),yn(t,Rt()),n;if(n===6)throw Error(se(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,Pr(t,gn,Ci),yn(t,Rt()),null}function Kh(t,e){var n=et;et|=1;try{return t(e)}finally{et=n,et===0&&(Vs=Rt()+500,sc&&yr())}}function Vr(t){ar!==null&&ar.tag===0&&!(et&6)&&Ns();var e=et;et|=1;var n=Hn.transition,i=ct;try{if(Hn.transition=null,ct=1,t)return t()}finally{ct=i,Hn.transition=n,et=e,!(et&6)&&yr()}}function Zh(){bn=Es.current,vt(Es)}function Fr(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,rS(n)),Dt!==null)for(n=Dt.return;n!==null;){var i=n;switch(Nh(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&Rl();break;case 3:zs(),vt(xn),vt(sn),zh();break;case 5:Bh(i);break;case 4:zs();break;case 13:vt(Mt);break;case 19:vt(Mt);break;case 10:Uh(i.type._context);break;case 22:case 23:Zh()}n=n.return}if(Gt=t,Dt=t=pr(t.current,null),$t=bn=e,Ot=0,Wa=null,Yh=cc=Hr=0,gn=Ta=null,Lr!==null){for(e=0;e<Lr.length;e++)if(n=Lr[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var a=s.next;s.next=r,i.next=a}n.pending=i}Lr=null}return t}function tv(t,e){do{var n=Dt;try{if(Ih(),ol.current=kl,Ol){for(var i=wt.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}Ol=!1}if(zr=0,Vt=Ft=wt=null,Ea=!1,Va=0,$h.current=null,n===null||n.return===null){Ot=1,Wa=e,Dt=null;break}e:{var s=t,a=n.return,o=n,l=e;if(e=$t,o.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,f=o,p=f.tag;if(!(f.mode&1)&&(p===0||p===11||p===15)){var d=f.alternate;d?(f.updateQueue=d.updateQueue,f.memoizedState=d.memoizedState,f.lanes=d.lanes):(f.updateQueue=null,f.memoizedState=null)}var m=bp(a);if(m!==null){m.flags&=-257,Ap(m,a,o,s,e),m.mode&1&&Tp(s,c,e),e=m,l=c;var _=e.updateQueue;if(_===null){var E=new Set;E.add(l),e.updateQueue=E}else _.add(l);break e}else{if(!(e&1)){Tp(s,c,e),Qh();break e}l=Error(se(426))}}else if(St&&o.mode&1){var v=bp(a);if(v!==null){!(v.flags&65536)&&(v.flags|=256),Ap(v,a,o,s,e),Lh(Hs(l,o));break e}}s=l=Hs(l,o),Ot!==4&&(Ot=2),Ta===null?Ta=[s]:Ta.push(s),s=a;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var h=k_(s,l,e);xp(s,h);break e;case 1:o=l;var g=s.type,M=s.stateNode;if(!(s.flags&128)&&(typeof g.getDerivedStateFromError=="function"||M!==null&&typeof M.componentDidCatch=="function"&&(hr===null||!hr.has(M)))){s.flags|=65536,e&=-e,s.lanes|=e;var x=B_(s,o,e);xp(s,x);break e}}s=s.return}while(s!==null)}rv(n)}catch(w){e=w,Dt===n&&n!==null&&(Dt=n=n.return);continue}break}while(!0)}function nv(){var t=Bl.current;return Bl.current=kl,t===null?kl:t}function Qh(){(Ot===0||Ot===3||Ot===2)&&(Ot=4),Gt===null||!(Hr&268435455)&&!(cc&268435455)||ir(Gt,$t)}function Vl(t,e){var n=et;et|=2;var i=nv();(Gt!==t||$t!==e)&&(Ci=null,Fr(t,e));do try{RS();break}catch(r){tv(t,r)}while(!0);if(Ih(),et=n,Bl.current=i,Dt!==null)throw Error(se(261));return Gt=null,$t=0,Ot}function RS(){for(;Dt!==null;)iv(Dt)}function PS(){for(;Dt!==null&&!tx();)iv(Dt)}function iv(t){var e=av(t.alternate,t,bn);t.memoizedProps=t.pendingProps,e===null?rv(t):Dt=e,$h.current=null}function rv(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=ES(n,e),n!==null){n.flags&=32767,Dt=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Ot=6,Dt=null;return}}else if(n=MS(n,e,bn),n!==null){Dt=n;return}if(e=e.sibling,e!==null){Dt=e;return}Dt=e=t}while(e!==null);Ot===0&&(Ot=5)}function Pr(t,e,n){var i=ct,r=Hn.transition;try{Hn.transition=null,ct=1,NS(t,e,n,i)}finally{Hn.transition=r,ct=i}return null}function NS(t,e,n,i){do Ns();while(ar!==null);if(et&6)throw Error(se(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(se(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(dx(t,s),t===Gt&&(Dt=Gt=null,$t=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Eo||(Eo=!0,ov(El,function(){return Ns(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Hn.transition,Hn.transition=null;var a=ct;ct=1;var o=et;et|=4,$h.current=null,TS(t,n),Q_(n,t),Zx(Zu),Tl=!!Ku,Zu=Ku=null,t.current=n,bS(n),nx(),et=o,ct=a,Hn.transition=s}else t.current=n;if(Eo&&(Eo=!1,ar=t,Hl=r),s=t.pendingLanes,s===0&&(hr=null),sx(n.stateNode),yn(t,Rt()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(zl)throw zl=!1,t=_d,_d=null,t;return Hl&1&&t.tag!==0&&Ns(),s=t.pendingLanes,s&1?t===vd?ba++:(ba=0,vd=t):ba=0,yr(),null}function Ns(){if(ar!==null){var t=kg(Hl),e=Hn.transition,n=ct;try{if(Hn.transition=null,ct=16>t?16:t,ar===null)var i=!1;else{if(t=ar,ar=null,Hl=0,et&6)throw Error(se(331));var r=et;for(et|=4,Ee=t.current;Ee!==null;){var s=Ee,a=s.child;if(Ee.flags&16){var o=s.deletions;if(o!==null){for(var l=0;l<o.length;l++){var c=o[l];for(Ee=c;Ee!==null;){var f=Ee;switch(f.tag){case 0:case 11:case 15:wa(8,f,s)}var p=f.child;if(p!==null)p.return=f,Ee=p;else for(;Ee!==null;){f=Ee;var d=f.sibling,m=f.return;if(q_(f),f===c){Ee=null;break}if(d!==null){d.return=m,Ee=d;break}Ee=m}}}var _=s.alternate;if(_!==null){var E=_.child;if(E!==null){_.child=null;do{var v=E.sibling;E.sibling=null,E=v}while(E!==null)}}Ee=s}}if(s.subtreeFlags&2064&&a!==null)a.return=s,Ee=a;else e:for(;Ee!==null;){if(s=Ee,s.flags&2048)switch(s.tag){case 0:case 11:case 15:wa(9,s,s.return)}var h=s.sibling;if(h!==null){h.return=s.return,Ee=h;break e}Ee=s.return}}var g=t.current;for(Ee=g;Ee!==null;){a=Ee;var M=a.child;if(a.subtreeFlags&2064&&M!==null)M.return=a,Ee=M;else e:for(a=g;Ee!==null;){if(o=Ee,o.flags&2048)try{switch(o.tag){case 0:case 11:case 15:lc(9,o)}}catch(w){At(o,o.return,w)}if(o===a){Ee=null;break e}var x=o.sibling;if(x!==null){x.return=o.return,Ee=x;break e}Ee=o.return}}if(et=r,yr(),mi&&typeof mi.onPostCommitFiberRoot=="function")try{mi.onPostCommitFiberRoot(ec,t)}catch{}i=!0}return i}finally{ct=n,Hn.transition=e}}return!1}function zp(t,e,n){e=Hs(n,e),e=k_(t,e,1),t=dr(t,e,1),e=un(),t!==null&&(Ja(t,1,e),yn(t,e))}function At(t,e,n){if(t.tag===3)zp(t,t,n);else for(;e!==null;){if(e.tag===3){zp(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(hr===null||!hr.has(i))){t=Hs(n,t),t=B_(e,t,1),e=dr(e,t,1),t=un(),e!==null&&(Ja(e,1,t),yn(e,t));break}}e=e.return}}function LS(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=un(),t.pingedLanes|=t.suspendedLanes&n,Gt===t&&($t&n)===n&&(Ot===4||Ot===3&&($t&130023424)===$t&&500>Rt()-qh?Fr(t,0):Yh|=n),yn(t,e)}function sv(t,e){e===0&&(t.mode&1?(e=fo,fo<<=1,!(fo&130023424)&&(fo=4194304)):e=1);var n=un();t=Hi(t,e),t!==null&&(Ja(t,e,n),yn(t,n))}function DS(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),sv(t,n)}function IS(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(se(314))}i!==null&&i.delete(e),sv(t,n)}var av;av=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||xn.current)_n=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return _n=!1,yS(t,e,n);_n=!!(t.flags&131072)}else _n=!1,St&&e.flags&1048576&&u_(e,Ll,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;cl(t,e),t=e.pendingProps;var r=Os(e,sn.current);Ps(e,n),r=Vh(null,e,i,t,r,n);var s=Gh();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,Sn(i)?(s=!0,Pl(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,Oh(e),r.updater=oc,e.stateNode=r,r._reactInternals=e,ad(e,i,t,n),e=cd(null,e,i,!0,s,n)):(e.tag=0,St&&s&&Ph(e),cn(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(cl(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=FS(i),t=Kn(i,t),r){case 0:e=ld(null,e,i,t,n);break e;case 1:e=Pp(null,e,i,t,n);break e;case 11:e=Cp(null,e,i,t,n);break e;case 14:e=Rp(null,e,i,Kn(i.type,t),n);break e}throw Error(se(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Kn(i,r),ld(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Kn(i,r),Pp(t,e,i,r,n);case 3:e:{if(G_(e),t===null)throw Error(se(387));i=e.pendingProps,s=e.memoizedState,r=s.element,g_(t,e),Ul(e,i,null,n);var a=e.memoizedState;if(i=a.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=Hs(Error(se(423)),e),e=Np(t,e,i,n,r);break e}else if(i!==r){r=Hs(Error(se(424)),e),e=Np(t,e,i,n,r);break e}else for(Cn=ur(e.stateNode.containerInfo.firstChild),Rn=e,St=!0,Qn=null,n=p_(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(ks(),i===r){e=Vi(t,e,n);break e}cn(t,e,i,n)}e=e.child}return e;case 5:return __(e),t===null&&id(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,a=r.children,Qu(i,r)?a=null:s!==null&&Qu(i,s)&&(e.flags|=32),V_(t,e),cn(t,e,a,n),e.child;case 6:return t===null&&id(e),null;case 13:return j_(t,e,n);case 4:return kh(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=Bs(e,null,i,n):cn(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Kn(i,r),Cp(t,e,i,r,n);case 7:return cn(t,e,e.pendingProps,n),e.child;case 8:return cn(t,e,e.pendingProps.children,n),e.child;case 12:return cn(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,a=r.value,mt(Dl,i._currentValue),i._currentValue=a,s!==null)if(ii(s.value,a)){if(s.children===r.children&&!xn.current){e=Vi(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var o=s.dependencies;if(o!==null){a=s.child;for(var l=o.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=Ui(-1,n&-n),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var f=c.pending;f===null?l.next=l:(l.next=f.next,f.next=l),c.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),rd(s.return,n,e),o.lanes|=n;break}l=l.next}}else if(s.tag===10)a=s.type===e.type?null:s.child;else if(s.tag===18){if(a=s.return,a===null)throw Error(se(341));a.lanes|=n,o=a.alternate,o!==null&&(o.lanes|=n),rd(a,n,e),a=s.sibling}else a=s.child;if(a!==null)a.return=s;else for(a=s;a!==null;){if(a===e){a=null;break}if(s=a.sibling,s!==null){s.return=a.return,a=s;break}a=a.return}s=a}cn(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,Ps(e,n),r=Vn(r),i=i(r),e.flags|=1,cn(t,e,i,n),e.child;case 14:return i=e.type,r=Kn(i,e.pendingProps),r=Kn(i.type,r),Rp(t,e,i,r,n);case 15:return z_(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Kn(i,r),cl(t,e),e.tag=1,Sn(i)?(t=!0,Pl(e)):t=!1,Ps(e,n),O_(e,i,r),ad(e,i,r,n),cd(null,e,i,!0,t,n);case 19:return W_(t,e,n);case 22:return H_(t,e,n)}throw Error(se(156,e.tag))};function ov(t,e){return Ig(t,e)}function US(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function zn(t,e,n,i){return new US(t,e,n,i)}function Jh(t){return t=t.prototype,!(!t||!t.isReactComponent)}function FS(t){if(typeof t=="function")return Jh(t)?1:0;if(t!=null){if(t=t.$$typeof,t===vh)return 11;if(t===xh)return 14}return 2}function pr(t,e){var n=t.alternate;return n===null?(n=zn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function hl(t,e,n,i,r,s){var a=2;if(i=t,typeof t=="function")Jh(t)&&(a=1);else if(typeof t=="string")a=5;else e:switch(t){case fs:return Or(n.children,r,s,e);case _h:a=8,r|=8;break;case Pu:return t=zn(12,n,e,r|2),t.elementType=Pu,t.lanes=s,t;case Nu:return t=zn(13,n,e,r),t.elementType=Nu,t.lanes=s,t;case Lu:return t=zn(19,n,e,r),t.elementType=Lu,t.lanes=s,t;case _g:return uc(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case mg:a=10;break e;case gg:a=9;break e;case vh:a=11;break e;case xh:a=14;break e;case er:a=16,i=null;break e}throw Error(se(130,t==null?t:typeof t,""))}return e=zn(a,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function Or(t,e,n,i){return t=zn(7,t,i,e),t.lanes=n,t}function uc(t,e,n,i){return t=zn(22,t,i,e),t.elementType=_g,t.lanes=n,t.stateNode={isHidden:!1},t}function Xc(t,e,n){return t=zn(6,t,null,e),t.lanes=n,t}function $c(t,e,n){return e=zn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function OS(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Ac(0),this.expirationTimes=Ac(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ac(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function ef(t,e,n,i,r,s,a,o,l){return t=new OS(t,e,n,o,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=zn(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Oh(s),t}function kS(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:hs,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function lv(t){if(!t)return gr;t=t._reactInternals;e:{if($r(t)!==t||t.tag!==1)throw Error(se(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(Sn(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(se(171))}if(t.tag===1){var n=t.type;if(Sn(n))return l_(t,n,e)}return e}function cv(t,e,n,i,r,s,a,o,l){return t=ef(n,i,!0,t,r,s,a,o,l),t.context=lv(null),n=t.current,i=un(),r=fr(n),s=Ui(i,r),s.callback=e??null,dr(n,s,r),t.current.lanes=r,Ja(t,r,i),yn(t,i),t}function dc(t,e,n,i){var r=e.current,s=un(),a=fr(r);return n=lv(n),e.context===null?e.context=n:e.pendingContext=n,e=Ui(s,a),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=dr(r,e,a),t!==null&&(ti(t,r,a,s),al(t,r,a)),a}function Gl(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Hp(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function tf(t,e){Hp(t,e),(t=t.alternate)&&Hp(t,e)}function BS(){return null}var uv=typeof reportError=="function"?reportError:function(t){console.error(t)};function nf(t){this._internalRoot=t}hc.prototype.render=nf.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(se(409));dc(t,e,null,null)};hc.prototype.unmount=nf.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Vr(function(){dc(null,t,null,null)}),e[zi]=null}};function hc(t){this._internalRoot=t}hc.prototype.unstable_scheduleHydration=function(t){if(t){var e=Hg();t={blockedOn:null,target:t,priority:e};for(var n=0;n<nr.length&&e!==0&&e<nr[n].priority;n++);nr.splice(n,0,t),n===0&&Gg(t)}};function rf(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function fc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Vp(){}function zS(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var c=Gl(a);s.call(c)}}var a=cv(e,i,t,0,null,!1,!1,"",Vp);return t._reactRootContainer=a,t[zi]=a.current,Oa(t.nodeType===8?t.parentNode:t),Vr(),a}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var o=i;i=function(){var c=Gl(l);o.call(c)}}var l=ef(t,0,!1,null,null,!1,!1,"",Vp);return t._reactRootContainer=l,t[zi]=l.current,Oa(t.nodeType===8?t.parentNode:t),Vr(function(){dc(e,l,n,i)}),l}function pc(t,e,n,i,r){var s=n._reactRootContainer;if(s){var a=s;if(typeof r=="function"){var o=r;r=function(){var l=Gl(a);o.call(l)}}dc(e,a,t,r)}else a=zS(n,e,t,r,i);return Gl(a)}Bg=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=pa(e.pendingLanes);n!==0&&(Mh(e,n|1),yn(e,Rt()),!(et&6)&&(Vs=Rt()+500,yr()))}break;case 13:Vr(function(){var i=Hi(t,1);if(i!==null){var r=un();ti(i,t,1,r)}}),tf(t,1)}};Eh=function(t){if(t.tag===13){var e=Hi(t,134217728);if(e!==null){var n=un();ti(e,t,134217728,n)}tf(t,134217728)}};zg=function(t){if(t.tag===13){var e=fr(t),n=Hi(t,e);if(n!==null){var i=un();ti(n,t,e,i)}tf(t,e)}};Hg=function(){return ct};Vg=function(t,e){var n=ct;try{return ct=t,e()}finally{ct=n}};Vu=function(t,e,n){switch(e){case"input":if(Uu(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=rc(i);if(!r)throw Error(se(90));xg(i),Uu(i,r)}}}break;case"textarea":yg(t,n);break;case"select":e=n.value,e!=null&&bs(t,!!n.multiple,e,!1)}};Cg=Kh;Rg=Vr;var HS={usingClientEntryPoint:!1,Events:[to,_s,rc,bg,Ag,Kh]},ra={findFiberByHostInstance:Nr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},VS={bundleType:ra.bundleType,version:ra.version,rendererPackageName:ra.rendererPackageName,rendererConfig:ra.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ji.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=Lg(t),t===null?null:t.stateNode},findFiberByHostInstance:ra.findFiberByHostInstance||BS,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var wo=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!wo.isDisabled&&wo.supportsFiber)try{ec=wo.inject(VS),mi=wo}catch{}}Nn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=HS;Nn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!rf(e))throw Error(se(200));return kS(t,e,null,n)};Nn.createRoot=function(t,e){if(!rf(t))throw Error(se(299));var n=!1,i="",r=uv;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=ef(t,1,!1,null,null,n,!1,i,r),t[zi]=e.current,Oa(t.nodeType===8?t.parentNode:t),new nf(e)};Nn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(se(188)):(t=Object.keys(t).join(","),Error(se(268,t)));return t=Lg(e),t=t===null?null:t.stateNode,t};Nn.flushSync=function(t){return Vr(t)};Nn.hydrate=function(t,e,n){if(!fc(e))throw Error(se(200));return pc(null,t,e,!0,n)};Nn.hydrateRoot=function(t,e,n){if(!rf(t))throw Error(se(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",a=uv;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),e=cv(e,null,t,1,n??null,r,!1,s,a),t[zi]=e.current,Oa(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new hc(e)};Nn.render=function(t,e,n){if(!fc(e))throw Error(se(200));return pc(null,t,e,!1,n)};Nn.unmountComponentAtNode=function(t){if(!fc(t))throw Error(se(40));return t._reactRootContainer?(Vr(function(){pc(null,null,t,!1,function(){t._reactRootContainer=null,t[zi]=null})}),!0):!1};Nn.unstable_batchedUpdates=Kh;Nn.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!fc(n))throw Error(se(200));if(t==null||t._reactInternals===void 0)throw Error(se(38));return pc(t,e,n,!1,i)};Nn.version="18.3.1-next-f1338f8080-20240426";function dv(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(dv)}catch(t){console.error(t)}}dv(),dg.exports=Nn;var GS=dg.exports,hv,Gp=GS;hv=Gp.createRoot,Gp.hydrateRoot;async function nt(t,e){const n=await fetch(t,e),i=n.headers.get("content-type")||"";if(n.status===401)throw location.reload(),new Error("access token required");if(!n.ok){let r=n.statusText;try{const s=await n.json();r=s.error||s.detail||r}catch{}throw new Error(typeof r=="string"?r:JSON.stringify(r))}return i.includes("json")?n.json():n}const jS=t=>t.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,""),Mi=t=>({method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(t)}),De={customers:()=>nt("/api/customers"),customer:t=>nt(`/api/customers/${encodeURIComponent(t)}`),addCustomer:t=>nt("/api/customers",Mi({name:t})),saveCustomer:(t,e,n)=>nt(`/api/customers/${encodeURIComponent(t)}`,{...Mi({name:e,fields:n}),method:"PUT"}),deleteCustomer:t=>nt(`/api/customers/${encodeURIComponent(t)}`,{method:"DELETE"}),recheckCustomer:t=>nt(`/api/customers/${encodeURIComponent(t)}/recheck`,{method:"POST"}),specs:()=>nt("/api/reference/specs"),importSpecs:t=>nt("/api/reference/specs",{method:"POST",body:t}),deleteSpec:t=>nt(`/api/reference/specs/${encodeURIComponent(t)}`,{method:"DELETE"}),revisions:()=>nt("/api/reference/revisions"),importRevisions:t=>nt("/api/reference/revisions",{method:"POST",body:t}),deleteRevision:t=>nt(`/api/reference/revisions/${encodeURIComponent(t)}`,{method:"DELETE"}),status:()=>nt("/api/status"),jobs:()=>nt("/api/jobs"),job:t=>nt(`/api/jobs/${t}`),jobStatus:t=>nt(`/api/jobs/${t}/status`),createJob:t=>nt("/api/jobs?wait=0",{method:"POST",body:t}),addFiles:(t,e)=>nt(`/api/jobs/${t}/files?wait=1`,{method:"POST",body:e}),deleteJob:t=>nt(`/api/jobs/${t}`,{method:"DELETE"}),recheck:(t,e)=>nt(`/api/jobs/${t}/drawings/${e}/recheck`,{method:"POST"}),decide:(t,e,n,i)=>nt(`/api/jobs/${t}/drawings/${e}/findings/${n}`,Mi(i)),voiceNote:(t,e,n,i)=>fetch(`/api/jobs/${t}/drawings/${e}/findings/${n}/voice-note`,{method:"POST",body:i}).then(async r=>({status:r.status,body:await r.json()})),compare:(t,e,n,i)=>nt("/api/compare",Mi({a_job:t,a_drawing:e,b_job:n,b_drawing:i})),consistency:t=>nt(`/api/jobs/${t}/consistency`),modelCheck:t=>nt(`/api/jobs/${t}/model-check`),mesh:t=>nt(`/api/jobs/${t}/model/mesh`),compareXlsxUrl:(t,e,n,i)=>`/api/compare/report.xlsx?a_job=${t}&a_drawing=${e}&b_job=${n}&b_drawing=${i}`,comparePdfUrl:(t,e,n,i)=>`/api/compare/side-by-side.pdf?a_job=${t}&a_drawing=${e}&b_job=${n}&b_drawing=${i}`,compareInbox:(t,e,n,i)=>nt("/api/compare/inbox",Mi({a_job:t,a_drawing:e,b_job:n,b_drawing:i})),doc:(t,e,n)=>nt(`/api/jobs/${t}/docs/${e}`,Mi(n)),release:t=>nt("/api/docs/release",Mi({name:t})),templates:()=>nt("/api/templates"),bulk:(t,e,n)=>nt("/api/templates/bulk-edit",Mi({find:t,replace:e,preview:n})),ask:(t,e,n)=>nt(`/api/jobs/${t}/ask`,Mi({question:e,history:n})),audit:()=>nt("/api/audit"),renderUrl:(t,e,n,i)=>`/api/jobs/${t}/drawings/${e}/render?page=${n}&markers=${i?1:0}&t=${Date.now()}`,markupUrl:(t,e)=>`/api/jobs/${t}/drawings/${e}/markup.pdf`,calloutUrl:(t,e,n)=>`/api/jobs/${t}/drawings/${e}/findings/${n}/callout.png`,findingsUrl:(t,e,n)=>`/api/jobs/${t}/drawings/${e}/findings.${n}`},Je=({kind:t,children:e})=>u.jsx("span",{className:`tag ${t}`,children:e??t}),nn=()=>u.jsx("span",{className:"spin"}),WS=({w:t})=>t?u.jsx(Je,{kind:t,children:t}):u.jsx(Je,{kind:"ok",children:"clean"});let fl=[];function Fe(t,e=!1){fl.forEach(n=>n({text:t,err:e}))}function XS(){const[t,e]=te.useState([]);return te.useEffect(()=>{const n=i=>{const r=Date.now()+Math.random();e(s=>[...s,{id:r,...i}]),setTimeout(()=>e(s=>s.filter(a=>a.id!==r)),i.err?6e3:3e3)};return fl.push(n),()=>{fl=fl.filter(i=>i!==n)}},[]),u.jsx(u.Fragment,{children:t.map((n,i)=>u.jsx("div",{className:"toast"+(n.err?" err":""),style:{bottom:18+i*52},children:n.text},n.id))})}function fv({items:t}){return u.jsx("div",{className:"tiles",children:t.map((e,n)=>u.jsxs("div",{className:"tile",children:[u.jsx("div",{className:"v",style:e.color?{color:e.color}:void 0,children:e.v}),u.jsx("div",{className:"l",children:e.l})]},n))})}const vn=({children:t})=>u.jsx("div",{className:"empty",children:t});function jp({values:t,onChange:e,placeholder:n}){const[i,r]=te.useState(""),s=()=>{const a=i.trim().replace(/,$/,"");a&&!t.some(o=>o.toUpperCase()===a.toUpperCase())&&e([...t,a]),r("")};return u.jsxs("div",{className:"chips",children:[t.map(a=>u.jsxs("span",{className:"chip",children:[a,u.jsx("button",{type:"button","aria-label":`Remove ${a}`,onClick:()=>e(t.filter(o=>o!==a)),children:"×"})]},a)),u.jsx("input",{value:i,placeholder:t.length?"":n,onChange:a=>r(a.target.value),onBlur:s,onKeyDown:a=>{a.key==="Enter"||a.key===","?(a.preventDefault(),s()):a.key==="Backspace"&&!i&&t.length&&e(t.slice(0,-1))}})]})}const pv=u.jsxs("svg",{viewBox:"0 0 24 24",children:[u.jsx("circle",{cx:"12",cy:"12",r:"4"}),u.jsx("path",{d:"M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6"})]}),$S=u.jsx("svg",{viewBox:"0 0 24 24",children:u.jsx("path",{d:"M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"})}),YS=u.jsxs("svg",{viewBox:"0 0 24 24",children:[u.jsx("rect",{x:"3",y:"4",width:"18",height:"12",rx:"2"}),u.jsx("path",{d:"M8 20h8M12 16v4"})]}),qS=[["light","Light",pv],["dark","Dark",$S],["system","System",YS]];function KS({pref:t,setPref:e,status:n}){var l;const[i,r]=te.useState(!1),s=te.useRef(null);te.useEffect(()=>{if(!i)return;const c=p=>{s.current&&!s.current.contains(p.target)&&r(!1)},f=p=>{p.key==="Escape"&&r(!1)};return document.addEventListener("mousedown",c),document.addEventListener("keydown",f),()=>{document.removeEventListener("mousedown",c),document.removeEventListener("keydown",f)}},[i]);const a=n==null?void 0:n.engines,o=n?[["Version",n.version],["Q&A",n.claude?`Claude agent (${n.model})`:"local planner"],["Reviews",(l=a==null?void 0:a.queue)!=null&&l.async?"Celery workers":"inline"],["Scans",[a==null?void 0:a.ocr,(a==null?void 0:a.layout_model)&&`${a.layout_model} layout`].filter(Boolean).join(" + ")||"—"],["Retrieval",a!=null&&a.retrieval?`${a.retrieval.store}, ${a.retrieval.documents} documents`:"—"]]:[];return u.jsxs("div",{className:"settings",ref:s,children:[u.jsxs("a",{id:"settings-button",className:i?"on":"",title:"Settings",role:"button","aria-haspopup":"dialog","aria-expanded":i,onClick:()=>r(c=>!c),children:[pv,u.jsx("span",{children:"Settings"})]}),i&&u.jsxs("div",{className:"pop",role:"dialog","aria-label":"Settings",children:[u.jsx("h4",{children:"Settings"}),u.jsx("div",{className:"lbl",children:"Theme"}),u.jsx("div",{className:"seg",role:"radiogroup","aria-label":"Theme",children:qS.map(([c,f,p])=>u.jsxs("button",{"data-theme-option":c,role:"radio","aria-checked":t===c,className:t===c?"on":"",onClick:()=>e(c),children:[p,f]},c))}),u.jsx("div",{className:"note",children:"Drawing sheets keep a white background in both themes, like paper. The choice is saved in this browser."}),!!o.length&&u.jsxs(u.Fragment,{children:[u.jsx("div",{className:"lbl",children:"This instance"}),u.jsx("div",{className:"kv",children:o.map(([c,f])=>u.jsxs("div",{children:[u.jsx("span",{children:c}),u.jsx("span",{children:f})]},c))})]})]})]})}const mv="pv-theme",gv=()=>typeof window<"u"&&window.matchMedia?window.matchMedia("(prefers-color-scheme: dark)"):null;function ZS(){try{const t=localStorage.getItem(mv);if(t==="light"||t==="dark"||t==="system")return t}catch{}return"light"}function QS(t){try{localStorage.setItem(mv,t)}catch{}}function Wp(t){var e;return t==="system"?(e=gv())!=null&&e.matches?"dark":"light":t}function JS(t){const e=document.documentElement;e.dataset.theme=t,e.style.colorScheme=t}function ey(){const[t,e]=te.useState(ZS),[n,i]=te.useState(()=>Wp(t));return te.useEffect(()=>{const r=()=>{const a=Wp(t);JS(a),i(a)};r(),QS(t);const s=gv();if(!(t!=="system"||!s))return s.addEventListener("change",r),()=>s.removeEventListener("change",r)},[t]),{pref:t,theme:n,setPref:e}}const _v=te.createContext("light"),ty=()=>te.useContext(_v);function ny({go:t,setCrumb:e}){const[n,i]=te.useState([]),[r,s]=te.useState(!1),[a,o]=te.useState(""),l=te.useRef(null),c=te.useCallback(()=>De.jobs().then(i).catch(h=>Fe(h.message,!0)),[]);te.useEffect(()=>{e(["Queue",""]),c()},[c,e]),te.useEffect(()=>{if(!n.some(g=>g.status==="queued"||g.status==="processing"||g.status==="pending"))return;const h=setInterval(c,1500);return()=>clearInterval(h)},[n,c]);const f=n.flatMap(h=>h.drawings.map(g=>({...g,job:h}))),p=f.reduce((h,g)=>h+(g.open||0),0),d=f.filter(h=>h.open>0).length,m=f.map(h=>h.duration).filter(h=>h!=null).sort((h,g)=>h-g),_=m.length?m[Math.floor(m.length/2)]:null,E=async h=>{var M;h.preventDefault();const g=new FormData(h.currentTarget);o("upload");try{const x=await De.createJob(g);Fe(x.status==="queued"||x.status==="processing"?"Package queued for review":`Checked ${x.drawings.length} drawing(s)`),s(!1),(M=l.current)==null||M.reset(),await c(),x.status==="done"&&t({view:"review",job:x.id})}catch(x){Fe(x.message,!0)}o("")},v=async h=>{confirm("Delete this job and its files?")&&(await De.deleteJob(h),c())};return u.jsxs("div",{className:"page",children:[u.jsxs("div",{className:"row between",children:[u.jsxs("div",{children:[u.jsx("h2",{children:"Drawing queue"}),u.jsx("p",{className:"sub",children:"Every drawing package checked by PrintVerity. Click a drawing to review it."})]}),u.jsx("div",{className:"row",children:u.jsx("button",{className:"btn p",onClick:()=>s(!0),children:"Upload drawing package"})})]}),u.jsx(fv,{items:[{v:f.length,l:"drawings in queue"},{v:d,l:"need engineer review"},{v:p,l:"findings open"},{v:_!=null?_<1?Math.round(_*1e3)+" ms":_.toFixed(1)+" s":"—",l:"median check time"}]}),r&&u.jsxs("div",{className:"card",children:[u.jsx("h3",{children:"New drawing package"}),u.jsxs("form",{ref:l,className:"grid2",onSubmit:E,children:[u.jsxs("label",{className:"field",children:["Job name",u.jsx("input",{name:"name",required:!0,placeholder:"Job 24-1230 · Housing"})]}),u.jsxs("label",{className:"field",children:["Customer",u.jsx("input",{name:"customer",placeholder:"OEM customer B"})]}),u.jsxs("label",{className:"field",children:["Drawings (DXF, PDF or scanned image, multiple)",u.jsx("input",{name:"drawings",type:"file",multiple:!0,accept:".dxf,.pdf,.dwg,.png,.jpg,.jpeg,.tif,.tiff"})]}),u.jsxs("label",{className:"field",children:["STEP model (optional)",u.jsx("input",{name:"step",type:"file",accept:".stp,.step"})]}),u.jsxs("label",{className:"field",children:["BOM (xlsx / csv, optional)",u.jsx("input",{name:"bom",type:"file",accept:".xlsx,.csv"})]}),u.jsxs("label",{className:"field",children:["Purchase order (xlsx / csv, optional)",u.jsx("input",{name:"po",type:"file",accept:".xlsx,.csv"})]}),u.jsxs("div",{className:"row",style:{gridColumn:"1/3"},children:[u.jsx("button",{className:"btn p",type:"submit",disabled:a==="upload",children:"Check package"}),u.jsx("button",{className:"btn",type:"button",onClick:()=>s(!1),children:"Cancel"}),a==="upload"&&u.jsxs("span",{className:"small",children:[u.jsx(nn,{})," Extracting and checking…"]})]})]})]}),f.length?u.jsxs("table",{children:[u.jsx("thead",{children:u.jsxs("tr",{children:[u.jsx("th",{children:"Job"}),u.jsx("th",{children:"Part / Rev"}),u.jsx("th",{children:"Title"}),u.jsx("th",{children:"Input"}),u.jsx("th",{children:"Findings"}),u.jsx("th",{children:"Worst"}),u.jsx("th",{children:"Status"}),u.jsx("th",{children:"Checked"}),u.jsx("th",{})]})}),u.jsx("tbody",{children:f.map(h=>{const g=h.status==="pending"||h.job.status==="queued"||h.job.status==="processing";return u.jsxs("tr",{className:"click",onClick:()=>!g&&t({view:"review",job:h.job.id,drawing:h.id}),children:[u.jsxs("td",{children:[h.job.name,u.jsx("div",{className:"small",children:h.job.customer})]}),u.jsxs("td",{className:"mono",children:[h.part_no||(g?"…":"?")," ",h.rev||""]}),u.jsx("td",{children:h.title||h.file}),u.jsxs("td",{children:[h.kind.toUpperCase(),h.job.has_step?" + STEP":"",h.job.has_bom?" + BOM":"",h.job.has_po?" + PO":""]}),u.jsx("td",{children:g?u.jsx(nn,{}):h.error?u.jsx(Je,{kind:"critical",children:"error"}):h.findings===0?u.jsx(Je,{kind:"ok",children:"0"}):u.jsx(Je,{kind:h.worst||"low",children:String(h.open)})}),u.jsx("td",{children:g?u.jsx(Je,{kind:"info",children:"processing"}):h.error?u.jsx(Je,{kind:"critical",children:"error"}):u.jsx(WS,{w:h.worst})}),u.jsx("td",{children:g?"In the queue":h.error?h.error.slice(0,60):h.open>0?"Needs review":h.findings>0?"All decided":"Clean"}),u.jsxs("td",{className:"small",children:[h.checked_at||"",u.jsx("div",{children:h.duration!=null?h.duration+" s":""})]}),u.jsx("td",{children:u.jsx("button",{className:"btn sm danger",title:"Delete job",onClick:M=>{M.stopPropagation(),v(h.job.id)},children:"✕"})})]},h.id)})})]}):u.jsxs(vn,{children:["No drawings yet. Click ",u.jsx("b",{children:"Upload drawing package"})," and add DXF, PDF or scanned drawings, with an optional STEP model, BOM and purchase order."]})]})}function iy({route:t,go:e,setCrumb:n}){var b,A,y,C,N,P,H,W;const[i,r]=te.useState(null),[s,a]=te.useState(null),[o,l]=te.useState("findings"),[c,f]=te.useState(!0),[p,d]=te.useState(0),[m,_]=te.useState(0),[E,v]=te.useState(!0);te.useEffect(()=>{let L=!0;return v(!0),(async()=>{var j;try{const I=await De.jobs(),U=t.job||((j=I[0])==null?void 0:j.id);if(!U){L&&(r(null),a(null),v(!1));return}const k=await De.job(U),z=k.drawings.find(D=>D.id===t.drawing)||k.drawings[0]||null;L&&(r(k),a(z),d(0),v(!1))}catch(I){Fe(I.message,!0),v(!1)}})(),()=>{L=!1}},[t.job,t.drawing]),te.useEffect(()=>{n(i&&s?["Drawing review",`${i.name} › ${s.part_no||s.file} Rev ${s.rev||"-"}${s.title?" › "+s.title:""}`]:["Review",""])},[i,s,n]);const h=te.useCallback(()=>_(L=>L+1),[]),g=L=>{if(!s)return;const j={...s,findings:s.findings.map(I=>I.id===L.id?{...I,...L}:I)};a(j),h()};if(E)return u.jsx("div",{className:"page",children:u.jsxs(vn,{children:[u.jsx(nn,{})," Loading…"]})});if(!i||!s)return u.jsx("div",{className:"page",children:u.jsx(vn,{children:"No drawings to review yet. Go to Queue and upload a drawing package."})});const M=s.extraction,x=L=>s.findings.filter(j=>j.severity===L&&j.status!=="rejected").length,w=async()=>{try{await De.recheck(i.id,s.id),Fe("Re-checked"),e({view:"review",job:i.id,drawing:s.id}),_(L=>L+1)}catch(L){Fe(L.message,!0)}};return u.jsxs("div",{className:"review",children:[u.jsxs("div",{className:"viewer",children:[u.jsx("div",{className:"dtabs",children:i.drawings.map(L=>u.jsxs("button",{className:L.id===s.id?"on":"",onClick:()=>e({view:"review",job:i.id,drawing:L.id}),children:[L.part_no||L.file," ",L.rev||""," ",u.jsx("span",{className:"small",style:{color:"inherit",opacity:.8},children:L.kind.toUpperCase()})]},L.id))}),u.jsx(sy,{job:i,drawing:s,markers:c,setMarkers:f,page:p,setPage:d,onRecheck:w,tick:m,initialZoom:t.zoom,initialOverlay:t.overlay},s.id),u.jsxs("div",{className:"foot",children:["Source: ",s.file," (",s.kind.toUpperCase(),(b=M==null?void 0:M.source)!=null&&b.dxfversion?" "+M.source.dxfversion:"",(A=M==null?void 0:M.source)!=null&&A.scale?", plot scale "+M.source.scale:"",", units ",((y=M==null?void 0:M.source)==null?void 0:y.units)||"?",") · ",((C=M==null?void 0:M.counts)==null?void 0:C.dimensions)??0," dimensions, ",((N=M==null?void 0:M.fcfs)==null?void 0:N.length)??0," FCF, ",((P=M==null?void 0:M.notes)==null?void 0:P.length)??0," notes, ",((H=M==null?void 0:M.circles)==null?void 0:H.length)??0," circles extracted · checked in ",s.duration," s",(W=M==null?void 0:M.source)!=null&&W.raster?` · scanned sheet read with ${M.source.ocr} OCR and the ${M.source.layout_model} layout model`:""]})]}),u.jsxs("div",{className:"panel",children:[u.jsxs("div",{className:"ph",children:[u.jsx("strong",{children:"Findings"}),["critical","high","medium","low"].map(L=>x(L)?u.jsxs(Je,{kind:L,children:[x(L)," ",L]},L):null),s.findings.length===0&&u.jsx(Je,{kind:"ok",children:"no findings"})]}),u.jsxs("div",{className:"tabs",children:[u.jsx("button",{className:o==="findings"?"on":"",onClick:()=>l("findings"),children:"Findings"}),u.jsx("button",{className:o==="extract"?"on":"",onClick:()=>l("extract"),children:"Extracted data"}),u.jsx("button",{className:o==="pipeline"?"on":"",onClick:()=>l("pipeline"),children:"Pipeline"})]}),u.jsx("div",{className:"plist",children:o==="findings"?u.jsx(ay,{job:i,drawing:s,onChange:g,go:e}):o==="extract"?u.jsx(oy,{drawing:s}):u.jsx(ly,{drawing:s})})]})]})}const ry={title_block:"#1f5fa8",note:"#1f5fa8",dimension:"#2a7a3b",callout:"#2a7a3b",fcf:"#b8720a",parts_list:"#8a5cc7",balloon:"#8a5cc7",datum:"#b8720a"};function sy({job:t,drawing:e,markers:n,setMarkers:i,page:r,setPage:s,onRecheck:a,tick:o,initialZoom:l,initialOverlay:c}){var I,U,k,z;const f=te.useRef(null),p=te.useRef(null),d=te.useRef(null),m=te.useRef({zoom:1,pan:{x:0,y:0},nat:[0,0],drag:null,fitted:!1}),[_,E]=te.useState("100%"),[v,h]=te.useState(c||"none"),[g,M]=te.useState([0,0]),x=te.useCallback(()=>{const D=m.current;p.current&&(p.current.style.transform=`translate(${D.pan.x}px,${D.pan.y}px) scale(${D.zoom})`),E(Math.round(D.zoom*100)+"%")},[]),w=te.useCallback(()=>{const D=m.current,Y=f.current;!Y||!D.nat[0]||(D.zoom=Math.min((Y.clientWidth-24)/D.nat[0],(Y.clientHeight-24)/D.nat[1]),D.pan={x:(Y.clientWidth-D.nat[0]*D.zoom)/2,y:(Y.clientHeight-D.nat[1]*D.zoom)/2},x())},[x]),b=te.useCallback((D,Y,oe)=>{const ge=m.current,He=f.current;if(!He)return;const ke=Y??He.clientWidth/2,Ie=oe??He.clientHeight/2,Z=Math.min(40,Math.max(.05,ge.zoom*D)),ne=Z/ge.zoom;ge.pan={x:ke-(ke-ge.pan.x)*ne,y:Ie-(Ie-ge.pan.y)*ne},ge.zoom=Z,x()},[x]);te.useEffect(()=>(window.addEventListener("resize",w),()=>window.removeEventListener("resize",w)),[w]),te.useEffect(()=>{const D=f.current;if(!D)return;const Y=oe=>{oe.preventDefault();const ge=D.getBoundingClientRect();b(oe.deltaY<0?1.15:1/1.15,oe.clientX-ge.left,oe.clientY-ge.top)};return D.addEventListener("wheel",Y,{passive:!1}),()=>D.removeEventListener("wheel",Y)},[b]);const A=()=>{const D=d.current,Y=m.current;Y.nat=[D.naturalWidth,D.naturalHeight],M([D.naturalWidth,D.naturalHeight]),D.width=D.naturalWidth,D.height=D.naturalHeight,p.current&&(p.current.style.width=D.naturalWidth+"px",p.current.style.height=D.naturalHeight+"px"),Y.fitted?x():(w(),Y.fitted=!0,l&&l>0&&b(l/Y.zoom))},y=D=>{m.current.drag={x:D.clientX-m.current.pan.x,y:D.clientY-m.current.pan.y}},C=D=>{const Y=m.current;Y.drag&&(Y.pan={x:D.clientX-Y.drag.x,y:D.clientY-Y.drag.y},x())},N=()=>{m.current.drag=null},P=(I=e.extraction)==null?void 0:I.source,H=!!(P!=null&&P.raster),W=(U=P==null?void 0:P.page_sizes)==null?void 0:U[r],L=W&&g[0]?g[0]/W[0]:0,j=v==="layout"?(((k=P==null?void 0:P.regions)==null?void 0:k[r])||[]).map(D=>({cls:D.cls,conf:D.conf,bbox:D.bbox})):v==="ocr"?(((z=e.extraction)==null?void 0:z.texts)||[]).filter(D=>D.bbox&&(D.page??0)===r).map(D=>({cls:"text",conf:D.conf??0,bbox:D.bbox})):[];return u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"bar",children:[u.jsx("button",{className:"btn sm",onClick:w,children:"Fit"}),u.jsx("button",{className:"btn sm",onClick:()=>b(1/1.25),children:"−"}),u.jsx("span",{className:"small",children:_}),u.jsx("button",{className:"btn sm",onClick:()=>b(1.25),children:"+"}),e.kind!=="dxf"&&e.pages>1&&u.jsxs(u.Fragment,{children:[u.jsx("button",{className:"btn sm",onClick:()=>s(Math.max(0,r-1)),children:"‹ page"}),u.jsxs("span",{className:"small",children:[r+1," / ",e.pages]}),u.jsx("button",{className:"btn sm",onClick:()=>s(Math.min(e.pages-1,r+1)),children:"page ›"})]}),u.jsxs("label",{className:"small",style:{marginLeft:6},children:[u.jsx("input",{type:"checkbox",checked:n,onChange:D=>i(D.target.checked)})," markers"]}),H&&u.jsxs("span",{className:"small",style:{marginLeft:6},children:["Overlay: ",["none","layout","ocr"].map(D=>u.jsx("button",{className:"btn sm"+(v===D?" p":""),style:{marginLeft:4},onClick:()=>h(D),children:D==="none"?"original":D==="layout"?"layout regions":"OCR lines"},D))]}),u.jsx("span",{style:{flex:1}}),u.jsx("a",{className:"btn sm",href:De.markupUrl(t.id,e.id),target:"_blank",rel:"noreferrer",children:"Markup PDF"}),u.jsx("a",{className:"btn sm",href:De.findingsUrl(t.id,e.id,"csv"),children:"Findings CSV"}),u.jsx("button",{className:"btn sm",onClick:a,children:"Re-check"})]}),u.jsx("div",{className:"stage",ref:f,onMouseDown:y,onMouseMove:C,onMouseUp:N,onMouseLeave:N,children:e.error?u.jsx(vn,{children:e.error}):u.jsxs("div",{ref:p,className:"canvaswrap",children:[u.jsx("img",{ref:d,alt:"drawing",src:De.renderUrl(t.id,e.id,r,n)+"&r="+o,onLoad:A,draggable:!1}),L>0&&j.map((D,Y)=>{const[oe,ge,He,ke]=D.bbox,Ie=ry[D.cls]||"#5b6673",Z=oe*L,ne=(W[1]-ke)*L,Se=(He-oe)*L,Ue=(ke-ge)*L;return u.jsx("div",{className:"region",style:{left:Z,top:ne,width:Se,height:Ue,borderColor:Ie,background:Ie+"14"},children:u.jsxs("span",{className:"rlabel",style:{background:Ie},children:[D.cls.replace("_"," ")," ",D.conf.toFixed(2)]})},Y)})]})})]})}const To={"TB-01":["customers","Set up wording","Add this customer's title-block wording in Setup"],"PL-01":["revisions","Add revisions","Import the customer's released revisions in Setup"],"SP-01":["specs","Add spec","Import the customer's spec register in Setup"]};function ay({job:t,drawing:e,onChange:n,go:i}){const r=te.useRef(null),[s,a]=te.useState(null);if(!e.findings.length)return u.jsxs(vn,{children:["No findings. ",e.error||"The rule checks passed on this sheet."]});const o=async(f,p)=>{try{n(await De.decide(t.id,e.id,f.id,{status:p}))}catch(d){Fe(d.message,!0)}},l=async f=>{const p=prompt("Note for this finding:",f.note||"");if(p!==null)try{n(await De.decide(t.id,e.id,f.id,{note:p}))}catch(d){Fe(d.message,!0)}},c=async f=>{var _;const p=(_=f.target.files)==null?void 0:_[0],d=s;if(f.target.value="",!p||!d)return;const m=new FormData;m.append("audio",p);try{const E=await De.voiceNote(t.id,e.id,d,m);n(E.body.finding),Fe(E.status===202?E.body.message:"Voice note transcribed and attached",E.status===202)}catch(E){Fe(E.message,!0)}};return u.jsxs(u.Fragment,{children:[u.jsx("input",{ref:r,type:"file",accept:"audio/*,.m4a,.mp3,.wav,.ogg,.webm",style:{display:"none"},onChange:c}),e.findings.map(f=>{var p;return u.jsxs("div",{className:"f "+f.status,children:[u.jsxs("div",{className:"t",children:[u.jsx("span",{className:"n",children:f.n}),u.jsx("span",{className:"ttl",children:f.title}),u.jsx("span",{className:"conf",title:"confidence",children:f.confidence.toFixed(2)})]}),u.jsx("div",{className:"loc",children:f.detail}),!!((p=f.references)!=null&&p.length)&&u.jsxs("div",{className:"small",style:{marginTop:4},children:["Basis: ",f.references.map(d=>d.title).join(" · ")]}),u.jsxs("div",{className:"b",children:[u.jsxs(Je,{kind:f.severity,children:[f.severity," · ",f.category]}),f.status==="open"?u.jsxs(u.Fragment,{children:[u.jsx("button",{className:"btn sm p",onClick:()=>o(f,"accepted"),children:"Accept"}),u.jsx("button",{className:"btn sm",onClick:()=>o(f,"rejected"),children:"Reject"})]}):u.jsxs(u.Fragment,{children:[u.jsx("span",{className:"small",children:f.status}),u.jsx("button",{className:"btn sm",onClick:()=>o(f,"open"),children:"Reopen"})]}),u.jsx("button",{className:"btn sm",onClick:()=>l(f),children:"Note"}),u.jsx("button",{className:"btn sm",title:"Attach a voice note (transcribed with AssemblyAI)",onClick:()=>{var d;a(f.id),(d=r.current)==null||d.click()},children:"Voice"}),f.loc&&u.jsx("a",{className:"btn sm",href:De.calloutUrl(t.id,e.id,f.id),target:"_blank",rel:"noreferrer",title:"Work-instruction callout image",children:"Callout"}),f.rule&&To[f.rule]&&u.jsx("button",{className:"btn sm",title:To[f.rule][2],onClick:()=>i({view:"setup",tab:To[f.rule][0],customer:t.customer?jS(t.customer):void 0}),children:To[f.rule][1]}),f.rule&&u.jsx("span",{className:"small mono",children:f.rule})]}),f.note&&u.jsx("div",{className:"note",children:f.note})]},f.id)})]})}function oy({drawing:t}){var r,s,a,o;const e=t.extraction;if(!e)return u.jsx(vn,{children:t.error||"No extraction"});const n=((r=e.title_block)==null?void 0:r.fields)||{},i=({children:l})=>u.jsx("h3",{style:{margin:"14px 0 6px",fontSize:13},children:l});return u.jsxs("div",{style:{padding:"12px 14px"},className:"kv",children:[u.jsx("h3",{style:{margin:"0 0 6px",fontSize:13},children:"Title block"}),Object.keys(n).length?Object.entries(n).map(([l,c])=>u.jsxs("div",{children:[u.jsx("span",{children:l.replace("_"," ")}),u.jsxs("span",{children:[c.value||"(blank)"," ",u.jsxs("span",{className:"small",children:[c.conf," · ",c.source||""]})]})]},l)):u.jsx("div",{className:"small",children:"none detected"}),u.jsxs(i,{children:["Notes (",((s=e.notes)==null?void 0:s.length)??0,")"]}),(e.notes||[]).map(l=>u.jsxs("div",{children:[u.jsx("span",{children:l.n}),u.jsx("span",{children:l.text})]},l.n)),u.jsxs(i,{children:["Dimensions (",((a=e.dimensions)==null?void 0:a.length)??0,")"]}),(e.dimensions||[]).map((l,c)=>u.jsxs("div",{children:[u.jsx("span",{children:l.type}),u.jsxs("span",{className:"mono",children:[l.text,l.measured!=null&&l.override?u.jsxs("span",{className:"small",children:[" (geometry ",l.measured,")"]}):null]})]},c)),u.jsx(i,{children:"GD&T"}),(e.fcfs||[]).map((l,c)=>u.jsxs("div",{children:[u.jsx("span",{children:l.symbol||"frame"}),u.jsxs("span",{children:[l.diameter?"Ø":"",l.tolerance??"?"," ",(l.modifiers||[]).join(" ")," → ",(l.datums||[]).join("-")||"no datums"]})]},c)),!(e.fcfs||[]).length&&u.jsx("div",{className:"small",children:"no feature control frames"}),u.jsxs("div",{children:[u.jsx("span",{children:"datums defined"}),u.jsx("span",{children:(e.datums||[]).map(l=>l.id).join(", ")||"none"})]}),u.jsx(i,{children:"Callouts & threads"}),(e.threads||[]).map((l,c)=>u.jsxs("div",{children:[u.jsx("span",{children:"thread"}),u.jsxs("span",{children:[l.spec," · tap drill Ø",l.tap_drill,l.circle?` · hole Ø${(l.circle.r*2).toFixed(2)} (${l.circle.via})`:" · no hole associated"]})]},c)),(e.callouts||[]).filter(l=>!/^\s*\d+[.)]/.test(l.text)).map((l,c)=>u.jsxs("div",{children:[u.jsx("span",{children:"callout"}),u.jsx("span",{children:l.text})]},c)),u.jsx(i,{children:"Specs referenced"}),(e.specs||[]).map((l,c)=>u.jsxs("div",{children:[u.jsx("span",{children:l.ref}),u.jsx("span",{children:l.rev?"Rev "+l.rev:"no rev stated"})]},c)),!(e.specs||[]).length&&u.jsx("div",{className:"small",children:"none"}),e.parts_list&&u.jsxs(u.Fragment,{children:[u.jsxs(i,{children:["Parts list (",e.parts_list.rows.length,")"]}),e.parts_list.rows.map(l=>u.jsxs("div",{children:[u.jsx("span",{children:l.item}),u.jsxs("span",{className:"mono",children:[l.qty,"× ",l.part_no," ",l.description||""," ",l.rev?"rev "+l.rev:""]})]},l.item))]}),!!((o=e.warnings)!=null&&o.length)&&u.jsxs(u.Fragment,{children:[u.jsx(i,{children:"Parser notes"}),e.warnings.map((l,c)=>u.jsx("div",{className:"small",children:l},c))]})]})}function ly({drawing:t}){const e=t.trace||[];return u.jsxs("div",{style:{padding:"12px 14px"},className:"kv",children:[u.jsx("div",{className:"small",style:{marginBottom:8},children:"LangGraph review pipeline: ingest → extract → rule check → enrich (retrieval) → finalize. Each node's status and time for this drawing."}),e.length?e.map((n,i)=>u.jsxs("div",{children:[u.jsx("span",{children:n.node}),u.jsxs("span",{children:[u.jsx(Je,{kind:n.status==="ok"?"ok":n.status==="skipped"?"info":"critical",children:n.status})," ",u.jsxs("span",{className:"mono",children:[n.ms," ms"]})," ",u.jsx("span",{className:"small",children:n.detail})]})]},i)):u.jsx("div",{className:"small",children:"No trace recorded for this drawing (checked before the pipeline graph was introduced). Re-check to record one."})]})}const Xp={dxf:0,pdf:1,image:2};function $p(t){const e=(t||"").toUpperCase().replace(/[^A-Z0-9]/g,"");return e?/^\d+$/.test(e)?[1,Number(e),""]:[2,e.length,e]:[0,0,""]}function cy(t,e){const n=$p(t),i=$p(e);return n[0]-i[0]||n[1]-i[1]||n[2].localeCompare(i[2])}function uy(t){const e=[];for(const i of t)i.part_no&&!e.includes(i.part_no)&&e.push(i.part_no);const n=new Map;for(const i of[...t].reverse()){if(!i.part_no||!i.rev)continue;const r=i.part_no+"|"+i.rev,s=n.get(r);(!s||(Xp[i.kind]??9)<(Xp[s.kind]??9))&&n.set(r,i)}for(const i of e){const r=[...n.values()].filter(s=>s.part_no===i).sort((s,a)=>cy(s.rev,a.rev));if(r.length>=2)return[r[r.length-2].value,r[r.length-1].value]}return t.length>1?[t[1].value,t[0].value]:null}function jl(t){return t.flatMap(e=>e.drawings.filter(n=>!n.error).map(n=>({value:e.id+"|"+n.id,label:`${n.part_no||n.file} Rev ${n.rev||"?"} — ${n.file} (${e.name.split(" · ")[0]})`,part_no:n.part_no,rev:n.rev,kind:n.kind})))}function dy({setCrumb:t}){const[e,n]=te.useState([]),[i,r]=te.useState(""),[s,a]=te.useState(""),[o,l]=te.useState(null),[c,f]=te.useState(!1),[p,d]=te.useState(""),m=()=>{const[g,M]=i.split("|"),[x,w]=s.split("|");return[g,M,x,w]},_=async()=>{const[g,M,x,w]=m();try{const b=await De.compareInbox(g,M,x,w);d(b.channel==="smtp"?`Sent to ${b.to}`:`Dropped in the quality inbox folder (${b.location}). ${b.note||""}`),Fe("Change report handed to quality")}catch(b){Fe(b.message,!0)}};te.useEffect(()=>{t(["Revision comparison",""]),De.jobs().then(g=>{n(g);const M=uy(jl(g));M&&(r(M[0]),a(M[1]))}).catch(g=>Fe(g.message,!0))},[t]);const E=jl(e),v=async()=>{if(!(!i||!s)){f(!0);try{const[g,M]=i.split("|"),[x,w]=s.split("|");l(await De.compare(g,M,x,w))}catch(g){Fe(g.message,!0)}f(!1)}};te.useEffect(()=>{i&&s&&!o&&v()},[i,s]);const h={match:u.jsx(Je,{kind:"ok",children:"ECO matches PLM"}),mismatch:u.jsx(Je,{kind:"critical",children:"ECO mismatch"}),"missing on drawing":u.jsx(Je,{kind:"medium",children:"No ECO on drawing"}),"revision not released":u.jsx(Je,{kind:"high",children:"Rev not released in PLM"}),unknown:u.jsx(Je,{kind:"info",children:"Part not in PLM"})};return u.jsxs("div",{className:"page",children:[u.jsx("h2",{children:"Revision comparison"}),u.jsx("p",{className:"sub",children:"Pick two revisions of the same part. PrintVerity pairs dimensions by feature points, notes by number and text, and classifies each change by impact."}),u.jsxs("div",{className:"card",children:[u.jsxs("div",{className:"grid2",children:[u.jsxs("label",{className:"field",children:["From (older revision)",u.jsx("select",{value:i,onChange:g=>r(g.target.value),children:E.map(g=>u.jsx("option",{value:g.value,children:g.label},g.value))})]}),u.jsxs("label",{className:"field",children:["To (newer revision)",u.jsx("select",{value:s,onChange:g=>a(g.target.value),children:E.map(g=>u.jsx("option",{value:g.value,children:g.label},g.value))})]})]}),u.jsxs("div",{className:"row",style:{marginTop:10},children:[u.jsx("button",{className:"btn p",onClick:v,disabled:c,children:"Compare"}),c&&u.jsx(nn,{})]})]}),o&&u.jsxs(u.Fragment,{children:[u.jsx(fv,{items:[{v:o.summary.total,l:`changes ${o.labelA} → ${o.labelB}`},{v:o.summary.dimensions,l:"dimensions / tolerances"},{v:o.summary.notes+o.summary.callouts,l:"notes and callouts"},{v:o.summary.affects_fit,l:"affect fit or function",color:o.summary.affects_fit?"var(--red)":"var(--green)"}]}),u.jsxs("div",{className:"grid2",children:[u.jsxs("div",{className:"card",children:[u.jsxs("h3",{children:["ECO cross-check ",h[o.eco.status]||null]}),u.jsxs("div",{className:"kv",children:[u.jsxs("div",{children:[u.jsx("span",{children:"Part"}),u.jsxs("span",{className:"mono",children:[o.eco.part_no," Rev ",o.eco.rev]})]}),u.jsxs("div",{children:[u.jsx("span",{children:"Drawing ECO"}),u.jsx("span",{className:"mono",children:o.eco.drawing_eco||"—"})]}),u.jsxs("div",{children:[u.jsx("span",{children:"PLM ECO"}),u.jsxs("span",{className:"mono",children:[o.eco.plm_eco||"—"," ",o.eco.plm_rev?`(Rev ${o.eco.plm_rev}, released ${o.eco.released})`:"",o.eco.source?u.jsxs("span",{className:"small",children:[" · ",o.eco.source]}):null]})]})]})]}),u.jsxs("div",{className:"card",children:[u.jsx("h3",{children:"Downstream"}),o.downstream.length?u.jsx("ul",{style:{margin:0,paddingLeft:18,fontSize:13},children:o.downstream.map((g,M)=>u.jsx("li",{children:g},M))}):u.jsx("div",{className:"small",children:"No downstream actions."})]})]}),u.jsxs("div",{className:"row",style:{margin:"12px 0"},children:[u.jsx("a",{className:"btn p",href:De.compareXlsxUrl(...m()),children:"Export change report (xlsx)"}),u.jsx("a",{className:"btn",href:De.comparePdfUrl(...m()),target:"_blank",rel:"noreferrer",children:"Open side-by-side PDF"}),u.jsx("button",{className:"btn",onClick:_,children:"Send to quality inbox"}),p&&u.jsx("span",{className:"small",children:p})]}),u.jsxs("table",{children:[u.jsx("thead",{children:u.jsxs("tr",{children:[u.jsx("th",{children:"#"}),u.jsx("th",{children:"Kind"}),u.jsx("th",{children:"Item"}),u.jsx("th",{children:o.labelA}),u.jsx("th",{children:o.labelB}),u.jsx("th",{children:"Change"}),u.jsx("th",{children:"Impact"})]})}),u.jsx("tbody",{children:o.changes.length?o.changes.map((g,M)=>u.jsxs("tr",{children:[u.jsx("td",{children:M+1}),u.jsx("td",{children:g.kind}),u.jsx("td",{children:g.item}),u.jsx("td",{className:"mono",children:g.a}),u.jsx("td",{className:"mono",children:g.b}),u.jsx("td",{children:g.change}),u.jsxs("td",{children:[u.jsx(Je,{kind:g.impact,children:g.impact})," ",u.jsx("span",{className:"small",children:g.why})]})]},M)):u.jsx("tr",{children:u.jsx("td",{colSpan:7,className:"empty",children:"No differences found."})})})]})]})]})}function hy({setCrumb:t}){var p;const[e,n]=te.useState([]),[i,r]=te.useState(""),[s,a]=te.useState(null),[o,l]=te.useState(!1);te.useEffect(()=>{t(["Cross-document consistency",""]),De.jobs().then(d=>{var m;n(d),r(((m=d.find(_=>_.has_bom||_.has_po)||d[0])==null?void 0:m.id)||"")}).catch(d=>Fe(d.message,!0))},[t]);const c=async(d=i)=>{if(d){l(!0);try{a(await De.consistency(d))}catch(m){Fe(m.message,!0)}l(!1)}};te.useEffect(()=>{i&&c(i)},[i]);const f=async d=>{d.preventDefault();const m=new FormData(d.currentTarget);try{await De.addFiles(i,m),Fe("Files attached"),n(await De.jobs()),c()}catch(_){Fe(_.message,!0)}};return u.jsxs("div",{className:"page",children:[u.jsx("h2",{children:"Drawing set vs BOM vs purchase order"}),u.jsx("p",{className:"sub",children:"Reads the drawings, the BOM and the PO of a job together and flags where they disagree: revision, material, finish, quantities, hardware."}),u.jsxs("div",{className:"card",children:[u.jsxs("div",{className:"row",children:[u.jsxs("label",{className:"field",children:["Job",u.jsx("select",{value:i,onChange:d=>r(d.target.value),children:e.map(d=>u.jsxs("option",{value:d.id,children:[d.name,d.has_bom?" · BOM":"",d.has_po?" · PO":""]},d.id))})]}),u.jsx("button",{className:"btn p",style:{marginTop:16},onClick:()=>c(),disabled:o,children:"Run check"}),o&&u.jsx(nn,{})]}),u.jsxs("form",{className:"row",style:{marginTop:8},onSubmit:f,children:[u.jsx("span",{className:"small",children:"Add to this job:"}),u.jsxs("label",{className:"field",children:["BOM",u.jsx("input",{type:"file",name:"bom",accept:".xlsx,.csv"})]}),u.jsxs("label",{className:"field",children:["PO",u.jsx("input",{type:"file",name:"po",accept:".xlsx,.csv"})]}),u.jsx("button",{className:"btn sm",style:{marginTop:16},children:"Attach and re-run"})]})]}),s&&u.jsxs(u.Fragment,{children:[!!((p=s.errors)!=null&&p.length)&&u.jsx("div",{className:"card warn",children:s.errors.map((d,m)=>u.jsx("div",{children:d},m))}),u.jsxs("div",{className:"row",style:{marginBottom:10},children:[s.conflicts?u.jsxs(Je,{kind:"critical",children:[s.conflicts," conflicts"]}):u.jsx(Je,{kind:"ok",children:"no conflicts"}),u.jsxs("span",{className:"small",children:["Sources: ",s.sources.join(" · ")]})]}),u.jsxs("table",{children:[u.jsx("thead",{children:u.jsxs("tr",{children:[u.jsx("th",{children:"Field"}),u.jsx("th",{children:"Part"}),u.jsx("th",{children:"Drawing"}),u.jsx("th",{children:"BOM"}),u.jsx("th",{children:"PO"}),u.jsx("th",{children:"Status"}),u.jsx("th",{children:"Detail"})]})}),u.jsx("tbody",{children:s.rows.length?s.rows.map((d,m)=>u.jsxs("tr",{children:[u.jsx("td",{children:d.field}),u.jsx("td",{className:"mono",children:d.part}),u.jsx("td",{className:"mono",children:d.drawing}),u.jsx("td",{className:"mono",children:d.bom}),u.jsx("td",{className:"mono",children:d.po}),u.jsx("td",{children:u.jsx(Je,{kind:d.status,children:d.label})}),u.jsx("td",{className:"small",children:d.detail})]},m)):u.jsx("tr",{children:u.jsx("td",{colSpan:7,className:"empty",children:"Nothing to compare."})})})]})]})]})}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const sf="186",Ls={ROTATE:0,DOLLY:1,PAN:2},ws={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},fy=0,Yp=1,py=2,pl=1,my=2,ga=3,Gr=0,Mn=1,Ni=2,Fi=0,Aa=1,qp=2,Kp=3,Zp=4,gy=5,us=100,_y=101,vy=102,xy=103,Sy=104,yy=200,My=201,Ey=202,wy=203,vv=204,xv=205,Ty=206,by=207,Ay=208,Cy=209,Ry=210,Py=211,Ny=212,Ly=213,Dy=214,yd=0,Md=1,Ed=2,Xa=3,wd=4,Td=5,bd=6,Ad=7,Sv=0,Iy=1,Uy=2,_i=0,yv=1,Mv=2,Ev=3,wv=4,Tv=5,bv=6,Av=7,Cv=300,jr=301,Gs=302,Yc=303,qc=304,mc=306,Cd=1e3,Ii=1001,Rd=1002,Xt=1003,Fy=1004,bo=1005,rn=1006,Kc=1007,Ir=1008,An=1009,Rv=1010,Pv=1011,$a=1012,af=1013,vi=1014,fi=1015,xi=1016,of=1017,lf=1018,Ya=1020,Nv=35902,Lv=35899,Dv=1021,Iv=1022,Jn=1023,Gi=1026,Ur=1027,Uv=1028,cf=1029,Wr=1030,uf=1031,df=1033,ml=33776,gl=33777,_l=33778,vl=33779,Pd=35840,Nd=35841,Ld=35842,Dd=35843,Id=36196,Ud=37492,Fd=37496,Od=37488,kd=37489,Wl=37490,Bd=37491,zd=37808,Hd=37809,Vd=37810,Gd=37811,jd=37812,Wd=37813,Xd=37814,$d=37815,Yd=37816,qd=37817,Kd=37818,Zd=37819,Qd=37820,Jd=37821,eh=36492,th=36494,nh=36495,ih=36283,rh=36284,Xl=36285,sh=36286,Oy=3200,ah=0,ky=1,rr="",Un="srgb",$l="srgb-linear",Yl="linear",ot="srgb",Zc=7680,By=519,zy=512,Hy=513,Vy=514,hf=515,Gy=516,jy=517,ff=518,Wy=519,Xy=35044,Qp="300 es",pi=2e3,qa=2001;function $y(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function ql(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function Yy(){const t=ql("canvas");return t.style.display="block",t}const Jp={};function em(...t){const e="THREE."+t.shift();console.log(e,...t)}function Fv(t){const e=t[0];if(typeof e=="string"&&e.startsWith("TSL:")){const n=t[1];n&&n.isStackTrace?t[0]+=" "+n.getLocation():t[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return t}function Le(...t){t=Fv(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.warn(n.getError(e)):console.warn(e,...t)}}function it(...t){t=Fv(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.error(n.getError(e)):console.error(e,...t)}}function Ds(...t){const e=t.join(" ");e in Jp||(Jp[e]=!0,Le(...t))}function qy(t,e,n){return new Promise(function(i,r){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}const Ky={[yd]:Md,[Ed]:bd,[wd]:Ad,[Xa]:Td,[Md]:yd,[bd]:Ed,[Ad]:wd,[Td]:Xa};class Mr{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const i=n[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Jt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let tm=1234567;const Is=Math.PI/180,Ka=180/Math.PI;function Ys(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Jt[t&255]+Jt[t>>8&255]+Jt[t>>16&255]+Jt[t>>24&255]+"-"+Jt[e&255]+Jt[e>>8&255]+"-"+Jt[e>>16&15|64]+Jt[e>>24&255]+"-"+Jt[n&63|128]+Jt[n>>8&255]+"-"+Jt[n>>16&255]+Jt[n>>24&255]+Jt[i&255]+Jt[i>>8&255]+Jt[i>>16&255]+Jt[i>>24&255]).toLowerCase()}function We(t,e,n){return Math.max(e,Math.min(n,t))}function pf(t,e){return(t%e+e)%e}function Zy(t,e,n,i,r){return i+(t-e)*(r-i)/(n-e)}function Qy(t,e,n){return t!==e?(n-t)/(e-t):0}function Ca(t,e,n){return(1-n)*t+n*e}function Jy(t,e,n,i){return Ca(t,e,1-Math.exp(-n*i))}function eM(t,e=1){return e-Math.abs(pf(t,e*2)-e)}function tM(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*(3-2*t))}function nM(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*t*(t*(t*6-15)+10))}function iM(t,e){return t+Math.floor(Math.random()*(e-t+1))}function rM(t,e){return t+Math.random()*(e-t)}function sM(t){return t*(.5-Math.random())}function aM(t){t!==void 0&&(tm=t);let e=tm+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function oM(t){return t*Is}function lM(t){return t*Ka}function cM(t){return t>0&&Number.isInteger(t)&&2**Math.round(Math.log2(t))===t}function uM(t){return Math.pow(2,Math.ceil(Math.log(t)/Math.LN2))}function dM(t){return Math.pow(2,Math.floor(Math.log(t)/Math.LN2))}function hM(t,e,n,i,r){const s=Math.cos,a=Math.sin,o=s(n/2),l=a(n/2),c=s((e+i)/2),f=a((e+i)/2),p=s((e-i)/2),d=a((e-i)/2),m=s((i-e)/2),_=a((i-e)/2);switch(r){case"XYX":t.set(o*f,l*p,l*d,o*c);break;case"YZY":t.set(l*d,o*f,l*p,o*c);break;case"ZXZ":t.set(l*p,l*d,o*f,o*c);break;case"XZX":t.set(o*f,l*_,l*m,o*c);break;case"YXY":t.set(l*m,o*f,l*_,o*c);break;case"ZYZ":t.set(l*_,l*m,o*f,o*c);break;default:Le("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function ds(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:case Uint8ClampedArray:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function on(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Ov={DEG2RAD:Is,RAD2DEG:Ka,generateUUID:Ys,clamp:We,euclideanModulo:pf,mapLinear:Zy,inverseLerp:Qy,lerp:Ca,damp:Jy,pingpong:eM,smoothstep:tM,smootherstep:nM,randInt:iM,randFloat:rM,randFloatSpread:sM,seededRandom:aM,degToRad:oM,radToDeg:lM,isPowerOfTwo:cM,ceilPowerOfTwo:uM,floorPowerOfTwo:dM,setQuaternionFromProperEuler:hM,normalize:on,denormalize:ds},Sf=class Sf{constructor(e=0,n=0){this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=We(this.x,e.x,n.x),this.y=We(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=We(this.x,e,n),this.y=We(this.y,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(We(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(We(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Sf.prototype.isVector2=!0;let Oe=Sf;class _r{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,a,o){let l=i[r+0],c=i[r+1],f=i[r+2],p=i[r+3],d=s[a+0],m=s[a+1],_=s[a+2],E=s[a+3];if(p!==E||l!==d||c!==m||f!==_){let v=l*d+c*m+f*_+p*E;v<0&&(d=-d,m=-m,_=-_,E=-E,v=-v);let h=1-o;if(v<.9995){const g=Math.acos(v),M=Math.sin(g);h=Math.sin(h*g)/M,o=Math.sin(o*g)/M,l=l*h+d*o,c=c*h+m*o,f=f*h+_*o,p=p*h+E*o}else{l=l*h+d*o,c=c*h+m*o,f=f*h+_*o,p=p*h+E*o;const g=1/Math.sqrt(l*l+c*c+f*f+p*p);l*=g,c*=g,f*=g,p*=g}}e[n]=l,e[n+1]=c,e[n+2]=f,e[n+3]=p}static multiplyQuaternionsFlat(e,n,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],f=i[r+3],p=s[a],d=s[a+1],m=s[a+2],_=s[a+3];return e[n]=o*_+f*p+l*m-c*d,e[n+1]=l*_+f*d+c*p-o*m,e[n+2]=c*_+f*m+o*d-l*p,e[n+3]=f*_-o*p-l*d-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),f=o(r/2),p=o(s/2),d=l(i/2),m=l(r/2),_=l(s/2);switch(a){case"XYZ":this._x=d*f*p+c*m*_,this._y=c*m*p-d*f*_,this._z=c*f*_+d*m*p,this._w=c*f*p-d*m*_;break;case"YXZ":this._x=d*f*p+c*m*_,this._y=c*m*p-d*f*_,this._z=c*f*_-d*m*p,this._w=c*f*p+d*m*_;break;case"ZXY":this._x=d*f*p-c*m*_,this._y=c*m*p+d*f*_,this._z=c*f*_+d*m*p,this._w=c*f*p-d*m*_;break;case"ZYX":this._x=d*f*p-c*m*_,this._y=c*m*p+d*f*_,this._z=c*f*_-d*m*p,this._w=c*f*p+d*m*_;break;case"YZX":this._x=d*f*p+c*m*_,this._y=c*m*p+d*f*_,this._z=c*f*_-d*m*p,this._w=c*f*p-d*m*_;break;case"XZY":this._x=d*f*p-c*m*_,this._y=c*m*p-d*f*_,this._z=c*f*_+d*m*p,this._w=c*f*p+d*m*_;break;default:Le("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],a=n[1],o=n[5],l=n[9],c=n[2],f=n[6],p=n[10],d=i+o+p;if(d>0){const m=.5/Math.sqrt(d+1);this._w=.25/m,this._x=(f-l)*m,this._y=(s-c)*m,this._z=(a-r)*m}else if(i>o&&i>p){const m=2*Math.sqrt(1+i-o-p);this._w=(f-l)/m,this._x=.25*m,this._y=(r+a)/m,this._z=(s+c)/m}else if(o>p){const m=2*Math.sqrt(1+o-i-p);this._w=(s-c)/m,this._x=(r+a)/m,this._y=.25*m,this._z=(l+f)/m}else{const m=2*Math.sqrt(1+p-i-o);this._w=(a-r)/m,this._x=(s+c)/m,this._y=(l+f)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(We(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,a=e._w,o=n._x,l=n._y,c=n._z,f=n._w;return this._x=i*f+a*o+r*c-s*l,this._y=r*f+a*l+s*o-i*c,this._z=s*f+a*c+i*l-r*o,this._w=a*f-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,n){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let l=1-n;if(o<.9995){const c=Math.acos(o),f=Math.sin(c);l=Math.sin(l*c)/f,n=Math.sin(n*c)/f,this._x=this._x*l+i*n,this._y=this._y*l+r*n,this._z=this._z*l+s*n,this._w=this._w*l+a*n,this._onChangeCallback()}else this._x=this._x*l+i*n,this._y=this._y*l+r*n,this._z=this._z*l+s*n,this._w=this._w*l+a*n,this.normalize();return this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const yf=class yf{constructor(e=0,n=0,i=0){this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(nm.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(nm.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),f=2*(o*n-s*r),p=2*(s*i-a*n);return this.x=n+l*c+a*p-o*f,this.y=i+l*f+o*c-s*p,this.z=r+l*p+s*f-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=We(this.x,e.x,n.x),this.y=We(this.y,e.y,n.y),this.z=We(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=We(this.x,e,n),this.y=We(this.y,e,n),this.z=We(this.z,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(We(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,a=n.x,o=n.y,l=n.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Qc.copy(this).projectOnVector(e),this.sub(Qc)}reflect(e){return this.sub(Qc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(We(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};yf.prototype.isVector3=!0;let G=yf;const Qc=new G,nm=new _r,Mf=class Mf{constructor(e,n,i,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,a,o,l,c)}set(e,n,i,r,s,a,o,l,c){const f=this.elements;return f[0]=e,f[1]=r,f[2]=o,f[3]=n,f[4]=s,f[5]=l,f[6]=i,f[7]=a,f[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],f=i[4],p=i[7],d=i[2],m=i[5],_=i[8],E=r[0],v=r[3],h=r[6],g=r[1],M=r[4],x=r[7],w=r[2],b=r[5],A=r[8];return s[0]=a*E+o*g+l*w,s[3]=a*v+o*M+l*b,s[6]=a*h+o*x+l*A,s[1]=c*E+f*g+p*w,s[4]=c*v+f*M+p*b,s[7]=c*h+f*x+p*A,s[2]=d*E+m*g+_*w,s[5]=d*v+m*M+_*b,s[8]=d*h+m*x+_*A,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],f=e[8];return n*a*f-n*o*c-i*s*f+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],f=e[8],p=f*a-o*c,d=o*l-f*s,m=c*s-a*l,_=n*p+i*d+r*m;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const E=1/_;return e[0]=p*E,e[1]=(r*c-f*i)*E,e[2]=(o*i-r*a)*E,e[3]=d*E,e[4]=(f*n-r*l)*E,e[5]=(r*s-o*n)*E,e[6]=m*E,e[7]=(i*l-c*n)*E,e[8]=(a*n-i*s)*E,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+n,0,0,1),this}scale(e,n){return Ds("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Jc.makeScale(e,n)),this}rotate(e){return Ds("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Jc.makeRotation(-e)),this}translate(e,n){return Ds("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Jc.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Mf.prototype.isMatrix3=!0;let Be=Mf;const Jc=new Be,im=new Be().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),rm=new Be().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function fM(){const t={enabled:!0,workingColorSpace:$l,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===ot&&(r.r=Oi(r.r),r.g=Oi(r.g),r.b=Oi(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ot&&(r.r=Us(r.r),r.g=Us(r.g),r.b=Us(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===rr?Yl:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Ds("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),t.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Ds("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),t.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return t.define({[$l]:{primaries:e,whitePoint:i,transfer:Yl,toXYZ:im,fromXYZ:rm,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Un},outputColorSpaceConfig:{drawingBufferColorSpace:Un}},[Un]:{primaries:e,whitePoint:i,transfer:ot,toXYZ:im,fromXYZ:rm,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Un}}}),t}const Ze=fM();function Oi(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function Us(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let Zr;class pM{static getDataURL(e,n="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Zr===void 0&&(Zr=ql("canvas")),Zr.width=e.width,Zr.height=e.height;const r=Zr.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Zr}return i.toDataURL(n)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=ql("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Oi(s[a]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Oi(n[i]/255)*255):n[i]=Oi(n[i]);return{data:n,width:e.width,height:e.height}}else return Le("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let mM=0;class mf{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:mM++}),this.uuid=Ys(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?e.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?e.set(n.displayWidth,n.displayHeight,0):n!==null?e.set(n.width,n.height,n.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(eu(r[a].image)):s.push(eu(r[a]))}else s=eu(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function eu(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?pM.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(Le("Texture: Unable to serialize Texture."),{})}let gM=0;const tu=new G;class dn extends Mr{constructor(e=dn.DEFAULT_IMAGE,n=dn.DEFAULT_MAPPING,i=Ii,r=Ii,s=rn,a=Ir,o=Jn,l=An,c=dn.DEFAULT_ANISOTROPY,f=rr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:gM++}),this.uuid=Ys(),this.name="",this.source=new mf(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Oe(0,0),this.repeat=new Oe(1,1),this.center=new Oe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Be,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(tu).x}get height(){return this.source.getSize(tu).y}get depth(){return this.source.getSize(tu).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const n in e){const i=e[n];if(i===void 0){Le(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){Le(`Texture.setValues(): property '${n}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Cv)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Cd:e.x=e.x-Math.floor(e.x);break;case Ii:e.x=e.x<0?0:1;break;case Rd:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Cd:e.y=e.y-Math.floor(e.y);break;case Ii:e.y=e.y<0?0:1;break;case Rd:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}dn.DEFAULT_IMAGE=null;dn.DEFAULT_MAPPING=Cv;dn.DEFAULT_ANISOTROPY=1;const Ef=class Ef{constructor(e=0,n=0,i=0,r=1){this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*n+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*n+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*n+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*n+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const l=e.elements,c=l[0],f=l[4],p=l[8],d=l[1],m=l[5],_=l[9],E=l[2],v=l[6],h=l[10];if(Math.abs(f-d)<.01&&Math.abs(p-E)<.01&&Math.abs(_-v)<.01){if(Math.abs(f+d)<.1&&Math.abs(p+E)<.1&&Math.abs(_+v)<.1&&Math.abs(c+m+h-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const M=(c+1)/2,x=(m+1)/2,w=(h+1)/2,b=(f+d)/4,A=(p+E)/4,y=(_+v)/4;return M>x&&M>w?M<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(M),r=b/i,s=A/i):x>w?x<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(x),i=b/r,s=y/r):w<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),i=A/s,r=y/s),this.set(i,r,s,n),this}let g=Math.sqrt((v-_)*(v-_)+(p-E)*(p-E)+(d-f)*(d-f));return Math.abs(g)<.001&&(g=1),this.x=(v-_)/g,this.y=(p-E)/g,this.z=(d-f)/g,this.w=Math.acos((c+m+h-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=We(this.x,e.x,n.x),this.y=We(this.y,e.y,n.y),this.z=We(this.z,e.z,n.z),this.w=We(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=We(this.x,e,n),this.y=We(this.y,e,n),this.z=We(this.z,e,n),this.w=We(this.w,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(We(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Ef.prototype.isVector4=!0;let Et=Ef;class _M extends Mr{constructor(e=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:rn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=i.depth,this.scissor=new Et(0,0,e,n),this.scissorTest=!1,this.viewport=new Et(0,0,e,n),this.textures=[];const r={width:e,height:n,depth:i.depth},s=new dn(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const n={minFilter:rn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(n.mapping=e.mapping),e.wrapS!==void 0&&(n.wrapS=e.wrapS),e.wrapT!==void 0&&(n.wrapT=e.wrapT),e.wrapR!==void 0&&(n.wrapR=e.wrapR),e.magFilter!==void 0&&(n.magFilter=e.magFilter),e.minFilter!==void 0&&(n.minFilter=e.minFilter),e.format!==void 0&&(n.format=e.format),e.type!==void 0&&(n.type=e.type),e.anisotropy!==void 0&&(n.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(n.colorSpace=e.colorSpace),e.flipY!==void 0&&(n.flipY=e.flipY),e.generateMipmaps!==void 0&&(n.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(n.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++){this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const r=Object.assign({},e.textures[n].image);this.textures[n].source=new mf(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const n=e.depthTexture.clone();n.renderTarget=null,this.depthTexture=n}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ni extends _M{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class kv extends dn{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Xt,this.minFilter=Xt,this.wrapR=Ii,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class vM extends dn{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Xt,this.minFilter=Xt,this.wrapR=Ii,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}const Ql=class Ql{constructor(e,n,i,r,s,a,o,l,c,f,p,d,m,_,E,v){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,a,o,l,c,f,p,d,m,_,E,v)}set(e,n,i,r,s,a,o,l,c,f,p,d,m,_,E,v){const h=this.elements;return h[0]=e,h[4]=n,h[8]=i,h[12]=r,h[1]=s,h[5]=a,h[9]=o,h[13]=l,h[2]=c,h[6]=f,h[10]=p,h[14]=d,h[3]=m,h[7]=_,h[11]=E,h[15]=v,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ql().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return this.determinantAffine()===0?(e.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const n=this.elements,i=e.elements,r=1/Qr.setFromMatrixColumn(e,0).length(),s=1/Qr.setFromMatrixColumn(e,1).length(),a=1/Qr.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*a,n[9]=i[9]*a,n[10]=i[10]*a,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),f=Math.cos(s),p=Math.sin(s);if(e.order==="XYZ"){const d=a*f,m=a*p,_=o*f,E=o*p;n[0]=l*f,n[4]=-l*p,n[8]=c,n[1]=m+_*c,n[5]=d-E*c,n[9]=-o*l,n[2]=E-d*c,n[6]=_+m*c,n[10]=a*l}else if(e.order==="YXZ"){const d=l*f,m=l*p,_=c*f,E=c*p;n[0]=d+E*o,n[4]=_*o-m,n[8]=a*c,n[1]=a*p,n[5]=a*f,n[9]=-o,n[2]=m*o-_,n[6]=E+d*o,n[10]=a*l}else if(e.order==="ZXY"){const d=l*f,m=l*p,_=c*f,E=c*p;n[0]=d-E*o,n[4]=-a*p,n[8]=_+m*o,n[1]=m+_*o,n[5]=a*f,n[9]=E-d*o,n[2]=-a*c,n[6]=o,n[10]=a*l}else if(e.order==="ZYX"){const d=a*f,m=a*p,_=o*f,E=o*p;n[0]=l*f,n[4]=_*c-m,n[8]=d*c+E,n[1]=l*p,n[5]=E*c+d,n[9]=m*c-_,n[2]=-c,n[6]=o*l,n[10]=a*l}else if(e.order==="YZX"){const d=a*l,m=a*c,_=o*l,E=o*c;n[0]=l*f,n[4]=E-d*p,n[8]=_*p+m,n[1]=p,n[5]=a*f,n[9]=-o*f,n[2]=-c*f,n[6]=m*p+_,n[10]=d-E*p}else if(e.order==="XZY"){const d=a*l,m=a*c,_=o*l,E=o*c;n[0]=l*f,n[4]=-p,n[8]=c*f,n[1]=d*p+E,n[5]=a*f,n[9]=m*p-_,n[2]=_*p-m,n[6]=o*f,n[10]=E*p+d}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(xM,e,SM)}lookAt(e,n,i){const r=this.elements;return wn.subVectors(e,n),wn.lengthSq()===0&&(wn.z=1),wn.normalize(),qi.crossVectors(i,wn),qi.lengthSq()===0&&(Math.abs(i.z)===1?wn.x+=1e-4:wn.z+=1e-4,wn.normalize(),qi.crossVectors(i,wn)),qi.normalize(),Ao.crossVectors(wn,qi),r[0]=qi.x,r[4]=Ao.x,r[8]=wn.x,r[1]=qi.y,r[5]=Ao.y,r[9]=wn.y,r[2]=qi.z,r[6]=Ao.z,r[10]=wn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],f=i[1],p=i[5],d=i[9],m=i[13],_=i[2],E=i[6],v=i[10],h=i[14],g=i[3],M=i[7],x=i[11],w=i[15],b=r[0],A=r[4],y=r[8],C=r[12],N=r[1],P=r[5],H=r[9],W=r[13],L=r[2],j=r[6],I=r[10],U=r[14],k=r[3],z=r[7],D=r[11],Y=r[15];return s[0]=a*b+o*N+l*L+c*k,s[4]=a*A+o*P+l*j+c*z,s[8]=a*y+o*H+l*I+c*D,s[12]=a*C+o*W+l*U+c*Y,s[1]=f*b+p*N+d*L+m*k,s[5]=f*A+p*P+d*j+m*z,s[9]=f*y+p*H+d*I+m*D,s[13]=f*C+p*W+d*U+m*Y,s[2]=_*b+E*N+v*L+h*k,s[6]=_*A+E*P+v*j+h*z,s[10]=_*y+E*H+v*I+h*D,s[14]=_*C+E*W+v*U+h*Y,s[3]=g*b+M*N+x*L+w*k,s[7]=g*A+M*P+x*j+w*z,s[11]=g*y+M*H+x*I+w*D,s[15]=g*C+M*W+x*U+w*Y,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],f=e[2],p=e[6],d=e[10],m=e[14],_=e[3],E=e[7],v=e[11],h=e[15],g=l*m-c*d,M=o*m-c*p,x=o*d-l*p,w=a*m-c*f,b=a*d-l*f,A=a*p-o*f;return n*(E*g-v*M+h*x)-i*(_*g-v*w+h*b)+r*(_*M-E*w+h*A)-s*(_*x-E*b+v*A)}determinantAffine(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[1],a=e[5],o=e[9],l=e[2],c=e[6],f=e[10];return n*(a*f-o*c)-i*(s*f-o*l)+r*(s*c-a*l)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],f=e[8],p=e[9],d=e[10],m=e[11],_=e[12],E=e[13],v=e[14],h=e[15],g=n*o-i*a,M=n*l-r*a,x=n*c-s*a,w=i*l-r*o,b=i*c-s*o,A=r*c-s*l,y=f*E-p*_,C=f*v-d*_,N=f*h-m*_,P=p*v-d*E,H=p*h-m*E,W=d*h-m*v,L=g*W-M*H+x*P+w*N-b*C+A*y;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const j=1/L;return e[0]=(o*W-l*H+c*P)*j,e[1]=(r*H-i*W-s*P)*j,e[2]=(E*A-v*b+h*w)*j,e[3]=(d*b-p*A-m*w)*j,e[4]=(l*N-a*W-c*C)*j,e[5]=(n*W-r*N+s*C)*j,e[6]=(v*x-_*A-h*M)*j,e[7]=(f*A-d*x+m*M)*j,e[8]=(a*H-o*N+c*y)*j,e[9]=(i*N-n*H-s*y)*j,e[10]=(_*b-E*x+h*g)*j,e[11]=(p*x-f*b-m*g)*j,e[12]=(o*C-a*P-l*y)*j,e[13]=(n*P-i*C+r*y)*j,e[14]=(E*M-_*w-v*g)*j,e[15]=(f*w-p*M+d*g)*j,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,f=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,f*o+i,f*l-r*a,0,c*l-r*o,f*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,a=n._y,o=n._z,l=n._w,c=s+s,f=a+a,p=o+o,d=s*c,m=s*f,_=s*p,E=a*f,v=a*p,h=o*p,g=l*c,M=l*f,x=l*p,w=i.x,b=i.y,A=i.z;return r[0]=(1-(E+h))*w,r[1]=(m+x)*w,r[2]=(_-M)*w,r[3]=0,r[4]=(m-x)*b,r[5]=(1-(d+h))*b,r[6]=(v+g)*b,r[7]=0,r[8]=(_+M)*A,r[9]=(v-g)*A,r[10]=(1-(d+E))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),n.identity(),this;let a=Qr.set(r[0],r[1],r[2]).length();const o=Qr.set(r[4],r[5],r[6]).length(),l=Qr.set(r[8],r[9],r[10]).length();s<0&&(a=-a),$n.copy(this);const c=1/a,f=1/o,p=1/l;return $n.elements[0]*=c,$n.elements[1]*=c,$n.elements[2]*=c,$n.elements[4]*=f,$n.elements[5]*=f,$n.elements[6]*=f,$n.elements[8]*=p,$n.elements[9]*=p,$n.elements[10]*=p,n.setFromRotationMatrix($n),i.x=a,i.y=o,i.z=l,this}makePerspective(e,n,i,r,s,a,o=pi,l=!1){const c=this.elements,f=2*s/(n-e),p=2*s/(i-r),d=(n+e)/(n-e),m=(i+r)/(i-r);let _,E;if(l)_=s/(a-s),E=a*s/(a-s);else if(o===pi)_=-(a+s)/(a-s),E=-2*a*s/(a-s);else if(o===qa)_=-a/(a-s),E=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=f,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=p,c[9]=m,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=E,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,n,i,r,s,a,o=pi,l=!1){const c=this.elements,f=2/(n-e),p=2/(i-r),d=-(n+e)/(n-e),m=-(i+r)/(i-r);let _,E;if(l)_=1/(a-s),E=a/(a-s);else if(o===pi)_=-2/(a-s),E=-(a+s)/(a-s);else if(o===qa)_=-1/(a-s),E=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=f,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=p,c[9]=0,c[13]=m,c[2]=0,c[6]=0,c[10]=_,c[14]=E,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}};Ql.prototype.isMatrix4=!0;let Tt=Ql;const Qr=new G,$n=new Tt,xM=new G(0,0,0),SM=new G(1,1,1),qi=new G,Ao=new G,wn=new G,sm=new Tt,am=new _r;class vr{constructor(e=0,n=0,i=0,r=vr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],f=r[9],p=r[2],d=r[6],m=r[10];switch(n){case"XYZ":this._y=Math.asin(We(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-f,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-We(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-p,s),this._z=0);break;case"ZXY":this._x=Math.asin(We(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-p,m),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-We(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(d,m),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(We(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-f,c),this._y=Math.atan2(-p,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-We(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-f,m),this._y=0);break;default:Le("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return sm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(sm,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return am.setFromEuler(this),this.setFromQuaternion(am,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}vr.DEFAULT_ORDER="XYZ";class Bv{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let yM=0;const om=new G,Jr=new _r,Ei=new Tt,Co=new G,sa=new G,MM=new G,EM=new _r,lm=new G(1,0,0),cm=new G(0,1,0),um=new G(0,0,1),dm={type:"added"},wM={type:"removed"},es={type:"childadded",child:null},nu={type:"childremoved",child:null};class jt extends Mr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:yM++}),this.uuid=Ys(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=jt.DEFAULT_UP.clone();const e=new G,n=new vr,i=new _r,r=new G(1,1,1);function s(){i.setFromEuler(n,!1)}function a(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Tt},normalMatrix:{value:new Be}}),this.matrix=new Tt,this.matrixWorld=new Tt,this.matrixAutoUpdate=jt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=jt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Bv,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return Jr.setFromAxisAngle(e,n),this.quaternion.multiply(Jr),this}rotateOnWorldAxis(e,n){return Jr.setFromAxisAngle(e,n),this.quaternion.premultiply(Jr),this}rotateX(e){return this.rotateOnAxis(lm,e)}rotateY(e){return this.rotateOnAxis(cm,e)}rotateZ(e){return this.rotateOnAxis(um,e)}translateOnAxis(e,n){return om.copy(e).applyQuaternion(this.quaternion),this.position.add(om.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(lm,e)}translateY(e){return this.translateOnAxis(cm,e)}translateZ(e){return this.translateOnAxis(um,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ei.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?Co.copy(e):Co.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),sa.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ei.lookAt(sa,Co,this.up):Ei.lookAt(Co,sa,this.up),this.quaternion.setFromRotationMatrix(Ei),r&&(Ei.extractRotation(r.matrixWorld),Jr.setFromRotationMatrix(Ei),this.quaternion.premultiply(Jr.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(it("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(dm),es.child=e,this.dispatchEvent(es),es.child=null):it("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(wM),nu.child=e,this.dispatchEvent(nu),nu.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ei.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ei.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ei),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(dm),es.child=e,this.dispatchEvent(es),es.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,n);if(a!==void 0)return a}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(sa,e,MM),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(sa,EM,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const n=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=n-s[0]*n-s[4]*i-s[8]*r,s[13]+=i-s[1]*n-s[5]*i-s[9]*r,s[14]+=r-s[2]*n-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),n===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,f=l.length;c<f;c++){const p=l[c];s(e.shapes,p)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(n){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),f=a(e.images),p=a(e.shapes),d=a(e.skeletons),m=a(e.animations),_=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),f.length>0&&(i.images=f),p.length>0&&(i.shapes=p),d.length>0&&(i.skeletons=d),m.length>0&&(i.animations=m),_.length>0&&(i.nodes=_)}return i.object=r,i;function a(o){const l=[];for(const c in o){const f=o[c];delete f.metadata,l.push(f)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}jt.DEFAULT_UP=new G(0,1,0);jt.DEFAULT_MATRIX_AUTO_UPDATE=!0;jt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Ro extends jt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const TM={type:"move"};class iu{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ro,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ro,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new G,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new G),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ro,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new G,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new G,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const E of e.hand.values()){const v=n.getJointPose(E,i),h=this._getHandJoint(c,E);v!==null&&(h.matrix.fromArray(v.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=v.radius),h.visible=v!==null}const f=c.joints["index-finger-tip"],p=c.joints["thumb-tip"],d=f.position.distanceTo(p.position),m=.02,_=.005;c.inputState.pinching&&d>m+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=m-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(TM)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new Ro;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const zv={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ki={h:0,s:0,l:0},Po={h:0,s:0,l:0};function ru(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class Ke{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Un){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ze.colorSpaceToWorking(this,n),this}setRGB(e,n,i,r=Ze.workingColorSpace){return this.r=e,this.g=n,this.b=i,Ze.colorSpaceToWorking(this,r),this}setHSL(e,n,i,r=Ze.workingColorSpace){if(e=pf(e,1),n=We(n,0,1),i=We(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,a=2*i-s;this.r=ru(a,s,e+1/3),this.g=ru(a,s,e),this.b=ru(a,s,e-1/3)}return Ze.colorSpaceToWorking(this,r),this}setStyle(e,n=Un){function i(s){s!==void 0&&parseFloat(s)<1&&Le("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:Le("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(a===6)return this.setHex(parseInt(s,16),n);Le("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Un){const i=zv[e.toLowerCase()];return i!==void 0?this.setHex(i,n):Le("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Oi(e.r),this.g=Oi(e.g),this.b=Oi(e.b),this}copyLinearToSRGB(e){return this.r=Us(e.r),this.g=Us(e.g),this.b=Us(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Un){return Ze.workingToColorSpace(en.copy(this),e),Math.round(We(en.r*255,0,255))*65536+Math.round(We(en.g*255,0,255))*256+Math.round(We(en.b*255,0,255))}getHexString(e=Un){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=Ze.workingColorSpace){Ze.workingToColorSpace(en.copy(this),n);const i=en.r,r=en.g,s=en.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const f=(o+a)/2;if(o===a)l=0,c=0;else{const p=a-o;switch(c=f<=.5?p/(a+o):p/(2-a-o),a){case i:l=(r-s)/p+(r<s?6:0);break;case r:l=(s-i)/p+2;break;case s:l=(i-r)/p+4;break}l/=6}return e.h=l,e.s=c,e.l=f,e}getRGB(e,n=Ze.workingColorSpace){return Ze.workingToColorSpace(en.copy(this),n),e.r=en.r,e.g=en.g,e.b=en.b,e}getStyle(e=Un){Ze.workingToColorSpace(en.copy(this),e);const n=en.r,i=en.g,r=en.b;return e!==Un?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(Ki),this.setHSL(Ki.h+e,Ki.s+n,Ki.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(Ki),e.getHSL(Po);const i=Ca(Ki.h,Po.h,n),r=Ca(Ki.s,Po.s,n),s=Ca(Ki.l,Po.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const en=new Ke;Ke.NAMES=zv;class bM extends jt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new vr,this.environmentIntensity=1,this.environmentRotation=new vr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),n.object.backgroundBlurriness=this.backgroundBlurriness,n.object.backgroundIntensity=this.backgroundIntensity,n.object.backgroundRotation=this.backgroundRotation.toArray(),n.object.environmentIntensity=this.environmentIntensity,n.object.environmentRotation=this.environmentRotation.toArray(),n}}const Yn=new G,wi=new G,su=new G,Ti=new G,ts=new G,ns=new G,hm=new G,au=new G,ou=new G,lu=new G,cu=new Et,uu=new Et,du=new Et;class Bn{constructor(e=new G,n=new G,i=new G){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),Yn.subVectors(e,n),r.cross(Yn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){Yn.subVectors(r,n),wi.subVectors(i,n),su.subVectors(e,n);const a=Yn.dot(Yn),o=Yn.dot(wi),l=Yn.dot(su),c=wi.dot(wi),f=wi.dot(su),p=a*c-o*o;if(p===0)return s.set(0,0,0),null;const d=1/p,m=(c*l-o*f)*d,_=(a*f-o*l)*d;return s.set(1-m-_,_,m)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,Ti)===null?!1:Ti.x>=0&&Ti.y>=0&&Ti.x+Ti.y<=1}static getInterpolation(e,n,i,r,s,a,o,l){return this.getBarycoord(e,n,i,r,Ti)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Ti.x),l.addScaledVector(a,Ti.y),l.addScaledVector(o,Ti.z),l)}static getInterpolatedAttribute(e,n,i,r,s,a){return cu.setScalar(0),uu.setScalar(0),du.setScalar(0),cu.fromBufferAttribute(e,n),uu.fromBufferAttribute(e,i),du.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(cu,s.x),a.addScaledVector(uu,s.y),a.addScaledVector(du,s.z),a}static isFrontFacing(e,n,i,r){return Yn.subVectors(i,n),wi.subVectors(e,n),Yn.cross(wi).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Yn.subVectors(this.c,this.b),wi.subVectors(this.a,this.b),Yn.cross(wi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Bn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return Bn.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return Bn.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return Bn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Bn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let a,o;ts.subVectors(r,i),ns.subVectors(s,i),au.subVectors(e,i);const l=ts.dot(au),c=ns.dot(au);if(l<=0&&c<=0)return n.copy(i);ou.subVectors(e,r);const f=ts.dot(ou),p=ns.dot(ou);if(f>=0&&p<=f)return n.copy(r);const d=l*p-f*c;if(d<=0&&l>=0&&f<=0)return a=l/(l-f),n.copy(i).addScaledVector(ts,a);lu.subVectors(e,s);const m=ts.dot(lu),_=ns.dot(lu);if(_>=0&&m<=_)return n.copy(s);const E=m*c-l*_;if(E<=0&&c>=0&&_<=0)return o=c/(c-_),n.copy(i).addScaledVector(ns,o);const v=f*_-m*p;if(v<=0&&p-f>=0&&m-_>=0)return hm.subVectors(s,r),o=(p-f)/(p-f+(m-_)),n.copy(r).addScaledVector(hm,o);const h=1/(v+E+d);return a=E*h,o=d*h,n.copy(i).addScaledVector(ts,a).addScaledVector(ns,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class io{constructor(e=new G(1/0,1/0,1/0),n=new G(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(qn.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(qn.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=qn.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,qn):qn.fromBufferAttribute(s,a),qn.applyMatrix4(e.matrixWorld),this.expandByPoint(qn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),No.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),No.copy(i.boundingBox)),No.applyMatrix4(e.matrixWorld),this.union(No)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,qn),qn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(aa),Lo.subVectors(this.max,aa),is.subVectors(e.a,aa),rs.subVectors(e.b,aa),ss.subVectors(e.c,aa),Zi.subVectors(rs,is),Qi.subVectors(ss,rs),wr.subVectors(is,ss);let n=[0,-Zi.z,Zi.y,0,-Qi.z,Qi.y,0,-wr.z,wr.y,Zi.z,0,-Zi.x,Qi.z,0,-Qi.x,wr.z,0,-wr.x,-Zi.y,Zi.x,0,-Qi.y,Qi.x,0,-wr.y,wr.x,0];return!hu(n,is,rs,ss,Lo)||(n=[1,0,0,0,1,0,0,0,1],!hu(n,is,rs,ss,Lo))?!1:(Do.crossVectors(Zi,Qi),n=[Do.x,Do.y,Do.z],hu(n,is,rs,ss,Lo))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,qn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(qn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(bi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),bi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),bi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),bi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),bi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),bi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),bi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),bi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(bi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const bi=[new G,new G,new G,new G,new G,new G,new G,new G],qn=new G,No=new io,is=new G,rs=new G,ss=new G,Zi=new G,Qi=new G,wr=new G,aa=new G,Lo=new G,Do=new G,Tr=new G;function hu(t,e,n,i,r){for(let s=0,a=t.length-3;s<=a;s+=3){Tr.fromArray(t,s);const o=r.x*Math.abs(Tr.x)+r.y*Math.abs(Tr.y)+r.z*Math.abs(Tr.z),l=e.dot(Tr),c=n.dot(Tr),f=i.dot(Tr);if(Math.max(-Math.max(l,c,f),Math.min(l,c,f))>o)return!1}return!0}const Lt=new G,Io=new Oe;let AM=0;class ki extends Mr{constructor(e,n,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:AM++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=Xy,this.updateRanges=[],this.gpuType=fi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Io.fromBufferAttribute(this,n),Io.applyMatrix3(e),this.setXY(n,Io.x,Io.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Lt.fromBufferAttribute(this,n),Lt.applyMatrix3(e),this.setXYZ(n,Lt.x,Lt.y,Lt.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)Lt.fromBufferAttribute(this,n),Lt.applyMatrix4(e),this.setXYZ(n,Lt.x,Lt.y,Lt.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Lt.fromBufferAttribute(this,n),Lt.applyNormalMatrix(e),this.setXYZ(n,Lt.x,Lt.y,Lt.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Lt.fromBufferAttribute(this,n),Lt.transformDirection(e),this.setXYZ(n,Lt.x,Lt.y,Lt.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=ds(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=on(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=ds(n,this.array)),n}setX(e,n){return this.normalized&&(n=on(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=ds(n,this.array)),n}setY(e,n){return this.normalized&&(n=on(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=ds(n,this.array)),n}setZ(e,n){return this.normalized&&(n=on(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=ds(n,this.array)),n}setW(e,n){return this.normalized&&(n=on(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=on(n,this.array),i=on(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=on(n,this.array),i=on(i,this.array),r=on(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=on(n,this.array),i=on(i,this.array),r=on(r,this.array),s=on(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class Hv extends ki{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class Vv extends ki{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class En extends ki{constructor(e,n,i){super(new Float32Array(e),n,i)}}const CM=new io,oa=new G,fu=new G;class gc{constructor(e=new G,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):CM.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;oa.subVectors(e,this.center);const n=oa.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(oa,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(fu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(oa.copy(e.center).add(fu)),this.expandByPoint(oa.copy(e.center).sub(fu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let RM=0;const In=new Tt,pu=new jt,as=new G,Tn=new io,la=new io,Ht=new G;class jn extends Mr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:RM++}),this.uuid=Ys(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new($y(e)?Vv:Hv)(e,1):this.index=e,this}setIndirect(e,n=0){return this.indirect=e,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Be().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return In.makeRotationFromQuaternion(e),this.applyMatrix4(In),this}rotateX(e){return In.makeRotationX(e),this.applyMatrix4(In),this}rotateY(e){return In.makeRotationY(e),this.applyMatrix4(In),this}rotateZ(e){return In.makeRotationZ(e),this.applyMatrix4(In),this}translate(e,n,i){return In.makeTranslation(e,n,i),this.applyMatrix4(In),this}scale(e,n,i){return In.makeScale(e,n,i),this.applyMatrix4(In),this}lookAt(e){return pu.lookAt(e),pu.updateMatrix(),this.applyMatrix4(pu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(as).negate(),this.translate(as.x,as.y,as.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new En(i,3))}else{const i=Math.min(e.length,n.count);for(let r=0;r<i;r++){const s=e[r];n.setXYZ(r,s.x,s.y,s.z||0)}e.length>n.count&&Le("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new io);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){it("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new G(-1/0,-1/0,-1/0),new G(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];Tn.setFromBufferAttribute(s),this.morphTargetsRelative?(Ht.addVectors(this.boundingBox.min,Tn.min),this.boundingBox.expandByPoint(Ht),Ht.addVectors(this.boundingBox.max,Tn.max),this.boundingBox.expandByPoint(Ht)):(this.boundingBox.expandByPoint(Tn.min),this.boundingBox.expandByPoint(Tn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&it('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new gc);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){it("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new G,1/0);return}if(e){const i=this.boundingSphere.center;if(Tn.setFromBufferAttribute(e),n)for(let s=0,a=n.length;s<a;s++){const o=n[s];la.setFromBufferAttribute(o),this.morphTargetsRelative?(Ht.addVectors(Tn.min,la.min),Tn.expandByPoint(Ht),Ht.addVectors(Tn.max,la.max),Tn.expandByPoint(Ht)):(Tn.expandByPoint(la.min),Tn.expandByPoint(la.max))}Tn.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Ht.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Ht));if(n)for(let s=0,a=n.length;s<a;s++){const o=n[s],l=this.morphTargetsRelative;for(let c=0,f=o.count;c<f;c++)Ht.fromBufferAttribute(o,c),l&&(as.fromBufferAttribute(e,c),Ht.add(as)),r=Math.max(r,i.distanceToSquared(Ht))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&it('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){it("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new ki(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let y=0;y<i.count;y++)o[y]=new G,l[y]=new G;const c=new G,f=new G,p=new G,d=new Oe,m=new Oe,_=new Oe,E=new G,v=new G;function h(y,C,N){c.fromBufferAttribute(i,y),f.fromBufferAttribute(i,C),p.fromBufferAttribute(i,N),d.fromBufferAttribute(s,y),m.fromBufferAttribute(s,C),_.fromBufferAttribute(s,N),f.sub(c),p.sub(c),m.sub(d),_.sub(d);const P=1/(m.x*_.y-_.x*m.y);isFinite(P)&&(E.copy(f).multiplyScalar(_.y).addScaledVector(p,-m.y).multiplyScalar(P),v.copy(p).multiplyScalar(m.x).addScaledVector(f,-_.x).multiplyScalar(P),o[y].add(E),o[C].add(E),o[N].add(E),l[y].add(v),l[C].add(v),l[N].add(v))}let g=this.groups;g.length===0&&(g=[{start:0,count:e.count}]);for(let y=0,C=g.length;y<C;++y){const N=g[y],P=N.start,H=N.count;for(let W=P,L=P+H;W<L;W+=3)h(e.getX(W+0),e.getX(W+1),e.getX(W+2))}const M=new G,x=new G,w=new G,b=new G;function A(y){w.fromBufferAttribute(r,y),b.copy(w);const C=o[y];M.copy(C),M.sub(w.multiplyScalar(w.dot(C))).normalize(),x.crossVectors(b,C);const P=x.dot(l[y])<0?-1:1;a.setXYZW(y,M.x,M.y,M.z,P)}for(let y=0,C=g.length;y<C;++y){const N=g[y],P=N.start,H=N.count;for(let W=P,L=P+H;W<L;W+=3)A(e.getX(W+0)),A(e.getX(W+1)),A(e.getX(W+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==n.count)i=new ki(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let d=0,m=i.count;d<m;d++)i.setXYZ(d,0,0,0);const r=new G,s=new G,a=new G,o=new G,l=new G,c=new G,f=new G,p=new G;if(e)for(let d=0,m=e.count;d<m;d+=3){const _=e.getX(d+0),E=e.getX(d+1),v=e.getX(d+2);r.fromBufferAttribute(n,_),s.fromBufferAttribute(n,E),a.fromBufferAttribute(n,v),f.subVectors(a,s),p.subVectors(r,s),f.cross(p),o.fromBufferAttribute(i,_),l.fromBufferAttribute(i,E),c.fromBufferAttribute(i,v),o.add(f),l.add(f),c.add(f),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(E,l.x,l.y,l.z),i.setXYZ(v,c.x,c.y,c.z)}else for(let d=0,m=n.count;d<m;d+=3)r.fromBufferAttribute(n,d+0),s.fromBufferAttribute(n,d+1),a.fromBufferAttribute(n,d+2),f.subVectors(a,s),p.subVectors(r,s),f.cross(p),i.setXYZ(d+0,f.x,f.y,f.z),i.setXYZ(d+1,f.x,f.y,f.z),i.setXYZ(d+2,f.x,f.y,f.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)Ht.fromBufferAttribute(e,n),Ht.normalize(),e.setXYZ(n,Ht.x,Ht.y,Ht.z)}toNonIndexed(){function e(o,l){const c=o.array,f=o.itemSize,p=o.normalized,d=new c.constructor(l.length*f);let m=0,_=0;for(let E=0,v=l.length;E<v;E++){o.isInterleavedBufferAttribute?m=l[E]*o.data.stride+o.offset:m=l[E]*f;for(let h=0;h<f;h++)d[_++]=c[m++]}return new ki(d,f,p)}if(this.index===null)return Le("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new jn,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);n.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let f=0,p=c.length;f<p;f++){const d=c[f],m=e(d,i);l.push(m)}n.morphAttributes[o]=l}n.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],f=[];for(let p=0,d=c.length;p<d;p++){const m=c[p];f.push(m.toJSON(e.data))}f.length>0&&(r[l]=f,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const f=r[c];this.setAttribute(c,f.clone(n))}const s=e.morphAttributes;for(const c in s){const f=[],p=s[c];for(let d=0,m=p.length;d<m;d++)f.push(p[d].clone(n));this.morphAttributes[c]=f}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,f=a.length;c<f;c++){const p=a[c];this.addGroup(p.start,p.count,p.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const mu=new G,PM=new G,NM=new Be;class Pi{constructor(e=new G(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=mu.subVectors(i,n).cross(PM.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n,i=!0){const r=e.delta(mu),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:n.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||NM.getNormalMatrix(e),r=this.coplanarPoint(mu).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let LM=0;class qs extends Mr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:LM++}),this.uuid=Ys(),this.name="",this.type="Material",this.blending=Aa,this.side=Gr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=vv,this.blendDst=xv,this.blendEquation=us,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ke(0,0,0),this.blendAlpha=0,this.depthFunc=Xa,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=By,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Zc,this.stencilZFail=Zc,this.stencilZPass=Zc,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){Le(`Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){Le(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(n){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}fromJSON(e,n){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ke().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new Pi().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=n[e.map]||null),e.matcap!==void 0&&(this.matcap=n[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=n[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=n[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=n[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Oe().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=n[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=n[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=n[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=n[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=n[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=n[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=n[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=n[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=n[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=n[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=n[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=n[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=n[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=n[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Oe().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=n[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=n[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=n[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=n[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=n[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=n[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=n[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Ai=new G,gu=new G,Uo=new G,Fo=new G;class gf{constructor(e=new G,n=new G(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ai)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=Ai.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(Ai.copy(this.origin).addScaledVector(this.direction,n),Ai.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){gu.copy(e).add(n).multiplyScalar(.5),Uo.copy(n).sub(e).normalize(),Fo.copy(this.origin).sub(gu);const s=e.distanceTo(n)*.5,a=-this.direction.dot(Uo),o=Fo.dot(this.direction),l=-Fo.dot(Uo),c=Fo.lengthSq(),f=Math.abs(1-a*a);let p,d,m,_;if(f>0)if(p=a*l-o,d=a*o-l,_=s*f,p>=0)if(d>=-_)if(d<=_){const E=1/f;p*=E,d*=E,m=p*(p+a*d+2*o)+d*(a*p+d+2*l)+c}else d=s,p=Math.max(0,-(a*d+o)),m=-p*p+d*(d+2*l)+c;else d=-s,p=Math.max(0,-(a*d+o)),m=-p*p+d*(d+2*l)+c;else d<=-_?(p=Math.max(0,-(-a*s+o)),d=p>0?-s:Math.min(Math.max(-s,-l),s),m=-p*p+d*(d+2*l)+c):d<=_?(p=0,d=Math.min(Math.max(-s,-l),s),m=d*(d+2*l)+c):(p=Math.max(0,-(a*s+o)),d=p>0?s:Math.min(Math.max(-s,-l),s),m=-p*p+d*(d+2*l)+c);else d=a>0?-s:s,p=Math.max(0,-(a*d+o)),m=-p*p+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,p),r&&r.copy(gu).addScaledVector(Uo,d),m}intersectSphere(e,n){if(e.radius<0)return null;Ai.subVectors(e.center,this.origin);const i=Ai.dot(this.direction),r=Ai.dot(Ai)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,n):this.at(o,n)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,a,o,l;const c=1/this.direction.x,f=1/this.direction.y,p=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),f>=0?(s=(e.min.y-d.y)*f,a=(e.max.y-d.y)*f):(s=(e.max.y-d.y)*f,a=(e.min.y-d.y)*f),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),p>=0?(o=(e.min.z-d.z)*p,l=(e.max.z-d.z)*p):(o=(e.max.z-d.z)*p,l=(e.min.z-d.z)*p),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,Ai)!==null}intersectTriangle(e,n,i,r,s){const a=this.origin,o=this.direction,l=o.x,c=o.y,f=o.z,p=e.x-a.x,d=e.y-a.y,m=e.z-a.z,_=n.x-a.x,E=n.y-a.y,v=n.z-a.z,h=i.x-a.x,g=i.y-a.y,M=i.z-a.z,x=Math.abs(l),w=Math.abs(c),b=Math.abs(f);let A,y,C,N,P,H,W,L,j,I,U,k;if(x>=w&&x>=b?(C=l,H=p,j=_,k=h,l>=0?(A=c,y=f,N=d,P=m,W=E,L=v,I=g,U=M):(A=f,y=c,N=m,P=d,W=v,L=E,I=M,U=g)):w>=b?(C=c,H=d,j=E,k=g,c>=0?(A=f,y=l,N=m,P=p,W=v,L=_,I=M,U=h):(A=l,y=f,N=p,P=m,W=_,L=v,I=h,U=M)):(C=f,H=m,j=v,k=M,f>=0?(A=l,y=c,N=p,P=d,W=_,L=E,I=h,U=g):(A=c,y=l,N=d,P=p,W=E,L=_,I=g,U=h)),C===0)return null;const z=A/C,D=y/C,Y=1/C,oe=N-z*H,ge=P-D*H,He=W-z*j,ke=L-D*j,Ie=I-z*k,Z=U-D*k,ne=Ie*ke-Z*He,Se=oe*Z-ge*Ie,Ue=He*ge-ke*oe;if(r){if(ne<0||Se<0||Ue<0)return null}else if((ne<0||Se<0||Ue<0)&&(ne>0||Se>0||Ue>0))return null;const ye=ne+Se+Ue;if(ye===0)return null;const je=Y*(ne*H+Se*j+Ue*k);return(ye>0?je<0:je>0)?null:this.at(je/ye,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Gv extends qs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ke(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vr,this.combine=Sv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const fm=new Tt,br=new gf,Oo=new gc,pm=new G,ko=new G,Bo=new G,zo=new G,_u=new G,Ho=new G,mm=new G,Vo=new G;class Si extends jt{constructor(e=new jn,n=new Gv){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Ho.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const f=o[l],p=s[l];f!==0&&(_u.fromBufferAttribute(p,e),a?Ho.addScaledVector(_u,f):Ho.addScaledVector(_u.sub(n),f))}n.add(Ho)}return n}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Oo.copy(i.boundingSphere),Oo.applyMatrix4(s),br.copy(e.ray).recast(e.near),!(Oo.containsPoint(br.origin)===!1&&(br.intersectSphere(Oo,pm)===null||br.origin.distanceToSquared(pm)>(e.far-e.near)**2))&&(fm.copy(s).invert(),br.copy(e.ray).applyMatrix4(fm),!(i.boundingBox!==null&&br.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,br)))}_computeIntersections(e,n,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,f=s.attributes.uv1,p=s.attributes.normal,d=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,E=d.length;_<E;_++){const v=d[_],h=a[v.materialIndex],g=Math.max(v.start,m.start),M=Math.min(o.count,Math.min(v.start+v.count,m.start+m.count));for(let x=g,w=M;x<w;x+=3){const b=o.getX(x),A=o.getX(x+1),y=o.getX(x+2);r=Go(this,h,e,i,c,f,p,b,A,y),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=v.materialIndex,n.push(r))}}else{const _=Math.max(0,m.start),E=Math.min(o.count,m.start+m.count);for(let v=_,h=E;v<h;v+=3){const g=o.getX(v),M=o.getX(v+1),x=o.getX(v+2);r=Go(this,a,e,i,c,f,p,g,M,x),r&&(r.faceIndex=Math.floor(v/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,E=d.length;_<E;_++){const v=d[_],h=a[v.materialIndex],g=Math.max(v.start,m.start),M=Math.min(l.count,Math.min(v.start+v.count,m.start+m.count));for(let x=g,w=M;x<w;x+=3){const b=x,A=x+1,y=x+2;r=Go(this,h,e,i,c,f,p,b,A,y),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=v.materialIndex,n.push(r))}}else{const _=Math.max(0,m.start),E=Math.min(l.count,m.start+m.count);for(let v=_,h=E;v<h;v+=3){const g=v,M=v+1,x=v+2;r=Go(this,a,e,i,c,f,p,g,M,x),r&&(r.faceIndex=Math.floor(v/3),n.push(r))}}}}function DM(t,e,n,i,r,s,a,o){let l;if(e.side===Mn?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===Gr,o),l===null)return null;Vo.copy(o),Vo.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(Vo);return c<n.near||c>n.far?null:{distance:c,point:Vo.clone(),object:t}}function Go(t,e,n,i,r,s,a,o,l,c){t.getVertexPosition(o,ko),t.getVertexPosition(l,Bo),t.getVertexPosition(c,zo);const f=DM(t,e,n,i,ko,Bo,zo,mm);if(f){const p=new G;Bn.getBarycoord(mm,ko,Bo,zo,p),r&&(f.uv=Bn.getInterpolatedAttribute(r,o,l,c,p,new Oe)),s&&(f.uv1=Bn.getInterpolatedAttribute(s,o,l,c,p,new Oe)),a&&(f.normal=Bn.getInterpolatedAttribute(a,o,l,c,p,new G),f.normal.dot(i.direction)>0&&f.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new G,materialIndex:0};Bn.getNormal(ko,Bo,zo,d.normal),f.face=d,f.barycoord=p}return f}class IM extends dn{constructor(e=null,n=1,i=1,r,s,a,o,l,c=Xt,f=Xt,p,d){super(null,a,o,l,c,f,r,s,p,d),this.isDataTexture=!0,this.image={data:e,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ar=new gc,UM=new Oe(.5,.5),jo=new G;class _f{constructor(e=new Pi,n=new Pi,i=new Pi,r=new Pi,s=new Pi,a=new Pi){this.planes=[e,n,i,r,s,a]}set(e,n,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(n),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=pi,i=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],f=s[4],p=s[5],d=s[6],m=s[7],_=s[8],E=s[9],v=s[10],h=s[11],g=s[12],M=s[13],x=s[14],w=s[15];if(r[0].setComponents(c-a,m-f,h-_,w-g).normalize(),r[1].setComponents(c+a,m+f,h+_,w+g).normalize(),r[2].setComponents(c+o,m+p,h+E,w+M).normalize(),r[3].setComponents(c-o,m-p,h-E,w-M).normalize(),i)r[4].setComponents(l,d,v,x).normalize(),r[5].setComponents(c-l,m-d,h-v,w-x).normalize();else if(r[4].setComponents(c-l,m-d,h-v,w-x).normalize(),n===pi)r[5].setComponents(c+l,m+d,h+v,w+x).normalize();else if(n===qa)r[5].setComponents(l,d,v,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ar.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Ar.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ar)}intersectsSprite(e){Ar.center.set(0,0,0);const n=UM.distanceTo(e.center);return Ar.radius=.7071067811865476+n,Ar.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ar)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(jo.x=r.normal.x>0?e.max.x:e.min.x,jo.y=r.normal.y>0?e.max.y:e.min.y,jo.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(jo)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class jv extends qs{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ke(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Kl=new G,Zl=new G,gm=new Tt,ca=new gf,Wo=new gc,vu=new G,_m=new G;class FM extends jt{constructor(e=new jn,n=new jv){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[0];for(let r=1,s=n.count;r<s;r++)Kl.fromBufferAttribute(n,r-1),Zl.fromBufferAttribute(n,r),i[r]=i[r-1],i[r]+=Kl.distanceTo(Zl);e.setAttribute("lineDistance",new En(i,1))}else Le("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Wo.copy(i.boundingSphere),Wo.applyMatrix4(r),Wo.radius+=s,e.ray.intersectsSphere(Wo)===!1)return;gm.copy(r).invert(),ca.copy(e.ray).applyMatrix4(gm);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,f=i.index,d=i.attributes.position;if(f!==null){const m=Math.max(0,a.start),_=Math.min(f.count,a.start+a.count);for(let E=m,v=_-1;E<v;E+=c){const h=f.getX(E),g=f.getX(E+1),M=Xo(this,e,ca,l,h,g,E);M&&n.push(M)}if(this.isLineLoop){const E=f.getX(_-1),v=f.getX(m),h=Xo(this,e,ca,l,E,v,_-1);h&&n.push(h)}}else{const m=Math.max(0,a.start),_=Math.min(d.count,a.start+a.count);for(let E=m,v=_-1;E<v;E+=c){const h=Xo(this,e,ca,l,E,E+1,E);h&&n.push(h)}if(this.isLineLoop){const E=Xo(this,e,ca,l,_-1,m,_-1);E&&n.push(E)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Xo(t,e,n,i,r,s,a){const o=t.geometry.attributes.position;if(Kl.fromBufferAttribute(o,r),Zl.fromBufferAttribute(o,s),n.distanceSqToSegment(Kl,Zl,vu,_m)>i)return;vu.applyMatrix4(t.matrixWorld);const c=e.ray.origin.distanceTo(vu);if(!(c<e.near||c>e.far))return{distance:c,point:_m.clone().applyMatrix4(t.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:t}}const vm=new G,xm=new G;class OM extends FM{constructor(e,n){super(e,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[];for(let r=0,s=n.count;r<s;r+=2)vm.fromBufferAttribute(n,r),xm.fromBufferAttribute(n,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+vm.distanceTo(xm);e.setAttribute("lineDistance",new En(i,1))}else Le("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Wv extends dn{constructor(e=[],n=jr,i,r,s,a,o,l,c,f){super(e,n,i,r,s,a,o,l,c,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Za extends dn{constructor(e,n,i=vi,r,s,a,o=Xt,l=Xt,c,f=Gi,p=1){if(f!==Gi&&f!==Ur)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:n,depth:p};super(d,r,s,a,o,l,f,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new mf(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return n.compareFunction=this.compareFunction,n}}class kM extends Za{constructor(e,n=vi,i=jr,r,s,a=Xt,o=Xt,l,c=Gi){const f={width:e,height:e,depth:1},p=[f,f,f,f,f,f];super(e,e,n,i,r,s,a,o,l,c),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Xv extends dn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class ro extends jn{constructor(e=1,n=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],f=[],p=[];let d=0,m=0;_("z","y","x",-1,-1,i,n,e,a,s,0),_("z","y","x",1,-1,i,n,-e,a,s,1),_("x","z","y",1,1,e,i,n,r,a,2),_("x","z","y",1,-1,e,i,-n,r,a,3),_("x","y","z",1,-1,e,n,i,r,s,4),_("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new En(c,3)),this.setAttribute("normal",new En(f,3)),this.setAttribute("uv",new En(p,2));function _(E,v,h,g,M,x,w,b,A,y,C){const N=x/A,P=w/y,H=x/2,W=w/2,L=b/2,j=A+1,I=y+1;let U=0,k=0;const z=new G;for(let D=0;D<I;D++){const Y=D*P-W;for(let oe=0;oe<j;oe++){const ge=oe*N-H;z[E]=ge*g,z[v]=Y*M,z[h]=L,c.push(z.x,z.y,z.z),z[E]=0,z[v]=0,z[h]=b>0?1:-1,f.push(z.x,z.y,z.z),p.push(oe/A),p.push(1-D/y),U+=1}}for(let D=0;D<y;D++)for(let Y=0;Y<A;Y++){const oe=d+Y+j*D,ge=d+Y+j*(D+1),He=d+(Y+1)+j*(D+1),ke=d+(Y+1)+j*D;l.push(oe,ge,ke),l.push(ge,He,ke),k+=6}o.addGroup(m,k,C),m+=k,d+=U}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ro(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}const $o=new G,Yo=new G,xu=new G,qo=new Bn;class BM extends jn{constructor(e=null,n=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:n},e!==null){const r=Math.pow(10,4),s=Math.cos(Is*n),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],f=["a","b","c"],p=new Array(3),d={},m=[];for(let _=0;_<l;_+=3){a?(c[0]=a.getX(_),c[1]=a.getX(_+1),c[2]=a.getX(_+2)):(c[0]=_,c[1]=_+1,c[2]=_+2);const{a:E,b:v,c:h}=qo;if(E.fromBufferAttribute(o,c[0]),v.fromBufferAttribute(o,c[1]),h.fromBufferAttribute(o,c[2]),qo.getNormal(xu),p[0]=`${Math.round(E.x*r)},${Math.round(E.y*r)},${Math.round(E.z*r)}`,p[1]=`${Math.round(v.x*r)},${Math.round(v.y*r)},${Math.round(v.z*r)}`,p[2]=`${Math.round(h.x*r)},${Math.round(h.y*r)},${Math.round(h.z*r)}`,!(p[0]===p[1]||p[1]===p[2]||p[2]===p[0]))for(let g=0;g<3;g++){const M=(g+1)%3,x=p[g],w=p[M],b=qo[f[g]],A=qo[f[M]],y=`${x}_${w}`,C=`${w}_${x}`;C in d&&d[C]?(xu.dot(d[C].normal)<=s&&(m.push(b.x,b.y,b.z),m.push(A.x,A.y,A.z)),d[C]=null):y in d||(d[y]={index0:c[g],index1:c[M],normal:xu.clone()})}}for(const _ in d)if(d[_]){const{index0:E,index1:v}=d[_];$o.fromBufferAttribute(o,E),Yo.fromBufferAttribute(o,v),m.push($o.x,$o.y,$o.z),m.push(Yo.x,Yo.y,Yo.z)}this.setAttribute("position",new En(m,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class _c extends jn{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,a=n/2,o=Math.floor(i),l=Math.floor(r),c=o+1,f=l+1,p=e/o,d=n/l,m=[],_=[],E=[],v=[];for(let h=0;h<f;h++){const g=h*d-a;for(let M=0;M<c;M++){const x=M*p-s;_.push(x,-g,0),E.push(0,0,1),v.push(M/o),v.push(1-h/l)}}for(let h=0;h<l;h++)for(let g=0;g<o;g++){const M=g+c*h,x=g+c*(h+1),w=g+1+c*(h+1),b=g+1+c*h;m.push(M,x,b),m.push(x,w,b)}this.setIndex(m),this.setAttribute("position",new En(_,3)),this.setAttribute("normal",new En(E,3)),this.setAttribute("uv",new En(v,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _c(e.width,e.height,e.widthSegments,e.heightSegments)}}function js(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];if(Sm(r))r.isRenderTargetTexture?(Le("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone();else if(Array.isArray(r))if(Sm(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[n][i]=s}else e[n][i]=r.slice();else e[n][i]=r}}return e}function ln(t){const e={};for(let n=0;n<t.length;n++){const i=js(t[n]);for(const r in i)e[r]=i[r]}return e}function Sm(t){return t&&(t.isColor||t.isMatrix3||t.isMatrix4||t.isVector2||t.isVector3||t.isVector4||t.isTexture||t.isQuaternion)}function zM(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function $v(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ze.workingColorSpace}const HM={clone:js,merge:ln};var VM=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,GM=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class yi extends qs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=VM,this.fragmentShader=GM,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=js(e.uniforms),this.uniformsGroups=zM(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?n.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?n.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?n.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?n.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?n.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?n.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?n.uniforms[r]={type:"m4",value:a.toArray()}:n.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}fromJSON(e,n){if(super.fromJSON(e,n),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=n[r.value]||null;break;case"c":this.uniforms[i].value=new Ke().setHex(r.value);break;case"v2":this.uniforms[i].value=new Oe().fromArray(r.value);break;case"v3":this.uniforms[i].value=new G().fromArray(r.value);break;case"v4":this.uniforms[i].value=new Et().fromArray(r.value);break;case"m3":this.uniforms[i].value=new Be().fromArray(r.value);break;case"m4":this.uniforms[i].value=new Tt().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class jM extends yi{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class WM extends qs{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ke(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ke(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ah,this.normalScale=new Oe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vr,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class XM extends qs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Oy,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class $M extends qs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Yv extends jt{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new Ke(e),this.intensity=n}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,n}}class YM extends Yv{constructor(e,n,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(jt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ke(n)}copy(e,n){return super.copy(e,n),this.groundColor.copy(e.groundColor),this}toJSON(e){const n=super.toJSON(e);return n.object.groundColor=this.groundColor.getHex(),n}}const Su=new Tt,ym=new G,Mm=new G;class qM{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Oe(512,512),this.mapType=An,this.map=null,this.mapPass=null,this.matrix=new Tt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new _f,this._frameExtents=new Oe(1,1),this._viewportCount=1,this._viewports=[new Et(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera;ym.setFromMatrixPosition(e.matrixWorld),n.position.copy(ym),Mm.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(Mm),n.updateMatrixWorld(),this._updateMatrix(n,this.matrix,this._frustum)}_updateMatrix(e,n,i,r){Su.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(Su,e.coordinateSystem,e.reversedDepth);const s=this._frameExtents,a=r?r.z/s.x:1,o=r?r.w/s.y:1,l=r?r.x/s.x:0,c=r?r.y/s.y:0;e.coordinateSystem===qa||e.reversedDepth?n.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):n.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),n.multiply(Su)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Ko=new G,Zo=new _r,oi=new G;class qv extends jt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Tt,this.projectionMatrix=new Tt,this.projectionMatrixInverse=new Tt,this.coordinateSystem=pi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ko,Zo,oi),oi.x===1&&oi.y===1&&oi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ko,Zo,oi.set(1,1,1)).invert()}updateWorldMatrix(e,n,i=!1){super.updateWorldMatrix(e,n,i),this.matrixWorld.decompose(Ko,Zo,oi),oi.x===1&&oi.y===1&&oi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ko,Zo,oi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Ji=new G,Em=new Oe,wm=new Oe;class kn extends qv{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Ka*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Is*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ka*2*Math.atan(Math.tan(Is*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){Ji.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ji.x,Ji.y).multiplyScalar(-e/Ji.z),Ji.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ji.x,Ji.y).multiplyScalar(-e/Ji.z)}getViewSize(e,n){return this.getViewBounds(e,Em,wm),n.subVectors(wm,Em)}setViewOffset(e,n,i,r,s,a){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(Is*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,n-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class vf extends qv{constructor(e=-1,n=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=f*this.view.offsetY,l=o-f*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class KM extends qM{constructor(){super(new vf(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ZM extends Yv{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(jt.DEFAULT_UP),this.updateMatrix(),this.target=new jt,this.shadow=new KM}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const n=super.toJSON(e);return n.object.shadow=this.shadow.toJSON(),n.object.target=this.target.uuid,n}}const os=-90,ls=1;class QM extends jt{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new kn(os,ls,e,n);r.layers=this.layers,this.add(r);const s=new kn(os,ls,e,n);s.layers=this.layers,this.add(s);const a=new kn(os,ls,e,n);a.layers=this.layers,this.add(a);const o=new kn(os,ls,e,n);o.layers=this.layers,this.add(o);const l=new kn(os,ls,e,n);l.layers=this.layers,this.add(l);const c=new kn(os,ls,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,a,o,l]=n;for(const c of n)this.remove(c);if(e===pi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===qa)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,f]=this.children,p=e.getRenderTarget(),d=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const E=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let v=!1;e.isWebGLRenderer===!0?v=e.state.buffers.depth.getReversed():v=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(n,s),e.setRenderTarget(i,1,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(n,a),e.setRenderTarget(i,2,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(n,o),e.setRenderTarget(i,3,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(n,l),e.setRenderTarget(i,4,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(n,c),i.texture.generateMipmaps=E,e.setRenderTarget(i,5,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(n,f),e.setRenderTarget(p,d,m),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class JM extends kn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Tm{constructor(e=1,n=0,i=0){this.radius=e,this.phi=n,this.theta=i}set(e,n,i){return this.radius=e,this.phi=n,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=We(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,n,i){return this.radius=Math.sqrt(e*e+n*n+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(We(n/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const wf=class wf{constructor(e,n,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,n,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,n=0){for(let i=0;i<4;i++)this.elements[i]=e[i+n];return this}set(e,n,i,r){const s=this.elements;return s[0]=e,s[2]=n,s[1]=i,s[3]=r,this}};wf.prototype.isMatrix2=!0;let bm=wf;class eE extends Mr{constructor(e,n=null){super(),this.object=e,this.domElement=n,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Am(t,e,n,i){const r=tE(i);switch(n){case Dv:return t*e;case Uv:return t*e/r.components*r.byteLength;case cf:return t*e/r.components*r.byteLength;case Wr:return t*e*2/r.components*r.byteLength;case uf:return t*e*2/r.components*r.byteLength;case Iv:return t*e*3/r.components*r.byteLength;case Jn:return t*e*4/r.components*r.byteLength;case df:return t*e*4/r.components*r.byteLength;case ml:case gl:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case _l:case vl:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Nd:case Dd:return Math.max(t,16)*Math.max(e,8)/4;case Pd:case Ld:return Math.max(t,8)*Math.max(e,8)/2;case Id:case Ud:case Od:case kd:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case Fd:case Wl:case Bd:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case zd:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Hd:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case Vd:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case Gd:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case jd:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case Wd:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case Xd:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case $d:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case Yd:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case qd:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case Kd:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case Zd:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case Qd:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case Jd:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case eh:case th:case nh:return Math.ceil(t/4)*Math.ceil(e/4)*16;case ih:case rh:return Math.ceil(t/4)*Math.ceil(e/4)*8;case Xl:case sh:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function tE(t){switch(t){case An:case Rv:return{byteLength:1,components:1};case $a:case Pv:case xi:return{byteLength:2,components:1};case of:case lf:return{byteLength:2,components:4};case vi:case af:case fi:return{byteLength:4,components:1};case Nv:case Lv:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${t}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:sf}}));typeof window<"u"&&(window.__THREE__?Le("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=sf);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Kv(){let t=null,e=!1,n=null,i=null;function r(s,a){i=t.requestAnimationFrame(r),n(s,a)}return{start:function(){e!==!0&&n!==null&&t!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t!==null&&t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function nE(t){const e=new WeakMap;function n(o,l){const c=o.array,f=o.usage,p=c.byteLength,d=t.createBuffer();t.bindBuffer(l,d),t.bufferData(l,c,f),o.onUploadCallback();let m;if(c instanceof Float32Array)m=t.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)m=t.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?m=t.HALF_FLOAT:m=t.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=t.SHORT;else if(c instanceof Uint32Array)m=t.UNSIGNED_INT;else if(c instanceof Int32Array)m=t.INT;else if(c instanceof Int8Array)m=t.BYTE;else if(c instanceof Uint8Array)m=t.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:p}}function i(o,l,c){const f=l.array,p=l.updateRanges;if(t.bindBuffer(c,o),p.length===0)t.bufferSubData(c,0,f);else{p.sort((m,_)=>m.start-_.start);let d=0;for(let m=1;m<p.length;m++){const _=p[d],E=p[m];E.start<=_.start+_.count+1?_.count=Math.max(_.count,E.start+E.count-_.start):(++d,p[d]=E)}p.length=d+1;for(let m=0,_=p.length;m<_;m++){const E=p[m];t.bufferSubData(c,E.start*f.BYTES_PER_ELEMENT,f,E.start,E.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(t.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const f=e.get(o);(!f||f.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,n(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var iE=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,rE=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,sE=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,aE=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,oE=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,lE=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,cE=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,uE=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,dE=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,hE=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,fE=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,pE=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,mE=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,gE=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,_E=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,vE=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,xE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,SE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,yE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ME=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,EE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,wE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,TE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,bE=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,AE=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,CE=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,RE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,PE=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,NE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,LE=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,DE="gl_FragColor = linearToOutputTexel( gl_FragColor );",IE=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,UE=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,FE=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,OE=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,kE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,BE=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,zE=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,HE=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,VE=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,GE=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,jE=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,WE=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,XE=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,$E=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,YE=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,qE=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,KE=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ZE=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,QE=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,JE=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ew=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,tw=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,nw=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,iw=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,rw=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,sw=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,aw=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ow=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,lw=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,cw=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,uw=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,dw=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,hw=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,fw=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,pw=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,mw=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,gw=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,_w=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,vw=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xw=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Sw=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,yw=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Mw=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Ew=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ww=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Tw=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,bw=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Aw=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Cw=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Rw=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Pw=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Nw=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Lw=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Dw=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Iw=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Uw=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Fw=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ow=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,kw=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Bw=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,zw=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Hw=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Vw=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Gw=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,jw=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Ww=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Xw=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,$w=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Yw=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,qw=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Kw=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Zw=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Qw=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Jw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,eT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,tT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,nT=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const iT=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,rT=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,aT=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,oT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,lT=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cT=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,uT=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,dT=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,hT=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,fT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,pT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mT=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,gT=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,_T=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,vT=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xT=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ST=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yT=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,MT=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ET=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,wT=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,TT=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bT=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,AT=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,CT=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,RT=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,PT=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,NT=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,LT=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,DT=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,IT=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,UT=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,FT=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ge={alphahash_fragment:iE,alphahash_pars_fragment:rE,alphamap_fragment:sE,alphamap_pars_fragment:aE,alphatest_fragment:oE,alphatest_pars_fragment:lE,aomap_fragment:cE,aomap_pars_fragment:uE,batching_pars_vertex:dE,batching_vertex:hE,begin_vertex:fE,beginnormal_vertex:pE,bsdfs:mE,iridescence_fragment:gE,bumpmap_pars_fragment:_E,clipping_planes_fragment:vE,clipping_planes_pars_fragment:xE,clipping_planes_pars_vertex:SE,clipping_planes_vertex:yE,color_fragment:ME,color_pars_fragment:EE,color_pars_vertex:wE,color_vertex:TE,common:bE,cube_uv_reflection_fragment:AE,defaultnormal_vertex:CE,displacementmap_pars_vertex:RE,displacementmap_vertex:PE,emissivemap_fragment:NE,emissivemap_pars_fragment:LE,colorspace_fragment:DE,colorspace_pars_fragment:IE,envmap_fragment:UE,envmap_common_pars_fragment:FE,envmap_pars_fragment:OE,envmap_pars_vertex:kE,envmap_physical_pars_fragment:qE,envmap_vertex:BE,fog_vertex:zE,fog_pars_vertex:HE,fog_fragment:VE,fog_pars_fragment:GE,gradientmap_pars_fragment:jE,lightmap_pars_fragment:WE,lights_lambert_fragment:XE,lights_lambert_pars_fragment:$E,lights_pars_begin:YE,lights_toon_fragment:KE,lights_toon_pars_fragment:ZE,lights_phong_fragment:QE,lights_phong_pars_fragment:JE,lights_physical_fragment:ew,lights_physical_pars_fragment:tw,lights_fragment_begin:nw,lights_fragment_maps:iw,lights_fragment_end:rw,lightprobes_pars_fragment:sw,logdepthbuf_fragment:aw,logdepthbuf_pars_fragment:ow,logdepthbuf_pars_vertex:lw,logdepthbuf_vertex:cw,map_fragment:uw,map_pars_fragment:dw,map_particle_fragment:hw,map_particle_pars_fragment:fw,metalnessmap_fragment:pw,metalnessmap_pars_fragment:mw,morphinstance_vertex:gw,morphcolor_vertex:_w,morphnormal_vertex:vw,morphtarget_pars_vertex:xw,morphtarget_vertex:Sw,normal_fragment_begin:yw,normal_fragment_maps:Mw,normal_pars_fragment:Ew,normal_pars_vertex:ww,normal_vertex:Tw,normalmap_pars_fragment:bw,clearcoat_normal_fragment_begin:Aw,clearcoat_normal_fragment_maps:Cw,clearcoat_pars_fragment:Rw,iridescence_pars_fragment:Pw,opaque_fragment:Nw,packing:Lw,premultiplied_alpha_fragment:Dw,project_vertex:Iw,dithering_fragment:Uw,dithering_pars_fragment:Fw,roughnessmap_fragment:Ow,roughnessmap_pars_fragment:kw,shadowmap_pars_fragment:Bw,shadowmap_pars_vertex:zw,shadowmap_vertex:Hw,shadowmask_pars_fragment:Vw,skinbase_vertex:Gw,skinning_pars_vertex:jw,skinning_vertex:Ww,skinnormal_vertex:Xw,specularmap_fragment:$w,specularmap_pars_fragment:Yw,tonemapping_fragment:qw,tonemapping_pars_fragment:Kw,transmission_fragment:Zw,transmission_pars_fragment:Qw,uv_pars_fragment:Jw,uv_pars_vertex:eT,uv_vertex:tT,worldpos_vertex:nT,background_vert:iT,background_frag:rT,backgroundCube_vert:sT,backgroundCube_frag:aT,cube_vert:oT,cube_frag:lT,depth_vert:cT,depth_frag:uT,distance_vert:dT,distance_frag:hT,equirect_vert:fT,equirect_frag:pT,linedashed_vert:mT,linedashed_frag:gT,meshbasic_vert:_T,meshbasic_frag:vT,meshlambert_vert:xT,meshlambert_frag:ST,meshmatcap_vert:yT,meshmatcap_frag:MT,meshnormal_vert:ET,meshnormal_frag:wT,meshphong_vert:TT,meshphong_frag:bT,meshphysical_vert:AT,meshphysical_frag:CT,meshtoon_vert:RT,meshtoon_frag:PT,points_vert:NT,points_frag:LT,shadow_vert:DT,shadow_frag:IT,sprite_vert:UT,sprite_frag:FT},pe={common:{diffuse:{value:new Ke(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Be}},envmap:{envMap:{value:null},envMapRotation:{value:new Be},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Be}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Be}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Be},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Be},normalScale:{value:new Oe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Be},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Be}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Be}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Be}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ke(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new G},probesMax:{value:new G},probesResolution:{value:new G}},points:{diffuse:{value:new Ke(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0},uvTransform:{value:new Be}},sprite:{diffuse:{value:new Ke(16777215)},opacity:{value:1},center:{value:new Oe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}}},di={basic:{uniforms:ln([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:ln([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new Ke(0)},envMapIntensity:{value:1}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:ln([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new Ke(0)},specular:{value:new Ke(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:ln([pe.common,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.roughnessmap,pe.metalnessmap,pe.fog,pe.lights,{emissive:{value:new Ke(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:ln([pe.common,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.gradientmap,pe.fog,pe.lights,{emissive:{value:new Ke(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:ln([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:ln([pe.points,pe.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:ln([pe.common,pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:ln([pe.common,pe.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:ln([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:ln([pe.sprite,pe.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new Be},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Be}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distance:{uniforms:ln([pe.common,pe.displacementmap,{referencePosition:{value:new G},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distance_vert,fragmentShader:Ge.distance_frag},shadow:{uniforms:ln([pe.lights,pe.fog,{color:{value:new Ke(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};di.physical={uniforms:ln([di.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Be},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Be},clearcoatNormalScale:{value:new Oe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Be},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Be},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Be},sheen:{value:0},sheenColor:{value:new Ke(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Be},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Be},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Be},transmissionSamplerSize:{value:new Oe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Be},attenuationDistance:{value:0},attenuationColor:{value:new Ke(0)},specularColor:{value:new Ke(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Be},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Be},anisotropyVector:{value:new Oe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Be}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};const Qo={r:0,b:0,g:0},OT=new Tt,Zv=new Be;Zv.set(-1,0,0,0,1,0,0,0,1);function kT(t,e,n,i,r,s){const a=new Ke(0);let o=r===!0?0:1,l,c,f=null,p=0,d=null;function m(g){let M=g.isScene===!0?g.background:null;if(M&&M.isTexture){const x=g.backgroundBlurriness>0;M=e.get(M,x)}return M}function _(g){let M=!1;const x=m(g);x===null?v(a,o):x&&x.isColor&&(v(x,1),M=!0);const w=t.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,s):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(t.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function E(g,M){const x=m(M);x&&(x.isCubeTexture||x.mapping===mc)?(c===void 0&&(c=new Si(new ro(1,1,1),new yi({name:"BackgroundCubeMaterial",uniforms:js(di.backgroundCube.uniforms),vertexShader:di.backgroundCube.vertexShader,fragmentShader:di.backgroundCube.fragmentShader,side:Mn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,b,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=x,c.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(OT.makeRotationFromEuler(M.backgroundRotation)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Zv),c.material.toneMapped=Ze.getTransfer(x.colorSpace)!==ot,(f!==x||p!==x.version||d!==t.toneMapping)&&(c.material.needsUpdate=!0,f=x,p=x.version,d=t.toneMapping),c.layers.enableAll(),g.unshift(c,c.geometry,c.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new Si(new _c(2,2),new yi({name:"BackgroundMaterial",uniforms:js(di.background.uniforms),vertexShader:di.background.vertexShader,fragmentShader:di.background.fragmentShader,side:Gr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=Ze.getTransfer(x.colorSpace)!==ot,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(f!==x||p!==x.version||d!==t.toneMapping)&&(l.material.needsUpdate=!0,f=x,p=x.version,d=t.toneMapping),l.layers.enableAll(),g.unshift(l,l.geometry,l.material,0,0,null))}function v(g,M){g.getRGB(Qo,$v(t)),n.buffers.color.setClear(Qo.r,Qo.g,Qo.b,M,s)}function h(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(g,M=1){a.set(g),o=M,v(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(g){o=g,v(a,o)},render:_,addToRenderList:E,dispose:h}}function BT(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=d(null);let s=r,a=!1;function o(P,H,W,L,j){let I=!1;const U=p(P,L,W,H);s!==U&&(s=U,c(s.object)),I=m(P,L,W,j),I&&_(P,L,W,j),j!==null&&e.update(j,t.ELEMENT_ARRAY_BUFFER),(I||a)&&(a=!1,x(P,H,W,L),j!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(j).buffer))}function l(){return t.createVertexArray()}function c(P){return t.bindVertexArray(P)}function f(P){return t.deleteVertexArray(P)}function p(P,H,W,L){const j=L.wireframe===!0;let I=i[H.id];I===void 0&&(I={},i[H.id]=I);const U=P.isInstancedMesh===!0?P.id:0;let k=I[U];k===void 0&&(k={},I[U]=k);let z=k[W.id];z===void 0&&(z={},k[W.id]=z);let D=z[j];return D===void 0&&(D=d(l()),z[j]=D),D}function d(P){const H=[],W=[],L=[];for(let j=0;j<n;j++)H[j]=0,W[j]=0,L[j]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:H,enabledAttributes:W,attributeDivisors:L,object:P,attributes:{},index:null}}function m(P,H,W,L){const j=s.attributes,I=H.attributes;let U=0;const k=W.getAttributes();for(const z in k)if(k[z].location>=0){const Y=j[z];let oe=I[z];if(oe===void 0&&(z==="instanceMatrix"&&P.instanceMatrix&&(oe=P.instanceMatrix),z==="instanceColor"&&P.instanceColor&&(oe=P.instanceColor)),Y===void 0||Y.attribute!==oe||oe&&Y.data!==oe.data)return!0;U++}return s.attributesNum!==U||s.index!==L}function _(P,H,W,L){const j={},I=H.attributes;let U=0;const k=W.getAttributes();for(const z in k)if(k[z].location>=0){let Y=I[z];Y===void 0&&(z==="instanceMatrix"&&P.instanceMatrix&&(Y=P.instanceMatrix),z==="instanceColor"&&P.instanceColor&&(Y=P.instanceColor));const oe={};oe.attribute=Y,Y&&Y.data&&(oe.data=Y.data),j[z]=oe,U++}s.attributes=j,s.attributesNum=U,s.index=L}function E(){const P=s.newAttributes;for(let H=0,W=P.length;H<W;H++)P[H]=0}function v(P){h(P,0)}function h(P,H){const W=s.newAttributes,L=s.enabledAttributes,j=s.attributeDivisors;W[P]=1,L[P]===0&&(t.enableVertexAttribArray(P),L[P]=1),j[P]!==H&&(t.vertexAttribDivisor(P,H),j[P]=H)}function g(){const P=s.newAttributes,H=s.enabledAttributes;for(let W=0,L=H.length;W<L;W++)H[W]!==P[W]&&(t.disableVertexAttribArray(W),H[W]=0)}function M(P,H,W,L,j,I,U){U===!0?t.vertexAttribIPointer(P,H,W,j,I):t.vertexAttribPointer(P,H,W,L,j,I)}function x(P,H,W,L){E();const j=L.attributes,I=W.getAttributes(),U=H.defaultAttributeValues;for(const k in I){const z=I[k];if(z.location>=0){let D=j[k];if(D===void 0&&(k==="instanceMatrix"&&P.instanceMatrix&&(D=P.instanceMatrix),k==="instanceColor"&&P.instanceColor&&(D=P.instanceColor)),D!==void 0){const Y=D.normalized,oe=D.itemSize,ge=e.get(D);if(ge===void 0)continue;const He=ge.buffer,ke=ge.type,Ie=ge.bytesPerElement,Z=ke===t.INT||ke===t.UNSIGNED_INT||D.gpuType===af;if(D.isInterleavedBufferAttribute){const ne=D.data,Se=ne.stride,Ue=D.offset;if(ne.isInstancedInterleavedBuffer){for(let ye=0;ye<z.locationSize;ye++)h(z.location+ye,ne.meshPerAttribute);P.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let ye=0;ye<z.locationSize;ye++)v(z.location+ye);t.bindBuffer(t.ARRAY_BUFFER,He);for(let ye=0;ye<z.locationSize;ye++)M(z.location+ye,oe/z.locationSize,ke,Y,Se*Ie,(Ue+oe/z.locationSize*ye)*Ie,Z)}else{if(D.isInstancedBufferAttribute){for(let ne=0;ne<z.locationSize;ne++)h(z.location+ne,D.meshPerAttribute);P.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=D.meshPerAttribute*D.count)}else for(let ne=0;ne<z.locationSize;ne++)v(z.location+ne);t.bindBuffer(t.ARRAY_BUFFER,He);for(let ne=0;ne<z.locationSize;ne++)M(z.location+ne,oe/z.locationSize,ke,Y,oe*Ie,oe/z.locationSize*ne*Ie,Z)}}else if(U!==void 0){const Y=U[k];if(Y!==void 0)switch(Y.length){case 2:t.vertexAttrib2fv(z.location,Y);break;case 3:t.vertexAttrib3fv(z.location,Y);break;case 4:t.vertexAttrib4fv(z.location,Y);break;default:t.vertexAttrib1fv(z.location,Y)}}}}g()}function w(){C();for(const P in i){const H=i[P];for(const W in H){const L=H[W];for(const j in L){const I=L[j];for(const U in I)f(I[U].object),delete I[U];delete L[j]}}delete i[P]}}function b(P){if(i[P.id]===void 0)return;const H=i[P.id];for(const W in H){const L=H[W];for(const j in L){const I=L[j];for(const U in I)f(I[U].object),delete I[U];delete L[j]}}delete i[P.id]}function A(P){for(const H in i){const W=i[H];for(const L in W){const j=W[L];if(j[P.id]===void 0)continue;const I=j[P.id];for(const U in I)f(I[U].object),delete I[U];delete j[P.id]}}}function y(P){for(const H in i){const W=i[H],L=P.isInstancedMesh===!0?P.id:0,j=W[L];if(j!==void 0){for(const I in j){const U=j[I];for(const k in U)f(U[k].object),delete U[k];delete j[I]}delete W[L],Object.keys(W).length===0&&delete i[H]}}}function C(){N(),a=!0,s!==r&&(s=r,c(s.object))}function N(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:C,resetDefaultState:N,dispose:w,releaseStatesOfGeometry:b,releaseStatesOfObject:y,releaseStatesOfProgram:A,initAttributes:E,enableAttribute:v,disableUnusedAttributes:g}}function zT(t,e,n){let i;function r(l){i=l}function s(l,c){t.drawArrays(i,l,c),n.update(c,i,1)}function a(l,c,f){f!==0&&(t.drawArraysInstanced(i,l,c,f),n.update(c,i,f))}function o(l,c,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,f);let d=0;for(let m=0;m<f;m++)d+=c[m];n.update(d,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function HT(t,e,n,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(A){return!(A!==Jn&&i.convert(A)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const y=A===xi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==An&&A!==fi&&!y&&i.convert(A)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE))}function l(A){if(A==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const f=l(c);f!==c&&(Le("WebGLRenderer:",c,"not supported, using",f,"instead."),c=f);const p=n.logarithmicDepthBuffer===!0,d=n.reversedDepthBuffer===!0&&e.has("EXT_clip_control");n.reversedDepthBuffer===!0&&d===!1&&Le("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const m=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),_=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),E=t.getParameter(t.MAX_TEXTURE_SIZE),v=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),h=t.getParameter(t.MAX_VERTEX_ATTRIBS),g=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),M=t.getParameter(t.MAX_VARYING_VECTORS),x=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),w=t.getParameter(t.MAX_SAMPLES),b=t.getParameter(t.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:p,reversedDepthBuffer:d,maxTextures:m,maxVertexTextures:_,maxTextureSize:E,maxCubemapSize:v,maxAttributes:h,maxVertexUniforms:g,maxVaryings:M,maxFragmentUniforms:x,maxSamples:w,samples:b}}function VT(t){const e=this;let n=null,i=0,r=!1,s=!1;const a=new Pi,o=new Be,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(p,d){const m=p.length!==0||d||i!==0||r;return r=d,i=p.length,m},this.beginShadows=function(){s=!0,f(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(p,d){n=f(p,d,0)},this.setState=function(p,d,m){const _=p.clippingPlanes,E=p.clipIntersection,v=p.clipShadows,h=t.get(p);if(!r||_===null||_.length===0||s&&!v)s?f(null):c();else{const g=s?0:i,M=g*4;let x=h.clippingState||null;l.value=x,x=f(_,d,M,m);for(let w=0;w!==M;++w)x[w]=n[w];h.clippingState=x,this.numIntersection=E?this.numPlanes:0,this.numPlanes+=g}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function f(p,d,m,_){const E=p!==null?p.length:0;let v=null;if(E!==0){if(v=l.value,_!==!0||v===null){const h=m+E*4,g=d.matrixWorldInverse;o.getNormalMatrix(g),(v===null||v.length<h)&&(v=new Float32Array(h));for(let M=0,x=m;M!==E;++M,x+=4)a.copy(p[M]).applyMatrix4(g,o),a.normal.toArray(v,x),v[x+3]=a.constant}l.value=v,l.needsUpdate=!0}return e.numPlanes=E,e.numIntersection=0,v}}const Ts=4,GT=6,jT=20,WT=256,ua=new vf,Cm=new Ke;let yu=null,Mu=0,Eu=0,wu=!1;const XT=new G,Cr=new G;class Rm{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,n=0,i=.1,r=100,s={}){const{size:a=256,position:o=XT}=s;yu=this._renderer.getRenderTarget(),Mu=this._renderer.getActiveCubeFace(),Eu=this._renderer.getActiveMipmapLevel(),wu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,o),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Lm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Nm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(yu,Mu,Eu),this._renderer.xr.enabled=wu,e.scissorTest=!1,cs(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===jr||e.mapping===Gs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),yu=this._renderer.getRenderTarget(),Mu=this._renderer.getActiveCubeFace(),Eu=this._renderer.getActiveMipmapLevel(),wu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:rn,minFilter:rn,generateMipmaps:!1,type:xi,format:Jn,colorSpace:$l,depthBuffer:!1},r=Pm(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Pm(e,n,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=$T(s)),this._blurMaterial=qT(s,e,n),this._ggxMaterial=YT(s,e,n)}return r}_compileMaterial(e){const n=new Si(new jn,e);this._renderer.compile(n,ua)}_sceneToCubeUV(e,n,i,r,s){const l=new kn(90,1,n,i),c=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],p=this._renderer,d=p.autoClear,m=p.toneMapping;p.getClearColor(Cm),p.toneMapping=_i,p.autoClear=!1,p.state.buffers.depth.getReversed()&&(p.setRenderTarget(r),p.clearDepth(),p.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Si(new ro,new Gv({name:"PMREM.Background",side:Mn,depthWrite:!1,depthTest:!1})));const E=this._backgroundBox,v=E.material;let h=!1;const g=e.background;g?g.isColor&&(v.color.copy(g),e.background=null,h=!0):(v.color.copy(Cm),h=!0);for(let M=0;M<6;M++){const x=M%3;x===0?(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+f[M],s.y,s.z)):x===1?(l.up.set(0,0,c[M]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+f[M],s.z)):(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+f[M]));const w=this._cubeSize;cs(r,x*w,M>2?w:0,w,w),p.setRenderTarget(r),h&&p.render(E,l),p.render(e,l)}p.toneMapping=m,p.autoClear=d,e.background=g}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===jr||e.mapping===Gs;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Lm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Nm());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;cs(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(a,ua)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);n.autoClear=i}_applyGGXFilter(e,n,i){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),f=n/(this._lodMeshes.length-1),p=Math.sqrt(c*c-f*f),d=c*1.25,m=p*d,{_lodMax:_}=this,E=this._sizeLods[i],v=3*E*(i>_-Ts?i-_+Ts:0),h=4*(this._cubeSize-E);l.envMap.value=e.texture,l.roughness.value=m,l.mipInt.value=_-n,cs(s,v,h,3*E,2*E),r.setRenderTarget(s),r.render(o,ua),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=_-i,cs(e,v,h,3*E,2*E),r.setRenderTarget(e),r.render(o,ua)}_blur(e,n,i,r){const s=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,n,i,a),this._blurPass(s,e,i,i,a)}_blurPass(e,n,i,r,s){const a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[r];l.material=o;const c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=s,c.mipInt.value=this._lodMax-i;const f=this._sizeLods[r],p=3*f*(r>this._lodMax-Ts?r-this._lodMax+Ts:0),d=4*(this._cubeSize-f);cs(n,p,d,3*f,2*f),a.setRenderTarget(n),a.render(l,ua)}}function $T(t){const e=[],n=[];let i=t;const r=t-Ts+1+GT;for(let s=0;s<r;s++){const a=Math.pow(2,i);e.push(a);const o=1/(a-2),l=-o,c=1+o,f=[l,l,c,l,c,c,l,l,c,c,l,c],p=6,d=6,m=3,_=new Float32Array(m*d*p),E=new Float32Array(m*d*p);for(let h=0;h<p;h++){const g=h%3*2/3-1,M=h>2?0:-1,x=[g,M,0,g+2/3,M,0,g+2/3,M+1,0,g,M,0,g+2/3,M+1,0,g,M+1,0];_.set(x,m*d*h);for(let w=0;w<d;w++){const b=f[w*2]*2-1,A=f[w*2+1]*2-1;h===0?Cr.set(1,A,b):h===1?Cr.set(-b,1,-A):h===2?Cr.set(-b,A,1):h===3?Cr.set(-1,A,-b):h===4?Cr.set(-b,-1,A):Cr.set(b,A,-1),Cr.toArray(E,(h*d+w)*m)}}const v=new jn;v.setAttribute("position",new ki(_,m)),v.setAttribute("outputDirection",new ki(E,m)),n.push(new Si(v,null)),i>Ts&&i--}return{lodMeshes:n,sizeLods:e}}function Pm(t,e,n){const i=new ni(t,e,n);return i.texture.mapping=mc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function cs(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function YT(t,e,n){return new yi({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:WT,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:vc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function qT(t,e,n){return new yi({name:"SphericalGaussianBlur",defines:{SAMPLES:jT,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:vc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function Nm(){return new yi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:vc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function Lm(){return new yi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:vc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function vc(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class Qv extends ni{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Wv(r),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new ro(5,5,5),s=new yi({name:"CubemapFromEquirect",uniforms:js(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Mn,blending:Fi});s.uniforms.tEquirect.value=n;const a=new Si(r,s),o=n.minFilter;return n.minFilter===Ir&&(n.minFilter=rn),new QM(1,10,this).update(e,a),n.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,n=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(n,i,r);e.setRenderTarget(s)}}function KT(t){let e=new WeakMap,n=new WeakMap,i=null;function r(d,m=!1){return d==null?null:m?a(d):s(d)}function s(d){if(d&&d.isTexture){const m=d.mapping;if(m===Yc||m===qc)if(e.has(d)){const _=e.get(d).texture;return o(_,d.mapping)}else{const _=d.image;if(_&&_.height>0){const E=new Qv(_.height);return E.fromEquirectangularTexture(t,d),e.set(d,E),d.addEventListener("dispose",c),o(E.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){const m=d.mapping,_=m===Yc||m===qc,E=m===jr||m===Gs;if(_||E){let v=n.get(d);const h=v!==void 0?v.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==h)return i===null&&(i=new Rm(t)),v=_?i.fromEquirectangular(d,v):i.fromCubemap(d,v),v.texture.pmremVersion=d.pmremVersion,n.set(d,v),v.texture;if(v!==void 0)return v.texture;{const g=d.image;return _&&g&&g.height>0||E&&g&&l(g)?(i===null&&(i=new Rm(t)),v=_?i.fromEquirectangular(d):i.fromCubemap(d),v.texture.pmremVersion=d.pmremVersion,n.set(d,v),d.addEventListener("dispose",f),v.texture):null}}}return d}function o(d,m){return m===Yc?d.mapping=jr:m===qc&&(d.mapping=Gs),d}function l(d){let m=0;const _=6;for(let E=0;E<_;E++)d[E]!==void 0&&m++;return m===_}function c(d){const m=d.target;m.removeEventListener("dispose",c);const _=e.get(m);_!==void 0&&(e.delete(m),_.dispose())}function f(d){const m=d.target;m.removeEventListener("dispose",f);const _=n.get(m);_!==void 0&&(n.delete(m),_.dispose())}function p(){e=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:p}}function ZT(t){const e={};function n(i){if(e[i]!==void 0)return e[i];const r=t.getExtension(i);return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&Ds("WebGLRenderer: "+i+" extension not supported."),r}}}function QT(t,e,n,i){const r={},s=new WeakMap;function a(p){const d=p.target;d.index!==null&&e.remove(d.index);for(const _ in d.attributes)e.remove(d.attributes[_]);d.removeEventListener("dispose",a),delete r[d.id];const m=s.get(d);m&&(e.remove(m),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,n.memory.geometries--}function o(p,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,n.memory.geometries++),d}function l(p){const d=p.attributes;for(const m in d)e.update(d[m],t.ARRAY_BUFFER)}function c(p){const d=[],m=p.index,_=p.attributes.position;let E=0;if(_===void 0)return;if(m!==null){const g=m.array;E=m.version;for(let M=0,x=g.length;M<x;M+=3){const w=g[M+0],b=g[M+1],A=g[M+2];d.push(w,b,b,A,A,w)}}else{const g=_.array;E=_.version;for(let M=0,x=g.length/3-1;M<x;M+=3){const w=M+0,b=M+1,A=M+2;d.push(w,b,b,A,A,w)}}const v=new(_.count>=65535?Vv:Hv)(d,1);v.version=E;const h=s.get(p);h&&e.remove(h),s.set(p,v)}function f(p){const d=s.get(p);if(d){const m=p.index;m!==null&&d.version<m.version&&c(p)}else c(p);return s.get(p)}return{get:o,update:l,getWireframeAttribute:f}}function JT(t,e,n){let i;function r(p){i=p}let s,a;function o(p){s=p.type,a=p.bytesPerElement}function l(p,d){t.drawElements(i,d,s,p*a),n.update(d,i,1)}function c(p,d,m){m!==0&&(t.drawElementsInstanced(i,d,s,p*a,m),n.update(d,i,m))}function f(p,d,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,s,p,0,m);let E=0;for(let v=0;v<m;v++)E+=d[v];n.update(E,i,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=f}function e1(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(n.calls++,a){case t.TRIANGLES:n.triangles+=o*(s/3);break;case t.LINES:n.lines+=o*(s/2);break;case t.LINE_STRIP:n.lines+=o*(s-1);break;case t.LINE_LOOP:n.lines+=o*s;break;case t.POINTS:n.points+=o*s;break;default:it("WebGLInfo: Unknown draw mode:",a);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function t1(t,e,n){const i=new WeakMap,r=new Et;function s(a,o,l){const c=a.morphTargetInfluences,f=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,p=f!==void 0?f.length:0;let d=i.get(o);if(d===void 0||d.count!==p){let N=function(){y.dispose(),i.delete(o),o.removeEventListener("dispose",N)};var m=N;d!==void 0&&d.texture.dispose();const _=o.morphAttributes.position!==void 0,E=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,h=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let x=0;_===!0&&(x=1),E===!0&&(x=2),v===!0&&(x=3);let w=o.attributes.position.count*x,b=1;w>e.maxTextureSize&&(b=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const A=new Float32Array(w*b*4*p),y=new kv(A,w,b,p);y.type=fi,y.needsUpdate=!0;const C=x*4;for(let P=0;P<p;P++){const H=h[P],W=g[P],L=M[P],j=w*b*4*P;for(let I=0;I<H.count;I++){const U=I*C;_===!0&&(r.fromBufferAttribute(H,I),A[j+U+0]=r.x,A[j+U+1]=r.y,A[j+U+2]=r.z,A[j+U+3]=0),E===!0&&(r.fromBufferAttribute(W,I),A[j+U+4]=r.x,A[j+U+5]=r.y,A[j+U+6]=r.z,A[j+U+7]=0),v===!0&&(r.fromBufferAttribute(L,I),A[j+U+8]=r.x,A[j+U+9]=r.y,A[j+U+10]=r.z,A[j+U+11]=L.itemSize===4?r.w:1)}}d={count:p,texture:y,size:new Oe(w,b)},i.set(o,d),o.addEventListener("dispose",N)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",a.morphTexture,n);else{let _=0;for(let v=0;v<c.length;v++)_+=c[v];const E=o.morphTargetsRelative?1:1-_;l.getUniforms().setValue(t,"morphTargetBaseInfluence",E),l.getUniforms().setValue(t,"morphTargetInfluences",c)}l.getUniforms().setValue(t,"morphTargetsTexture",d.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",d.size)}return{update:s}}function n1(t,e,n,i,r){let s=new WeakMap;function a(c){const f=r.render.frame,p=c.geometry,d=e.get(c,p);if(s.get(d)!==f&&(e.update(d),s.set(d,f)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==f&&(n.update(c.instanceMatrix,t.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,t.ARRAY_BUFFER),s.set(c,f))),c.isSkinnedMesh){const m=c.skeleton;s.get(m)!==f&&(m.update(),s.set(m,f))}return d}function o(){s=new WeakMap}function l(c){const f=c.target;f.removeEventListener("dispose",l),i.releaseStatesOfObject(f),n.remove(f.instanceMatrix),f.instanceColor!==null&&n.remove(f.instanceColor)}return{update:a,dispose:o}}const i1={[yv]:"LINEAR_TONE_MAPPING",[Mv]:"REINHARD_TONE_MAPPING",[Ev]:"CINEON_TONE_MAPPING",[wv]:"ACES_FILMIC_TONE_MAPPING",[bv]:"AGX_TONE_MAPPING",[Av]:"NEUTRAL_TONE_MAPPING",[Tv]:"CUSTOM_TONE_MAPPING"};function r1(t,e,n,i,r,s){const a=new ni(e,n,{type:t,depthBuffer:r,stencilBuffer:s,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,l=null;const c=new jn;c.setAttribute("position",new En([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new En([0,2,0,0,2,0],2));const f=new jM({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),p=new Si(c,f),d=new vf(-1,1,1,-1,0,1);let m=null,_=null,E=!1,v,h=null,g=[],M=!1;this.setSize=function(x,w){a.setSize(x,w),o!==null&&o.setSize(x,w),l!==null&&l.setSize(x,w);for(let b=0;b<g.length;b++){const A=g[b];A.setSize&&A.setSize(x,w)}},this.setEffects=function(x){g=x,M=g.length>0&&g[0].isRenderPass===!0;const w=a.width,b=a.height;g.length>0&&o===null&&(o=new ni(w,b,{type:xi,depthBuffer:!1,stencilBuffer:!1}),l=new ni(w,b,{type:xi,depthBuffer:!1,stencilBuffer:!1}));for(let A=0;A<g.length;A++){const y=g[A];y.setSize&&y.setSize(w,b)}},this.begin=function(x,w){if(E||x.toneMapping===_i&&g.length===0)return!1;if(h=w,w!==null){const b=w.width,A=w.height;(a.width!==b||a.height!==A)&&this.setSize(b,A)}return M===!1&&x.setRenderTarget(a),v=x.toneMapping,x.toneMapping=_i,!0},this.hasRenderPass=function(){return M},this.end=function(x,w){x.toneMapping=v,E=!0;let b=a,A=o;for(let y=0;y<g.length;y++){const C=g[y];C.enabled!==!1&&(C.render(x,A,b,w),C.needsSwap!==!1&&(b=A,A=A===o?l:o))}if(m!==x.outputColorSpace||_!==x.toneMapping){m=x.outputColorSpace,_=x.toneMapping,f.defines={},Ze.getTransfer(m)===ot&&(f.defines.SRGB_TRANSFER="");const y=i1[_];y&&(f.defines[y]=""),f.needsUpdate=!0}f.uniforms.tDiffuse.value=b.texture,x.setRenderTarget(h),x.render(p,d),h=null,E=!1},this.isCompositing=function(){return E},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),f.dispose()}}const Jv=new dn,oh=new Za(1,1),e0=new kv,t0=new vM,n0=new Wv,Dm=[],Im=[],Um=new Float32Array(16),Fm=new Float32Array(9),Om=new Float32Array(4);function Ks(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=Dm[r];if(s===void 0&&(s=new Float32Array(r),Dm[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=n,t[a].toArray(s,o)}return s}function kt(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Bt(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function xc(t,e){let n=Im[e];n===void 0&&(n=new Int32Array(e),Im[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function s1(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function a1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(kt(n,e))return;t.uniform2fv(this.addr,e),Bt(n,e)}}function o1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(kt(n,e))return;t.uniform3fv(this.addr,e),Bt(n,e)}}function l1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(kt(n,e))return;t.uniform4fv(this.addr,e),Bt(n,e)}}function c1(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(kt(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Bt(n,e)}else{if(kt(n,i))return;Om.set(i),t.uniformMatrix2fv(this.addr,!1,Om),Bt(n,i)}}function u1(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(kt(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Bt(n,e)}else{if(kt(n,i))return;Fm.set(i),t.uniformMatrix3fv(this.addr,!1,Fm),Bt(n,i)}}function d1(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(kt(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Bt(n,e)}else{if(kt(n,i))return;Um.set(i),t.uniformMatrix4fv(this.addr,!1,Um),Bt(n,i)}}function h1(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function f1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(kt(n,e))return;t.uniform2iv(this.addr,e),Bt(n,e)}}function p1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(kt(n,e))return;t.uniform3iv(this.addr,e),Bt(n,e)}}function m1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(kt(n,e))return;t.uniform4iv(this.addr,e),Bt(n,e)}}function g1(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function _1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(kt(n,e))return;t.uniform2uiv(this.addr,e),Bt(n,e)}}function v1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(kt(n,e))return;t.uniform3uiv(this.addr,e),Bt(n,e)}}function x1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(kt(n,e))return;t.uniform4uiv(this.addr,e),Bt(n,e)}}function S1(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let s;this.type===t.SAMPLER_2D_SHADOW?(oh.compareFunction=n.isReversedDepthBuffer()?ff:hf,s=oh):s=Jv,n.setTexture2D(e||s,r)}function y1(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||t0,r)}function M1(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||n0,r)}function E1(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||e0,r)}function w1(t){switch(t){case 5126:return s1;case 35664:return a1;case 35665:return o1;case 35666:return l1;case 35674:return c1;case 35675:return u1;case 35676:return d1;case 5124:case 35670:return h1;case 35667:case 35671:return f1;case 35668:case 35672:return p1;case 35669:case 35673:return m1;case 5125:return g1;case 36294:return _1;case 36295:return v1;case 36296:return x1;case 35678:case 36198:case 36298:case 36306:case 35682:return S1;case 35679:case 36299:case 36307:return y1;case 35680:case 36300:case 36308:case 36293:return M1;case 36289:case 36303:case 36311:case 36292:return E1}}function T1(t,e){t.uniform1fv(this.addr,e)}function b1(t,e){const n=Ks(e,this.size,2);t.uniform2fv(this.addr,n)}function A1(t,e){const n=Ks(e,this.size,3);t.uniform3fv(this.addr,n)}function C1(t,e){const n=Ks(e,this.size,4);t.uniform4fv(this.addr,n)}function R1(t,e){const n=Ks(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function P1(t,e){const n=Ks(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function N1(t,e){const n=Ks(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function L1(t,e){t.uniform1iv(this.addr,e)}function D1(t,e){t.uniform2iv(this.addr,e)}function I1(t,e){t.uniform3iv(this.addr,e)}function U1(t,e){t.uniform4iv(this.addr,e)}function F1(t,e){t.uniform1uiv(this.addr,e)}function O1(t,e){t.uniform2uiv(this.addr,e)}function k1(t,e){t.uniform3uiv(this.addr,e)}function B1(t,e){t.uniform4uiv(this.addr,e)}function z1(t,e,n){const i=this.cache,r=e.length,s=xc(n,r);kt(i,s)||(t.uniform1iv(this.addr,s),Bt(i,s));let a;this.type===t.SAMPLER_2D_SHADOW?a=oh:a=Jv;for(let o=0;o!==r;++o)n.setTexture2D(e[o]||a,s[o])}function H1(t,e,n){const i=this.cache,r=e.length,s=xc(n,r);kt(i,s)||(t.uniform1iv(this.addr,s),Bt(i,s));for(let a=0;a!==r;++a)n.setTexture3D(e[a]||t0,s[a])}function V1(t,e,n){const i=this.cache,r=e.length,s=xc(n,r);kt(i,s)||(t.uniform1iv(this.addr,s),Bt(i,s));for(let a=0;a!==r;++a)n.setTextureCube(e[a]||n0,s[a])}function G1(t,e,n){const i=this.cache,r=e.length,s=xc(n,r);kt(i,s)||(t.uniform1iv(this.addr,s),Bt(i,s));for(let a=0;a!==r;++a)n.setTexture2DArray(e[a]||e0,s[a])}function j1(t){switch(t){case 5126:return T1;case 35664:return b1;case 35665:return A1;case 35666:return C1;case 35674:return R1;case 35675:return P1;case 35676:return N1;case 5124:case 35670:return L1;case 35667:case 35671:return D1;case 35668:case 35672:return I1;case 35669:case 35673:return U1;case 5125:return F1;case 36294:return O1;case 36295:return k1;case 36296:return B1;case 35678:case 36198:case 36298:case 36306:case 35682:return z1;case 35679:case 36299:case 36307:return H1;case 35680:case 36300:case 36308:case 36293:return V1;case 36289:case 36303:case 36311:case 36292:return G1}}class W1{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=w1(n.type)}}class X1{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=j1(n.type)}}class $1{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,n[o.id],i)}}}const Tu=/(\w+)(\])?(\[|\.)?/g;function km(t,e){t.seq.push(e),t.map[e.id]=e}function Y1(t,e,n){const i=t.name,r=i.length;for(Tu.lastIndex=0;;){const s=Tu.exec(i),a=Tu.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){km(n,c===void 0?new W1(o,t,e):new X1(o,t,e));break}else{let p=n.map[o];p===void 0&&(p=new $1(o),km(n,p)),n=p}}}class xl{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(n,a),l=e.getUniformLocation(n,o.name);Y1(o,l,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,a=n.length;s!==a;++s){const o=n[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in n&&i.push(a)}return i}}function Bm(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const q1=37297;let K1=0;function Z1(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${n[a]}`)}return i.join(`
`)}const zm=new Be;function Q1(t){Ze._getMatrix(zm,Ze.workingColorSpace,t);const e=`mat3( ${zm.elements.map(n=>n.toFixed(4))} )`;switch(Ze.getTransfer(t)){case Yl:return[e,"LinearTransferOETF"];case ot:return[e,"sRGBTransferOETF"];default:return Le("WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function Hm(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),s=(t.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return n.toUpperCase()+`

`+s+`

`+Z1(t.getShaderSource(e),o)}else return s}function J1(t,e){const n=Q1(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const eb={[yv]:"Linear",[Mv]:"Reinhard",[Ev]:"Cineon",[wv]:"ACESFilmic",[bv]:"AgX",[Av]:"Neutral",[Tv]:"Custom"};function tb(t,e){const n=eb[e];return n===void 0?(Le("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+t+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Jo=new G;function nb(){Ze.getLuminanceCoefficients(Jo);const t=Jo.x.toFixed(4),e=Jo.y.toFixed(4),n=Jo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ib(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(_a).join(`
`)}function rb(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function sb(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),a=s.name;let o=1;s.type===t.FLOAT_MAT2&&(o=2),s.type===t.FLOAT_MAT3&&(o=3),s.type===t.FLOAT_MAT4&&(o=4),n[a]={type:s.type,location:t.getAttribLocation(e,a),locationSize:o}}return n}function _a(t){return t!==""}function Vm(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Gm(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const ab=/^[ \t]*#include +<([\w\d./]+)>/gm;function lh(t){return t.replace(ab,lb)}const ob=new Map;function lb(t,e){let n=Ge[e];if(n===void 0){const i=ob.get(e);if(i!==void 0)n=Ge[i],Le('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return lh(n)}const cb=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function jm(t){return t.replace(cb,ub)}function ub(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Wm(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const db={[pl]:"SHADOWMAP_TYPE_PCF",[ga]:"SHADOWMAP_TYPE_VSM"};function hb(t){return db[t.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const fb={[jr]:"ENVMAP_TYPE_CUBE",[Gs]:"ENVMAP_TYPE_CUBE",[mc]:"ENVMAP_TYPE_CUBE_UV"};function pb(t){return t.envMap===!1?"ENVMAP_TYPE_CUBE":fb[t.envMapMode]||"ENVMAP_TYPE_CUBE"}const mb={[Gs]:"ENVMAP_MODE_REFRACTION"};function gb(t){return t.envMap===!1?"ENVMAP_MODE_REFLECTION":mb[t.envMapMode]||"ENVMAP_MODE_REFLECTION"}const _b={[Sv]:"ENVMAP_BLENDING_MULTIPLY",[Iy]:"ENVMAP_BLENDING_MIX",[Uy]:"ENVMAP_BLENDING_ADD"};function vb(t){return t.envMap===!1?"ENVMAP_BLENDING_NONE":_b[t.combine]||"ENVMAP_BLENDING_NONE"}function xb(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function Sb(t,e,n,i){const r=t.getContext(),s=n.defines;let a=n.vertexShader,o=n.fragmentShader;const l=hb(n),c=pb(n),f=gb(n),p=vb(n),d=xb(n),m=ib(n),_=rb(s),E=r.createProgram();let v,h,g=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(v=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(_a).join(`
`),v.length>0&&(v+=`
`),h=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(_a).join(`
`),h.length>0&&(h+=`
`)):(v=[Wm(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+f:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(_a).join(`
`),h=[Wm(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+f:"",n.envMap?"#define "+p:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.retroreflection?"#define USE_RETROREFLECTION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==_i?"#define TONE_MAPPING":"",n.toneMapping!==_i?Ge.tonemapping_pars_fragment:"",n.toneMapping!==_i?tb("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Ge.colorspace_pars_fragment,J1("linearToOutputTexel",n.outputColorSpace),nb(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(_a).join(`
`)),a=lh(a),a=Vm(a,n),a=Gm(a,n),o=lh(o),o=Vm(o,n),o=Gm(o,n),a=jm(a),o=jm(o),n.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,v=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+v,h=["#define varying in",n.glslVersion===Qp?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Qp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const M=g+v+a,x=g+h+o,w=Bm(r,r.VERTEX_SHADER,M),b=Bm(r,r.FRAGMENT_SHADER,x);r.attachShader(E,w),r.attachShader(E,b),n.index0AttributeName!==void 0?r.bindAttribLocation(E,0,n.index0AttributeName):n.hasPositionAttribute===!0&&r.bindAttribLocation(E,0,"position"),r.linkProgram(E);function A(P){if(t.debug.checkShaderErrors){const H=r.getProgramInfoLog(E)||"",W=r.getShaderInfoLog(w)||"",L=r.getShaderInfoLog(b)||"",j=H.trim(),I=W.trim(),U=L.trim();let k=!0,z=!0;if(r.getProgramParameter(E,r.LINK_STATUS)===!1)if(k=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,E,w,b);else{const D=Hm(r,w,"vertex"),Y=Hm(r,b,"fragment");it("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(E,r.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+j+`
`+D+`
`+Y)}else j!==""?Le("WebGLProgram: Program Info Log:",j):(I===""||U==="")&&(z=!1);z&&(P.diagnostics={runnable:k,programLog:j,vertexShader:{log:I,prefix:v},fragmentShader:{log:U,prefix:h}})}r.deleteShader(w),r.deleteShader(b),y=new xl(r,E),C=sb(r,E)}let y;this.getUniforms=function(){return y===void 0&&A(this),y};let C;this.getAttributes=function(){return C===void 0&&A(this),C};let N=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return N===!1&&(N=r.getProgramParameter(E,q1)),N},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(E),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=K1++,this.cacheKey=e,this.usedTimes=1,this.program=E,this.vertexShader=w,this.fragmentShader=b,this}let yb=0;class Mb{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,n,i){const r=this._getShaderCacheForMaterial(e);return r.has(n)===!1&&(r.add(n),n.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new Eb(e),n.set(e,i)),i}}class Eb{constructor(e){this.id=yb++,this.code=e,this.usedTimes=0}}function wb(t){return t===Wr||t===Wl||t===Xl}function Tb(t,e,n,i,r,s){const a=new Bv,o=new Mb,l=new Set,c=[],f=new Map,p=i.logarithmicDepthBuffer;let d=i.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(y){return l.add(y),y===0?"uv":`uv${y}`}function E(y,C,N,P,H,W){const L=P.fog,j=H.geometry,I=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?P.environment:null,U=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,k=e.get(y.envMap||I,U),z=k&&k.mapping===mc?k.image.height:null,D=m[y.type];y.precision!==null&&(d=i.getMaxPrecision(y.precision),d!==y.precision&&Le("WebGLProgram.getParameters:",y.precision,"not supported, using",d,"instead."));const Y=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,oe=Y!==void 0?Y.length:0;let ge=0;j.morphAttributes.position!==void 0&&(ge=1),j.morphAttributes.normal!==void 0&&(ge=2),j.morphAttributes.color!==void 0&&(ge=3);let He,ke,Ie,Z;if(D){const ft=di[D];He=ft.vertexShader,ke=ft.fragmentShader}else{He=y.vertexShader,ke=y.fragmentShader;const ft=o.getVertexShaderStage(y),rt=o.getFragmentShaderStage(y);o.update(y,ft,rt),Ie=ft.id,Z=rt.id}const ne=t.getRenderTarget(),Se=t.state.buffers.depth.getReversed(),Ue=H.isInstancedMesh===!0,ye=H.isBatchedMesh===!0,je=!!y.map,It=!!y.matcap,Xe=!!k,tt=!!y.aoMap,ht=!!y.lightMap,qe=!!y.bumpMap&&y.wireframe===!1,xt=!!y.normalMap,zt=!!y.displacementMap,pn=!!y.emissiveMap,yt=!!y.metalnessMap,Pt=!!y.roughnessMap,B=y.anisotropy>0,qt=y.clearcoat>0,at=y.dispersion>0,R=y.retroreflectivity>0,S=y.iridescence>0,V=y.sheen>0,q=y.transmission>0,Q=B&&!!y.anisotropyMap,ae=qt&&!!y.clearcoatMap,le=qt&&!!y.clearcoatNormalMap,J=qt&&!!y.clearcoatRoughnessMap,ie=S&&!!y.iridescenceMap,ce=S&&!!y.iridescenceThicknessMap,Ce=V&&!!y.sheenColorMap,fe=V&&!!y.sheenRoughnessMap,ue=!!y.specularMap,Re=!!y.specularColorMap,Ne=!!y.specularIntensityMap,ze=q&&!!y.transmissionMap,O=q&&!!y.thicknessMap,de=!!y.gradientMap,ee=!!y.alphaMap,he=y.alphaTest>0,ve=!!y.alphaHash,re=!!y.extensions;let Pe=_i;y.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(Pe=t.toneMapping);const be={shaderID:D,shaderType:y.type,shaderName:y.name,vertexShader:He,fragmentShader:ke,defines:y.defines,customVertexShaderID:Ie,customFragmentShaderID:Z,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:d,batching:ye,batchingColor:ye&&H._colorsTexture!==null,instancing:Ue,instancingColor:Ue&&H.instanceColor!==null,instancingMorph:Ue&&H.morphTexture!==null,outputColorSpace:ne===null?t.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:Ze.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:je,matcap:It,envMap:Xe,envMapMode:Xe&&k.mapping,envMapCubeUVHeight:z,aoMap:tt,lightMap:ht,bumpMap:qe,normalMap:xt,displacementMap:zt,emissiveMap:pn,normalMapObjectSpace:xt&&y.normalMapType===ky,normalMapTangentSpace:xt&&y.normalMapType===ah,packedNormalMap:xt&&y.normalMapType===ah&&wb(y.normalMap.format),metalnessMap:yt,roughnessMap:Pt,anisotropy:B,anisotropyMap:Q,clearcoat:qt,clearcoatMap:ae,clearcoatNormalMap:le,clearcoatRoughnessMap:J,dispersion:at,retroreflection:R,iridescence:S,iridescenceMap:ie,iridescenceThicknessMap:ce,sheen:V,sheenColorMap:Ce,sheenRoughnessMap:fe,specularMap:ue,specularColorMap:Re,specularIntensityMap:Ne,transmission:q,transmissionMap:ze,thicknessMap:O,gradientMap:de,opaque:y.transparent===!1&&y.blending===Aa&&y.alphaToCoverage===!1,alphaMap:ee,alphaTest:he,alphaHash:ve,combine:y.combine,mapUv:je&&_(y.map.channel),aoMapUv:tt&&_(y.aoMap.channel),lightMapUv:ht&&_(y.lightMap.channel),bumpMapUv:qe&&_(y.bumpMap.channel),normalMapUv:xt&&_(y.normalMap.channel),displacementMapUv:zt&&_(y.displacementMap.channel),emissiveMapUv:pn&&_(y.emissiveMap.channel),metalnessMapUv:yt&&_(y.metalnessMap.channel),roughnessMapUv:Pt&&_(y.roughnessMap.channel),anisotropyMapUv:Q&&_(y.anisotropyMap.channel),clearcoatMapUv:ae&&_(y.clearcoatMap.channel),clearcoatNormalMapUv:le&&_(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:J&&_(y.clearcoatRoughnessMap.channel),iridescenceMapUv:ie&&_(y.iridescenceMap.channel),iridescenceThicknessMapUv:ce&&_(y.iridescenceThicknessMap.channel),sheenColorMapUv:Ce&&_(y.sheenColorMap.channel),sheenRoughnessMapUv:fe&&_(y.sheenRoughnessMap.channel),specularMapUv:ue&&_(y.specularMap.channel),specularColorMapUv:Re&&_(y.specularColorMap.channel),specularIntensityMapUv:Ne&&_(y.specularIntensityMap.channel),transmissionMapUv:ze&&_(y.transmissionMap.channel),thicknessMapUv:O&&_(y.thicknessMap.channel),alphaMapUv:ee&&_(y.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(xt||B),vertexNormals:!!j.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!j.attributes.uv&&(je||ee),fog:!!L,useFog:y.fog===!0,fogExp2:!!L&&L.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||j.attributes.normal===void 0&&xt===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:Se,skinning:H.isSkinnedMesh===!0,hasPositionAttribute:j.attributes.position!==void 0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:oe,morphTextureStride:ge,numSunLights:C.sun.length,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numSunLightShadows:C.sunShadowMap.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numLightProbeGrids:W.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:y.dithering,shadowMapEnabled:t.shadowMap.enabled&&N.length>0,shadowMapType:t.shadowMap.type,toneMapping:Pe,decodeVideoTexture:je&&y.map.isVideoTexture===!0&&Ze.getTransfer(y.map.colorSpace)===ot,decodeVideoTextureEmissive:pn&&y.emissiveMap.isVideoTexture===!0&&Ze.getTransfer(y.emissiveMap.colorSpace)===ot,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Ni,flipSided:y.side===Mn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:re&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(re&&y.extensions.multiDraw===!0||ye)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return be.vertexUv1s=l.has(1),be.vertexUv2s=l.has(2),be.vertexUv3s=l.has(3),l.clear(),be}function v(y){const C=[];if(y.shaderID?C.push(y.shaderID):(C.push(y.customVertexShaderID),C.push(y.customFragmentShaderID)),y.defines!==void 0)for(const N in y.defines)C.push(N),C.push(y.defines[N]);return y.isRawShaderMaterial===!1&&(h(C,y),g(C,y),C.push(t.outputColorSpace)),C.push(y.customProgramCacheKey),C.join()}function h(y,C){y.push(C.precision),y.push(C.outputColorSpace),y.push(C.envMapMode),y.push(C.envMapCubeUVHeight),y.push(C.mapUv),y.push(C.alphaMapUv),y.push(C.lightMapUv),y.push(C.aoMapUv),y.push(C.bumpMapUv),y.push(C.normalMapUv),y.push(C.displacementMapUv),y.push(C.emissiveMapUv),y.push(C.metalnessMapUv),y.push(C.roughnessMapUv),y.push(C.anisotropyMapUv),y.push(C.clearcoatMapUv),y.push(C.clearcoatNormalMapUv),y.push(C.clearcoatRoughnessMapUv),y.push(C.iridescenceMapUv),y.push(C.iridescenceThicknessMapUv),y.push(C.sheenColorMapUv),y.push(C.sheenRoughnessMapUv),y.push(C.specularMapUv),y.push(C.specularColorMapUv),y.push(C.specularIntensityMapUv),y.push(C.transmissionMapUv),y.push(C.thicknessMapUv),y.push(C.combine),y.push(C.fogExp2),y.push(C.sizeAttenuation),y.push(C.morphTargetsCount),y.push(C.morphAttributeCount),y.push(C.numSunLights),y.push(C.numDirLights),y.push(C.numPointLights),y.push(C.numSpotLights),y.push(C.numSpotLightMaps),y.push(C.numHemiLights),y.push(C.numRectAreaLights),y.push(C.numSunLightShadows),y.push(C.numDirLightShadows),y.push(C.numPointLightShadows),y.push(C.numSpotLightShadows),y.push(C.numSpotLightShadowsWithMaps),y.push(C.numLightProbes),y.push(C.shadowMapType),y.push(C.toneMapping),y.push(C.numClippingPlanes),y.push(C.numClipIntersection),y.push(C.depthPacking)}function g(y,C){a.disableAll(),C.instancing&&a.enable(0),C.instancingColor&&a.enable(1),C.instancingMorph&&a.enable(2),C.matcap&&a.enable(3),C.envMap&&a.enable(4),C.normalMapObjectSpace&&a.enable(5),C.normalMapTangentSpace&&a.enable(6),C.clearcoat&&a.enable(7),C.iridescence&&a.enable(8),C.alphaTest&&a.enable(9),C.vertexColors&&a.enable(10),C.vertexAlphas&&a.enable(11),C.vertexUv1s&&a.enable(12),C.vertexUv2s&&a.enable(13),C.vertexUv3s&&a.enable(14),C.vertexTangents&&a.enable(15),C.anisotropy&&a.enable(16),C.alphaHash&&a.enable(17),C.batching&&a.enable(18),C.dispersion&&a.enable(19),C.retroreflection&&a.enable(24),C.batchingColor&&a.enable(20),C.gradientMap&&a.enable(21),C.packedNormalMap&&a.enable(22),C.vertexNormals&&a.enable(23),y.push(a.mask),a.disableAll(),C.fog&&a.enable(0),C.useFog&&a.enable(1),C.flatShading&&a.enable(2),C.logarithmicDepthBuffer&&a.enable(3),C.reversedDepthBuffer&&a.enable(4),C.skinning&&a.enable(5),C.morphTargets&&a.enable(6),C.morphNormals&&a.enable(7),C.morphColors&&a.enable(8),C.premultipliedAlpha&&a.enable(9),C.shadowMapEnabled&&a.enable(10),C.doubleSided&&a.enable(11),C.flipSided&&a.enable(12),C.useDepthPacking&&a.enable(13),C.dithering&&a.enable(14),C.transmission&&a.enable(15),C.sheen&&a.enable(16),C.opaque&&a.enable(17),C.pointsUvs&&a.enable(18),C.decodeVideoTexture&&a.enable(19),C.decodeVideoTextureEmissive&&a.enable(20),C.alphaToCoverage&&a.enable(21),C.numLightProbeGrids>0&&a.enable(22),C.hasPositionAttribute&&a.enable(23),y.push(a.mask)}function M(y){const C=m[y.type];let N;if(C){const P=di[C];N=HM.clone(P.uniforms)}else N=y.uniforms;return N}function x(y,C){let N=f.get(C);return N!==void 0?++N.usedTimes:(N=new Sb(t,C,y,r),c.push(N),f.set(C,N)),N}function w(y){if(--y.usedTimes===0){const C=c.indexOf(y);c[C]=c[c.length-1],c.pop(),f.delete(y.cacheKey),y.destroy()}}function b(y){o.remove(y)}function A(){o.dispose()}return{getParameters:E,getProgramCacheKey:v,getUniforms:M,acquireProgram:x,releaseProgram:w,releaseShaderCache:b,programs:c,dispose:A}}function bb(){let t=new WeakMap;function e(a){return t.has(a)}function n(a){let o=t.get(a);return o===void 0&&(o={},t.set(a,o)),o}function i(a){t.delete(a)}function r(a,o,l){t.get(a)[o]=l}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:r,dispose:s}}function Ab(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.materialVariant!==e.materialVariant?t.materialVariant-e.materialVariant:t.z!==e.z?t.z-e.z:t.id-e.id}function Xm(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function $m(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function a(d){let m=0;return d.isInstancedMesh&&(m+=2),d.isSkinnedMesh&&(m+=1),m}function o(d,m,_,E,v,h){let g=t[e];return g===void 0?(g={id:d.id,object:d,geometry:m,material:_,materialVariant:a(d),groupOrder:E,renderOrder:d.renderOrder,z:v,group:h},t[e]=g):(g.id=d.id,g.object=d,g.geometry=m,g.material=_,g.materialVariant=a(d),g.groupOrder=E,g.renderOrder=d.renderOrder,g.z=v,g.group=h),e++,g}function l(d,m,_,E,v,h,g){g.reversedDepth===!0&&(v=-v);const M=o(d,m,_,E,v,h);_.transmission>0?i.push(M):_.transparent===!0?r.push(M):n.push(M)}function c(d,m,_,E,v,h){const g=o(d,m,_,E,v,h);_.transmission>0?i.unshift(g):_.transparent===!0?r.unshift(g):n.unshift(g)}function f(d,m){n.length>1&&n.sort(d||Ab),i.length>1&&i.sort(m||Xm),r.length>1&&r.sort(m||Xm)}function p(){for(let d=e,m=t.length;d<m;d++){const _=t[d];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:l,unshift:c,finish:p,sort:f}}function Cb(){let t=new WeakMap;function e(i,r){const s=t.get(i);let a;return s===void 0?(a=new $m,t.set(i,[a])):r>=s.length?(a=new $m,s.push(a)):a=s[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}function Rb(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"SunLight":case"DirectionalLight":n={direction:new G,color:new Ke};break;case"SpotLight":n={position:new G,direction:new G,color:new Ke,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new G,color:new Ke,distance:0,decay:0};break;case"HemisphereLight":n={direction:new G,skyColor:new Ke,groundColor:new Ke};break;case"RectAreaLight":n={color:new Ke,position:new G,halfWidth:new G,halfHeight:new G};break}return t[e.id]=n,n}}}function Pb(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"SunLight":case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let Nb=0;function Lb(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function Db(t){const e=new Rb,n=Pb(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new G);const r=new G,s=new Tt,a=new Tt;function o(c){let f=0,p=0,d=0;for(let H=0;H<9;H++)i.probe[H].set(0,0,0);let m=0,_=0,E=0,v=0,h=0,g=0,M=0,x=0,w=0,b=0,A=0,y=0,C=0,N=0;c.sort(Lb);for(let H=0,W=c.length;H<W;H++){const L=c[H],j=L.color,I=L.intensity,U=L.distance;let k=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===Wr?k=L.shadow.map.texture:k=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)f+=j.r*I,p+=j.g*I,d+=j.b*I;else if(L.isLightProbe){for(let z=0;z<9;z++)i.probe[z].addScaledVector(L.sh.coefficients[z],I);N++}else if(L.isSunLight){const z=e.get(L);if(z.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const D=L.shadow,Y=n.get(L);Y.shadowIntensity=D.intensity,Y.shadowBias=D.bias,Y.shadowNormalBias=D.normalBias,Y.shadowRadius=D.radius,Y.shadowMapSize.copy(D.mapSize).multiply(D.getFrameExtents()),i.sunShadow[_]=Y,i.sunShadowMap[_]=k;const oe=D.getViewportCount();for(let ge=0;ge<oe;ge++)i.sunShadowMatrix[E+ge]=D.getMatrix(ge),i.sunShadowCascade[E+ge]=D._cascadeData[ge];E+=oe,_++}i.sun[m]=z,m++}else if(L.isDirectionalLight){const z=e.get(L);if(z.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const D=L.shadow,Y=n.get(L);Y.shadowIntensity=D.intensity,Y.shadowBias=D.bias,Y.shadowNormalBias=D.normalBias,Y.shadowRadius=D.radius,Y.shadowMapSize=D.mapSize,i.directionalShadow[v]=Y,i.directionalShadowMap[v]=k,i.directionalShadowMatrix[v]=L.shadow.matrix,w++}i.directional[v]=z,v++}else if(L.isSpotLight){const z=e.get(L);z.position.setFromMatrixPosition(L.matrixWorld),z.color.copy(j).multiplyScalar(I),z.distance=U,z.coneCos=Math.cos(L.angle),z.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),z.decay=L.decay,i.spot[g]=z;const D=L.shadow;if(L.map&&(i.spotLightMap[y]=L.map,y++,D.updateMatrices(L),L.castShadow&&C++),i.spotLightMatrix[g]=D.matrix,L.castShadow){const Y=n.get(L);Y.shadowIntensity=D.intensity,Y.shadowBias=D.bias,Y.shadowNormalBias=D.normalBias,Y.shadowRadius=D.radius,Y.shadowMapSize=D.mapSize,i.spotShadow[g]=Y,i.spotShadowMap[g]=k,A++}g++}else if(L.isRectAreaLight){const z=e.get(L);z.color.copy(j).multiplyScalar(I),z.halfWidth.set(L.width*.5,0,0),z.halfHeight.set(0,L.height*.5,0),i.rectArea[M]=z,M++}else if(L.isPointLight){const z=e.get(L);if(z.color.copy(L.color).multiplyScalar(L.intensity),z.distance=L.distance,z.decay=L.decay,L.castShadow){const D=L.shadow,Y=n.get(L);Y.shadowIntensity=D.intensity,Y.shadowBias=D.bias,Y.shadowNormalBias=D.normalBias,Y.shadowRadius=D.radius,Y.shadowMapSize=D.mapSize,Y.shadowCameraNear=D.camera.near,Y.shadowCameraFar=D.camera.far,i.pointShadow[h]=Y,i.pointShadowMap[h]=k,i.pointShadowMatrix[h]=L.shadow.matrix,b++}i.point[h]=z,h++}else if(L.isHemisphereLight){const z=e.get(L);z.skyColor.copy(L.color).multiplyScalar(I),z.groundColor.copy(L.groundColor).multiplyScalar(I),i.hemi[x]=z,x++}}M>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=pe.LTC_FLOAT_1,i.rectAreaLTC2=pe.LTC_FLOAT_2):(i.rectAreaLTC1=pe.LTC_HALF_1,i.rectAreaLTC2=pe.LTC_HALF_2)),i.ambient[0]=f,i.ambient[1]=p,i.ambient[2]=d;const P=i.hash;(P.sunLength!==m||P.directionalLength!==v||P.pointLength!==h||P.spotLength!==g||P.rectAreaLength!==M||P.hemiLength!==x||P.numSunShadows!==_||P.numDirectionalShadows!==w||P.numPointShadows!==b||P.numSpotShadows!==A||P.numSpotMaps!==y||P.numLightProbes!==N)&&(i.sun.length=m,i.directional.length=v,i.spot.length=g,i.rectArea.length=M,i.point.length=h,i.hemi.length=x,i.sunShadow.length=_,i.sunShadowMap.length=_,i.sunShadowMatrix.length=E,i.sunShadowCascade.length=E,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.directionalShadowMatrix.length=w,i.pointShadow.length=b,i.pointShadowMap.length=b,i.pointShadowMatrix.length=b,i.spotShadow.length=A,i.spotShadowMap.length=A,i.spotLightMatrix.length=A+y-C,i.spotLightMap.length=y,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=N,P.sunLength=m,P.directionalLength=v,P.pointLength=h,P.spotLength=g,P.rectAreaLength=M,P.hemiLength=x,P.numSunShadows=_,P.numDirectionalShadows=w,P.numPointShadows=b,P.numSpotShadows=A,P.numSpotMaps=y,P.numLightProbes=N,i.version=Nb++)}function l(c,f){let p=0,d=0,m=0,_=0,E=0,v=0;const h=f.matrixWorldInverse;for(let g=0,M=c.length;g<M;g++){const x=c[g];if(x.isSunLight){const w=i.sun[p];w.direction.setFromMatrixPosition(x.matrixWorld),w.direction.transformDirection(h),p++}else if(x.isDirectionalLight){const w=i.directional[d];w.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(h),d++}else if(x.isSpotLight){const w=i.spot[_];w.position.setFromMatrixPosition(x.matrixWorld),w.position.applyMatrix4(h),w.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(h),_++}else if(x.isRectAreaLight){const w=i.rectArea[E];w.position.setFromMatrixPosition(x.matrixWorld),w.position.applyMatrix4(h),a.identity(),s.copy(x.matrixWorld),s.premultiply(h),a.extractRotation(s),w.halfWidth.set(x.width*.5,0,0),w.halfHeight.set(0,x.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),E++}else if(x.isPointLight){const w=i.point[m];w.position.setFromMatrixPosition(x.matrixWorld),w.position.applyMatrix4(h),m++}else if(x.isHemisphereLight){const w=i.hemi[v];w.direction.setFromMatrixPosition(x.matrixWorld),w.direction.transformDirection(h),v++}}}return{setup:o,setupView:l,state:i}}function Ym(t){const e=new Db(t),n=[],i=[],r=[];function s(d){p.camera=d,n.length=0,i.length=0,r.length=0}function a(d){n.push(d)}function o(d){i.push(d)}function l(d){r.push(d)}function c(){e.setup(n)}function f(d){e.setupView(n,d)}const p={lightsArray:n,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:p,setupLights:c,setupLightsView:f,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function Ib(t){let e=new WeakMap;function n(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new Ym(t),e.set(r,[o])):s>=a.length?(o=new Ym(t),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:n,dispose:i}}const Ub=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Fb=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Ob=[new G(1,0,0),new G(-1,0,0),new G(0,1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1)],kb=[new G(0,-1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1),new G(0,-1,0),new G(0,-1,0)],qm=new Tt,da=new G,bu=new G;function Bb(t,e,n){let i=new _f;const r=new Oe,s=new Oe,a=new Et,o=new XM,l=new $M,c={},f=n.maxTextureSize,p={[Gr]:Mn,[Mn]:Gr,[Ni]:Ni},d=new yi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Oe},radius:{value:4}},vertexShader:Ub,fragmentShader:Fb}),m=d.clone();m.defines.HORIZONTAL_PASS=1;const _=new jn;_.setAttribute("position",new ki(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const E=new Si(_,d),v=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=pl;let h=this.type;this.render=function(b,A,y){if(v.enabled===!1||v.autoUpdate===!1&&v.needsUpdate===!1||b.length===0)return;this.type===my&&(Le("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=pl);const C=t.getRenderTarget(),N=t.getActiveCubeFace(),P=t.getActiveMipmapLevel(),H=t.state;H.setBlending(Fi),H.buffers.depth.getReversed()===!0?H.buffers.color.setClear(0,0,0,0):H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const W=h!==this.type;W&&A.traverse(function(L){L.material&&(Array.isArray(L.material)?L.material.forEach(j=>j.needsUpdate=!0):L.material.needsUpdate=!0)});for(let L=0,j=b.length;L<j;L++){const I=b[L],U=I.shadow;if(U===void 0){Le("WebGLShadowMap:",I,"has no shadow.");continue}if(U.autoUpdate===!1&&U.needsUpdate===!1)continue;r.copy(U.mapSize);const k=U.getFrameExtents();r.multiply(k),s.copy(U.mapSize),(r.x>f||r.y>f)&&(r.x>f&&(s.x=Math.floor(f/k.x),r.x=s.x*k.x,U.mapSize.x=s.x),r.y>f&&(s.y=Math.floor(f/k.y),r.y=s.y*k.y,U.mapSize.y=s.y));const z=t.state.buffers.depth.getReversed();if(U.camera._reversedDepth=z,U.map===null||W===!0){if(U.map!==null&&(U.map.depthTexture!==null&&(U.map.depthTexture.dispose(),U.map.depthTexture=null),U.map.dispose()),this.type===ga){if(I.isPointLight){Le("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}U.map=new ni(r.x,r.y,{format:Wr,type:xi,minFilter:rn,magFilter:rn,generateMipmaps:!1}),U.map.texture.name=I.name+".shadowMap",U.map.depthTexture=new Za(r.x,r.y,fi),U.map.depthTexture.name=I.name+".shadowMapDepth",U.map.depthTexture.format=Gi,U.map.depthTexture.compareFunction=null,U.map.depthTexture.minFilter=Xt,U.map.depthTexture.magFilter=Xt}else I.isPointLight?(U.map=new Qv(r.x),U.map.depthTexture=new kM(r.x,vi)):(U.map=new ni(r.x,r.y),U.map.depthTexture=new Za(r.x,r.y,vi)),U.map.depthTexture.name=I.name+".shadowMap",U.map.depthTexture.format=Gi,this.type===pl?(U.map.depthTexture.compareFunction=z?ff:hf,U.map.depthTexture.minFilter=rn,U.map.depthTexture.magFilter=rn):(U.map.depthTexture.compareFunction=null,U.map.depthTexture.minFilter=Xt,U.map.depthTexture.magFilter=Xt);U.camera.updateProjectionMatrix()}U.map.isWebGLCubeRenderTarget!==!0&&(U.map.width!==r.x||U.map.height!==r.y)&&U.map.setSize(r.x,r.y);const D=U.map.isWebGLCubeRenderTarget?6:U.getViewportCount();I.isPointLight!==!0&&U.updateMatrices(I,y);for(let Y=0;Y<D;Y++){const oe=U.getCamera(Y);if(I.isPointLight){const ge=U.camera,He=U.matrix,ke=I.distance||ge.far;ke!==ge.far&&(ge.far=ke,ge.updateProjectionMatrix()),da.setFromMatrixPosition(I.matrixWorld),ge.position.copy(da),bu.copy(ge.position),bu.add(Ob[Y]),ge.up.copy(kb[Y]),ge.lookAt(bu),ge.updateMatrixWorld(),He.makeTranslation(-da.x,-da.y,-da.z),qm.multiplyMatrices(ge.projectionMatrix,ge.matrixWorldInverse),U._frustum.setFromProjectionMatrix(qm,ge.coordinateSystem,ge.reversedDepth)}if(U.map.isWebGLCubeRenderTarget)t.setRenderTarget(U.map,Y),t.clear();else{Y===0&&(t.setRenderTarget(U.map),t.clear());const ge=U.getViewport(Y);a.set(s.x*ge.x,s.y*ge.y,s.x*ge.z,s.y*ge.w),H.viewport(a)}i=U.getFrustum(Y),x(A,y,oe,I,this.type)}U.isPointLightShadow!==!0&&this.type===ga&&g(U,y),U.needsUpdate=!1}h=this.type,v.needsUpdate=!1,t.setRenderTarget(C,N,P)};function g(b,A){const y=e.update(E);d.defines.VSM_SAMPLES!==b.blurSamples&&(d.defines.VSM_SAMPLES=b.blurSamples,m.defines.VSM_SAMPLES=b.blurSamples,d.needsUpdate=!0,m.needsUpdate=!0),b.mapPass===null?b.mapPass=new ni(r.x,r.y,{format:Wr,type:xi}):(b.mapPass.width!==b.map.width||b.mapPass.height!==b.map.height)&&b.mapPass.setSize(b.map.width,b.map.height),d.uniforms.shadow_pass.value=b.map.depthTexture,d.uniforms.resolution.value.set(b.map.width,b.map.height),d.uniforms.radius.value=b.radius,t.setRenderTarget(b.mapPass),t.clear(),t.renderBufferDirect(A,null,y,d,E,null),m.uniforms.shadow_pass.value=b.mapPass.texture,m.uniforms.resolution.value.set(b.map.width,b.map.height),m.uniforms.radius.value=b.radius,t.setRenderTarget(b.map),t.clear(),t.renderBufferDirect(A,null,y,m,E,null)}function M(b,A,y,C){let N=null;const P=y.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(P!==void 0)N=P;else if(N=y.isPointLight===!0?l:o,t.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const H=N.uuid,W=A.uuid;let L=c[H];L===void 0&&(L={},c[H]=L);let j=L[W];j===void 0&&(j=N.clone(),L[W]=j,A.addEventListener("dispose",w)),N=j}if(N.visible=A.visible,N.wireframe=A.wireframe,C===ga?N.side=A.shadowSide!==null?A.shadowSide:A.side:N.side=A.shadowSide!==null?A.shadowSide:p[A.side],N.alphaMap=A.alphaMap,N.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,N.map=A.map,N.clipShadows=A.clipShadows,N.clippingPlanes=A.clippingPlanes,N.clipIntersection=A.clipIntersection,N.displacementMap=A.displacementMap,N.displacementScale=A.displacementScale,N.displacementBias=A.displacementBias,N.wireframeLinewidth=A.wireframeLinewidth,N.linewidth=A.linewidth,y.isPointLight===!0&&N.isMeshDistanceMaterial===!0){const H=t.properties.get(N);H.light=y}return N}function x(b,A,y,C,N){if(b.visible===!1)return;if(b.layers.test(A.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&N===ga)&&(!b.frustumCulled||b.intersectsFrustum(i))){b.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,b.matrixWorld);const W=e.update(b),L=b.material;if(Array.isArray(L)){const j=W.groups;for(let I=0,U=j.length;I<U;I++){const k=j[I],z=L[k.materialIndex];if(z&&z.visible){const D=M(b,z,C,N);b.onBeforeShadow(t,b,A,y,W,D,k),t.renderBufferDirect(y,null,W,D,b,k),b.onAfterShadow(t,b,A,y,W,D,k)}}}else if(L.visible){const j=M(b,L,C,N);b.onBeforeShadow(t,b,A,y,W,j,null),t.renderBufferDirect(y,null,W,j,b,null),b.onAfterShadow(t,b,A,y,W,j,null)}}const H=b.children;for(let W=0,L=H.length;W<L;W++)x(H[W],A,y,C,N)}function w(b){b.target.removeEventListener("dispose",w);for(const y in c){const C=c[y],N=b.target.uuid;N in C&&(C[N].dispose(),delete C[N])}}}function zb(t,e){function n(){let O=!1;const de=new Et;let ee=null;const he=new Et(0,0,0,0);return{setMask:function(ve){ee!==ve&&!O&&(t.colorMask(ve,ve,ve,ve),ee=ve)},setLocked:function(ve){O=ve},setClear:function(ve,re,Pe,be,ft){ft===!0&&(ve*=be,re*=be,Pe*=be),de.set(ve,re,Pe,be),he.equals(de)===!1&&(t.clearColor(ve,re,Pe,be),he.copy(de))},reset:function(){O=!1,ee=null,he.set(-1,0,0,0)}}}function i(){let O=!1,de=!1,ee=null,he=null,ve=null;return{setReversed:function(re){if(de!==re){const Pe=e.get("EXT_clip_control");re?Pe.clipControlEXT(Pe.LOWER_LEFT_EXT,Pe.ZERO_TO_ONE_EXT):Pe.clipControlEXT(Pe.LOWER_LEFT_EXT,Pe.NEGATIVE_ONE_TO_ONE_EXT),de=re;const be=ve;ve=null,this.setClear(be)}},getReversed:function(){return de},setTest:function(re){re?ne(t.DEPTH_TEST):Se(t.DEPTH_TEST)},setMask:function(re){ee!==re&&!O&&(t.depthMask(re),ee=re)},setFunc:function(re){if(de&&(re=Ky[re]),he!==re){switch(re){case yd:t.depthFunc(t.NEVER);break;case Md:t.depthFunc(t.ALWAYS);break;case Ed:t.depthFunc(t.LESS);break;case Xa:t.depthFunc(t.LEQUAL);break;case wd:t.depthFunc(t.EQUAL);break;case Td:t.depthFunc(t.GEQUAL);break;case bd:t.depthFunc(t.GREATER);break;case Ad:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}he=re}},setLocked:function(re){O=re},setClear:function(re){ve!==re&&(ve=re,de&&(re=1-re),t.clearDepth(re))},reset:function(){O=!1,ee=null,he=null,ve=null,de=!1}}}function r(){let O=!1,de=null,ee=null,he=null,ve=null,re=null,Pe=null,be=null,ft=null;return{setTest:function(rt){O||(rt?ne(t.STENCIL_TEST):Se(t.STENCIL_TEST))},setMask:function(rt){de!==rt&&!O&&(t.stencilMask(rt),de=rt)},setFunc:function(rt,Wn,ri){(ee!==rt||he!==Wn||ve!==ri)&&(t.stencilFunc(rt,Wn,ri),ee=rt,he=Wn,ve=ri)},setOp:function(rt,Wn,ri){(re!==rt||Pe!==Wn||be!==ri)&&(t.stencilOp(rt,Wn,ri),re=rt,Pe=Wn,be=ri)},setLocked:function(rt){O=rt},setClear:function(rt){ft!==rt&&(t.clearStencil(rt),ft=rt)},reset:function(){O=!1,de=null,ee=null,he=null,ve=null,re=null,Pe=null,be=null,ft=null}}}const s=new n,a=new i,o=new r,l=new WeakMap,c=new WeakMap;let f={},p={},d={},m=new WeakMap,_=[],E=null,v=!1,h=null,g=null,M=null,x=null,w=null,b=null,A=null,y=new Ke(0,0,0),C=0,N=!1,P=null,H=null,W=null,L=null,j=null;const I=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let U=!1,k=0;const z=t.getParameter(t.VERSION);z.indexOf("WebGL")!==-1?(k=parseFloat(/^WebGL (\d)/.exec(z)[1]),U=k>=1):z.indexOf("OpenGL ES")!==-1&&(k=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),U=k>=2);let D=null,Y={};const oe=t.getParameter(t.SCISSOR_BOX),ge=t.getParameter(t.VIEWPORT),He=new Et().fromArray(oe),ke=new Et().fromArray(ge);function Ie(O,de,ee,he){const ve=new Uint8Array(4),re=t.createTexture();t.bindTexture(O,re),t.texParameteri(O,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(O,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let Pe=0;Pe<ee;Pe++)O===t.TEXTURE_3D||O===t.TEXTURE_2D_ARRAY?t.texImage3D(de,0,t.RGBA,1,1,he,0,t.RGBA,t.UNSIGNED_BYTE,ve):t.texImage2D(de+Pe,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,ve);return re}const Z={};Z[t.TEXTURE_2D]=Ie(t.TEXTURE_2D,t.TEXTURE_2D,1),Z[t.TEXTURE_CUBE_MAP]=Ie(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),Z[t.TEXTURE_2D_ARRAY]=Ie(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),Z[t.TEXTURE_3D]=Ie(t.TEXTURE_3D,t.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ne(t.DEPTH_TEST),a.setFunc(Xa),qe(!1),xt(Yp),ne(t.CULL_FACE),tt(Fi);function ne(O){f[O]!==!0&&(t.enable(O),f[O]=!0)}function Se(O){f[O]!==!1&&(t.disable(O),f[O]=!1)}function Ue(O,de){return d[O]!==de?(t.bindFramebuffer(O,de),d[O]=de,O===t.DRAW_FRAMEBUFFER&&(d[t.FRAMEBUFFER]=de),O===t.FRAMEBUFFER&&(d[t.DRAW_FRAMEBUFFER]=de),!0):!1}function ye(O,de){let ee=_,he=!1;if(O){ee=m.get(de),ee===void 0&&(ee=[],m.set(de,ee));const ve=O.textures;if(ee.length!==ve.length||ee[0]!==t.COLOR_ATTACHMENT0){for(let re=0,Pe=ve.length;re<Pe;re++)ee[re]=t.COLOR_ATTACHMENT0+re;ee.length=ve.length,he=!0}}else ee[0]!==t.BACK&&(ee[0]=t.BACK,he=!0);he&&t.drawBuffers(ee)}function je(O){return E!==O?(t.useProgram(O),E=O,!0):!1}const It={[us]:t.FUNC_ADD,[_y]:t.FUNC_SUBTRACT,[vy]:t.FUNC_REVERSE_SUBTRACT};It[xy]=t.MIN,It[Sy]=t.MAX;const Xe={[yy]:t.ZERO,[My]:t.ONE,[Ey]:t.SRC_COLOR,[vv]:t.SRC_ALPHA,[Ry]:t.SRC_ALPHA_SATURATE,[Ay]:t.DST_COLOR,[Ty]:t.DST_ALPHA,[wy]:t.ONE_MINUS_SRC_COLOR,[xv]:t.ONE_MINUS_SRC_ALPHA,[Cy]:t.ONE_MINUS_DST_COLOR,[by]:t.ONE_MINUS_DST_ALPHA,[Py]:t.CONSTANT_COLOR,[Ny]:t.ONE_MINUS_CONSTANT_COLOR,[Ly]:t.CONSTANT_ALPHA,[Dy]:t.ONE_MINUS_CONSTANT_ALPHA};function tt(O,de,ee,he,ve,re,Pe,be,ft,rt){if(O===Fi){v===!0&&(Se(t.BLEND),v=!1);return}if(v===!1&&(ne(t.BLEND),v=!0),O!==gy){if(O!==h||rt!==N){if((g!==us||w!==us)&&(t.blendEquation(t.FUNC_ADD),g=us,w=us),rt)switch(O){case Aa:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case qp:t.blendFunc(t.ONE,t.ONE);break;case Kp:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Zp:t.blendFuncSeparate(t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE);break;default:it("WebGLState: Invalid blending: ",O);break}else switch(O){case Aa:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case qp:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE,t.ONE,t.ONE);break;case Kp:it("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Zp:it("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:it("WebGLState: Invalid blending: ",O);break}M=null,x=null,b=null,A=null,y.set(0,0,0),C=0,h=O,N=rt}return}ve=ve||de,re=re||ee,Pe=Pe||he,(de!==g||ve!==w)&&(t.blendEquationSeparate(It[de],It[ve]),g=de,w=ve),(ee!==M||he!==x||re!==b||Pe!==A)&&(t.blendFuncSeparate(Xe[ee],Xe[he],Xe[re],Xe[Pe]),M=ee,x=he,b=re,A=Pe),(be.equals(y)===!1||ft!==C)&&(t.blendColor(be.r,be.g,be.b,ft),y.copy(be),C=ft),h=O,N=!1}function ht(O,de){O.side===Ni?Se(t.CULL_FACE):ne(t.CULL_FACE);let ee=O.side===Mn;de&&(ee=!ee),qe(ee),O.blending===Aa&&O.transparent===!1?tt(Fi):tt(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),a.setFunc(O.depthFunc),a.setTest(O.depthTest),a.setMask(O.depthWrite),s.setMask(O.colorWrite);const he=O.stencilWrite;o.setTest(he),he&&(o.setMask(O.stencilWriteMask),o.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),o.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),pn(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?ne(t.SAMPLE_ALPHA_TO_COVERAGE):Se(t.SAMPLE_ALPHA_TO_COVERAGE)}function qe(O){P!==O&&(O?t.frontFace(t.CW):t.frontFace(t.CCW),P=O)}function xt(O){O!==fy?(ne(t.CULL_FACE),O!==H&&(O===Yp?t.cullFace(t.BACK):O===py?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):Se(t.CULL_FACE),H=O}function zt(O){O!==W&&(U&&t.lineWidth(O),W=O)}function pn(O,de,ee){O?(ne(t.POLYGON_OFFSET_FILL),(L!==de||j!==ee)&&(L=de,j=ee,a.getReversed()&&(de=-de),t.polygonOffset(de,ee))):Se(t.POLYGON_OFFSET_FILL)}function yt(O){O?ne(t.SCISSOR_TEST):Se(t.SCISSOR_TEST)}function Pt(O){O===void 0&&(O=t.TEXTURE0+I-1),D!==O&&(t.activeTexture(O),D=O)}function B(O,de,ee){ee===void 0&&(D===null?ee=t.TEXTURE0+I-1:ee=D);let he=Y[ee];he===void 0&&(he={type:void 0,texture:void 0},Y[ee]=he),(he.type!==O||he.texture!==de)&&(D!==ee&&(t.activeTexture(ee),D=ee),t.bindTexture(O,de||Z[O]),he.type=O,he.texture=de)}function qt(){const O=Y[D];O!==void 0&&O.type!==void 0&&(t.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function at(){try{t.compressedTexImage2D(...arguments)}catch(O){it("WebGLState:",O)}}function R(){try{t.compressedTexImage3D(...arguments)}catch(O){it("WebGLState:",O)}}function S(){try{t.texSubImage2D(...arguments)}catch(O){it("WebGLState:",O)}}function V(){try{t.texSubImage3D(...arguments)}catch(O){it("WebGLState:",O)}}function q(){try{t.compressedTexSubImage2D(...arguments)}catch(O){it("WebGLState:",O)}}function Q(){try{t.compressedTexSubImage3D(...arguments)}catch(O){it("WebGLState:",O)}}function ae(){try{t.texStorage2D(...arguments)}catch(O){it("WebGLState:",O)}}function le(){try{t.texStorage3D(...arguments)}catch(O){it("WebGLState:",O)}}function J(){try{t.texImage2D(...arguments)}catch(O){it("WebGLState:",O)}}function ie(){try{t.texImage3D(...arguments)}catch(O){it("WebGLState:",O)}}function ce(O){return p[O]!==void 0?p[O]:t.getParameter(O)}function Ce(O,de){p[O]!==de&&(t.pixelStorei(O,de),p[O]=de)}function fe(O){He.equals(O)===!1&&(t.scissor(O.x,O.y,O.z,O.w),He.copy(O))}function ue(O){ke.equals(O)===!1&&(t.viewport(O.x,O.y,O.z,O.w),ke.copy(O))}function Re(O,de){let ee=c.get(de);ee===void 0&&(ee=new WeakMap,c.set(de,ee));let he=ee.get(O);he===void 0&&(he=t.getUniformBlockIndex(de,O.name),ee.set(O,he))}function Ne(O,de){const he=c.get(de).get(O);l.get(de)!==he&&(t.uniformBlockBinding(de,he,O.__bindingPointIndex),l.set(de,he))}function ze(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),a.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),t.pixelStorei(t.PACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,t.BROWSER_DEFAULT_WEBGL),t.pixelStorei(t.PACK_ROW_LENGTH,0),t.pixelStorei(t.PACK_SKIP_PIXELS,0),t.pixelStorei(t.PACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_ROW_LENGTH,0),t.pixelStorei(t.UNPACK_IMAGE_HEIGHT,0),t.pixelStorei(t.UNPACK_SKIP_PIXELS,0),t.pixelStorei(t.UNPACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_SKIP_IMAGES,0),f={},p={},D=null,Y={},d={},m=new WeakMap,_=[],E=null,v=!1,h=null,g=null,M=null,x=null,w=null,b=null,A=null,y=new Ke(0,0,0),C=0,N=!1,P=null,H=null,W=null,L=null,j=null,He.set(0,0,t.canvas.width,t.canvas.height),ke.set(0,0,t.canvas.width,t.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:ne,disable:Se,bindFramebuffer:Ue,drawBuffers:ye,useProgram:je,setBlending:tt,setMaterial:ht,setFlipSided:qe,setCullFace:xt,setLineWidth:zt,setPolygonOffset:pn,setScissorTest:yt,activeTexture:Pt,bindTexture:B,unbindTexture:qt,compressedTexImage2D:at,compressedTexImage3D:R,texImage2D:J,texImage3D:ie,pixelStorei:Ce,getParameter:ce,updateUBOMapping:Re,uniformBlockBinding:Ne,texStorage2D:ae,texStorage3D:le,texSubImage2D:S,texSubImage3D:V,compressedTexSubImage2D:q,compressedTexSubImage3D:Q,scissor:fe,viewport:ue,reset:ze}}function Hb(t,e,n,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Oe,f=new WeakMap,p=new Set;let d;const m=new WeakMap;let _=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function E(R,S){return _?new OffscreenCanvas(R,S):ql("canvas")}function v(R,S,V){let q=1;const Q=at(R);if((Q.width>V||Q.height>V)&&(q=V/Math.max(Q.width,Q.height)),q<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const ae=Math.floor(q*Q.width),le=Math.floor(q*Q.height);d===void 0&&(d=E(ae,le));const J=S?E(ae,le):d;return J.width=ae,J.height=le,J.getContext("2d").drawImage(R,0,0,ae,le),Le("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+ae+"x"+le+")."),J}else return"data"in R&&Le("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),R;return R}function h(R){return R.generateMipmaps}function g(R){t.generateMipmap(R)}function M(R){return R.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?t.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function x(R,S,V,q,Q,ae=!1){if(R!==null){if(t[R]!==void 0)return t[R];Le("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let le;q&&(le=e.get("EXT_texture_norm16"),le||Le("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let J=S;if(S===t.RED&&(V===t.FLOAT&&(J=t.R32F),V===t.HALF_FLOAT&&(J=t.R16F),V===t.UNSIGNED_BYTE&&(J=t.R8),V===t.UNSIGNED_SHORT&&le&&(J=le.R16_EXT),V===t.SHORT&&le&&(J=le.R16_SNORM_EXT)),S===t.RED_INTEGER&&(V===t.UNSIGNED_BYTE&&(J=t.R8UI),V===t.UNSIGNED_SHORT&&(J=t.R16UI),V===t.UNSIGNED_INT&&(J=t.R32UI),V===t.BYTE&&(J=t.R8I),V===t.SHORT&&(J=t.R16I),V===t.INT&&(J=t.R32I)),S===t.RG&&(V===t.FLOAT&&(J=t.RG32F),V===t.HALF_FLOAT&&(J=t.RG16F),V===t.UNSIGNED_BYTE&&(J=t.RG8),V===t.UNSIGNED_SHORT&&le&&(J=le.RG16_EXT),V===t.SHORT&&le&&(J=le.RG16_SNORM_EXT)),S===t.RG_INTEGER&&(V===t.UNSIGNED_BYTE&&(J=t.RG8UI),V===t.UNSIGNED_SHORT&&(J=t.RG16UI),V===t.UNSIGNED_INT&&(J=t.RG32UI),V===t.BYTE&&(J=t.RG8I),V===t.SHORT&&(J=t.RG16I),V===t.INT&&(J=t.RG32I)),S===t.RGB_INTEGER&&(V===t.UNSIGNED_BYTE&&(J=t.RGB8UI),V===t.UNSIGNED_SHORT&&(J=t.RGB16UI),V===t.UNSIGNED_INT&&(J=t.RGB32UI),V===t.BYTE&&(J=t.RGB8I),V===t.SHORT&&(J=t.RGB16I),V===t.INT&&(J=t.RGB32I)),S===t.RGBA_INTEGER&&(V===t.UNSIGNED_BYTE&&(J=t.RGBA8UI),V===t.UNSIGNED_SHORT&&(J=t.RGBA16UI),V===t.UNSIGNED_INT&&(J=t.RGBA32UI),V===t.BYTE&&(J=t.RGBA8I),V===t.SHORT&&(J=t.RGBA16I),V===t.INT&&(J=t.RGBA32I)),S===t.RGB&&(V===t.UNSIGNED_SHORT&&le&&(J=le.RGB16_EXT),V===t.SHORT&&le&&(J=le.RGB16_SNORM_EXT),V===t.UNSIGNED_INT_5_9_9_9_REV&&(J=t.RGB9_E5),V===t.UNSIGNED_INT_10F_11F_11F_REV&&(J=t.R11F_G11F_B10F)),S===t.RGBA){const ie=ae?Yl:Ze.getTransfer(Q);V===t.FLOAT&&(J=t.RGBA32F),V===t.HALF_FLOAT&&(J=t.RGBA16F),V===t.UNSIGNED_BYTE&&(J=ie===ot?t.SRGB8_ALPHA8:t.RGBA8),V===t.UNSIGNED_SHORT&&le&&(J=le.RGBA16_EXT),V===t.SHORT&&le&&(J=le.RGBA16_SNORM_EXT),V===t.UNSIGNED_SHORT_4_4_4_4&&(J=t.RGBA4),V===t.UNSIGNED_SHORT_5_5_5_1&&(J=t.RGB5_A1)}return(J===t.R16F||J===t.R32F||J===t.RG16F||J===t.RG32F||J===t.RGBA16F||J===t.RGBA32F)&&e.get("EXT_color_buffer_float"),J}function w(R,S){let V;return R?S===null||S===vi||S===Ya?V=t.DEPTH24_STENCIL8:S===fi?V=t.DEPTH32F_STENCIL8:S===$a&&(V=t.DEPTH24_STENCIL8,Le("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===vi||S===Ya?V=t.DEPTH_COMPONENT24:S===fi?V=t.DEPTH_COMPONENT32F:S===$a&&(V=t.DEPTH_COMPONENT16),V}function b(R,S){return h(R)===!0||R.isFramebufferTexture&&R.minFilter!==Xt&&R.minFilter!==rn?Math.log2(Math.max(S.width,S.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?S.mipmaps.length:1}function A(R){const S=R.target;S.removeEventListener("dispose",A),C(S),S.isVideoTexture&&f.delete(S),S.isHTMLTexture&&p.delete(S)}function y(R){const S=R.target;S.removeEventListener("dispose",y),P(S)}function C(R){const S=i.get(R);if(S.__webglInit===void 0)return;const V=R.source,q=m.get(V);if(q){const Q=q[S.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&N(R),Object.keys(q).length===0&&m.delete(V)}i.remove(R)}function N(R){const S=i.get(R);t.deleteTexture(S.__webglTexture);const V=R.source,q=m.get(V);delete q[S.__cacheKey],a.memory.textures--}function P(R){const S=i.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),i.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(S.__webglFramebuffer[q]))for(let Q=0;Q<S.__webglFramebuffer[q].length;Q++)t.deleteFramebuffer(S.__webglFramebuffer[q][Q]);else t.deleteFramebuffer(S.__webglFramebuffer[q]);S.__webglDepthbuffer&&t.deleteRenderbuffer(S.__webglDepthbuffer[q])}else{if(Array.isArray(S.__webglFramebuffer))for(let q=0;q<S.__webglFramebuffer.length;q++)t.deleteFramebuffer(S.__webglFramebuffer[q]);else t.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&t.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&t.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let q=0;q<S.__webglColorRenderbuffer.length;q++)S.__webglColorRenderbuffer[q]&&t.deleteRenderbuffer(S.__webglColorRenderbuffer[q]);S.__webglDepthRenderbuffer&&t.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const V=R.textures;for(let q=0,Q=V.length;q<Q;q++){const ae=i.get(V[q]);ae.__webglTexture&&(t.deleteTexture(ae.__webglTexture),a.memory.textures--),i.remove(V[q])}i.remove(R)}let H=0;function W(){H=0}function L(){return H}function j(R){H=R}function I(){const R=H;return R>=r.maxTextures&&Le("WebGLTextures: Trying to use "+(R+1)+" texture units while this GPU supports only "+r.maxTextures),H+=1,R}function U(R){const S=[];return S.push(R.wrapS),S.push(R.wrapT),S.push(R.wrapR||0),S.push(R.magFilter),S.push(R.minFilter),S.push(R.anisotropy),S.push(R.internalFormat),S.push(R.format),S.push(R.type),S.push(R.generateMipmaps),S.push(R.premultiplyAlpha),S.push(R.flipY),S.push(R.unpackAlignment),S.push(R.colorSpace),S.join()}function k(R,S){const V=i.get(R);if(R.isVideoTexture&&B(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&V.__version!==R.version){const q=R.image;if(q===null)Le("WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)Le("WebGLRenderer: Texture marked for update but image is incomplete");else{Se(V,R,S);return}}else R.isExternalTexture&&(V.__webglTexture=R.sourceTexture?R.sourceTexture:null);n.bindTexture(t.TEXTURE_2D,V.__webglTexture,t.TEXTURE0+S)}function z(R,S){const V=i.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&V.__version!==R.version){Se(V,R,S);return}else R.isExternalTexture&&(V.__webglTexture=R.sourceTexture?R.sourceTexture:null);n.bindTexture(t.TEXTURE_2D_ARRAY,V.__webglTexture,t.TEXTURE0+S)}function D(R,S){const V=i.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&V.__version!==R.version){Se(V,R,S);return}n.bindTexture(t.TEXTURE_3D,V.__webglTexture,t.TEXTURE0+S)}function Y(R,S){const V=i.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&V.__version!==R.version){Ue(V,R,S);return}n.bindTexture(t.TEXTURE_CUBE_MAP,V.__webglTexture,t.TEXTURE0+S)}const oe={[Cd]:t.REPEAT,[Ii]:t.CLAMP_TO_EDGE,[Rd]:t.MIRRORED_REPEAT},ge={[Xt]:t.NEAREST,[Fy]:t.NEAREST_MIPMAP_NEAREST,[bo]:t.NEAREST_MIPMAP_LINEAR,[rn]:t.LINEAR,[Kc]:t.LINEAR_MIPMAP_NEAREST,[Ir]:t.LINEAR_MIPMAP_LINEAR},He={[zy]:t.NEVER,[Wy]:t.ALWAYS,[Hy]:t.LESS,[hf]:t.LEQUAL,[Vy]:t.EQUAL,[ff]:t.GEQUAL,[Gy]:t.GREATER,[jy]:t.NOTEQUAL};function ke(R,S){if(S.type===fi&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===rn||S.magFilter===Kc||S.magFilter===bo||S.magFilter===Ir||S.minFilter===rn||S.minFilter===Kc||S.minFilter===bo||S.minFilter===Ir)&&Le("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(R,t.TEXTURE_WRAP_S,oe[S.wrapS]),t.texParameteri(R,t.TEXTURE_WRAP_T,oe[S.wrapT]),(R===t.TEXTURE_3D||R===t.TEXTURE_2D_ARRAY)&&t.texParameteri(R,t.TEXTURE_WRAP_R,oe[S.wrapR]),t.texParameteri(R,t.TEXTURE_MAG_FILTER,ge[S.magFilter]),t.texParameteri(R,t.TEXTURE_MIN_FILTER,ge[S.minFilter]),S.compareFunction&&(t.texParameteri(R,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(R,t.TEXTURE_COMPARE_FUNC,He[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Xt||S.minFilter!==bo&&S.minFilter!==Ir||S.type===fi&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||i.get(S).__currentAnisotropy){const V=e.get("EXT_texture_filter_anisotropic");t.texParameterf(R,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,r.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy}}}function Ie(R,S){let V=!1;R.__webglInit===void 0&&(R.__webglInit=!0,S.addEventListener("dispose",A));const q=S.source;let Q=m.get(q);Q===void 0&&(Q={},m.set(q,Q));const ae=U(S);if(ae!==R.__cacheKey){Q[ae]===void 0&&(Q[ae]={texture:t.createTexture(),usedTimes:0},a.memory.textures++,V=!0),Q[ae].usedTimes++;const le=Q[R.__cacheKey];le!==void 0&&(Q[R.__cacheKey].usedTimes--,le.usedTimes===0&&N(S)),R.__cacheKey=ae,R.__webglTexture=Q[ae].texture}return V}function Z(R,S,V){return Math.floor(Math.floor(R/V)/S)}function ne(R,S,V,q){const ae=R.updateRanges;if(ae.length===0)n.texSubImage2D(t.TEXTURE_2D,0,0,0,S.width,S.height,V,q,S.data);else{ae.sort((Ce,fe)=>Ce.start-fe.start);let le=0;for(let Ce=1;Ce<ae.length;Ce++){const fe=ae[le],ue=ae[Ce],Re=fe.start+fe.count,Ne=Z(ue.start,S.width,4),ze=Z(fe.start,S.width,4);ue.start<=Re+1&&Ne===ze&&Z(ue.start+ue.count-1,S.width,4)===Ne?fe.count=Math.max(fe.count,ue.start+ue.count-fe.start):(++le,ae[le]=ue)}ae.length=le+1;const J=n.getParameter(t.UNPACK_ROW_LENGTH),ie=n.getParameter(t.UNPACK_SKIP_PIXELS),ce=n.getParameter(t.UNPACK_SKIP_ROWS);n.pixelStorei(t.UNPACK_ROW_LENGTH,S.width);for(let Ce=0,fe=ae.length;Ce<fe;Ce++){const ue=ae[Ce],Re=Math.floor(ue.start/4),Ne=Math.ceil(ue.count/4),ze=Re%S.width,O=Math.floor(Re/S.width),de=Ne,ee=1;n.pixelStorei(t.UNPACK_SKIP_PIXELS,ze),n.pixelStorei(t.UNPACK_SKIP_ROWS,O),n.texSubImage2D(t.TEXTURE_2D,0,ze,O,de,ee,V,q,S.data)}R.clearUpdateRanges(),n.pixelStorei(t.UNPACK_ROW_LENGTH,J),n.pixelStorei(t.UNPACK_SKIP_PIXELS,ie),n.pixelStorei(t.UNPACK_SKIP_ROWS,ce)}}function Se(R,S,V){let q=t.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(q=t.TEXTURE_2D_ARRAY),S.isData3DTexture&&(q=t.TEXTURE_3D);const Q=Ie(R,S),ae=S.source;n.bindTexture(q,R.__webglTexture,t.TEXTURE0+V);const le=i.get(ae);if(ae.version!==le.__version||Q===!0){if(n.activeTexture(t.TEXTURE0+V),(typeof ImageBitmap<"u"&&S.image instanceof ImageBitmap)===!1){const ee=Ze.getPrimaries(Ze.workingColorSpace),he=S.colorSpace===rr?null:Ze.getPrimaries(S.colorSpace),ve=S.colorSpace===rr||ee===he?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve)}n.pixelStorei(t.UNPACK_ALIGNMENT,S.unpackAlignment);let ie=v(S.image,!1,r.maxTextureSize);ie=qt(S,ie);const ce=s.convert(S.format,S.colorSpace),Ce=s.convert(S.type);let fe=x(S.internalFormat,ce,Ce,S.normalized,S.colorSpace,S.isVideoTexture);ke(q,S);let ue;const Re=S.mipmaps,Ne=S.isVideoTexture!==!0,ze=le.__version===void 0||Q===!0,O=ae.dataReady,de=b(S,ie);if(S.isDepthTexture)fe=w(S.format===Ur,S.type),ze&&(Ne?n.texStorage2D(t.TEXTURE_2D,1,fe,ie.width,ie.height):n.texImage2D(t.TEXTURE_2D,0,fe,ie.width,ie.height,0,ce,Ce,null));else if(S.isDataTexture)if(Re.length>0){Ne&&ze&&n.texStorage2D(t.TEXTURE_2D,de,fe,Re[0].width,Re[0].height);for(let ee=0,he=Re.length;ee<he;ee++)ue=Re[ee],Ne?O&&n.texSubImage2D(t.TEXTURE_2D,ee,0,0,ue.width,ue.height,ce,Ce,ue.data):n.texImage2D(t.TEXTURE_2D,ee,fe,ue.width,ue.height,0,ce,Ce,ue.data);S.generateMipmaps=!1}else Ne?(ze&&n.texStorage2D(t.TEXTURE_2D,de,fe,ie.width,ie.height),O&&ne(S,ie,ce,Ce)):n.texImage2D(t.TEXTURE_2D,0,fe,ie.width,ie.height,0,ce,Ce,ie.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Ne&&ze&&n.texStorage3D(t.TEXTURE_2D_ARRAY,de,fe,Re[0].width,Re[0].height,ie.depth);for(let ee=0,he=Re.length;ee<he;ee++)if(ue=Re[ee],S.format!==Jn)if(ce!==null)if(Ne){if(O)if(S.layerUpdates.size>0){const ve=Am(ue.width,ue.height,S.format,S.type);for(const re of S.layerUpdates){const Pe=ue.data.subarray(re*ve/ue.data.BYTES_PER_ELEMENT,(re+1)*ve/ue.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,ee,0,0,re,ue.width,ue.height,1,ce,Pe)}}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,ee,0,0,0,ue.width,ue.height,ie.depth,ce,ue.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,ee,fe,ue.width,ue.height,ie.depth,0,ue.data,0,0);else Le("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ne?O&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,ee,0,0,0,ue.width,ue.height,ie.depth,ce,Ce,ue.data):n.texImage3D(t.TEXTURE_2D_ARRAY,ee,fe,ue.width,ue.height,ie.depth,0,ce,Ce,ue.data);S.layerUpdates.size>0&&S.clearLayerUpdates()}else{Ne&&ze&&n.texStorage2D(t.TEXTURE_2D,de,fe,Re[0].width,Re[0].height);for(let ee=0,he=Re.length;ee<he;ee++)ue=Re[ee],S.format!==Jn?ce!==null?Ne?O&&n.compressedTexSubImage2D(t.TEXTURE_2D,ee,0,0,ue.width,ue.height,ce,ue.data):n.compressedTexImage2D(t.TEXTURE_2D,ee,fe,ue.width,ue.height,0,ue.data):Le("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ne?O&&n.texSubImage2D(t.TEXTURE_2D,ee,0,0,ue.width,ue.height,ce,Ce,ue.data):n.texImage2D(t.TEXTURE_2D,ee,fe,ue.width,ue.height,0,ce,Ce,ue.data)}else if(S.isDataArrayTexture)if(Ne){if(ze&&n.texStorage3D(t.TEXTURE_2D_ARRAY,de,fe,ie.width,ie.height,ie.depth),O)if(S.layerUpdates.size>0){const ee=Am(ie.width,ie.height,S.format,S.type);for(const he of S.layerUpdates){const ve=ie.data.subarray(he*ee/ie.data.BYTES_PER_ELEMENT,(he+1)*ee/ie.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,he,ie.width,ie.height,1,ce,Ce,ve)}S.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,ce,Ce,ie.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,fe,ie.width,ie.height,ie.depth,0,ce,Ce,ie.data);else if(S.isData3DTexture)Ne?(ze&&n.texStorage3D(t.TEXTURE_3D,de,fe,ie.width,ie.height,ie.depth),O&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,ce,Ce,ie.data)):n.texImage3D(t.TEXTURE_3D,0,fe,ie.width,ie.height,ie.depth,0,ce,Ce,ie.data);else if(S.isFramebufferTexture){if(ze)if(Ne)n.texStorage2D(t.TEXTURE_2D,de,fe,ie.width,ie.height);else{let ee=ie.width,he=ie.height;for(let ve=0;ve<de;ve++)n.texImage2D(t.TEXTURE_2D,ve,fe,ee,he,0,ce,Ce,null),ee>>=1,he>>=1}}else if(S.isHTMLTexture){if("texElementImage2D"in t){const ee=t.canvas;if(ee.hasAttribute("layoutsubtree")||ee.setAttribute("layoutsubtree","true"),ie.parentNode!==ee){ee.appendChild(ie),p.add(S),ee.onpaint=he=>{const ve=he.changedElements;for(const re of p)ve.includes(re.image)&&(re.needsUpdate=!0)},ee.requestPaint();return}if(t.texElementImage2D.length===3)t.texElementImage2D(t.TEXTURE_2D,t.RGBA8,ie);else{const ve=t.RGBA,re=t.RGBA,Pe=t.UNSIGNED_BYTE;t.texElementImage2D(t.TEXTURE_2D,0,ve,re,Pe,ie)}t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE)}}else if(Re.length>0){if(Ne&&ze){const ee=at(Re[0]);n.texStorage2D(t.TEXTURE_2D,de,fe,ee.width,ee.height)}for(let ee=0,he=Re.length;ee<he;ee++)ue=Re[ee],Ne?O&&n.texSubImage2D(t.TEXTURE_2D,ee,0,0,ce,Ce,ue):n.texImage2D(t.TEXTURE_2D,ee,fe,ce,Ce,ue);S.generateMipmaps=!1}else if(Ne){if(ze){const ee=at(ie);n.texStorage2D(t.TEXTURE_2D,de,fe,ee.width,ee.height)}O&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,ce,Ce,ie)}else n.texImage2D(t.TEXTURE_2D,0,fe,ce,Ce,ie);h(S)&&g(q),le.__version=ae.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function Ue(R,S,V){if(S.image.length!==6)return;const q=Ie(R,S),Q=S.source;n.bindTexture(t.TEXTURE_CUBE_MAP,R.__webglTexture,t.TEXTURE0+V);const ae=i.get(Q);if(Q.version!==ae.__version||q===!0){n.activeTexture(t.TEXTURE0+V);const le=Ze.getPrimaries(Ze.workingColorSpace),J=S.colorSpace===rr?null:Ze.getPrimaries(S.colorSpace),ie=S.colorSpace===rr||le===J?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(t.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,ie);const ce=S.isCompressedTexture||S.image[0].isCompressedTexture,Ce=S.image[0]&&S.image[0].isDataTexture,fe=[];for(let re=0;re<6;re++)!ce&&!Ce?fe[re]=v(S.image[re],!0,r.maxCubemapSize):fe[re]=Ce?S.image[re].image:S.image[re],fe[re]=qt(S,fe[re]);const ue=fe[0],Re=s.convert(S.format,S.colorSpace),Ne=s.convert(S.type),ze=x(S.internalFormat,Re,Ne,S.normalized,S.colorSpace),O=S.isVideoTexture!==!0,de=ae.__version===void 0||q===!0,ee=Q.dataReady;let he=b(S,ue);ke(t.TEXTURE_CUBE_MAP,S);let ve;if(ce){O&&de&&n.texStorage2D(t.TEXTURE_CUBE_MAP,he,ze,ue.width,ue.height);for(let re=0;re<6;re++){ve=fe[re].mipmaps;for(let Pe=0;Pe<ve.length;Pe++){const be=ve[Pe];S.format!==Jn?Re!==null?O?ee&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe,0,0,be.width,be.height,Re,be.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe,ze,be.width,be.height,0,be.data):Le("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?ee&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe,0,0,be.width,be.height,Re,Ne,be.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe,ze,be.width,be.height,0,Re,Ne,be.data)}}}else{if(ve=S.mipmaps,O&&de){ve.length>0&&he++;const re=at(fe[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,he,ze,re.width,re.height)}for(let re=0;re<6;re++)if(Ce){O?ee&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,fe[re].width,fe[re].height,Re,Ne,fe[re].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,ze,fe[re].width,fe[re].height,0,Re,Ne,fe[re].data);for(let Pe=0;Pe<ve.length;Pe++){const ft=ve[Pe].image[re].image;O?ee&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe+1,0,0,ft.width,ft.height,Re,Ne,ft.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe+1,ze,ft.width,ft.height,0,Re,Ne,ft.data)}}else{O?ee&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,Re,Ne,fe[re]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,ze,Re,Ne,fe[re]);for(let Pe=0;Pe<ve.length;Pe++){const be=ve[Pe];O?ee&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe+1,0,0,Re,Ne,be.image[re]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe+1,ze,Re,Ne,be.image[re])}}}h(S)&&g(t.TEXTURE_CUBE_MAP),ae.__version=Q.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function ye(R,S,V,q,Q,ae){const le=s.convert(V.format,V.colorSpace),J=s.convert(V.type),ie=x(V.internalFormat,le,J,V.normalized,V.colorSpace),ce=i.get(S),Ce=i.get(V);if(Ce.__renderTarget=S,!ce.__hasExternalTextures){const fe=Math.max(1,S.width>>ae),ue=Math.max(1,S.height>>ae);Q===t.TEXTURE_3D||Q===t.TEXTURE_2D_ARRAY?n.texImage3D(Q,ae,ie,fe,ue,S.depth,0,le,J,null):n.texImage2D(Q,ae,ie,fe,ue,0,le,J,null)}n.bindFramebuffer(t.FRAMEBUFFER,R),Pt(S)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,q,Q,Ce.__webglTexture,0,yt(S)):(Q===t.TEXTURE_2D||Q>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,q,Q,Ce.__webglTexture,ae),n.bindFramebuffer(t.FRAMEBUFFER,null)}function je(R,S,V){if(t.bindRenderbuffer(t.RENDERBUFFER,R),S.depthBuffer){const q=S.depthTexture,Q=q&&q.isDepthTexture?q.type:null,ae=w(S.stencilBuffer,Q),le=S.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;Pt(S)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,yt(S),ae,S.width,S.height):V?t.renderbufferStorageMultisample(t.RENDERBUFFER,yt(S),ae,S.width,S.height):t.renderbufferStorage(t.RENDERBUFFER,ae,S.width,S.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,le,t.RENDERBUFFER,R)}else{const q=S.textures;for(let Q=0;Q<q.length;Q++){const ae=q[Q],le=s.convert(ae.format,ae.colorSpace),J=s.convert(ae.type),ie=x(ae.internalFormat,le,J,ae.normalized,ae.colorSpace);Pt(S)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,yt(S),ie,S.width,S.height):V?t.renderbufferStorageMultisample(t.RENDERBUFFER,yt(S),ie,S.width,S.height):t.renderbufferStorage(t.RENDERBUFFER,ie,S.width,S.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function It(R,S,V){const q=S.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(t.FRAMEBUFFER,R),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Q=i.get(S.depthTexture);if(Q.__renderTarget=S,(!Q.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),q){if(Q.__webglInit===void 0&&(Q.__webglInit=!0,S.depthTexture.addEventListener("dispose",A)),Q.__webglTexture===void 0){Q.__webglTexture=t.createTexture(),n.bindTexture(t.TEXTURE_CUBE_MAP,Q.__webglTexture),ke(t.TEXTURE_CUBE_MAP,S.depthTexture);const ce=s.convert(S.depthTexture.format),Ce=s.convert(S.depthTexture.type);let fe;S.depthTexture.format===Gi?fe=t.DEPTH_COMPONENT24:S.depthTexture.format===Ur&&(fe=t.DEPTH24_STENCIL8);for(let ue=0;ue<6;ue++)t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,fe,S.width,S.height,0,ce,Ce,null)}}else k(S.depthTexture,0);const ae=Q.__webglTexture,le=yt(S),J=q?t.TEXTURE_CUBE_MAP_POSITIVE_X+V:t.TEXTURE_2D,ie=S.depthTexture.format===Ur?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;if(S.depthTexture.format===Gi)Pt(S)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,ie,J,ae,0,le):t.framebufferTexture2D(t.FRAMEBUFFER,ie,J,ae,0);else if(S.depthTexture.format===Ur)Pt(S)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,ie,J,ae,0,le):t.framebufferTexture2D(t.FRAMEBUFFER,ie,J,ae,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Xe(R){const S=i.get(R),V=R.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==R.depthTexture){const q=R.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),q){const Q=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,q.removeEventListener("dispose",Q)};q.addEventListener("dispose",Q),S.__depthDisposeCallback=Q}S.__boundDepthTexture=q}if(R.depthTexture&&!S.__autoAllocateDepthBuffer)if(V)for(let q=0;q<6;q++)It(S.__webglFramebuffer[q],R,q);else{const q=R.texture.mipmaps;q&&q.length>0?It(S.__webglFramebuffer[0],R,0):It(S.__webglFramebuffer,R,0)}else if(V){S.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(n.bindFramebuffer(t.FRAMEBUFFER,S.__webglFramebuffer[q]),S.__webglDepthbuffer[q]===void 0)S.__webglDepthbuffer[q]=t.createRenderbuffer(),je(S.__webglDepthbuffer[q],R,!1);else{const Q=R.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ae=S.__webglDepthbuffer[q];t.bindRenderbuffer(t.RENDERBUFFER,ae),t.framebufferRenderbuffer(t.FRAMEBUFFER,Q,t.RENDERBUFFER,ae)}}else{const q=R.texture.mipmaps;if(q&&q.length>0?n.bindFramebuffer(t.FRAMEBUFFER,S.__webglFramebuffer[0]):n.bindFramebuffer(t.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=t.createRenderbuffer(),je(S.__webglDepthbuffer,R,!1);else{const Q=R.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ae=S.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,ae),t.framebufferRenderbuffer(t.FRAMEBUFFER,Q,t.RENDERBUFFER,ae)}}n.bindFramebuffer(t.FRAMEBUFFER,null)}function tt(R,S,V){const q=i.get(R);S!==void 0&&ye(q.__webglFramebuffer,R,R.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),V!==void 0&&Xe(R)}function ht(R){const S=R.texture,V=i.get(R),q=i.get(S);R.addEventListener("dispose",y);const Q=R.textures,ae=R.isWebGLCubeRenderTarget===!0,le=Q.length>1;if(le||(q.__webglTexture===void 0&&(q.__webglTexture=t.createTexture()),q.__version=S.version,a.memory.textures++),ae){V.__webglFramebuffer=[];for(let J=0;J<6;J++)if(S.mipmaps&&S.mipmaps.length>0){V.__webglFramebuffer[J]=[];for(let ie=0;ie<S.mipmaps.length;ie++)V.__webglFramebuffer[J][ie]=t.createFramebuffer()}else V.__webglFramebuffer[J]=t.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){V.__webglFramebuffer=[];for(let J=0;J<S.mipmaps.length;J++)V.__webglFramebuffer[J]=t.createFramebuffer()}else V.__webglFramebuffer=t.createFramebuffer();if(le)for(let J=0,ie=Q.length;J<ie;J++){const ce=i.get(Q[J]);ce.__webglTexture===void 0&&(ce.__webglTexture=t.createTexture(),a.memory.textures++)}if(R.samples>0&&Pt(R)===!1){V.__webglMultisampledFramebuffer=t.createFramebuffer(),V.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let J=0;J<Q.length;J++){const ie=Q[J];V.__webglColorRenderbuffer[J]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,V.__webglColorRenderbuffer[J]);const ce=s.convert(ie.format,ie.colorSpace),Ce=s.convert(ie.type),fe=x(ie.internalFormat,ce,Ce,ie.normalized,ie.colorSpace,R.isXRRenderTarget===!0),ue=yt(R);t.renderbufferStorageMultisample(t.RENDERBUFFER,ue,fe,R.width,R.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+J,t.RENDERBUFFER,V.__webglColorRenderbuffer[J])}t.bindRenderbuffer(t.RENDERBUFFER,null),R.depthBuffer&&(V.__webglDepthRenderbuffer=t.createRenderbuffer(),je(V.__webglDepthRenderbuffer,R,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(ae){n.bindTexture(t.TEXTURE_CUBE_MAP,q.__webglTexture),ke(t.TEXTURE_CUBE_MAP,S);for(let J=0;J<6;J++)if(S.mipmaps&&S.mipmaps.length>0)for(let ie=0;ie<S.mipmaps.length;ie++)ye(V.__webglFramebuffer[J][ie],R,S,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+J,ie);else ye(V.__webglFramebuffer[J],R,S,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+J,0);h(S)&&g(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(le){for(let J=0,ie=Q.length;J<ie;J++){const ce=Q[J],Ce=i.get(ce);let fe=t.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(fe=R.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(fe,Ce.__webglTexture),ke(fe,ce),ye(V.__webglFramebuffer,R,ce,t.COLOR_ATTACHMENT0+J,fe,0),h(ce)&&g(fe)}n.unbindTexture()}else{let J=t.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(J=R.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(J,q.__webglTexture),ke(J,S),S.mipmaps&&S.mipmaps.length>0)for(let ie=0;ie<S.mipmaps.length;ie++)ye(V.__webglFramebuffer[ie],R,S,t.COLOR_ATTACHMENT0,J,ie);else ye(V.__webglFramebuffer,R,S,t.COLOR_ATTACHMENT0,J,0);h(S)&&g(J),n.unbindTexture()}R.depthBuffer&&Xe(R)}function qe(R){const S=R.textures;for(let V=0,q=S.length;V<q;V++){const Q=S[V];if(h(Q)){const ae=M(R),le=i.get(Q).__webglTexture;n.bindTexture(ae,le),g(ae),n.unbindTexture()}}}const xt=[],zt=[];function pn(R){if(R.samples>0){if(Pt(R)===!1){const S=R.textures,V=R.width,q=R.height;let Q=t.COLOR_BUFFER_BIT;const ae=R.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,le=i.get(R),J=S.length>1;if(J)for(let ce=0;ce<S.length;ce++)n.bindFramebuffer(t.FRAMEBUFFER,le.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ce,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,le.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+ce,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,le.__webglMultisampledFramebuffer);const ie=R.texture.mipmaps;ie&&ie.length>0?n.bindFramebuffer(t.DRAW_FRAMEBUFFER,le.__webglFramebuffer[0]):n.bindFramebuffer(t.DRAW_FRAMEBUFFER,le.__webglFramebuffer);for(let ce=0;ce<S.length;ce++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(Q|=t.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(Q|=t.STENCIL_BUFFER_BIT)),J){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,le.__webglColorRenderbuffer[ce]);const Ce=i.get(S[ce]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Ce,0)}t.blitFramebuffer(0,0,V,q,0,0,V,q,Q,t.NEAREST),l===!0&&(xt.length=0,zt.length=0,xt.push(t.COLOR_ATTACHMENT0+ce),R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&(xt.push(ae),zt.push(ae),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,zt)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,xt))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),J)for(let ce=0;ce<S.length;ce++){n.bindFramebuffer(t.FRAMEBUFFER,le.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ce,t.RENDERBUFFER,le.__webglColorRenderbuffer[ce]);const Ce=i.get(S[ce]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,le.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+ce,t.TEXTURE_2D,Ce,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,le.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&l){const S=R.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[S])}}}function yt(R){return Math.min(r.maxSamples,R.samples)}function Pt(R){const S=i.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function B(R){const S=a.render.frame;f.get(R)!==S&&(f.set(R,S),R.update())}function qt(R,S){const V=R.colorSpace,q=R.format,Q=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||V!==$l&&V!==rr&&(Ze.getTransfer(V)===ot?(q!==Jn||Q!==An)&&Le("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):it("WebGLTextures: Unsupported texture color space:",V)),S}function at(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=I,this.resetTextureUnits=W,this.getTextureUnits=L,this.setTextureUnits=j,this.setTexture2D=k,this.setTexture2DArray=z,this.setTexture3D=D,this.setTextureCube=Y,this.rebindTextures=tt,this.setupRenderTarget=ht,this.updateRenderTargetMipmap=qe,this.updateMultisampleRenderTarget=pn,this.setupDepthRenderbuffer=Xe,this.setupFrameBufferTexture=ye,this.useMultisampledRTT=Pt,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function Vb(t,e){function n(i,r=rr){let s;const a=Ze.getTransfer(r);if(i===An)return t.UNSIGNED_BYTE;if(i===of)return t.UNSIGNED_SHORT_4_4_4_4;if(i===lf)return t.UNSIGNED_SHORT_5_5_5_1;if(i===Nv)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===Lv)return t.UNSIGNED_INT_10F_11F_11F_REV;if(i===Rv)return t.BYTE;if(i===Pv)return t.SHORT;if(i===$a)return t.UNSIGNED_SHORT;if(i===af)return t.INT;if(i===vi)return t.UNSIGNED_INT;if(i===fi)return t.FLOAT;if(i===xi)return t.HALF_FLOAT;if(i===Dv)return t.ALPHA;if(i===Iv)return t.RGB;if(i===Jn)return t.RGBA;if(i===Gi)return t.DEPTH_COMPONENT;if(i===Ur)return t.DEPTH_STENCIL;if(i===Uv)return t.RED;if(i===cf)return t.RED_INTEGER;if(i===Wr)return t.RG;if(i===uf)return t.RG_INTEGER;if(i===df)return t.RGBA_INTEGER;if(i===ml||i===gl||i===_l||i===vl)if(a===ot)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===ml)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===gl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===_l)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===vl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===ml)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===gl)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===_l)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===vl)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Pd||i===Nd||i===Ld||i===Dd)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Pd)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Nd)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ld)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Dd)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Id||i===Ud||i===Fd||i===Od||i===kd||i===Wl||i===Bd)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Id||i===Ud)return a===ot?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Fd)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===Od)return s.COMPRESSED_R11_EAC;if(i===kd)return s.COMPRESSED_SIGNED_R11_EAC;if(i===Wl)return s.COMPRESSED_RG11_EAC;if(i===Bd)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===zd||i===Hd||i===Vd||i===Gd||i===jd||i===Wd||i===Xd||i===$d||i===Yd||i===qd||i===Kd||i===Zd||i===Qd||i===Jd)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===zd)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Hd)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Vd)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Gd)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===jd)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Wd)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Xd)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===$d)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Yd)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===qd)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Kd)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Zd)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Qd)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Jd)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===eh||i===th||i===nh)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===eh)return a===ot?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===th)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===nh)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===ih||i===rh||i===Xl||i===sh)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===ih)return s.COMPRESSED_RED_RGTC1_EXT;if(i===rh)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Xl)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===sh)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ya?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}const Gb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,jb=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Wb{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n){if(this.texture===null){const i=new Xv(e.texture);(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new yi({vertexShader:Gb,fragmentShader:jb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Si(new _c(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Xb extends Mr{constructor(e,n){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,f=null,p=null,d=null,m=null,_=null;const E=typeof XRWebGLBinding<"u",v=new Wb,h={},g=n.getContextAttributes();let M=null,x=null;const w=[],b=[],A=new Oe;let y=null,C=null;const N=new kn;N.viewport=new Et;const P=new kn;P.viewport=new Et;const H=[N,P],W=new JM;let L=null,j=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let ne=w[Z];return ne===void 0&&(ne=new iu,w[Z]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function(Z){let ne=w[Z];return ne===void 0&&(ne=new iu,w[Z]=ne),ne.getGripSpace()},this.getHand=function(Z){let ne=w[Z];return ne===void 0&&(ne=new iu,w[Z]=ne),ne.getHandSpace()};function I(Z){const ne=b.indexOf(Z.inputSource);if(ne===-1)return;const Se=w[ne];Se!==void 0&&(Se.update(Z.inputSource,Z.frame,c||a),Se.dispatchEvent({type:Z.type,data:Z.inputSource}))}function U(){r.removeEventListener("select",I),r.removeEventListener("selectstart",I),r.removeEventListener("selectend",I),r.removeEventListener("squeeze",I),r.removeEventListener("squeezestart",I),r.removeEventListener("squeezeend",I),r.removeEventListener("end",U),r.removeEventListener("inputsourceschange",k);for(let Z=0;Z<w.length;Z++){const ne=b[Z];ne!==null&&(b[Z]=null,w[Z].disconnect(ne))}L=null,j=null,v.reset();for(const Z in h)delete h[Z];if(e.setRenderTarget(M),m=null,d=null,p=null,r=null,x=null,Ie.stop(),i.isPresenting=!1,e.setPixelRatio(y),e.setSize(A.width,A.height,!1),C!==null){const Z=C.camera;Z.fov=C.fov,Z.zoom=C.zoom,Z.updateProjectionMatrix(),C=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){s=Z,i.isPresenting===!0&&Le("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,i.isPresenting===!0&&Le("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return d!==null?d:m},this.getBinding=function(){return p===null&&E&&(p=new XRWebGLBinding(r,n)),p},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(Z){if(r=Z,r!==null){if(M=e.getRenderTarget(),r.addEventListener("select",I),r.addEventListener("selectstart",I),r.addEventListener("selectend",I),r.addEventListener("squeeze",I),r.addEventListener("squeezestart",I),r.addEventListener("squeezeend",I),r.addEventListener("end",U),r.addEventListener("inputsourceschange",k),g.xrCompatible!==!0&&await n.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(A),E&&"createProjectionLayer"in XRWebGLBinding.prototype){let Se=null,Ue=null,ye=null;g.depth&&(ye=g.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,Se=g.stencil?Ur:Gi,Ue=g.stencil?Ya:vi);const je={colorFormat:n.RGBA8,depthFormat:ye,scaleFactor:s};p=this.getBinding(),d=p.createProjectionLayer(je),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),x=new ni(d.textureWidth,d.textureHeight,{format:Jn,type:An,depthTexture:new Za(d.textureWidth,d.textureHeight,Ue,void 0,void 0,void 0,void 0,void 0,void 0,Se),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{const Se={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,n,Se),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),x=new ni(m.framebufferWidth,m.framebufferHeight,{format:Jn,type:An,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1,storeMultisampledDepthBuffer:m.ignoreDepthValues===!1,storeMultisampledStencilBuffer:m.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),Ie.setContext(r),Ie.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function k(Z){for(let ne=0;ne<Z.removed.length;ne++){const Se=Z.removed[ne],Ue=b.indexOf(Se);Ue>=0&&(b[Ue]=null,w[Ue].disconnect(Se))}for(let ne=0;ne<Z.added.length;ne++){const Se=Z.added[ne];let Ue=b.indexOf(Se);if(Ue===-1){for(let je=0;je<w.length;je++)if(je>=b.length){b.push(Se),Ue=je;break}else if(b[je]===null){b[je]=Se,Ue=je;break}if(Ue===-1)break}const ye=w[Ue];ye&&ye.connect(Se)}}const z=new G,D=new G;function Y(Z,ne,Se){z.setFromMatrixPosition(ne.matrixWorld),D.setFromMatrixPosition(Se.matrixWorld);const Ue=z.distanceTo(D),ye=ne.projectionMatrix.elements,je=Se.projectionMatrix.elements,It=ye[14]/(ye[10]-1),Xe=ye[14]/(ye[10]+1),tt=(ye[9]+1)/ye[5],ht=(ye[9]-1)/ye[5],qe=(ye[8]-1)/ye[0],xt=(je[8]+1)/je[0],zt=It*qe,pn=It*xt,yt=Ue/(-qe+xt),Pt=yt*-qe;if(ne.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Pt),Z.translateZ(yt),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),ye[10]===-1)Z.projectionMatrix.copy(ne.projectionMatrix),Z.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{const B=It+yt,qt=Xe+yt,at=zt-Pt,R=pn+(Ue-Pt),S=tt*Xe/qt*B,V=ht*Xe/qt*B;Z.projectionMatrix.makePerspective(at,R,S,V,B,qt),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function oe(Z,ne){ne===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(ne.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(r===null)return;let ne=Z.near,Se=Z.far;v.texture!==null&&(v.depthNear>0&&(ne=v.depthNear),v.depthFar>0&&(Se=v.depthFar)),W.near=P.near=N.near=ne,W.far=P.far=N.far=Se,(L!==W.near||j!==W.far)&&(r.updateRenderState({depthNear:W.near,depthFar:W.far}),L=W.near,j=W.far),W.layers.mask=Z.layers.mask|6,N.layers.mask=W.layers.mask&-5,P.layers.mask=W.layers.mask&-3;const Ue=Z.parent,ye=W.cameras;oe(W,Ue);for(let je=0;je<ye.length;je++)oe(ye[je],Ue);ye.length===2?Y(W,N,P):W.projectionMatrix.copy(N.projectionMatrix),C===null&&Z.isPerspectiveCamera&&(C={camera:Z,fov:Z.fov,zoom:Z.zoom}),ge(Z,W,Ue)};function ge(Z,ne,Se){Se===null?Z.matrix.copy(ne.matrixWorld):(Z.matrix.copy(Se.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(ne.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(ne.projectionMatrix),Z.projectionMatrixInverse.copy(ne.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Ka*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return W},this.getFoveation=function(){if(!(d===null&&m===null))return l},this.setFoveation=function(Z){l=Z,d!==null&&(d.fixedFoveation=Z),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=Z)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(W)},this.getCameraTexture=function(Z){return h[Z]};let He=null;function ke(Z,ne){if(f=ne.getViewerPose(c||a),_=ne,f!==null){const Se=f.views;m!==null&&(e.setRenderTargetFramebuffer(x,m.framebuffer),e.setRenderTarget(x));let Ue=!1;Se.length!==W.cameras.length&&(W.cameras.length=0,Ue=!0);for(let Xe=0;Xe<Se.length;Xe++){const tt=Se[Xe];let ht=null;if(m!==null)ht=m.getViewport(tt);else{const xt=p.getViewSubImage(d,tt);ht=xt.viewport,Xe===0&&(e.setRenderTargetTextures(x,xt.colorTexture,xt.depthStencilTexture),e.setRenderTarget(x))}let qe=H[Xe];qe===void 0&&(qe=new kn,qe.layers.enable(Xe),qe.viewport=new Et,H[Xe]=qe),qe.matrix.fromArray(tt.transform.matrix),qe.matrix.decompose(qe.position,qe.quaternion,qe.scale),qe.projectionMatrix.fromArray(tt.projectionMatrix),qe.projectionMatrixInverse.copy(qe.projectionMatrix).invert(),qe.viewport.set(ht.x,ht.y,ht.width,ht.height),Xe===0&&(W.matrix.copy(qe.matrix),W.matrix.decompose(W.position,W.quaternion,W.scale)),Ue===!0&&W.cameras.push(qe)}const ye=r.enabledFeatures;if(ye&&ye.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&E){p=i.getBinding();const Xe=p.getDepthInformation(Se[0]);Xe&&Xe.isValid&&Xe.texture&&v.init(Xe,r.renderState)}if(ye&&ye.includes("camera-access")&&E){e.state.unbindTexture(),p=i.getBinding();for(let Xe=0;Xe<Se.length;Xe++){const tt=Se[Xe].camera;if(tt){let ht=h[tt];ht||(ht=new Xv,h[tt]=ht);const qe=p.getCameraImage(tt);ht.sourceTexture=qe}}}}for(let Se=0;Se<w.length;Se++){const Ue=b[Se],ye=w[Se];Ue!==null&&ye!==void 0&&ye.update(Ue,ne,c||a)}He&&He(Z,ne),ne.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ne}),_=null}const Ie=new Kv;Ie.setAnimationLoop(ke),this.setAnimationLoop=function(Z){He=Z},this.dispose=function(){}}}const $b=new Tt,i0=new Be;i0.set(-1,0,0,0,1,0,0,0,1);function Yb(t,e){function n(v,h){v.matrixAutoUpdate===!0&&v.updateMatrix(),h.value.copy(v.matrix)}function i(v,h){h.color.getRGB(v.fogColor.value,$v(t)),h.isFog?(v.fogNear.value=h.near,v.fogFar.value=h.far):h.isFogExp2&&(v.fogDensity.value=h.density)}function r(v,h,g,M,x){h.isNodeMaterial?h.uniformsNeedUpdate=!1:h.isMeshBasicMaterial?s(v,h):h.isMeshLambertMaterial?(s(v,h),h.envMap&&(v.envMapIntensity.value=h.envMapIntensity)):h.isMeshToonMaterial?(s(v,h),p(v,h)):h.isMeshPhongMaterial?(s(v,h),f(v,h),h.envMap&&(v.envMapIntensity.value=h.envMapIntensity)):h.isMeshStandardMaterial?(s(v,h),d(v,h),h.isMeshPhysicalMaterial&&m(v,h,x)):h.isMeshMatcapMaterial?(s(v,h),_(v,h)):h.isMeshDepthMaterial?s(v,h):h.isMeshDistanceMaterial?(s(v,h),E(v,h)):h.isMeshNormalMaterial?s(v,h):h.isLineBasicMaterial?(a(v,h),h.isLineDashedMaterial&&o(v,h)):h.isPointsMaterial?l(v,h,g,M):h.isSpriteMaterial?c(v,h):h.isShadowMaterial?(v.color.value.copy(h.color),v.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function s(v,h){v.opacity.value=h.opacity,h.color&&v.diffuse.value.copy(h.color),h.emissive&&v.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(v.map.value=h.map,n(h.map,v.mapTransform)),h.alphaMap&&(v.alphaMap.value=h.alphaMap,n(h.alphaMap,v.alphaMapTransform)),h.bumpMap&&(v.bumpMap.value=h.bumpMap,n(h.bumpMap,v.bumpMapTransform),v.bumpScale.value=h.bumpScale,h.side===Mn&&(v.bumpScale.value*=-1)),h.normalMap&&(v.normalMap.value=h.normalMap,n(h.normalMap,v.normalMapTransform),v.normalScale.value.copy(h.normalScale),h.side===Mn&&v.normalScale.value.negate()),h.displacementMap&&(v.displacementMap.value=h.displacementMap,n(h.displacementMap,v.displacementMapTransform),v.displacementScale.value=h.displacementScale,v.displacementBias.value=h.displacementBias),h.emissiveMap&&(v.emissiveMap.value=h.emissiveMap,n(h.emissiveMap,v.emissiveMapTransform)),h.specularMap&&(v.specularMap.value=h.specularMap,n(h.specularMap,v.specularMapTransform)),h.alphaTest>0&&(v.alphaTest.value=h.alphaTest);const g=e.get(h),M=g.envMap,x=g.envMapRotation;M&&(v.envMap.value=M,v.envMapRotation.value.setFromMatrix4($b.makeRotationFromEuler(x)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&v.envMapRotation.value.premultiply(i0),v.reflectivity.value=h.reflectivity,v.ior.value=h.ior,v.refractionRatio.value=h.refractionRatio),h.lightMap&&(v.lightMap.value=h.lightMap,v.lightMapIntensity.value=h.lightMapIntensity,n(h.lightMap,v.lightMapTransform)),h.aoMap&&(v.aoMap.value=h.aoMap,v.aoMapIntensity.value=h.aoMapIntensity,n(h.aoMap,v.aoMapTransform))}function a(v,h){v.diffuse.value.copy(h.color),v.opacity.value=h.opacity,h.map&&(v.map.value=h.map,n(h.map,v.mapTransform))}function o(v,h){v.dashSize.value=h.dashSize,v.totalSize.value=h.dashSize+h.gapSize,v.scale.value=h.scale}function l(v,h,g,M){v.diffuse.value.copy(h.color),v.opacity.value=h.opacity,v.size.value=h.size*g,v.scale.value=M*.5,h.map&&(v.map.value=h.map,n(h.map,v.uvTransform)),h.alphaMap&&(v.alphaMap.value=h.alphaMap,n(h.alphaMap,v.alphaMapTransform)),h.alphaTest>0&&(v.alphaTest.value=h.alphaTest)}function c(v,h){v.diffuse.value.copy(h.color),v.opacity.value=h.opacity,v.rotation.value=h.rotation,h.map&&(v.map.value=h.map,n(h.map,v.mapTransform)),h.alphaMap&&(v.alphaMap.value=h.alphaMap,n(h.alphaMap,v.alphaMapTransform)),h.alphaTest>0&&(v.alphaTest.value=h.alphaTest)}function f(v,h){v.specular.value.copy(h.specular),v.shininess.value=Math.max(h.shininess,1e-4)}function p(v,h){h.gradientMap&&(v.gradientMap.value=h.gradientMap)}function d(v,h){v.metalness.value=h.metalness,h.metalnessMap&&(v.metalnessMap.value=h.metalnessMap,n(h.metalnessMap,v.metalnessMapTransform)),v.roughness.value=h.roughness,h.roughnessMap&&(v.roughnessMap.value=h.roughnessMap,n(h.roughnessMap,v.roughnessMapTransform)),h.envMap&&(v.envMapIntensity.value=h.envMapIntensity)}function m(v,h,g){v.ior.value=h.ior,h.sheen>0&&(v.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),v.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(v.sheenColorMap.value=h.sheenColorMap,n(h.sheenColorMap,v.sheenColorMapTransform)),h.sheenRoughnessMap&&(v.sheenRoughnessMap.value=h.sheenRoughnessMap,n(h.sheenRoughnessMap,v.sheenRoughnessMapTransform))),h.clearcoat>0&&(v.clearcoat.value=h.clearcoat,v.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(v.clearcoatMap.value=h.clearcoatMap,n(h.clearcoatMap,v.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(v.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,n(h.clearcoatRoughnessMap,v.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(v.clearcoatNormalMap.value=h.clearcoatNormalMap,n(h.clearcoatNormalMap,v.clearcoatNormalMapTransform),v.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Mn&&v.clearcoatNormalScale.value.negate())),h.dispersion>0&&(v.dispersion.value=h.dispersion),h.retroreflectivity>0&&(v.retroreflectivity.value=h.retroreflectivity),h.iridescence>0&&(v.iridescence.value=h.iridescence,v.iridescenceIOR.value=h.iridescenceIOR,v.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],v.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(v.iridescenceMap.value=h.iridescenceMap,n(h.iridescenceMap,v.iridescenceMapTransform)),h.iridescenceThicknessMap&&(v.iridescenceThicknessMap.value=h.iridescenceThicknessMap,n(h.iridescenceThicknessMap,v.iridescenceThicknessMapTransform))),h.transmission>0&&(v.transmission.value=h.transmission,v.transmissionSamplerMap.value=g.texture,v.transmissionSamplerSize.value.set(g.width,g.height),h.transmissionMap&&(v.transmissionMap.value=h.transmissionMap,n(h.transmissionMap,v.transmissionMapTransform)),v.thickness.value=h.thickness,h.thicknessMap&&(v.thicknessMap.value=h.thicknessMap,n(h.thicknessMap,v.thicknessMapTransform)),v.attenuationDistance.value=h.attenuationDistance,v.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(v.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(v.anisotropyMap.value=h.anisotropyMap,n(h.anisotropyMap,v.anisotropyMapTransform))),v.specularIntensity.value=h.specularIntensity,v.specularColor.value.copy(h.specularColor),h.specularColorMap&&(v.specularColorMap.value=h.specularColorMap,n(h.specularColorMap,v.specularColorMapTransform)),h.specularIntensityMap&&(v.specularIntensityMap.value=h.specularIntensityMap,n(h.specularIntensityMap,v.specularIntensityMapTransform))}function _(v,h){h.matcap&&(v.matcap.value=h.matcap)}function E(v,h){const g=e.get(h).light;v.referencePosition.value.setFromMatrixPosition(g.matrixWorld),v.nearDistance.value=g.shadow.camera.near,v.farDistance.value=g.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function qb(t,e,n,i){let r={},s={},a=[];const o=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,w){const b=w.program;i.uniformBlockBinding(x,b)}function c(x,w){let b=r[x.id];b===void 0&&(v(x),b=f(x),r[x.id]=b,x.addEventListener("dispose",g));const A=w.program;i.updateUBOMapping(x,A);const y=e.render.frame;s[x.id]!==y&&(d(x),s[x.id]=y)}function f(x){const w=p();x.__bindingPointIndex=w;const b=t.createBuffer(),A=x.__size,y=x.usage;return t.bindBuffer(t.UNIFORM_BUFFER,b),t.bufferData(t.UNIFORM_BUFFER,A,y),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,w,b),b}function p(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return it("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(x){const w=r[x.id],b=x.uniforms,A=x.__cache;t.bindBuffer(t.UNIFORM_BUFFER,w);for(let y=0,C=b.length;y<C;y++){const N=b[y];if(Array.isArray(N))for(let P=0,H=N.length;P<H;P++)m(N[P],y,P,A);else m(N,y,0,A)}t.bindBuffer(t.UNIFORM_BUFFER,null)}function m(x,w,b,A){if(E(x,w,b,A)===!0){const y=x.__offset,C=x.value;if(Array.isArray(C)){let N=0;for(let P=0;P<C.length;P++){const H=C[P],W=h(H);_(H,x.__data,N),typeof H!="number"&&typeof H!="boolean"&&!H.isMatrix3&&!ArrayBuffer.isView(H)&&(N+=W.storage/Float32Array.BYTES_PER_ELEMENT)}}else _(C,x.__data,0);t.bufferSubData(t.UNIFORM_BUFFER,y,x.__data)}}function _(x,w,b){typeof x=="number"||typeof x=="boolean"?w[0]=x:x.isMatrix3?(w[0]=x.elements[0],w[1]=x.elements[1],w[2]=x.elements[2],w[3]=0,w[4]=x.elements[3],w[5]=x.elements[4],w[6]=x.elements[5],w[7]=0,w[8]=x.elements[6],w[9]=x.elements[7],w[10]=x.elements[8],w[11]=0):ArrayBuffer.isView(x)?w.set(new x.constructor(x.buffer,x.byteOffset,w.length)):x.toArray(w,b)}function E(x,w,b,A){const y=x.value,C=w+"_"+b;if(A[C]===void 0)return typeof y=="number"||typeof y=="boolean"?A[C]=y:ArrayBuffer.isView(y)?A[C]=y.slice():A[C]=y.clone(),!0;{const N=A[C];if(typeof y=="number"||typeof y=="boolean"){if(N!==y)return A[C]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(N.equals(y)===!1)return N.copy(y),!0}}return!1}function v(x){const w=x.uniforms;let b=0;const A=16;for(let C=0,N=w.length;C<N;C++){const P=Array.isArray(w[C])?w[C]:[w[C]];for(let H=0,W=P.length;H<W;H++){const L=P[H],j=Array.isArray(L.value)?L.value:[L.value];for(let I=0,U=j.length;I<U;I++){const k=j[I],z=h(k),D=b%A,Y=D%z.boundary,oe=D+Y;b+=Y,oe!==0&&A-oe<z.storage&&(b+=A-oe),L.__data=new Float32Array(z.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=b,b+=z.storage}}}const y=b%A;return y>0&&(b+=A-y),x.__size=b,x.__cache={},this}function h(x){const w={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(w.boundary=4,w.storage=4):x.isVector2?(w.boundary=8,w.storage=8):x.isVector3||x.isColor?(w.boundary=16,w.storage=12):x.isVector4?(w.boundary=16,w.storage=16):x.isMatrix3?(w.boundary=48,w.storage=48):x.isMatrix4?(w.boundary=64,w.storage=64):x.isTexture?Le("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(w.boundary=16,w.storage=x.byteLength):Le("WebGLRenderer: Unsupported uniform value type.",x),w}function g(x){const w=x.target;w.removeEventListener("dispose",g);const b=a.indexOf(w.__bindingPointIndex);a.splice(b,1),t.deleteBuffer(r[w.id]),delete r[w.id],delete s[w.id]}function M(){for(const x in r)t.deleteBuffer(r[x]);a=[],r={},s={}}return{bind:l,update:c,dispose:M}}const Kb=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let li=null;function Zb(){return li===null&&(li=new IM(Kb,16,16,Wr,xi),li.name="DFG_LUT",li.minFilter=rn,li.magFilter=rn,li.wrapS=Ii,li.wrapT=Ii,li.generateMipmaps=!1,li.needsUpdate=!0),li}class Qb{constructor(e={}){const{canvas:n=Yy(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:d=!1,outputBufferType:m=An}=e;this.isWebGLRenderer=!0;let _;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=i.getContextAttributes().alpha}else _=a;const E=m,v=new Set([df,uf,cf]),h=new Set([An,vi,$a,Ya,of,lf]),g=new Uint32Array(4),M=new Int32Array(4),x=new G;let w=null,b=null;const A=[],y=[];let C=null;this.domElement=n,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=_i,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const N=this;let P=!1,H=null,W=null,L=null,j=null;this._outputColorSpace=Un;let I=0,U=0,k=null,z=-1,D=null;const Y=new Et,oe=new Et;let ge=null;const He=new Ke(0);let ke=0,Ie=n.width,Z=n.height,ne=1,Se=null,Ue=null;const ye=new Et(0,0,Ie,Z),je=new Et(0,0,Ie,Z);let It=!1;const Xe=new _f;let tt=!1,ht=!1;const qe=new Tt,xt=new G,zt=new Et,pn={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let yt=!1;function Pt(){return k===null?ne:1}let B=i;function qt(T,F){return n.getContext(T,F)}let at,R,S,V,q,Q,ae,le,J,ie,ce,Ce,fe,ue,Re,Ne,ze,O,de,ee,he,ve,re;try{const T={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:f,failIfMajorPerformanceCaveat:p};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${sf}`),n.addEventListener("webglcontextlost",ft,!1),n.addEventListener("webglcontextrestored",rt,!1),n.addEventListener("webglcontextcreationerror",Wn,!1),B===null){const F="webgl2";if(B=qt(F,T),B===null)throw qt(F)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Pe()}catch(T){throw n.removeEventListener("webglcontextlost",ft,!1),n.removeEventListener("webglcontextrestored",rt,!1),n.removeEventListener("webglcontextcreationerror",Wn,!1),it("WebGLRenderer: "+T.message),T}function Pe(){at=new ZT(B),at.init(),he=new Vb(B,at),R=new HT(B,at,e,he),S=new zb(B,at),R.reversedDepthBuffer&&d&&S.buffers.depth.setReversed(!0),W=B.createFramebuffer(),L=B.createFramebuffer(),j=B.createFramebuffer(),V=new e1(B),q=new bb,Q=new Hb(B,at,S,q,R,he,V),ae=new KT(N),le=new nE(B),ve=new BT(B,le),J=new QT(B,le,V,ve),ie=new n1(B,J,le,ve,V),O=new t1(B,R,Q),Re=new VT(q),ce=new Tb(N,ae,at,R,ve,Re),Ce=new Yb(N,q),fe=new Cb,ue=new Ib(at),ze=new kT(N,ae,S,ie,_,l),Ne=new Bb(N,ie,R),re=new qb(B,V,R,S),de=new zT(B,at,V),ee=new JT(B,at,V),V.programs=ce.programs,N.capabilities=R,N.extensions=at,N.properties=q,N.renderLists=fe,N.shadowMap=Ne,N.state=S,N.info=V}E!==An&&(C=new r1(E,n.width,n.height,o,r,s));const be=new Xb(N,B);this.xr=be,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const T=at.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=at.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return ne},this.setPixelRatio=function(T){T!==void 0&&(ne=T,this.setSize(Ie,Z,!1))},this.getSize=function(T){return T.set(Ie,Z)},this.setSize=function(T,F,K=!0){if(be.isPresenting){Le("WebGLRenderer: Can't change size while VR device is presenting.");return}Ie=T,Z=F,n.width=Math.floor(T*ne),n.height=Math.floor(F*ne),K===!0&&(n.style.width=T+"px",n.style.height=F+"px"),C!==null&&C.setSize(n.width,n.height),this.setViewport(0,0,T,F)},this.getDrawingBufferSize=function(T){return T.set(Ie*ne,Z*ne).floor()},this.setDrawingBufferSize=function(T,F,K){Ie=T,Z=F,ne=K,n.width=Math.floor(T*K),n.height=Math.floor(F*K),this.setViewport(0,0,T,F)},this.setEffects=function(T){if(E===An){it("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let F=0;F<T.length;F++)if(T[F].isOutputPass===!0){Le("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}C.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(Y)},this.getViewport=function(T){return T.copy(ye)},this.setViewport=function(T,F,K,X){T.isVector4?ye.set(T.x,T.y,T.z,T.w):ye.set(T,F,K,X),S.viewport(Y.copy(ye).multiplyScalar(ne).round())},this.getScissor=function(T){return T.copy(je)},this.setScissor=function(T,F,K,X){T.isVector4?je.set(T.x,T.y,T.z,T.w):je.set(T,F,K,X),S.scissor(oe.copy(je).multiplyScalar(ne).round())},this.getScissorTest=function(){return It},this.setScissorTest=function(T){S.setScissorTest(It=T)},this.setOpaqueSort=function(T){Se=T},this.setTransparentSort=function(T){Ue=T},this.getClearColor=function(T){return T.copy(ze.getClearColor())},this.setClearColor=function(){ze.setClearColor(...arguments)},this.getClearAlpha=function(){return ze.getClearAlpha()},this.setClearAlpha=function(){ze.setClearAlpha(...arguments)},this.clear=function(T=!0,F=!0,K=!0){let X=0;if(T){let $=!1;if(k!==null){const _e=k.texture.format;$=v.has(_e)}if($){const _e=k.texture.type,Me=h.has(_e),me=ze.getClearColor(),we=ze.getClearAlpha(),Ae=me.r,Ve=me.g,$e=me.b;Me?(g[0]=Ae,g[1]=Ve,g[2]=$e,g[3]=we,B.clearBufferuiv(B.COLOR,0,g)):(M[0]=Ae,M[1]=Ve,M[2]=$e,M[3]=we,B.clearBufferiv(B.COLOR,0,M))}else X|=B.COLOR_BUFFER_BIT}F&&(X|=B.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),K&&(X|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),X!==0&&B.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),H=T},this.dispose=function(){n.removeEventListener("webglcontextlost",ft,!1),n.removeEventListener("webglcontextrestored",rt,!1),n.removeEventListener("webglcontextcreationerror",Wn,!1),ze.dispose(),fe.dispose(),ue.dispose(),q.dispose(),ae.dispose(),ie.dispose(),ve.dispose(),re.dispose(),ce.dispose(),be.dispose(),be.removeEventListener("sessionstart",bf),be.removeEventListener("sessionend",Af),Er.stop()};function ft(T){T.preventDefault(),em("WebGLRenderer: Context Lost."),P=!0}function rt(){em("WebGLRenderer: Context Restored."),P=!1;const T=V.autoReset,F=Ne.enabled,K=Ne.autoUpdate,X=Ne.needsUpdate,$=Ne.type;Pe(),V.autoReset=T,Ne.enabled=F,Ne.autoUpdate=K,Ne.needsUpdate=X,Ne.type=$}function Wn(T){it("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function ri(T){const F=T.target;F.removeEventListener("dispose",ri),c0(F)}function c0(T){u0(T),q.remove(T)}function u0(T){const F=q.get(T).programs;F!==void 0&&(F.forEach(function(K){ce.releaseProgram(K)}),T.isShaderMaterial&&ce.releaseShaderCache(T))}this.renderBufferDirect=function(T,F,K,X,$,_e){F===null&&(F=pn);const Me=$.isMesh&&$.matrixWorld.determinantAffine()<0,me=f0(T,F,K,X,$);S.setMaterial(X,Me);let we=K.index,Ae=1;if(X.wireframe===!0){if(we=J.getWireframeAttribute(K),we===void 0)return;Ae=2}const Ve=K.drawRange,$e=K.attributes.position;let Te=Ve.start*Ae,st=(Ve.start+Ve.count)*Ae;_e!==null&&(Te=Math.max(Te,_e.start*Ae),st=Math.min(st,(_e.start+_e.count)*Ae)),we!==null?(Te=Math.max(Te,0),st=Math.min(st,we.count)):$e!=null&&(Te=Math.max(Te,0),st=Math.min(st,$e.count));const Nt=st-Te;if(Nt<0||Nt===1/0)return;ve.setup($,X,me,K,we);let gt,dt=de;if(we!==null&&(gt=le.get(we),dt=ee,dt.setIndex(gt)),$.isMesh)X.wireframe===!0?(S.setLineWidth(X.wireframeLinewidth*Pt()),dt.setMode(B.LINES)):dt.setMode(B.TRIANGLES);else if($.isLine){let Kt=X.linewidth;Kt===void 0&&(Kt=1),S.setLineWidth(Kt*Pt()),$.isLineSegments?dt.setMode(B.LINES):$.isLineLoop?dt.setMode(B.LINE_LOOP):dt.setMode(B.LINE_STRIP)}else $.isPoints?dt.setMode(B.POINTS):$.isSprite&&dt.setMode(B.TRIANGLES);if($.isBatchedMesh)if(at.get("WEBGL_multi_draw"))dt.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else{const Kt=$._multiDrawStarts,xe=$._multiDrawCounts,an=$._multiDrawCount,Qe=we?le.get(we).bytesPerElement:1,Dn=q.get(X).currentProgram.getUniforms();for(let si=0;si<an;si++)Dn.setValue(B,"_gl_DrawID",si),dt.render(Kt[si]/Qe,xe[si])}else if($.isInstancedMesh)dt.renderInstances(Te,Nt,$.count);else if(K.isInstancedBufferGeometry){const Kt=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,xe=Math.min(K.instanceCount,Kt);dt.renderInstances(Te,Nt,xe)}else dt.render(Te,Nt)};function Tf(T,F,K,X){H!==null&&T.isNodeMaterial&&H.setObject(X,T),tt===!0&&Re.setState(T,K,!1),T.transparent===!0&&T.side===Ni&&T.forceSinglePass===!1?(T.side=Mn,T.needsUpdate=!0,ao(T,F,X),T.side=Gr,T.needsUpdate=!0,ao(T,F,X),T.side=Ni):ao(T,F,X)}this.compile=function(T,F,K=null){K===null&&(K=T),H!==null&&H.renderStart(T,F,K),b=ue.get(K),b.init(F),y.push(b),K.traverseVisible(function($){$.isLight&&$.layers.test(F.layers)&&(b.pushLight($),$.castShadow&&b.pushShadow($))}),T!==K&&T.traverseVisible(function($){$.isLight&&$.layers.test(F.layers)&&(b.pushLight($),$.castShadow&&b.pushShadow($))}),b.setupLights(),H!==null&&H.updateLights(b.state.lightsArray),ht=this.localClippingEnabled,tt=Re.init(this.clippingPlanes,ht),tt===!0&&Re.setGlobalState(this.clippingPlanes,F),H!==null&&Ne.render(b.state.shadowsArray,K,F);const X=new Set;return T.traverse(function($){if(!($.isMesh||$.isPoints||$.isLine||$.isSprite))return;const _e=$.material;if(_e)if(Array.isArray(_e))for(let Me=0;Me<_e.length;Me++){const me=_e[Me];Tf(me,K,F,$),X.add(me)}else Tf(_e,K,F,$),X.add(_e)}),b=y.pop(),H!==null&&H.renderEnd(),X},this.compileAsync=function(T,F,K=null){const X=this.compile(T,F,K);return new Promise($=>{function _e(){if(X.forEach(function(Me){const we=q.get(Me).currentProgram;(we===void 0||we.isReady())&&X.delete(Me)}),X.size===0){$(T);return}setTimeout(_e,10)}at.get("KHR_parallel_shader_compile")!==null?_e():setTimeout(_e,10)})};let Sc=null;function d0(T){Sc&&Sc(T)}function bf(){Er.stop()}function Af(){Er.start()}const Er=new Kv;Er.setAnimationLoop(d0),typeof self<"u"&&Er.setContext(self),this.setAnimationLoop=function(T){Sc=T,be.setAnimationLoop(T),T===null?Er.stop():Er.start()},be.addEventListener("sessionstart",bf),be.addEventListener("sessionend",Af),this.render=function(T,F){if(F!==void 0&&F.isCamera!==!0){it("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;H!==null&&H.renderStart(T,F);const K=be.enabled===!0&&be.isPresenting===!0,X=C!==null&&(k===null||K)&&C.begin(N,k);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),be.enabled===!0&&be.isPresenting===!0&&(C===null||C.isCompositing()===!1)&&(be.cameraAutoUpdate===!0&&be.updateCamera(F),F=be.getCamera()),T.isScene===!0&&T.onBeforeRender(N,T,F,k),b=ue.get(T,y.length),b.init(F),b.state.textureUnits=Q.getTextureUnits(),y.push(b),qe.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Xe.setFromProjectionMatrix(qe,pi,F.reversedDepth),ht=this.localClippingEnabled,tt=Re.init(this.clippingPlanes,ht),w=fe.get(T,A.length),w.init(),A.push(w),be.enabled===!0&&be.isPresenting===!0){const Me=N.xr.getDepthSensingMesh();Me!==null&&yc(Me,F,-1/0,N.sortObjects)}yc(T,F,0,N.sortObjects),w.finish(),H!==null&&H.updateLights(b.state.lightsArray),N.sortObjects===!0&&w.sort(Se,Ue),yt=be.enabled===!1||be.isPresenting===!1||be.hasDepthSensing()===!1,yt&&ze.addToRenderList(w,T),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),tt===!0&&Re.beginShadows();const $=b.state.shadowsArray;if(Ne.render($,T,F),tt===!0&&Re.endShadows(),(X&&C.hasRenderPass())===!1){const Me=w.opaque,me=w.transmissive;if(b.setupLights(),F.isArrayCamera){const we=F.cameras;if(me.length>0)for(let Ae=0,Ve=we.length;Ae<Ve;Ae++){const $e=we[Ae];Rf(Me,me,T,$e)}yt&&ze.render(T);for(let Ae=0,Ve=we.length;Ae<Ve;Ae++){const $e=we[Ae];Cf(w,T,$e,$e.viewport)}}else me.length>0&&Rf(Me,me,T,F),yt&&ze.render(T),Cf(w,T,F)}k!==null&&U===0&&(Q.updateMultisampleRenderTarget(k),Q.updateRenderTargetMipmap(k)),X&&C.end(N),T.isScene===!0&&T.onAfterRender(N,T,F),ve.resetDefaultState(),z=-1,D=null,y.pop(),y.length>0?(b=y[y.length-1],Q.setTextureUnits(b.state.textureUnits),tt===!0&&Re.setGlobalState(N.clippingPlanes,b.state.camera)):b=null,A.pop(),A.length>0?w=A[A.length-1]:w=null,H!==null&&H.renderEnd()};function yc(T,F,K,X){if(T.visible===!1)return;if(T.layers.test(F.layers)){if(T.isGroup)K=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(F);else if(T.isLightProbeGrid)b.pushLightProbeGrid(T);else if(T.isLight)b.pushLight(T),T.castShadow&&b.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||T.intersectsFrustum(Xe)){X&&zt.setFromMatrixPosition(T.matrixWorld).applyMatrix4(qe);const Me=ie.update(T),me=T.material;me.visible&&w.push(T,Me,me,K,zt.z,null,F)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||T.intersectsFrustum(Xe))){const Me=ie.update(T),me=T.material;if(X&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),zt.copy(T.boundingSphere.center)):(Me.boundingSphere===null&&Me.computeBoundingSphere(),zt.copy(Me.boundingSphere.center)),zt.applyMatrix4(T.matrixWorld).applyMatrix4(qe)),Array.isArray(me)){const we=Me.groups;for(let Ae=0,Ve=we.length;Ae<Ve;Ae++){const $e=we[Ae],Te=me[$e.materialIndex];Te&&Te.visible&&w.push(T,Me,Te,K,zt.z,$e,F)}}else me.visible&&w.push(T,Me,me,K,zt.z,null,F)}}const _e=T.children;for(let Me=0,me=_e.length;Me<me;Me++)yc(_e[Me],F,K,X)}function Cf(T,F,K,X){const{opaque:$,transmissive:_e,transparent:Me}=T;b.setupLightsView(K),tt===!0&&Re.setGlobalState(N.clippingPlanes,K),X&&S.viewport(Y.copy(X)),$.length>0&&so($,F,K),_e.length>0&&so(_e,F,K),Me.length>0&&so(Me,F,K),S.buffers.depth.setTest(!0),S.buffers.depth.setMask(!0),S.buffers.color.setMask(!0),S.setPolygonOffset(!1)}function Rf(T,F,K,X){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[X.id]===void 0){const Te=at.has("EXT_color_buffer_half_float")||at.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[X.id]=new ni(1,1,{generateMipmaps:!0,type:Te?xi:An,minFilter:Ir,samples:Math.max(4,R.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Ze.workingColorSpace})}const _e=b.state.transmissionRenderTarget[X.id],Me=X.viewport||Y;_e.setSize(Me.z*N.transmissionResolutionScale,Me.w*N.transmissionResolutionScale);const me=N.getRenderTarget(),we=N.getActiveCubeFace(),Ae=N.getActiveMipmapLevel();N.setRenderTarget(_e),N.getClearColor(He),ke=N.getClearAlpha(),ke<1&&N.setClearColor(16777215,.5),N.clear(),yt&&ze.render(K);const Ve=N.toneMapping;N.toneMapping=_i;const $e=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),b.setupLightsView(X),tt===!0&&Re.setGlobalState(N.clippingPlanes,X),so(T,K,X),Q.updateMultisampleRenderTarget(_e),Q.updateRenderTargetMipmap(_e),at.has("WEBGL_multisampled_render_to_texture")===!1){let Te=!1;for(let st=0,Nt=F.length;st<Nt;st++){const gt=F[st],{object:dt,geometry:Kt,material:xe,group:an}=gt;if(xe.side===Ni&&dt.layers.test(X.layers)){const Qe=xe.side;xe.side=Mn,xe.needsUpdate=!0,Pf(dt,K,X,Kt,xe,an),xe.side=Qe,xe.needsUpdate=!0,Te=!0}}Te===!0&&(Q.updateMultisampleRenderTarget(_e),Q.updateRenderTargetMipmap(_e))}N.setRenderTarget(me,we,Ae),N.setClearColor(He,ke),$e!==void 0&&(X.viewport=$e),N.toneMapping=Ve}function so(T,F,K){const X=F.isScene===!0?F.overrideMaterial:null;for(let $=0,_e=T.length;$<_e;$++){const Me=T[$],{object:me,geometry:we,group:Ae}=Me;let Ve=Me.material;Ve.allowOverride===!0&&X!==null&&(Ve=X),me.layers.test(K.layers)&&Pf(me,F,K,we,Ve,Ae)}}function Pf(T,F,K,X,$,_e){H!==null&&$.isNodeMaterial&&H.setObject(T,$),T.onBeforeRender(N,F,K,X,$,_e),T.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),$.onBeforeRender(N,F,K,X,T,_e),$.transparent===!0&&$.side===Ni&&$.forceSinglePass===!1?($.side=Mn,$.needsUpdate=!0,N.renderBufferDirect(K,F,X,$,T,_e),$.side=Gr,$.needsUpdate=!0,N.renderBufferDirect(K,F,X,$,T,_e),$.side=Ni):N.renderBufferDirect(K,F,X,$,T,_e),T.onAfterRender(N,F,K,X,$,_e)}function ao(T,F,K){F.isScene!==!0&&(F=pn);const X=q.get(T),$=b.state.lights,_e=b.state.shadowsArray,Me=$.state.version,me=ce.getParameters(T,$.state,_e,F,K,b.state.lightProbeGridArray),we=ce.getProgramCacheKey(me);let Ae=X.programs;X.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?F.environment:null,X.fog=F.fog;const Ve=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;X.envMap=ae.get(T.envMap||X.environment,Ve),X.envMapRotation=X.environment!==null&&T.envMap===null?F.environmentRotation:T.envMapRotation,Ae===void 0&&(T.addEventListener("dispose",ri),Ae=new Map,X.programs=Ae);let $e=Ae.get(we);if($e!==void 0){if(X.currentProgram===$e&&X.lightsStateVersion===Me)return Lf(T,me),$e}else me.uniforms=ce.getUniforms(T),H!==null&&T.isNodeMaterial&&H.build(T,K,me),T.onBeforeCompile(me,N),$e=ce.acquireProgram(me,we),Ae.set(we,$e),X.uniforms=me.uniforms;const Te=X.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Te.clippingPlanes=Re.uniform),Lf(T,me),X.needsLights=m0(T),X.lightsStateVersion=Me,X.needsLights&&(Te.ambientLightColor.value=$.state.ambient,Te.lightProbe.value=$.state.probe,Te.sunLights.value=$.state.sun,Te.sunLightShadows.value=$.state.sunShadow,Te.directionalLights.value=$.state.directional,Te.directionalLightShadows.value=$.state.directionalShadow,Te.spotLights.value=$.state.spot,Te.spotLightShadows.value=$.state.spotShadow,Te.rectAreaLights.value=$.state.rectArea,Te.ltc_1.value=$.state.rectAreaLTC1,Te.ltc_2.value=$.state.rectAreaLTC2,Te.pointLights.value=$.state.point,Te.pointLightShadows.value=$.state.pointShadow,Te.hemisphereLights.value=$.state.hemi,Te.sunShadowMatrix.value=$.state.sunShadowMatrix,Te.sunShadowCascade.value=$.state.sunShadowCascade,Te.directionalShadowMatrix.value=$.state.directionalShadowMatrix,Te.spotLightMatrix.value=$.state.spotLightMatrix,Te.spotLightMap.value=$.state.spotLightMap,Te.pointShadowMatrix.value=$.state.pointShadowMatrix),X.lightProbeGrid=b.state.lightProbeGridArray.length>0,X.currentProgram=$e,X.uniformsList=null,$e}function Nf(T){if(T.uniformsList===null){const F=T.currentProgram.getUniforms();T.uniformsList=xl.seqWithValue(F.seq,T.uniforms)}return T.uniformsList}function Lf(T,F){const K=q.get(T);K.outputColorSpace=F.outputColorSpace,K.batching=F.batching,K.batchingColor=F.batchingColor,K.instancing=F.instancing,K.instancingColor=F.instancingColor,K.instancingMorph=F.instancingMorph,K.skinning=F.skinning,K.morphTargets=F.morphTargets,K.morphNormals=F.morphNormals,K.morphColors=F.morphColors,K.morphTargetsCount=F.morphTargetsCount,K.numClippingPlanes=F.numClippingPlanes,K.numIntersection=F.numClipIntersection,K.vertexAlphas=F.vertexAlphas,K.vertexTangents=F.vertexTangents,K.toneMapping=F.toneMapping}function h0(T,F){if(T.length===0)return null;if(T.length===1)return T[0].texture!==null?T[0]:null;x.setFromMatrixPosition(F.matrixWorld);for(let K=0,X=T.length;K<X;K++){const $=T[K];if($.texture!==null&&$.boundingBox.containsPoint(x))return $}return null}function f0(T,F,K,X,$){F.isScene!==!0&&(F=pn),Q.resetTextureUnits();const _e=F.fog,Me=X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial?F.environment:null,me=k===null?N.outputColorSpace:k.isXRRenderTarget===!0?k.texture.colorSpace:Ze.workingColorSpace,we=X.isMeshStandardMaterial||X.isMeshLambertMaterial&&!X.envMap||X.isMeshPhongMaterial&&!X.envMap,Ae=ae.get(X.envMap||Me,we),Ve=X.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,$e=!!K.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Te=!!K.morphAttributes.position,st=!!K.morphAttributes.normal,Nt=!!K.morphAttributes.color;let gt=_i;X.toneMapped&&(k===null||k.isXRRenderTarget===!0)&&(gt=N.toneMapping);const dt=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,Kt=dt!==void 0?dt.length:0,xe=q.get(X),an=b.state.lights;if(tt===!0&&(ht===!0||T!==D)){const pt=T===D&&X.id===z;Re.setState(X,T,pt)}let Qe=!1;X.version===xe.__version?(xe.needsLights&&xe.lightsStateVersion!==an.state.version||xe.outputColorSpace!==me||$.isBatchedMesh&&xe.batching===!1||!$.isBatchedMesh&&xe.batching===!0||$.isBatchedMesh&&xe.batchingColor===!0&&$._colorsTexture===null||$.isBatchedMesh&&xe.batchingColor===!1&&$._colorsTexture!==null||$.isInstancedMesh&&xe.instancing===!1||!$.isInstancedMesh&&xe.instancing===!0||$.isSkinnedMesh&&xe.skinning===!1||!$.isSkinnedMesh&&xe.skinning===!0||$.isInstancedMesh&&xe.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&xe.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&xe.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&xe.instancingMorph===!1&&$.morphTexture!==null||xe.envMap!==Ae||X.fog===!0&&xe.fog!==_e||xe.numClippingPlanes!==void 0&&(xe.numClippingPlanes!==Re.numPlanes||xe.numIntersection!==Re.numIntersection)||xe.vertexAlphas!==Ve||xe.vertexTangents!==$e||xe.morphTargets!==Te||xe.morphNormals!==st||xe.morphColors!==Nt||xe.toneMapping!==gt||xe.morphTargetsCount!==Kt||!!xe.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(Qe=!0):(Qe=!0,xe.__version=X.version);let Dn=xe.currentProgram;Qe===!0&&(Dn=ao(X,F,$),H&&X.isNodeMaterial&&H.onUpdateProgram(X,Dn,xe));let si=!1,Wi=!1,Yr=!1;const ut=Dn.getUniforms(),Ct=xe.uniforms;if(S.useProgram(Dn.program)&&(si=!0,Wi=!0,Yr=!0),X.id!==z&&(z=X.id,Wi=!0),xe.needsLights){const pt=h0(b.state.lightProbeGridArray,$);xe.lightProbeGrid!==pt&&(xe.lightProbeGrid=pt,Wi=!0)}if(si||D!==T){S.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),ut.setValue(B,"projectionMatrix",T.projectionMatrix),ut.setValue(B,"viewMatrix",T.matrixWorldInverse);const $i=ut.map.cameraPosition;$i!==void 0&&$i.setValue(B,xt.setFromMatrixPosition(T.matrixWorld)),R.logarithmicDepthBuffer&&ut.setValue(B,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&ut.setValue(B,"isOrthographic",T.isOrthographicCamera===!0),D!==T&&(D=T,Wi=!0,Yr=!0)}if(xe.needsLights&&(an.state.sunShadowMap.length>0&&ut.setValue(B,"sunShadowMap",an.state.sunShadowMap,Q),an.state.directionalShadowMap.length>0&&ut.setValue(B,"directionalShadowMap",an.state.directionalShadowMap,Q),an.state.spotShadowMap.length>0&&ut.setValue(B,"spotShadowMap",an.state.spotShadowMap,Q),an.state.pointShadowMap.length>0&&ut.setValue(B,"pointShadowMap",an.state.pointShadowMap,Q)),$.isSkinnedMesh){ut.setOptional(B,$,"bindMatrix"),ut.setOptional(B,$,"bindMatrixInverse");const pt=$.skeleton;pt&&(pt.boneTexture===null&&pt.computeBoneTexture(),ut.setValue(B,"boneTexture",pt.boneTexture,Q))}$.isBatchedMesh&&(ut.setOptional(B,$,"batchingTexture"),ut.setValue(B,"batchingTexture",$._matricesTexture,Q),ut.setOptional(B,$,"batchingIdTexture"),ut.setValue(B,"batchingIdTexture",$._indirectTexture,Q),ut.setOptional(B,$,"batchingColorTexture"),$._colorsTexture!==null&&ut.setValue(B,"batchingColorTexture",$._colorsTexture,Q));const Xi=K.morphAttributes;if((Xi.position!==void 0||Xi.normal!==void 0||Xi.color!==void 0)&&O.update($,K,Dn),(Wi||xe.receiveShadow!==$.receiveShadow)&&(xe.receiveShadow=$.receiveShadow,ut.setValue(B,"receiveShadow",$.receiveShadow)),(X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial)&&X.envMap===null&&F.environment!==null&&(Ct.envMapIntensity.value=F.environmentIntensity),Ct.dfgLUT!==void 0&&(Ct.dfgLUT.value=Zb()),Wi){if(ut.setValue(B,"toneMappingExposure",N.toneMappingExposure),xe.needsLights&&p0(Ct,Yr),_e&&X.fog===!0&&Ce.refreshFogUniforms(Ct,_e),Ce.refreshMaterialUniforms(Ct,X,ne,Z,b.state.transmissionRenderTarget[T.id]),xe.needsLights&&xe.lightProbeGrid){const pt=xe.lightProbeGrid;Ct.probesSH.value=pt.texture,Ct.probesMin.value.copy(pt.boundingBox.min),Ct.probesMax.value.copy(pt.boundingBox.max),Ct.probesResolution.value.copy(pt.resolution)}xl.upload(B,Nf(xe),Ct,Q)}if(X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(xl.upload(B,Nf(xe),Ct,Q),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&ut.setValue(B,"center",$.center),ut.setValue(B,"modelViewMatrix",$.modelViewMatrix),ut.setValue(B,"normalMatrix",$.normalMatrix),ut.setValue(B,"modelMatrix",$.matrixWorld),X.uniformsGroups!==void 0){const pt=X.uniformsGroups;for(let $i=0,qr=pt.length;$i<qr;$i++){const If=pt[$i];re.update(If,Dn),re.bind(If,Dn)}}return Dn}function p0(T,F){T.ambientLightColor.needsUpdate=F,T.lightProbe.needsUpdate=F,T.sunLights.needsUpdate=F,T.sunLightShadows.needsUpdate=F,T.directionalLights.needsUpdate=F,T.directionalLightShadows.needsUpdate=F,T.pointLights.needsUpdate=F,T.pointLightShadows.needsUpdate=F,T.spotLights.needsUpdate=F,T.spotLightShadows.needsUpdate=F,T.rectAreaLights.needsUpdate=F,T.hemisphereLights.needsUpdate=F}function m0(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return U},this.getRenderTarget=function(){return k},this.setRenderTargetTextures=function(T,F,K){const X=q.get(T);X.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,X.__autoAllocateDepthBuffer===!1&&(X.__useRenderToTexture=!1),q.get(T.texture).__webglTexture=F,q.get(T.depthTexture).__webglTexture=X.__autoAllocateDepthBuffer?void 0:K,X.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,F){const K=q.get(T);K.__webglFramebuffer=F,K.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(T,F=0,K=0){k=T,I=F,U=K;let X=null,$=!1,_e=!1;if(T){const me=q.get(T);if(me.__useDefaultFramebuffer!==void 0){S.bindFramebuffer(B.FRAMEBUFFER,me.__webglFramebuffer),Y.copy(T.viewport),oe.copy(T.scissor),ge=T.scissorTest,S.viewport(Y),S.scissor(oe),S.setScissorTest(ge),z=-1;return}else if(me.__webglFramebuffer===void 0)Q.setupRenderTarget(T);else if(me.__hasExternalTextures)Q.rebindTextures(T,q.get(T.texture).__webglTexture,q.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Ve=T.depthTexture;if(me.__boundDepthTexture!==Ve){if(Ve!==null&&q.has(Ve)&&(T.width!==Ve.image.width||T.height!==Ve.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Q.setupDepthRenderbuffer(T)}}const we=T.texture;(we.isData3DTexture||we.isDataArrayTexture||we.isCompressedArrayTexture)&&(_e=!0);const Ae=q.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Ae[F])?X=Ae[F][K]:X=Ae[F],$=!0):T.samples>0&&Q.useMultisampledRTT(T)===!1?X=q.get(T).__webglMultisampledFramebuffer:Array.isArray(Ae)?X=Ae[K]:X=Ae,Y.copy(T.viewport),oe.copy(T.scissor),ge=T.scissorTest}else Y.copy(ye).multiplyScalar(ne).floor(),oe.copy(je).multiplyScalar(ne).floor(),ge=It;if(K!==0&&(X=W),S.bindFramebuffer(B.FRAMEBUFFER,X)&&S.drawBuffers(T,X),S.viewport(Y),S.scissor(oe),S.setScissorTest(ge),$){const me=q.get(T.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+F,me.__webglTexture,K)}else if(_e){const me=F;for(let we=0;we<T.textures.length;we++){const Ae=q.get(T.textures[we]);B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0+we,Ae.__webglTexture,K,me)}}else if(T!==null&&K!==0){const me=q.get(T.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,me.__webglTexture,K)}z=-1};function Df(T){const F=q.get(T);return(F.__readFormat!==T.format||F.__readType!==T.type)&&(F.__readFormat=T.format,F.__readType=T.type,F.__formatReadable=R.textureFormatReadable(T.format),F.__typeReadable=R.textureTypeReadable(T.type)),F}this.readRenderTargetPixels=function(T,F,K,X,$,_e,Me,me=0){if(!(T&&T.isWebGLRenderTarget)){it("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let we=q.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Me!==void 0&&(we=we[Me]),we){S.bindFramebuffer(B.FRAMEBUFFER,we);try{const Ae=T.textures[me],Ve=Ae.format,$e=Ae.type;T.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+me);const Te=Df(Ae);if(Te.__formatReadable===!1){it("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Te.__typeReadable===!1){it("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=T.width-X&&K>=0&&K<=T.height-$&&B.readPixels(F,K,X,$,he.convert(Ve),he.convert($e),_e)}finally{const Ae=k!==null?q.get(k).__webglFramebuffer:null;S.bindFramebuffer(B.FRAMEBUFFER,Ae)}}},this.readRenderTargetPixelsAsync=async function(T,F,K,X,$,_e,Me,me=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let we=q.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Me!==void 0&&(we=we[Me]),we)if(F>=0&&F<=T.width-X&&K>=0&&K<=T.height-$){S.bindFramebuffer(B.FRAMEBUFFER,we);const Ae=T.textures[me],Ve=Ae.format,$e=Ae.type;T.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+me);const Te=Df(Ae);if(Te.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Te.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const st=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,st),B.bufferData(B.PIXEL_PACK_BUFFER,_e.byteLength,B.STREAM_READ),B.readPixels(F,K,X,$,he.convert(Ve),he.convert($e),0),B.bindBuffer(B.PIXEL_PACK_BUFFER,null);const Nt=k!==null?q.get(k).__webglFramebuffer:null;S.bindFramebuffer(B.FRAMEBUFFER,Nt);const gt=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await qy(B,gt,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,st),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,_e),B.bindBuffer(B.PIXEL_PACK_BUFFER,null),B.deleteBuffer(st),B.deleteSync(gt),_e}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,F=null,K=0){const X=Math.pow(2,-K),$=Math.floor(T.image.width*X),_e=Math.floor(T.image.height*X),Me=F!==null?F.x:0,me=F!==null?F.y:0;Q.setTexture2D(T,0),B.copyTexSubImage2D(B.TEXTURE_2D,K,0,0,Me,me,$,_e),S.unbindTexture()},this.copyTextureToTexture=function(T,F,K=null,X=null,$=0,_e=0){let Me,me,we,Ae,Ve,$e,Te,st,Nt;const gt=T.isCompressedTexture?T.mipmaps[_e]:T.image;if(K!==null)Me=K.max.x-K.min.x,me=K.max.y-K.min.y,we=K.isBox3?K.max.z-K.min.z:1,Ae=K.min.x,Ve=K.min.y,$e=K.isBox3?K.min.z:0;else{const Ct=Math.pow(2,-$);Me=Math.floor(gt.width*Ct),me=Math.floor(gt.height*Ct),T.isDataArrayTexture?we=gt.depth:T.isData3DTexture?we=Math.floor(gt.depth*Ct):we=1,Ae=0,Ve=0,$e=0}X!==null?(Te=X.x,st=X.y,Nt=X.z):(Te=0,st=0,Nt=0);const dt=he.convert(F.format),Kt=he.convert(F.type);let xe;F.isData3DTexture?(Q.setTexture3D(F,0),xe=B.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(Q.setTexture2DArray(F,0),xe=B.TEXTURE_2D_ARRAY):(Q.setTexture2D(F,0),xe=B.TEXTURE_2D),S.activeTexture(B.TEXTURE0),S.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,F.flipY),S.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),S.pixelStorei(B.UNPACK_ALIGNMENT,F.unpackAlignment);const an=S.getParameter(B.UNPACK_ROW_LENGTH),Qe=S.getParameter(B.UNPACK_IMAGE_HEIGHT),Dn=S.getParameter(B.UNPACK_SKIP_PIXELS),si=S.getParameter(B.UNPACK_SKIP_ROWS),Wi=S.getParameter(B.UNPACK_SKIP_IMAGES);S.pixelStorei(B.UNPACK_ROW_LENGTH,gt.width),S.pixelStorei(B.UNPACK_IMAGE_HEIGHT,gt.height),S.pixelStorei(B.UNPACK_SKIP_PIXELS,Ae),S.pixelStorei(B.UNPACK_SKIP_ROWS,Ve),S.pixelStorei(B.UNPACK_SKIP_IMAGES,$e);const Yr=T.isDataArrayTexture||T.isData3DTexture,ut=F.isDataArrayTexture||F.isData3DTexture;if(T.isDepthTexture){const Ct=q.get(T),Xi=q.get(F),pt=q.get(Ct.__renderTarget),$i=q.get(Xi.__renderTarget);S.bindFramebuffer(B.READ_FRAMEBUFFER,pt.__webglFramebuffer),S.bindFramebuffer(B.DRAW_FRAMEBUFFER,$i.__webglFramebuffer);for(let qr=0;qr<we;qr++)Yr&&(B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,q.get(T).__webglTexture,$,$e+qr),B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,q.get(F).__webglTexture,_e,Nt+qr)),B.blitFramebuffer(Ae,Ve,Me,me,Te,st,Me,me,B.DEPTH_BUFFER_BIT,B.NEAREST);S.bindFramebuffer(B.READ_FRAMEBUFFER,null),S.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else if($!==0||T.isRenderTargetTexture||q.has(T)){const Ct=q.get(T),Xi=q.get(F);S.bindFramebuffer(B.READ_FRAMEBUFFER,L),S.bindFramebuffer(B.DRAW_FRAMEBUFFER,j);for(let pt=0;pt<we;pt++)Yr?B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Ct.__webglTexture,$,$e+pt):B.framebufferTexture2D(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Ct.__webglTexture,$),ut?B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Xi.__webglTexture,_e,Nt+pt):B.framebufferTexture2D(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Xi.__webglTexture,_e),$!==0?B.blitFramebuffer(Ae,Ve,Me,me,Te,st,Me,me,B.COLOR_BUFFER_BIT,B.NEAREST):ut?B.copyTexSubImage3D(xe,_e,Te,st,Nt+pt,Ae,Ve,Me,me):B.copyTexSubImage2D(xe,_e,Te,st,Ae,Ve,Me,me);S.bindFramebuffer(B.READ_FRAMEBUFFER,null),S.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else ut?T.isDataTexture||T.isData3DTexture?B.texSubImage3D(xe,_e,Te,st,Nt,Me,me,we,dt,Kt,gt.data):F.isCompressedArrayTexture?B.compressedTexSubImage3D(xe,_e,Te,st,Nt,Me,me,we,dt,gt.data):B.texSubImage3D(xe,_e,Te,st,Nt,Me,me,we,dt,Kt,gt):T.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,_e,Te,st,Me,me,dt,Kt,gt.data):T.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,_e,Te,st,gt.width,gt.height,dt,gt.data):B.texSubImage2D(B.TEXTURE_2D,_e,Te,st,Me,me,dt,Kt,gt);S.pixelStorei(B.UNPACK_ROW_LENGTH,an),S.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Qe),S.pixelStorei(B.UNPACK_SKIP_PIXELS,Dn),S.pixelStorei(B.UNPACK_SKIP_ROWS,si),S.pixelStorei(B.UNPACK_SKIP_IMAGES,Wi),_e===0&&F.generateMipmaps&&B.generateMipmap(xe),S.unbindTexture()},this.initRenderTarget=function(T){q.get(T).__webglFramebuffer===void 0&&Q.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?Q.setTextureCube(T,0):T.isData3DTexture?Q.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?Q.setTexture2DArray(T,0):Q.setTexture2D(T,0),S.unbindTexture()},this.resetState=function(){I=0,U=0,k=null,S.reset(),ve.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return pi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=Ze._getDrawingBufferColorSpace(e),n.unpackColorSpace=Ze._getUnpackColorSpace()}}const Km={type:"change"},xf={type:"start"},r0={type:"end"},el=new gf,Zm=new Pi,Jb=Math.cos(70*Ov.DEG2RAD),Ut=new G,mn=2*Math.PI,lt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Au=1e-6;class eA extends eE{constructor(e,n=null){super(e,n),this.state=lt.NONE,this.target=new G,this.cursor=new G,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ls.ROTATE,MIDDLE:Ls.DOLLY,RIGHT:Ls.PAN},this.touches={ONE:ws.ROTATE,TWO:ws.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new G,this._lastQuaternion=new _r,this._lastTargetPosition=new G,this._quat=new _r().setFromUnitVectors(e.up,new G(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Tm,this._sphericalDelta=new Tm,this._scale=1,this._panOffset=new G,this._rotateStart=new Oe,this._rotateEnd=new Oe,this._rotateDelta=new Oe,this._panStart=new Oe,this._panEnd=new Oe,this._panDelta=new Oe,this._dollyStart=new Oe,this._dollyEnd=new Oe,this._dollyDelta=new Oe,this._dollyDirection=new G,this._mouse=new Oe,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=nA.bind(this),this._onPointerDown=tA.bind(this),this._onPointerUp=iA.bind(this),this._onContextMenu=uA.bind(this),this._onMouseWheel=aA.bind(this),this._onKeyDown=oA.bind(this),this._onTouchStart=lA.bind(this),this._onTouchMove=cA.bind(this),this._onMouseDown=rA.bind(this),this._onMouseMove=sA.bind(this),this._interceptControlDown=dA.bind(this),this._interceptControlUp=hA.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=lt.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();const e=this.domElement.getRootNode();e.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),e.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Km),this.update(),this.state=lt.NONE}pan(e,n){this._pan(e,n),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const n=this.object.position;Ut.copy(n).sub(this.target),Ut.applyQuaternion(this._quat),this._spherical.setFromVector3(Ut),this.autoRotate&&this.state===lt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=mn:i>Math.PI&&(i-=mn),r<-Math.PI?r+=mn:r>Math.PI&&(r-=mn),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=a!=this._spherical.radius}if(Ut.setFromSpherical(this._spherical),Ut.applyQuaternion(this._quatInverse),n.copy(this.target).add(Ut),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=Ut.length();a=this._clampDistance(o*this._scale);const l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){const o=new G(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;const c=new G(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=Ut.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(el.origin.copy(this.object.position),el.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(el.direction))<Jb?this.object.lookAt(this.target):(Zm.setFromNormalAndCoplanarPoint(this.object.up,this.target),el.intersectPlane(Zm,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>Au||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Au||this._lastTargetPosition.distanceToSquared(this.target)>Au?(this.dispatchEvent(Km),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?mn/60*this.autoRotateSpeed*e:mn/60/60*this.autoRotateSpeed}_getZoomScale(e){const n=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*n)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,n){Ut.setFromMatrixColumn(n,0),Ut.multiplyScalar(-e),this._panOffset.add(Ut)}_panUp(e,n){this.screenSpacePanning===!0?Ut.setFromMatrixColumn(n,1):(Ut.setFromMatrixColumn(n,0),Ut.crossVectors(this.object.up,Ut)),Ut.multiplyScalar(e),this._panOffset.add(Ut)}_pan(e,n){const i=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;Ut.copy(r).sub(this.target);let s=Ut.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/i.clientHeight,this.object.matrix),this._panUp(2*n*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(n*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,n){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),r=e-i.left,s=n-i.top,a=i.width,o=i.height;this._mouse.x=r/a*2-1,this._mouse.y=-(s/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(mn*this._rotateDelta.x/n.clientHeight),this._rotateUp(mn*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let n=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(mn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),n=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-mn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),n=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(mn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),n=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-mn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),n=!0;break}n&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._panStart.set(i,r)}}_handleTouchStartDolly(e){const n=this._getSecondPointerPosition(e),i=e.pageX-n.x,r=e.pageY-n.y,s=Math.sqrt(i*i+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),s=.5*(e.pageY+i.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(mn*this._rotateDelta.x/n.clientHeight),this._rotateUp(mn*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const n=this._getSecondPointerPosition(e),i=e.pageX-n.x,r=e.pageY-n.y,s=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+n.x)*.5,o=(e.pageY+n.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId){this._pointers.splice(n,1);return}}_isTrackingPointer(e){for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId)return!0;return!1}_trackPointer(e){let n=this._pointerPositions[e.pointerId];n===void 0&&(n=new Oe,this._pointerPositions[e.pointerId]=n),n.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const n=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[n]}_customWheelEvent(e){const n=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(n){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function tA(t){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(t.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(t)&&(this._addPointer(t),t.pointerType==="touch"?this._onTouchStart(t):this._onMouseDown(t),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function nA(t){this.enabled!==!1&&(t.pointerType==="touch"?this._onTouchMove(t):this._onMouseMove(t))}function iA(t){switch(this._removePointer(t),this._pointers.length){case 0:this.domElement.releasePointerCapture(t.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(r0),this.state=lt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],n=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:n.x,pageY:n.y});break}}function rA(t){let e;switch(t.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Ls.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(t),this.state=lt.DOLLY;break;case Ls.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=lt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=lt.ROTATE}break;case Ls.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=lt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=lt.PAN}break;default:this.state=lt.NONE}this.state!==lt.NONE&&this.dispatchEvent(xf)}function sA(t){switch(this.state){case lt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(t);break;case lt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(t);break;case lt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(t);break}}function aA(t){this.enabled===!1||this.enableZoom===!1||this.state!==lt.NONE||(t.preventDefault(),this.dispatchEvent(xf),this._handleMouseWheel(this._customWheelEvent(t)),this.dispatchEvent(r0))}function oA(t){this.enabled!==!1&&this._handleKeyDown(t)}function lA(t){switch(this._trackPointer(t),this._pointers.length){case 1:switch(this.touches.ONE){case ws.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(t),this.state=lt.TOUCH_ROTATE;break;case ws.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(t),this.state=lt.TOUCH_PAN;break;default:this.state=lt.NONE}break;case 2:switch(this.touches.TWO){case ws.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(t),this.state=lt.TOUCH_DOLLY_PAN;break;case ws.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(t),this.state=lt.TOUCH_DOLLY_ROTATE;break;default:this.state=lt.NONE}break;default:this.state=lt.NONE}this.state!==lt.NONE&&this.dispatchEvent(xf)}function cA(t){switch(this._trackPointer(t),this.state){case lt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(t),this.update();break;case lt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(t),this.update();break;case lt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(t),this.update();break;case lt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(t),this.update();break;default:this.state=lt.NONE}}function uA(t){this.enabled!==!1&&t.preventDefault()}function dA(t){t.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function hA(t){t.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const ch={match:"#6b7f99",conflict:"#c8321e",info:"#d99a2b",neutral:"#c9d2dc"};function s0(){try{const t=document.createElement("canvas");return!!(t.getContext("webgl2")||t.getContext("webgl"))}catch{return!1}}function fA({mesh:t,onFail:e}){const n=te.useRef(null);return te.useEffect(()=>{const i=n.current;if(!i)return;let r;try{if(!s0())throw new Error("WebGL is not available in this browser");r=new Qb({antialias:!0,alpha:!0,failIfMajorPerformanceCaveat:!1}),r.setClearColor(0,0)}catch(A){e==null||e(A.message);return}const s=new bM,a=new kn(38,i.clientWidth/i.clientHeight,.1,1e5);r.setPixelRatio(Math.min(2,window.devicePixelRatio)),r.setSize(i.clientWidth,i.clientHeight),i.appendChild(r.domElement),r.domElement.addEventListener("webglcontextlost",A=>{A.preventDefault(),e==null||e("WebGL context lost")});const o=[],l=[],c=new Ke;for(const A of t.faces){c.set(ch[A.status]||ch.neutral);for(const[y,C,N]of A.tris)for(const P of[y,C,N]){const H=t.vertices[P];o.push(H[0],H[1],H[2]),l.push(c.r,c.g,c.b)}}const f=new jn;f.setAttribute("position",new En(o,3)),f.setAttribute("color",new En(l,3)),f.computeVertexNormals();const p=new Si(f,new WM({vertexColors:!0,metalness:.1,roughness:.75,flatShading:!0})),d=new OM(new BM(f,25),new jv({color:"#1b2430",transparent:!0,opacity:.55}));s.add(p),s.add(d),s.add(new YM("#ffffff","#8090a0",1.1));const m=new ZM("#ffffff",1.4);m.position.set(1,2,3),s.add(m);const[_,E]=t.bbox,v=new G((_[0]+E[0])/2,(_[1]+E[1])/2,(_[2]+E[2])/2),g=Math.max(.5,.5*Math.hypot(E[0]-_[0],E[1]-_[1],E[2]-_[2]))/Math.sin(Ov.degToRad(a.fov/2))*1.05/Math.min(1,a.aspect);a.up.set(0,0,1),a.position.copy(v).add(new G(-1.1,-1.4,1).normalize().multiplyScalar(g)),a.lookAt(v);const M=new eA(a,r.domElement);M.target.copy(v),M.enableDamping=!0,M.update();let x=0;const w=()=>{M.update(),r.render(s,a),x=requestAnimationFrame(w)};w();const b=()=>{a.aspect=i.clientWidth/i.clientHeight,a.updateProjectionMatrix(),r.setSize(i.clientWidth,i.clientHeight)};return window.addEventListener("resize",b),()=>{cancelAnimationFrame(x),window.removeEventListener("resize",b),M.dispose(),r.dispose(),f.dispose(),r.domElement.parentNode===i&&i.removeChild(r.domElement)}},[t,e]),u.jsx("div",{className:"viewer3d",ref:n})}function pA({setCrumb:t}){const e=ty(),[n,i]=te.useState([]),[r,s]=te.useState(""),[a,o]=te.useState(null),[l,c]=te.useState(!1),[f,p]=te.useState(null),[d,m]=te.useState(""),[_,E]=te.useState(()=>s0()?"":"WebGL is not available in this browser"),[v,h]=te.useState("iso");te.useEffect(()=>{t(["Drawing vs STEP model",""]),De.jobs().then(w=>{var A;i(w);const b=w.filter(y=>y.has_step).sort((y,C)=>y.created.localeCompare(C.created));s(((A=b[0]||w[0])==null?void 0:A.id)||"")}).catch(w=>Fe(w.message,!0))},[t]);const g=async(w=r)=>{if(w){c(!0),p(null),m("");try{o(await De.modelCheck(w))}catch(b){Fe(b.message,!0)}try{p(await De.mesh(w))}catch(b){m(b.message)}c(!1)}};te.useEffect(()=>{r&&g(r)},[r]);const M=async w=>{w.preventDefault();const b=new FormData(w.currentTarget);try{await De.addFiles(r,b),i(await De.jobs()),g()}catch(A){Fe(A.message,!0)}},x=a==null?void 0:a.model;return u.jsxs("div",{className:"page",children:[u.jsx("h2",{children:"Drawing vs STEP model"}),u.jsx("p",{className:"sub",children:"Cylindrical features (holes, bores, bosses) read from the STEP file are matched against hole callouts and diameter dimensions on each drawing of the job."}),u.jsx("div",{className:"card",children:u.jsxs("div",{className:"row",children:[u.jsxs("label",{className:"field",children:["Job",u.jsx("select",{value:r,onChange:w=>s(w.target.value),children:n.map(w=>u.jsxs("option",{value:w.id,children:[w.name,w.has_step?" · STEP":""]},w.id))})]}),u.jsx("button",{className:"btn p",style:{marginTop:16},onClick:()=>g(),disabled:l,children:"Run check"}),l&&u.jsx(nn,{}),u.jsxs("form",{className:"row",onSubmit:M,children:[u.jsxs("label",{className:"field",children:["Attach STEP",u.jsx("input",{type:"file",name:"step",accept:".stp,.step"})]}),u.jsx("button",{className:"btn sm",style:{marginTop:16},children:"Attach and re-run"})]})]})}),(a==null?void 0:a.error)&&u.jsx("div",{className:"card warn",children:a.error}),a&&!a.error&&u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"grid2",style:{gridTemplateColumns:"1.1fr 1fr"},children:[u.jsxs("div",{className:"card",children:[u.jsxs("h3",{children:["3D model",f!=null&&f.drawing?u.jsxs("span",{className:"small",children:[" · checked against ",f.drawing]}):null]}),f?u.jsxs(u.Fragment,{children:[_?u.jsxs("div",{children:[u.jsx("img",{className:"viewer3d",src:`/api/jobs/${r}/model/preview.png?view=${v}&theme=${e}&t=${f.triangles}`,alt:"model preview"}),u.jsxs("div",{className:"row",style:{marginTop:6},children:[u.jsxs("span",{className:"small",children:["Software preview (",_,"). View:"]}),["iso","top","front","side"].map(w=>u.jsx("button",{className:"btn sm"+(v===w?" p":""),onClick:()=>h(w),children:w},w))]})]}):u.jsx(fA,{mesh:f,onFail:E}),u.jsx("div",{className:"legend3d",children:Object.entries({match:"matches the drawing",conflict:"size or count conflict",info:"not called out on this sheet",neutral:"other faces"}).map(([w,b])=>u.jsxs("span",{children:[u.jsx("i",{style:{background:ch[w]}}),b]},w))}),u.jsxs("div",{className:"small",style:{marginTop:6},children:[f.triangles," triangles · ",f.engine," · ",_?"rendered on the server":"drag to orbit, wheel to zoom",". Cylinders: ",f.legend.map(w=>`Ø${w.diameter} (${w.status})`).join(", ")]})]}):u.jsx(vn,{children:d||u.jsx(nn,{})})]}),u.jsxs("div",{className:"card",children:[u.jsxs("h3",{children:["Model ",(x==null?void 0:x.file)||""," ",x!=null&&x.product?"· product "+x.product:""," · units ",(x==null?void 0:x.units)||"?",x!=null&&x.schema?" · "+x.schema:"",x!=null&&x.engine?u.jsxs("span",{className:"small",children:[" · read with ",x.engine]}):null]}),u.jsxs("div",{className:"row",children:[((x==null?void 0:x.cylinders)||[]).map((w,b)=>u.jsxs("span",{className:"pill chip",children:["Ø",w.diameter," × ",w.surfaces]},b)),(x==null?void 0:x.extents)&&u.jsxs("span",{className:"small",children:["extents ",x.extents.x," × ",x.extents.y,x.extents.z!=null?" × "+x.extents.z:""]})]}),u.jsx("div",{className:"small",style:{marginTop:8},children:"Feature matching tolerance 0.05 mm on size, 0.5 mm on position. Cylinders are grouped by diameter; two half-faces of one hole count once."})]})]}),a.drawings.length?a.drawings.map(w=>w.skipped?u.jsxs("div",{children:[u.jsxs("h3",{style:{margin:"14px 0 6px"},children:[w.file," ",u.jsx(Je,{kind:"info",children:"not checked"})]}),u.jsx("div",{className:"small",style:{marginBottom:8},children:w.skipped})]},w.file):u.jsxs("div",{children:[u.jsxs("h3",{style:{margin:"14px 0 6px"},children:[w.file," ",w.conflicts?u.jsxs(Je,{kind:"critical",children:[w.conflicts," conflicts"]}):null," ",u.jsxs(Je,{kind:"ok",children:[w.matches," match"]})]}),u.jsxs("table",{children:[u.jsx("thead",{children:u.jsxs("tr",{children:[u.jsx("th",{children:"Feature (drawing)"}),u.jsx("th",{children:"Drawing"}),u.jsx("th",{children:"Model"}),u.jsx("th",{children:"Status"}),u.jsx("th",{children:"Detail"})]})}),u.jsx("tbody",{children:w.rows.map((b,A)=>u.jsxs("tr",{children:[u.jsx("td",{children:b.feature}),u.jsx("td",{className:"mono",children:b.drawing}),u.jsx("td",{className:"mono",children:b.model}),u.jsx("td",{children:u.jsx(Je,{kind:b.status,children:b.status})}),u.jsx("td",{className:"small",children:b.detail||""})]},A))})]})]},w.file)):u.jsx(vn,{children:"No drawings in this job."})]})]})}function mA({setCrumb:t}){const[e,n]=te.useState([]),[i,r]=te.useState([]),[s,a]=te.useState(""),[o,l]=te.useState(""),[c,f]=te.useState(""),[p,d]=te.useState(null),[m,_]=te.useState(""),[E,v]=te.useState(""),[h,g]=te.useState(""),[M,x]=te.useState(null),[w,b]=te.useState("");te.useEffect(()=>{t(["Documentation and templates",""]),De.jobs().then(P=>{var H;n(P),a(((H=jl(P)[0])==null?void 0:H.value)||"")}).catch(P=>Fe(P.message,!0)),De.templates().then(r).catch(()=>{})},[t]);const A=async P=>{const[H,W]=s.split("|");_(P),b("");try{d(await De.doc(H,P,{drawing:W,qty:o,po:c}))}catch(L){Fe(L.message,!0)}_("")},y=async()=>{if(p)try{const P=await De.release(p.name);b(`${P.storage}: ${P.location}`),Fe("Released to "+P.storage)}catch(P){Fe(P.message,!0)}},C=async P=>{_("bulk");try{x(await De.bulk(E,h,P))}catch(H){Fe(H.message,!0)}_("")},N=P=>{const H=P.indexOf(E);return H<0?u.jsx(u.Fragment,{children:P}):u.jsxs(u.Fragment,{children:[P.slice(0,H),u.jsx("del",{children:E}),u.jsx("ins",{children:h}),P.slice(H+E.length)]})};return u.jsxs("div",{className:"page",children:[u.jsx("h2",{children:"Documentation and templates"}),u.jsx("p",{className:"sub",children:"Fill the shop's standard templates from the drawing data, or change every template at once with tracked changes."}),u.jsxs("div",{className:"grid2",children:[u.jsxs("div",{className:"card",children:[u.jsx("h3",{children:"Generate from a drawing"}),u.jsxs("div",{className:"row",children:[u.jsxs("label",{className:"field",children:["Drawing",u.jsx("select",{value:s,onChange:P=>a(P.target.value),children:jl(e).map(P=>u.jsx("option",{value:P.value,children:P.label},P.value))})]}),u.jsxs("label",{className:"field",children:["Qty",u.jsx("input",{size:6,value:o,onChange:P=>l(P.target.value)})]}),u.jsxs("label",{className:"field",children:["PO",u.jsx("input",{size:8,value:c,onChange:P=>f(P.target.value)})]})]}),u.jsxs("div",{className:"row",style:{marginTop:10},children:[u.jsx("button",{className:"btn p",disabled:!!m,onClick:()=>A("inspection-plan"),children:"Inspection plan (xlsx)"}),u.jsx("button",{className:"btn p",disabled:!!m,onClick:()=>A("coc"),children:"Certificate of conformance (docx)"}),u.jsx("button",{className:"btn p",disabled:!!m,onClick:()=>A("work-instruction"),children:"Work instruction (docx)"}),m&&m!=="bulk"&&u.jsx(nn,{})]}),p&&u.jsxs("div",{style:{marginTop:10},children:[u.jsxs("div",{className:"row",children:[u.jsx(Je,{kind:"ok",children:"generated"}),u.jsxs("a",{className:"btn sm",href:p.url,children:["Download ",p.name]}),u.jsx("button",{className:"btn sm",onClick:y,children:"Approve and release"}),p.images!=null&&u.jsxs("span",{className:"small",children:[p.images," callout image",p.images===1?"":"s"]}),w&&u.jsxs("span",{className:"small",children:["Released → ",w]})]}),p.characteristics&&u.jsxs("table",{style:{marginTop:8},children:[u.jsx("thead",{children:u.jsxs("tr",{children:[u.jsx("th",{children:"#"}),u.jsx("th",{children:"Characteristic"}),u.jsx("th",{children:"Nominal"}),u.jsx("th",{children:"Tol"}),u.jsx("th",{children:"Method"}),u.jsx("th",{children:"Freq"})]})}),u.jsx("tbody",{children:p.characteristics.map(P=>u.jsxs("tr",{children:[u.jsx("td",{children:P.n}),u.jsx("td",{children:P.characteristic}),u.jsx("td",{className:"mono",children:P.nominal}),u.jsx("td",{className:"mono",children:P.tol}),u.jsx("td",{children:P.method}),u.jsx("td",{children:P.freq})]},P.n))})]})]})]}),u.jsxs("div",{className:"card",children:[u.jsx("h3",{children:"Template library"}),u.jsxs("table",{children:[u.jsx("thead",{children:u.jsxs("tr",{children:[u.jsx("th",{children:"Template"}),u.jsx("th",{children:"Type"}),u.jsx("th",{children:"Use"})]})}),u.jsx("tbody",{children:i.map(P=>u.jsxs("tr",{children:[u.jsx("td",{children:u.jsx("a",{href:`/api/templates/${P.name}`,children:P.name})}),u.jsx("td",{children:P.kind}),u.jsx("td",{children:P.description})]},P.name))})]})]})]}),u.jsxs("div",{className:"card",children:[u.jsx("h3",{children:"Bulk template edit (tracked changes)"}),u.jsx("p",{className:"small",style:{margin:"0 0 8px"},children:"Example: the customer superseded QS-114 Rev B with Rev D. Update every template that references it. Word files receive tracked changes for review; Excel files get a change-log sheet."}),u.jsxs("div",{className:"row",children:[u.jsxs("label",{className:"field",children:["Find",u.jsx("input",{value:E,size:24,placeholder:"e.g. QS-114 Rev B",onChange:P=>v(P.target.value)})]}),u.jsxs("label",{className:"field",children:["Replace with",u.jsx("input",{value:h,size:24,placeholder:"e.g. QS-114 Rev D",onChange:P=>g(P.target.value)})]}),u.jsx("button",{className:"btn",style:{marginTop:16},disabled:!!m||!E.trim(),onClick:()=>C(!0),children:"Preview"}),u.jsx("button",{className:"btn p",style:{marginTop:16},disabled:!!m||!E.trim(),onClick:()=>C(!1),children:"Apply with tracked changes"}),m==="bulk"&&u.jsx(nn,{})]}),M&&u.jsxs("div",{style:{marginTop:10},children:[u.jsx("div",{className:"row",style:{marginBottom:8},children:M.total?u.jsxs(Je,{kind:M.preview?"medium":"ok",children:[M.total," occurrence",M.total!==1?"s":""," in ",M.results.length," template",M.results.length!==1?"s":"",M.preview?" (preview, nothing written)":" (written)"]}):u.jsx(Je,{kind:"info",children:"no matches"})}),M.results.map(P=>{var H;return u.jsxs("div",{className:"card plain",children:[u.jsxs("div",{className:"row between",children:[u.jsx("strong",{children:P.file}),u.jsxs("span",{className:"small",children:[P.kind," · ",P.count," change",P.count!==1?"s":""," · ",P.mode]}),!M.preview&&u.jsx("a",{className:"btn sm",href:((H=M.files.find(W=>W.name===P.file))==null?void 0:H.url)||"#",children:"Download"})]}),P.previews.map((W,L)=>u.jsxs("div",{className:"diff small",style:{marginTop:6},children:[W.cell?u.jsxs("span",{className:"mono",children:[W.cell," "]}):null,N(W.before)]},L))]},P.file)})]})]})]})}const gA=["What finish is called out on each drawing?","Which datums are defined and which are referenced?","Which thread callouts do not match their hole size?","Which drawings reference a superseded spec?","Is the PO at the right revision?","What does Y14.5 say about datum references?"];function _A({setCrumb:t,status:e}){const[n,i]=te.useState([]),[r,s]=te.useState(""),[a,o]=te.useState([]),[l,c]=te.useState(""),f=te.useRef(null);te.useEffect(()=>{t(["Ask the package",""]),De.jobs().then(d=>{var m;i(d),s(((m=d[0])==null?void 0:m.id)||"")}).catch(d=>Fe(d.message,!0))},[t]),te.useEffect(()=>{var d;(d=f.current)==null||d.scrollIntoView({block:"nearest"})},[a]);const p=async d=>{if(!d.trim()||!r)return;c("");const m=a.filter(_=>!_.pending).map(_=>({role:_.role,content:_.content}));o(_=>[..._,{role:"user",content:d},{role:"assistant",content:"…",pending:!0}]);try{const _=await De.ask(r,d,m);o(E=>[...E.filter(v=>!v.pending),{role:"assistant",content:_.answer,citations:_.citations,mode:_.mode,model:_.model,tools:_.tools_used}])}catch(_){o(E=>E.filter(v=>!v.pending)),Fe(_.message,!0)}};return u.jsxs("div",{className:"page",children:[u.jsx("h2",{children:"Ask the drawing package"}),u.jsxs("p",{className:"sub",children:["Plain-language questions over everything extracted from the job: title blocks, notes, dimensions, GD&T, parts lists, findings and reports, plus the spec library and standard excerpts. Every answer cites its source. ",e!=null&&e.claude?"Answered by the Claude agent with tools.":"Running in local planner mode (no Anthropic credentials found)."]}),u.jsxs("div",{className:"row",style:{marginBottom:10},children:[u.jsxs("label",{className:"field",children:["Job",u.jsx("select",{value:r,onChange:d=>{s(d.target.value),o([])},children:n.map(d=>u.jsx("option",{value:d.id,children:d.name},d.id))})]}),u.jsx("div",{className:"row",style:{marginTop:14},children:gA.map(d=>u.jsx("button",{className:"btn sm",onClick:()=>p(d),children:d},d))})]}),u.jsxs("div",{className:"chat",children:[a.map((d,m)=>{var _,E;return d.role==="user"?u.jsx("div",{className:"msg q",children:d.content},m):u.jsxs("div",{className:"msg a",children:[d.content,!!((_=d.citations)!=null&&_.length)&&u.jsx("div",{children:d.citations.map((v,h)=>u.jsx("span",{className:"cite",children:v},h))}),!d.pending&&u.jsxs("div",{className:"small",style:{marginTop:4},children:[d.mode==="agent"?`Claude agent · ${d.model||""}`:"local planner",(E=d.tools)!=null&&E.length?` · tools: ${d.tools.join(", ")}`:""]})]},m)}),u.jsx("div",{ref:f})]}),u.jsxs("form",{className:"row",style:{marginTop:12,maxWidth:900},onSubmit:d=>{d.preventDefault(),p(l)},children:[u.jsx("input",{value:l,onChange:d=>c(d.target.value),className:"text",placeholder:"Ask about this package…",autoComplete:"off"}),u.jsx("button",{className:"btn p",children:"Ask"})]})]})}function vA({setCrumb:t}){const[e,n]=te.useState([]);return te.useEffect(()=>{t(["Audit log",""]),De.audit().then(n).catch(i=>Fe(i.message,!0))},[t]),u.jsxs("div",{className:"page",children:[u.jsx("h2",{children:"Audit log"}),u.jsx("p",{className:"sub",children:"Every check, decision, generated document and template edit, newest first."}),u.jsxs("table",{children:[u.jsx("thead",{children:u.jsxs("tr",{children:[u.jsx("th",{children:"Time"}),u.jsx("th",{children:"Event"}),u.jsx("th",{children:"Details"})]})}),u.jsx("tbody",{children:e.length?e.map((i,r)=>u.jsxs("tr",{children:[u.jsx("td",{className:"mono",children:i.time}),u.jsx("td",{children:i.event}),u.jsx("td",{className:"small",children:Object.entries(i).filter(([s])=>!["time","event"].includes(s)).map(([s,a])=>`${s}: ${Array.isArray(a)?a.join(", "):String(a)}`).join(" · ")})]},r)):u.jsx("tr",{children:u.jsx("td",{colSpan:3,className:"empty",children:"Nothing logged yet."})})})]})]})}const Qm=[["customers","Customers"],["specs","Spec library"],["revisions","Released revisions"]],xA=["critical","high","medium","low"],ui=(t,e)=>`${t} ${e}${t===1?"":"s"}`,Cu=t=>t.kind+":"+t.text;function SA({route:t,go:e,setCrumb:n}){const i=t.tab||"customers";return te.useEffect(()=>{var r;n(["Setup",((r=Qm.find(s=>s[0]===i))==null?void 0:r[1])||""])},[i,n]),u.jsxs("div",{className:"page",children:[u.jsx("h2",{children:"Setup"}),u.jsx("p",{className:"sub",children:"Set up a customer once: the wording of its title blocks, the specifications its drawings call out and its released revisions. New uploads use the setup straight away. To apply it to drawings already in the queue, re-check the customer."}),u.jsx("div",{className:"tabs page-tabs",children:Qm.map(([r,s])=>u.jsx("button",{className:i===r?"on":"",onClick:()=>e({view:"setup",tab:r,customer:r==="customers"?t.customer:void 0}),children:s},r))}),i==="customers"?u.jsx(MA,{route:t,go:e}):i==="specs"?u.jsx(EA,{}):u.jsx(wA,{})]})}async function yA(t,e=3e5){const n=Date.now();for(;;){if((await Promise.all(t.map(r=>De.jobStatus(r).catch(()=>({status:"done"}))))).every(r=>r.status==="done"||r.status==="error")||Date.now()-n>e)return;await new Promise(r=>setTimeout(r,1200))}}function MA({route:t,go:e}){var j;const[n,i]=te.useState(null),[r,s]=te.useState(null),[a,o]=te.useState([]),[l,c]=te.useState(!1),[f,p]=te.useState(""),[d,m]=te.useState(""),[_,E]=te.useState({}),v=t.customer||((j=n==null?void 0:n[0])==null?void 0:j.slug),h=te.useCallback(()=>De.customers().then(i).catch(I=>Fe(I.message,!0)),[]),g=te.useCallback(async I=>{try{const U=await De.customer(I);s(U),o(U.fields.map(k=>({...k,labels:[...k.labels],tags:[...k.tags]}))),c(!1),E({})}catch(U){s(null),Fe(U.message,!0)}},[]);te.useEffect(()=>{h()},[h]),te.useEffect(()=>{v?g(v):s(null)},[v,g]);const M=I=>{I===v||l&&!confirm("Discard the unsaved changes for this customer?")||e({view:"setup",tab:"customers",customer:I})},x=(I,U)=>{o(k=>k.map(z=>z.field===I?{...z,...U}:z)),c(!0)},w=I=>a.some(U=>(I.kind==="label"?U.labels:U.tags).some(k=>k.toUpperCase()===I.text.toUpperCase())),b=((r==null?void 0:r.suggestions)||[]).filter(I=>!w(I)),A=I=>_[Cu(I)]??I.field??"",y=I=>{let U=a,k=0;for(const z of I){const D=A(z);D&&(U=U.map(Y=>Y.field!==D?Y:z.kind==="label"?{...Y,labels:[...Y.labels,z.text]}:{...Y,tags:[...Y.tags,z.text]}),k++)}if(!k){Fe("Choose the field this entry holds first",!0);return}o(U),c(!0)},C=async I=>{if(r){p(I?"recheck":"save");try{const U=await De.saveCustomer(r.slug,r.name,a);if(s(U),o(U.fields),c(!1),Fe("Setup saved"),I){const k=await De.recheckCustomer(r.slug);Fe(`Re-checking ${ui(k.drawings,"drawing")}…`),await yA(k.jobs),await g(r.slug),Fe("Re-check complete")}h()}catch(U){Fe(U.message,!0)}p("")}},N=async()=>{if(!(!r||!confirm(`Remove the setup for ${r.name}? Its drawings go back to the standard wording on the next check.`)))try{await De.deleteCustomer(r.slug),Fe("Setup removed"),await h(),r.jobs.length?await g(r.slug):e({view:"setup",tab:"customers"})}catch(I){Fe(I.message,!0)}},P=async I=>{I.preventDefault();try{const U=await De.addCustomer(d);m(""),await h(),e({view:"setup",tab:"customers",customer:U.slug})}catch(U){Fe(U.message,!0)}},H=I=>{var U;return((U=a.find(k=>k.field===I))==null?void 0:U.label)||I},W=(r==null?void 0:r.jobs.reduce((I,U)=>I+U.drawings,0))||0,L=Object.entries((r==null?void 0:r.missing)||{});return u.jsxs("div",{className:"setup",children:[u.jsxs("div",{className:"setup-list",children:[u.jsxs("form",{className:"row",onSubmit:P,children:[u.jsx("input",{className:"text","aria-label":"New customer name",placeholder:"New customer name",value:d,onChange:I=>m(I.target.value)}),u.jsx("button",{className:"btn",disabled:!d.trim(),children:"Add"})]}),n===null?u.jsx(vn,{children:u.jsx(nn,{})}):n.length?n.map(I=>u.jsxs("div",{role:"button",className:"cust"+(I.slug===v?" on":""),onClick:()=>M(I.slug),children:[u.jsxs("div",{className:"row between",children:[u.jsx("strong",{children:I.name}),I.has_setup?u.jsx(Je,{kind:"ok",children:"set up"}):u.jsx(Je,{kind:"info",children:"standard"})]}),u.jsxs("div",{className:"small",children:[ui(I.jobs,"job")," · ",ui(I.drawings,"drawing")]}),Object.keys(I.missing).length?u.jsxs("div",{className:"small warn-text",children:["Not found: ",Object.entries(I.missing).map(([U,k])=>`${U.replace("_"," ")} (${k})`).join(", ")]}):null]},I.slug)):u.jsx(vn,{children:"No customers yet. Upload a drawing package with a customer name, or add a customer here."})]}),u.jsx("div",{className:"setup-edit",children:r?u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"row between",style:{marginBottom:12},children:[u.jsxs("div",{children:[u.jsx("h3",{className:"h",children:r.name}),u.jsxs("div",{className:"small",children:[r.has_setup?`Customer wording saved ${r.updated||""}`:"Using the standard title-block wording"," · ",ui(r.jobs.length,"job"),", ",ui(W,"drawing")]})]}),u.jsxs("div",{className:"row",children:[l&&u.jsx("span",{className:"small",children:"Unsaved changes"}),u.jsx("button",{className:"btn",disabled:!!f||!l,onClick:()=>C(!1),children:f==="save"?u.jsx(nn,{}):"Save"}),u.jsx("button",{className:"btn p",id:"save-recheck",disabled:!!f||!W,onClick:()=>C(!0),children:f==="recheck"?u.jsxs(u.Fragment,{children:[u.jsx(nn,{})," Re-checking…"]}):`Save and re-check ${ui(W,"drawing")}`}),r.has_setup&&u.jsx("button",{className:"btn danger",disabled:!!f,onClick:N,children:"Remove setup"})]})]}),L.length?u.jsxs("div",{className:"card warn",children:["On ",r.name,"'s drawings PrintVerity could not find: ",u.jsx("b",{children:L.map(([I,U])=>`${H(I)} (${ui(U,"drawing")})`).join(", ")}),". Add the customer's wording for ",L.length===1?"that field":"those fields"," below, then save and re-check."]}):r.jobs.length?u.jsx("div",{className:"card plain small",children:"Every required title-block field is read on this customer's drawings."}):null,b.length>0&&u.jsxs("div",{className:"card",id:"suggestions",children:[u.jsxs("div",{className:"row between",children:[u.jsx("h3",{children:"Found in this customer's title blocks, not recognised yet"}),b.some(I=>A(I))&&u.jsx("button",{className:"btn sm p",onClick:()=>y(b.filter(I=>A(I))),children:"Add all with a field"})]}),u.jsx("p",{className:"small",style:{margin:"0 0 8px"},children:"Read from the customer's uploaded drawings. Check the field each entry holds and click Add; then save and re-check."}),u.jsxs("table",{children:[u.jsx("thead",{children:u.jsxs("tr",{children:[u.jsx("th",{children:"Entry"}),u.jsx("th",{children:"Example value"}),u.jsx("th",{children:"Seen on"}),u.jsx("th",{children:"Field"}),u.jsx("th",{})]})}),u.jsx("tbody",{children:b.map(I=>u.jsxs("tr",{children:[u.jsxs("td",{children:[u.jsx(Je,{kind:"info",children:I.kind==="label"?"label":"attribute"})," ",u.jsx("span",{className:"mono",children:I.text})]}),u.jsx("td",{className:"mono",children:I.example||"—"}),u.jsx("td",{className:"small",title:I.files.join(", "),children:ui(I.drawings,"drawing")}),u.jsx("td",{children:u.jsxs("select",{"aria-label":`Field for ${I.text}`,value:A(I),onChange:U=>E(k=>({...k,[Cu(I)]:U.target.value})),children:[u.jsx("option",{value:"",children:"choose…"}),a.map(U=>u.jsx("option",{value:U.field,children:U.label},U.field))]})}),u.jsx("td",{children:u.jsx("button",{className:"btn sm",onClick:()=>y([I]),children:"Add"})})]},Cu(I)))})]})]}),u.jsxs("div",{className:"card plain",children:[u.jsx("h3",{children:"Title-block wording"}),u.jsx("p",{className:"small",style:{margin:"0 0 8px"},children:"The standard wording is always recognised. Add the words this customer prints next to each field, and for DXF title blocks the block attribute tags. Required fields are reported when missing, with the severity shown."}),u.jsxs("table",{className:"fields",children:[u.jsx("thead",{children:u.jsxs("tr",{children:[u.jsx("th",{children:"Field"}),u.jsx("th",{children:"Standard wording"}),u.jsx("th",{children:"Customer labels"}),u.jsx("th",{children:"Attribute tags (DXF)"}),u.jsx("th",{children:"Required"}),u.jsx("th",{children:"If missing"})]})}),u.jsx("tbody",{children:a.map(I=>u.jsxs("tr",{children:[u.jsxs("td",{children:[u.jsx("strong",{children:I.label}),r.missing[I.field]?u.jsx("div",{children:u.jsxs(Je,{kind:"medium",children:["not found on ",r.missing[I.field]]})}):null]}),u.jsxs("td",{className:"small",title:I.standard_labels.join(", "),children:[I.standard_labels.slice(0,5).join(", "),I.standard_labels.length>5?` +${I.standard_labels.length-5}`:""]}),u.jsx("td",{children:u.jsx(jp,{values:I.labels,onChange:U=>x(I.field,{labels:U}),placeholder:"add label"})}),u.jsx("td",{children:u.jsx(jp,{values:I.tags,onChange:U=>x(I.field,{tags:U}),placeholder:"add tag"})}),u.jsx("td",{children:u.jsx("input",{type:"checkbox","aria-label":`${I.label} required`,checked:I.required,onChange:U=>x(I.field,{required:U.target.checked})})}),u.jsx("td",{children:u.jsx("select",{"aria-label":`${I.label} severity`,value:I.severity,disabled:!I.required,onChange:U=>x(I.field,{severity:U.target.value}),children:xA.map(U=>u.jsx("option",{value:U,children:U},U))})})]},I.field))})]})]})]}):v?u.jsx(vn,{children:u.jsx(nn,{})}):u.jsx(vn,{children:"Select a customer."})})]})}function a0({title:t,columns:e,example:n,onImport:i}){const[r,s]=te.useState(!1),[a,o]=te.useState(null),l=async c=>{var d;c.preventDefault();const f=c.currentTarget,p=new FormData(f);if(!((d=p.get("file"))!=null&&d.name)){Fe("Choose a .csv or .xlsx file first",!0);return}s(!0);try{const m=await i(p);o(m),f.reset(),Fe(`${ui(m.imported,"record")} imported`,!!m.errors.length&&!m.imported)}catch(m){Fe(m.message,!0)}s(!1)};return u.jsxs("div",{className:"card",children:[u.jsx("h3",{children:t}),u.jsxs("p",{className:"small",style:{margin:"0 0 8px"},children:[e," CSV or Excel, one header row. Existing entries are updated, new ones added."]}),u.jsx("pre",{className:"mono example",children:n}),u.jsxs("form",{className:"row",onSubmit:l,children:[u.jsx("input",{type:"file",name:"file",accept:".csv,.tsv,.xlsx,.xlsm"}),u.jsx("button",{className:"btn p",disabled:r,children:r?u.jsx(nn,{}):"Import"})]}),a&&u.jsxs("div",{className:"small",style:{marginTop:8},children:[ui(a.imported,"record")," imported (",(a.specs||a.parts||[]).join(", ")||"none","); ",a.total," in total.",a.errors.length?u.jsx("ul",{className:"errs",children:a.errors.map(c=>u.jsx("li",{children:c},c))}):null]})]})}function o0({q:t,setQ:e,n,total:i}){return u.jsxs("div",{className:"row between",style:{margin:"4px 0 8px"},children:[u.jsx("input",{className:"text",style:{maxWidth:320},"aria-label":"Filter",placeholder:"Filter",value:t,onChange:r=>e(r.target.value)}),u.jsx("span",{className:"small",children:n===i?`${i} ${i===1?"entry":"entries"}`:`${n} of ${i}`})]})}function EA(){const[t,e]=te.useState(null),[n,i]=te.useState(""),r=te.useCallback(()=>De.specs().then(e).catch(o=>Fe(o.message,!0)),[]);te.useEffect(()=>{r()},[r]);const s=async o=>{if(confirm(`Remove ${o} from the spec library?`))try{await De.deleteSpec(o),r()}catch(l){Fe(l.message,!0)}},a=(t||[]).filter(o=>!n||(o.ref+" "+(o.title||"")).toLowerCase().includes(n.toLowerCase()));return u.jsxs(u.Fragment,{children:[u.jsx(a0,{title:"Import a spec register",columns:"Columns: Spec, Revision, Status (current or superseded), Superseded on, Title, On file. One row per revision.",example:`Spec,Revision,Status,Superseded on,Title,On file
NB-QS-27,A,superseded,2026-05-01,Supplier spec: hard anodize,yes
NB-QS-27,B,current,,Supplier spec: hard anodize,yes`,onImport:async o=>{const l=await De.importSpecs(o);return r(),l}}),u.jsx("p",{className:"small",children:"Drawings are checked against this library: a spec reference not on file, a superseded revision or an unknown revision is reported. Specs listed here are recognised on drawings by their exact reference, whatever the numbering scheme."}),t===null?u.jsx(vn,{children:u.jsx(nn,{})}):u.jsxs(u.Fragment,{children:[u.jsx(o0,{q:n,setQ:i,n:a.length,total:t.length}),u.jsxs("table",{children:[u.jsx("thead",{children:u.jsxs("tr",{children:[u.jsx("th",{children:"Spec"}),u.jsx("th",{children:"Title"}),u.jsx("th",{children:"Revisions"}),u.jsx("th",{children:"Current"}),u.jsx("th",{children:"Superseded"}),u.jsx("th",{children:"On file"}),u.jsx("th",{})]})}),u.jsx("tbody",{children:a.map(o=>u.jsxs("tr",{children:[u.jsx("td",{className:"mono",children:o.ref}),u.jsx("td",{children:o.title||""}),u.jsx("td",{className:"mono",children:o.revisions.join(", ")}),u.jsx("td",{className:"mono",children:o.current||"—"}),u.jsx("td",{className:"small",children:Object.entries(o.superseded||{}).map(([l,c])=>`${l} on ${c}`).join("; ")||"—"}),u.jsx("td",{children:o.on_file===!1?u.jsx(Je,{kind:"medium",children:"no"}):u.jsx(Je,{kind:"ok",children:"yes"})}),u.jsx("td",{children:u.jsx("button",{className:"btn sm danger",title:`Remove ${o.ref}`,onClick:()=>s(o.ref),children:"✕"})})]},o.ref))})]})]})]})}function wA(){const[t,e]=te.useState(null),[n,i]=te.useState(""),r=te.useCallback(()=>De.revisions().then(e).catch(o=>Fe(o.message,!0)),[]);te.useEffect(()=>{r()},[r]);const s=async o=>{if(confirm(`Remove ${o} from the revision register?`))try{await De.deleteRevision(o),r()}catch(l){Fe(l.message,!0)}},a=((t==null?void 0:t.parts)||[]).filter(o=>!n||(o.part_no+" "+(o.title||"")).toLowerCase().includes(n.toLowerCase()));return u.jsxs(u.Fragment,{children:[u.jsx(a0,{title:"Import released revisions",columns:"Columns: Part No, Revision, ECO, Released (date), Title. One row per released revision; the latest release becomes the current revision.",example:`Part No,Revision,ECO,Released,Title
NB-3120-001,1,CO-4410,2026-02-14,HOUSING PLATE
NB-3120-001,2,CO-4478,2026-07-02,HOUSING PLATE`,onImport:async o=>{const l=await De.importRevisions(o);return r(),l}}),u.jsx("p",{className:"small",children:(t==null?void 0:t.source)==="epicor"?"Released revisions are read live from Epicor. This register is the fallback when the ERP cannot be reached.":"No ERP connection is configured on this installation, so the PLM checks (revision released, superseded, ECO match) read this register. In a connected installation they read the ERP directly."}),t===null?u.jsx(vn,{children:u.jsx(nn,{})}):u.jsxs(u.Fragment,{children:[u.jsx(o0,{q:n,setQ:i,n:a.length,total:t.parts.length}),u.jsxs("table",{children:[u.jsx("thead",{children:u.jsxs("tr",{children:[u.jsx("th",{children:"Part"}),u.jsx("th",{children:"Current revision"}),u.jsx("th",{children:"ECO"}),u.jsx("th",{children:"Released"}),u.jsx("th",{children:"Title"}),u.jsx("th",{children:"Earlier revisions"}),u.jsx("th",{})]})}),u.jsx("tbody",{children:a.map(o=>u.jsxs("tr",{children:[u.jsx("td",{className:"mono",children:o.part_no}),u.jsx("td",{className:"mono",children:o.rev}),u.jsx("td",{className:"mono",children:o.eco||"—"}),u.jsx("td",{children:o.released||"—"}),u.jsx("td",{children:o.title||""}),u.jsx("td",{className:"small",children:(o.history||[]).map(l=>`${l.rev} (${l.eco||"no ECO"}, ${l.released||"no date"})`).join("; ")||"—"}),u.jsx("td",{children:u.jsx("button",{className:"btn sm danger",title:`Remove ${o.part_no}`,onClick:()=>s(o.part_no),children:"✕"})})]},o.part_no))})]})]})]})}const l0=[["queue","Queue"],["review","Review"],["compare","Compare"],["consistency","Consistency"],["model","Model"],["docs","Docs"],["ask","Ask"],["audit","Audit"],["setup","Setup"]],TA={queue:u.jsx("svg",{viewBox:"0 0 24 24",children:u.jsx("path",{d:"M3 5h18M3 12h18M3 19h12"})}),review:u.jsxs("svg",{viewBox:"0 0 24 24",children:[u.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),u.jsx("circle",{cx:"11",cy:"11",r:"3.5"}),u.jsx("path",{d:"M13.5 13.5L17 17"})]}),compare:u.jsx("svg",{viewBox:"0 0 24 24",children:u.jsx("path",{d:"M4 7h12l-3-3M20 17H8l3 3"})}),consistency:u.jsxs("svg",{viewBox:"0 0 24 24",children:[u.jsx("rect",{x:"3",y:"4",width:"18",height:"16",rx:"2"}),u.jsx("path",{d:"M3 10h18M9 4v16"})]}),model:u.jsxs("svg",{viewBox:"0 0 24 24",children:[u.jsx("path",{d:"M12 3l8 4.5v9L12 21l-8-4.5v-9z"}),u.jsx("path",{d:"M12 12l8-4.5M12 12v9M12 12L4 7.5"})]}),docs:u.jsxs("svg",{viewBox:"0 0 24 24",children:[u.jsx("path",{d:"M6 3h8l4 4v14H6z"}),u.jsx("path",{d:"M14 3v4h4M9 12h6M9 16h6"})]}),ask:u.jsx("svg",{viewBox:"0 0 24 24",children:u.jsx("path",{d:"M4 5h16v11H9l-5 4z"})}),audit:u.jsxs("svg",{viewBox:"0 0 24 24",children:[u.jsx("path",{d:"M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"}),u.jsx("path",{d:"M9 12l2 2 4-4"})]}),setup:u.jsxs("svg",{viewBox:"0 0 24 24",children:[u.jsx("path",{d:"M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1"}),u.jsx("circle",{cx:"15",cy:"6",r:"2"}),u.jsx("circle",{cx:"9",cy:"12",r:"2"}),u.jsx("circle",{cx:"17",cy:"18",r:"2"})]})};function Jm(){const t=location.hash.replace(/^#/,""),[e,n]=t.split("?"),i=new URLSearchParams(n||"");return{view:l0.some(([s])=>s===e)?e:"queue",job:i.get("job")||void 0,drawing:i.get("drawing")||void 0,zoom:i.get("zoom")?Number(i.get("zoom")):void 0,overlay:i.get("overlay")||void 0,tab:i.get("tab")||void 0,customer:i.get("customer")||void 0}}function bA(t){const e=new URLSearchParams;t.job&&e.set("job",t.job),t.drawing&&e.set("drawing",t.drawing),t.tab&&e.set("tab",t.tab),t.customer&&e.set("customer",t.customer);const n=e.toString();return"#"+t.view+(n?"?"+n:"")}function AA(){var d;const[t,e]=te.useState(Jm()),[n,i]=te.useState(null),[r,s]=te.useState(["Queue",""]),{pref:a,theme:o,setPref:l}=ey(),c=te.useCallback(m=>{const _=bA(m);location.hash!==_&&history.replaceState(null,"",_),e(m)},[]);te.useEffect(()=>{const m=()=>e(Jm());return window.addEventListener("hashchange",m),()=>window.removeEventListener("hashchange",m)},[]),te.useEffect(()=>{const m=()=>De.status().then(i).catch(()=>i(null));m();const _=setInterval(m,6e4);return()=>clearInterval(_)},[]);const f=(d=n==null?void 0:n.engines)==null?void 0:d.queue,p=(()=>{const m={route:t,go:c,setCrumb:s,status:n};switch(t.view){case"review":return u.jsx(iy,{...m});case"compare":return u.jsx(dy,{...m});case"consistency":return u.jsx(hy,{...m});case"model":return u.jsx(pA,{...m});case"docs":return u.jsx(mA,{...m});case"ask":return u.jsx(_A,{...m});case"audit":return u.jsx(vA,{...m});case"setup":return u.jsx(SA,{...m});default:return u.jsx(ny,{...m})}})();return u.jsx(_v.Provider,{value:o,children:u.jsxs("div",{id:"app",children:[u.jsxs("div",{className:"top",children:[u.jsx("span",{className:"brand",children:"PRINTVERITY"}),u.jsx("span",{className:"crumb w",children:r[0]}),u.jsx("span",{className:"crumb",children:r[1]}),u.jsxs("div",{className:"right",children:[n&&u.jsx("span",{className:"pill "+(n.claude?"green":""),title:n.claude?`Q&A answers with Claude (${n.model}) through the LangGraph agent`:"No Anthropic credentials: Q&A uses the local planner",children:n.claude?"Claude connected":"Q&A: local mode"}),f&&u.jsx("span",{className:"pill",title:f.async?"Reviews run on Celery workers":"Reviews run inline",children:f.async?"Workers online":"Inline"}),u.jsxs("span",{className:"pill",children:["v",(n==null?void 0:n.version)||"?"]})]})]}),u.jsxs("div",{className:"body",children:[u.jsxs("nav",{className:"side",children:[l0.map(([m,_])=>u.jsxs("a",{className:t.view===m?"on":"",onClick:()=>c({view:m}),children:[TA[m],u.jsx("span",{children:_})]},m)),u.jsx("div",{className:"sp"}),u.jsx(KS,{pref:a,setPref:l,status:n}),u.jsx("div",{className:"u",children:"DH"})]}),u.jsx("main",{children:p})]}),u.jsx(XS,{})]})})}hv(document.getElementById("root")).render(u.jsx(L0.StrictMode,{children:u.jsx(AA,{})}));
