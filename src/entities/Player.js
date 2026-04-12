import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

export class Player {
    constructor(camera, container, world) {
        this.camera = camera;
        this.world = world;
        this.controls = new PointerLockControls(camera, container);
        
        // Stan gracza
        this.velocity = new THREE.Vector3();
        this.direction = new THREE.Vector3();
        this.moveSpeed = 10.0;
        this.prevTime = performance.now();
        this.canJump = false;
        this.isFrozen = false;

        // Klawisze sterowania
        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;

        this.initEventListeners();

        // Ustawienie początkowe gracza (środek terenu 32x32)
        this.camera.position.set(16, 5, 16); 
    }

    getObject() {
        return this.controls.getObject();
    }

    initEventListeners() {
        const onKeyDown = (event) => {
            if (this.isFrozen) return;
            
            switch (event.code) {
                case 'KeyW': this.moveForward = true; break;
                case 'KeyA': this.moveLeft = true; break;
                case 'KeyS': this.moveBackward = true; break;
                case 'KeyD': this.moveRight = true; break;
                case 'Space': 
                    if (this.canJump) {
                        this.velocity.y += 12; // Zwiększony skok
                        this.canJump = false;
                    }
                    break;
            }
        };

        const onKeyUp = (event) => {
            switch (event.code) {
                case 'KeyW': this.moveForward = false; break;
                case 'KeyA': this.moveLeft = false; break;
                case 'KeyS': this.moveBackward = false; break;
                case 'KeyD': this.moveRight = false; break;
            }
        };

        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);

        window.addEventListener('inventoryToggled', (e) => {
            this.isFrozen = e.detail.isOpen;
            if (this.isFrozen) {
                this.moveForward = false;
                this.moveBackward = false;
                this.moveLeft = false;
                this.moveRight = false;
            }
        });
    }

    update() {
        const time = performance.now();
        const delta = (time - this.prevTime) / 1000;

        if (this.isFrozen) {
            this.prevTime = time;
            return;
        }

        // Reset velocity if not moved (friction/damping)
        this.velocity.x -= this.velocity.x * 10.0 * delta;
        this.velocity.z -= this.velocity.z * 10.0 * delta;
        this.velocity.y -= 9.8 * 3.0 * delta; // Zwiększona grawitacja dla "cięższego" odczucia

        // Obliczanie kierunku ruchu
        this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
        this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
        this.direction.normalize();

        if (this.moveForward || this.moveBackward) {
            this.velocity.z -= this.direction.z * 600.0 * delta; // Zwiększona prędkość
        }
        if (this.moveLeft || this.moveRight) {
            this.velocity.x -= this.direction.x * 600.0 * delta; // Zwiększona prędkość
        }

        // Apply horizontal movement
        this.controls.moveRight(-this.velocity.x * delta);
        this.controls.moveForward(-this.velocity.z * delta);
        
        // Vertical movement and collision
        const pos = this.controls.getObject().position;
        pos.y += (this.velocity.y * delta);

        // Ulepszona detekcja kolizji z podłożem (sprawdzenie kilku punktów wokół gracza)
        const checkOffsets = [
            { x: 0, z: 0 },
            { x: 0.3, z: 0.3 },
            { x: -0.3, z: 0.3 },
            { x: 0.3, z: -0.3 },
            { x: -0.3, z: -0.3 }
        ];

        let grounded = false;
        for (const offset of checkOffsets) {
            const floorY = Math.floor(pos.y - 1.6);
            const blockBelow = this.world.getBlockAt(pos.x + offset.x, floorY, pos.z + offset.z);

            if (blockBelow) {
                const blockTop = blockBelow.position.y + 0.5 + 1.6;
                if (pos.y < blockTop) {
                    this.velocity.y = 0;
                    pos.y = blockTop;
                    grounded = true;
                    break;
                }
            }
        }
        this.canJump = grounded;

        // Fallback for falling out of world - respawn na środku
        if (pos.y < -20) {
            pos.set(16, 10, 16);
            this.velocity.y = 0;
        }

        this.prevTime = time;
    }
}
