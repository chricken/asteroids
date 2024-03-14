'use strict';

class Player {
    constructor() {
        this.x = Math.random();
        this.y = Math.random();
        this.angle = Math.random() * (Math.PI * 2);
        this.thrust = false;
        this.rotate = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.acceleration = .01;
    }

    update() {
        // Aus dem Winkel und der Beschleunigung muss die Bechleunigung in X- und in Y-Richtung errechnet werden
    }
}

export default Player;