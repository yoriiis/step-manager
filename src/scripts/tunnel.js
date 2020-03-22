import Router from './router';
import CacheManager from './cache-manager';

export default class Tunnel {
	constructor (options) {
		const userOptions = options || {};
		const defaultOptions = {
			element: null,
			datas: {},
			steps: [],
			cacheMethod: 'sessionStorage',
			keyBrowserStorage: 'tunnel'
		};

		// Merge default options with user options
		this.options = Object.assign(defaultOptions, userOptions);

		this.ended = false;
		this.applicationReady = false;
		this.previousRoute = null;
		this.currentRoute = null;
		this.stepsOrder = [];
		this.datas = {};
		this.steps = {};
	}

	/**
	 * Function to instanciate the Tunnel
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
			currentRoute: this.currentRoute,
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
	 * Expose new methods to each steps (requestOptions, requestAllDatasFromCache)
	 * to access the Tunnel form steps
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
			currentStep.requestAllDatasFromCache = (...filters) =>
				this.CacheManager.getDatasFromCache(filters);
			currentStep.currentRoute = currentRoute;

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
	 * Create tunnel event listeners
	 * All listeners are created on class properties to facilitate the deletion of events
	 */
	addEvents () {
		// Create custom event to listen step changes from step classes
		this.eventNextStep = new window.Event('tunnelNext');
		this.onTriggerTunnelNext = this.triggerTunnelNext.bind(this);
		this.options.element.addEventListener('tunnelNext', this.onTriggerTunnelNext, false);

		this.eventNextStep = new window.Event('tunnelPrevious');
		this.onTriggerTunnelPrevious = this.triggerTunnelPrevious.bind(this);
		this.options.element.addEventListener(
			'tunnelPrevious',
			this.onTriggerTunnelPrevious,
			false
		);
	}

	/**
	 * Trigger next steps
	 *
	 * @param {Object} e Event listener datas
	 */
	triggerTunnelNext (e) {
		// Check if the tunnel isn't ended
		if (!this.ended) {
			// Get the current step id
			const currentStepId = this.steps[this.Router.currentRoute].id;

			// Get datas from the current step
			this.datas[currentStepId].datas = this.steps[
				this.Router.currentRoute
			].getDatasFromStep();

			// Update cache with datas
			this.CacheManager.setDatasToCache(this.datas);

			this.Router.triggerNext() || this.tunnelEnded();
		}
	}

	/**
	 * Trigger previous steps
	 *
	 * @param {Object} e Event listener datas
	 */
	triggerTunnelPrevious (e) {
		this.Router.triggerPrevious();
	}

	/**
	 * The tunnel is ended
	 */
	tunnelEnded () {
		this.ended = true;

		// Freeze the display to prevent multiple submit
		this.options.element.classList.add('loading');

		// Get current datas from the cache
		const datas = this.CacheManager.getDatasFromCache();

		if (typeof this.options.onEnded === 'function') {
			this.options.onEnded(datas);
		}

		// this.destroyStep(this.currentRoute); TODO
		this.CacheManager.removeDatasFromCache();
		this.destroy();
		this.Router.setRoute('');
	}

	/**
	 * Destroy the tunnel (event listeners)
	 */
	destroy () {
		this.options.element.removeEventListener('tunnelNext', this.onTriggerTunnelNext);
		this.options.element.removeEventListener('tunnelPrevious', this.onTriggerTunnelPrevious);
		this.Router.destroy();
	}
}
