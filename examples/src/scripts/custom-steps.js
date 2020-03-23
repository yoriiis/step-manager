import { Steps } from '../../../dist/step-manager';

/**
 * Custom steps extends Steps
 * To prevent code duplication between steps People, Planet and Specie for common codes
 */
export default class CustomSteps extends Steps {
	/**
	 * Create steps event listeners (common on all specific step)
	 */
	addEvents () {
		// Execute the method of the steps class before this one
		super.addEvents();

		// Add event listener on all buttons
		const buttons = [...this.currentStep.querySelectorAll('[data-list-button]')];
		buttons.forEach(button => {
			this.onClickOnListButton = e => {
				this.clickOnListButton(e);
			};
			button.addEventListener('click', this.onClickOnListButton, false);
		});
	}

	/**
	 * Event listener on button click
	 *
	 * @param {Object} e Event listener datas
	 */
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
	 * Get datas from this step
	 *
	 * @returns {Object} Local datas of the step
	 */
	getDatasFromStep () {
		// Search all active buttons and extract content
		const datas = [...document.querySelectorAll('[data-list-button].active')].map(item => ({
			key: item.getAttribute('data-key'),
			name: item.innerText
		}));

		return datas.length ? datas : null;
	}
}
