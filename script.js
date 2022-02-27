'use strict'

import Ball from './ball.js'

const canvas = document.createElement('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
document.body.appendChild(canvas)

const resetButton = document.querySelector('form p')

resetButton.onclick = () => {
    document.querySelector('#const').value = 9.80665
}

const urlParams = new URLSearchParams(window.location.search)
urlParams.forEach((value, key) => {
    document.querySelector(`#${key}`).value = value
})

const ctx = canvas.getContext('2d')

const balls = []

const vel = {
    b1: {
        y: +urlParams.get('b1vy') || 5,
        x: +urlParams.get('b1vx') || -1,
    },
    b2: {
        y: +urlParams.get('b2vy') || -5,
        x: +urlParams.get('b2vx') || 1,
    },
}

const ball1 = {
    x: (canvas.width / 5) * 2,
    y: canvas.height / 2,
    vx: vel.b1.x,
    vy: vel.b1.y,
    mass: +urlParams.get('b1mass') || 60,
}
const ball2 = {
    x: (canvas.width / 5) * 3,
    y: canvas.height / 2,
    vx: vel.b2.x,
    vy: vel.b2.y,
    mass: +urlParams.get('b2mass') || 50,
}
const constant = +urlParams.get('const') || null
balls.push(new Ball(ball1.x, ball1.y, ball1.vx, ball1.vy, ball1.mass, null, constant))
balls.push(new Ball(ball2.x, ball2.y, ball2.vx, ball2.vy, ball2.mass, balls[0], constant))
balls[0].secondBall = balls[1]

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (const ball of balls) {
        ball.update(ctx)
    }
    requestAnimationFrame(loop)
}
loop()
