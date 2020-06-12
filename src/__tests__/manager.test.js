'use strict';

import datas from './datas.json';
import Steps from '../steps';
import { mockAnalyzeSteps, mockRouter, mockCacheManager } from '../__mocks__/mocks';

import CacheManager from '../cache-manager';
import Router from '../router';
import { Manager } from '../index.js';

jest.mock('../router');

let manager;

class StepPeople extends Steps {
	route = 'people';
	selector = '.step-people';
	canTheStepBeDisplayed() {
		return {
			canBeDisplayed: true,
			fallbackRoute: null
		};
	}

	getTemplate() {
		return '<div class="step-people"></div>';
	}

	getDatasFromStep() {
		return {};
	}
}

class StepPlanet extends Steps {
	route = 'planet';
	selector = '.step-planet';
	canTheStepBeDisplayed() {
		return {
			canBeDisplayed: true,
			fallbackRoute: null
		};
	}

	getTemplate() {
		return '<div class="step-planet"></div>';
	}

	getDatasFromStep() {
		return {};
	}
}

const resultAnalyzeSteps = {
	steps: {
		people: StepPeople,
		planet: StepPlanet
	},
	stepsOrder: ['people', 'planet'],
	defaultRoute: 'people'
};

const getOptions = () => {
	return {
		element: document.querySelector('#steps'),
		datas: datas,
		steps: [StepPeople, StepPlanet],
		onComplete: (datas) => true
	};
};

const getInstance = () => {
	return new Manager(getOptions());
};

beforeEach(() => {
	document.body.innerHTML = '<div id="steps"></div>';
	manager = getInstance();
});

afterEach(() => {
	document.body.innerHTML = '';
});

describe('Manager constructor', () => {
	it('Should initialize the constructor', () => {
		expect(manager.options).toEqual({
			element: expect.any(HTMLDivElement),
			datas: datas,
			steps: [StepPeople, StepPlanet],
			cacheMethod: 'sessionStorage',
			keyBrowserStorage: 'stepManager',
			onComplete: expect.any(Function)
		});
		expect(manager.isCompleted).toBe(false);
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
		expect(manager.isCompleted).toBe(false);
	});
});

describe('Manager init', () => {
	it('Should call the init function', () => {
		manager.addEvents = jest.fn();
		mockAnalyzeSteps(manager, resultAnalyzeSteps);
		mockRouter(manager);

		manager.init();

		expect(manager.addEvents).toHaveBeenCalled();
		expect(manager.analyzeSteps).toHaveBeenCalled();
		expect(manager.steps).toEqual(resultAnalyzeSteps.steps);
		expect(manager.CacheManager).toBeInstanceOf(CacheManager);
		expect(manager.Router).toBeInstanceOf(Router);
		expect(manager.Router.init).toHaveBeenCalled();
	});
});

describe('Manager analyzeSteps', () => {
	it('Should call the analyzeSteps function', () => {
		mockCacheManager(manager);

		const results = manager.analyzeSteps();

		expect(results.steps.people).toBeInstanceOf(StepPeople);
		expect(results.steps.planet).toBeInstanceOf(StepPlanet);
		expect(results.stepsOrder).toEqual(['people', 'planet']);
		expect(results.defaultRoute).toEqual('people');
		expect(results.steps.people.requestOptions).toEqual(expect.any(Function));
		expect(results.steps.people.requestOptions()).toEqual(manager.options);
		expect(results.steps.people.requestDatas).toEqual(expect.any(Function));
		expect(results.steps.people.requestDatas()).toEqual(true);
	});
});

describe('Manager addEvents', () => {
	it('Should call the addEvents function', () => {
		manager.options.element.addEventListener = jest.fn();

		manager.addEvents();

		expect(manager.options.element.addEventListener).toHaveBeenCalledWith(
			'nextStep',
			manager.triggerNextStep,
			false
		);
		expect(manager.options.element.addEventListener).toHaveBeenCalledWith(
			'previousStep',
			manager.triggerPreviousStep,
			false
		);
	});
});

describe('Manager triggerNextStep', () => {
	it('Should cal the triggerNextStep function', () => {
		mockRouter(manager);

		manager.steps = {
			people: {
				getDatasFromStep: jest.fn().mockImplementation(() => {
					return true;
				})
			}
		};
		mockCacheManager(manager);

		manager.allStepsComplete = jest.fn();

		manager.triggerNextStep();

		expect(manager.steps.people.getDatasFromStep).toHaveBeenCalled();
		expect(manager.Router.triggerNext).toHaveBeenCalled();
		expect(manager.CacheManager.setDatasToCache).toHaveBeenCalledWith({
			route: 'people',
			datas: true
		});
		expect(manager.allStepsComplete).not.toHaveBeenCalled();
	});

	it('Should cal the triggerNextStep function with isComplete TRUE', () => {
		mockRouter(manager);

		manager.steps = {
			people: {
				getDatasFromStep: jest.fn().mockImplementation(() => {
					return true;
				})
			}
		};
		mockCacheManager(manager);
		manager.allStepsComplete = jest.fn();

		manager.isCompleted = true;
		manager.triggerNextStep();

		expect(manager.steps.people.getDatasFromStep).not.toHaveBeenCalled();
		expect(manager.CacheManager.setDatasToCache).not.toHaveBeenCalled();
		expect(manager.Router.triggerNext).not.toHaveBeenCalled();
		expect(manager.allStepsComplete).not.toHaveBeenCalled();
	});

	it('Should cal the triggerNextStep function with last step', () => {
		mockRouter(manager, {
			triggerNext: false
		});
		manager.steps = {
			people: {
				getDatasFromStep: jest.fn().mockImplementation(() => {
					return true;
				})
			}
		};
		mockCacheManager(manager);
		manager.allStepsComplete = jest.fn();

		manager.triggerNextStep();

		expect(manager.steps.people.getDatasFromStep).toHaveBeenCalled();
		expect(manager.CacheManager.setDatasToCache).toHaveBeenCalled();
		expect(manager.Router.triggerNext).toHaveBeenCalled();
		expect(manager.allStepsComplete).toHaveBeenCalled();
	});
});

describe('Manager triggerPreviousStep', () => {
	it('Should call the triggerPreviousStep function', () => {
		mockRouter(manager);

		manager.triggerPreviousStep();

		expect(manager.Router.triggerPrevious).toHaveBeenCalled();
	});
});

describe('Manager allStepsComplete', () => {
	it('Should call the allStepsComplete function', () => {
		mockRouter(manager);
		manager.destroy = jest.fn();
		manager.options.onComplete = jest.fn();
		mockCacheManager(manager);

		manager.allStepsComplete();

		expect(manager.Router.destroyStep).toHaveBeenCalledWith('people');
		expect(manager.Router.setRoute).toHaveBeenCalledWith('');
		expect(manager.destroy).toHaveBeenCalled();

		// Because Jest update the instance of onComplete
		// Function is executed only if instanceof Function
		expect(manager.options.onComplete).not.toHaveBeenCalledWith(true);
		expect(manager.CacheManager.removeDatasFromCache).toHaveBeenCalled();
	});
});

describe('Manager destroy', () => {
	it('Should call the destroy', () => {
		manager.options.element.removeEventListener = jest.fn();
		mockRouter(manager);

		manager.destroy();

		expect(manager.options.element.removeEventListener).toHaveBeenCalledWith(
			'nextStep',
			manager.triggerNextStep
		);
		expect(manager.options.element.removeEventListener).toHaveBeenCalledWith(
			'previousStep',
			manager.triggerPreviousStep
		);
		expect(manager.Router.destroy).toHaveBeenCalled();
	});
});
