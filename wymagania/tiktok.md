# Wymagania Produktowe: Prototyp TikTok Feed

## 1. Cel i Wizja Produktu
Celem projektu jest stworzenie edukacyjnego prototypu strony głównej serwisu TikTok (TikTok feed) w wersji desktopowej. Prototyp ma służyć jako narzędzie do nauki budowania nowoczesnych interfejsów użytkownika, skupiając się na płynnym przeglądaniu treści wideo oraz interakcjach społecznościowych.

## 2. Główne Funkcjonalności
*   **Pionowy Feed Wideo**: Możliwość przewijania filmów w dół i w górę.
*   **Interakcje pod Filmem**:
    *   **Polubienie (Like)**: Przycisk serca zmieniający stan (kolor) po kliknięciu.
    *   **Komentowanie**: Przycisk otwierający (wizualnie) sekcję komentarzy lub licznik.
    *   **Udostępnianie**: Przycisk udostępniania treści.
*   **Autoodtwarzanie**: Film powinien sprawiać wrażenie aktywnego (wizualny wskaźnik odtwarzania/pasek postępu).
*   **Nawigacja**: Przełączanie się między głównymi sekcjami serwisu.

## 3. Elementy UI (Interfejs Użytkownika)
*   **Pasek Boczny (Sidebar)**:
    *   Ikony: "Dla Ciebie" (aktywna), "Obserwowani", "Explore", "LIVE".
    *   Sekcja "Polecane konta" (opcjonalnie, wizualna).
*   **Główna Sekcja Feed**:
    *   Wyśrodkowany kontener na wideo.
    *   **Nakładka na wideo (Overlay)**:
        *   Nazwa użytkownika (@nick) i opis filmu (caption).
        *   Użyte hashtagi (np. #frontend #edu).
        *   Informacja o ścieżce dźwiękowej.
    *   **Prawy panel akcji**: Pionowy pasek z ikonami (Awatar twórcy z przyciskiem plus, Serce, Komentarz, Zakładka, Udostępnij).
*   **Pasek wyszukiwania**: Na górze strony.

## 4. Historyjki Użytkownika (User Stories)

### US 1: Przeglądanie treści
**Jako uczeń**, chcę płynnie przewijać filmy w sekcji "Dla Ciebie", aby móc przeglądać kolejne materiały wideo bez przeładowywania strony.
*   **Kryteria akceptacji**:
    *   Filmy są ułożone jeden pod drugim.
    *   Można przewijać feed za pomocą myszki lub klawiatury.
    *   Wideo zajmuje centralną część ekranu.

### US 2: Interakcja z wideo
**Jako użytkownik**, chcę polubić film, który mi się spodobał, aby zobaczyć wizualną informację zwrotną o podjętej akcji.
*   **Kryteria akceptacji**:
    *   Kliknięcie w ikonę serca zmienia jego kolor na czerwony.
    *   Ponowne kliknięcie cofa polubienie.
    *   Licznik polubień pod ikoną (statyczny lub inkrementujący).

### US 3: Identyfikacja twórcy
**Jako użytkownik**, chcę widzieć kto jest autorem filmu, aby móc rozpoznać moich ulubionych twórców.
*   **Kryteria akceptacji**:
    *   Na każdym filmie widoczna jest nazwa profilu (np. @username).
    *   Widoczny jest opis filmu pod nazwą użytkownika.
    *   Widoczny jest awatar twórcy w panelu bocznym wideo.

## 5. Wymagania Niefunkcjonalne
*   **Technologia**: Rozwiązanie "Client-side only" (czysty HTML/CSS/JS). Brak backendu i bazy danych.
*   **Środowisko**: Prototyp uruchamiany w przeglądarce internetowej (Chrome/Edge).
*   **Platforma docelowa**: Windows PC.
*   **Rozdzielczość**: Zoptymalizowany pod ekran HD (1920x1080).
*   **Dane**: Dane o filmach (linki, opisy, autorzy) powinny być zapisane w stałej strukturze (np. tablica obiektów w JS).
*   **Responsywność**: Układ desktopowy (sidebar po lewej, feed na środku).

## 6. Ograniczenia
*   Brak rzeczywistego przesyłania danych na serwer.
*   Brak funkcjonalności logowania (symulacja zalogowanego użytkownika).
*   Wykorzystanie statycznych plików wideo lub placeholderów (np. z Pexels lub YouTube embed).
