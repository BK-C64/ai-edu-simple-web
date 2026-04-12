# Wymagania: Minecraft Prototyp 3D (Voxel Engine)

## Cel Projektu
Stworzenie zaawansowanego Proof of Concept (POC) silnika voxelowego typu Minecraft, działającego w 100% po stronie klienta (Pure Frontend). Projekt służy nauce grafiki 3D, optymalizacji renderowania (buforowanie geometrii) oraz implementacji fizyki w JavaScript.

## Wymagania Funkcjonalne
- Renderowanie świata złożonego z bloków (voxeli).
- Poruszanie się postaci w widoku pierwszej osoby (FPP) przy użyciu klawiatury i myszy.
- Interakcja ze światem: niszczenie bloków (LPM) i stawianie bloków (PPM).
- Obsługa różnych typów bloków (np. trawa, ziemia, kamień, drewno).
- System kolizji oraz prosta fizyka (grawitacja działająca na postać gracza).

## Wymagania Niefunkcjonalne
- **Platforma**: Prototyp uruchamiany w przeglądarce internetowej.
- **Docelowe Urządzenie**: Komputer Windows PC, ekran o rozdzielczości HD (1920x1080).
- **Technologia**: Czysty HTML, CSS i JavaScript (ES6 Modules) z wykorzystaniem biblioteki Three.js (WebGL).
- **Wydajność**: Zastosowanie technik optymalizacyjnych (np. instancing lub łączenie geometrii) w celu zapewnienia płynności działania.
- **Interfejs**: Obsługa Pointer Lock API dla sterowania myszą jak w grach FPS.

## Architektura Projektu (Techniczna)
Projekt opiera się na profesjonalnej strukturze modułowej (ES6 Modules), zapewniającej skalowalność i łatwość rozbudowy:

### 1. Core Engine
- **Game.js**: Główna pętla gry (RequestAnimationFrame), inicjalizacja i konfiguracja bazowych komponentów Three.js (Scene, Camera, Renderer). Koordynuje przepływ danych między modułami.
- **Input.js**: Scentralizowana obsługa wejścia (klawiatura, myszka). Implementuje Pointer Lock API oraz mapowanie klawiszy na akcje w grze.

### 2. World Management
- **World.js**: Zarządzanie danymi o świecie. Przechowuje stan wszystkich bloków (Voxel Data) i zarządza cyklem życia Chunków.
- **Chunk.js**: Logika generowania pojedynczego fragmentu świata (np. 16x16x16). Odpowiada za wydajny "meshing" – generowanie geometrii Three.js z zastosowaniem optymalizacji ścianek (Face Culling).
- **TerrainGenerator.js**: Silnik generowania proceduralnego wykorzystujący algorytmy szumu (np. Perlin/Simplex Noise) do tworzenia naturalnych formacji terenu.

### 3. Entities & Player
- **Player.js**: Implementacja fizyki pierwszej osoby. Obsługuje poruszanie się, skakanie, grawitację oraz detekcję kolizji z geometrią świata (AABB).
- **Interaction.js**: Wykorzystuje Raycasting do precyzyjnego wykrywania bloków, na które patrzy gracz, umożliwiając ich niszczenie i stawianie.

### 4. UI & Systems
- **UI.js**: Warstwa interfejsu użytkownika zbudowana w HTML/CSS. Obsługuje HUD (celownik), pasek szybkiego wyboru (Hotbar), ekrany menu i inwentarz.
- **TextureLoader.js**: Zarządzanie zasobami graficznymi. Ładowanie atlasów tekstur, mapowanie UV dla bloków oraz konfiguracja materiałów Three.js.

### Kluczowe Zasady Projektowe:
- **Separation of Concerns**: Wyraźne oddzielenie logiki renderowania (Three.js) od logicznej reprezentacji danych świata (Voxel Array).
- **Performance First**: Minimalizacja liczby obiektów w scenie i wywołań Draw Calls poprzez optymalny meshing (BufferGeometry) i Face Culling (renderowanie tylko widocznych ścianek).
- **Single Source of Truth**: Centralny stan świata w `World.js` jest jedynym źródłem prawdy, z którym synchronizowana jest warstwa wizualna.

## Etapy Realizacji (Przyrosty)

### Etap 1: Silnik Renderujący i Pierwszy Świat
**Cel dla użytkownika**: Zobaczenie trójwymiarowego świata i możliwość rozglądania się.
- **Zakres funkcjonalny**:
    - Konfiguracja sceny Three.js, kamery FPP i podstawowego oświetlenia.
    - Generowanie terenu o rozmiarze 16x16 bloków z jednego typu (trawa).
    - Implementacja podstawowego poruszania się kamery (lot swobodny).
