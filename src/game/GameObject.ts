import P5 from 'p5'

export default class GameObject {
	constructor(
		public p5: P5,
		public x: number,
		public y: number,
		public width: number,
		public height: number,
	) {
	}

	draw() {
		this.p5.rect(this.x, this.y, this.width, this.height)
	}
}
