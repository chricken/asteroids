'use strict';

import game from '../game.js';
import FlameParticle from "./FlameParticles.js";


class Shot {
    constructor(x, y, angle, speedX, speedY) {

        let deltaX = Math.cos(angle) * .03;
        let deltaY = Math.sin(angle) * .03;

        Object.assign(this, {
            x: x + deltaX,
            y: y + deltaY,
            angle, speedX, speedY
        });

        this.additionalSpeed = .015;
        this.firedTimeStamp = Date.now();
        this.lifetime = 1000;
    }

    update() {
        let deltaX = Math.cos(this.angle) * this.additionalSpeed;
        let deltaY = Math.sin(this.angle) * this.additionalSpeed;

        deltaX += this.speedX;
        deltaY += this.speedY;

        this.x += deltaX;
        this.y += deltaY;

        this.x = (this.x + 1) % 1;
        this.y = (this.y + 1) % 1;

        if ((Date.now() - this.lifetime) > this.firedTimeStamp) {
            game.shots = game.shots.filter(shot => shot != this);
        }

        for (let i = 0; i < game.asteroids.length; i++) {
            let asteroid = game.asteroids[i];
            let distance = Math.hypot(
                asteroid.x - this.x,
                asteroid.y - this.y,
            )
            // console.log(distance);
            if (distance < asteroid.size * 2) {
                game.shots = game.shots.filter(shot => shot != this);
                asteroid.breakUp();
            }
        }

        for (let i = 0; i < game.players.length; i++) {
            let player = game.players[i];
            let distance = Math.hypot(
                player.x - this.x,
                player.y - this.y,
            )
            // console.log(distance);
            if (distance < player.size * 2) {
                this.breakUp();
                player.breakUp();
            }
        }
    }
    breakUp() {
        // Funken fliegen
        for (let i = 0; i < 20; i++) {
            game.flameParticles.push(
                new FlameParticle(
                    this.x,
                    this.y,
                    0,
                    this.speedX,
                    this.speedY,
                    Math.random() * .001 + .0005,
                    Math.PI * 2
                )
            )
        }

        game.shots = game.shots.filter(shot => shot != this);
    }
}

export default Shot;