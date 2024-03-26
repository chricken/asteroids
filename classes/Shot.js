'use strict';

import game from '../game.js';

class Shot {
    constructor(x, y, angle, speedX, speedY) {
        Object.assign(this, { x, y, angle, speedX, speedY });
        // console.log(this);
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
            if (distance < asteroid.size*2) {
                game.shots = game.shots.filter(shot => shot != this);
                asteroid.breakUp();
            }
        }
    }
}

export default Shot;