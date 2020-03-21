import { Steps } from '../../dist/tunnel-steps.js';

export default class StepTwo extends Steps {
	/**
	 * Get the unique identifier of the step
	 */
	get id () {
		return 'step-two';
	}

	/**
	 * Get the route of the step
	 */
	get route () {
		return 'about';
	}

	/**
	 * Get the selector of the step
	 */
	get selector () {
		return '.step-two';
	}

	constructor () {
		// Execute the constructor of the steps class
		super();

		// Expose variables as class properties
		// Fallback route is null for the first step of the tunnel
		this.fallbackRoute = 'welcome';
		this.optionalStep = false;
	}

	/**
	 * Render step datas from the cache
	 * @param {Object} datas Datas from the cache
	 */
	renderDatasFromCache (datas) {
		this.options.element.querySelector('#check').checked = datas.status;
	}

	/**
	 * Get step template
	 * Template come from the specific template variable templateStep
	 * @param {Object} datas Datas from getStepDatasToRender
	 * @returns {Object} Generated HTML for the step
	 */
	getTemplate (datas) {
		return `<div class="step-two">
                    Welcome on the step two
                    <input type="checkbox" id="check" />
                    <button data-tunnel-previous>Etape précédente</button>
                    <button data-tunnel-next>Etape suivante</button>
                </div>`;
	}

	/**
	 * Check if the step can be displayed
	 * @returns {Promise<Object>} Status of the render of the step with a Promise
	 */
	canTheStepBeDisplayed () {
		return new Promise((resolve, reject) => {
			// Request datas from API for the specific class
			// Method is exposed by the Tunnel on each class instance
			this.requestAllDatasFromCache('step-one').then(async datas => {
				this.datasFromPreviousStep = datas;

				let status = false;
				if (datas && datas['step-one']) {
					status = datas['step-one'].datas.status;
				}

				// The step can be displayed if the following conditions are resolved:
				resolve({
					canBeDisplayed: status,
					fallbackRoute: this.fallbackRoute
				});
			});
		});
	}

	/**
	 * Check if the step is ready to submit
	 */
	checkIfStepIsReadyToSubmit () {
		return this.options.element.querySelector('#check').checked;
	}

	/**
	 * Get datas from this step
	 * @returns {Object} Local datas of the step
	 */
	getDatasFromStep () {
		return {
			status: this.options.element.querySelector('#check').checked
		};
	}
}
