import React from 'react'
import Sketch from 'react-p5';
import P5 from 'p5';
import Collider from './game/Collider';
import MainCharacter from './game/MainCharacter';

let w: number = 13 / 2
let h: number = 17 / 2

const Platformer: React.FC = () => {

	let player: MainCharacter
	let box: Collider
	let box2: Collider

	const setup = (p5: P5) => {
		const cnv = p5.createCanvas(19.2 * 17, 11 * 17).parent('platformerContainer')
		cnv.addClass('canvas')

		box = new Collider(p5, p5.createVector(50, 60), 50, 10)
		box2 = new Collider(p5, p5.createVector(p5.width - 100, 120), 100, 10)
		player = new MainCharacter(p5, p5.createVector(w, h), w, h, [box, box2])

		player.draw()
		box.draw()
		box2.draw()
	}

	const draw = (p5: P5) => {
		p5.background(p5.mouseX, p5.mouseY, p5.mouseX + p5.mouseY)

		p5.fill(player.collidesWith(box) ? 0 : 255, 255, 255)
		box.draw()

		p5.fill(player.collidesWith(box2) ? 0 : 255, 255, 255)
		box2.draw()

		p5.fill(220, 220, 220)
		player.update()
		player.draw()
	}

	const keyPressed = (p5: P5) => {
		if (p5.key === 'e') player.pos.y = 250
		if (p5.keyCode === 38) player.pos.y = 250
	}

	return <Sketch setup={setup} draw={draw} keyPressed={keyPressed} />;
}

export default Platformer
