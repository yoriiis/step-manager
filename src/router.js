export default class Router {
	/**
	 * @param {options}
	 */
	constructor(options) {
		const userOptions = options || {};
		const defaultOptions = {
			defaultRoute: null,
			stepsOrder: [],
			steps: {},
			getDatasFromCache: () => {},
			onChange: () => {}
		};

		// Merge default options with user options
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
		this.addEvents();

		// Get current route
		const route = this.getRoute();

		// Declare the default route
		// If route exist, keep it, else set it to the default route
		this.currentRoute = route === '' ? this.options.defaultRoute : route;

		// Init the router with the default route
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
		const route = this.getRoute();

		// Check if the step can be displayed
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
			this.previousRoute = this.stepRedirected.redirect
				? this.stepRedirected.previousRoute
				: this.getPreviousRoute(e);

			// Check if previous step need to be destroyed
			// Prevent destruction when previousRoute does not exist or when user is redirected
			if (this.previousRoute) {
				// Destroy the previous step
				await this.destroyStep(this.previousRoute);

				// Create the new step on destruction callback
				await this.createStep(this.currentRoute);

				this.stepCreated = true;
			}
		}

		// If destroy method was not called, create the step now
		if (!this.stepCreated) {
			await this.createStep(this.currentRoute);
		}

		// Reset the redirect marker
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
		this.previousRoute = null;

		// If the step has a fallback route, use it
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
	checkIfTheStepCanBeDisplay({ route, event }) {
		const routeId = this.getRouteId(route);

		// Check the validity of the route
		if (this.options.steps[routeId]) {
			// Call the verification method of the step
			// The step itself knows if it can be rendered
			const datas = this.options.steps[routeId].canTheStepBeDisplayed();
			return datas;
		} else {
			let fallbackRoute = this.options.defaultRoute;

			// Get fallback route from previous route if exist
			const previousRoute = this.getPreviousRoute(event);
			const previousRouteId = this.getRouteId(previousRoute);
			if (previousRoute) {
				if (this.options.steps[previousRouteId].fallbackRoute) {
					fallbackRoute = this.options.steps[previousRouteId].fallbackRoute;
				}
			}

			// Unknown route, redirect to the fallback route
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
	async createStep(route) {
		// Get datas from cache before render the step
		const routeId = this.getRouteId(route);
		const stepDatas = this.options.getDatasFromCache([routeId]);

		// Call the render method of the step
		if (stepDatas) {
			this.options.steps[routeId].render(stepDatas[routeId].datas);
		} else {
			this.options.steps[routeId].render();
		}

		// Prevent step created before application ready
		if (!this.applicationReady) {
			this.applicationReady = true;
		}

		if (typeof this.options.onChange === 'function') {
			await this.options.onChange('create');
		}
	}

	/**
	 * Destroy a step
	 *
	 * @param {String} route Route of the step
	 */
	async destroyStep(route) {
		const routeId = this.getRouteId(route);

		if (typeof this.options.onChange === 'function') {
			await this.options.onChange('destroy');
		}

		// Call the destroy method of the step
		this.options.steps[routeId].destroy();
	}

	/**
	 * Trigger next step navigation
	 *
	 * @returns {Boolean} Is the next step exist?
	 */
	triggerNext() {
		this.reverseNavigation = false;

		// Store the current route as the previous route because the route hasn't changed yet
		this.previousRoute = this.currentRoute;

		// Redirect to the next route or at the end
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
		this.reverseNavigation = true;

		// Store the current route as the previous route because the route hasn't changed yet
		this.previousRoute = this.currentRoute;

		const previousRoute = this.getPreviousStepRoute(this.previousRoute);
		this.setRoute(previousRoute);
	}

	/**
	 * Check if the steps navigation is reversed (1, 2, 3 or 3, 2, 1)
	 *
	 * @returns {Boolean} Is the navigation reversed
	 */
	isReverseNavigation() {
		let indexCurrentRoute = 0;
		let indexPreviousRoute = 0;

		this.options.stepsOrder.forEach((item, index) => {
			if (item.route === this.currentRoute) {
				indexCurrentRoute = index;
			}
			if (item.route === this.previousRoute) {
				indexPreviousRoute = index;
			}
		});

		return indexCurrentRoute < indexPreviousRoute;
	}

	/**
	 * Get route id from the step
	 *
	 * @param {String} route Route
	 *
	 * @returns {String} Route id
	 */
	getRouteId(route) {
		const routeStep = this.options.stepsOrder.find((step) => step.route === route);
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
		return this.options.stepsOrder.findIndex((step) => {
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
