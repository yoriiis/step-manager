'use strict';

import StepPeople from '../../examples/src/scripts/step-people';
import StepPlanet from '../../examples/src/scripts/step-planet';
import CacheManager from '../cache-manager';
import Router from '../router';
import { Tunnel } from '../index.js';
import datas from './datas.json';

let tunnel;

const getOptions = () => {
	return {
		element: document.querySelector('#tunnel'),
		datas: datas,
		steps: [StepPeople, StepPlanet],
		onEnded: datas => true
	};
};

const getInstance = () => {
	return new Tunnel(getOptions());
};

beforeEach(() => {
	window.sessionStorage.removeItem('tunnel');
	document.body.innerHTML = '<div id="tunnel"></div>';
	tunnel = getInstance();
});

afterEach(() => {
	window.sessionStorage.removeItem('tunnel');
	document.body.innerHTML = '';
});

describe('Tunnel function', () => {
	it('Should initialize the constructor', () => {
		expect(tunnel.options).toEqual({
			element: expect.any(HTMLDivElement),
			datas: datas,
			steps: [StepPeople, StepPlanet],
			cacheMethod: 'sessionStorage',
			keyBrowserStorage: 'tunnel',
			onEnded: expect.any(Function)
		});
	});

	it('Should initialize the constructor without options', () => {
		const instance = new Tunnel();

		expect(instance.options).toEqual({
			element: null,
			datas: {},
			steps: [],
			cacheMethod: 'sessionStorage',
			keyBrowserStorage: 'tunnel',
			onEnded: expect.any(Function)
		});
	});

	it('Should call the init function', () => {
		tunnel.addEvents = jest.fn();
		tunnel.analyzeSteps = jest.fn();

		tunnel.init();

		expect(tunnel.CacheManager).toBeInstanceOf(CacheManager);
		expect(tunnel.Router).toBeInstanceOf(Router);
		expect(tunnel.addEvents).toHaveBeenCalled();
		expect(tunnel.analyzeSteps).toHaveBeenCalled();
	});

	it('Should analyze steps', () => {
		tunnel.init();
		tunnel.analyzeSteps();

		expect(tunnel.datas).toEqual({
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
		tunnel.options.element.addEventListener = jest.fn();

		tunnel.init();
		tunnel.addEvents();

		expect(tunnel.options.element.addEventListener).toHaveBeenCalledWith(
			'tunnelNext',
			tunnel.onTriggerTunnelNext,
			false
		);
		expect(tunnel.options.element.addEventListener).toHaveBeenCalledWith(
			'tunnelPrevious',
			tunnel.onTriggerTunnelPrevious,
			false
		);
	});

	it('Should trigger tunnel next', () => {
		tunnel.init();
		tunnel.Router.triggerNext = jest.fn();
		tunnel.triggerTunnelNext();

		expect(tunnel.Router.triggerNext).toHaveBeenCalled();
	});

	it('Should trigger tunnel next when tunnel is ended', () => {
		tunnel.init();
		tunnel.ended = true;
		tunnel.Router.triggerNext = jest.fn();
		tunnel.triggerTunnelNext();

		expect(tunnel.Router.triggerNext).not.toHaveBeenCalled();
	});

	it('Should call the onEnded function', () => {
		tunnel.init();
		tunnel.options.onEnded = jest.fn();
		tunnel.tunnelEnded();

		expect(tunnel.options.onEnded).toHaveBeenCalled();
	});

	it('Should trigger tunnel previous', () => {
		tunnel.init();
		tunnel.Router.triggerPrevious = jest.fn();
		tunnel.triggerTunnelPrevious();

		expect(tunnel.Router.triggerPrevious).toHaveBeenCalled();
	});

	it('Should call the requestDatas', () => {
		tunnel.init();
		tunnel.datas = {
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
		const results = tunnel.steps.people.requestDatas('step-people');

		expect(results).toEqual([
			{
				datas: true,
				index: 0,
				route: 'people'
			}
		]);
	});
});
