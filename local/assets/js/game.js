'use strict';

import settings, {elements} from './settings.js';

const game = {
    resizeSpielfeld(){
        elements.c.width = window.innerWidth;
        elements.c.height = window.innerHeight;
    },
    init(){
        game.resizeSpielfeld();
    }
}

export default game;