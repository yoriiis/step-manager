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

		this.reverseNavigation = false;
		this.ended = false;
		this.applicationReady = false;
		this.previousRoute = null;
		this.currentRoute = null;
		this.stepRedirected = {};
		this.stepsOrder = [];
		this.datas = {};
		this.steps = {};
	}

	/**
	 * Function to instanciate the Tunnel
	 */
	create () {
		this.addEvents();
		this.analyzeSteps();

		// Initialize the application router
		this.initRouter();
		console.log(this.options.datas);
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
			currentStep.requestAllDatasFromCache = (...filters) => this.getDatasFromCache(filters);
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

		// Create the hash changed event of all the application
		this.onHashChanged = this.hashChanged.bind(this);
		window.addEventListener('hashchange', this.onHashChanged, false);
	}

	/**
	 * Initialize the main router of the application
	 */
	initRouter () {
		// Get current route by fragments (#fragment1/fragment2)
		const route = this.getRoute();

		// Declare the default route
		// If fragment exist, keep it, else set it to the default route
		this.currentRoute = route === '' ? this.defaultRoute : route;

		// Init the router with the default route
		if (route === '') {
			this.setRoute(this.currentRoute);
		} else {
			// Page started with one fragment, trigger hash changed
			this.hashChanged();
		}
	}

	/**
	 * Initialize the tunnel
	 *
	 * @param {Object} e Event listener datas
	 */
	triggerTunnelNext (e) {
		this.reverseNavigation = false;
		// Check if the tunnel isn't ended
		if (!this.ended) {
			// Store the current route as the previous route because the route hasn't changed yet
			this.previousRoute = this.currentRoute;
			const nextRoute = this.getNextRoute(this.currentRoute);

			// Store step datas to the cache
			this.setDataToCache().then(status => {
				// If the storage is OK
				if (status) {
					// Redirect to the next route or the end of the tunnel
					if (nextRoute !== 'end') {
						this.setRoute(nextRoute);
					} else {
						this.tunnelEnded();
					}
				} else {
					console.warn('triggerTunnelNext');
				}
			});
		}
	}

	/**
	 * Initialize the tunnel
	 *
	 * @param {Object} e Event listener datas
	 */
	triggerTunnelPrevious (e) {
		// Store the current route as the previous route because the route hasn't changed yet
		this.previousRoute = this.currentRoute;
		this.reverseNavigation = true;
		const nextRoute = this.getPreviousRoute(this.previousRoute);
		this.setRoute(nextRoute);
	}

	/**
	 * The tunnel is ended
	 */
	tunnelEnded () {
		this.ended = true;

		// Freeze the display to prevent multiple submit
		this.options.element.classList.add('loading');

		// Get current datas from the cache
		this.getDatasFromCache()
			.then(async datas => {
				if (typeof this.options.onEnded === 'function') {
					await this.options.onEnded(datas);
				}
				this.destroyStep(this.currentRoute).then(() => {
					this.removeDatasFromCache();
					this.destroy();
					this.setRoute('');
				});
			})
			.catch(response => {
				console.warn('tunnelEnded', response);
				this.ended = false;
				this.options.element.classList.remove('loading');
			});
	}

	/**
	 * Main hash changed event of the application
	 *
	 * @param {Object} e Event listener datas
	 */
	hashChanged (e) {
		// Get the current route
		const route = this.getRoute();

		// Check if the step can be displayed
		this.checkIfTheStepCanBeDisplay({
			route: route,
			event: e
		}).then(datas => {
			this.currentRoute = route;

			// The step can be dislayed
			if (datas.canBeDisplayed) {
				// Event listener exist when user click on next step button
				// Event listener doesn't exist when setRoute is called manually
				if (e) {
					// Get the previous route
					let previousRoute;

					if (this.stepRedirected.redirect) {
						previousRoute = this.stepRedirected.previousRoute;
					} else if (this.reverseNavigation) {
						previousRoute = this.getNextRoute(this.currentRoute);
					} else {
						previousRoute = this.getPreviousRoute(this.currentRoute);
					}

					// Check if previous step need to be destroyed
					// Prevent destruction when previousRoute does not exist or when user is redirected
					if (previousRoute && !this.stepRedirected.redirect) {
						this.previousRoute = !this.stepRedirected.redirect
							? previousRoute
							: this.stepRedirected.previousRoute;

						// Destroy the previous step
						this.destroyStep(this.previousRoute).then(() => {
							// Create the new step on destruction callback
							this.createStep({
								route: this.currentRoute
							}).then(() => {});
						});

						this.stepDestroyed = true;
					}
				}

				// If destroy method was not called, create the step now
				if (!this.stepDestroyed) {
					this.createStep({
						route: this.currentRoute
					}).then(() => {});

					// Reset the redirect marker
					if (this.stepRedirected.redirect) {
						this.stepRedirected.redirect = false;
					}
				}
			} else {
				// The step can't be displayed, redirect user to the previous route or the fallback route
				this.stepRedirected = {
					redirect: true,
					previousRoute: null
				};
				this.previousRoute = null;

				// If the step has a fallback route, use it
				if (datas.fallbackRoute) {
					this.setRoute(datas.fallbackRoute);
				}
			}
		});
	}

	/**
	 * Check if the step can be displayed
	 *
	 * @param {String} route Route hash
	 * @param {Object} event Event listener datas
	 *
	 * @returns {Promise<Object>} Status of the render of the step with a Promise
	 */
	checkIfTheStepCanBeDisplay ({ route, event }) {
		return new Promise((resolve, reject) => {
			// Check the validity of the first fragment
			if (this.steps[route]) {
				// Call the verification method of the step
				// The step itself knows if it can be rendered
				this.steps[route].canTheStepBeDisplayed().then(datas => resolve(datas));
			} else {
				let fallbackRoute = this.defaultRoute;

				// Get fallback route from previous route if exist
				const previousRoute = this.getPreviousRoute(route);
				if (previousRoute) {
					if (this.steps[previousRoute].fallbackRoute) {
						fallbackRoute = this.steps[previousRoute].fallbackRoute;
					}
				}

				// Unknown route, redirect to the fallback route
				resolve({
					canBeDisplayed: false,
					fallbackRoute: fallbackRoute
				});
			}
		});
	}

	/**
	 * Create a step
	 *
	 * @param {String} route Route of the step
	 *
	 * @returns {Promise} Return the success of the step created with a Promise
	 */
	createStep ({ route }) {
		return new Promise((resolve, reject) => {
			// Get the unique identifier of the step
			const currentStepId = this.steps[route].id;

			// Get datas from cache before render the step
			this.getDatasFromCache([currentStepId]).then(datasFromCache => {
				// Format data if exist
				const datasFormatted =
					datasFromCache !== null ? datasFromCache[currentStepId].datas : null;

				// Call the render method of the step
				this.steps[route]
					.render({
						datas: datasFormatted
					})
					.then(() => {
						// Call the step render callback and resolve the Promise
						this.stepCreated();
						resolve();
					});
			});
		});
	}

	/**
	 * Destroy a step
	 *
	 * @param {String} route Route of the step
	 *
	 * @returns {Promise} Return the success of the step created with a Promise
	 */
	destroyStep (route) {
		return new Promise((resolve, reject) => {
			this.options.element.classList.remove('active');

			// Wait the step is totally disappear before destroy it
			setTimeout(() => {
				// Call the destroy method of the step and resolve the Promise
				this.steps[route].destroy();
				resolve();
			}, 0);
		});
	}

	/**
	 * Callback of createStep method
	 */
	stepCreated () {
		// Wait a little before display the step
		setTimeout(() => {
			this.options.element.classList.add('active');
		}, 0);

		// Prevent step created before application ready
		if (!this.applicationReady) {
			this.applicationReady = true;
		}
	}

	/**
	 * Get step datas from the cache
	 *
	 * @param {Array} filters Filter the request by route
	 *
	 * @returns {Object} Datas from the cache with a Promise
	 */
	getDatasFromCache (filters) {
		return new Promise((resolve, reject) => {
			let datasToReturn = null;

			// Retrieve the data in the cache with the correct key
			// Cache key is composed by profile id and a static name
			const datas =
				window[this.options.cacheMethod].getItem(`${this.options.keyBrowserStorage}`) ||
				null;

			if (datas !== null) {
				// Datas are stringify, parse them
				const datasFormatted = JSON.parse(datas);

				// Check if datas must be filtered
				if (Array.isArray(filters)) {
					// Loop on all route filters and extract selected routes datas
					filters.forEach(filter => {
						if (datasFormatted[filter]) {
							if (datasToReturn === null) {
								datasToReturn = {};
							}
							datasToReturn[filter] = datasFormatted[filter];
						}
					});
				} else {
					datasToReturn = datasFormatted;
				}
			}
			resolve(datasToReturn);
		});
	}

	/**
	 * Set step datas to the cache
	 *
	 * @returns {Boolean} Success of all data stored in the cache with a Promise
	 */
	setDataToCache () {
		return new Promise((resolve, reject) => {
			// Get the current step id
			const currentStepId = this.steps[this.currentRoute].id;

			// Get datas from the current step
			this.datas[currentStepId].datas = this.steps[this.currentRoute].getDatasFromStep();

			// Get datas from cache
			this.getDatasFromCache().then(datasFromCache => {
				if (datasFromCache === null) {
					datasFromCache = {};
				}
				// Extract datas of the current step
				datasFromCache[currentStepId] = this.datas[currentStepId];

				// Store step datas in the cache
				// Cache key is prefixed by the profile id
				window[this.options.cacheMethod].setItem(
					`${this.options.keyBrowserStorage}`,
					JSON.stringify(datasFromCache)
				);
				resolve(datasFromCache);
			});
		});
	}

	/**
	 * Remove step datas from the cache
	 * Used only when the tunnel is ended
	 *
	 * @returns {Object} Datas from the cache with a Promise
	 */
	removeDatasFromCache () {
		// Try to remove datas in the cache
		try {
			window[this.options.cacheMethod].removeItem(`${this.options.keyBrowserStorage}`);
		} catch (error) {
			console.warn(error);
		}
	}

	/**
	 * Get the previous route
	 *
	 * @param {Object} event Event listener datas
	 *
	 * @returns {String} returnValue Previous route
	 */
	getPreviousRoute (route) {
		const previousStep = this.steps[this.stepsOrder[this.getIndexFromRoute(route) - 1]];
		return previousStep ? previousStep.route : null;
	}

	/**
	 * Get the next route from the step order array
	 * If there is no next step, the function return "end"
	 *
	 * @param {String} route Current route
	 *
	 * @returns {String} Next route or "end"
	 */
	getNextRoute (route) {
		const nextStep = this.steps[this.stepsOrder[this.getIndexFromRoute(route) + 1]];
		return nextStep ? nextStep.route : 'end';
	}

	/**
	 * Get index of the route from the step order array
	 *
	 * @returns {Integer} Index of the route
	 */
	getIndexFromRoute (route) {
		return this.stepsOrder.findIndex(currentRoute => {
			return currentRoute === route;
		});
	}

	/**
	 * Get the current route
	 * If the route contains fragments, split them
	 *
	 * @returns {Array} fragments List of fragments of the route
	 */
	getRoute () {
		return window.location.hash.substr(1);
	}

	/**
	 * Set the route
	 *
	 * @returns {String} route New value for the route
	 */
	setRoute (route) {
		window.location.hash = route;
	}

	/**
	 * Destroy the tunnel (event listeners)
	 */
	destroy () {
		this.options.element.removeEventListener('tunnelNext', this.onTriggerTunnelNext);
		this.options.element.removeEventListener('tunnelPrevious', this.onTriggerTunnelPrevious);
		window.removeEventListener('hashchange', this.onHashChanged);
	}
}
