/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles/index.scss":
/*!*******************************!*\
  !*** ./src/styles/index.scss ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + \"style.css\");\n\n//# sourceURL=webpack://weather-app-js/./src/styles/index.scss?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/index.scss */ \"./src/styles/index.scss\");\n/* harmony import */ var _modules_ui_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/ui.js */ \"./src/modules/ui.js\");\n/* harmony import */ var _modules_weather_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/weather.js */ \"./src/modules/weather.js\");\n\n\n\n\n// fire weather data after search input\nconst searchInput = document.querySelector(\"#search\");\nsearchInput.addEventListener(\"keypress\", async (e) => {\n  if (e.key === \"Enter\") {\n    if (searchInput.value !== \"\") {\n      const weatherData = await _modules_weather_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getData(searchInput.value);\n      _modules_ui_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].setLocation(weatherData);\n    } else searchInput.blur();\n  }\n});\n\n\n//# sourceURL=webpack://weather-app-js/./src/index.js?");

/***/ }),

/***/ "./src/modules/ui.js":
/*!***************************!*\
  !*** ./src/modules/ui.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ui)\n/* harmony export */ });\nclass ui {\n  static setLocation(weatherData) {\n    if (!weatherData) return;\n\n    const country = document.querySelector(\"#country\");\n    const region = document.querySelector(\"#region\");\n    const condition = document.querySelector(\"#condition\");\n    const localTime = document.querySelector(\"#local-time\");\n    const temperature = document.querySelector(\"#temperature\");\n    const humidity = document.querySelector(\"#humidity\");\n    const wind = document.querySelector(\"#wind\");\n\n    country.textContent = `${weatherData.location.country}`;\n    region.textContent = `${weatherData.location.region}`;\n    condition.textContent = `${weatherData.current.condition.text}`;\n    localTime.textContent = `${weatherData.location.localtime}`;\n    temperature.textContent = `${weatherData.current.temp_c} °C`;\n    humidity.textContent = `${weatherData.current.humidity} %`;\n    wind.textContent = `${weatherData.current.wind_kph} kph`;\n  }\n}\n\n\n//# sourceURL=webpack://weather-app-js/./src/modules/ui.js?");

/***/ }),

/***/ "./src/modules/weather.js":
/*!********************************!*\
  !*** ./src/modules/weather.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ weather)\n/* harmony export */ });\n/* eslint-disable camelcase */\nclass weather {\n  static async getData(city) {\n    const url = `http://api.weatherapi.com/v1/forecast.json?key=f2dadfc93b46435e9c410604232410&q=${city}&days=1&aqi=no&alerts=no`;\n\n    try {\n      const response = await fetch(url, { mode: \"cors\" });\n      if (!response.ok) throw new Error(`City ${city} not found.`);\n      const data = weather.convertData(await response.json());\n\n      //   const data = await response.json();\n      console.log(data);\n      return data;\n    } catch (error) {\n      alert(error);\n      return null;\n    }\n  }\n\n  //   the functions below organizes the json file\n  static convertData(data) {\n    const forecast = data.forecast.forecastday[0];\n    return {\n      location: weather.parseLocation(data),\n      current: weather.parseCurrentWeather(data),\n      forecast: weather.parseForecast(forecast),\n    };\n  }\n\n  static parseLocation({ location }) {\n    const { country, region, localtime } = location;\n    return { country, region, localtime };\n  }\n\n  static parseCurrentWeather({ current }) {\n    const {\n      condition,\n      humidity,\n      temp_c,\n      temp_f,\n      wind_kph,\n      precip_mm: precipitation,\n      cloud: cloudAmount,\n      is_day,\n      uv,\n    } = current;\n    return {\n      condition,\n      humidity,\n      temp_c,\n      temp_f,\n      wind_kph,\n      precipitation,\n      cloudAmount,\n      is_day,\n      uv,\n    };\n  }\n\n  static parseForecast(forecast) {\n    const { astro, day, hour } = forecast;\n    return { astro, day, hour };\n  }\n}\n\n\n//# sourceURL=webpack://weather-app-js/./src/modules/weather.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;