import * as THREE from 'three';
import { TextureLoader } from '../systems/TextureLoader.js';

export class World {
    constructor(scene) {
        this.scene = scene;
        this.blockSize = 1;
        this.worldSize = 32;
        
        this.textureLoader = new TextureLoader();
        const textures = this.textureLoader.loadDefaultTextures();

        this.boxGeometry = new THREE.BoxGeometry(this.blockSize, this.blockSize, this.blockSize);
        this.materials = {
            grass: new THREE.MeshStandardMaterial({ map: textures.grass }),
            dirt: new THREE.MeshStandardMaterial({ map: textures.dirt }),
            stone: new THREE.MeshStandardMaterial({ map: textures.stone }),
            wood: new THREE.MeshStandardMaterial({ map: textures.wood })
        };

        // Dane świata: Mapa "x,y,z" -> typ bloku
        this.blocksData = new Map();
        
        // InstancedMeshes dla każdego typu
        this.instancedMeshes = {};
        this.maxInstancesPerType = 10000; // Z zapasem

        this.initInstancedMeshes();
        
        // Próba załadowania świata, jeśli nie ma - generujemy nowy
        if (!this.loadWorld()) {
            this.generateWorld();
            this.saveWorld();
        }
        
        this.updateInstancedMeshes();
    }

    initInstancedMeshes() {
        Object.keys(this.materials).forEach(type => {
            const mesh = new THREE.InstancedMesh(
                this.boxGeometry, 
                this.materials[type], 
                this.maxInstancesPerType
            );
            mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.userData.isBlock = true;
            mesh.userData.type = type;
            mesh.count = 0; // Początkowo zero widocznych
            
            this.scene.add(mesh);
            this.instancedMeshes[type] = mesh;
        });
    }

    generateWorld() {
        for (let x = 0; x < this.worldSize; x++) {
            for (let z = 0; z < this.worldSize; z++) {
                this.setBlockData(x, 0, z, 'grass');
                this.setBlockData(x, -1, z, 'dirt');
                // Dodajmy trochę kamienia głębiej
                this.setBlockData(x, -2, z, 'stone');
            }
        }
    }

    setBlockData(x, y, z, type) {
        const key = `${Math.round(x)},${Math.round(y)},${Math.round(z)}`;
        if (type) {
            this.blocksData.set(key, type);
        } else {
            this.blocksData.delete(key);
        }
    }

    addBlock(x, y, z, type = 'grass') {
        this.setBlockData(x, y, z, type);
        this.updateInstancedMeshes();
        this.saveWorld();
    }

    removeBlockAt(x, y, z) {
        this.setBlockData(x, y, z, null);
        this.updateInstancedMeshes();
        this.saveWorld();
    }

    // Dla kompatybilności z Interaction.js (chwilowej)
    removeBlock(intersectObject, instanceId) {
        if (instanceId === undefined) return;
        
        const type = intersectObject.userData.type;
        const mapping = intersectObject.userData.instanceMapping;
        if (mapping && mapping[instanceId]) {
            const {x, y, z} = mapping[instanceId];
            this.removeBlockAt(x, y, z);
        }
    }

    updateInstancedMeshes() {
        const typeGroups = {};
        Object.keys(this.materials).forEach(type => typeGroups[type] = []);

        // Pogrupuj bloki wg typu
        this.blocksData.forEach((type, key) => {
            if (typeGroups[type]) {
                const [x, y, z] = key.split(',').map(Number);
                typeGroups[type].push({x, y, z});
            }
        });

        // Aktualizuj każdą InstancedMesh
        Object.keys(this.instancedMeshes).forEach(type => {
            const mesh = this.instancedMeshes[type];
            const blocks = typeGroups[type];
            mesh.count = Math.min(blocks.length, this.maxInstancesPerType);
            
            const matrix = new THREE.Matrix4();
            const mapping = [];

            blocks.forEach((pos, i) => {
                if (i >= this.maxInstancesPerType) return;
                matrix.setPosition(pos.x, pos.y, pos.z);
                mesh.setMatrixAt(i, matrix);
                mapping[i] = pos;
            });

            mesh.instanceMatrix.needsUpdate = true;
            mesh.userData.instanceMapping = mapping; // Zapamiętaj mapowanie dla raycastingu
        });
    }

    saveWorld() {
        const data = [];
        this.blocksData.forEach((type, key) => {
            const [x, y, z] = key.split(',').map(Number);
            data.push({x, y, z, type});
        });
        localStorage.setItem('minecraft_world_v1', JSON.stringify(data));
    }

    loadWorld() {
        const saved = localStorage.getItem('minecraft_world_v1');
        if (!saved) return false;
        
        try {
            const data = JSON.parse(saved);
            this.blocksData.clear();
            data.forEach(b => {
                this.setBlockData(b.x, b.y, b.z, b.type);
            });
            return true;
        } catch (e) {
            console.error("Failed to load world", e);
            return false;
        }
    }

    getBlocks() {
        // Zwracamy tablicę InstancedMeshes dla raycastingu
        return Object.values(this.instancedMeshes);
    }

    getBlockAt(x, y, z) {
        const key = `${Math.round(x)},${Math.round(y)},${Math.round(z)}`;
        const type = this.blocksData.get(key);
        if (!type) return null;
        // Zwracamy uproszczony obiekt udający mesh dla kompatybilności z Player.js
        return { 
            position: { x: Math.round(x), y: Math.round(y), z: Math.round(z) }, 
            type 
        };
    }
}
