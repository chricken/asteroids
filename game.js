'use strict';

import websocket from './websocket.js';
import Player from './classes/Player.js';
import Asteroid from './classes/Asteroid.js';

const game = {
    players: [],
    asteroids: [],
    ufos: [],
    shots: [],
    flameParticles: [],
    numAsteroids: 12,
    addPlayer() {
        const player = new Player();
        
        game.players.push(player);
        return player;

    },
    removePlayer() {

    },

    updatePlayer(data, player) {
        // console.log(data);
        // Es wird davon ausgegangen, dass der Benutzer Rotations- und Beschleunigungsdaten übergibt
        player.thrust = data.thrust;
        player.rotate = data.rotate;
        player.shoot = data.shoot;
    },

    update() {
        game.players.forEach(player => player.update());
        game.flameParticles.forEach(flameParticle => flameParticle.update());
        game.asteroids.forEach(asteroid => asteroid.update());
        game.ufos.forEach(ufo => ufo.update());
        game.shots.forEach(shot => shot.update());
    },

    init() {
        for (let i = 0; i < game.numAsteroids; i++) {
            game.asteroids.push(
                new Asteroid()
            )
        }
    }
}

export default game;