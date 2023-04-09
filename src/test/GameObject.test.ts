import GameObject from 'src/game/GameObject'
import P5 from 'p5'

describe('GameObject', () => {
	let p5Instance: P5

	beforeEach(() => {
		p5Instance = new P5((p: P5) => {
			p.setup = () => {
				p.createCanvas(800, 600)
			}
			p.draw = () => {
			}
		}, document.body)
	})

	afterEach(() => {
		p5Instance.remove()
	})


	test('should create a game object with the given properties', () => {
		const gameObject = new GameObject(p5Instance, p5Instance.createVector(10, 20), 100, 200)

		expect(gameObject.pos.x).toBe(10)
		expect(gameObject.pos.y).toBe(20)
		expect(gameObject.width).toBe(100)
		expect(gameObject.height).toBe(200)
	})


	test('should be able to modify properties of a game object', () => {
		const gameObject = new GameObject(p5Instance, p5Instance.createVector(20, 30), 40, 50)

		expect(gameObject.pos.x).toBe(20)
		expect(gameObject.pos.y).toBe(30)
		expect(gameObject.width).toBe(40)
		expect(gameObject.height).toBe(50)

		gameObject.pos.x = 123
		gameObject.pos.y = 321
		gameObject.width = 456
		gameObject.height = 969

		expect(gameObject.pos.x).toBe(123)
		expect(gameObject.pos.y).toBe(321)
		expect(gameObject.width).toBe(456)
		expect(gameObject.height).toBe(969)
	})
})
