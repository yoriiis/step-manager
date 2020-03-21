import { Steps } from '../../dist/tunnel-steps.js';

export default class StepSpecie extends Steps {
	/**
	 * Get the unique identifier of the step
	 */
	get id () {
		return 'step-specie';
	}

	/**
	 * Get the route of the step
	 */
	get route () {
		return 'specie';
	}

	/**
	 * Get the selector of the step
	 */
	get selector () {
		return '.step-specie';
	}

	constructor () {
		// Execute the constructor of the steps class
		super();

		// Expose variables as class properties
		// Fallback route is null for the first step of the tunnel
		this.fallbackRoute = 'planet';
		this.optionalStep = true;
	}

	addEvents () {
		// Execute the method of the steps class before this one
		super.addEvents();

		const buttons = [...this.currentStep.querySelectorAll('[data-list-button]')];
		buttons.forEach(button => {
			this.onClickOnListButton = e => {
				this.clickOnListButton(e);
			};
			button.addEventListener('click', this.onClickOnListButton, false);
		});
	}

	clickOnListButton (e) {
		e.preventDefault();
		e.currentTarget.classList.toggle('active');

		// Check if the step is ready to submit
		this.checkIfStepIsReadyToSubmit();
	}

	/**
	 * Render step datas from the cache
	 *
	 * @param {Object} datas Datas from the cache
	 */
	renderDatasFromCache (datas) {
		datas.forEach(data =>
			this.currentStep
				.querySelector(`[data-list-button][data-key="${data.key}"]`)
				.classList.add('active')
		);

		// Verify if the step can be directly submitted
		this.checkIfStepIsReadyToSubmit();
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
		/* prettier-ignore */
		return `<div class="step-specie">
                    <h2 class="title">Choose your favorites specie</h2>
					<ul class="list">
						${datas.listSpecie.map((specie, index) => `
							<li class="list-item">
								<button class="list-button" data-list-button data-key="${index}">
									${specie.name}
								</button>
							</li>
						`).join('')}
					</ul>
					<ul class="nav">
						<li class="nav-item">
							<button class="btn btn-success" data-tunnel-previous>Previous step</button>
						</li>
						<li class="nav-item">
							<button type="submit" class="btn btn-success" data-tunnel-next>Next step</button>
						</li>
					</ul>
                </div>`;
	}

	getStepDatasToRender () {
		return {
			listSpecie: this.options.datas.species.results
		};
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
			this.requestAllDatasFromCache('step-people', 'step-planet').then(async datas => {
				this.datasFromPreviousStep = datas;

				// The step can be displayed if the following conditions are resolved:
				resolve({
					canBeDisplayed: datas && datas['step-people'] && datas['step-planet'],
					fallbackRoute: this.fallbackRoute
				});
			});
		});
	}

	/**
	 * Get datas from this step
	 *
	 * @returns {Object} Local datas of the step
	 */
	getDatasFromStep () {
		const datas = [...document.querySelectorAll('[data-list-button].active')].map(item => ({
			key: item.getAttribute('data-key'),
			name: item.innerText
		}));
		return datas.length ? datas : null;
	}
}
