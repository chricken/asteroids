'use strict';

import settings, { elements } from './settings.js';

const render = {
    players(data) {
        const c = elements.c;
        const ctx = c.getContext('2d');
        // console.clear();
        data.forEach(player => {
            ctx.save()
            ctx.translate(
                player.x * c.width,
                player.y * c.height
            )
            ctx.rotate(player.angle);

            // ctx.fillStyle = player.color;
            ctx.fillStyle = '#fff';
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 3;

            ctx.beginPath();

            ctx.moveTo(
                player.size * c.width,
                0,
            )
            ctx.lineTo(
                -player.size / 3 * c.width,
                player.size / 2 * c.width,
            )
            ctx.lineTo(
                -player.size / 4 * c.width,
                0,
            )
            ctx.lineTo(
                -player.size / 3 * c.width,
                -player.size / 2 * c.width,
            )
            ctx.closePath();

            ctx.stroke();
            /*
            ctx.fillRect(
                (0 - player.size / 4) * c.width,
                (0 - player.size / 2) * c.height,
                player.size * c.width / 2,
                player.size * c.width,
            )
            */
            ctx.restore();
        })

    },
    flameParticles(data) {
        const c = elements.c;
        const ctx = c.getContext('2d');
        // console.log(data);

        data.forEach(particle => {
            ctx.fillStyle = `hsl(${particle.color[0]},${particle.color[1]}%,${particle.color[2]}%)`;
            ctx.fillRect(
                particle.x * c.width,
                particle.y * c.height,
                particle.size * c.width,
                particle.size * c.width,
            )
        })
    },
    asteroids(data) {
        let c = elements.c;
        let ctx = c.getContext('2d');
        // console.log(data);
        // console.clear()
        // console.log(data.map(as => as.angle).join('\n'));
        data.forEach(asteroid => {
            ctx.beginPath()
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#fff';
            ctx.fillStyle = '#222';
            asteroid.points.forEach(point => {
                let deltaX = Math.sin(asteroid.angle + point.angle) * point.distance * c.width;
                let deltaY = Math.cos(asteroid.angle + point.angle) * point.distance * c.width;
                ctx.lineTo(
                    (asteroid.x * c.width) + deltaX,
                    (asteroid.y * c.height) + deltaY,
                )
            })
            ctx.closePath()
            ctx.fill();
            ctx.stroke();
        })
    },
    shots(data) {
        const c = elements.c;
        const ctx = c.getContext('2d');

        ctx.fillStyle = '#fff';
        ctx.lineWidth = 3;

        data.forEach(shot => {

            ctx.translate(
                shot.x * c.width,
                shot.y * c.height,
            )

            ctx.rotate(shot.angle);

            ctx.strokeStyle = '#fff';
            ctx.beginPath()
            ctx.moveTo(
                -.01 * c.width,
                0
            )
            ctx.lineTo(
                .00 * c.width,
                0
            )
            ctx.stroke();

            ctx.strokeStyle = '#f50';
            ctx.beginPath()
            ctx.moveTo(
                -.015 * c.width,
                0
            )
            ctx.lineTo(
                .012 * c.width,
                0
            )
            ctx.stroke();

            ctx.setTransform(1, 0, 0, 1, 0, 0);
        })
    },
    init() {
        const c = elements.c;
        const ctx = c.getContext('2d');
        ctx.clearRect(0, 0, c.width, c.height);
    }
}

export default render;