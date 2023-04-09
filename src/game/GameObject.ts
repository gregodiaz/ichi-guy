import P5 from 'p5'

export default class GameObject {
	constructor(
		public p5: P5,
		public pos: P5.Vector,
		public width: number,
		public height: number,
	) {
	}

	draw() {
		this.p5.rectMode(this.p5.RADIUS)
		this.p5.rect(this.pos.x, this.pos.y, this.width, this.height)
	}
}
