import StepOne from './step-one';
import StepTwo from './step-two';
import { Tunnel } from '../../dist/tunnel-steps.js';
import './demo.css';

const button = document.querySelector('[start-tunnel]');
const tunnel = new Tunnel({
	element: document.querySelector('#tunnel'),
	datas: {},
	steps: [StepOne, StepTwo],
	onEnded: datas => {
		console.log(datas);
		button.style.display = 'block';
	}
});
button.addEventListener('click', e => {
	button.style.display = 'none';
	tunnel.create();
});
