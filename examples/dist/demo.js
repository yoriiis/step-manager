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
/******/ 	return __webpack_require__(__webpack_require__.s = "./examples/src/scripts/demo.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./dist/step-manager.js":
/*!******************************!*\
  !*** ./dist/step-manager.js ***!
  \******************************/
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/cache-manager.js":
/*!******************************!*\
  !*** ./src/cache-manager.js ***!
  \******************************/
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CacheManager; });
class CacheManager {
  /**
   * @param {options}
   */
  constructor(options) {
    const userOptions = options || {};
    const defaultOptions = {
      cacheMethod: 'sessionStorage',
      keyBrowserStorage: 'stepManager'
    }; // Merge default options with user options

    this.options = Object.assign(defaultOptions, userOptions);
  }
  /**
   * Get step datas from the cache
   *
   * @param {Array} filters Filter the request by route
   *
   * @returns {Object} Datas from the cache
   */


  getDatasFromCache(filters) {
    let datasToReturn = null; // Retrieve the data in the cache with the correct key
    // Cache key is composed by profile id and a static name

    const datas = window[this.options.cacheMethod].getItem(this.options.keyBrowserStorage) || null;

    if (datas !== null) {
      // Datas are stringify, parse them
      const datasFormatted = JSON.parse(datas); // Check if datas must be filtered

      datasToReturn = Array.isArray(filters) ? this.filterDatas(filters, datasFormatted) : datasFormatted;
    }

    return datasToReturn;
  }
  /**
   * Filter datas from cache by keys
   *
   * @param {Array} filters Filters list
   * @param {Object} datas Datas from browser storage
   *
   * @returns {Object} Datas filtered by keys
   */


  filterDatas(filters, datas) {
    let datasToReturn = null; // Loop on all route filters and extract selected routes datas

    const validKeys = Object.keys(datas).filter(key => filters.includes(key));

    if (validKeys.length) {
      datasToReturn = {};
      validKeys.map(key => datasToReturn[key] = datas[key]);
    }

    return datasToReturn;
  }
  /**
   * Set step datas to the cache
   *
   * @param {String} id Current step id
   * @param {Object} datas Datas of the step
   */


  setDatasToCache({
    id,
    datas
  }) {
    let datasFromCache = this.getDatasFromCache(); // First time

    if (!datasFromCache) {
      datasFromCache = {};
    }

    if (!datasFromCache[id]) {
      datasFromCache[id] = {};
    }

    datasFromCache[id].datas = datas;
    window[this.options.cacheMethod].setItem(`${this.options.keyBrowserStorage}`, JSON.stringify(datasFromCache));
  }
  /**
   * Remove datas from the cache
   * Used only when all steps are completed
   */


  removeDatasFromCache() {
    window[this.options.cacheMethod].removeItem(`${this.options.keyBrowserStorage}`);
  }

}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./manager */ "./src/manager.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Manager", function() { return _manager__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _steps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./steps */ "./src/steps.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Steps", function() { return _steps__WEBPACK_IMPORTED_MODULE_1__["default"]; });




/***/ }),

/***/ "./src/manager.js":
/*!************************!*\
  !*** ./src/manager.js ***!
  \************************/
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Manager; });
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./router */ "./src/router.js");
/* harmony import */ var _cache_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cache-manager */ "./src/cache-manager.js");


/**
 * @license MIT
 * @name StepManager
 * @version 1.1.0
 * @author: Yoriiis aka Joris DANIEL <joris.daniel@gmail.com>
 * @description: StepManager is a library to create flexible and robust multiple steps navigation with hash, validations, browser storage and hook functions.
 * {@link https://github.com/yoriiis/step-manager}
 * @copyright 2020 Joris DANIEL
 **/

class Manager {
  /**
   * @param {options}
   */
  constructor(options) {
    const userOptions = options || {};
    const defaultOptions = {
      element: null,
      datas: {},
      steps: [],
      cacheMethod: 'sessionStorage',
      keyBrowserStorage: 'stepManager',
      onComplete: () => {}
    }; // Merge default options with user options

    this.options = Object.assign(defaultOptions, userOptions);
    this.isCompleted = false;
    this.triggerPreviousStep = this.triggerPreviousStep.bind(this);
    this.triggerNextStep = this.triggerNextStep.bind(this);
  }
  /**
   * Function to initialize the Manager
   */


