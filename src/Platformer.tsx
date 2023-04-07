import React from 'react'
import Sketch from 'react-p5';
import P5 from 'p5';
import GameObject from './game/GameObject';

let x: number = 13
let y: number = 17

const Platformer: React.FC = () => {

	let gameObject: GameObject

	const setup = (p5: P5) => {
		const cnv = p5.createCanvas(19.2 * 17, 11 * 17).parent('platformerContainer')
		cnv.addClass('canvas')
		gameObject = new GameObject(p5, 0, 0, x, y)
	}

	const draw = (p5: P5) => {
		p5.background(p5.mouseX, p5.mouseY, p5.mouseX + p5.mouseY)

		// vertical movement
		if (p5.mouseY / 2 > p5.height) gameObject.y = 0
		else if (p5.pmouseY < gameObject.height) gameObject.y = p5.height - gameObject.height
		else gameObject.y = p5.height - p5.mouseY / 2 - gameObject.height / 2

		// horizontal movement
		if (p5.pmouseX < 0) gameObject.x = 0
		else if (p5.mouseX / 2 > p5.width - gameObject.width) gameObject.x = p5.width - gameObject.width
		else gameObject.x = p5.mouseX / 2 - gameObject.width / 2

		gameObject.draw()
	}

	return <Sketch setup={setup} draw={draw} />;
}

export default Platformer
