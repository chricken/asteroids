'use strict';

import settings, { elements } from './settings.js';

const render = {
    players(data) {
        const c = elements.c;
        const ctx = c.getContext('2d');
        // console.clear();
        data.forEach(player => {
            ctx.save()
            ctx.translate(
                player.x * c.width,
                player.y * c.height
            )
            ctx.rotate(player.angle);

            // ctx.fillStyle = player.color;
            ctx.fillStyle = '#fff';
            ctx.fillRect(
                (0 - player.size / 4) * c.width,
                (0 - player.size / 2) * c.height,
                player.size * c.width / 2,
                player.size * c.width,
            )

            ctx.restore();
        })

    },
    init() {
        const c = elements.c;
        const ctx = c.getContext('2d');
        ctx.clearRect(0, 0, c.width, c.height);
    }
}

export default render;