'use strict';

import Steps from '../steps';
import CacheManager from '../cache-manager';
import Router from '../router';

let router;
let event;

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
	fallbackRoute = 'people';
	canTheStepBeDisplayed () {
		return {
			canBeDisplayed: true,
			fallbackRoute: 'people'
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
		defaultRoute: 'people',
		stepsOrder: ['people', 'planet'],
		steps: {
			people: new StepPeople(),
			planet: new StepPlanet()
		},
		getDatasFromCache: (...filters) => new CacheManager().getDatasFromCache(filters)
	};
};

const getInstance = () => {
	return new Router(getOptions());
};

beforeEach(() => {
	event = {
		target: true,
		oldURL: 'http://localhost.com/#people'
	};
	window.sessionStorage.removeItem('stepManager');
	router = getInstance();
});

afterEach(() => {
	window.sessionStorage.removeItem('stepManager');
	document.body.innerHTML = '';
	window.location.hash = '';
});

describe('Router constructor', () => {
	it('Should initialize the constructor', () => {
		expect(router.options).toEqual({
			defaultRoute: 'people',
			stepsOrder: ['people', 'planet'],
			steps: {
				people: new StepPeople(),
				planet: new StepPlanet()
			},
			getDatasFromCache: expect.any(Function)
		});
		expect(router.reverseNavigation).toBe(false);
		expect(router.stepCreated).toBe(false);
		expect(router.applicationReady).toBe(false);
		expect(router.stepRedirected).toEqual({});
		expect(router.hashChanged).toBe(router.hashChanged);
	});

	it('Should initialize the constructor without options', () => {
		const instance = new Router();

		expect(instance.options).toEqual({
			defaultRoute: null,
			stepsOrder: [],
			steps: {},
			getDatasFromCache: expect.any(Function)
		});
	});
});

describe('Router init', () => {
	it('Should call the init function', () => {
		router.addEvents = jest.fn();
		router.getRoute = jest.fn().mockImplementation(() => '');
		router.setRoute = jest.fn();

		router.init();

		expect(router.addEvents).toHaveBeenCalled();
		expect(router.getRoute).toHaveBeenCalled();
		expect(router.setRoute).toHaveBeenCalledWith('people');
	});

	it('Should call the init function with specific route', () => {
		router.addEvents = jest.fn();
		router.getRoute = jest.fn().mockImplementation(() => 'planet');
		router.hashChanged = jest.fn();

		router.init();

		expect(router.addEvents).toHaveBeenCalled();
		expect(router.getRoute).toHaveBeenCalled();
		expect(router.hashChanged).toHaveBeenCalled();
	});
});

describe('Router addEvents', () => {
	it('Should call the addEvents function', () => {
		window.addEventListener = jest.fn();

		router.addEvents();

		expect(window.addEventListener).toHaveBeenCalledWith(
			'hashchange',
			router.hashChanged,
			false
		);
	});
});

describe('Router hashChanged', () => {
	it('Should call the hashChanged function', () => {
		const route = 'planet';

		router.getRoute = jest.fn().mockImplementation(() => route);
		router.checkIfTheStepCanBeDisplay = jest.fn().mockImplementation(() => {
			return {
				canBeDisplayed: true,
				fallbackRoute: 'people'
			};
		});
		router.stepCanBeDisplayed = jest.fn();

		router.hashChanged(event);

		expect(router.getRoute).toHaveBeenCalled();
		expect(router.checkIfTheStepCanBeDisplay).toHaveBeenCalledWith({
			route,
			event
		});
		expect(router.stepCanBeDisplayed).toHaveBeenCalledWith(event, 'people');
	});

	it('Should call the hashChanged function with invalid step', () => {
		const route = 'planet';

		router.getRoute = jest.fn().mockImplementation(() => route);
		router.checkIfTheStepCanBeDisplay = jest.fn().mockImplementation(() => {
			return {
				canBeDisplayed: false,
				fallbackRoute: 'people'
			};
		});
		router.stepCanBeDisplayed = jest.fn();

		router.hashChanged(event);

		expect(router.getRoute).toHaveBeenCalled();
		expect(router.checkIfTheStepCanBeDisplay).toHaveBeenCalledWith({
			route,
			event
		});
		expect(router.stepCanBeDisplayed).toHaveBeenCalledWith(event, null);
	});
});

