import StepPeople from './step-people';
import StepPlanet from './step-planet';
import StepSpecie from './step-specie';
import { Manager } from '../../../dist/step-manager.js';
import '../styles/demo.css';

/**
 * Get datas from SWAPI
 * Store datas in browser storage to improve performance
 */
const getDatas = async function () {
	let datas = window.localStorage.getItem('swapi');
	if (datas === null) {
		const apiUrls = [
			'https://swapi.co/api/people/?page=1',
			'https://swapi.co/api/planets/?page=1',
			'https://swapi.co/api/species/?page=1'
		];
		const requests = [];
		apiUrls.forEach(url => requests.push(fetch(url).then(response => response.json())));
		datas = await Promise.all(requests).then(([people, planets, species]) => ({
			people,
			planets,
			species
		}));
		window.localStorage.setItem('swapi', JSON.stringify(datas));
	} else {
		datas = JSON.parse(datas);
	}

	return datas;
};

/**
 * Initialize the manager with 3 steps (People, Planet and Specie)
 * On complete action, JSON datas are display in the page and the console
 */
const init = async function () {
	// Get datas from SWAPI
	const datas = await getDatas();

	// Instanciate the Manager
	const manager = new Manager({
		element: document.querySelector('#steps'),
		datas: datas,
		steps: [StepPeople, StepPlanet, StepSpecie],
		onComplete: datas => {
			console.log(datas);
			document.querySelector('.container').innerHTML = `<pre>${JSON.stringify(
				datas,
				null,
				2
			)}</pre>`;
		}
	});

	// Initialize and build the steps
	manager.init();
	document.querySelector('.loader').classList.remove('active');
};

init();
