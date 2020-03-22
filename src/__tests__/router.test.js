'use strict';

import StepPeople from '../../examples/src/scripts/step-people';
import StepPlanet from '../../examples/src/scripts/step-planet';
import CacheManager from '../cache-manager';
import Router from '../router';

let router;

const getOptions = () => {
	return {
		defaultRoute: 'people',
		stepsOrder: ['people', 'planet'],
		steps: {
			people: new StepPeople(),
			planet: new StepPlanet()
		},
		element: document.querySelector('#tunnel'),
		getDatasFromCache: (...filters) => new CacheManager().getDatasFromCache(filters)
	};
};

const getInstance = () => {
	return new Router(getOptions());
};

beforeEach(() => {
	window.sessionStorage.removeItem('tunnel');
	document.body.innerHTML = '<div id="tunnel"></div>';
	router = getInstance();
});

afterEach(() => {
	window.sessionStorage.removeItem('tunnel');
	document.body.innerHTML = '';
	window.location.hash = '';
});

describe('Router function', () => {
	it('Should initialize the constructor', () => {
		expect(router.defaultRoute).toEqual('people');
		expect(router.stepsOrder).toEqual(['people', 'planet']);
		expect(router.element).toEqual(document.querySelector('#tunnel'));
		expect(router.steps).toEqual({
			people: new StepPeople(),
			planet: new StepPlanet()
		});
	});

	it('Should call the init function', () => {
		router.addEvents = jest.fn();
		router.getRoute = jest.fn();
		router.setRoute = jest.fn();

		router.init();

		expect(router.addEvents).toHaveBeenCalled();
		expect(router.getRoute).toHaveBeenCalled();
		expect(router.setRoute).toHaveBeenCalled();
	});

	it('Should test route functions', () => {
		router.init();
		const previousRoute = router.getPreviousStepRoute('planet');
		const nextRoute = router.getNextStepRoute('people');
		const currentRoute = router.getRoute();
		const previousHash = router.getPreviousRoute();
		const nextRoute2 = router.getNextStepRoute('planet');

		expect(previousRoute).toBe('people');
		expect(nextRoute).toBe('planet');
		expect(currentRoute).toBe('people');
		expect(previousHash).toBe(null);
		expect(nextRoute2).toBe('end');
	});

	it('Should trigger the next route', () => {
		router.getNextStepRoute = jest.fn();
		router.setRoute = jest.fn();

		router.init();
		const result = router.triggerNext();

		expect(router.getNextStepRoute).toHaveBeenCalled();
		expect(router.setRoute).toHaveBeenCalled();
		expect(result).toBe(true);
	});

	it('Should trigger the previous route', () => {
		router.getPreviousStepRoute = jest.fn();
		router.setRoute = jest.fn();

		router.init();
		router.triggerPrevious();

		expect(router.previousRoute).toBe('people');
		expect(router.getPreviousStepRoute).toHaveBeenCalled();
		expect(router.setRoute).toHaveBeenCalled();
	});
});
