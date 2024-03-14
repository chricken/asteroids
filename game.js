'use strict';

import websocket from './websocket.js';

const game = {
    players:[],
    asteroids:[],
    ufos:[],
    shots:[],
    update(){
        this.players.forEach(player => player.update());
        this.asteroids.forEach(asteroid => asteroid.update());
        this.ufos.forEach(ufo => ufo.update());
        this.shots.forEach(shot => shot.update());
    }
}

export default game;