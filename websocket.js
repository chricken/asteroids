'use strict';

import { WebSocketServer } from 'ws';
const wss = new WebSocketServer({ port: 8080 });

const websocket = {
    socketID: 1,
    handleMsg(data, socket) {
        socket.send({
            type: 'thankyou',
            payload: data.x * data.y
        })
    },

    applyEventListeners(socket) {
        socket.on('error', console.error);

        // Eindeutige ID zuweisen
        socket.id = websocket.socketID++;

        // Auf Nachricht warten
        socket.on('message', data => {
            console.log('received: %s', data);

            // Nachricht verteilen
            switch (data.type) {
                case 'msg':
                    websocket.handleMsg(data.payload, socket);
                    break;
                default:
                    break;
            }
        });

        socket.send('something');
    },

    init() {
        wss.on('connection', webspocket.applyEventListeners);
    }
}


export default websocket;