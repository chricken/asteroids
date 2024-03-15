'use strict';

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
        this.acceleration = .0001;
        this.color = `hsl(${~~(Math.random() * 360)},70%,70%)`;
    }

    update() {
        // Aus dem Winkel und der Beschleunigung muss die Bechleunigung in X- und in Y-Richtung errechnet werden
        if(this.thrust) {
            this.speedY += this.acceleration;
        }
        this.y += this.speedY;
        this.y = this.y % 1;
        // console.log('Player', this.y);
    }
}

export default Player;