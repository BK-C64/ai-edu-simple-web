import * as THREE from 'three';

export class TextureLoader {
    constructor() {
        this.loader = new THREE.TextureLoader();
        this.textures = {};
    }

    generateNoiseTexture(color1, color2, size = 16) {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                const ratio = Math.random();
                const r = Math.floor(color1.r * (1 - ratio) + color2.r * ratio);
                const g = Math.floor(color1.g * (1 - ratio) + color2.g * ratio);
                const b = Math.floor(color1.b * (1 - ratio) + color2.b * ratio);
                ctx.fillStyle = `rgb(${r},${g},${b})`;
                ctx.fillRect(x, y, 1, 1);
            }
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;
        return texture;
    }

    loadDefaultTextures() {
        this.textures.grass = this.generateNoiseTexture({r: 76, g: 175, b: 80}, {r: 56, g: 142, b: 60});
        this.textures.dirt = this.generateNoiseTexture({r: 139, g: 69, b: 19}, {r: 101, g: 67, b: 33});
        this.textures.stone = this.generateNoiseTexture({r: 128, g: 128, b: 128}, {r: 100, g: 100, b: 100});
        this.textures.wood = this.generateNoiseTexture({r: 139, g: 115, b: 85}, {r: 100, g: 80, b: 60});
        
        // Specjalna tekstura dla trawy (góra inna niż boki) - uproszczenie: użyjemy tej samej dla wszystkich ścian na razie
        // lub zrobimy prosty atlas/multi-material później.
        
        return this.textures;
    }
}
