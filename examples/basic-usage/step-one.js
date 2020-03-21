import { Steps } from '../../dist/tunnel-steps.js';

export default class StepOne extends Steps {
	/**
	 * Get the unique identifier of the step
	 */
	get id () {
		return 'step-one';
	}

	/**
	 * Get the route of the step
	 */
	get route () {
		return 'welcome';
	}

	/**
	 * Get the selector of the step
	 */
	get selector () {
		return '.step-one';
	}

	constructor () {
		// Execute the constructor of the steps class
		super();

		// Expose variables as class properties
		// Fallback route is null for the first step of the tunnel
		this.fallbackRoute = null;
		this.optionalStep = false;
	}

	/**
	 * Render step datas from the cache
	 *
	 * @param {Object} datas Datas from the cache
	 */
	renderDatasFromCache (datas) {
		console.log(datas);
		for (const key in datas) {
			if (typeof datas[key] === 'boolean') {
				this.options.element.querySelector(`#form-${key}`).checked = datas[key];
			} else if (typeof datas[key] === 'string') {
				this.options.element.querySelector(`#form-${key}`).value = datas[key];
			}
		}
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
		return `<div class="step-one">
                    <h2>Step <small>1/3</small></h2>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
					<form class="form">
						<div class="form-group">
							<label for="form-lastname">Last name</label>
							<input type="text" class="form-control" id="form-lastname" required />
						</div>
						<div class="form-group">
							<label for="orm-firstname">First name</label>
							<input type="text" class="form-control" id="form-firstname" required />
						</div>
						<div class="form-group">
							<label for="form-email">Email</label>
							<input type="email" class="form-control" id="form-email" required />
						</div>
						<div class="form-group">
							<div class="custom-control custom-checkbox">
								<input type="checkbox" class="custom-control-input" id="form-terms" required />
								<label class="custom-control-label" for="form-terms">Check me out</label>
							</div>
						</div>
						<div class="form-group">
							<ul class="nav">
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
			// The step can be displayed if the following conditions are resolved:
			resolve({
				canBeDisplayed: true,
				fallbackRoute: this.fallbackRoute
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
			lastname: this.currentStep.querySelector('#form-lastname').value,
			firstname: this.currentStep.querySelector('#form-firstname').value,
			email: this.currentStep.querySelector('#form-email').value,
			terms: this.currentStep.querySelector('#form-terms').checked
		};
	}
}
