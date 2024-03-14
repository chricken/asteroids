'use strict';

import settings, { elements } from './settings.js';

const com = {
    socket: false,

    handleHandshake(payload) {
        console.log(payload);
        setInterval(com.updateServer, 30);
    },

    updateServer() {
        com.socket.send(JSON.stringify({
            type: 'update',
            payload: {
                thrust: settings.thrust,
                rotate: settings.rotate,
                shoot: settings.shoot,
            }
        }))
    },

    updateClient(data){
        console.log(data);
    },

    init() {
        com.socket = new WebSocket('ws://localhost:8080');
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