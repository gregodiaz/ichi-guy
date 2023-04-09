import P5 from 'p5'
import Collider from './Collider'

export default class MainCharacter extends Collider {
	constructor(
		p5: P5,
		pos: P5.Vector,
		width: number,
		height: number,
		public others: Collider[] = [],
		public vel: P5.Vector = p5.createVector(0, 0),
		public drag: number = .43,
		public gravity: number = -6.9,
	) {
		super(p5, pos, width, height)
	}

	move(vel?: P5.Vector): void {
		vel && this.vel.add(vel)

		this.pos.add(this.vel)

		if (this.vel.x < .01) this.vel.x = 0
		if (this.vel.y < .01) this.vel.y = 0

		for (const other of this.others) {
			const collides = this.collidesWith(other)
			if (collides || this.pos.y - this.height < 0) {
				this.correctMovement(other)
			} else {
				this.vel.y += this.gravity
			}
		}
		this.vel = this.vel.mult(this.drag)
	}

	update(): void {
		let moveRight: P5.Vector = this.p5.createVector(4.3, 0)
		let moveLeft: P5.Vector = this.p5.createVector(-4.3, 0)

		if ((this.p5.keyIsDown(3) || this.p5.keyIsDown(70)) && this.pos.x + this.width < this.p5.width) this.move(moveRight)
		if ((this.p5.keyIsDown(37) || this.p5.keyIsDown(83)) && this.pos.x + this.width > 0) this.move(moveLeft)

		this.move()
		this.collidesWithCanvas()
	}
}
