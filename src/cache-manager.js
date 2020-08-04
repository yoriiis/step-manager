export default class CacheManager {
	/**
	 * @param {options}
	 */
	constructor(options) {
		const userOptions = options || {};
		const defaultOptions = {
			cacheMethod: 'sessionStorage',
			keyBrowserStorage: 'stepManager'
		};

		// Merge default options with user options
		this.options = Object.assign(defaultOptions, userOptions);
	}

	/**
	 * Get step datas from the cache
	 *
	 * @param {Array} filters Filter the request by route
	 *
	 * @returns {Object} Datas from the cache
	 */
	getDatasFromCache(filters) {
		let datasToReturn = null;

		// Retrieve the data in the cache with the correct key
		// Cache key is composed by profile id and a static name
		const datas =
			window[this.options.cacheMethod].getItem(this.options.keyBrowserStorage) || null;

		if (datas !== null) {
			// Datas are stringify, parse them
			const datasFormatted = JSON.parse(datas);

			// Check if datas must be filtered
			datasToReturn = Array.isArray(filters)
				? this.filterDatas(filters, datasFormatted)
				: datasFormatted;
		}
		return datasToReturn;
	}

	/**
	 * Filter datas from cache by keys
	 *
	 * @param {Array} filters Filters list
	 * @param {Object} datas Datas from browser storage
	 *
	 * @returns {Object} Datas filtered by keys
	 */
	filterDatas(filters, datas) {
		let datasToReturn = null;

		// Loop on all route filters and extract selected routes datas
		const validKeys = Object.keys(datas).filter((key) => filters.includes(key));

		if (validKeys.length) {
			datasToReturn = {};
			validKeys.map((key) => (datasToReturn[key] = datas[key]));
		}

		return datasToReturn;
	}

	/**
	 * Set step datas to the cache
	 *
	 * @param {String} id Current step id
	 * @param {Object} datas Datas of the step
	 */
	setDatasToCache({ id, datas }) {
		let datasFromCache = this.getDatasFromCache();

		// First time
		if (!datasFromCache) {
			datasFromCache = {};
		}
		if (!datasFromCache[id]) {
			datasFromCache[id] = {};
		}
		datasFromCache[id].datas = datas;

		window[this.options.cacheMethod].setItem(
			`${this.options.keyBrowserStorage}`,
			JSON.stringify(datasFromCache)
		);
	}

	/**
	 * Remove datas from the cache
	 * Used only when all steps are completed
	 */
	removeDatasFromCache() {
		window[this.options.cacheMethod].removeItem(`${this.options.keyBrowserStorage}`);
	}
}
