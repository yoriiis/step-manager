'use strict';

import datas from './datas.json';
import Steps from '../steps';

import CacheManager from '../cache-manager';
import Router from '../router';
import { Manager } from '../index.js';

let manager;

class StepPeople extends Steps {
	id = 'step-people';
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
	id = 'step-planet';
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
		onEnded: datas => true
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
			onEnded: expect.any(Function)
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
			onEnded: expect.any(Function)
		});
	});

	it('Should call the init function', () => {
		manager.addEvents = jest.fn();
		manager.analyzeSteps = jest.fn();

		manager.init();

		expect(manager.CacheManager).toBeInstanceOf(CacheManager);
		expect(manager.Router).toBeInstanceOf(Router);
		expect(manager.addEvents).toHaveBeenCalled();
		expect(manager.analyzeSteps).toHaveBeenCalled();
	});

	it('Should analyze steps', () => {
		manager.init();
		manager.analyzeSteps();

		expect(manager.datas).toEqual({
			'step-people': {
				datas: null,
				index: 0,
				route: 'people'
			},
			'step-planet': {
				datas: null,
				index: 1,
				route: 'planet'
			}
		});
	});

	it('Should add event listeners', () => {
		manager.options.element.addEventListener = jest.fn();

		manager.init();
		manager.addEvents();

		expect(manager.options.element.addEventListener).toHaveBeenCalledWith(
			'stepNext',
			manager.onTriggerStepNext,
			false
		);
		expect(manager.options.element.addEventListener).toHaveBeenCalledWith(
			'stepPrevious',
			manager.onTriggerStepPrevious,
			false
		);
	});

	it('Should trigger step next', () => {
		manager.init();
		manager.Router.triggerNext = jest.fn();
		manager.triggerStepNext();

		expect(manager.Router.triggerNext).toHaveBeenCalled();
	});

	it('Should trigger step next when all steps are complete', () => {
		manager.init();
		manager.isCompleted = true;
		manager.Router.triggerNext = jest.fn();
		manager.triggerStepNext();

		expect(manager.Router.triggerNext).not.toHaveBeenCalled();
	});

	it('Should call the onEnded function', () => {
		manager.init();
		manager.options.onEnded = jest.fn();
		manager.allStepsComplete();

		expect(manager.options.onEnded).toHaveBeenCalled();
	});

	it('Should trigger step previous', () => {
		manager.init();
		manager.Router.triggerPrevious = jest.fn();
		manager.triggerStepPrevious();

		expect(manager.Router.triggerPrevious).toHaveBeenCalled();
	});

	it('Should call the requestDatas', () => {
		manager.init();
		manager.datas = {
			'step-people': {
				datas: true,
				index: 0,
				route: 'people'
			},
			'step-planet': {
				datas: null,
				index: 1,
				route: 'planet'
			}
		};
		const results = manager.steps.people.requestDatas('step-people');

		expect(results).toEqual([
			{
				datas: true,
				index: 0,
				route: 'people'
			}
		]);
	});
});
