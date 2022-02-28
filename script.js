'use strict'

import Ball from './ball.js'

const canvas = document.createElement('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
document.body.appendChild(canvas)
const ctx = canvas.getContext('2d')

// document.querySelector('form p').onclick = () => (document.querySelector('#const').value = 9.80665)

const urlParams = new URLSearchParams(window.location.search)
urlParams.forEach((value, key) => {
    if (key.includes('static')) {
        document.querySelector(`#${key}`).checked = true
    } else {
        document.querySelector(`#${key}`).value = value
    }
})

const balls = []

const gap = +(urlParams.get('distance') ?? 500)

const config = {
    ball1: {
        x: canvas.width / 2 - gap / 2,
        y: canvas.height / 2,
        vx: +(urlParams.get('b1vx') ?? 0),
        vy: +(urlParams.get('b1vy') ?? 5),
        mass: +(urlParams.get('b1mass') ?? 20000) * 1000,
        isStatic: urlParams.get('b1static') === 'true',
    },
    ball2: {
        x: canvas.width / 2 + gap / 2,
        y: canvas.height / 2,
        vx: +(urlParams.get('b2vx') ?? 0),
        vy: +(urlParams.get('b2vy') ?? -5),
        mass: +(urlParams.get('b2mass') ?? 20000) * 1000,
        isStatic: urlParams.get('b2static') === 'true',
    },
}

const constant = +urlParams.get('const') || null
balls.push(
    new Ball(
        config.ball1.x,
        config.ball1.y,
        config.ball1.vx,
        config.ball1.vy,
        config.ball1.mass,
        null,
        constant,
        config.ball1.isStatic
    )
)
balls.push(
    new Ball(
        config.ball2.x,
        config.ball2.y,
        config.ball2.vx,
        config.ball2.vy,
        config.ball2.mass,
        balls[0],
        constant,
        config.ball2.isStatic
    )
)
balls[0].secondBall = balls[1]

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (const ball of balls) ball.update(ctx)
    requestAnimationFrame(loop)
}
loop()
