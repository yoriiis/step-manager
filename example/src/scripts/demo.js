import StepPeople from './step-people';
import StepPlanet from './step-planet';
import StepSpecie from './step-specie';
import { Manager } from '../../../dist/step-manager.js';
import '../styles/demo.css';

/**
 * Get datas from SWAPI
 * Store datas in browser storage to improve performance
 */
const getDatas = async function() {
	let datas = window.localStorage.getItem('swapi');
	if (datas === null) {
		const apiUrls = [
			'https://swapi.dev/api/people/?page=1',
			'https://swapi.dev/api/planets/?page=1',
			'https://swapi.dev/api/species/?page=1'
		];
		const requests = [];
		apiUrls.forEach((url) => requests.push(fetch(url).then((response) => response.json())));
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
const init = async function() {
	// Get datas from SWAPI
	const datas = await getDatas();
	const stepsElement = document.querySelector('#steps');

	// Instanciate the Manager
	const manager = new Manager({
		element: stepsElement,
		datas: datas,
		steps: [StepPeople, StepPlanet, StepSpecie],
		onComplete: (datas) => {
			console.log(datas);
			document.querySelector('.container').innerHTML = `<pre>${JSON.stringify(
				datas,
				null,
				2
			)}</pre>`;
		},
		onChange: async function(action) {
			return new Promise((resolve) => {
				stepsElement.classList[action === 'destroy' ? 'remove' : 'add']('active');
				setTimeout(() => {
					resolve();
				}, parseFloat(window.getComputedStyle(stepsElement).transitionDuration) * 1000);
			});
		}
	});

	// Initialize and build the steps
	manager.init();
	document.querySelector('.loader').classList.remove('active');
	document.querySelector('#steps').classList.add('active');
};

init();
