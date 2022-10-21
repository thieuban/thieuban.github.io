if (self.CavalryLogger) { CavalryLogger.start_js_script(document.currentScript); }/*FB_PKG_DELIM*/

__d("Base64",[],(function(a,b,c,d,e,f){var g="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";function h(a){a=a.charCodeAt(0)<<16|a.charCodeAt(1)<<8|a.charCodeAt(2);return String.fromCharCode(g.charCodeAt(a>>>18),g.charCodeAt(a>>>12&63),g.charCodeAt(a>>>6&63),g.charCodeAt(a&63))}var i=">___?456789:;<=_______\0\x01\x02\x03\x04\x05\x06\x07\b\t\n\v\f\r\x0e\x0f\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19______\x1a\x1b\x1c\x1d\x1e\x1f !\"#$%&'()*+,-./0123";function j(a){a=i.charCodeAt(a.charCodeAt(0)-43)<<18|i.charCodeAt(a.charCodeAt(1)-43)<<12|i.charCodeAt(a.charCodeAt(2)-43)<<6|i.charCodeAt(a.charCodeAt(3)-43);return String.fromCharCode(a>>>16,a>>>8&255,a&255)}var k={encode:function(a){a=unescape(encodeURI(a));var b=(a.length+2)%3;a=(a+"\0\0".slice(b)).replace(/[\s\S]{3}/g,h);return a.slice(0,a.length+b-2)+"==".slice(b)},decode:function(a){a=a.replace(/[^A-Za-z0-9+\/]/g,"");var b=a.length+3&3;a=(a+"AAA".slice(b)).replace(/..../g,j);a=a.slice(0,a.length+b-3);try{return decodeURIComponent(escape(a))}catch(a){throw new Error("Not valid UTF-8")}},encodeObject:function(a){return k.encode(JSON.stringify(a))},decodeObject:function(a){return JSON.parse(k.decode(a))},encodeNums:function(a){return String.fromCharCode.apply(String,a.map(function(a){return g.charCodeAt((a|-(a>63?1:0))&-(a>0?1:0)&63)}))}};a=k;f["default"]=a}),66);
__d("routeBuilderUtils",[],(function(a,b,c,d,e,f){"use strict";function a(a){a=a.split("/");return a.filter(function(a){return a!==""}).map(function(a){var b=a.split(/{|}/);if(b.length<3)return{isToken:!1,part:a};else{a=b[0];var c=b[1];b=b[2];var d=c[0]==="?",e=c[d?1:0]==="*";c=c.substring((d?1:0)+(e?1:0));return{isToken:!0,optional:d,catchAll:e,prefix:a,suffix:b,token:c}}})}f.getPathParts=a}),66);
__d("jsRouteBuilder",["ConstUriUtils","FBLogger","routeBuilderUtils"],(function(a,b,c,d,e,f,g){"use strict";var h="#";function a(a,b,e,f,g){g===void 0&&(g=!1);var i=d("routeBuilderUtils").getPathParts(a);function j(j){try{var k=f!=null?babelHelpers["extends"]({},f,j):(j=j)!=null?j:{},l={};j="";var m=!1;j=i.reduce(function(a,c){if(!c.isToken)return a+"/"+c.part;else{var d,e=c.optional,f=c.prefix,g=c.suffix;c=c.token;if(e&&m)return a;d=(d=k[c])!=null?d:b[c];if(d==null&&e){m=!0;return a}if(d==null)throw new Error("Missing required template parameter: "+c);if(d==="")throw new Error("Required template parameter is an empty string: "+c);l[c]=!0;return a+"/"+f+d+g}},"");a.slice(-1)==="/"&&(j+="/");j===""&&(j="/");var n=d("ConstUriUtils").getUri(j);for(var o in k){var p=k[o];!l[o]&&p!=null&&n!=null&&(e!=null&&e.has(o)?p!==!1&&(n=n.addQueryParam(o,null)):n=n.addQueryParam(o,p))}return[n,j]}catch(b){p=b==null?void 0:b.message;o=c("FBLogger")("JSRouteBuilder").blameToPreviousFrame().blameToPreviousFrame();g&&(o=o.blameToPreviousFrame());o.mustfix("Failed building URI for base path: %s message: %s",a,p);return[null,h]}}return{buildUri:function(a){a=(a=j(a)[0])!=null?a:d("ConstUriUtils").getUri(h);if(a==null)throw new Error("Not even the fallback URL parsed validly!");return a},buildUriNullable:function(a){return j(a)[0]},buildURL:function(a){a=j(a);var b=a[0];a=a[1];return(b=b==null?void 0:b.toString())!=null?b:a},buildURLStringDEPRECATED:function(a){a=j(a);var b=a[0];a=a[1];return(b=b==null?void 0:b.toString())!=null?b:a}}}g["default"]=a}),98);
__d("XLynxAsyncCallbackControllerRouteBuilder",["jsRouteBuilder"],(function(a,b,c,d,e,f,g){a=c("jsRouteBuilder")("/si/linkclick/ajax_callback/",Object.freeze({}),void 0);b=a;g["default"]=b}),98);
__d("FBLynxLogging",["AsyncRequest","ODS","XLynxAsyncCallbackControllerRouteBuilder"],(function(a,b,c,d,e,f,g){"use strict";function a(a){var b=c("XLynxAsyncCallbackControllerRouteBuilder").buildURL({});new(c("AsyncRequest"))(b).setData({lynx_uri:a}).setErrorHandler(function(a){a=a.getError();d("ODS").bumpEntityKey(3861,"linkshim","click_log.post.fail."+a)}).setTransportErrorHandler(function(a){a=a.getError();d("ODS").bumpEntityKey(3861,"linkshim","click_log.post.transport_fail."+a)}).send()}g.log=a}),98);
__d("FBLynxBase",["$","FBLynxLogging","LinkshimHandlerConfig","URI","isLinkshimURI"],(function(a,b,c,d,e,f){"use strict";var g;function h(a){if(!b("isLinkshimURI")(a))return null;a=a.getQueryData().u;return!a?null:a}var i={logAsyncClick:function(a){i.swapLinkWithUnshimmedLink(a);a=a.getAttribute("data-lynx-uri");if(!a)return;b("FBLynxLogging").log(a)},originReferrerPolicyClick:function(a){var c=b("$")("meta_referrer");c.content=b("LinkshimHandlerConfig").switched_meta_referrer_policy;i.logAsyncClick(a);setTimeout(function(){c.content=b("LinkshimHandlerConfig").default_meta_referrer_policy},100)},swapLinkWithUnshimmedLink:function(a){var c=a.href,d=h(new(g||(g=b("URI")))(c));if(!d)return;a.setAttribute("data-lynx-uri",c);a.href=d},revertSwapIfLynxURIPresent:function(a){var b=a.getAttribute("data-lynx-uri");if(!b)return;a.removeAttribute("data-lynx-uri");a.href=b}};e.exports=i}),null);
__d("FBLynx",["Base64","Event","FBLynxBase","LinkshimHandlerConfig","Parent","URI"],(function(a,b,c,d,e,f){"use strict";var g,h=(g||(g=b("URI"))).goURIOnWindow,i={alreadySetup:!1,setupDelegation:function(a){a===void 0&&(a=!1);if(!document.documentElement)return;if(document.body==null){if(a)return;window.setTimeout(function(){i.setupDelegation(!0)},100);return}if(i.alreadySetup)return;i.alreadySetup=!0;var c=function(a){var c=i.getMaybeLynxLink(a.target);if(!c)return;var d=c[0];c=c[1];var e=c,f=new(g||(g=b("URI")))(c.href),j;if(b("LinkshimHandlerConfig").ghl_param_link_shim&&d!=="hover"&&(c.dataset&&c.dataset.attributes)){j=b("Base64").decodeObject(c.dataset.attributes);if(j&&j.open_link){var k;for(k in j)k!=="open_link"&&f.addQueryData(k,j[k]);k=c.cloneNode(!0);k.href=f.toString();e=k}}switch(d){case"async":case"asynclazy":b("FBLynxBase").logAsyncClick(e);break;case"origin":b("FBLynxBase").originReferrerPolicyClick(e);break;case"hover":i.hoverClick(e);break}b("LinkshimHandlerConfig").ghl_param_link_shim&&d!=="hover"&&j&&j.open_link&&(a.preventDefault(),h(f,window.open("",e.target),!0))};b("Event").listen(document.body,"click",c);b("LinkshimHandlerConfig").middle_click_requires_event&&b("Event").listen(document.body,"mouseup",function(a){a.button==1&&c(a)});b("Event").listen(document.body,"mouseover",function(a){a=i.getMaybeLynxLink(a.target);if(!a)return;var b=a[0];a=a[1];switch(b){case"async":case"asynclazy":case"origin":case"hover":i.mouseover(a);break}});b("Event").listen(document.body,"contextmenu",function(a){a=i.getMaybeLynxLink(a.target);if(!a)return;var b=a[0];a=a[1];switch(b){case"async":case"hover":case"origin":i.contextmenu(a);break;case"asynclazy":break}})},getMaybeLynxLink:function(a){a=b("Parent").byAttribute(a,"data-lynx-mode");if(a instanceof HTMLAnchorElement){var c=a.getAttribute("data-lynx-mode");switch(c){case"async":case"asynclazy":case"hover":case"origin":return[c,a];default:return null}}return null},hoverClick:function(a){b("FBLynxBase").revertSwapIfLynxURIPresent(a)},mouseover:function(a){b("FBLynxBase").swapLinkWithUnshimmedLink(a)},contextmenu:function(a){b("FBLynxBase").revertSwapIfLynxURIPresent(a)}};e.exports=i}),null);
__d("PageTransitions",["cr:917439"],(function(a,b,c,d,e,f,g){g["default"]=b("cr:917439")}),98);
__d("PluginCSSReflowHack",["Style"],(function(a,b,c,d,e,f,g){function a(a){setTimeout(function(){var b="border-bottom-width",d=c("Style").get(a,b);c("Style").set(a,b,parseInt(d,10)+1+"px");c("Style").set(a,b,d)},1e3)}g.trigger=a}),98);
__d("getVendorPrefixedName",["invariant","ExecutionEnvironment","UserAgent","camelize"],(function(a,b,c,d,e,f,g,h){var i={},j=["Webkit","ms","Moz","O"],k=new RegExp("^("+j.join("|")+")"),l=c("ExecutionEnvironment").canUseDOM?document.createElement("div").style:{};function m(a){for(var b=0;b<j.length;b++){var c=j[b]+a;if(c in l)return c}return null}function n(a){switch(a){case"lineClamp":return c("UserAgent").isEngine("WebKit >= 315.14.2")?"WebkitLineClamp":null;default:return null}}function a(a){var b=c("camelize")(a);if(i[b]===void 0){var d=b.charAt(0).toUpperCase()+b.slice(1);k.test(d)&&h(0,957,a);c("ExecutionEnvironment").canUseDOM?i[b]=b in l?b:m(d):i[b]=n(b)}return i[b]}g["default"]=a}),98);
__d("shield",[],(function(a,b,c,d,e,f){function a(a,b){for(var c=arguments.length,d=new Array(c>2?c-2:0),e=2;e<c;e++)d[e-2]=arguments[e];if(typeof a!=="function")throw new TypeError("shield expects a function as the first argument");return function(){return a.apply(b,d)}}f["default"]=a}),66);
__d("BrowserSupportCore",["getVendorPrefixedName"],(function(a,b,c,d,e,f){"use strict";a={hasCSSAnimations:function(){return!!b("getVendorPrefixedName")("animationName")},hasCSSTransforms:function(){return!!b("getVendorPrefixedName")("transform")},hasCSS3DTransforms:function(){return!!b("getVendorPrefixedName")("perspective")},hasCSSTransitions:function(){return!!b("getVendorPrefixedName")("transition")}};c=a;f["default"]=c}),66);
__d("BrowserSupport",["BrowserSupportCore","ExecutionEnvironment","UserAgent_DEPRECATED","getVendorPrefixedName","memoize"],(function(a,b,c,d,e,f,g){var h=null;function i(){if(c("ExecutionEnvironment").canUseDOM){h||(h=document.createElement("div"));return h}return null}b=function(a){return c("memoize")(function(){var b=i();return!b?!1:a(b)})};e=b(function(a){a.style.cssText="position:-moz-sticky;position:-webkit-sticky;position:-o-sticky;position:-ms-sticky;position:sticky;";return/sticky/.test(a.style.position)});f=b(function(a){return"scrollSnapType"in a.style||"webkitScrollSnapType"in a.style||"msScrollSnapType"in a.style});var j=b(function(a){return"scrollBehavior"in a.style});b=b(function(a){if(!("pointerEvents"in a.style))return!1;a.style.cssText="pointer-events:auto";return a.style.pointerEvents==="auto"});var k=c("memoize")(function(){return!(d("UserAgent_DEPRECATED").webkit()&&!d("UserAgent_DEPRECATED").chrome()&&d("UserAgent_DEPRECATED").windows())&&"FileList"in window&&"FormData"in window}),l=c("memoize")(function(){return!!a.blob}),m=c("memoize")(function(){return c("ExecutionEnvironment").canUseDOM&&document.createElementNS&&document.createElementNS("http://www.w3.org/2000/svg","foreignObject").toString().includes("SVGForeignObject")}),n=c("memoize")(function(){return!!window.MutationObserver}),o=c("memoize")(function(){var a={transition:"transitionend",WebkitTransition:"webkitTransitionEnd",MozTransition:"mozTransitionEnd",OTransition:"oTransitionEnd"},b=c("getVendorPrefixedName")("transition");return a[b]||null}),p=function(){return!!window.CanvasRenderingContext2D};g.hasCSSAnimations=c("BrowserSupportCore").hasCSSAnimations;g.hasCSSTransforms=c("BrowserSupportCore").hasCSSTransforms;g.hasCSS3DTransforms=c("BrowserSupportCore").hasCSS3DTransforms;g.hasCSSTransitions=c("BrowserSupportCore").hasCSSTransitions;g.hasPositionSticky=e;g.hasScrollSnapPoints=f;g.hasScrollBehavior=j;g.hasPointerEvents=b;g.hasFileAPI=k;g.hasBlobFactory=l;g.hasSVGForeignObject=m;g.hasMutationObserver=n;g.getTransitionEndEvent=o;g.hasCanvasRenderingContext2D=p}),98);
__d("ReactDOMLegacy_DEPRECATED",["cr:1108857","cr:1294246"],(function(a,b,c,d,e,f,g){g.createPortal=b("cr:1294246").createPortal,g.findDOMNode=b("cr:1294246").findDOMNode,g.flushSync=b("cr:1294246").flushSync,g.hydrate=b("cr:1294246").hydrate,g.render=b("cr:1294246").render,g.unmountComponentAtNode=b("cr:1294246").unmountComponentAtNode,g.unstable_batchedUpdates=b("cr:1294246").unstable_batchedUpdates,g.unstable_renderSubtreeIntoContainer=b("cr:1294246").unstable_renderSubtreeIntoContainer,g.version=b("cr:1294246").version,g.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=b("cr:1294246").__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED}),98);
__d("ReactDOM",["ReactDOMLegacy_DEPRECATED"],(function(a,b,c,d,e,f){Object.keys(importNamespace("ReactDOMLegacy_DEPRECATED")).forEach(function(a){if(a==="default"||a==="__esModule")return;f[a]=importNamespace("ReactDOMLegacy_DEPRECATED")[a]})}),null);
__d("SubscriptionsHandler",["invariant"],(function(a,b,c,d,e,f,g,h){"use strict";function i(a){return a.remove||a.reset||a.unsubscribe||a.cancel||a.dispose}function j(a){i(a).call(a)}a=function(){function a(){this.$1=[]}var b=a.prototype;b.addSubscriptions=function(){for(var a=arguments.length,b=new Array(a),c=0;c<a;c++)b[c]=arguments[c];b.every(i)||h(0,3659);this.$1!=null?this.$1=this.$1.concat(b):b.forEach(j)};b.engage=function(){this.$1==null&&(this.$1=[])};b.release=function(){this.$1!=null&&(this.$1.forEach(j),this.$1=null)};b.releaseOne=function(a){var b=this.$1;if(b==null)return;var c=b.indexOf(a);c!==-1&&(j(a),b.splice(c,1),b.length===0&&(this.$1=null))};return a}();g["default"]=a}),98);
__d("VideoPlayerLoggerFallbackReasons",[],(function(a,b,c,d,e,f){a="timeout";b="flash_error";c="flash_unavailable";f.TIMEOUT=a;f.FLASH_ERROR=b;f.FLASH_UNAVAILABLE=c}),66);