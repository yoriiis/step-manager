'use strict';

import Steps from '../steps';
import CacheManager from '../cache-manager';
import Router from '../router';

let router;
let event;

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
	fallbackRoute = 'people';
	canTheStepBeDisplayed() {
		return {
			canBeDisplayed: true,
			fallbackRoute: 'people'
		};
	}

	getTemplate() {
		return '<div class="step-planet"></div>';
	}

	getDatasFromStep() {
		return {};
	}
}

const getOptions = () => {
	return {
		defaultRoute: 'people',
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
		steps: {
			'id-people': new StepPeople(),
			'id-planet': new StepPlanet()
		},
		ignoredHash: ['menu'],
		getDatasFromCache: (...filters) => new CacheManager().getDatasFromCache(filters),
		onChange: () => {}
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
			steps: {
				'id-people': expect.any(Object),
				'id-planet': expect.any(Object)
			},
			ignoredHash: ['menu'],
			getDatasFromCache: expect.any(Function),
			onChange: expect.any(Function)
		});
		expect(router.options.steps['id-people']).toBeInstanceOf(StepPeople);
		expect(router.options.steps['id-planet']).toBeInstanceOf(StepPlanet);
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
			ignoredHash: [],
			getDatasFromCache: expect.any(Function),
			onChange: expect.any(Function)
		});
	});
});

describe('Router init', () => {
	it('Should call the init function', () => {
		router.addEvents = jest.fn();
		router.getRoute = jest.fn().mockReturnValue('');
		router.setRoute = jest.fn();

		router.init();

		expect(router.addEvents).toHaveBeenCalled();
		expect(router.getRoute).toHaveBeenCalled();
		expect(router.setRoute).toHaveBeenCalledWith('people');
	});

	it('Should call the init function with specific route', () => {
		router.addEvents = jest.fn();
		router.getRoute = jest.fn().mockReturnValue('planet');
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

		router.getRoute = jest.fn().mockReturnValue(route);
		router.checkIfTheStepCanBeDisplay = jest.fn().mockReturnValue({
			canBeDisplayed: true,
			fallbackRoute: 'people'
		});
		router.stepCanBeDisplayed = jest.fn();
		router.stepCantBeDisplayed = jest.fn();

		router.hashChanged(event);

		expect(router.getRoute).toHaveBeenCalled();
		expect(router.checkIfTheStepCanBeDisplay).toHaveBeenCalledWith({
			route,
			event
		});
		expect(router.stepCanBeDisplayed).toHaveBeenCalledWith(event, 'people');
		expect(router.stepCantBeDisplayed).not.toHaveBeenCalledWith(event, 'people');
	});

	it('Should call the hashChanged function with ignored hash when the user leave', () => {
		const route = 'planet';

		router.getRoute = jest.fn().mockReturnValue(route);
		router.isIgnoredHashUsedToLeave = jest.fn().mockReturnValue(true);
		router.isIgnoredHashUsedToComeBack = jest.fn();
		router.checkIfTheStepCanBeDisplay = jest.fn();
		router.stepCanBeDisplayed = jest.fn();
		router.stepCantBeDisplayed = jest.fn();

		router.hashChanged(event);

		expect(router.getRoute).toHaveBeenCalled();
		expect(router.isIgnoredHashUsedToLeave).toHaveBeenCalled();
		expect(router.checkIfTheStepCanBeDisplay).not.toHaveBeenCalledWith();
		expect(router.stepCanBeDisplayed).not.toHaveBeenCalledWith();
		expect(router.stepCantBeDisplayed).not.toHaveBeenCalledWith();
	});

	it('Should call the hashChanged function with ignored hash when the user has returned', () => {
		const route = 'planet';

		router.getRoute = jest.fn().mockReturnValue(route);
		router.isIgnoredHashUsedToLeave = jest.fn();
		router.isIgnoredHashUsedToComeBack = jest.fn().mockReturnValue(true);
		router.checkIfTheStepCanBeDisplay = jest.fn();
		router.stepCanBeDisplayed = jest.fn();
		router.stepCantBeDisplayed = jest.fn();

		router.hashChanged(event);

		expect(router.getRoute).toHaveBeenCalled();
		expect(router.isIgnoredHashUsedToLeave).toHaveBeenCalled();
		expect(router.isIgnoredHashUsedToComeBack).toHaveBeenCalled();
		expect(router.checkIfTheStepCanBeDisplay).not.toHaveBeenCalledWith();
		expect(router.stepCanBeDisplayed).not.toHaveBeenCalledWith();
		expect(router.stepCantBeDisplayed).not.toHaveBeenCalledWith();
	});

	it('Should call the hashChanged function with invalid step', () => {
		const route = 'planet';

		router.getRoute = jest.fn().mockReturnValue(route);
		router.checkIfTheStepCanBeDisplay = jest.fn().mockReturnValue({
			canBeDisplayed: false,
			fallbackRoute: 'people'
		});
		router.stepCanBeDisplayed = jest.fn();
		router.stepCantBeDisplayed = jest.fn();

		router.hashChanged(event);

		expect(router.getRoute).toHaveBeenCalled();
		expect(router.checkIfTheStepCanBeDisplay).toHaveBeenCalledWith({
			route,
			event
		});
		expect(router.stepCantBeDisplayed).toHaveBeenCalledWith(event, 'people');
		expect(router.stepCanBeDisplayed).not.toHaveBeenCalledWith(event, 'people');
	});
});

