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
	 *
	 * @param {Object} datas Datas from the cache
	 */
	renderDatasFromCache (datas) {
		// this.options.element.querySelector('#form-check').checked = datas.status;
	}

	/**
	 * Get step template
	 * Template come from the specific template variable templateStep
	 *
	 * @param {Object} datas Datas from getStepDatasToRender
	 *
	 * @returns {Object} Generated HTML for the step
	 */
	getTemplate (datas) {
		return `<div class="step-two">
                    <h2>Step 2/3</h2>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <form class="form">
						<div class="form-group">
							<label for="form-address">Address</label>
							<input type="text" class="form-control" id="form-address" required />
						</div>
						<div class="form-group">
							<label for="form-postcode">Post code</label>
							<input type="text" class="form-control" id="form-postcode" required />
						</div>
						<div class="form-group">
							<label for="form-city">City</label>
							<input type="text" class="form-control" id="form-city" required />
						</div>
						<div class="form-group">
							<ul class="nav">
								<li class="nav-item">
									<button class="btn btn-secondary" data-tunnel-previous>Next step</button>
								</li>
								<li class="nav-item">
									<button type="submit" class="btn btn-success" data-tunnel-next>Next step</button>
								</li>
							</ul>
						</div>
					</form>
                </div>`;
	}

	/**
	 * Check if the step can be displayed
	 *
	 * @returns {Promise<Object>} Status of the render of the step with a Promise
	 */
	canTheStepBeDisplayed () {
		return new Promise((resolve, reject) => {
			// Request datas from API for the specific class
			// Method is exposed by the Tunnel on each class instance
			this.requestAllDatasFromCache('step-one').then(async datas => {
				this.datasFromPreviousStep = datas;

				// The step can be displayed if the following conditions are resolved:
				resolve({
					canBeDisplayed: datas && datas['step-one'],
					fallbackRoute: this.fallbackRoute
				});
			});
		});
	}

	/**
	 * Check if the step is ready to submit
	 */
	checkIfStepIsReadyToSubmit () {
		const requiredFields = [...this.options.element.querySelectorAll('[required]')];

		requiredFields.forEach(field => {
			if (field.type === 'checkbox') {
				if (!field.checked) {
					field.classList.add('is-invalid');
				} else {
					field.classList.remove('is-invalid');
				}
			} else if (field.type === 'text' || field.type === 'email') {
				if (field.value === '') {
					field.classList.add('is-invalid');
				} else {
					field.classList.remove('is-invalid');
				}
			}
		});

		return [...this.options.element.querySelectorAll('[required].is-invalid')].length === 0;
	}

	/**
	 * Get datas from this step
	 *
	 * @returns {Object} Local datas of the step
	 */
	getDatasFromStep () {
		return {
			address: this.currentStep.querySelector('#form-address').value,
			postcode: this.currentStep.querySelector('#form-postcode').value,
			city: this.currentStep.querySelector('#form-city').value
		};
	}
}
