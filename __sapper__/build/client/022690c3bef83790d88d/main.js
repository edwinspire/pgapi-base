!function(t){function e(e){for(var n,o,c=e[0],s=e[1],u=0,a=[];u<c.length;u++)o=c[u],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&a.push(r[o][0]),r[o]=0;for(n in s)Object.prototype.hasOwnProperty.call(s,n)&&(t[n]=s[n]);for(i&&i(e);a.length;)a.shift()()}var n={},r={3:0};function o(e){if(n[e])return n[e].exports;var r=n[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.e=function(t){var e=[],n=r[t];if(0!==n)if(n)e.push(n[2]);else{var c=new Promise((function(e,o){n=r[t]=[e,o]}));e.push(n[2]=c);var s,u=document.createElement("script");u.charset="utf-8",u.timeout=120,o.nc&&u.setAttribute("nonce",o.nc),u.src=function(t){return o.p+"022690c3bef83790d88d/"+({0:"about",1:"home",2:"index",4:"pgAPI",5:"vendors~pgAPI"}[t]||t)+"."+t+".js"}(t);var i=new Error;s=function(e){u.onerror=u.onload=null,clearTimeout(a);var n=r[t];if(0!==n){if(n){var o=e&&("load"===e.type?"missing":e.type),c=e&&e.target&&e.target.src;i.message="Loading chunk "+t+" failed.\n("+o+": "+c+")",i.name="ChunkLoadError",i.type=o,i.request=c,n[1](i)}r[t]=void 0}};var a=setTimeout((function(){s({type:"timeout",target:u})}),12e4);u.onerror=u.onload=s,document.head.appendChild(u)}return Promise.all(e)},o.m=t,o.c=n,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="client/",o.oe=function(t){throw console.error(t),t};var c=window.webpackJsonp=window.webpackJsonp||[],s=c.push.bind(c);c.push=e,c=c.slice();for(var u=0;u<c.length;u++)e(c[u]);var i=s;o(o.s=3)}([function(t,e,n){"use strict";function r(){}n.d(e,"a",(function(){return yt})),n.d(e,"b",(function(){return tt})),n.d(e,"c",(function(){return V})),n.d(e,"d",(function(){return g})),n.d(e,"e",(function(){return o})),n.d(e,"f",(function(){return x})),n.d(e,"g",(function(){return bt})),n.d(e,"h",(function(){return G})),n.d(e,"i",(function(){return it})),n.d(e,"j",(function(){return P})),n.d(e,"k",(function(){return gt})),n.d(e,"l",(function(){return k})),n.d(e,"m",(function(){return R})),n.d(e,"n",(function(){return C})),n.d(e,"o",(function(){return d})),n.d(e,"p",(function(){return W})),n.d(e,"q",(function(){return mt})),n.d(e,"r",(function(){return p})),n.d(e,"s",(function(){return Ot})),n.d(e,"t",(function(){return j})),n.d(e,"u",(function(){return O})),n.d(e,"v",(function(){return y})),n.d(e,"w",(function(){return _})),n.d(e,"x",(function(){return J})),n.d(e,"y",(function(){return pt})),n.d(e,"z",(function(){return dt})),n.d(e,"A",(function(){return ft})),n.d(e,"B",(function(){return ut})),n.d(e,"C",(function(){return jt})),n.d(e,"D",(function(){return $})),n.d(e,"E",(function(){return i})),n.d(e,"F",(function(){return E})),n.d(e,"G",(function(){return $t})),n.d(e,"H",(function(){return r})),n.d(e,"I",(function(){return M})),n.d(e,"J",(function(){return I})),n.d(e,"K",(function(){return S})),n.d(e,"L",(function(){return T})),n.d(e,"M",(function(){return u})),n.d(e,"N",(function(){return a})),n.d(e,"O",(function(){return B})),n.d(e,"P",(function(){return L})),n.d(e,"Q",(function(){return A})),n.d(e,"R",(function(){return w})),n.d(e,"S",(function(){return f})),n.d(e,"T",(function(){return v})),n.d(e,"U",(function(){return q})),n.d(e,"V",(function(){return at})),n.d(e,"W",(function(){return lt})),n.d(e,"X",(function(){return m}));function o(t,e){for(const n in e)t[n]=e[n];return t}function c(t){return t()}function s(){return Object.create(null)}function u(t){t.forEach(c)}function i(t){return"function"==typeof t}function a(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function l(t){return 0===Object.keys(t).length}function f(t,...e){if(null==t)return r;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function d(t,e,n){t.$$.on_destroy.push(f(e,n))}function p(t,e,n,r){if(t){const o=h(t,e,n,r);return t[0](o)}}function h(t,e,n,r){return t[1]&&r?o(n.ctx.slice(),t[1](r(e))):n.ctx}function b(t,e,n,r){if(t[2]&&r){const o=t[2](r(n));if(void 0===e.dirty)return o;if("object"==typeof o){const t=[],n=Math.max(e.dirty.length,o.length);for(let r=0;r<n;r+=1)t[r]=e.dirty[r]|o[r];return t}return e.dirty|o}return e.dirty}function m(t,e,n,r,o,c,s){const u=b(e,r,o,c);if(u){const o=h(e,n,r,s);t.p(o,u)}}new Set;function g(t,e){t.appendChild(e)}function $(t,e,n){t.insertBefore(e,n||null)}function O(t){t.parentNode.removeChild(t)}function j(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function y(t){return document.createElement(t)}function v(t){return document.createTextNode(t)}function w(){return v(" ")}function _(){return v("")}function E(t,e,n,r){return t.addEventListener(e,n,r),()=>t.removeEventListener(e,n,r)}function S(t){return function(e){return e.preventDefault(),t.call(this,e)}}function x(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function P(t){return Array.from(t.childNodes)}function k(t,e,n,r){for(let r=0;r<t.length;r+=1){const o=t[r];if(o.nodeName===e){let e=0;const c=[];for(;e<o.attributes.length;){const t=o.attributes[e++];n[t.name]||c.push(t.name)}for(let t=0;t<c.length;t++)o.removeAttribute(c[t]);return t.splice(r,1)[0]}}return r?function(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}(e):y(e)}function C(t,e){for(let n=0;n<t.length;n+=1){const r=t[n];if(3===r.nodeType)return r.data=""+e,t.splice(n,1)[0]}return v(e)}function R(t){return C(t," ")}function L(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function A(t,e){t.value=null==e?"":e}function q(t,e,n){t.classList[n?"add":"remove"](e)}function N(t,e){const n=document.createEvent("CustomEvent");return n.initCustomEvent(t,!1,!1,e),n}function T(t,e=document.body){return Array.from(e.querySelectorAll(t))}new Set;let D;function H(t){D=t}function U(){if(!D)throw new Error("Function called outside component initialization");return D}function I(t){U().$$.on_mount.push(t)}function V(t){U().$$.after_update.push(t)}function M(t){U().$$.on_destroy.push(t)}function W(){const t=U();return(e,n)=>{const r=t.$$.callbacks[e];if(r){const o=N(e,n);r.slice().forEach(e=>{e.call(t,o)})}}}function B(t,e){U().$$.context.set(t,e)}function J(t){return U().$$.context.get(t)}const z=[],G=[],K=[],X=[],F=Promise.resolve();let Y=!1;function Q(){Y||(Y=!0,F.then(rt))}function Z(t){K.push(t)}function tt(t){X.push(t)}let et=!1;const nt=new Set;function rt(){if(!et){et=!0;do{for(let t=0;t<z.length;t+=1){const e=z[t];H(e),ot(e.$$)}for(H(null),z.length=0;G.length;)G.pop()();for(let t=0;t<K.length;t+=1){const e=K[t];nt.has(e)||(nt.add(e),e())}K.length=0}while(z.length);for(;X.length;)X.pop()();Y=!1,et=!1,nt.clear()}}function ot(t){if(null!==t.fragment){t.update(),u(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(Z)}}const ct=new Set;let st;function ut(){st={r:0,c:[],p:st}}function it(){st.r||u(st.c),st=st.p}function at(t,e){t&&t.i&&(ct.delete(t),t.i(e))}function lt(t,e,n,r){if(t&&t.o){if(ct.has(t))return;ct.add(t),st.c.push(()=>{ct.delete(t),r&&(n&&t.d(1),r())}),t.o(e)}}const ft="undefined"!=typeof window?window:"undefined"!=typeof globalThis?globalThis:global;function dt(t,e){const n={},r={},o={$$scope:1};let c=t.length;for(;c--;){const s=t[c],u=e[c];if(u){for(const t in s)t in u||(r[t]=1);for(const t in u)o[t]||(n[t]=u[t],o[t]=1);t[c]=u}else for(const t in s)o[t]=1}for(const t in r)t in n||(n[t]=void 0);return n}function pt(t){return"object"==typeof t&&null!==t?t:{}}new Set(["allowfullscreen","allowpaymentrequest","async","autofocus","autoplay","checked","controls","default","defer","disabled","formnovalidate","hidden","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","selected"]);let ht;function bt(t,e,n){const r=t.$$.props[e];void 0!==r&&(t.$$.bound[r]=n,n(t.$$.ctx[r]))}function mt(t){t&&t.c()}function gt(t,e){t&&t.l(e)}function $t(t,e,n,r){const{fragment:o,on_mount:s,on_destroy:a,after_update:l}=t.$$;o&&o.m(e,n),r||Z(()=>{const e=s.map(c).filter(i);a?a.push(...e):u(e),t.$$.on_mount=[]}),l.forEach(Z)}function Ot(t,e){const n=t.$$;null!==n.fragment&&(u(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function jt(t,e,n,o,c,i,a=[-1]){const l=D;H(t);const f=t.$$={fragment:null,ctx:null,props:i,update:r,not_equal:c,bound:s(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(l?l.$$.context:[]),callbacks:s(),dirty:a,skip_bound:!1};let d=!1;if(f.ctx=n?n(t,e.props||{},(e,n,...r)=>{const o=r.length?r[0]:n;return f.ctx&&c(f.ctx[e],f.ctx[e]=o)&&(!f.skip_bound&&f.bound[e]&&f.bound[e](o),d&&function(t,e){-1===t.$$.dirty[0]&&(z.push(t),Q(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}(t,e)),n}):[],f.update(),d=!0,u(f.before_update),f.fragment=!!o&&o(f.ctx),e.target){if(e.hydrate){const t=P(e.target);f.fragment&&f.fragment.l(t),t.forEach(O)}else f.fragment&&f.fragment.c();e.intro&&at(t.$$.fragment),$t(t,e.target,e.anchor,e.customElement),rt()}H(l)}"function"==typeof HTMLElement&&(ht=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){const{on_mount:t}=this.$$;this.$$.on_disconnect=t.map(c).filter(i);for(const t in this.$$.slotted)this.appendChild(this.$$.slotted[t])}attributeChangedCallback(t,e,n){this[t]=n}disconnectedCallback(){u(this.$$.on_disconnect)}$destroy(){Ot(this,1),this.$destroy=r}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){this.$$set&&!l(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}});class yt{$destroy(){Ot(this,1),this.$destroy=r}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){this.$$set&&!l(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}},function(t,e,n){"use strict";var r=n(0);n.d(e,"a",(function(){return r.c})),n.d(e,"b",(function(){return r.p})),n.d(e,"c",(function(){return r.x})),n.d(e,"d",(function(){return r.I})),n.d(e,"e",(function(){return r.J})),n.d(e,"f",(function(){return r.O}))},function(t,e,n){"use strict";n.d(e,"a",(function(){return c}));var r=n(0);const o=[];function c(t,e=r.H){let n;const c=[];function s(e){if(Object(r.N)(t,e)&&(t=e,n)){const e=!o.length;for(let e=0;e<c.length;e+=1){const n=c[e];n[1](),o.push(n,t)}if(e){for(let t=0;t<o.length;t+=2)o[t][0](o[t+1]);o.length=0}}}return{set:s,update:function(e){s(e(t))},subscribe:function(o,u=r.H){const i=[o,u];return c.push(i),1===c.length&&(n=e(s)||r.H),o(t),()=>{const t=c.indexOf(i);-1!==t&&c.splice(t,1),0===c.length&&(n(),n=null)}}}}},function(t,e,n){"use strict";n.r(e);var r=n(1),o=n(2);const c={},s=()=>({});var u=n(0);function i(t){let e;const n=t[1].default,r=Object(u.r)(n,t,t[0],null);return{c(){r&&r.c()},l(t){r&&r.l(t)},m(t,n){r&&r.m(t,n),e=!0},p(t,[e]){r&&r.p&&1&e&&Object(u.X)(r,n,t,t[0],e,null,null)},i(t){e||(Object(u.V)(r,t),e=!0)},o(t){Object(u.W)(r,t),e=!1},d(t){r&&r.d(t)}}}function a(t,e,n){let{$$slots:r={},$$scope:o}=e;return t.$$set=t=>{"$$scope"in t&&n(0,o=t.$$scope)},[o,r]}class l extends u.a{constructor(t){super(),Object(u.C)(this,t,a,i,u.N,{})}}var f=l;function d(t){let e,n,r=t[1].stack+"";return{c(){e=Object(u.v)("pre"),n=Object(u.T)(r)},l(t){e=Object(u.l)(t,"PRE",{});var o=Object(u.j)(e);n=Object(u.n)(o,r),o.forEach(u.u)},m(t,r){Object(u.D)(t,e,r),Object(u.d)(e,n)},p(t,e){2&e&&r!==(r=t[1].stack+"")&&Object(u.P)(n,r)},d(t){t&&Object(u.u)(e)}}}function p(t){let e,n,r,o,c,s,i,a,l,f=t[1].message+"";document.title=e=t[0];let p=t[2]&&t[1].stack&&d(t);return{c(){n=Object(u.R)(),r=Object(u.v)("h1"),o=Object(u.T)(t[0]),c=Object(u.R)(),s=Object(u.v)("p"),i=Object(u.T)(f),a=Object(u.R)(),p&&p.c(),l=Object(u.w)(),this.h()},l(e){Object(u.L)('[data-svelte="svelte-1o9r2ue"]',document.head).forEach(u.u),n=Object(u.m)(e),r=Object(u.l)(e,"H1",{class:!0});var d=Object(u.j)(r);o=Object(u.n)(d,t[0]),d.forEach(u.u),c=Object(u.m)(e),s=Object(u.l)(e,"P",{class:!0});var h=Object(u.j)(s);i=Object(u.n)(h,f),h.forEach(u.u),a=Object(u.m)(e),p&&p.l(e),l=Object(u.w)(),this.h()},h(){Object(u.f)(r,"class","svelte-8od9u6"),Object(u.f)(s,"class","svelte-8od9u6")},m(t,e){Object(u.D)(t,n,e),Object(u.D)(t,r,e),Object(u.d)(r,o),Object(u.D)(t,c,e),Object(u.D)(t,s,e),Object(u.d)(s,i),Object(u.D)(t,a,e),p&&p.m(t,e),Object(u.D)(t,l,e)},p(t,[n]){1&n&&e!==(e=t[0])&&(document.title=e),1&n&&Object(u.P)(o,t[0]),2&n&&f!==(f=t[1].message+"")&&Object(u.P)(i,f),t[2]&&t[1].stack?p?p.p(t,n):(p=d(t),p.c(),p.m(l.parentNode,l)):p&&(p.d(1),p=null)},i:u.H,o:u.H,d(t){t&&Object(u.u)(n),t&&Object(u.u)(r),t&&Object(u.u)(c),t&&Object(u.u)(s),t&&Object(u.u)(a),p&&p.d(t),t&&Object(u.u)(l)}}}function h(t,e,n){let{status:r}=e,{error:o}=e;return t.$$set=t=>{"status"in t&&n(0,r=t.status),"error"in t&&n(1,o=t.error)},[r,o,!1]}class b extends u.a{constructor(t){var e;super(),document.getElementById("svelte-8od9u6-style")||((e=Object(u.v)("style")).id="svelte-8od9u6-style",e.textContent="h1.svelte-8od9u6,p.svelte-8od9u6{margin:0 auto}h1.svelte-8od9u6{font-size:2.8em;font-weight:700;margin:0 0 0.5em 0}p.svelte-8od9u6{margin:1em auto}@media(min-width: 480px){h1.svelte-8od9u6{font-size:4em}}",Object(u.d)(document.head,e)),Object(u.C)(this,t,h,p,u.N,{status:0,error:1})}}var m=b;function g(t){let e,n,r;const o=[t[4].props];var c=t[4].component;function s(t){let e={};for(let t=0;t<o.length;t+=1)e=Object(u.e)(e,o[t]);return{props:e}}return c&&(e=new c(s())),{c(){e&&Object(u.q)(e.$$.fragment),n=Object(u.w)()},l(t){e&&Object(u.k)(e.$$.fragment,t),n=Object(u.w)()},m(t,o){e&&Object(u.G)(e,t,o),Object(u.D)(t,n,o),r=!0},p(t,r){const i=16&r?Object(u.z)(o,[Object(u.y)(t[4].props)]):{};if(c!==(c=t[4].component)){if(e){Object(u.B)();const t=e;Object(u.W)(t.$$.fragment,1,0,()=>{Object(u.s)(t,1)}),Object(u.i)()}c?(e=new c(s()),Object(u.q)(e.$$.fragment),Object(u.V)(e.$$.fragment,1),Object(u.G)(e,n.parentNode,n)):e=null}else c&&e.$set(i)},i(t){r||(e&&Object(u.V)(e.$$.fragment,t),r=!0)},o(t){e&&Object(u.W)(e.$$.fragment,t),r=!1},d(t){t&&Object(u.u)(n),e&&Object(u.s)(e,t)}}}function $(t){let e,n;return e=new m({props:{error:t[0],status:t[1]}}),{c(){Object(u.q)(e.$$.fragment)},l(t){Object(u.k)(e.$$.fragment,t)},m(t,r){Object(u.G)(e,t,r),n=!0},p(t,n){const r={};1&n&&(r.error=t[0]),2&n&&(r.status=t[1]),e.$set(r)},i(t){n||(Object(u.V)(e.$$.fragment,t),n=!0)},o(t){Object(u.W)(e.$$.fragment,t),n=!1},d(t){Object(u.s)(e,t)}}}function O(t){let e,n,r,o;const c=[$,g],s=[];function i(t,e){return t[0]?0:1}return e=i(t),n=s[e]=c[e](t),{c(){n.c(),r=Object(u.w)()},l(t){n.l(t),r=Object(u.w)()},m(t,n){s[e].m(t,n),Object(u.D)(t,r,n),o=!0},p(t,o){let a=e;e=i(t),e===a?s[e].p(t,o):(Object(u.B)(),Object(u.W)(s[a],1,1,()=>{s[a]=null}),Object(u.i)(),n=s[e],n?n.p(t,o):(n=s[e]=c[e](t),n.c()),Object(u.V)(n,1),n.m(r.parentNode,r))},i(t){o||(Object(u.V)(n),o=!0)},o(t){Object(u.W)(n),o=!1},d(t){s[e].d(t),t&&Object(u.u)(r)}}}function j(t){let e,n;const r=[{segment:t[2][0]},t[3].props];let o={$$slots:{default:[O]},$$scope:{ctx:t}};for(let t=0;t<r.length;t+=1)o=Object(u.e)(o,r[t]);return e=new f({props:o}),{c(){Object(u.q)(e.$$.fragment)},l(t){Object(u.k)(e.$$.fragment,t)},m(t,r){Object(u.G)(e,t,r),n=!0},p(t,[n]){const o=12&n?Object(u.z)(r,[4&n&&{segment:t[2][0]},8&n&&Object(u.y)(t[3].props)]):{};147&n&&(o.$$scope={dirty:n,ctx:t}),e.$set(o)},i(t){n||(Object(u.V)(e.$$.fragment,t),n=!0)},o(t){Object(u.W)(e.$$.fragment,t),n=!1},d(t){Object(u.s)(e,t)}}}function y(t,e,n){let{stores:o}=e,{error:s}=e,{status:u}=e,{segments:i}=e,{level0:a}=e,{level1:l=null}=e,{notify:f}=e;return Object(r.a)(f),Object(r.f)(c,o),t.$$set=t=>{"stores"in t&&n(5,o=t.stores),"error"in t&&n(0,s=t.error),"status"in t&&n(1,u=t.status),"segments"in t&&n(2,i=t.segments),"level0"in t&&n(3,a=t.level0),"level1"in t&&n(4,l=t.level1),"notify"in t&&n(6,f=t.notify)},[s,u,i,a,l,o,f]}class v extends u.a{constructor(t){super(),Object(u.C)(this,t,y,j,u.N,{stores:5,error:0,status:1,segments:2,level0:3,level1:4,notify:6})}}var w=v;const _=[/^\/web-push-client\/?$/],E=[{js:()=>n.e(2).then(n.bind(null,144)),css:"__SAPPER_CSS_PLACEHOLDER:index.svelte__"},{js:()=>n.e(0).then(n.bind(null,145)),css:"__SAPPER_CSS_PLACEHOLDER:about.svelte__"},{js:()=>Promise.all([n.e(5),n.e(4)]).then(n.bind(null,146)),css:"__SAPPER_CSS_PLACEHOLDER:pgAPI/index.svelte__"},{js:()=>n.e(1).then(n.bind(null,147)),css:"__SAPPER_CSS_PLACEHOLDER:home/index.svelte__"}],S=[{pattern:/^\/$/,parts:[{i:0}]},{pattern:/^\/about\/?$/,parts:[{i:1}]},{pattern:/^\/pgAPI\/?$/,parts:[{i:2}]},{pattern:/^\/home\/?$/,parts:[{i:3}]}];const x="undefined"!=typeof __SAPPER__&&__SAPPER__;let P,k,C,R=!1,L=[],A="{}";const q={page:function(t){const e=Object(o.a)(t);let n=!0;return{notify:function(){n=!0,e.update(t=>t)},set:function(t){n=!1,e.set(t)},subscribe:function(t){let r;return e.subscribe(e=>{(void 0===r||n&&e!==r)&&t(r=e)})}}}({}),preloading:Object(o.a)(null),session:Object(o.a)(x&&x.session)};let N,T;q.session.subscribe(async t=>{if(N=t,!R)return;T=!0;const e=B(new URL(location.href)),n=k={},{redirect:r,props:o,branch:c}=await K(e);n===k&&await G(r,c,o,e.page)});let D,H=null;let U,I=1;const V="undefined"!=typeof history?history:{pushState:(t,e,n)=>{},replaceState:(t,e,n)=>{},scrollRestoration:""},M={};function W(t){const e=Object.create(null);return t.length>0&&t.slice(1).split("&").forEach(t=>{let[,n,r=""]=/([^=]*)(?:=(.*))?/.exec(decodeURIComponent(t.replace(/\+/g," ")));"string"==typeof e[n]&&(e[n]=[e[n]]),"object"==typeof e[n]?e[n].push(r):e[n]=r}),e}function B(t){if(t.origin!==location.origin)return null;if(!t.pathname.startsWith(x.baseUrl))return null;let e=t.pathname.slice(x.baseUrl.length);if(""===e&&(e="/"),!_.some(t=>t.test(e)))for(let n=0;n<S.length;n+=1){const r=S[n],o=r.pattern.exec(e);if(o){const n=W(t.search),c=r.parts[r.parts.length-1],s=c.params?c.params(o):{},u={host:location.host,path:e,query:n,params:s};return{href:t.href,route:r,match:o,page:u}}}}function J(){return{x:pageXOffset,y:pageYOffset}}async function z(t,e,n,r){if(e)U=e;else{const t=J();M[U]=t,e=U=++I,M[U]=n?t:{x:0,y:0}}U=e,P&&q.preloading.set(!0);const o=H&&H.href===t.href?H.promise:K(t);H=null;const c=k={},{redirect:s,props:u,branch:i}=await o;if(c===k&&(await G(s,i,u,t.page),document.activeElement&&document.activeElement.blur(),!n)){let t=M[e];if(r){const e=document.getElementById(r.slice(1));e&&(t={x:0,y:e.getBoundingClientRect().top+scrollY})}M[U]=t,t&&scrollTo(t.x,t.y)}}async function G(t,e,n,r){if(t)return function(t,e={replaceState:!1}){const n=B(new URL(t,document.baseURI));return n?(V[e.replaceState?"replaceState":"pushState"]({id:U},"",t),z(n,null).then(()=>{})):(location.href=t,new Promise(t=>{}))}(t.location,{replaceState:!0});if(q.page.set(r),q.preloading.set(!1),P)P.$set(n);else{n.stores={page:{subscribe:q.page.subscribe},preloading:{subscribe:q.preloading.subscribe},session:q.session},n.level0={props:await C},n.notify=q.page.notify;const t=document.querySelector("#sapper-head-start"),e=document.querySelector("#sapper-head-end");if(t&&e){for(;t.nextSibling!==e;)Y(t.nextSibling);Y(t),Y(e)}P=new w({target:D,props:n,hydrate:!0})}L=e,A=JSON.stringify(r.query),R=!0,T=!1}async function K(t){const{route:e,page:n}=t,r=n.path.split("/").filter(Boolean);let o=null;const c={error:null,status:200,segments:[r[0]]},u={fetch:(t,e)=>fetch(t,e),redirect:(t,e)=>{if(o&&(o.statusCode!==t||o.location!==e))throw new Error("Conflicting redirects");o={statusCode:t,location:e}},error:(t,e)=>{c.error="string"==typeof e?new Error(e):e,c.status=t}};let i;C||(C=x.preloaded[0]||s.call(u,{host:n.host,path:n.path,query:n.query,params:{}},N));let a=1;try{const o=JSON.stringify(n.query),s=e.pattern.exec(n.path);let l=!1;i=await Promise.all(e.parts.map(async(e,i)=>{const f=r[i];if(function(t,e,n,r){if(r!==A)return!0;const o=L[t];return!!o&&(e!==o.segment||(!(!o.match||JSON.stringify(o.match.slice(1,t+2))===JSON.stringify(n.slice(1,t+2)))||void 0))}(i,f,s,o)&&(l=!0),c.segments[a]=r[i+1],!e)return{segment:f};const d=a++;if(!T&&!l&&L[i]&&L[i].part===e.i)return L[i];l=!1;const{default:p,preload:h}=await F(E[e.i]);let b;return b=R||!x.preloaded[i+1]?h?await h.call(u,{host:n.host,path:n.path,query:n.query,params:e.params?e.params(t.match):{}},N):{}:x.preloaded[i+1],c["level"+d]={component:p,props:b,segment:f,match:s,part:e.i}}))}catch(t){c.error=t,c.status=500,i=[]}return{redirect:o,props:c,branch:i}}function X(t){const e="client/"+t;if(!document.querySelector(`link[href="${e}"]`))return new Promise((t,n)=>{const r=document.createElement("link");r.rel="stylesheet",r.href=e,r.onload=()=>t(),r.onerror=n,document.head.appendChild(r)})}function F(t){const e="string"==typeof t.css?[]:t.css.map(X);return e.unshift(t.js()),Promise.all(e).then(t=>t[0])}function Y(t){t.parentNode.removeChild(t)}function Q(t){const e=B(new URL(t,document.baseURI));if(e)return H&&t===H.href||function(t,e){H={href:t,promise:e}}(t,K(e)),H.promise}let Z;function tt(t){clearTimeout(Z),Z=setTimeout(()=>{et(t)},20)}function et(t){const e=rt(t.target);e&&"prefetch"===e.rel&&Q(e.href)}function nt(t){if(1!==function(t){return null===t.which?t.button:t.which}(t))return;if(t.metaKey||t.ctrlKey||t.shiftKey)return;if(t.defaultPrevented)return;const e=rt(t.target);if(!e)return;if(!e.href)return;const n="object"==typeof e.href&&"SVGAnimatedString"===e.href.constructor.name,r=String(n?e.href.baseVal:e.href);if(r===location.href)return void(location.hash||t.preventDefault());if(e.hasAttribute("download")||"external"===e.getAttribute("rel"))return;if(n?e.target.baseVal:e.target)return;const o=new URL(r);if(o.pathname===location.pathname&&o.search===location.search)return;const c=B(o);if(c){z(c,null,e.hasAttribute("sapper-noscroll"),o.hash),t.preventDefault(),V.pushState({id:U},"",o.href)}}function rt(t){for(;t&&"A"!==t.nodeName.toUpperCase();)t=t.parentNode;return t}function ot(t){if(M[U]=J(),t.state){const e=B(new URL(location.href));e?z(e,t.state.id):location.href=location.href}else I=I+1,function(t){U=t}(I),V.replaceState({id:U},"",location.href)}var ct,st;ct={target:document.querySelector("#sapper")},"scrollRestoration"in V&&(V.scrollRestoration="manual"),addEventListener("beforeunload",()=>{V.scrollRestoration="auto"}),addEventListener("load",()=>{V.scrollRestoration="manual"}),st=ct.target,D=st,addEventListener("click",nt),addEventListener("popstate",ot),addEventListener("touchstart",et),addEventListener("mousemove",tt),Promise.resolve().then(()=>{const{hash:t,href:e}=location;V.replaceState({id:I},"",e);const n=new URL(location.href);if(x.error)return function(t){const{host:e,pathname:n,search:r}=location,{session:o,preloaded:c,status:s,error:u}=x;C||(C=c&&c[0]),G(null,[],{error:u,status:s,session:o,level0:{props:C},level1:{props:{status:s,error:u},component:m},segments:c},{host:e,path:n,query:W(r),params:{}})}();const r=B(n);return r?z(r,I,!0,t):void 0})}]);