import Collider from 'src/game/Collider'
import GameObject from 'src/game/GameObject'
import P5 from 'p5'
let p5Instance: P5

describe('Collider', () => {
	test('should create a game object with the given properties', () => {
		const collider = new Collider(p5Instance, 24, 69, 243, 669)

		expect(collider.x).toBe(24)
		expect(collider.y).toBe(69)
		expect(collider.width).toBe(243)
		expect(collider.height).toBe(669)
	})


	test('should extend from GameObject', () => {
		const collider = new Collider(p5Instance, 20, 30, 40, 50)
		expectTypeOf(collider).toMatchTypeOf<GameObject>()
	})


	test('should be able to modify properties of a game object', () => {
		const collider = new Collider(p5Instance, 20, 30, 40, 50)

		expect(collider.x).toBe(20)
		expect(collider.y).toBe(30)
		expect(collider.width).toBe(40)
		expect(collider.height).toBe(50)
		expect(collider.isSolid).toBe(true)

		collider.x = 123
		collider.y = 321
		collider.width = 456
		collider.height = 969
		collider.isSolid = false

		expect(collider.x).toBe(123)
		expect(collider.y).toBe(321)
		expect(collider.width).toBe(456)
		expect(collider.height).toBe(969)
		expect(collider.isSolid).toBe(false)
	})


	test('should detect collition between colliders', () => {
		const collider1 = new Collider(p5Instance, 20, 30, 10, 30)
		const collider2 = new Collider(p5Instance, 5, 30, 40, 20)
		const collider3 = new Collider(p5Instance, 90, 120, 4, 2)

		const check1with2 = collider1.collidesWith(collider2)
		const check1with3 = collider1.collidesWith(collider3)
		const check2with3 = collider2.collidesWith(collider3)

		expect(check1with2).toBe(true)
		expect(check1with3).toBe(false)
		expect(check2with3).toBe(false)
	})


	// TODO:test('should detect collition with canvas',() => {})
})
