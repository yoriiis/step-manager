/**
 * Mock implementation of analyzeSteps function
 *
 * @param {Class} manager Instance of manager
 * @param {Object} result Object with steps instance, steps order and default route
 */
export function mockAnalyzeSteps(manager, result) {
	manager.analyzeSteps = jest.fn().mockReturnValue(result);
}

/**
 * Mock implementation of Router
 *
 * @param {Class} manager Instance of manager
 * @param {Boolean} triggerNext Status of the return of the function
 */
export function mockRouter(manager, { triggerNext = true, routeId = '' } = {}) {
	manager.Router = {
		init: jest.fn(),
		currentRoute: 'people',
		triggerNext: jest.fn().mockReturnValue(triggerNext),
		triggerPrevious: jest.fn(),
		destroy: jest.fn(),
		setRoute: jest.fn(),
		destroyStep: jest.fn(),
		getRouteId: jest.fn().mockReturnValue(routeId)
	};
}

/**
 * Mock implementation of CacheManager
 *
 * @param {Class} manager Instance of manager
 * @param {Boolean} getDatasFromCache Status of the return of the function
 */
export function mockCacheManager(manager, { getDatasFromCache } = {}) {
	manager.CacheManager = {
		getDatasFromCache: jest.fn().mockReturnValue(getDatasFromCache),
		removeDatasFromCache: jest.fn(),
		setDatasToCache: jest.fn()
	};
}

/**
 * Mock implementation of Browser storage
 *
 * @return {Object} Object implementation of browser storage
 */
export function mockStorage() {
	let store = {};
	return {
		getItem(key) {
			return store[key] || null;
		},
		setItem(key, value) {
			store[key] = value.toString();
		},
		removeItem(key) {
			delete store[key];
		},
		clear() {
			store = {};
		}
	};
}