  init() {
    this.addEvents();
    const results = this.analyzeSteps();
    this.steps = results.steps;
    this.CacheManager = new _cache_manager__WEBPACK_IMPORTED_MODULE_1__["default"]({
      cacheMethod: this.options.cacheMethod,
      keyBrowserStorage: this.options.keyBrowserStorage
    });
    this.Router = new _router__WEBPACK_IMPORTED_MODULE_0__["default"]({
      defaultRoute: results.defaultRoute,
      stepsOrder: results.stepsOrder,
      steps: this.steps,
      getDatasFromCache: filters => this.CacheManager.getDatasFromCache(filters)
    }); // Initialize the router

    this.Router.init();
  }
  /**
   * Analyze steps and store instance
   * Expose new methods to each steps (requestOptions, requestDatas)
   * to access the Manager form steps
   *
   * @returns {Object} Object with steps instance, steps order and default route
   */


  analyzeSteps() {
    const steps = {};
    const stepsOrder = [];
    let defaultRoute; // Loop on all available steps

    this.options.steps.forEach((Step, index) => {
      // Initialize the step to access them all along the application
      const currentStep = new Step(); // Get the step route

      const stepId = currentStep.id; // Expose new functions on each steps

      currentStep.requestOptions = () => this.options;

      currentStep.requestDatas = (...filters) => this.CacheManager.getDatasFromCache(filters); // Store the instance reference in class properties


      steps[stepId] = currentStep; // Set an ordered array with routes name

      stepsOrder.push({
        id: stepId,
        route: currentStep.route
      }); // Save the default route

      if (index === 0) {
        defaultRoute = currentStep.route;
      }
    });
    return {
      steps,
      stepsOrder,
      defaultRoute
    };
  }
  /**
   * Create manager event listeners
   * All listeners are created on class properties to facilitate the deletion of events
   */


  addEvents() {
    // Create custom event to listen navigation changes from steps
    this.eventNextStep = new window.Event('nextStep');
    this.options.element.addEventListener('nextStep', this.triggerNextStep, false);
    this.eventNextStep = new window.Event('previousStep');
    this.options.element.addEventListener('previousStep', this.triggerPreviousStep, false);
  }
  /**
   * Trigger next steps
   *
   * @param {Object} e Event listener datas
   */


  triggerNextStep(e) {
    // Check if steps are completed
    if (!this.isCompleted) {
      // Get datas from the current step
      const stepDatas = this.steps[this.Router.currentRoute].getDatasFromStep(); // Update cache with datas

      this.CacheManager.setDatasToCache({
        id: this.steps[this.Router.currentRoute].id,
        datas: stepDatas
      }); // Trigger the next route if available
      // Else, all steps are completed

      this.Router.triggerNext() || this.allStepsComplete();
    }
  }
  /**
   * Trigger previous steps
   *
   * @param {Object} e Event listener datas
   */


  triggerPreviousStep(e) {
    this.Router.triggerPrevious();
  }
  /**
   * All steps are complete
   */


  async allStepsComplete() {
    this.isCompleted = true; // Freeze the display to prevent multiple submit

    this.options.element.classList.add('loading');
    await this.Router.destroyStep(this.Router.currentRoute);
    this.Router.setRoute('');
    this.destroy(); // Execute the user callback function if available

    if (this.options.onComplete instanceof Function) {
      this.options.onComplete(this.CacheManager.getDatasFromCache());
    } // Clean the cache at the end


    this.CacheManager.removeDatasFromCache();
  }
  /**
   * Destroy the manager (event listeners, router)
   */


  destroy() {
    this.options.element.removeEventListener('nextStep', this.triggerNextStep);
    this.options.element.removeEventListener('previousStep', this.triggerPreviousStep);
    this.Router.destroy();
  }

}

/***/ }),

/***/ "./src/router.js":
/*!***********************!*\
  !*** ./src/router.js ***!
  \***********************/
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Router; });
class Router {
  /**
   * @param {options}
   */
  constructor(options) {
    const userOptions = options || {};
    const defaultOptions = {
      defaultRoute: null,
      stepsOrder: [],
      steps: {},
      getDatasFromCache: () => {}
    }; // Merge default options with user options

    this.options = Object.assign(defaultOptions, userOptions);
    this.reverseNavigation = false;
    this.stepCreated = false;
    this.applicationReady = false;
    this.stepRedirected = {};
    this.hashChanged = this.hashChanged.bind(this);
  }
  /**
   * Initialize the router
   */


