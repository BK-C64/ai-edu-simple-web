# Architektura Systemu: Voxel Engine 3D (Minecraft Prototyp)

Ten dokument opisuje strukturę i decyzje projektowe podjęte podczas budowy prototypu.

## 1. Struktura Katalogów (ES6 Modules)
Zastosowano modularną strukturę, aby odizolować logikę gry od renderowania:
- `/src/core/`: Główny silnik gry (`Game.js`), pętla `requestAnimationFrame`, obsługa renderera Three.js i oświetlenia.
- `/src/world/`: Logika świata i generowania terenu (`World.js`).
- `/src/entities/`: Obiekty interaktywne, w tym gracz (`Player.js`) z logiką FPP.
- `/src/systems/`: (W przygotowaniu) Systemy pomocnicze, np. fizyka, raycasting, UI.

## 2. Kluczowe Decyzje Techniczne (Etap 1)

### Silnik Renderujący
- Wykorzystano **Three.js** (v0.160.0) ładowany przez ESM/CDN.
- Zastosowano `PerspectiveCamera` oraz `WebGLRenderer` z obsługą cieni (`shadowMap`).
- Dodano mgłę (`THREE.Fog`), aby zwiększyć głębię i przygotować grunt pod optymalizację dystansu rysowania (Etap 6).

### Gracz i Fizyka (FPP)
- **Pointer Lock API**: Umożliwia przejęcie kursora myszy dla naturalnego sterowania FPP.
- **Fizyka**: Zaimplementowano uproszczony model fizyczny:
  - Grawitacja działająca w osi Y.
  - Skok (`Space`) dostępny tylko przy kontakcie z podłożem (`canJump`).
  - Bezwładność (tłumienie prędkości) dla płynniejszego ruchu.
- **Sterowanie**: Klasyczne WSAD z normalizacją wektora kierunku (stała prędkość przy ruchu po skosie).

### Świat (Voxel Data)
- Obecnie każdy blok jest osobnym obiektem `THREE.Mesh` z własną geometrią `BoxGeometry`.
- **Uwaga**: To podejście jest mało wydajne przy większych skalach. W Etapie 2/3 planowane jest przejście na `InstancedMesh` lub scalanie geometrii (Face Culling), aby zredukować liczbę Draw Calls.

## 3. Komunikacja między Modułami
- `Game.js` jest centralnym punktem (Orchestrator). Inicjalizuje świat i gracza, a następnie w pętli `update()` wywołuje ich własne metody aktualizacji stanu.
- Gracz posiada bezpośredni dostęp do swojej kamery, co pozwala na separację logiki sterowania od reszty systemów.

---
*Dokument aktualizowany po każdym etapie projektu.*
