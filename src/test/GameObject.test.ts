import GameObject from 'src/game/GameObject'
import P5 from 'p5'
let p5Instance: P5

describe('GameObject', () => {
	test('should create a game object with the given properties', () => {
		const gameObject = new GameObject(p5Instance, 10, 20, 100, 200)

		expect(gameObject.x).toBe(10)
		expect(gameObject.y).toBe(20)
		expect(gameObject.width).toBe(100)
		expect(gameObject.height).toBe(200)
	})


	test('should be able to modify properties of a game object', () => {
		const gameObject = new GameObject(p5Instance, 20, 30, 40, 50)

		expect(gameObject.x).toBe(20)
		expect(gameObject.y).toBe(30)
		expect(gameObject.width).toBe(40)
		expect(gameObject.height).toBe(50)

		gameObject.x = 123
		gameObject.y = 321
		gameObject.width = 456
		gameObject.height = 969

		expect(gameObject.x).toBe(123)
		expect(gameObject.y).toBe(321)
		expect(gameObject.width).toBe(456)
		expect(gameObject.height).toBe(969)
	})
})