  init() {
    this.addEvents(); // Get current route

    const route = this.getRoute(); // Declare the default route
    // If route exist, keep it, else set it to the default route

    this.currentRoute = route === '' ? this.options.defaultRoute : route; // Init the router with the default route

    if (route === '') {
      this.setRoute(this.currentRoute);
    } else {
      // Page started with a route, trigger hash changed
      this.hashChanged();
    }
  }
  /**
   * Create router event listeners
   * All listeners are created on class properties to facilitate the deletion of events
   */


  addEvents() {
    // Create the hash changed event of all the application
    window.addEventListener('hashchange', this.hashChanged, false);
  }
  /**
   * On hash changed event listener
   *
   * @param {Object} e Event listener datas
   */


  hashChanged(e) {
    // Get the current route
    const route = this.getRoute(); // Check if the step can be displayed

    const datas = this.checkIfTheStepCanBeDisplay({
      route: route,
      event: e
    });
    this.currentRoute = route;

    if (datas.canBeDisplayed) {
      this.stepCanBeDisplayed(e, datas.fallbackRoute);
    } else {
      this.stepCantBeDisplayed(e, datas.fallbackRoute);
    }
  }
  /**
   * The step can be displayed
   *
   * @param {Object} e Event listener datas
   */


  async stepCanBeDisplayed(e) {
    // Event listener exist when user click on next step button
    // Event listener does not exist when setRoute is called manually
    if (e) {
      // Get the previous route
      this.previousRoute = this.stepRedirected.redirect ? this.stepRedirected.previousRoute : this.getPreviousRoute(e); // Check if previous step need to be destroyed
      // Prevent destruction when previousRoute does not exist or when user is redirected

      if (this.previousRoute) {
        // Destroy the previous step
        await this.destroyStep(this.previousRoute); // Create the new step on destruction callback

        this.createStep(this.currentRoute);
        this.stepCreated = true;
      }
    } // If destroy method was not called, create the step now


    if (!this.stepCreated) {
      this.createStep(this.currentRoute);
    } // Reset the redirect marker


    if (this.stepRedirected.redirect) {
      this.stepRedirected.redirect = false;
    }
  }
  /**
   * The step can't be displayed
   * Redirect user to the previous route or the fallback route
   *
   * @param {Object} e Event listener datas
   * @param {String} fallbackRoute The fallback route of the step
   */


  stepCantBeDisplayed(e, fallbackRoute) {
    this.stepRedirected = {
      redirect: true,
      previousRoute: this.getPreviousRoute(e)
    };
    this.previousRoute = null; // If the step has a fallback route, use it

    if (fallbackRoute) {
      this.setRoute(fallbackRoute);
    } else {
      this.setRoute(this.options.defaultRoute);
    }
  }
  /**
   * Check if the step can be displayed
   *
   * @param {String} route Route hash
   * @param {Object} event Event listener datas
   *
   * @returns {Object} Status of the step render
   */


  checkIfTheStepCanBeDisplay({
    route,
    event
  }) {
    const routeId = this.getRouteId(route); // Check the validity of the route

    if (this.options.steps[routeId]) {
      // Call the verification method of the step
      // The step itself knows if it can be rendered
      const datas = this.options.steps[routeId].canTheStepBeDisplayed();
      return datas;
    } else {
      let fallbackRoute = this.options.defaultRoute; // Get fallback route from previous route if exist

      const previousRoute = this.getPreviousRoute(event);
      const previousRouteId = this.getRouteId(previousRoute);

      if (previousRoute) {
        if (this.options.steps[previousRouteId].fallbackRoute) {
          fallbackRoute = this.options.steps[previousRouteId].fallbackRoute;
        }
      } // Unknown route, redirect to the fallback route


      return {
        canBeDisplayed: false,
        fallbackRoute: fallbackRoute
      };
    }
  }
  /**
   * Create a step
   *
   * @param {String} route Route of the step
   */


  createStep(route) {
    // Get datas from cache before render the step
    const routeId = this.getRouteId(route);
    const stepDatas = this.options.getDatasFromCache([routeId]); // Call the render method of the step

    if (stepDatas) {
      this.options.steps[routeId].render(stepDatas[routeId].datas);
    } else {
      this.options.steps[routeId].render();
    } // Prevent step created before application ready


    if (!this.applicationReady) {
      this.applicationReady = true;
    }

    this.options.steps[routeId].onChanged('create');
  }
  /**
   * Destroy a step
   *
   * @param {String} route Route of the step
   */


