import CustomSteps from './custom-steps';

export default class StepSpecie extends CustomSteps {
	id = 'step-specie';
	route = 'specie';
	selector = '.step-specie';
	fallbackRoute = 'planet';

	/**
	 * Get step template
	 * Template come from the specific template variable templateStep
	 *
	 * @param {Object} datas Datas from getStepDatasToRender
	 *
	 * @returns {Object} Generated HTML for the step
	 */
	getTemplate () {
		const listSpecie = this.options.datas.species.results;

		/* prettier-ignore */
		return `<div class="step-specie">
                    <h2 class="title">Choose your favorites specie</h2>
					<ul class="list">
						${listSpecie.map((specie, index) => `
							<li class="list-item">
								<button class="list-button" data-list-button data-key="${index}">
									${specie.name}
								</button>
							</li>
						`).join('')}
					</ul>
					<ul class="nav">
						<li class="nav-item">
							<button class="btn" data-step-previous>Previous step</button>
						</li>
						<li class="nav-item">
							<button type="submit" class="btn disabled" data-step-next>Submit</button>
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
		// Request datas from cache for the specific class
		// Method is exposed by the Manager on each class instance
		const datas = this.requestDatas('step-people', 'step-planet');
		const isStepPeopleValid = datas && datas[0] && datas[0].datas;
		const isStepPlanetValid = datas && datas[1] && datas[1].datas;

		// The step can be displayed if the following conditions are resolved:
		return {
			canBeDisplayed: !!(isStepPeopleValid && isStepPlanetValid),
			fallbackRoute: isStepPlanetValid ? this.fallbackRoute : 'people'
		};
	}
}