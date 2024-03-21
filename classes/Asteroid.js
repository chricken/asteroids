'use strict';

class Asteroid {
    constructor() {
        this.x = Math.random();
        this.y = Math.random();
        this.maxRotationSpeed = .1;
        this.size = .02;
        this.roughness = .005;
        this.numPoints = 10;
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
        this.angle += this.rotationSpeed;
        this.angle = (this.angle + (Math.PI * 2)) % (Math.PI * 2);
    }
}

export default Asteroid;