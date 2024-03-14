'use strict';

// KONSTANTEN / VARIABLEN
import settings, {elements} from './settings.js';
import game from './game.js';
import com from './com.js';

// FUNKTIONEN
const domMapping = () => {
    elements.c = document.querySelector('#spielfeld');
}

const appendEventlisteners = () => {
    window.addEventListener('resize', game.resizeSpielfeld)
}

const init = () => {
    domMapping();
    appendEventlisteners();
    com.init();
    game.init();
}

// INIT
init();