  async destroyStep(route) {
    const routeId = this.getRouteId(route);
    await this.options.steps[routeId].onChanged('destroy'); // Call the destroy method of the step

    this.options.steps[routeId].destroy();
  }
  /**
   * Trigger next step navigation
   *
   * @returns {Boolean} Is the next step exist?
   */


  triggerNext() {
    this.reverseNavigation = false; // Store the current route as the previous route because the route hasn't changed yet

    this.previousRoute = this.currentRoute; // Redirect to the next route or at the end

    const nextRoute = this.getNextStepRoute(this.currentRoute);

    if (nextRoute !== 'end') {
      this.setRoute(nextRoute);
      return true;
    } else {
      return false;
    }
  }
  /**
   * Trigger previous step navigation
   */


  triggerPrevious() {
    this.reverseNavigation = true; // Store the current route as the previous route because the route hasn't changed yet

    this.previousRoute = this.currentRoute;
    const previousRoute = this.getPreviousStepRoute(this.previousRoute);
    this.setRoute(previousRoute);
  }
  /**
   * Get route id from the step
   *
   * @param {String} route Route
   *
   * @returns {String} Route id
   */


  getRouteId(route) {
    const routeStep = this.options.stepsOrder.find(step => step.route === route);
    return routeStep ? routeStep.id : null;
  }
  /**
   * Get the previous route
   *
   * @param {Object} event Event listener datas
   *
   * @returns {String} Previous route
   */


  getPreviousRoute(e) {
    return e && e.oldURL ? e.oldURL.split('#')[1] : null;
  }
  /**
   * Get the previous route from the step order array
   * If there is no previous step, the function return "end"
   *
   * @param {String} route Current route
   *
   * @returns {String} Previous route or "end"
   */


  getPreviousStepRoute(route) {
    const indexCurrentRoute = parseInt(this.getIndexFromRoute(route));
    const previousStep = this.options.stepsOrder[indexCurrentRoute - 1];
    return previousStep ? previousStep.route : this.options.defaultRoute;
  }
  /**
   * Get the next route from the step order array
   * If there is no next step, the function return "end"
   *
   * @param {String} route Current route
   *
   * @returns {String} Next route or "end"
   */


  getNextStepRoute(route) {
    const indexCurrentRoute = parseInt(this.getIndexFromRoute(route));
    const nextStep = this.options.stepsOrder[indexCurrentRoute + 1];
    return nextStep ? nextStep.route : 'end';
  }
  /**
   * Get index of the route from the step order array
   *
   * @returns {Integer} Index of the route
   */


  getIndexFromRoute(route) {
    return this.options.stepsOrder.findIndex(step => {
      return step.route === route;
    });
  }
  /**
   * Get the current route
   *
   * @returns {Array} Current route
   */


  getRoute() {
    return window.location.hash.substr(1);
  }
  /**
   * Set the route
   *
   * @returns {String} route New value for the route
   */


  setRoute(route) {
    window.location.hash = route;
  }
  /**
   * Destroy the router (event listeners)
   */


  destroy() {
    window.removeEventListener('hashchange', this.hashChanged);
  }

}

/***/ }),

