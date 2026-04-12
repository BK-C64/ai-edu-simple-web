import * as THREE from 'three';
import { Player } from '../entities/Player.js';
import { World } from '../world/World.js';
import { Interaction } from '../systems/Interaction.js';

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
        
        // Inicjalizacja świata
        this.world = new World(this.scene);

        // Inicjalizacja gracza
        this.player = new Player(this.camera, this.container, this.world);
        this.scene.add(this.player.getObject());

        // Inicjalizacja interakcji
        this.interaction = new Interaction(this.camera, this.scene, this.world);

        // Podstawowe oświetlenie
        this.setupLights();

        // Dodaj proste UI informacyjne
        this.setupUI();

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

    setupUI() {
        const info = document.createElement('div');
        info.style.position = 'absolute';
        info.style.top = '10px';
        info.style.left = '10px';
        info.style.color = 'white';
        info.style.fontFamily = 'sans-serif';
        info.style.textShadow = '1px 1px 2px black';
        info.style.pointerEvents = 'none';
        info.innerHTML = `
            <b>Minecraft Proto Stage 3</b><br>
            WSAD: Ruch | SPACE: Skok<br>
            LPM: Usuń | PPM: Buduj<br>
            1-4: Wybór bloku (Trawa, Ziemia, Kamień, Drewno)
        `;
        this.container.appendChild(info);

        const crosshair = document.createElement('div');
        crosshair.style.position = 'absolute';
        crosshair.style.top = '50%';
        crosshair.style.left = '50%';
        crosshair.style.width = '20px';
        crosshair.style.height = '20px';
        crosshair.style.border = '2px solid white';
        crosshair.style.borderRadius = '50%';
        crosshair.style.transform = 'translate(-50%, -50%)';
        crosshair.style.pointerEvents = 'none';
        this.container.appendChild(crosshair);
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
