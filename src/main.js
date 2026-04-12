import { Game } from './core/Game.js';

function init() {
    const container = document.getElementById('game-container');
    const overlay = document.getElementById('overlay');
    
    if (!container || !overlay) {
        console.error("Nie znaleziono wymaganych elementów DOM (game-container lub overlay).");
        return;
    }

    // Inicjalizacja gry
    const game = new Game(container);

    // Obsługa rozpoczęcia gry i Pointer Lock
    overlay.addEventListener('click', () => {
        game.requestPointerLock();
    });

    // Pętla gry
    function animate() {
        requestAnimationFrame(animate);
        game.update();
        game.render();
    }
    animate();
}

// Inicjalizacja dla modułów
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
