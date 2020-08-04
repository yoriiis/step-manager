import CacheManager from '../cache-manager';
import { mockStorage } from '../__mocks__/mocks';

let cacheManager;

const getOptions = () => {
	return {
		cacheMethod: 'localStorage',
		keyBrowserStorage: 'cache'
	};
};
const cacheMethod = getOptions().cacheMethod;
const keyBrowserStorage = getOptions().keyBrowserStorage;
const datas = { 'id-people': true, 'id-planet': false, 'id-species': true };

const getInstance = () => {
	return new CacheManager(getOptions());
};

beforeEach(() => {
	Object.defineProperty(window, cacheMethod, {
		value: mockStorage()
	});

	cacheManager = getInstance();
});

afterEach(() => {
	window[cacheMethod].removeItem(keyBrowserStorage);
});

describe('CacheManager constructor', () => {
	it('Should initialize the constructor', () => {
		expect(cacheManager.options).toEqual({
			cacheMethod: 'localStorage',
			keyBrowserStorage: 'cache'
		});
	});

	it('Should initialize the constructor without options', () => {
		const instance = new CacheManager();

		expect(instance.options).toEqual({
			cacheMethod: 'sessionStorage',
			keyBrowserStorage: 'stepManager'
		});
	});
});

describe('CacheManager getDatasFromCache', () => {
	it('Should call the getDatasFromCache function with datas in cache', () => {
		window[cacheMethod].setItem(keyBrowserStorage, JSON.stringify(datas));

		jest.spyOn(window[cacheMethod], 'getItem');

		const result = cacheManager.getDatasFromCache();

		expect(window[cacheMethod].getItem).toHaveBeenCalledWith(
			cacheManager.options.keyBrowserStorage
		);
		expect(result).toEqual(datas);
	});

	it('Should call the getDatasFromCache function without datas in cache', () => {
		jest.spyOn(window[cacheMethod], 'getItem');

		const result = cacheManager.getDatasFromCache();

		expect(result).toEqual(null);
	});

	it('Should call the getDatasFromCache function with filters and datas in cache', () => {
		const filters = ['id-people'];
		window[cacheMethod].setItem(keyBrowserStorage, JSON.stringify(datas));

		jest.spyOn(window[cacheMethod], 'getItem');

		// Render the first item corresponding to filters array
		// to not rewrite the function filterDatas inside the test
		cacheManager.filterDatas = jest.fn().mockImplementation(() => datas[filters[0]]);

		const result = cacheManager.getDatasFromCache(filters);

		expect(cacheManager.filterDatas).toHaveBeenCalledWith(filters, datas);
		expect(result).toEqual(true);
	});
});

describe('CacheManager filterDatas', () => {
	it('Should call the filterDatas function', () => {
		expect(cacheManager.filterDatas(['id-people'], datas)).toEqual({ 'id-people': true });
		expect(cacheManager.filterDatas(['id-people', 'id-species'], datas)).toEqual({
			'id-people': true,
			'id-species': true
		});
		expect(cacheManager.filterDatas(['fake'], datas)).toEqual(null);
		expect(cacheManager.filterDatas([], datas)).toEqual(null);
	});
});

describe('CacheManager setDatasToCache', () => {
	it('Should call the setDatasToCache function', () => {
		const id = 'id-people';

		cacheManager.getDatasFromCache = jest.fn();
		jest.spyOn(window[cacheMethod], 'setItem');

		cacheManager.setDatasToCache({ id, datas: datas['id-people'] });

		expect(cacheManager.getDatasFromCache).toHaveBeenCalled();
		expect(window[cacheMethod].setItem).toHaveBeenCalledWith(
			cacheManager.options.keyBrowserStorage,
			JSON.stringify({
				[id]: {
					datas: true
				}
			})
		);
	});

	it('Should call the setDatasToCache function with already datas in cache', () => {
		const route = 'planet';
		const firstDatas = {
			'id-people': {
				datas: datas['id-people']
			}
		};
		const result = firstDatas;
		result[route] = {
			datas: datas[route]
		};
		window[cacheMethod].setItem(keyBrowserStorage, JSON.stringify(firstDatas));

		cacheManager.getDatasFromCache = jest.fn().mockImplementation(() => firstDatas);
		jest.spyOn(window[cacheMethod], 'setItem');

		cacheManager.setDatasToCache({ route, datas: datas[route] });

		expect(cacheManager.getDatasFromCache).toHaveBeenCalled();
		expect(window[cacheMethod].setItem).toHaveBeenCalledWith(
			cacheManager.options.keyBrowserStorage,
			JSON.stringify(result)
		);
	});
});

describe('CacheManager removeDatasFromCache', () => {
	it('Should call the removeDatasFromCache function', () => {
		jest.spyOn(window[cacheMethod], 'removeItem');

		cacheManager.removeDatasFromCache();

		expect(window[cacheMethod].removeItem).toHaveBeenCalledWith(keyBrowserStorage);
	});
});
