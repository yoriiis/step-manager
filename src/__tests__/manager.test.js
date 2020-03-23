'use strict';

import datas from './datas.json';
import Steps from '../steps';

import CacheManager from '../cache-manager';
import Router from '../router';
import { Manager } from '../index.js';

let manager;

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

class StepPlanet extends Steps {
	route = 'planet';
	selector = '.step-planet';
	canTheStepBeDisplayed () {
		return {
			canBeDisplayed: true,
			fallbackRoute: null
		};
	}

	getTemplate () {
		return '<div class="step-planet"></div>';
	}

	getDatasFromStep () {
		return {};
	}
}

const getOptions = () => {
	return {
		element: document.querySelector('#steps'),
		datas: datas,
		steps: [StepPeople, StepPlanet],
		onComplete: datas => true
	};
};

const getInstance = () => {
	return new Manager(getOptions());
};

beforeEach(() => {
	window.sessionStorage.removeItem('stepManager');
	document.body.innerHTML = '<div id="steps"></div>';
	manager = getInstance();
});

afterEach(() => {
	window.sessionStorage.removeItem('stepManager');
	document.body.innerHTML = '';
});

describe('Manager function', () => {
	it('Should initialize the constructor', () => {
		expect(manager.options).toEqual({
			element: expect.any(HTMLDivElement),
			datas: datas,
			steps: [StepPeople, StepPlanet],
			cacheMethod: 'sessionStorage',
			keyBrowserStorage: 'stepManager',
			onComplete: expect.any(Function)
		});
	});

	it('Should initialize the constructor without options', () => {
		const instance = new Manager();

		expect(instance.options).toEqual({
			element: null,
			datas: {},
			steps: [],
			cacheMethod: 'sessionStorage',
			keyBrowserStorage: 'stepManager',
			onComplete: expect.any(Function)
		});
	});

	it('Should call the init function', () => {
		manager.addEvents = jest.fn();

		manager.init();

		expect(manager.CacheManager).toBeInstanceOf(CacheManager);
		expect(manager.Router).toBeInstanceOf(Router);
		expect(manager.addEvents).toHaveBeenCalled();
	});

	it('Should analyze steps', () => {
		const results = manager.analyzeSteps();

		expect(results.steps.people).toBeInstanceOf(StepPeople);
		expect(results.steps.planet).toBeInstanceOf(StepPlanet);
	});

	it('Should add event listeners', () => {
		manager.options.element.addEventListener = jest.fn();

		manager.init();
		manager.addEvents();

		expect(manager.options.element.addEventListener).toHaveBeenCalledWith(
			'nextStep',
			manager.ontriggerNextStep,
			false
		);
		expect(manager.options.element.addEventListener).toHaveBeenCalledWith(
			'previousStep',
			manager.ontriggerPreviousStep,
			false
		);
	});

	it('Should trigger step next', () => {
		manager.init();
		manager.Router.triggerNext = jest.fn();
		manager.triggerNextStep();

		expect(manager.Router.triggerNext).toHaveBeenCalled();
	});

	it('Should trigger step next when all steps are complete', () => {
		manager.init();
		manager.isCompleted = true;
		manager.Router.triggerNext = jest.fn();
		manager.triggerNextStep();

		expect(manager.Router.triggerNext).not.toHaveBeenCalled();
	});

	it('Should call the onComplete function', () => {
		manager.init();
		manager.options.onComplete = jest.fn();
		manager.allStepsComplete();

		expect(manager.options.onComplete).toHaveBeenCalled();
	});

	it('Should trigger step previous', () => {
		manager.init();
		manager.Router.triggerPrevious = jest.fn();
		manager.triggerPreviousStep();

		expect(manager.Router.triggerPrevious).toHaveBeenCalled();
	});

	it('Should call the requestDatas', () => {
		manager.init();
		const datas = {
			people: {
				datas: [
					{ key: '5', name: 'Owen Lars' },
					{ key: '6', name: 'Beru Whitesun lars' }
				]
			}
		};
		window.sessionStorage.setItem('stepManager', JSON.stringify(datas));
		const steps = manager.analyzeSteps().steps;
		const results = steps.people.requestDatas('people');

		expect(results).toEqual(datas);
	});
});
