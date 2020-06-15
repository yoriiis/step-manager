export default class Steps {
	// Set public instance fields
	fallbackRoute = null;
	optionalStep = false;

	constructor() {
		this.clickOnCurrentStep = this.clickOnCurrentStep.bind(this);
	}

	/**
	 * Render the step
	 *
	 * @param {Object} datas Datas from the cache
	 */
	render(datas) {
		this.options = this.requestOptions();

		// Insert the generated HTML for the step
		// Get the template from the specific class and send it datas
		this.options.element.insertAdjacentHTML(
			'beforeend',
			this.getTemplate(this.getStepDatasToRender())
		);

		// The DOM is up to date, trigger the after render method with datas from the cache
		this.afterRender(datas);
	}

	/**
	 * Function executed after the render of the step
	 *
	 * @param {Object} datas Datas from the cache
	 */
	afterRender(datas) {
		// Set cached selector
		this.currentStep = this.options.element.querySelector(this.selector);

		// Add event listeners
		this.addEvents();

		// If datas from cache exist and specific class has the appropriate method, render datas from the cache
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
		this.removeEvents();

		// Remove the DOM element
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
		if (
			target.nodeName.toLowerCase() === 'button' &&
			target.hasAttribute('data-step-previous')
		) {
			// Click on the previous step button
			this.clickToPreviousStep(e);
		} else if (
			target.nodeName.toLowerCase() === 'button' &&
			target.hasAttribute('data-step-next')
		) {
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
		e.preventDefault();

		// Click is authorized when the step is ready to submit or if the step is optional
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
		e.preventDefault();

		// Dispatch the custom event to the Manager
		this.options.element.dispatchEvent(new window.CustomEvent('previousStep'));
	}

	checkIfStepIsReadyToSubmit() {
		// If the specific class contains local datas, the step is ready to submit
		this.stepIsReadyToSubmit = this.getDatasFromStep() !== null;

		// Update the submit button
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
}
