'use strict';

import datas from './datas.json';
import Steps from '../steps';
import { mockAnalyzeSteps, mockRouter, mockCacheManager } from '../__mocks__/mocks';

import CacheManager from '../cache-manager';
import Router from '../router';
import { Manager } from '../index.js';

jest.mock('../router');
jest.mock('../cache-manager');

let manager;

class StepPeople extends Steps {
	id = 'id-people';
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
	id = 'id-planet';
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
		'id-people': StepPeople,
		'id-planet': StepPlanet
	},
	stepsOrder: [
		{
			id: 'id-people',
			route: 'people'
		},
		{
			id: 'id-planet',
			route: 'planet'
		}
	],
	defaultRoute: 'people'
};

const getOptions = () => {
	return {
		element: document.querySelector('#steps'),
		datas: datas,
		steps: [StepPeople, StepPlanet],
		onComplete: (datas) => {
			console.log('complete!');
		}
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
			onComplete: expect.any(Function),
			onChange: expect.any(Function)
		});
		expect(manager.isCompleted).toBeFalsy();
		expect(manager.triggerPreviousStep).toBe(manager.triggerPreviousStep);
		expect(manager.triggerNextStep).toBe(manager.triggerNextStep);
	});

	it('Should initialize the constructor without options', () => {
		const instance = new Manager();

		expect(instance.options).toEqual({
			element: null,
			datas: {},
			steps: [],
			cacheMethod: 'sessionStorage',
			keyBrowserStorage: 'stepManager',
			onComplete: expect.any(Function),
			onChange: expect.any(Function)
		});
		expect(manager.isCompleted).toBeFalsy();
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
		expect(CacheManager).toHaveBeenCalledWith({
			cacheMethod: 'sessionStorage',
			keyBrowserStorage: 'stepManager'
		});
		expect(Router).toHaveBeenCalledWith({
			defaultRoute: resultAnalyzeSteps.defaultRoute,
			stepsOrder: resultAnalyzeSteps.stepsOrder,
			steps: resultAnalyzeSteps.steps,
			onChange: manager.options.onChange,
			getDatasFromCache: expect.any(Function)
		});
		expect(manager.Router.init).toHaveBeenCalled();
	});
});

describe('Manager analyzeSteps', () => {
	it('Should call the analyzeSteps function', () => {
		mockCacheManager(manager, {
			getDatasFromCache: {}
		});

		const results = manager.analyzeSteps();

		expect(results.steps['id-people']).toBeInstanceOf(StepPeople);
		expect(results.steps['id-planet']).toBeInstanceOf(StepPlanet);
		expect(results.stepsOrder).toEqual([
			{
				id: 'id-people',
				route: 'people'
			},
			{
				id: 'id-planet',
				route: 'planet'
			}
		]);
		expect(results.defaultRoute).toEqual('people');
		expect(results.steps['id-people'].requestOptions).toEqual(expect.any(Function));
		expect(results.steps['id-people'].requestOptions()).toEqual(manager.options);
		expect(results.steps['id-people'].requestDatas).toEqual(expect.any(Function));
		expect(results.steps['id-people'].requestDatas()).toEqual({});
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
	it('Should call the triggerNextStep function', () => {
		mockRouter(manager, { routeId: 'id-people' });
		mockCacheManager(manager);

		manager.steps = {
			'id-people': {
				getDatasFromStep: jest.fn().mockImplementation(() => {
					return {};
				})
			}
		};

		manager.allStepsComplete = jest.fn();

		manager.triggerNextStep();

		expect(manager.steps['id-people'].getDatasFromStep).toHaveBeenCalled();
		expect(manager.Router.triggerNext).toHaveBeenCalled();
		expect(manager.CacheManager.setDatasToCache).toHaveBeenCalledWith({
			id: 'id-people',
			datas: {}
		});
		expect(manager.allStepsComplete).not.toHaveBeenCalled();
	});

	it('Should call the triggerNextStep function with isComplete TRUE', () => {
		mockRouter(manager, { routeId: 'id-people' });

		manager.steps = {
			'id-people': {
				getDatasFromStep: jest.fn()
			}
		};
		mockCacheManager(manager);
		manager.allStepsComplete = jest.fn();

		manager.isCompleted = true;
		manager.triggerNextStep();

		expect(manager.steps['id-people'].getDatasFromStep).not.toHaveBeenCalled();
		expect(manager.CacheManager.setDatasToCache).not.toHaveBeenCalled();
		expect(manager.Router.triggerNext).not.toHaveBeenCalled();
		expect(manager.allStepsComplete).not.toHaveBeenCalled();
	});

	it('Should call the triggerNextStep function with last step', () => {
		mockRouter(manager, {
			triggerNext: false,
			routeId: 'id-people'
		});
		manager.steps = {
			'id-people': {
				getDatasFromStep: jest.fn()
			}
		};
		mockCacheManager(manager);
		manager.allStepsComplete = jest.fn();

		manager.triggerNextStep();

		expect(manager.steps['id-people'].getDatasFromStep).toHaveBeenCalled();
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
		mockCacheManager(manager, {
			getDatasFromCache: {}
		});

		manager.allStepsComplete();

		expect(manager.isCompleted).toBeTruthy();
		expect(manager.options.element.classList.contains('loading')).toBeTruthy();
		expect(manager.options.onComplete).toHaveBeenCalledWith({});
		expect(manager.CacheManager.removeDatasFromCache).toHaveBeenCalled();
	});

	it('Should call the allStepsComplete function without the onComplete function', () => {
		mockRouter(manager);
		manager.destroy = jest.fn();
		manager.options.onComplete = jest.fn();
		mockCacheManager(manager, {
			getDatasFromCache: {}
		});

		manager.options.onComplete = null;
		manager.allStepsComplete();
		manager.options.onComplete = jest.fn();

		expect(manager.options.onComplete).not.toHaveBeenCalled();
	});
});

describe('Manager destroy', () => {
	it('Should call the destroy', () => {
		manager.options.element.removeEventListener = jest.fn();
		manager.options.element.remove = jest.fn();
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
		expect(manager.Router.setRoute).toHaveBeenCalledWith('');
		expect(manager.Router.destroy).toHaveBeenCalled();
		expect(manager.options.element.remove).toHaveBeenCalled();
	});
});
