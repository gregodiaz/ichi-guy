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
		const difVect: P5.Vector = this.pos.copy().sub(other.pos)

		const dx: P5.Vector = this.p5.createVector(difVect.x, 0)
		const dy: P5.Vector = this.p5.createVector(0, difVect.y)

		const ymin: number = this.height + other.height
		const xmin: number = this.width + other.width

		return dx.mag() <= xmin && dy.mag() <= ymin
	}

	correctMovement(other: Collider): void {
		const difVect: P5.Vector = this.pos.copy().sub(other.pos)

		if (!this.isSolid || !other.isSolid || !this.collidesWith(other)) return

		const dx: P5.Vector = this.p5.createVector(difVect.x, 0)
		const dy: P5.Vector = this.p5.createVector(0, difVect.y)

		const ymin: number = this.height + other.height
		const xmin: number = this.width + other.width

		const xoverlap: number = xmin - dx.mag()
		const yoverlap: number = ymin - dy.mag()

		if (yoverlap <= xoverlap) this.pos.add(dy.copy().normalize().mult(yoverlap))
		else this.pos.add(dx.copy().normalize().mult(xoverlap))
	}

	collidesWithCanvas(): void {
		if (this.pos.y < this.height) this.pos.y = this.height
		if (this.pos.y + this.height > this.p5.height) this.pos.y = this.p5.height - this.height

		if (this.pos.x < this.width) this.pos.x = this.width
		if (this.pos.x + this.width > this.p5.width) this.pos.x = this.p5.width - this.width
	}
}
