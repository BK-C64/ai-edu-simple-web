import * as THREE from 'three';

export class Interaction {
    constructor(camera, scene, world) {
        this.camera = camera;
        this.scene = scene;
        this.world = world;
        
        this.raycaster = new THREE.Raycaster();
        this.raycaster.far = 5; // Zasięg 5 jednostek

        // Wizualny highlight dla wskazywanego bloku
        const highlightGeometry = new THREE.BoxGeometry(1.01, 1.01, 1.01);
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
    }

    update() {
        // Raycast z centrum ekranu (0, 0 w układzie Three.js to środek)
        this.raycaster.setFromCamera({ x: 0, y: 0 }, this.camera);
        
        // Sprawdź kolizję tylko z blokami świata
        const intersects = this.raycaster.intersectObjects(this.world.getBlocks(), false);

        if (intersects.length > 0) {
            this.intersect = intersects[0];
            const mesh = this.intersect.object;
            
            // Przesuń highlight do pozycji bloku
            this.highlightBox.position.copy(mesh.position);
            this.highlightBox.visible = true;
        } else {
            this.intersect = null;
            this.highlightBox.visible = false;
        }
    }

    onMouseDown(event) {
        if (!this.intersect) return;

        if (event.button === 0) { // LPM: Niszczenie
            this.world.removeBlock(this.intersect.object);
        } else if (event.button === 2) { // PPM: Budowanie
            const normal = this.intersect.face.normal;
            const pos = this.intersect.object.position;
            
            // Oblicz pozycję nowego bloku na podstawie wektora normalnego trafionej powierzchni
            const newX = pos.x + normal.x;
            const newY = pos.y + normal.y;
            const newZ = pos.z + normal.z;

            this.world.addBlock(newX, newY, newZ, 'grass');
        }
    }

    dispose() {
        // Sprzątanie
        this.scene.remove(this.highlightBox);
        this.highlightBox.geometry.dispose();
        this.highlightBox.material.dispose();
    }
}
