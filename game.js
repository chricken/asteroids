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
        // console.log(data);
        // Es wird davon ausgegangen, dass der Benutzer Rotations- und Beschleunigungsdaten übergibt
        player.thrust = data.thrust;
        player.rotate = data.rotate;
        player.shoot = data.shoot;
    },
    update(){
        game.players.forEach(player => player.update());
        game.asteroids.forEach(asteroid => asteroid.update());
        game.ufos.forEach(ufo => ufo.update());
        game.shots.forEach(shot => shot.update());
    }
}

export default game;