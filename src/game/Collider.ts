import P5 from 'p5'
import GameObject from "./GameObject"

export default class Collider extends GameObject {
	constructor(
		p5: P5,
		x: number,
		y: number,
		width: number,
		height: number,
		public isSolid: boolean = true,
	) {
		super(p5, x, y, width, height)
	}

	collidesWith(other: Collider): boolean {
		return (
			this.x + this.width > other.x &&
			this.x < other.x + other.width &&
			this.y + this.height > other.y &&
			this.y < other.y + other.height
		)
	}

	collidesWithCanvas(): void {
		if (this.y < 0) this.y = 0
		if (this.y + this.height > this.p5.height) this.y = this.p5.height - this.height

		if (this.x < 0) this.x = 0
		if (this.x + this.width > this.p5.width) this.x = this.p5.width - this.width
	}

	update(): void {
		this.collidesWithCanvas()
	}
}
