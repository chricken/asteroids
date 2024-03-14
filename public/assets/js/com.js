'use strict';

const com = {
    socket: false,

    handleHandshake(payload) {
        console.log(payload);
    },

    init() {
        com.socket = new WebSocket('ws://localhost:8080');
        com.socket.addEventListener('message', msg => {
            let data = JSON.parse(msg.data);
            switch (data.type) {
                case 'handshake':
                    com.handleHandshake(data.payload)
                    break;

                default:
                    console.warn(msg);
                    break;
            }
        })
    }
}

export default com;