/***/ "./src/steps.js":
/*!**********************!*\
  !*** ./src/steps.js ***!
  \**********************/
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Steps; });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Steps {
  // Set public instance fields
  constructor() {
    _defineProperty(this, "fallbackRoute", null);

    _defineProperty(this, "optionalStep", false);

    this.clickOnCurrentStep = this.clickOnCurrentStep.bind(this);
  }
  /**
   * Render the step
   *
   * @param {Object} datas Datas from the cache
   */


  render(datas) {
    this.options = this.requestOptions(); // Insert the generated HTML for the step
    // Get the template from the specific class and send it datas

    this.options.element.insertAdjacentHTML('beforeend', this.getTemplate(this.getStepDatasToRender())); // The DOM is up to date, trigger the after render method with datas from the cache

    this.afterRender(datas);
  }
  /**
   * Function executed after the render of the step
   *
   * @param {Object} datas Datas from the cache
   */


  afterRender(datas) {
    // Set cached selector
    this.currentStep = this.options.element.querySelector(this.selector); // Add event listeners

    this.addEvents(); // If datas from cache exist and specific class has the appropriate method, render datas from the cache

    if (datas && this.renderDatasFromCache) {
      this.renderDatasFromCache(datas);
    }
  }

  getStepDatasToRender() {
    return null;
  }
  /**
   * Destroy the step
   */


  destroy() {
    // Remove events add by the master class
    this.removeEvents(); // Remove the DOM element

    this.currentStep.remove();
  }
  /**
   * Create steps event listeners (common on all specific step)
   * All listeners are created on class properties to facilitate the deletion of events
   */


  addEvents() {
    // Use event delegation for better performance
    this.currentStep.addEventListener('click', this.clickOnCurrentStep, false);
  }
  /**
   * Click event listener on the step
   *
   * @param {Object} e Event listener datas
   */


  clickOnCurrentStep(e) {
    const target = e.target;

    if (target.nodeName.toLowerCase() === 'button' && target.hasAttribute('data-step-previous')) {
      // Click on the previous step button
      this.clickToPreviousStep(e);
    } else if (target.nodeName.toLowerCase() === 'button' && target.hasAttribute('data-step-next')) {
      // Click on the next step button
      this.clickToNextStep(e);
    }
  }
  /**
   * Event listener to click on the next step button
   *
   * @param {Object} e Event listener datas
   */


  clickToNextStep(e) {
    e.preventDefault(); // Click is authorized when the step is ready to submit or if the step is optional

    if (this.stepIsReadyToSubmit || this.optionalStep) {
      // Dispatch the custom event to the Manager
      this.options.element.dispatchEvent(new window.CustomEvent('nextStep'));
    }
  }
  /**
   * Event listener to click on the previous step button
   *
   * @param {Object} e Event listener datas
   */


  clickToPreviousStep(e) {
    e.preventDefault(); // Dispatch the custom event to the Manager

    this.options.element.dispatchEvent(new window.CustomEvent('previousStep'));
  }

  checkIfStepIsReadyToSubmit() {
    // If the specific class contains local datas, the step is ready to submit
    this.stepIsReadyToSubmit = this.getDatasFromStep() !== null; // Update the submit button

    this.updateButtonToValidateStep();
  }
  /**
   * Update the submit button
   */


  updateButtonToValidateStep() {
    const button = this.currentStep.querySelector('[data-step-next]');

    if (this.stepIsReadyToSubmit || this.optionalStep) {
      button.classList.remove('disabled');
    } else {
      button.classList.add('disabled');
    }
  }
  /**
   * Remove steps event listeners
   */


  removeEvents() {
    this.currentStep.removeEventListener('click', this.clickOnCurrentStep);
  }

  onChanged(action) {
    return new Promise(resolve => {
      resolve();
    });
  }

}

/***/ })

/******/ });
});
//# sourceMappingURL=step-manager.js.map

/***/ }),

/***/ "./examples/src/scripts/custom-steps.js":
/*!**********************************************!*\
  !*** ./examples/src/scripts/custom-steps.js ***!
  \**********************************************/
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CustomSteps; });
/* harmony import */ var _dist_step_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../dist/step-manager */ "./dist/step-manager.js");
/* harmony import */ var _dist_step_manager__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_dist_step_manager__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Custom steps extends Steps
 * To prevent code duplication between steps People, Planet and Specie for common codes
 */

class CustomSteps extends _dist_step_manager__WEBPACK_IMPORTED_MODULE_0__["Steps"] {
  /**
   * Create steps event listeners (common on all specific step)
   */
  addEvents() {
    // Execute the method of the steps class before this one
    super.addEvents(); // Add event listener on all buttons

    const buttons = [...this.currentStep.querySelectorAll('[data-list-button]')];
    buttons.forEach(button => {
      this.onClickOnListButton = e => {
        this.clickOnListButton(e);
      };

      button.addEventListener('click', this.onClickOnListButton, false);
    });
  }
  /**
   * Event listener on button click
   *
   * @param {Object} e Event listener datas
   */


  clickOnListButton(e) {
    e.preventDefault();
    e.currentTarget.classList.toggle('active'); // Check if the step is ready to submit

    this.checkIfStepIsReadyToSubmit();
  }
  /**
   * Render step datas from the cache
   *
   * @param {Object} datas Datas from the cache
   */


  renderDatasFromCache(datas) {
    datas.forEach(data => this.currentStep.querySelector(`[data-list-button][data-key="${data.key}"]`).classList.add('active')); // Verify if the step can be directly submitted

    this.checkIfStepIsReadyToSubmit();
  }
  /**
   * Get datas from this step
   *
   * @returns {Object} Local datas of the step
   */


