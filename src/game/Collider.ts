import P5 from 'p5'
import GameObject from "./GameObject"

export default class Collider extends GameObject {
	constructor(
		p5: P5,
		pos: P5.Vector,
		width: number,
		height: number,
		public isSolid: boolean = true,
	) {
		super(p5, pos, width, height)
	}

	collidesWith<T extends Collider>(other: T) {
		const diffVector: P5.Vector = this.pos.copy().sub(other.pos)

		const yMin: number = this.height + other.height
		const xMin: number = this.width + other.width

		return Math.abs(diffVector.x) <= xMin && Math.abs(diffVector.y) <= yMin
	}

	isAbove<T extends Collider>(other: T) {
		return (
			this.pos.x >= other.pos.x - other.width &&
			this.pos.x <= other.pos.x + other.width &&
			this.pos.y - this.height >= other.pos.y + other.height
		)
	}

	isOnGroundOr<T extends Collider>(others: T[]) {
		for (const other of others) {
			if (!other.isSolid) continue
			if(!this.isAbove(other)) continue
			if (this.collidesWith(other)) return true
		}
		return this.collidesWithCanvas().y
	}

	collidesWithCanvas() {
		const x = this.pos.x - this.width <= 0 || this.pos.x + this.width >= this.p5.width
		const y = this.pos.y - this.height <= 0 || this.pos.y + this.height >= this.p5.height

		return { x, y }
	}
}
