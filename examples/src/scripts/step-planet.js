import CustomSteps from './custom-steps';

export default class StepPlanet extends CustomSteps {
	id = 'step-planet';
	route = 'planet';
	selector = '.step-planet';
	fallbackRoute = 'people';

	/**
	 * Get step template
	 * Template come from the specific template variable templateStep
	 *
	 * @param {Object} datas Datas from getStepDatasToRender
	 *
	 * @returns {Object} Generated HTML for the step
	 */
	getTemplate () {
		const listPlanet = this.options.datas.planets.results;

		/* prettier-ignore */
		return `<div class="step-planet">
                    <h2 class="title">Choose your favorites planet</h2>
					<ul class="list">
						${listPlanet.map((planet, index) => `
							<li class="list-item">
								<button class="list-button" data-list-button data-key="${index}">
									${planet.name}
								</button>
							</li>
						`).join('')}
					</ul>
					<ul class="nav">
						<li class="nav-item">
							<button class="btn" data-step-previous>Previous step</button>
						</li>
						<li class="nav-item">
							<button type="submit" class="btn btn disabled" data-step-next>Next step</button>
						</li>
					</ul>
                </div>`;
	}

	/**
	 * Check if the step can be displayed
	 *
	 * @returns {Object} Status of the render of the step
	 */
	canTheStepBeDisplayed () {
		// Request datas from API for the specific class
		// Method is exposed by the Manager on each class instance
		const datas = this.requestDatas('step-people');

		// The step can be displayed if the following conditions are resolved:
		return {
			canBeDisplayed: !!(datas && datas[0] && datas[0].datas),
			fallbackRoute: this.fallbackRoute
		};
	}
}