  getDatasFromStep() {
    // Search all active buttons and extract content
    const datas = [...document.querySelectorAll('[data-list-button].active')].map(item => ({
      key: item.getAttribute('data-key'),
      name: item.innerText
    }));
    return datas.length ? datas : null;
  }

  onChanged(action) {
    return new Promise(resolve => {
      this.options.element.classList[action === 'destroy' ? 'remove' : 'add']('active');
      setTimeout(() => {
        resolve();
      }, parseFloat(window.getComputedStyle(this.options.element).transitionDuration) * 1000);
    });
  }

}

/***/ }),

/***/ "./examples/src/scripts/demo.js":
/*!**************************************!*\
  !*** ./examples/src/scripts/demo.js ***!
  \**************************************/
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _step_people__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./step-people */ "./examples/src/scripts/step-people.js");
/* harmony import */ var _step_planet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./step-planet */ "./examples/src/scripts/step-planet.js");
/* harmony import */ var _step_specie__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./step-specie */ "./examples/src/scripts/step-specie.js");
/* harmony import */ var _dist_step_manager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../dist/step-manager.js */ "./dist/step-manager.js");
/* harmony import */ var _dist_step_manager_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_dist_step_manager_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _styles_demo_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../styles/demo.css */ "./examples/src/styles/demo.css");
/* harmony import */ var _styles_demo_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_demo_css__WEBPACK_IMPORTED_MODULE_4__);





/**
 * Get datas from SWAPI
 * Store datas in browser storage to improve performance
 */

const getDatas = async function () {
  let datas = window.localStorage.getItem('swapi');

  if (datas === null) {
    const apiUrls = ['https://swapi.dev/api/people/?page=1', 'https://swapi.dev/api/planets/?page=1', 'https://swapi.dev/api/species/?page=1'];
    const requests = [];
    apiUrls.forEach(url => requests.push(fetch(url).then(response => response.json())));
    datas = await Promise.all(requests).then(([people, planets, species]) => ({
      people,
      planets,
      species
    }));
    window.localStorage.setItem('swapi', JSON.stringify(datas));
  } else {
    datas = JSON.parse(datas);
  }

  return datas;
};
/**
 * Initialize the manager with 3 steps (People, Planet and Specie)
 * On complete action, JSON datas are display in the page and the console
 */


const init = async function () {
  // Get datas from SWAPI
  const datas = await getDatas(); // Instanciate the Manager

  const manager = new _dist_step_manager_js__WEBPACK_IMPORTED_MODULE_3__["Manager"]({
    element: document.querySelector('#steps'),
    datas: datas,
    steps: [_step_people__WEBPACK_IMPORTED_MODULE_0__["default"], _step_planet__WEBPACK_IMPORTED_MODULE_1__["default"], _step_specie__WEBPACK_IMPORTED_MODULE_2__["default"]],
    onComplete: datas => {
      console.log(datas);
      document.querySelector('.container').innerHTML = `<pre>${JSON.stringify(datas, null, 2)}</pre>`;
    }
  }); // Initialize and build the steps

  manager.init();
  document.querySelector('.loader').classList.remove('active');
  document.querySelector('#steps').classList.add('active');
};

init();

/***/ }),

/***/ "./examples/src/scripts/step-people.js":
/*!*********************************************!*\
  !*** ./examples/src/scripts/step-people.js ***!
  \*********************************************/
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StepPeople; });
/* harmony import */ var _custom_steps__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./custom-steps */ "./examples/src/scripts/custom-steps.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class StepPeople extends _custom_steps__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "id", 'people');

    _defineProperty(this, "route", 'people');

    _defineProperty(this, "selector", '.step-people');
  }

  /**
   * Get step template
   * Template come from the specific template variable templateStep
   *
   * @returns {Object} Generated HTML for the step
   */
  getTemplate(datas) {
    /* prettier-ignore */
    return `<div class="step-people">
                    <h2 class="title">Choose your favorites people</h2>
					<ul class="list">
						${datas.map((people, index) => `
							<li class="list-item">
								<button class="list-button" data-list-button data-key="${index}">
									${people.name}
								</button>
							</li>
						`).join('')}
					</ul>
					<ul class="nav">
						<li class="nav-item">
							<button type="submit" class="btn disabled" data-step-next>Next step</button>
						</li>
					</ul>
                </div>`;
  }
  /**
   * Check if the step can be displayed
   *
   * @returns {Object} Status of the render of the step
   */


  canTheStepBeDisplayed() {
    // The step can be displayed if the following conditions are resolved:
    return {
      canBeDisplayed: true
    };
  }

  getStepDatasToRender() {
    return this.options.datas.people.results;
  }

}

