# Projekt Edukacyjny: Zaawansowany Prototyp 3D Voxel Engine (Minecraft)

Ten projekt ma na celu naukę grafiki 3D, matematyki w grach (wektory, macierze) oraz **zaawansowanej optymalizacji frontendowej** przy użyciu biblioteki **Three.js**.

## Cel Projektu
Budowa zaawansowanego prototypu silnika voxelowego (Minecraft Clone) działającego w przeglądarce, z obsługą budowania, niszczenia, proceduralnego terenu i cyklu dobowego.

## Główne Cele Edukacyjne
- **Grafika 3D i WebGL**: Zrozumienie renderowania w przestrzeni trójwymiarowej.
- **Wydajność (Optimization)**: Zarządzanie tysiącami obiektów (Chunks, Face Culling).
- **Proceduralna Generacja**: Wykorzystanie szumu (Perlin Noise) do tworzenia terenu.
- **Mechanika Gry**: Implementacja fizyki (grawitacja, kolizje) i interakcji (Raycasting).

## Struktura Pracy (6 Etapów Agile)
1. **MVP - Silnik i Świat**: Scena 3D, sterowanie FPP i pierwsze pole trawy.
2. **Budowanie i Niszczenie**: Interakcja ze światem (Raycasting, blokada kursora).
3. **Oprawa i System Bloków**: Tekstury, oświetlenie i zapis stanu gry.
4. **GUI i Inwentarz**: HUD (Hotbar), wybór bloków i pasek zdrowia/wyboru.
5. **Dynamiczne Środowisko**: Cykl dnia i nocy, mgła i animacja chmur.
6. **Nieskończony Świat**: System Chunków i proceduralna generacja terenu.

## Uruchamianie
Projekt wykorzystuje natywne moduły JavaScript (ES6 Modules) oraz bibliotekę Three.js ładowaną przez CDN. Wymaga lokalnego serwera HTTP:

```bash
python -m http.server 8000
```
Następnie otwórz `http://localhost:8000` w przeglądarce. Cała logika renderowania i fizyki odbywa się po stronie klienta (GPU/CPU).
