export class UI {
    constructor() {
        this.hotbarSlots = document.querySelectorAll('#hotbar .slot');
        this.inventoryOverlay = document.getElementById('inventory-overlay');
        this.overlay = document.getElementById('overlay');
        
        this.activeSlotIndex = 0;
        this.isInventoryOpen = false;
        
        // Mapowanie typów bloków do slotów (indeksy 0-3 mają przypisane typy)
        this.blockTypes = ['grass', 'dirt', 'stone', 'wood', null, null, null, null, null];
        
        this.initListeners();
    }

    initListeners() {
        // Kliknięcie w slot (zarówno w hotbarze jak i inwentarzu)
        const allSlots = document.querySelectorAll('.slot');
        allSlots.forEach((slot) => {
            slot.addEventListener('click', (e) => {
                const slotIndex = slot.getAttribute('data-slot');
                if (slotIndex !== null) {
                    this.activeSlotIndex = parseInt(slotIndex) % 9;
                    this.updateHotbarVisuals();
                    
                    // Jeśli kliknięto w inwentarzu, możemy opcjonalnie zamknąć go
                    // ale w Minecraft zostaje otwarty. Tu zostawimy otwarty.
                }
            });
        });

        // Mouse wheel for hotbar selection
        window.addEventListener('wheel', (e) => {
            if (this.isInventoryOpen) return;
            
            if (e.deltaY > 0) {
                this.activeSlotIndex = (this.activeSlotIndex + 1) % 9;
            } else {
                this.activeSlotIndex = (this.activeSlotIndex - 1 + 9) % 9;
            }
            this.updateHotbarVisuals();
        });

        // Number keys 1-9
        window.addEventListener('keydown', (e) => {
            if (this.isInventoryOpen && e.key !== 'e' && e.key !== 'E' && e.key !== 'Escape') return;

            if (e.key >= '1' && e.key <= '9') {
                this.activeSlotIndex = parseInt(e.key) - 1;
                this.updateHotbarVisuals();
            }

            if (e.key.toLowerCase() === 'e') {
                this.toggleInventory();
            }

            if (e.key === 'Escape' && this.isInventoryOpen) {
                this.toggleInventory();
            }
        });
    }

    updateHotbarVisuals() {
        this.hotbarSlots.forEach((slot, index) => {
            if (index === this.activeSlotIndex) {
                slot.classList.add('active');
            } else {
                slot.classList.remove('active');
            }
        });
    }

    toggleInventory() {
        this.isInventoryOpen = !this.isInventoryOpen;
        this.inventoryOverlay.classList.toggle('hidden', !this.isInventoryOpen);
        
        if (this.isInventoryOpen) {
            document.exitPointerLock();
        }

        // Dispatch custom event so other systems can react (e.g., stop player movement)
        window.dispatchEvent(new CustomEvent('inventoryToggled', { detail: { isOpen: this.isInventoryOpen } }));
    }

    getSelectedBlockType() {
        return this.blockTypes[this.activeSlotIndex];
    }

    showOverlay(show) {
        this.overlay.classList.toggle('hidden', !show);
    }
}
