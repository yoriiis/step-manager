/**
 * Mock implementation of analyzeSteps function
 *
 * @param {Class} manager Instance of manager
 * @param {Object} result Object with steps instance, steps order and default route
 */
export function mockAnalyzeSteps (manager, result) {
	manager.analyzeSteps = jest.fn().mockImplementation(() => {
		return result;
	});
}

/**
 * Mock implementation of Router
 *
 * @param {Class} manager Instance of manager
 * @param {Boolean} triggerNext Status of the return of the function
 */
export function mockRouter (manager, { triggerNext = true } = {}) {
	manager.Router = {
		init: jest.fn(),
		currentRoute: 'people',
		triggerNext: jest.fn().mockImplementation(() => triggerNext),
		triggerPrevious: jest.fn(),
		destroy: jest.fn(),
		setRoute: jest.fn(),
		destroyStep: jest.fn()
	};
}

/**
 * Mock implementation of CacheManager
 *
 * @param {Class} manager Instance of manager
 * @param {Boolean} getDatasFromCache Status of the return of the function
 */
export function mockCacheManager (manager, { getDatasFromCache = true } = {}) {
	manager.CacheManager = {
		getDatasFromCache: jest.fn().mockImplementation(() => getDatasFromCache),
		removeDatasFromCache: jest.fn(),
		setDatasToCache: jest.fn()
	};
}
