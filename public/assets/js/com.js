'use strict';

import settings, { elements } from './settings.js';
import render from './render.js';

const com = {
    socket: false,

    handleHandshake(payload) {
        console.log(payload);
        setInterval(com.updateServer, 30);
    },

    updateServer() {
        let payload = {
            thrust: settings.thrust,
            rotate: settings.rotate,
            shoot: settings.shoot,
        }

        com.socket.send(JSON.stringify({
            type: 'update',
            payload
        }))
    },

    updateClient(data) {
        // console.log(data);
        render.init();
        render.asteroids(data.asteroids);
        render.flameParticles(data.flameParticles);
        render.players(data.players);
        render.shots(data.shots);
    },

    init() {
        // com.socket = new WebSocket(`ws://${window.location.host}:8080`);
        com.socket = new WebSocket(`ws://194.164.206.102:8080`);
        com.socket.addEventListener('message', msg => {
            let data = JSON.parse(msg.data);
            switch (data.type) {
                case 'handshake':
                    com.handleHandshake(data.payload)
                    break;
                case 'update':
                    com.updateClient(data.payload)
                    break;
                default:
                    console.warn(msg);
                    break;
            }
        })
    }
}

export default com;