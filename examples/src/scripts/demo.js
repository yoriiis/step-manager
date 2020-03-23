import StepPeople from './step-people';
import StepPlanet from './step-planet';
import StepSpecie from './step-specie';
import { Manager } from '../../../dist/step-manager.js';
import '../styles/demo.css';

const init = async function () {
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

	const manager = new Manager({
		element: document.querySelector('#steps'),
		datas: datas,
		steps: [StepPeople, StepPlanet, StepSpecie],
		onComplete: datas => {
			document.querySelector('#steps').innerHTML = 'Result available in the console!';
			console.log(datas);
		}
	});
	manager.init();
	document.querySelector('.loader').classList.remove('active');
};
init();
