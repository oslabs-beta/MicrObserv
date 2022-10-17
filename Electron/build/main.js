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

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nconst { app, BrowserWindow } = __webpack_require__(/*! electron */ \"electron\");\nconsole.log('Hello World');\n//creates a new window\nconst createWindow = () => {\n    const win = new BrowserWindow({\n        width: 800,\n        height: 600,\n    });\n    win.loadFile('./index.html');\n    // Open the DevTools.\n    win.webContents.openDevTools();\n};\napp.whenReady().then(() => {\n    createWindow();\n});\n//quits the app when all windows are closed\napp.on('window-all-closed', () => {\n    // On macOS it is common for applications and their\n    // menu bar to stay active until the user quits\n    // explicitly with Cmd + Q\n    if (process.platform !== 'darwin') {\n        app.quit();\n    }\n});\napp.on('activate', () => {\n    // On macOS it's common to re-create a window in the\n    // app when the dock icon is clicked and there are no\n    // other windows open.\n    if (BrowserWindow.getAllWindows().length === 0) {\n        createWindow();\n    }\n});\n\n\n//# sourceURL=webpack://electron/./src/main.ts?");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;