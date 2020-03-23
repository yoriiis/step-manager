import CustomSteps from './custom-steps';

export default class StepSpecie extends CustomSteps {
	// Set public instance fields
	route = 'specie';
	selector = '.step-specie';
	fallbackRoute = 'planet';

	/**
	 * Get step template
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
		// Request datas from the Manager for the previous steps
		// Method is exposed by the Manager on each class instance
		const datas = this.requestDatas('people', 'planet');
		const isStepPeopleValid = datas && datas.people && datas.people.datas;
		const isStepPlanetValid = datas && datas.planet && datas.planet.datas;

		// The step can be displayed if the following conditions are resolved:
		return {
			canBeDisplayed: !!(isStepPeopleValid && isStepPlanetValid),
			fallbackRoute: isStepPlanetValid ? this.fallbackRoute : 'people'
		};
	}
}