describe('Router stepCanBeDisplayed', () => {
	it('Should call the stepCanBeDisplayed function with event', () => {
		router.getPreviousRoute = jest.fn().mockImplementation(() => 'people');
		router.destroyStep = jest.fn();
		router.createStep = jest.fn();

		router.currentRoute = 'planet';
		router.stepCanBeDisplayed(event);

		expect(router.getPreviousRoute).toHaveBeenCalledWith(event);
		expect(router.previousRoute).toBe('people');
		expect(router.destroyStep).toHaveBeenCalledWith('people');
		expect(router.createStep).toHaveBeenCalledWith({
			route: 'planet'
		});
	});

	it('Should call the stepCanBeDisplayed function without event', () => {
		router.getPreviousRoute = jest.fn().mockImplementation(() => 'people');
		router.destroyStep = jest.fn();
		router.createStep = jest.fn();
		router.currentRoute = 'planet';

		router.stepCanBeDisplayed();

		expect(router.getPreviousRoute).not.toHaveBeenCalled();
		expect(router.destroyStep).not.toHaveBeenCalledWith();
		expect(router.createStep).not.toHaveBeenCalledWith();
	});

	it('Should call the stepCanBeDisplayed function with stepRedirected', () => {
		router.getPreviousRoute = jest.fn();
		router.destroyStep = jest.fn();
		router.createStep = jest.fn();
		router.currentRoute = 'planet';

		router.currentRoute = 'people';
		router.stepRedirected = {
			redirect: true,
			previousRoute: 'planet'
		};
		router.stepCanBeDisplayed(event);

		expect(router.getPreviousRoute).not.toHaveBeenCalled();
		expect(router.previousRoute).toBe('planet');
		expect(router.destroyStep).toHaveBeenCalledWith('planet');
		expect(router.createStep).toHaveBeenCalledWith({
			route: 'people'
		});
		expect(router.stepRedirected.redirect).toBe(false);
	});

	it('Should call the stepCanBeDisplayed function without previousRoute', () => {
		router.getPreviousRoute = jest.fn().mockImplementation(() => null);
		router.destroyStep = jest.fn();
		router.createStep = jest.fn();
		router.currentRoute = 'planet';

		router.currentRoute = 'people';
		router.stepCanBeDisplayed(event);

		expect(router.getPreviousRoute).toHaveBeenCalledWith(event);
		expect(router.previousRoute).toBe(null);
		expect(router.destroyStep).not.toHaveBeenCalled();
		expect(router.createStep).not.toHaveBeenCalledWith();
	});
});

describe('Router stepCantBeDisplayed', () => {
	it('Should call the stepCantBeDisplayed function', () => {
		const route = 'planet';

		router.getPreviousRoute = jest.fn().mockImplementation(() => route);
		router.setRoute = jest.fn();

		router.stepCantBeDisplayed(event, route);

		expect(router.stepRedirected).toEqual({
			redirect: true,
			previousRoute: route
		});
		expect(router.previousRoute).toBe(null);
		expect(router.setRoute).toHaveBeenCalledWith(route);
	});

	it('Should call the stepCantBeDisplayed function without fallbackRoute', () => {
		router.getPreviousRoute = jest.fn();
		router.setRoute = jest.fn();

		router.stepCantBeDisplayed();

		expect(router.setRoute).toHaveBeenCalledWith('people');
	});
});

describe('Router checkIfTheStepCanBeDisplay', () => {
	it('Should call the checkIfTheStepCanBeDisplay function', () => {
		const route = 'people';

		router.options.steps[route].canTheStepBeDisplayed = jest
			.fn()
			.mockImplementation(() => true);

		const result = router.checkIfTheStepCanBeDisplay({
			route
		});

		expect(router.options.steps[route].canTheStepBeDisplayed).toHaveBeenCalled();
		expect(result).toBe(true);
	});

	it('Should call the checkIfTheStepCanBeDisplay function with invalid step and a fallback route', () => {
		router.getPreviousRoute = jest.fn().mockImplementation(() => 'planet');

		const result = router.checkIfTheStepCanBeDisplay({
			route: 'fakestep',
			event
		});

		expect(router.getPreviousRoute).toHaveBeenCalledWith(event);
		expect(result).toEqual({
			canBeDisplayed: false,
			fallbackRoute: 'people'
		});
	});

	it('Should call the checkIfTheStepCanBeDisplay function with invalid step and no fallback route', () => {
		router.getPreviousRoute = jest.fn().mockImplementation(() => 'people');

		const result = router.checkIfTheStepCanBeDisplay({
			route: 'fakestep',
			event
		});

		expect(router.getPreviousRoute).toHaveBeenCalledWith(event);
		expect(result).toEqual({
			canBeDisplayed: false,
			fallbackRoute: 'people'
		});
	});

	it('Should call the checkIfTheStepCanBeDisplay function with invalid step', () => {
		router.getPreviousRoute = jest.fn().mockImplementation(() => null);

		const result = router.checkIfTheStepCanBeDisplay({
			route: 'fakestep',
			event
		});

		expect(result).toEqual({
			canBeDisplayed: false,
			fallbackRoute: 'people'
		});
	});
});

