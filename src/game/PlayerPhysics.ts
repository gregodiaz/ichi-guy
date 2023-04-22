import P5 from 'p5'
import Collider from './Collider'
import { gravity } from './constants'

export default class PlayerPhysics extends Collider {
	public vel: P5.Vector = this.p5.createVector(0, 0)
	private acc: P5.Vector = this.p5.createVector(0, 0)
	private maxSpeed: number = 13.6

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
		// limit max velocity
		this.vel.x = this.p5.constrain(this.vel.x, -this.maxSpeed, this.maxSpeed);
		this.vel.y = this.p5.constrain(this.vel.y, -this.maxSpeed, this.maxSpeed);
		this.pos.add(this.vel)
		this.acc.mult(0)

		// collisions with others
		for (const other of this.others) {
			if (this.collidesWith(other)) {
				this.vel.y = 0
				this.moveToAvoid(other)
			}
		}

		// collisions with canvas
		const canvasCollision = this.collidesWithCanvas()
		if (canvasCollision.x) {
			this.pos.x = this.p5.constrain(this.pos.x, this.width, this.p5.width - this.width)
			this.vel.x = 0
		}
		if (canvasCollision.y) {
			this.pos.y = this.p5.constrain(this.pos.y, this.height, this.p5.height - this.height)
			this.vel.y = 0
		}

		// adjust velocity to 0 if it's too small
		if (Math.abs(this.vel.x) < .01) this.vel.x = 0
		if (Math.abs(this.vel.y) < .01) this.vel.y = 0
	}

	moveToAvoid<T extends Collider>(other: T) {
		if (!this.isSolid || !other.isSolid || !this.collidesWith(other)) return

		const diffVector: P5.Vector = this.pos.copy().sub(other.pos)
		const xDiffVector: P5.Vector = this.p5.createVector(diffVector.x, 0)
		const yDiffVector: P5.Vector = this.p5.createVector(0, diffVector.y)

		const yMin: number = this.height + other.height
		const xMin: number = this.width + other.width

		const xOverlap: number = xMin - xDiffVector.mag()
		const yOverlap: number = yMin - yDiffVector.mag()

		if (yOverlap <= xOverlap) this.pos.add(yDiffVector.copy().setMag(yOverlap))
		else this.pos.add(xDiffVector.copy().setMag(xOverlap))
	}

	updatePhysics(): void {
		this.applyForce(this.p5.createVector(0, this.gravity))
		this.applyPhysics()
	}
}