- **Kryteria akceptacji**:
    - Po uruchomieniu strony generuje się płaszczyzna 16x16 bloków.
    - Użytkownik może poruszać się po scenie za pomocą klawiszy WSAD.

### Etap 2: Interakcja i Mechanika Budowania
**Cel dla użytkownika**: Możliwość wpływania na kształt terenu.
- **Zakres funkcjonalny**:
    - Implementacja Pointer Lock API (blokada myszy wewnątrz okna gry).
    - Mechanika Raycastingu do wskazywania konkretnych bloków.
    - Usuwanie bloków po kliknięciu LPM.
    - Stawianie nowych bloków po kliknięciu PPM.
    - Dodanie grawitacji i kolizji z blokami dla gracza.
- **Kryteria akceptacji**:
    - Gracz może niszczyć i budować struktury z bloków.
    - Gracz nie przenika przez postawione bloki i opada na teren.

### Etap 3: Zaawansowana Oprawa i System Bloków
**Cel dla użytkownika**: Bardziej różnorodny i wydajny świat.
- **Zakres funkcjonalny**:
    - System wielu typów bloków (ziemia, kamień, drewno) z unikalnymi teksturami.
    - Optymalizacja renderowania (BufferGeometry) dla zachowania wysokiej liczby FPS przy większej skali świata.
    - Prosty interfejs wyboru aktywnego bloku.
    - (Opcjonalnie) Zapisywanie zmian w świecie do `localStorage`.
- **Kryteria akceptacji**:
    - Dostępne są co najmniej 4 rodzaje bloków z teksturami.
    - Prototyp działa płynnie (min. 60 FPS) na docelowym sprzęcie.

### Etap 4: System Inwentarza i GUI
**Cel dla użytkownika**: Możliwość wygodnego wyboru materiałów budowlanych.
- **Zakres funkcjonalny**:
    - Implementacja paska szybkiego wyboru (Hotbar) na dole ekranu przy użyciu HTML/CSS.
    - Wybór bloków (trawa, ziemia, kamień, deski) za pomocą klawiszy 1, 2, 3, 4 lub kółka myszy.
    - Graficzna reprezentacja aktywnego slotu w inwentarzu.
    - Interfejs użytkownika (HUD) wyświetlający celownik (crosshair) na środku ekranu.
- **Kryteria akceptacji**:
    - Użytkownik widzi nakładkę GUI z 4 slotami na bloki.
    - Wybrany blok jest wizualnie wyróżniony w inwentarzu i to on jest stawiany po kliknięciu PPM.

### Etap 5: Dynamiczne Środowisko i Atmosfera
**Cel dla użytkownika**: Poczucie realizmu dzięki cyklowi dobowemu i efektom pogodowym.
- **Zakres funkcjonalny**:
    - Implementacja cyklu dnia i nocy (płynna zmiana koloru nieba/background oraz natężenia światła).
    - System mgły (Three.js Fog) reagujący na porę dnia (np. gęstsza w nocy).
    - Prosta animacja chmur przemieszczających się nad światem.
    - Dźwięki otoczenia lub interakcji (opcjonalnie).
- **Kryteria akceptacji**:
    - Scena płynnie przechodzi między dniem a nocą w czasie rzeczywistym.
    - Mgła estetycznie maskuje krawędzie renderowanego świata, dopasowując kolor do nieba.

### Etap 6: Nieskończony Świat i Optymalizacja
**Cel dla użytkownika**: Eksploracja nieograniczonego, proceduralnego terenu.
- **Zakres funkcjonalny**:
    - Generowanie terenu oparte o szum Perlina (wzgórza, doliny, jaskinie).
    - System "Chunków" (podział świata na sekcje np. 16x16x16 bloków).
    - Dynamiczne ładowanie chunków wokół gracza i usuwanie tych zbyt oddalonych.
    - Optymalizacja "Culling" (nie renderowanie niewidocznych ścianek bloków wewnątrz brył).
- **Kryteria akceptacji**:
    - Świat generuje się automatycznie podczas marszu gracza.
    - System utrzymuje stałą liczbę klatek na sekundę mimo zwiększania eksplorowanego obszaru.
    - Teren posiada naturalne ukształtowanie (pagórki), a nie jest tylko płaską powierzchnią.

## Instrukcja Uruchomienia
1. Projekt wykorzystuje moduły ES6, dlatego wymaga uruchomienia przez lokalny serwer HTTP.
2. Można użyć komendy: `python -m http.server 8000`.
3. Otwórz `http://localhost:8000` w przeglądarce Chrome lub Edge.
