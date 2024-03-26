'use strict';

import game from '../game.js';

class Asteroid {
    constructor(
        size = Math.random() * .015 + .007,
        x = Math.random(),
        y = Math.random()
    ) {
        let maxSpeed = .003;
        this.minSize = .006;

        this.x = x;
        this.y = y;
        this.maxRotationSpeed = .1;
        this.size = size;
        this.speedX = (Math.random() * maxSpeed) - (maxSpeed / 2)
        this.speedY = (Math.random() * maxSpeed) - (maxSpeed / 2)
        this.roughness = .005;
        this.numPoints = 6;
        this.angle = 0;


        this.rotationSpeed = Math.random() * this.maxRotationSpeed - (this.maxRotationSpeed / 2)
        this.points = [];
        for (let i = 0; i < this.numPoints; i++) {
            let distance = Math.random() * (this.size - this.roughness) + this.size;
            let angle = (Math.PI * 2) / this.numPoints * i;
            this.points.push({ distance, angle });
        }
        // console.log(this.rotationSpeed);
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        this.x = (this.x + 1) % 1;
        this.y = (this.y + 1) % 1;

        this.angle += this.rotationSpeed;
        this.angle = (this.angle + (Math.PI * 2)) % (Math.PI * 2);

    }
    breakUp() {
        let max = ~~(Math.random() * 3 + 1);
        if (this.size > this.minSize) {
            for (let i = 0; i < max; i++) {
                game.asteroids.push(new Asteroid(
                    this.size / (Math.random() * 0.3 + 1.2),
                    this.x,
                    this.y
                ));
            }
        }
        game.asteroids = game.asteroids.filter(ast => ast != this);
    }
}

export default Asteroid;