import P5 from 'p5'
import PlayerMovement from './PlayerMovement'
import Collider from './Collider'

export default class MainCharacter extends PlayerMovement {
	constructor(
		p5: P5,
		pos: P5.Vector,
		width: number,
		height: number,
		others: Collider[],
	) {
		super(p5, pos, width, height, others)
	}

	update(): void {
		this.updateMovement()
	}
}
