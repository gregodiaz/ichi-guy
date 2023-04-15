import P5 from 'p5'
import Collider from './Collider'
import { gravity } from './constants'

export default class PlayerPhysics extends Collider {
	public vel: P5.Vector = this.p5.createVector(0, 0)
	private acc: P5.Vector = this.p5.createVector(0, 0)

	public magnitudeX: number = 1.96
	public gravity: number = gravity
	public drag: number = .77

	constructor(
		p5: P5,
		pos: P5.Vector,
		width: number,
		height: number,
		public others: Collider[] = [],
	) {
		super(p5, pos, width, height)
	}

	applyForce(force: P5.Vector): void {
		this.acc.add(force)
	}

	applyPhysics(): void {
		this.vel.add(this.acc)
		this.pos.add(this.vel)
		this.acc.mult(0)

		for (const other of this.others) {
			if (
				this.collidesWith(other) ||
				this.pos.y + this.height > this.p5.height ||
				this.pos.y - this.height < 0
			) {
				this.vel.y = 0
				this.moveToAvoid(other)
			}
		}
	}

	applyForceFromArrow(): void {
		const isWithinRightLimit = this.pos.x + this.width < this.p5.width
		const isWithinLeftLimit = this.pos.x - this.width > 0
		const forceX: P5.Vector = this.p5.createVector(1, 0).mult(this.magnitudeX)

		if (this.p5.keyIsDown(this.p5.RIGHT_ARROW) && isWithinRightLimit) this.applyForce(forceX.mult(1))
		if (this.p5.keyIsDown(this.p5.LEFT_ARROW) && isWithinLeftLimit) this.applyForce(forceX.mult(-1))

		this.vel = this.vel.mult(this.drag)
	}

	updatePhysics(): void {
		this.applyForce(this.p5.createVector(0, this.gravity))
		this.applyForceFromArrow()
		this.applyPhysics()

		this.collidesWithCanvas()
	}
}
