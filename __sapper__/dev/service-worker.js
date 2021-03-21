/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/service-worker.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/node_modules/@sapper/service-worker.js":
/*!****************************************************!*\
  !*** ./src/node_modules/@sapper/service-worker.js ***!
  \****************************************************/
/*! exports provided: timestamp, files, assets, shell, routes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"timestamp\", function() { return timestamp; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"files\", function() { return files; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"assets\", function() { return files; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"shell\", function() { return shell; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"routes\", function() { return routes; });\n// This file is generated by Sapper — do not edit it!\nconst timestamp = 1616326910855;\n\nconst files = [\n\t\"service-worker-index.html\",\n\t\"_manifest.json\",\n\t\"css/bulma/bulma.min.css\",\n\t\"css/fontawesome/css/all.css\",\n\t\"css/fontawesome/css/all.min.css\",\n\t\"css/fontawesome/css/brands.css\",\n\t\"css/fontawesome/css/brands.min.css\",\n\t\"css/fontawesome/css/fontawesome.css\",\n\t\"css/fontawesome/css/fontawesome.min.css\",\n\t\"css/fontawesome/css/regular.css\",\n\t\"css/fontawesome/css/regular.min.css\",\n\t\"css/fontawesome/css/solid.css\",\n\t\"css/fontawesome/css/solid.min.css\",\n\t\"css/fontawesome/css/svg-with-js.css\",\n\t\"css/fontawesome/css/svg-with-js.min.css\",\n\t\"css/fontawesome/css/v4-shims.css\",\n\t\"css/fontawesome/css/v4-shims.min.css\",\n\t\"css/fontawesome/webfonts/fa-brands-400.eot\",\n\t\"css/fontawesome/webfonts/fa-brands-400.svg\",\n\t\"css/fontawesome/webfonts/fa-brands-400.ttf\",\n\t\"css/fontawesome/webfonts/fa-brands-400.woff\",\n\t\"css/fontawesome/webfonts/fa-brands-400.woff2\",\n\t\"css/fontawesome/webfonts/fa-regular-400.eot\",\n\t\"css/fontawesome/webfonts/fa-regular-400.svg\",\n\t\"css/fontawesome/webfonts/fa-regular-400.ttf\",\n\t\"css/fontawesome/webfonts/fa-regular-400.woff\",\n\t\"css/fontawesome/webfonts/fa-regular-400.woff2\",\n\t\"css/fontawesome/webfonts/fa-solid-900.eot\",\n\t\"css/fontawesome/webfonts/fa-solid-900.svg\",\n\t\"css/fontawesome/webfonts/fa-solid-900.ttf\",\n\t\"css/fontawesome/webfonts/fa-solid-900.woff\",\n\t\"css/fontawesome/webfonts/fa-solid-900.woff2\",\n\t\"favicon (1).png\",\n\t\"favicon.png\",\n\t\"global.css\",\n\t\"icons/icon-128x128.png\",\n\t\"icons/icon-144x144.png\",\n\t\"icons/icon-152x152.png\",\n\t\"icons/icon-192x192.png\",\n\t\"icons/icon-384x384.png\",\n\t\"icons/icon-512x512.png\",\n\t\"icons/icon-72x72.png\",\n\t\"icons/icon-96x96.png\",\n\t\"img/icon.png\",\n\t\"logo.ico\",\n\t\"logo.png\",\n\t\"logo.svg\",\n\t\"manifest.json\",\n\t\"test.html\"\n];\n // legacy\n\nconst shell = [\n\t\"client/bdcc2a73454ab31e0763/0.0.js\",\n\t\"client/bdcc2a73454ab31e0763/about.about.js\",\n\t\"client/bdcc2a73454ab31e0763/home.home.js\",\n\t\"client/bdcc2a73454ab31e0763/index.index.js\",\n\t\"client/bdcc2a73454ab31e0763/main.js\",\n\t\"client/bdcc2a73454ab31e0763/pgAPI.pgAPI.js\",\n\t\"client/bdcc2a73454ab31e0763/vendors~pgAPI.vendors~pgAPI.js\"\n];\n\nconst routes = [\n\t{ pattern: /^\\/$/ },\n\t{ pattern: /^\\/about\\/?$/ },\n\t{ pattern: /^\\/pgAPI\\/?$/ },\n\t{ pattern: /^\\/home\\/?$/ }\n];\n\n//# sourceURL=webpack:///./src/node_modules/@sapper/service-worker.js?");

/***/ }),