describe('Router stepCanBeDisplayed', () => {
	it('Should call the stepCanBeDisplayed function with event', async () => {
		router.getPreviousRoute = jest.fn().mockReturnValue('people');
		router.destroyStep = jest.fn();
		router.createStep = jest.fn();

		router.currentRoute = 'planet';
		await router.stepCanBeDisplayed(event);

		expect(router.getPreviousRoute).toHaveBeenCalledWith(event);
		expect(router.previousRoute).toBe('people');
		expect(router.destroyStep).toHaveBeenCalledWith('people');
		expect(router.createStep).toHaveBeenCalledWith('planet');
		expect(router.stepCreated).toBe(true);
		expect(router.stepRedirected.redirect).toBe(undefined);
	});

	it('Should call the stepCanBeDisplayed function with previous route before leaving', async () => {
		router.getPreviousRoute = jest.fn();
		router.destroyStep = jest.fn();
		router.createStep = jest.fn();

		router.previousRouteBeforeLeaving = 'people';
		router.currentRoute = 'planet';
		await router.stepCanBeDisplayed(event);

		expect(router.getPreviousRoute).not.toHaveBeenCalledWith();
		expect(router.previousRoute).toBe('people');
		expect(router.destroyStep).toHaveBeenCalledWith('people');
		expect(router.createStep).toHaveBeenCalledWith('planet');
		expect(router.stepCreated).toBe(true);
		expect(router.stepRedirected.redirect).toBe(undefined);
		expect(router.previousRouteBeforeLeaving).toBe(null);
	});

	it('Should call the stepCanBeDisplayed function without event', async () => {
		router.getPreviousRoute = jest.fn().mockReturnValue('people');
		router.destroyStep = jest.fn();
		router.createStep = jest.fn();
		router.currentRoute = 'planet';

		await router.stepCanBeDisplayed();

		expect(router.getPreviousRoute).not.toHaveBeenCalled();
		expect(router.destroyStep).not.toHaveBeenCalled();
		expect(router.createStep).toHaveBeenCalledWith('planet');
	});

	it('Should call the stepCanBeDisplayed function with stepRedirected', async () => {
		router.getPreviousRoute = jest.fn();
		router.destroyStep = jest.fn();
		router.createStep = jest.fn();
		router.currentRoute = 'planet';

		router.currentRoute = 'people';
		router.stepRedirected = {
			redirect: true,
			previousRoute: 'planet'
		};
		await router.stepCanBeDisplayed(event);

		expect(router.stepRedirected.redirect).toBe(false);
	});

	it('Should call the stepCanBeDisplayed function without previousRoute', async () => {
		router.getPreviousRoute = jest.fn().mockReturnValue(null);
		router.destroyStep = jest.fn();
		router.createStep = jest.fn();
		router.currentRoute = 'planet';

		router.currentRoute = 'people';
		await router.stepCanBeDisplayed(event);

		expect(router.getPreviousRoute).toHaveBeenCalledWith(event);
		expect(router.previousRoute).toBe(null);
		expect(router.destroyStep).not.toHaveBeenCalled();
		expect(router.createStep).toHaveBeenCalledWith('people');
	});
});

