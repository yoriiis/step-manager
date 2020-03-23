export default class CacheManager {
	/**
	 * @param {options}
	 */
	constructor (options) {
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
	getDatasFromCache (filters) {
		let datasToReturn = null;

		// Retrieve the data in the cache with the correct key
		// Cache key is composed by profile id and a static name
		const datas =
			window[this.options.cacheMethod].getItem(`${this.options.keyBrowserStorage}`) || null;

		if (datas !== null) {
			// Datas are stringify, parse them
			const datasFormatted = JSON.parse(datas);

			// Check if datas must be filtered
			if (Array.isArray(filters)) {
				// Loop on all route filters and extract selected routes datas
				filters.forEach(filter => {
					if (datasFormatted[filter]) {
						if (datasToReturn === null) {
							datasToReturn = {};
						}
						datasToReturn[filter] = datasFormatted[filter];
					}
				});
			} else {
				datasToReturn = datasFormatted;
			}
		}
		return datasToReturn;
	}

	/**
	 * Set step datas to the cache
	 *
	 * @param {String} route Current route
	 * @param {Object} datas Datas of the step
	 */
	setDatasToCache ({ route, datas }) {
		let datasFromCache = this.getDatasFromCache();

		// First time
		if (!datasFromCache) {
			datasFromCache = {};
		}
		if (!datasFromCache[route]) {
			datasFromCache[route] = {};
		}
		datasFromCache[route].datas = datas;

		window[this.options.cacheMethod].setItem(
			`${this.options.keyBrowserStorage}`,
			JSON.stringify(datasFromCache)
		);
	}

	/**
	 * Remove datas from the cache
	 * Used only when all steps are completed
	 */
	removeDatasFromCache () {
		window[this.options.cacheMethod].removeItem(`${this.options.keyBrowserStorage}`);
	}
}