describe('Router createStep', () => {
	it('Should call the createStep function', () => {
		const route = 'people';

		router.options.getDatasFromCache = jest.fn().mockImplementation(() => ({
			[route]: {
				datas: true
			}
		}));
		router.options.steps[route].render = jest.fn();

		router.createStep({ route });

		expect(router.options.getDatasFromCache).toHaveBeenCalledWith([route]);
		expect(router.options.steps[route].render).toHaveBeenCalledWith({
			datas: true
		});
		expect(router.applicationReady).toBe(true);
	});

	it('Should call the createStep function without datas from cache', () => {
		const route = 'people';

		router.options.getDatasFromCache = jest.fn().mockImplementation(() => null);
		router.options.steps[route].render = jest.fn();

		router.createStep({ route });

		expect(router.options.getDatasFromCache).toHaveBeenCalledWith([route]);
		expect(router.options.steps[route].render).toHaveBeenCalledWith({
			datas: null
		});
		expect(router.applicationReady).toBe(true);
	});

	it('Should call the createStep function with application already ready', () => {
		const route = 'people';

		router.options.getDatasFromCache = jest.fn().mockImplementation(() => null);
		router.options.steps[route].render = jest.fn();

		router.applicationReady = true;
		router.createStep({ route });

		expect(router.options.getDatasFromCache).toHaveBeenCalledWith([route]);
		expect(router.options.steps[route].render).toHaveBeenCalledWith({
			datas: null
		});
		expect(router.applicationReady).toBe(true);
	});
});

describe('Router destroyStep', () => {
	it('Should call the destroyStep function', () => {
		const route = 'people';

		router.options.steps[route].destroy = jest.fn();

		router.destroyStep(route);

		expect(router.options.steps[route].destroy).toHaveBeenCalled();
	});
});

describe('Router triggerNext', () => {
	it('Should call the triggerNext function', () => {
		const currentRoute = 'people';

		router.getNextStepRoute = jest.fn().mockImplementation(() => 'planet');
		router.setRoute = jest.fn();

		router.currentRoute = currentRoute;
		router.triggerNext();

		expect(router.getNextStepRoute).toHaveBeenCalledWith(currentRoute);
		expect(router.setRoute).toHaveBeenCalledWith('planet');
	});

	it('Should call the triggerNext function on the last step', () => {
		router.getNextStepRoute = jest.fn().mockImplementation(() => 'end');

		const result = router.triggerNext();

		expect(result).toBe(false);
	});
});

describe('Router triggerPrevious', () => {
	it('Should call the triggerPrevious function', () => {
		router.getPreviousStepRoute = jest.fn().mockImplementation(() => 'people');
		router.setRoute = jest.fn();

		router.currentRoute = 'planet';
		router.triggerPrevious();

		expect(router.previousRoute).toBe('planet');
		expect(router.getPreviousStepRoute).toHaveBeenCalledWith('planet');
		expect(router.setRoute).toHaveBeenCalledWith('people');
	});
});

describe('Router getPreviousRoute', () => {
	it('Should call the getPreviousRoute function', () => {
		const result = router.getPreviousRoute(event);

		expect(result).toBe('people');
	});

	it('Should call the getPreviousRoute function without oldURL', () => {
		const result = router.getPreviousRoute({
			oldURL: ''
		});

		expect(result).toBe(null);
	});
});

describe('Router getPreviousStepRoute', () => {
	it('Should call the getPreviousStepRoute function', () => {
		router.getIndexFromRoute = jest.fn().mockImplementation(() => {
			return '1';
		});

		const route = 'planet';
		const result = router.getPreviousStepRoute(route);

		expect(router.getIndexFromRoute).toHaveBeenCalledWith(route);
		expect(result).toBe('people');
	});

	it('Should call the getPreviousStepRoute function on the first step', () => {
		router.getIndexFromRoute = jest.fn().mockImplementation(() => {
			return '0';
		});

		const route = 'people';
		const result = router.getPreviousStepRoute(route);

		expect(result).toBe('people');
	});
});

describe('Router getNextStepRoute', () => {
	it('Should call the getNextStepRoute function', () => {
		router.getIndexFromRoute = jest.fn().mockImplementation(() => {
			return '0';
		});

		const route = 'people';
		const result = router.getNextStepRoute(route);

		expect(router.getIndexFromRoute).toHaveBeenCalledWith(route);
		expect(result).toBe('planet');
	});

	it('Should call the getNextStepRoute function on the last step', () => {
		router.getIndexFromRoute = jest.fn().mockImplementation(() => {
			return '1';
		});

		const route = 'planet';
		const result = router.getNextStepRoute(route);

		expect(router.getIndexFromRoute).toHaveBeenCalledWith(route);
		expect(result).toBe('end');
	});
});

describe('Router getIndexFromRoute', () => {
	it('Should call the getIndexFromRoute function', () => {
		expect(router.getIndexFromRoute('people')).toBe(0);
	});

	it('Should call the getIndexFromRoute function with unknow route', () => {
		expect(router.getIndexFromRoute('fake-step')).toBe(-1);
	});
});

describe('Router getRoute', () => {
	it('Should call the getRoute function', () => {
		expect(router.getRoute()).toBe('');
	});

	it('Should call the getRoute function on the people step', () => {
		window.location.hash = '#people';

		expect(router.getRoute()).toBe('people');
	});
});

describe('Router setRoute', () => {
	it('Should call the setRoute function', () => {
		router.setRoute('people');

		expect(window.location.hash).toBe('#people');
	});
});

describe('Router destroy', () => {
	it('Should call the destroy function', () => {
		window.removeEventListener = jest.fn();

		router.destroy();

		expect(window.removeEventListener).toHaveBeenCalledWith('hashchange', router.hashChanged);
	});
});
