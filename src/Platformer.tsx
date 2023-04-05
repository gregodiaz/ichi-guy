import React from 'react'
import Sketch from 'react-p5';
import P5 from 'p5';

let x: number = 13
let y: number = 17

const Platformer: React.FC = () => {

	const setup = (p5: P5) => {
		const cnv = p5.createCanvas(19.2 * 17, 11 * 17).parent('platformerContainer')
		cnv.addClass('canvas')
	}

	const draw = (p5: P5) => {
		if (x > 255) x = 0
		if (y > 255) y = 0

		p5.background(p5.mouseX, p5.mouseY, p5.mouseX + p5.mouseY)
		p5.rect(p5.width * 6 / 8 - x, y * 1.5, x, y);

	}

	return <Sketch setup={setup} draw={draw} />;
}

export default Platformer
