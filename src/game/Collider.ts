import P5 from 'p5'
import GameObject from "./GameObject"

export type Direction = 'top' | 'bottom' | 'left' | 'right'

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

	collidesWith(other: Collider): any {
		const diffVector: P5.Vector = this.pos.copy().sub(other.pos)

		const yMin: number = this.height + other.height
		const xMin: number = this.width + other.width

		return Math.abs(diffVector.x) < xMin && Math.abs(diffVector.y) < yMin
	}

	moveToAvoid(other: Collider): void {
		if (!this.isSolid || !other.isSolid || !this.collidesWith(other)) return

		const diffVector: P5.Vector = this.pos.copy().sub(other.pos)
		const xDiffVector: P5.Vector = this.p5.createVector(diffVector.x, 0)
		const yDiffVector: P5.Vector = this.p5.createVector(0, diffVector.y)

		const yMin: number = this.height + other.height
		const xMin: number = this.width + other.width

		const xOverlap: number = xMin - xDiffVector.mag()
		const yOverlap: number = yMin - yDiffVector.mag()

		if (yOverlap <= xOverlap) this.pos.add(yDiffVector.copy().normalize().mult(yOverlap))
		else this.pos.add(xDiffVector.copy().normalize().mult(xOverlap))
	}

	collidesWithCanvas(): void {
		if (this.pos.y - this.height < 0) this.pos.y = this.height
		if (this.pos.y + this.height > this.p5.height) this.pos.y = this.p5.height - this.height

		if (this.pos.x - this.width < 0) this.pos.x = this.width
		if (this.pos.x + this.width > this.p5.width) this.pos.x = this.p5.width - this.width
	}
}
