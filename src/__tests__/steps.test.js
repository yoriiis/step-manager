import Steps from '../steps';

let steps;
const datas = { people: true };

class StepPeople extends Steps {
	route = 'people';
	selector = '.step-people';
	canTheStepBeDisplayed () {
		return {
			canBeDisplayed: true,
			fallbackRoute: null
		};
	}

	getTemplate () {
		return '<div class="step-people"></div>';
	}

	getDatasFromStep () {
		return {};
	}
}

const getInstance = () => {
	return new StepPeople();
};

const getOptions = () => {
	return {
		element: document.querySelector('#steps')
	};
};

const getEventObject = selector => {
	return {
		target: document.querySelector(selector)
	};
};

beforeEach(() => {
	document.body.innerHTML =
		'<div id="steps"><div class="step-people"><button data-step-previous></button><button data-step-next></button></div></div>';
	steps = getInstance();
	steps.options = getOptions();
});

afterEach(() => {});

describe('Steps fields', () => {
	it('Should initialize public instance fields', () => {
		expect(steps.fallbackRoute).toBe(null);
		expect(steps.optionalStep).toBe(false);
	});
});

describe('Steps render', () => {
	it('Should call the render function', () => {
		steps.requestOptions = jest.fn().mockImplementation(() => getOptions());
		steps.afterRender = jest.fn();
		steps.getTemplate = jest.fn().mockImplementation(() => 'CONTENT');

		steps.render({ datas });

		expect(steps.requestOptions).toHaveBeenCalled();
		expect(steps.getTemplate).toHaveBeenCalled();
		expect(document.body.innerHTML).toBe(
			'<div id="steps"><div class="step-people"><button data-step-previous=""></button><button data-step-next=""></button></div>CONTENT</div>'
		);
		expect(steps.afterRender).toHaveBeenCalledWith({ datas });
	});
});

describe('Steps afterRender', () => {
	it('Should call the afterRender function', () => {
		steps.addEvents = jest.fn();
		steps.renderDatasFromCache = jest.fn();

		document.querySelector('#steps').innerHTML = '<div class="step-people"></div>';
		steps.afterRender({ datas });

		expect(steps.currentStep).toBe(document.querySelector('.step-people'));
		expect(steps.addEvents).toHaveBeenCalled();
		expect(steps.renderDatasFromCache).toHaveBeenCalledWith(datas);
	});

	it('Should call the afterRender function without cache datas', () => {
		steps.addEvents = jest.fn();
		steps.renderDatasFromCache = jest.fn();

		steps.afterRender({ datas: null });

		expect(steps.renderDatasFromCache).not.toHaveBeenCalled();
	});

	it('Should call the afterRender function with empty object datas', () => {
		steps.addEvents = jest.fn();
		steps.renderDatasFromCache = jest.fn();

		steps.afterRender();

		expect(steps.renderDatasFromCache).not.toHaveBeenCalled();
	});
});

describe('Steps destroy', () => {
	it('Should call the destroy function', () => {
		steps.removeEvents = jest.fn();

		document.querySelector('#steps').innerHTML = '<div class="step-people"></div>';
		steps.currentStep = document.querySelector('.step-people');
		steps.currentStep.remove = jest.fn();

		steps.destroy();

		expect(steps.removeEvents).toHaveBeenCalled();
		expect(steps.currentStep.remove).toHaveBeenCalled();
	});
});

describe('Steps addEvents', () => {
	it('Should call the addEvents function', () => {
		document.querySelector('#steps').innerHTML = '<div class="step-people"></div>';
		steps.currentStep = document.querySelector('.step-people');

		steps.currentStep.addEventListener = jest.fn();

		steps.addEvents();

		expect(steps.currentStep.addEventListener).toHaveBeenCalledWith(
			'click',
			steps.clickOnCurrentStep,
			false
		);
	});
});

