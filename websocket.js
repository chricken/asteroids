'use strict';

import { WebSocketServer } from 'ws';
import game from './game.js';

let wss;

const websocket = {
    // Diese id wird inkrementiert und an die Clients gegeben
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

        // Bstätigung der Anmeldung
        socket.send(JSON.stringify({
            type: 'handshake',
            payload: {
                msg: 'Hallo und Willkommen',
                id: socket.id
            }
        }))

        // Spieler anlegen
        let player = game.addPlayer();

        // Auf Nachricht warten
        socket.on('message', data => {
            data = JSON.parse(data.toString())
            // console.log(data.payload.thrust);

            switch (data.type) {
                case 'msg':
                    websocket.handleMsg(data.payload, socket);
                    break;
                case 'update':
                    game.updatePlayer(data.payload, player);
                    break;
                default:
                    break;
            }
        });

        // Client unterbricht die Verbindung
        socket.on('close', () => {
            // console.log(player);
            game.players = game.players.filter(p => p != player);
        })
    },

    updateClients() {
        wss.clients.forEach(client => {
            // console.log(client.readyState);
            // if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
                type: 'update',
                payload: {
                    asteroids: game.asteroids,
                    players: game.players,
                    flameParticles: game.flameParticles,
                }
            }));
            // }
        });
    },

    init() {
        return new Promise(resolve => {
            wss = new WebSocketServer({ port: 8080 });
            wss.on('listening', () => {
                setInterval(websocket.updateClients, 30);
                resolve();
            })
            wss.on('connection', websocket.addClient);
        })
    }
}


export default websocket;