/***/ "./src/service-worker.js":
/*!*******************************!*\
  !*** ./src/service-worker.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sapper_service_worker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sapper/service-worker */ \"./src/node_modules/@sapper/service-worker.js\");\n\n\nconst ASSETS = `cache${_sapper_service_worker__WEBPACK_IMPORTED_MODULE_0__[\"timestamp\"]}`;\n\n// `shell` is an array of all the files generated by the bundler,\n// `files` is an array of everything in the `static` directory\nconst to_cache = _sapper_service_worker__WEBPACK_IMPORTED_MODULE_0__[\"shell\"].concat(_sapper_service_worker__WEBPACK_IMPORTED_MODULE_0__[\"files\"]);\nconst cached = new Set(to_cache);\n\nself.addEventListener('push', event => {\n\t\nconst data = event.data.json();\nconsole.log(data, self);\n\n//self.localStorage.setItem(\"pushID\",data);\n\n\tself.registration.showNotification(data.title, {\n\t\tbody: data.message\n\t});\n});\n\n\n\nself.addEventListener('install', event => {\n\tevent.waitUntil(\n\t\tcaches\n\t\t\t.open(ASSETS)\n\t\t\t.then(cache => cache.addAll(to_cache))\n\t\t\t.then(() => {\n\t\t\t\tself.skipWaiting();\n\t\t\t})\n\t);\n});\n\nself.addEventListener('activate', event => {\n\tevent.waitUntil(\n\t\tcaches.keys().then(async keys => {\n\t\t\t// delete old caches\n\t\t\tfor (const key of keys) {\n\t\t\t\tif (key !== ASSETS) await caches.delete(key);\n\t\t\t}\n\n\t\t\tself.clients.claim();\n\t\t})\n\t);\n});\n\nself.addEventListener('fetch', event => {\n\tif (event.request.method !== 'GET' || event.request.headers.has('range')) return;\n\n\tconst url = new URL(event.request.url);\n\n\t// don't try to handle e.g. data: URIs\n\tif (!url.protocol.startsWith('http')) return;\n\n\t// ignore dev server requests\n\tif (url.hostname === self.location.hostname && url.port !== self.location.port) return;\n\n\t// always serve static files and bundler-generated assets from cache\n\tif (url.host === self.location.host && cached.has(url.pathname)) {\n\t\tevent.respondWith(caches.match(event.request));\n\t\treturn;\n\t}\n\n\t// for pages, you might want to serve a shell `service-worker-index.html` file,\n\t// which Sapper has generated for you. It's not right for every\n\t// app, but if it's right for yours then uncomment this section\n\t/*\n\tif (url.origin === self.origin && routes.find(route => route.pattern.test(url.pathname))) {\n\t\tevent.respondWith(caches.match('/service-worker-index.html'));\n\t\treturn;\n\t}\n\t*/\n\n\tif (event.request.cache === 'only-if-cached') return;\n\n\t// for everything else, try the network first, falling back to\n\t// cache if the user is offline. (If the pages never change, you\n\t// might prefer a cache-first approach to a network-first one.)\n\tevent.respondWith(\n\t\tcaches\n\t\t\t.open(`offline${_sapper_service_worker__WEBPACK_IMPORTED_MODULE_0__[\"timestamp\"]}`)\n\t\t\t.then(async cache => {\n\t\t\t\ttry {\n\t\t\t\t\tconst response = await fetch(event.request);\n\t\t\t\t\tcache.put(event.request, response.clone());\n\t\t\t\t\treturn response;\n\t\t\t\t} catch(err) {\n\t\t\t\t\tconst response = await cache.match(event.request);\n\t\t\t\t\tif (response) return response;\n\n\t\t\t\t\tthrow err;\n\t\t\t\t}\n\t\t\t})\n\t);\n});\n\n\n//# sourceURL=webpack:///./src/service-worker.js?");

/***/ })

/******/ });