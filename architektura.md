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

### Interakcja i Budowanie (Etap 2)
- **Raycasting**: Wprowadzono moduł `src/systems/Interaction.js` wykorzystujący `THREE.Raycaster` do wykrywania bloków w zasięgu 5 jednostek od kamery.
- **System Modyfikacji Świata**:
  - `LPM`: Usuwanie bloków.
  - `PPM`: Stawianie nowych bloków na podstawie normalnej ściany.
- **Highlight**: Półprzezroczysty mesh typu wireframe wskazuje aktualnie celowany blok.

### Zaawansowana Oprawa i System Bloków (Etap 3)
- **Instanced Rendering**: Przejście z indywidualnych Meshów na `THREE.InstancedMesh` dla każdego typu bloku. Pozwoliło to na znaczną redukcję Draw Calls (z ~1000 do liczby typów bloków).
- **System Tekstur**: Dodano `TextureLoader.js` generujący proceduralne tekstury szumu (Canvas API) dla Trawy, Ziemi, Kamienia i Drewna. Tekstury są filtrowane metodą `NearestFilter` dla uzyskania "pixel-artowego" wyglądu.
- **Trwałość Danych**: Zaimplementowano zapis i odczyt stanu świata z `localStorage`. Dane są serializowane do formatu JSON (x, y, z, type).
- **Ulepszone Wizualia**:
  - Zastosowano `THREE.FogExp2` dla bardziej naturalnego efektu mgły.
  - Skonfigurowano `PCFSoftShadowMap` dla miękkich cieni.
  - Dodano HUD informacyjny oraz celownik (Crosshair) w HTML/CSS.
- **Zarządzanie Stanem**: `World.js` przechowuje teraz dane w strukturze `Map`, co pozwala na szybki dostęp do informacji o blokach bez polegania na scenie Three.js.

### System Inwentarza i GUI (Etap 4)
- **UI.js**: Zarządza warstwą interfejsu użytkownika (Hotbar, Inwentarz).
  - Obsługuje wybór slotu kółkiem myszy i klawiszami 1-9.
  - Kontroluje otwieranie/zamykanie Inwentarza (`E`), co automatycznie zwalnia kursor myszy i wstrzymuje ruch gracza.
  - Komunikuje się z innymi systemami poprzez zdarzenia (`inventoryToggled`).
- **TextureLoader.js**: (Etap 3) Zarządzanie zasobami graficznymi.

## 3. Standardy Kodowania i Stylizacji
- **Separacja Stylów (CSS)**: Wszystkie style interfejsu (HUD, Inwentarz, Hotbar) są przechowywane w zewnętrznym pliku `src/style.css`.
- **Zarządzanie Stanem UI**: Logika JavaScript nie manipuluje bezpośrednio stylami inline (`element.style`). Zamiast tego wykorzystuje API `classList` (np. `classList.toggle('hidden')`) do przełączania stanów widoczności i wyglądu.
- **Jednostki i Zmienne**: Wykorzystano zmienne CSS (`:root`) do definiowania kolorów i parametrów UI, co ułatwia późniejszą personalizację wyglądu silnika.

## 4. Komunikacja między Modułami
- `Game.js` jest centralnym punktem (Orchestrator). Inicjalizuje świat, gracza oraz UI. Koordynuje przepływ zdarzeń i stan pauzy (Inwentarz).
- `Interaction.js` pobiera informację o aktualnie wybranym bloku z instancji `UI`.
- `Player.js` reaguje na stan Inwentarza, blokując poruszanie się, gdy interfejs jest otwarty.

---
*Dokument aktualizowany po każdym etapie projektu.*
