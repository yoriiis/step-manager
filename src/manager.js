import Router from './router';
import CacheManager from './cache-manager';

export default class Manager {
	constructor (options) {
		const userOptions = options || {};
		const defaultOptions = {
			element: null,
			datas: {},
			steps: [],
			cacheMethod: 'sessionStorage',
			keyBrowserStorage: 'stepManager',
			onEnded: () => {}
		};

		// Merge default options with user options
		this.options = Object.assign(defaultOptions, userOptions);

		this.isCompleted = false;
		this.applicationReady = false;
		this.previousRoute = null;
		this.stepsOrder = [];
		this.datas = {};
		this.steps = {};
	}

	/**
	 * Function to instanciate the Manager
	 */
	init () {
		this.addEvents();
		this.analyzeSteps();

		this.CacheManager = new CacheManager({
			cacheMethod: this.options.cacheMethod,
			keyBrowserStorage: this.options.keyBrowserStorage,
			datas: this.datas,
			steps: this.steps
		});

		this.Router = new Router({
			defaultRoute: this.defaultRoute,
			stepsOrder: this.stepsOrder,
			steps: this.steps,
			element: this.options.element,
			getDatasFromCache: (...filters) => this.CacheManager.getDatasFromCache(filters)
		});

		// Initialize the application router
		this.Router.init();
	}

	/**
	 * Analyze steps and store instance as class property
	 * Expose new methods to each steps (requestOptions, requestDatas)
	 * to access the Manager form steps
	 */
	analyzeSteps () {
		// Loop on all available steps
		this.options.steps.forEach((Step, index) => {
			// Initialize the step to access them all along the application
			const currentStep = new Step();

			// Get the step route
			const currentRoute = currentStep.route;

			// Expose new methods and attributes on each steps
			currentStep.requestOptions = () => this.options;
			currentStep.requestDatas = (...filters) => filters.map(filter => this.datas[filter]);

			// Store the instance reference in class properties
			this.steps[currentRoute] = currentStep;

			// Set an ordered array with routes name
			this.stepsOrder.push(currentRoute);

			// Save the default route
			if (index === 0) {
				this.defaultRoute = currentRoute;
			}

			// Set the object to store steps data
			this.datas[currentStep.id] = {
				index: index,
				route: currentRoute,
				datas: null
			};
		});
	}

	/**
	 * Create manager event listeners
	 * All listeners are created on class properties to facilitate the deletion of events
	 */
	addEvents () {
		// Create custom event to listen step changes from step classes
		this.eventNextStep = new window.Event('stepNext');
		this.onTriggerStepNext = this.triggerStepNext.bind(this);
		this.options.element.addEventListener('stepNext', this.onTriggerStepNext, false);

		this.eventNextStep = new window.Event('stepPrevious');
		this.onTriggerStepPrevious = this.triggerStepPrevious.bind(this);
		this.options.element.addEventListener('stepPrevious', this.onTriggerStepPrevious, false);
	}

	/**
	 * Trigger next steps
	 *
	 * @param {Object} e Event listener datas
	 */
	triggerStepNext (e) {
		// Check if steps aren't ended
		if (!this.isCompleted) {
			// Get the current step id
			const currentStepId = this.steps[this.Router.currentRoute].id;

			// Get datas from the current step
			this.datas[currentStepId].datas = this.steps[
				this.Router.currentRoute
			].getDatasFromStep();

			// Update cache with datas
			this.CacheManager.setDatasToCache(this.datas);

			this.Router.triggerNext() || this.allStepsComplete();
		}
	}

	/**
	 * Trigger previous steps
	 *
	 * @param {Object} e Event listener datas
	 */
	triggerStepPrevious (e) {
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

		if (typeof this.options.onEnded === 'function') {
			this.options.onEnded(this.CacheManager.getDatasFromCache());
		}

		this.CacheManager.removeDatasFromCache();
	}

	/**
	 * Destroy the manager (event listeners, router)
	 */
	destroy () {
		this.options.element.removeEventListener('stepNext', this.onTriggerStepNext);
		this.options.element.removeEventListener('stepPrevious', this.onTriggerStepPrevious);
		this.Router.destroy();
	}
}
