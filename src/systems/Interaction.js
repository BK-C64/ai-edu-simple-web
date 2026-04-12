import * as THREE from 'three';

export class Interaction {
    constructor(camera, scene, world) {
        this.camera = camera;
        this.scene = scene;
        this.world = world;
        
        this.raycaster = new THREE.Raycaster();
        this.raycaster.far = 5; // Zasięg 5 jednostek

        // Wizualny highlight dla wskazywanego bloku
        const highlightGeometry = new THREE.BoxGeometry(1.02, 1.02, 1.02);
        const highlightMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
            transparent: true,
            opacity: 0.5
        });
        this.highlightBox = new THREE.Mesh(highlightGeometry, highlightMaterial);
        this.highlightBox.visible = false;
        this.scene.add(this.highlightBox);

        this.intersect = null;
        this.selectedType = 'grass';
        
        this.setupKeyboard();
    }

    setupKeyboard() {
        const hud = document.createElement('div');
        hud.id = 'hud-block';
        hud.style.position = 'absolute';
        hud.style.bottom = '20px';
        hud.style.left = '50%';
        hud.style.transform = 'translateX(-50%)';
        hud.style.color = 'white';
        hud.style.backgroundColor = 'rgba(0,0,0,0.5)';
        hud.style.padding = '10px';
        hud.style.fontFamily = 'monospace';
        hud.innerText = `Wybrany blok: ${this.selectedType}`;
        document.body.appendChild(hud);

        window.addEventListener('keydown', (e) => {
            if (e.key === '1') this.selectedType = 'grass';
            if (e.key === '2') this.selectedType = 'dirt';
            if (e.key === '3') this.selectedType = 'stone';
            if (e.key === '4') this.selectedType = 'wood';
            hud.innerText = `Wybrany blok: ${this.selectedType}`;
        });
    }

    update() {
        // Raycast z centrum ekranu (0, 0 w układzie Three.js to środek)
        this.raycaster.setFromCamera({ x: 0, y: 0 }, this.camera);
        
        // Sprawdź kolizję tylko z blokami świata (InstancedMeshes)
        const intersects = this.raycaster.intersectObjects(this.world.getBlocks(), false);

        if (intersects.length > 0) {
            this.intersect = intersects[0];
            const mesh = this.intersect.object;
            const instanceId = this.intersect.instanceId;
            
            // Pobierz pozycję instancji z mappingu zapisanego w World.js
            const mapping = mesh.userData.instanceMapping;
            if (mapping && mapping[instanceId]) {
                const pos = mapping[instanceId];
                this.highlightBox.position.set(pos.x, pos.y, pos.z);
                this.highlightBox.visible = true;
            }
        } else {
            this.intersect = null;
            this.highlightBox.visible = false;
        }
    }

    onMouseDown(event) {
        if (!this.intersect) return;

        const mesh = this.intersect.object;
        const instanceId = this.intersect.instanceId;
        const mapping = mesh.userData.instanceMapping;
        
        if (!mapping || mapping[instanceId] === undefined) return;
        const pos = mapping[instanceId];

        if (event.button === 0) { // LPM: Niszczenie
            this.world.removeBlockAt(pos.x, pos.y, pos.z);
        } else if (event.button === 2) { // PPM: Budowanie
            const normal = this.intersect.face.normal;
            
            // Oblicz pozycję nowego bloku
            const newX = Math.round(pos.x + normal.x);
            const newY = Math.round(pos.y + normal.y);
            const newZ = Math.round(pos.z + normal.z);

            // Sprawdź czy nie budujemy wewnątrz gracza (głowa i nogi)
            const playerPos = this.camera.position;
            const playerFeetY = playerPos.y - 1.6;
            
            // Proste sprawdzanie kolizji AABB dla gracza (szerokość ok 0.6, wysokość 1.8)
            const isColliding = 
                Math.abs(newX - playerPos.x) < 0.6 &&
                Math.abs(newZ - playerPos.z) < 0.6 &&
                newY >= Math.floor(playerFeetY) && 
                newY <= Math.ceil(playerPos.y);

            if (!isColliding) {
                this.world.addBlock(newX, newY, newZ, this.selectedType);
            }
        }
    }

    dispose() {
        this.scene.remove(this.highlightBox);
        this.highlightBox.geometry.dispose();
        this.highlightBox.material.dispose();
    }
}
