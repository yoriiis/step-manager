import CustomSteps from './custom-steps';

export default class StepPeople extends CustomSteps {
	// Set public instance fields
	id = 'people';
	route = 'people';
	selector = '.step-people';

	/**
	 * Get step template
	 * Template come from the specific template variable templateStep
	 *
	 * @returns {Object} Generated HTML for the step
	 */
	getTemplate(datas) {
		/* prettier-ignore */
		return `<div class="step-people">
                    <h2 class="title">Choose your favorites people</h2>
					<ul class="list">
						${datas.map((people, index) => `
							<li class="list-item">
								<button class="list-button" data-list-button data-key="${index}">
									${people.name}
								</button>
							</li>
						`).join('')}
					</ul>
					<ul class="nav">
						<li class="nav-item">
							<button type="submit" class="btn disabled" data-step-next>Next step</button>
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
		// The step can be displayed if the following conditions are resolved:
		return {
			canBeDisplayed: true
		};
	}

	/**
	 * Get the step datas for the render function
	 *
	 * @returns {Object} Step datas
	 */
	getStepDatasToRender() {
		return this.options.datas.people.results;
	}
}
