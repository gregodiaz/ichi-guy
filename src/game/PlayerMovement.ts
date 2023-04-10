import P5 from 'p5'
import Collider from './Collider'

export default class PlayerMovement extends Collider {
	constructor(
		p5: P5,
		pos: P5.Vector,
		width: number,
		height: number,
		public others: Collider[] = [],
		public vel: P5.Vector = p5.createVector(0, 0),
		public magnitudeX: number = 4.3,
		public gravity: number = -6.9,
		public drag: number = .43,
	) {
		super(p5, pos, width, height)
	}

	applyPhysics(force?: P5.Vector): void {
		force && this.vel.add(force)

		this.pos.add(this.vel)

		if (this.vel.x < .01) this.vel.x = 0
		if (this.vel.y < .01) this.vel.y = 0

		for (const other of this.others) {
			if (this.collidesWith(other) || this.pos.y - this.height < 0) this.moveToAvoid(other)
			else this.vel.y += this.gravity
		}

		this.vel = this.vel.mult(this.drag)
	}

	applyHorizontalForceFromArrow(): void {
		const isWithinRightLimit = this.pos.x + this.width < this.p5.width
		const isWithinLeftLimit = this.pos.x - this.width > 0
		const forceX: P5.Vector = this.p5.createVector(1, 0).mult(this.magnitudeX)

		if (this.p5.keyIsDown(this.p5.RIGHT_ARROW) && isWithinRightLimit) this.applyPhysics(forceX.mult(1))
		if (this.p5.keyIsDown(this.p5.LEFT_ARROW) && isWithinLeftLimit) this.applyPhysics(forceX.mult(-1))
	}

	updateMovement(): void {
		this.applyHorizontalForceFromArrow()
		this.applyPhysics()
		this.collidesWithCanvas()
	}
}
