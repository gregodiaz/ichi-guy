import P5 from 'p5'
import Collider from './Collider'
import PlayerPhysics from './PlayerPhysics'
import Jump from './Jump'

export default class PlayerController {
	constructor(
		public p5: P5,
		public pos: P5.Vector,
		public width: number,
		public height: number,
		public others: Collider[],
		public physics: PlayerPhysics = new PlayerPhysics(p5, pos, width, height, others),
		public jump: Jump = new Jump(physics),
	) {
	}

	onKeyHold(): void {
		const isWithinRightLimit = this.pos.x + this.width < this.p5.width
		const isWithinLeftLimit = this.pos.x - this.width > 0
		const forceX: P5.Vector = this.p5.createVector(1, 0).mult(this.physics.magnitudeX)

		if (this.p5.keyIsDown(this.p5.RIGHT_ARROW) && isWithinRightLimit) this.physics.applyForce(forceX.mult(1))
		if (this.p5.keyIsDown(this.p5.LEFT_ARROW) && isWithinLeftLimit) this.physics.applyForce(forceX.mult(-1))

		this.physics.vel.x *= this.physics.drag
	}

	onKeyPressed(): void {
		if (this.p5.key.toUpperCase() === 'ARROWUP') this.jump.execute()
	}

	updateController(): void {
		this.onKeyHold()
		this.physics.updatePhysics()
		if (this.physics.isOnGroundOr(this.physics.others)) {
			this.jump.remainingJumps = 2
			this.jump.isJumping = false
		}
	}
}
