import Router from './router';
import CacheManager from './cache-manager';

/**
 * @license MIT
 * @name StepManager
 * @version 1.0.0
 * @author: Yoriiis aka Joris DANIEL <joris.daniel@gmail.com>
 * @description: StepManager is a library to create flexible and robust multiple steps navigation with hash, validations, browser storage and hook functions.
 * {@link https://github.com/yoriiis/step-manager}
 * @copyright 2020 Joris DANIEL
 **/

export default class Manager {
	/**
	 * @param {options}
	 */
	constructor (options) {
		const userOptions = options || {};
		const defaultOptions = {
			element: null,
			datas: {},
			steps: [],
			cacheMethod: 'sessionStorage',
			keyBrowserStorage: 'stepManager',
			onComplete: () => {}
		};

		// Merge default options with user options
		this.options = Object.assign(defaultOptions, userOptions);

		this.isCompleted = false;
	}

	/**
	 * Function to initialize the Manager
	 */
	init () {
		this.addEvents();

		const results = this.analyzeSteps();
		this.steps = results.steps;

		this.CacheManager = new CacheManager({
			cacheMethod: this.options.cacheMethod,
			keyBrowserStorage: this.options.keyBrowserStorage
		});

		this.Router = new Router({
			defaultRoute: results.defaultRoute,
			stepsOrder: results.stepsOrder,
			steps: this.steps,
			getDatasFromCache: (...filters) => this.CacheManager.getDatasFromCache(filters)
		});

		// Initialize the router
		this.Router.init();
	}

	/**
	 * Analyze steps and store instance
	 * Expose new methods to each steps (requestOptions, requestDatas)
	 * to access the Manager form steps
	 *
	 * @returns {Object} Object with steps instance, steps order and default route
	 */
	analyzeSteps () {
		const steps = {};
		const stepsOrder = [];
		let defaultRoute;

		// Loop on all available steps
		this.options.steps.forEach((Step, index) => {
			// Initialize the step to access them all along the application
			const currentStep = new Step();

			// Get the step route
			const currentRoute = currentStep.route;

			// Expose new functions on each steps
			currentStep.requestOptions = () => this.options;
			currentStep.requestDatas = (...filters) => this.CacheManager.getDatasFromCache(filters);

			// Store the instance reference in class properties
			steps[currentRoute] = currentStep;

			// Set an ordered array with routes name
			stepsOrder.push(currentRoute);

			// Save the default route
			if (index === 0) {
				defaultRoute = currentRoute;
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
	addEvents () {
		// Create custom event to listen navigation changes from steps
		this.eventNextStep = new window.Event('nextStep');
		this.ontriggerNextStep = this.triggerNextStep.bind(this);
		this.options.element.addEventListener('nextStep', this.ontriggerNextStep, false);

		this.eventNextStep = new window.Event('previousStep');
		this.ontriggerPreviousStep = this.triggerPreviousStep.bind(this);
		this.options.element.addEventListener('previousStep', this.ontriggerPreviousStep, false);
	}

	/**
	 * Trigger next steps
	 *
	 * @param {Object} e Event listener datas
	 */
	triggerNextStep (e) {
		// Check if steps are completed
		if (!this.isCompleted) {
			// Get datas from the current step
			const stepDatas = this.steps[this.Router.currentRoute].getDatasFromStep();

			// Update cache with datas
			this.CacheManager.setDatasToCache({
				route: this.Router.currentRoute,
				datas: stepDatas
			});

			// Trigger the next route if available
			// Else, all steps are completed
			this.Router.triggerNext() || this.allStepsComplete();
		}
	}

	/**
	 * Trigger previous steps
	 *
	 * @param {Object} e Event listener datas
	 */
	triggerPreviousStep (e) {
		this.Router.triggerPrevious();
	}

	/**
	 * All steps are complete
	 */
	allStepsComplete () {
		this.isCompleted = true;

		// Freeze the display to prevent multiple submit
		this.options.element.classList.add('loading');

		this.Router.destroyStep(this.Router.currentRoute);
		this.Router.setRoute('');
		this.destroy();

		// Execute the user callback function if available
		if (typeof this.options.onComplete === 'function') {
			this.options.onComplete(this.CacheManager.getDatasFromCache());
		}

		// Clean the cache at the end
		this.CacheManager.removeDatasFromCache();
	}

	/**
	 * Destroy the manager (event listeners, router)
	 */
	destroy () {
		this.options.element.removeEventListener('nextStep', this.ontriggerNextStep);
		this.options.element.removeEventListener('previousStep', this.ontriggerPreviousStep);

		this.Router.destroy();
	}
}
