import { Steps } from '../../dist/tunnel-steps.js';

export default class StepPlanet extends Steps {
	/**
	 * Get the unique identifier of the step
	 */
	get id () {
		return 'step-planet';
	}

	/**
	 * Get the route of the step
	 */
	get route () {
		return 'planet';
	}

	/**
	 * Get the selector of the step
	 */
	get selector () {
		return '.step-planet';
	}

	constructor () {
		// Execute the constructor of the steps class
		super();

		// Expose variables as class properties
		// Fallback route is null for the first step of the tunnel
		this.fallbackRoute = 'people';
		this.optionalStep = false;
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
		return `<div class="step-planet">
                    <h2 class="title">Choose your favorites planet</h2>
					<ul class="list">
						${datas.listPlanet.map((planet, index) => `
							<li class="list-item">
								<button class="list-button" data-list-button data-key="${index}">
									${planet.name}
								</button>
							</li>
						`).join('')}
					</ul>
					<ul class="nav">
						<li class="nav-item">
							<button class="btn btn-success" data-tunnel-previous>Previous step</button>
						</li>
						<li class="nav-item">
							<button type="submit" class="btn btn-success disabled" data-tunnel-next>Next step</button>
						</li>
					</ul>
                </div>`;
	}

	getStepDatasToRender () {
		return {
			listPlanet: this.options.datas.planets.results
		};
	}

	/**
	 * Check if the step can be displayed
	 *
	 * @returns {Object} Status of the render of the step
	 */
	canTheStepBeDisplayed = async () => {
		// Request datas from API for the specific class
		// Method is exposed by the Tunnel on each class instance
		const datas = await this.requestAllDatasFromCache('step-people');
		this.datasFromPreviousStep = datas;

		// The step can be displayed if the following conditions are resolved:
		return {
			canBeDisplayed: datas && datas['step-people'],
			fallbackRoute: this.fallbackRoute
		};
	};

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
