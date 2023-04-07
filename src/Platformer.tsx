import React from 'react'
import Sketch from 'react-p5';
import P5 from 'p5';
import Collider from './game/Collider';

let x: number = 13
let y: number = 17

const Platformer: React.FC = () => {

	let player: Collider
	let box: Collider

	const setup = (p5: P5) => {
		const cnv = p5.createCanvas(19.2 * 17, 11 * 17).parent('platformerContainer')
		cnv.addClass('canvas')

		player = new Collider(p5, 0, 0, x, y)
		box = new Collider(p5, 50, 60, y * 2, x * 2)

		player.draw()
		box.draw()
	}

	const draw = (p5: P5) => {
		p5.background(p5.mouseX, p5.mouseY, p5.mouseX + p5.mouseY)

		p5.fill(player.collidesWith(box) ? 0 : 255, 255, 255)

		box.draw()
		player.update()
		player.draw()
	}

	const keyPressed = (p5: P5) => {
		if (p5.key === 'f') player.x += 22
		if (p5.key === 's') player.x -= 22
		if (p5.key === 'e') player.y += 22
		if (p5.key === 'd') player.y -= 22
	}

	return <Sketch setup={setup} draw={draw} keyPressed={keyPressed} />;
}

export default Platformer
