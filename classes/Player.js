'use strict';

import FlameParticle from "./FlameParticles.js";
import game from '../game.js';

class Player {
    constructor() {
        this.x = Math.random();
        this.y = Math.random();
        this.size = .01;
        this.angle = Math.random() * (Math.PI * 2);
        this.thrust = false;
        this.rotate = 0;
        this.speedX = 0;
        this.speedY = 0;

        this.speedAngular = 0;
        this.acceleration = .0001;
        this.accelerationAngular = .006;
        
        this.friction = .005;
        this.frictionAngular = .005;
        this.color = `hsl(${~~(Math.random() * 360)},70%,70%)`;
        this.probabilityFlameParticle = 1;
    }

    update() {
        // Lineare Bewegung
        if (this.thrust) {
            let deltaX = Math.cos(this.angle) * this.acceleration;
            let deltaY = Math.sin(this.angle) * this.acceleration;
            this.speedX += deltaX;
            this.speedY += deltaY;

            // Flamme
            if (Math.random() < this.probabilityFlameParticle) {
                game.flameParticles.push(
                    new FlameParticle(
                        this.x,
                        this.y,
                        (this.angle + Math.PI) % (Math.PI * 2),
                        this.speedX,
                        this.speedY,
                    )
                )
            }
        }
        this.speedX -= this.speedX * this.friction;
        this.speedY -= this.speedY * this.friction;

        this.x += this.speedX;
        this.y += this.speedY;
        // console.log(this.speedX, this.speedY);

        this.x = (this.x + 1) % 1;
        this.y = (this.y + 1) % 1;

        // Rotation
        // Beschleunigen
        this.speedAngular += this.rotate * this.accelerationAngular;

        // Abbremsen
        this.speedAngular -= this.speedAngular * this.frictionAngular;

        // Drehen
        this.angle += this.speedAngular;

        // Clamp
        this.angle = (this.angle + (2 * Math.PI)) % (2 * Math.PI);
        // console.log(this.angle);

    }
}

export default Player;