'use strict';

import game from '../game.js';

class FlameParticles {
    constructor(x, y, direction, inheritX, inheritY) {
        // console.log(x, y, direction);
        this.x = x;
        this.y = y;
        this.spread = .6;
        this.direction = direction + (Math.random() * this.spread - (this.spread / 2));
        this.size = .003;
        this.relativeSpeed = .01;
        this.color = [80, 100, 70];
        this.colorFader = [4, 1, 2];


        // Aus der Rotation und so die Bewegung errechnen
        // cos direction = deltaX / relSpeed
        this.deltaX = Math.cos(this.direction) * this.relativeSpeed;
        this.deltaX = inheritX + this.deltaX;

        this.deltaY = Math.sin(this.direction) * this.relativeSpeed;
        this.deltaY = inheritY + this.deltaY;
    }
    update() {
        this.x += this.deltaX;
        this.y += this.deltaY;

        this.x = (this.x + 1) % 1;
        this.y = (this.y + 1) % 1;

        this.color[0] -= this.colorFader[0];
        this.color[1] -= this.colorFader[1];
        this.color[2] -= this.colorFader[2];

        if (this.color[2] <= 0) {
            game.flameParticles = game.flameParticles.filter(par => par != this);
        }
    }

}

export default FlameParticles;