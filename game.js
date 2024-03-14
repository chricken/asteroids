'use strict';

import websocket from './websocket.js';
import Player from './classes/Player.js';

const game = {
    players:[],
    asteroids:[],
    ufos:[],
    shots:[],
    addPlayer(){
        const player = new Player();

        game.players.push(player);
        return player;

    },
    removePlayer(){

    },
    
    updatePlayer(data, player){
        // Es wird davon ausgegangen, dass der Benutzer Rotations- und Beschleunigungsdaten übergibt
        player.thrust = data.thrust;
        player.rotate = data.rotate;
        player.shoot = data.shoot;
        // console.log(player);
    },
    update(){
        this.players.forEach(player => player.update());
        this.asteroids.forEach(asteroid => asteroid.update());
        this.ufos.forEach(ufo => ufo.update());
        this.shots.forEach(shot => shot.update());
    }
}

export default game;