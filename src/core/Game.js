import * as THREE from 'three';
import { Player } from '../entities/Player.js';
import { World } from '../world/World.js';
import { Interaction } from '../systems/Interaction.js';
import { UI } from '../systems/UI.js';

export class Game {
    constructor(container) {
        this.container = container;
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87CEEB); // Sky blue
        this.scene.fog = new THREE.FogExp2(0x87CEEB, 0.015);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.container.appendChild(this.renderer.domElement);

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        
        // Inicjalizacja UI (przed resztą, żeby Interaction mógł z niego korzystać)
        this.ui = new UI();

        // Inicjalizacja świata
        this.world = new World(this.scene);

        // Inicjalizacja gracza
        this.player = new Player(this.camera, this.container, this.world);
        this.scene.add(this.player.getObject());

        // Inicjalizacja interakcji
        this.interaction = new Interaction(this.camera, this.scene, this.world, this.ui);

        // Podstawowe oświetlenie
        this.setupLights();

        // Obsługa zmiany rozmiaru okna
        window.addEventListener('resize', () => this.onWindowResize(), false);

        // Inicjalizacja słuchacza Pointer Lock
        this.setupPointerLockListener();
        this.setupInventoryUIListener();

        // Obsługa kliknięć myszy (interakcja)
        this.container.addEventListener('mousedown', (e) => {
            if (document.pointerLockElement === this.container && !this.ui.isInventoryOpen) {
                this.interaction.onMouseDown(e);
            }
        });

        // Zapobieganie menu kontekstowemu na PPM
        this.container.addEventListener('contextmenu', (e) => e.preventDefault());
    }

    setupInventoryUIListener() {
        window.addEventListener('inventoryToggled', (e) => {
            const isOpen = e.detail.isOpen;
            const isLocked = document.pointerLockElement === this.container;
            
            // Jeśli zamykamy inwentarz a mysz nie jest zablokowana, pokaż overlay
            if (!isOpen && !isLocked) {
                this.ui.showOverlay(true);
            }
        });
    }

    setupPointerLockListener() {
        document.addEventListener('pointerlockchange', () => {
            const isLocked = document.pointerLockElement === this.container;
            
            // Overlay powinien znikać gdy mamy locka LUB gdy otwarty jest inwentarz
            // Powinien pojawiać się tylko gdy nie mamy locka I inwentarz jest zamknięty
            if (isLocked || this.ui.isInventoryOpen) {
                this.ui.showOverlay(false);
            } else {
                this.ui.showOverlay(true);
            }
        });
    }

    setupLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const sunLight = new THREE.DirectionalLight(0xffffeb, 1.0);
        sunLight.position.set(50, 100, 50);
        sunLight.castShadow = true;
        
        // Optymalizacja cieni dla większego obszaru
        sunLight.shadow.mapSize.width = 2048;
        sunLight.shadow.mapSize.height = 2048;
        sunLight.shadow.camera.left = -100;
        sunLight.shadow.camera.right = 100;
        sunLight.shadow.camera.top = 100;
        sunLight.shadow.camera.bottom = -100;
        sunLight.shadow.camera.far = 500;
        
        this.scene.add(sunLight);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    requestPointerLock() {
        if (!this.ui.isInventoryOpen) {
            this.container.requestPointerLock();
        }
    }

    onPointerLockChange(callback) {
        document.addEventListener('pointerlockchange', () => {
            callback(document.pointerLockElement === this.container);
        });
    }

    update() {
        this.player.update();
        this.interaction.update();
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}
