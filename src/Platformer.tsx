import React from 'react'
import Sketch from 'react-p5'
import P5 from 'p5'
import Collider from './game/Collider'
import PlayerController from './game/PlayerController'

let w: number = 13 / 2
let h: number = 17 / 2

const Platformer: React.FC = () => {

	let player: PlayerController
	let box: Collider
	let box2: Collider

	const setup = (p5: P5) => {
		const cnv = p5.createCanvas(19.2 * 17, 11 * 17).parent('platformerContainer')
		cnv.addClass('canvas')

		box = new Collider(p5, p5.createVector(50, 60), 50, 10)
		box2 = new Collider(p5, p5.createVector(p5.width - 100, 120), 100, 10)
		player = new PlayerController(p5, p5.createVector(w, h), w, h, [box, box2])

		player.physics.draw()
		box.draw()
		box2.draw()
	}

	const draw = (p5: P5) => {
		p5.background(p5.mouseX, p5.mouseY, p5.mouseX + p5.mouseY)

		p5.fill(player.physics.collidesWith(box) ? 0 : 255, 255, 255)
		box.draw()

		p5.fill(player.physics.collidesWith(box2) ? 0 : 255, 255, 255)
		box2.draw()

		p5.fill(220, 220, 220)

		player.updateController()
		player.physics.draw()
	}

	const keyPressed = () => {
		player.onKeyPressed()
	}

	return <Sketch setup={setup} draw={draw} keyPressed={keyPressed} />
}

export default Platformer
