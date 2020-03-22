import StepPeople from './step-people';
import StepPlanet from './step-planet';
import StepSpecie from './step-specie';
import { Tunnel } from '../../dist/tunnel-steps.js';
import './demo.css';

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

		try {
			window.localStorage.setItem('swapi', JSON.stringify(datas));
		} catch (error) {
			console.warn(error);
		}
	} else {
		datas = JSON.parse(datas);
	}

	const tunnel = new Tunnel({
		element: document.querySelector('#tunnel'),
		datas: datas,
		steps: [StepPeople, StepPlanet, StepSpecie],
		onEnded: datas => {
			document.querySelector('#tunnel').innerHTML = 'Result available in the console!';
			console.log(datas);
		}
	});
	tunnel.init();
	document.querySelector('.loader').classList.remove('active');
};
init();
