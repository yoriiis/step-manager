import CustomSteps from './custom-steps';
import { createElement } from 'jsx-dom';

export default class StepPeople extends CustomSteps {
	// Set public instance fields
	id = 'people';
	route = 'people';
	selector = '.step-people';

	/**
	 * Get step template
	 * Template come from the specific template variable templateStep
	 *
	 * @returns {HTMLElement} HTMLElement for the step
	 */
	getTemplate(datas) {
		return (
			<div className="step-people">
				<h2 className="title">Choose your favorites people</h2>
				<ul className="list">
					{datas.map((people, index) => (
						<li className="list-item">
							<button className="list-button" data-list-button data-key={index}>
								{people.name}
							</button>
						</li>
					))}
				</ul>
				<ul className="nav">
					<li className="nav-item">
						<button type="submit" className="btn disabled" data-step-next>
							Next step
						</button>
					</li>
				</ul>
			</div>
		);
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
