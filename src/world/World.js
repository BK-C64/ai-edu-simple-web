import * as THREE from 'three';

export class World {
    constructor(scene) {
        this.scene = scene;
        this.blockSize = 1;
        this.worldSize = 32;
        
        // Wspólne geometrie i materiały dla oszczędności pamięci
        this.boxGeometry = new THREE.BoxGeometry(this.blockSize, this.blockSize, this.blockSize);
        this.materials = {
            grass: new THREE.MeshStandardMaterial({ color: 0x4caf50 }),
            dirt: new THREE.MeshStandardMaterial({ color: 0x8b4513 }),
            stone: new THREE.MeshStandardMaterial({ color: 0x808080 })
        };

        this.blocks = [];
        this.generateWorld();
    }

    generateWorld() {
        // Generowanie pola 16x16 bloków (trawa i ziemia)
        for (let x = 0; x < this.worldSize; x++) {
            for (let z = 0; z < this.worldSize; z++) {
                this.addBlock(x, 0, z, 'grass');
                this.addBlock(x, -1, z, 'dirt');
            }
        }
    }

    addBlock(x, y, z, type = 'grass') {
        const material = this.materials[type] || this.materials.grass;
        const mesh = new THREE.Mesh(this.boxGeometry, material);
        mesh.position.set(x, y, z);
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        
        // Oznaczamy mesh jako blok dla łatwiejszego filtrowania w raycastingu
        mesh.userData.isBlock = true;
        
        this.scene.add(mesh);
        this.blocks.push(mesh);
        return mesh;
    }

    removeBlock(mesh) {
        if (!mesh) return;
        
        // Usunięcie ze sceny
        this.scene.remove(mesh);
        
        // Usunięcie z tablicy bloków
        const index = this.blocks.indexOf(mesh);
        if (index > -1) {
            this.blocks.splice(index, 1);
        }

        // UWAGA: Nie robimy mesh.geometry.dispose() ani mesh.material.dispose() tutaj,
        // ponieważ współdzielimy je między wszystkimi blokami.
        // Jeśli każdy blok miałby unikalną geometrię/materiał, wtedy byłoby to konieczne.
    }

    getBlocks() {
        return this.blocks;
    }

    getBlockAt(x, y, z) {
        // Bardzo prosta detekcja na podstawie pozycji meshów
        // W docelowym silniku użylibyśmy tablicy 3D lub mapy
        return this.blocks.find(block => 
            Math.round(block.position.x) === Math.round(x) &&
            Math.round(block.position.y) === Math.round(y) &&
            Math.round(block.position.z) === Math.round(z)
        );
    }
}