/***/ }),

/***/ "./examples/src/scripts/step-planet.js":
/*!*********************************************!*\
  !*** ./examples/src/scripts/step-planet.js ***!
  \*********************************************/
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StepPlanet; });
/* harmony import */ var _custom_steps__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./custom-steps */ "./examples/src/scripts/custom-steps.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class StepPlanet extends _custom_steps__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "id", 'planet');

    _defineProperty(this, "route", 'planet');

    _defineProperty(this, "selector", '.step-planet');
  }

  /**
   * Get step template
   *
   * @returns {Object} Generated HTML for the step
   */
  getTemplate(datas) {
    /* prettier-ignore */
    return `<div class="step-planet">
                    <h2 class="title">Choose your favorites planet</h2>
					<ul class="list">
						${datas.map((planet, index) => `
							<li class="list-item">
								<button class="list-button" data-list-button data-key="${index}">
									${planet.name}
								</button>
							</li>
						`).join('')}
					</ul>
					<ul class="nav">
						<li class="nav-item">
							<button class="btn" data-step-previous>Previous step</button>
						</li>
						<li class="nav-item">
							<button type="submit" class="btn btn disabled" data-step-next>Next step</button>
						</li>
					</ul>
                </div>`;
  }
  /**
   * Check if the step can be displayed
   *
   * @returns {Object} Status of the render of the step
   */


  canTheStepBeDisplayed() {
    // Request datas from the Manager for the previous steps
    // Method is exposed by the Manager on each class instance
    const datas = this.requestDatas('people'); // The step can be displayed if the following conditions are resolved:

    return {
      canBeDisplayed: !!(datas && datas.people && datas.people.datas)
    };
  }

  getStepDatasToRender() {
    return this.options.datas.planets.results;
  }

}

/***/ }),

/***/ "./examples/src/scripts/step-specie.js":
/*!*********************************************!*\
  !*** ./examples/src/scripts/step-specie.js ***!
  \*********************************************/
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StepSpecie; });
/* harmony import */ var _custom_steps__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./custom-steps */ "./examples/src/scripts/custom-steps.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class StepSpecie extends _custom_steps__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "id", 'specie');

    _defineProperty(this, "route", 'specie');

    _defineProperty(this, "selector", '.step-specie');

    _defineProperty(this, "fallbackRoute", 'planet');
  }

  /**
   * Get step template
   *
   * @returns {Object} Generated HTML for the step
   */
  getTemplate(datas) {
    /* prettier-ignore */
    return `<div class="step-specie">
                    <h2 class="title">Choose your favorites specie</h2>
					<ul class="list">
						${datas.map((specie, index) => `
							<li class="list-item">
								<button class="list-button" data-list-button data-key="${index}">
									${specie.name}
								</button>
							</li>
						`).join('')}
					</ul>
					<ul class="nav">
						<li class="nav-item">
							<button class="btn" data-step-previous>Previous step</button>
						</li>
						<li class="nav-item">
							<button type="submit" class="btn disabled" data-step-next>Submit</button>
						</li>
					</ul>
                </div>`;
  }
  /**
   * Check if the step can be displayed
   *
   * @returns {Object} Status of the render of the step
   */


  canTheStepBeDisplayed() {
    // Request datas from the Manager for the previous steps
    // Method is exposed by the Manager on each class instance
    const datas = this.requestDatas('people', 'planet');
    const isStepPeopleValid = datas && datas.people && datas.people.datas;
    const isStepPlanetValid = datas && datas.planet && datas.planet.datas; // The step can be displayed if the following conditions are resolved:

    return {
      canBeDisplayed: !!(isStepPeopleValid && isStepPlanetValid),
      fallbackRoute: isStepPlanetValid ? this.fallbackRoute : 'people'
    };
  }

  getStepDatasToRender() {
    return this.options.datas.species.results;
  }

}

/***/ }),

/***/ "./examples/src/styles/demo.css":
/*!**************************************!*\
  !*** ./examples/src/styles/demo.css ***!
  \**************************************/
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=demo.js.map