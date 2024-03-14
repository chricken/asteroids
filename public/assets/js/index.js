'use strict';

// KONSTANTEN / VARIABLEN
import settings, { elements } from './settings.js';
import game from './game.js';
import com from './com.js';

// FUNKTIONEN
const domMapping = () => {
    elements.c = document.querySelector('#spielfeld');
}

const handleKeyDown = evt => {
    switch (evt.key) {
        case 'ArrowLeft':
        case 'a':
            settings.rotate = -1;
            break
        case 'ArrowRight':
        case 'd':
            settings.rotate = 1;
            break
        case 'ArrowUp':
        case 'w':
            settings.thrust = true;
            break
        case ' ':
        case 'Shift':
        case 'Control':
            evt.preventDefault();
            settings.shoot = true;
            break
    }
}

const handleKeyUp = evt => {
    switch (evt.key) {
        case 'ArrowLeft':
        case 'a':
        case 'ArrowRight':
        case 'd':
            settings.rotate = 0;
            break
        case 'ArrowUp':
        case 'w':
            settings.thrust = false;
            break
        case ' ':
        case 'Shift':
        case 'Control':
            evt.preventDefault();
            settings.shoot = false;
            break
    }

}

const appendEventlisteners = () => {
    window.addEventListener('resize', game.resizeSpielfeld);
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
}

const init = () => {
    domMapping();
    appendEventlisteners();
    com.init();
    game.init();
}

// INIT
init();