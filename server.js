'use strict';

import websocket from './websocket.js';
import express from 'express';
const server = express();

server.use(express.static('public', {
    extensions: ['html']
}));

const init = () => {
    websocket.init().then(
        () => server.listen(80, err => console.log(err || 'Server läuft'))
    ).catch(
        console.warn
    )
}

init();