describe('Steps clickOnCurrentStep', () => {
	it('Should call the clickOnCurrentStep function without element', () => {
		steps.clickToPreviousStep = jest.fn();
		steps.clickToNextStep = jest.fn();

		steps.clickOnCurrentStep(getEventObject('#steps'));

		expect(steps.clickToPreviousStep).not.toHaveBeenCalled();
		expect(steps.clickToNextStep).not.toHaveBeenCalled();
	});

	it('Should call the clickOnCurrentStep function with previous click', () => {
		steps.clickToPreviousStep = jest.fn();
		steps.clickToNextStep = jest.fn();

		steps.clickOnCurrentStep(getEventObject('[data-step-previous]'));

		expect(steps.clickToPreviousStep).toHaveBeenCalled();
		expect(steps.clickToNextStep).not.toHaveBeenCalled();
	});

	it('Should call the clickOnCurrentStep function with next click', () => {
		steps.clickToPreviousStep = jest.fn();
		steps.clickToNextStep = jest.fn();

		steps.clickOnCurrentStep(getEventObject('[data-step-next]'));

		expect(steps.clickToPreviousStep).not.toHaveBeenCalled();
		expect(steps.clickToNextStep).toHaveBeenCalled();
	});
});

describe('Steps clickToNextStep', () => {
	it('Should call the clickToNextStep with step not ready to submit', () => {
		steps.options.element.dispatchEvent = jest.fn();

		steps.stepIsReadyToSubmit = false;
		steps.clickToNextStep({ preventDefault: () => {} });

		expect(steps.options.element.dispatchEvent).not.toHaveBeenCalled();
	});

	it('Should call the clickToNextStep with step ready to submit', () => {
		steps.options.element.dispatchEvent = jest.fn();

		steps.stepIsReadyToSubmit = true;
		steps.clickToNextStep({ preventDefault: () => {} });

		expect(steps.options.element.dispatchEvent).toHaveBeenCalledWith(
			new window.CustomEvent('nextStep')
		);
	});
});

describe('Steps clickToPreviousStep', () => {
	it('Should call the clickToPreviousStep with step not ready to submit', () => {
		steps.options.element.dispatchEvent = jest.fn();

		steps.clickToPreviousStep({ preventDefault: () => {} });

		expect(steps.options.element.dispatchEvent).toHaveBeenCalledWith(
			new window.CustomEvent('previousStep')
		);
	});
});

describe('Steps checkIfStepIsReadyToSubmit', () => {
	it('Should call the checkIfStepIsReadyToSubmit function', () => {
		steps.getDatasFromStep = jest.fn().mockImplementation(() => true);
		steps.updateButtonToValidateStep = jest.fn();

		steps.checkIfStepIsReadyToSubmit();

		expect(steps.stepIsReadyToSubmit).toBe(true);
		expect(steps.updateButtonToValidateStep).toHaveBeenCalled();
	});

	it('Should call the checkIfStepIsReadyToSubmit function without datas from steps', () => {
		steps.getDatasFromStep = jest.fn().mockImplementation(() => null);
		steps.updateButtonToValidateStep = jest.fn();

		steps.checkIfStepIsReadyToSubmit();

		expect(steps.stepIsReadyToSubmit).toBe(false);
		expect(steps.updateButtonToValidateStep).toHaveBeenCalled();
	});
});

describe('Steps updateButtonToValidateStep', () => {
	it('Should call the updateButtonToValidateStep function with step not ready', () => {
		steps.currentStep = document.querySelector('.step-people');

		steps.stepIsReadyToSubmit = false;
		steps.optionalStep = false;
		steps.updateButtonToValidateStep();

		expect(document.querySelector('[data-step-next]').classList.contains('disabled')).toBe(
			true
		);
	});

	it('Should call the updateButtonToValidateStep function with step ready', () => {
		steps.currentStep = document.querySelector('.step-people');

		steps.stepIsReadyToSubmit = true;
		steps.optionalStep = false;
		steps.updateButtonToValidateStep();

		expect(document.querySelector('[data-step-next]').classList.contains('disabled')).toBe(
			false
		);
	});

	it('Should call the updateButtonToValidateStep function with step optional', () => {
		steps.currentStep = document.querySelector('.step-people');

		steps.stepIsReadyToSubmit = false;
		steps.optionalStep = true;
		steps.updateButtonToValidateStep();

		expect(document.querySelector('[data-step-next]').classList.contains('disabled')).toBe(
			false
		);
	});
});

describe('Steps removeEvents', () => {
	it('Should call the removeEvents function', () => {
		document.querySelector('#steps').innerHTML = '<div class="step-people"></div>';
		steps.currentStep = document.querySelector('.step-people');

		steps.currentStep.removeEventListener = jest.fn();

		steps.removeEvents();

		expect(steps.currentStep.removeEventListener).toHaveBeenCalledWith(
			'click',
			steps.clickOnCurrentStep
		);
	});
});
