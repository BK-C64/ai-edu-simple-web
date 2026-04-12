import * as THREE from 'three';
import { Player } from '../entities/Player.js';
import { World } from '../world/World.js';
import { Interaction } from '../systems/Interaction.js';

export class Game {
    constructor(container) {
        this.container = container;
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87CEEB); // Sky blue
        this.scene.fog = new THREE.Fog(0x87CEEB, 10, 100);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.container.appendChild(this.renderer.domElement);

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        
        // Inicjalizacja świata
        this.world = new World(this.scene);

        // Inicjalizacja gracza
        this.player = new Player(this.camera, this.container, this.world);
        this.scene.add(this.player.getObject());

        // Inicjalizacja interakcji
        this.interaction = new Interaction(this.camera, this.scene, this.world);

        // Podstawowe oświetlenie
        this.setupLights();

        // Obsługa zmiany rozmiaru okna
        window.addEventListener('resize', () => this.onWindowResize(), false);

        // Obsługa kliknięć myszy (interakcja)
        this.container.addEventListener('mousedown', (e) => {
            if (document.pointerLockElement === this.container) {
                this.interaction.onMouseDown(e);
            }
        });

        // Zapobieganie menu kontekstowemu na PPM
        this.container.addEventListener('contextmenu', (e) => e.preventDefault());
    }

    setupLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(50, 100, 50);
        directionalLight.castShadow = true;
        
        // Optymalizacja cieni
        directionalLight.shadow.mapSize.width = 1024;
        directionalLight.shadow.mapSize.height = 1024;
        directionalLight.shadow.camera.left = -50;
        directionalLight.shadow.camera.right = 50;
        directionalLight.shadow.camera.top = 50;
        directionalLight.shadow.camera.bottom = -50;
        
        this.scene.add(directionalLight);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    requestPointerLock() {
        this.container.requestPointerLock();
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
