import CustomSteps from './custom-steps';

export default class StepPlanet extends CustomSteps {
	// Set public instance fields
	id = 'planet';
	route = 'planet';
	selector = '.step-planet';

	/**
	 * Get step template
	 *
	 * @returns {Object} Generated HTML for the step
	 */
	getTemplate(datas) {
		/* prettier-ignore */
		return `<div class="step-planet">
                    <h2 class="title">Choose your favorites planet</h2>
					<ul class="list">
						${datas.map((planet, index) => `
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
	canTheStepBeDisplayed() {
		// Request datas from the Manager for the previous steps
		// Method is exposed by the Manager on each class instance
		const datas = this.requestDatas('people');

		// The step can be displayed if the following conditions are resolved:
		return {
			canBeDisplayed: !!(datas && datas.people && datas.people.datas)
		};
	}

	/**
	 * Get the step datas for the render function
	 *
	 * @returns {Object} Step datas
	 */
	getStepDatasToRender() {
		return this.options.datas.planets.results;
	}
}