describe('Router stepCantBeDisplayed', () => {
	it('Should call the stepCantBeDisplayed function', () => {
		const route = 'planet';

		router.getPreviousRoute = jest.fn().mockReturnValue(route);
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
		const routeId = 'id-people';

		router.options.steps[routeId].canTheStepBeDisplayed = jest
			.fn()
			.mockImplementation(() => true);

		const result = router.checkIfTheStepCanBeDisplay({
			route
		});

		expect(router.options.steps[routeId].canTheStepBeDisplayed).toHaveBeenCalled();
		expect(result).toBe(true);
	});

	it('Should call the checkIfTheStepCanBeDisplay function with invalid step and a fallback route', () => {
		router.getPreviousRoute = jest.fn().mockReturnValue('planet');

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
		router.getPreviousRoute = jest.fn().mockReturnValue('people');

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
		router.getPreviousRoute = jest.fn().mockReturnValue(null);

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
	it('Should call the createStep function', async () => {
		const route = 'people';
		const routeId = 'id-people';

		router.options.onChange = jest.fn();
		router.getRouteId = jest.fn().mockReturnValue(routeId);
		router.options.getDatasFromCache = jest.fn().mockReturnValue({
			[routeId]: {
				datas: {}
			}
		});
		router.options.steps[routeId].render = jest.fn();

		await router.createStep(route);

		expect(router.getRouteId).toHaveBeenCalledWith(route);
		expect(router.options.getDatasFromCache).toHaveBeenCalledWith([routeId]);
		expect(router.options.steps[routeId].render).toHaveBeenCalledWith({});
		expect(router.applicationReady).toBe(true);
		expect(router.options.onChange).toHaveBeenCalledWith('create');
	});

	it('Should call the createStep function without datas from cache', async () => {
		const route = 'people';
		const routeId = 'id-people';

		router.options.getDatasFromCache = jest.fn().mockReturnValue(null);
		router.options.steps[routeId].render = jest.fn();

		await router.createStep(route);

		expect(router.options.steps[routeId].render).toHaveBeenCalledWith();
	});

	it('Should call the createStep function with application already ready', async () => {
		const route = 'people';
		const routeId = 'id-people';

		router.options.getDatasFromCache = jest.fn().mockReturnValue(null);
		router.options.steps[routeId].render = jest.fn();

		router.applicationReady = true;
		await router.createStep(route);

		expect(router.applicationReady).toBe(true);
	});

	it('Should call the createStep function without the onChange function', async () => {
		const route = 'people';
		const routeId = 'id-people';

		router.options.getDatasFromCache = jest.fn().mockReturnValue(null);
		router.options.steps[routeId].render = jest.fn();

		router.options.onChange = null;
		await router.createStep(route);
		router.options.onChange = jest.fn();

		expect(router.options.onChange).not.toHaveBeenCalled();
	});
});

describe('Router destroyStep', () => {
	it('Should call the destroyStep function', async () => {
		const route = 'people';
		const routeId = 'id-people';

		router.getRouteId = jest.fn().mockReturnValue(routeId);
		router.options.steps[routeId].destroy = jest.fn();

		await router.destroyStep(route);

		expect(router.getRouteId).toHaveBeenCalledWith(route);
		expect(router.options.steps[routeId].destroy).toHaveBeenCalled();
	});

	it('Should call the destroyStep function without the onChange function', async () => {
		const route = 'people';
		const routeId = 'id-people';

		router.getRouteId = jest.fn().mockReturnValue(routeId);
		router.options.steps[routeId].destroy = jest.fn();

		router.options.onChange = null;
		await router.destroyStep(route);
		router.options.onChange = jest.fn();

		expect(router.options.onChange).not.toHaveBeenCalled();
	});
});

describe('Router triggerNext', () => {
	it('Should call the triggerNext function', () => {
		const currentRoute = 'people';

		router.getNextStepRoute = jest.fn().mockReturnValue('planet');
		router.setRoute = jest.fn();

		router.currentRoute = currentRoute;
		router.triggerNext();

		expect(router.getNextStepRoute).toHaveBeenCalledWith(currentRoute);
		expect(router.setRoute).toHaveBeenCalledWith('planet');
	});

	it('Should call the triggerNext function on the last step', () => {
		router.getNextStepRoute = jest.fn().mockReturnValue('end');

		const result = router.triggerNext();

		expect(result).toBe(false);
	});
});

describe('Router triggerPrevious', () => {
	it('Should call the triggerPrevious function', () => {
		router.getPreviousStepRoute = jest.fn().mockReturnValue('people');
		router.setRoute = jest.fn();

		router.currentRoute = 'planet';
		router.triggerPrevious();

		expect(router.previousRoute).toBe('planet');
		expect(router.getPreviousStepRoute).toHaveBeenCalledWith('planet');
		expect(router.setRoute).toHaveBeenCalledWith('people');
	});
});

describe('Router isReverseNavigation', () => {
	it('Should call the isReverseNavigation function with a normal navigation', () => {
		router.previousRoute = 'people';
		router.currentRoute = 'planet';
		const result = router.isReverseNavigation();

		expect(result).toBe(false);
	});

	it('Should call the isReverseNavigation function with a reverse navigation', () => {
		router.previousRoute = 'planet';
		router.currentRoute = 'people';
		const result = router.isReverseNavigation();

		expect(result).toBe(true);
	});
});

describe('Router isIgnoredHashUsedToLeave', () => {
	it('Should call the isReverseNavigation function with an ignored hash', () => {
		const result = router.isIgnoredHashUsedToLeave('menu');

		expect(result).toBe(true);
	});

	it('Should call the isIgnoredHashUsedToLeave function without an ignored hash', () => {
		const result = router.isIgnoredHashUsedToLeave('planet');

		expect(result).toBe(false);
	});
});

describe('Router isIgnoredHashUsedToComeBack', () => {
	it('Should call the isIgnoredHashUsedToComeBack function with an ignored hash', () => {
		router.previousRouteBeforeLeaving = 'planet';
		const result = router.isIgnoredHashUsedToComeBack('planet');

		expect(result).toBe(true);
	});

	it('Should call the isReverseNavigation function without an ignored hash', () => {
		const result = router.isIgnoredHashUsedToComeBack('planet');

		expect(result).toBe(false);
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
		router.getIndexFromRoute = jest.fn().mockReturnValue('1');

		const route = 'planet';
		const result = router.getPreviousStepRoute(route);

		expect(router.getIndexFromRoute).toHaveBeenCalledWith(route);
		expect(result).toBe('people');
	});

	it('Should call the getPreviousStepRoute function on the first step', () => {
		router.getIndexFromRoute = jest.fn().mockReturnValue('0');

		const route = 'people';
		const result = router.getPreviousStepRoute(route);

		expect(result).toBe('people');
	});
});

describe('Router getNextStepRoute', () => {
	it('Should call the getNextStepRoute function', () => {
		router.getIndexFromRoute = jest.fn().mockReturnValue('0');

		const route = 'people';
		const result = router.getNextStepRoute(route);

		expect(router.getIndexFromRoute).toHaveBeenCalledWith(route);
		expect(result).toBe('planet');
	});

	it('Should call the getNextStepRoute function on the last step', () => {
		router.getIndexFromRoute = jest.fn().mockReturnValue('1');

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
