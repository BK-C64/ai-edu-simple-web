# Projekt Edukacyjny: Voxel Engine 3D (Minecraft Prototyp)

To jest projekt edukacyjny, którego celem jest budowa zaawansowanego prototypu gry 3D typu Minecraft, działającego w 100% w przeglądarce przy użyciu technologii WebGL (Three.js).

## Metodologia Pracy

W projekcie wykorzystujemy wyspecjalizowanych agentów Gemini CLI:

1.  **Product Manager (`product-manager`)**:
    *   Definiuje mechaniki gry, systemy (inwentarz, biomy, cykl dobowy).
    *   Zarządza specyfikacją w `wymagania/minecraft_prototyp.md`.
    *   Dba o to, by każdy z 6 etapów dostarczał grywalny "przyrost" (Increment).

2.  **Software Developer (`software-developer-pl`)**:
    *   Implementuje architekturę 3D opartą na modułach ES6.
    *   Optymalizuje renderowanie (Face Culling, BufferGeometry, InstancedMesh).
    *   Odpowiada za fizykę, raycasting (budowanie/niszczenie) i logikę świata.

## Zasady Techniczne

*   **Silnik**: Three.js (ładowany przez CDN/ESM).
*   **Architektura**: Modularna (Core, World, Player, UI).
*   **Wydajność**: Każda decyzja projektowa musi uwzględniać płynność (docelowo 60 FPS).
*   **Brak Serwera**: Gra działa lokalnie (wymaga prostego serwera HTTP do obsługi modułów JS).
*   **Cel**: Edukacja w zakresie matematyki 3D, grafiki komputerowej i optymalizacji kodu.
