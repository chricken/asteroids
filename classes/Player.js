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
        this.acceleration = .01;
        this.color = `hsl(${~~(Math.random() * 360)},70%,70%)`;
    }

    update() {
        // Aus dem Winkel und der Beschleunigung muss die Bechleunigung in X- und in Y-Richtung errechnet werden
        if(this.thrust) {
            this.speed += this.acceleration;
        }
        this.y += this.speed;
        this.y = this.y % 1;
        // console.log(this.thrust);
    }
}

export default Player;