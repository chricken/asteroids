'use strict';

import { WebSocketServer } from 'ws';
let wss;

const websocket = {
    socketID: 1,
    handleMsg(data, socket) {
        socket.send({
            type: 'thankyou',
            payload: data.x * data.y
        })
    },

    addClient(socket) {
        socket.on('error', console.error);

        // Eindeutige ID zuweisen
        socket.id = websocket.socketID++;

        socket.send(JSON.stringify({
            type:'handshake',
            payload:{
                msg:'Hallo und Willkommen'
            }
        }))

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

    },

    init() {
        return new Promise(resolve => {
            wss = new WebSocketServer({ port: 8080 });
            wss.on('listening', resolve)
            wss.on('connection', websocket.addClient);
        })
    }
}


export default websocket;