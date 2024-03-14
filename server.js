'use strict';

import websocket from './websocket.js';
import game from './game.js';
import express from 'express';
const server = express();

server.use(express.static('public', {
    extensions: ['html']
}));

const init = () => {
    websocket.init().then(
        () => server.listen(80, err => console.log(err || 'Server läuft'))
    ).then(
        () => setInterval(game.update, 30)
    ).catch(
        console.warn
    )
}

init();