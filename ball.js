export default class Ball {
    pos = {
        x: 0,
        y: 0,
    }
    velocity = {
        x: 0,
        y: 0,
    }
    gravity = {
        direction: {
            x: 0,
            y: 1,
        },
        strength: 1,
        constant: 9.80665,
    }
    radius = 15
    color
    mass = 1

    isStatic = false

    path = []

    secondBall

    constructor(x, y, vx, vy, mass = 1, secondBall = null, constant = 9.80665, isStatic = false) {
        this.pos.x = x
        this.pos.y = y
        this.velocity.x = vx
        this.velocity.y = vy
        this.color = randomColor()
        this.mass = mass
        this.secondBall = secondBall
        this.gravity.constant = constant ?? 9.80665
        this.isStatic = isStatic ?? false
    }

    draw(ctx) {
        ctx.fillStyle = '#ccc'
        ctx.lineWidth = 1
        ctx.beginPath()
        for (const path of this.path) ctx.lineTo(path.x, path.y)
        ctx.stroke()

        ctx.fillStyle = this.color
        ctx.strokeStyle = '#fff'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
    }

    update(ctx) {
        if (this.isStatic) return this.draw(ctx)
        this.path.push({
            x: this.pos.x,
            y: this.pos.y,
        })
        this.gravity.direction.x = this.secondBall.pos.x - this.pos.x
        this.gravity.direction.y = this.secondBall.pos.y - this.pos.y
        const normalized = normalizeVector(this.gravity.direction)
        this.gravity.direction.x = normalized.x
        this.gravity.direction.y = normalized.y

        this.gravity.strength = gravityStrength(
            this.mass,
            this.secondBall.mass,
            // this.gravity.constant,
            distance(this.pos, this.secondBall.pos)
        )
        this.velocity.x += this.gravity.direction.x * this.gravity.strength
        this.pos.x += this.velocity.x
        this.velocity.y += this.gravity.strength * this.gravity.direction.y
        this.pos.y += this.velocity.y
        this.draw(ctx)
    }
}

const G = 6.67 * Math.pow(10, -11)

// equation: F = G * (m1 * m2 / d^2)
const gravityStrength = (m1, m2, distance) => G * ((m1 * m2) / Math.pow(distance, 2))

const randomColor = () => `hsla(${Math.floor(Math.random() * 360)}, 90%, 30%, 70%)`

const distance = (v1, v2) => Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2))

function normalizeVector(v) {
    const length = Math.sqrt(v.x * v.x + v.y * v.y)
    return {
        x: v.x / length,
        y: v.y / length,
    }
}
