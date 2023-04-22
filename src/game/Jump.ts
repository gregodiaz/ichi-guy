import PlayerPhysics from './PlayerPhysics'

export default class Jump {
	public isFalling: boolean = false
	public isRising: boolean = false
	public isJumping: boolean = false
	public jumpForce: number = 1.69 * 2.43 * 4.3
	public remainingJumps: number = 2

	constructor(
		private physics: PlayerPhysics
	) {
	}

	execute(): void {
		if (this.remainingJumps > 0) {
			if (this.remainingJumps === 1) this.physics.vel.y = 0

			this.physics.applyForce(this.physics.p5.createVector(0, this.jumpForce))

			const velY = this.physics.vel.y

			this.isJumping = true
			this.isRising = velY > 0 ? true : false
			this.isFalling = velY < 0 ? true : false

			this.remainingJumps--
		}
	}
}
