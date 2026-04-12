import { Game } from './core/Game.js';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('game-container');
    const instructions = document.getElementById('instructions');
    
    // Inicjalizacja gry
    const game = new Game(container);

    // Obsługa rozpoczęcia gry i Pointer Lock
    instructions.addEventListener('click', () => {
        game.requestPointerLock();
    });

    game.onPointerLockChange((isLocked) => {
        if (isLocked) {
            instructions.style.display = 'none';
        } else {
            instructions.style.display = 'block';
        }
    });

    // Pętla gry
    function animate() {
        requestAnimationFrame(animate);
        game.update();
        game.render();
    }
    animate();
});
