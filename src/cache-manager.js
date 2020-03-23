export default class CacheManager {
	constructor ({ cacheMethod, keyBrowserStorage, datas, steps } = {}) {
		this.cacheMethod = cacheMethod;
		this.keyBrowserStorage = keyBrowserStorage;
		this.datas = datas;
		this.steps = steps;
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
		const datas = window[this.cacheMethod].getItem(`${this.keyBrowserStorage}`) || null;

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
	 * @returns {Boolean} Success of all data stored in the cache
	 */
	setDatasToCache (datas) {
		// Try to remove datas in the cache
		try {
			window[this.cacheMethod].setItem(`${this.keyBrowserStorage}`, JSON.stringify(datas));
		} catch (error) {
			console.warn(error);
		}
	}

	/**
	 * Remove  datas from the cache
	 * Used only when all steps are ended
	 *
	 * @returns {Object} Datas from the cache
	 */
	removeDatasFromCache () {
		// Try to remove datas in the cache
		try {
			window[this.cacheMethod].removeItem(`${this.keyBrowserStorage}`);
		} catch (error) {
			console.warn(error);
		}
	}
}
