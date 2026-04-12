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

## Architektura Projektu 
Projekt wykorzystuje modularną strukturę ES6 Modules, dzieląc odpowiedzialności na dedykowane katalogi i pliki:

### 1. Katalog `src/` (Główne pliki)
- **main.js**: Punkt wejścia aplikacji. Inicjalizuje klasę `Game` i zarządza pętlą animacji oraz zdarzeniami DOM (np. kliknięcie w overlay).
- **style.css**: Scentralizowany arkusz stylów dla całego interfejsu gry (HUD, Hotbar, Inwentarz, Overlay).

### 2. Katalog `src/core/` (Silnik)
- **Game.js**: Serce aplikacji. Zarządza sceną Three.js, rendererem, oświetleniem oraz koordynuje pracę gracza, świata i systemów interakcji/UI.

### 3. Katalog `src/world/` (Świat)
- **World.js**: Zarządza danymi bloków (Map) i ich wizualną reprezentacją (`InstancedMesh`). Odpowiada za generowanie, dodawanie, usuwanie oraz trwałość danych (LocalStorage).

### 4. Katalog `src/entities/` (Podmioty)
- **Player.js**: Kontroluje postać gracza (kamera FPP), implementuje fizykę (grawitacja, skok) oraz zaawansowaną detekcję kolizji z podłożem.

### 5. Katalog `src/systems/` (Systemy pomocnicze)
- **Interaction.js**: Realizuje mechanikę Raycastingu, niszczenia (LPM) i budowania (PPM) bloków, dbając o to, by nie budować "wewnątrz" gracza.
- **UI.js**: Zarządza interfejsem użytkownika (Hotbar, Inwentarz), obsługuje wybór bloków (klawisze, rolka myszy) oraz stany widoczności elementów GUI.
- **TextureLoader.js**: Generuje proceduralne tekstury bloków przy użyciu Canvas API, zapewniając unikalny wygląd bez zewnętrznych plików graficznych.

### Kluczowe Zasady Implementacji:
- **Instanced Rendering**: Wykorzystanie `THREE.InstancedMesh` w `World.js` dla optymalizacji wydajności (jeden Draw Call na typ bloku).
- **Separacja CSS**: Całkowite oddzielenie logiki JavaScript od stylizacji (brak stylów inline, użycie `classList`).
- **Data Persistence**: Automatyczny zapis i odczyt stanu świata z `LocalStorage`.
- **Event-Driven UI**: Komunikacja między UI a graczem/interakcją za pomocą niestandardowych zdarzeń (np. `inventoryToggled`).

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
