# Wymagania: Prototyp Serwisu Ogłoszeń Motoryzacyjnych

## Wymagania Funkcjonalne
- Przeglądanie listy ofert samochodów (widok kafelkowy).
- Wyszukiwanie ofert po nazwie/modelu.
- Filtrowanie zaawansowane (cena, rok, paliwo).
- Podgląd szczegółów wybranego ogłoszenia.
- Formularz dodawania nowego ogłoszenia (zapis do stanu aplikacji).

## Cel Projektu
Stworzenie zaawansowanego prototypu serwisu ogłoszeń motoryzacyjnych (typu OTOMOTO/OLX). Projekt służy do nauki zarządzania stanem aplikacji, dynamicznego filtrowania danych oraz budowania modułowej architektury w czystym JavaScript (Vanilla JS).

## Wymagania Niefunkcjonalne
- **Platforma**: Prototyp uruchamiany w przeglądarce internetowej.
- **Docelowe Urządzenie**: Komputer Windows PC, ekran o rozdzielczości HD (1920x1080).
- **Technologia**: Czysty HTML, CSS i JavaScript (ES6 Modules). Brak zewnętrznych frameworków.
- **Architektura**: Separacja warstw (Logic/Data/UI). Każdy etap musi dostarczać działający, testowalny prototyp.

## Architektura Projektu

Projekt został zaprojektowany w oparciu o nowoczesne wzorce architektury frontendowej, dostosowane do pracy z czystym JavaScriptem (Vanilla JS) i modułami ES6. Struktura ta promuje separację logiki od prezentacji oraz ułatwia rozbudowę aplikacji.

### 1. Struktura Katalogów
- `index.html` – główny punkt wejścia do aplikacji, definiujący szkielet HTML.
- `src/js/` – katalog zawierający logikę aplikacji podzieloną na moduły:
    - `app.js` – główny skrypt inicjalizujący aplikację i łączący poszczególne moduły.
    - `state.js` – moduł zarządzający centralnym stanem aplikacji (Single Source of Truth).
    - `ui.js` – moduł odpowiedzialny za bezpośrednią manipulację DOM i renderowanie komponentów.
    - `api.js` – moduł symulujący pobieranie danych (obsługa "mocków").
- `src/js/data/` – pliki JSON lub obiekty JS zawierające dane testowe (mocki ogłoszeń).
- `src/css/` – arkusze stylów podzielone tematycznie:
    - `base.css` – style bazowe, reset, zmienne.
    - `card.css` – style dla komponentu karty ogłoszenia.
    - `search.css` – style dla wyszukiwarki i filtrów.
- `src/assets/` – zasoby statyczne, takie jak obrazy samochodów i ikony.

### 2. Zasady Architektoniczne
- **Separation of Concerns (Rozdzielenie odpowiedzialności)**: Logika biznesowa (JS) jest całkowicie odizolowana od warstwy wizualnej (CSS) oraz struktury (HTML). Ułatwia to testowanie i modyfikację poszczególnych elementów bez wpływu na pozostałe.
- **Single Source of Truth (Jedno źródło prawdy)**: Cały stan aplikacji (aktualna lista ofert, aktywne filtry) jest przechowywany w jednym centralnym obiekcie w `state.js`. Wszystkie zmiany w UI wynikają bezpośrednio ze zmiany tego stanu.
- **Komponentowość**: Elementy interfejsu (np. karty samochodów) nie są wpisane na stałe w HTML. Są one generowane dynamicznie przez funkcje w `ui.js` na podstawie danych ze stanu.
- **Wykorzystanie ES6 Modules**: Projekt wykorzystuje natywne moduły JavaScript (`import` / `export`), co pozwala na zachowanie czystości w przestrzeni nazw i lepszą organizację kodu.

## Etapy Realizacji (Przyrost Wartości Użytkownika)

### Etap 1: Minimalna Strona Główna z Listą Samochodów (MVP)
**Cel dla użytkownika:** Szybki przegląd dostępnych ofert sprzedaży zaraz po wejściu na stronę.
- **Zakres funkcjonalny**:
    - Nagłówek serwisu i siatka (grid) z kartami pojazdów.
    - Karta zawiera: zdjęcie (placeholder), markę, model oraz cenę.
    - Dane ładowane z lokalnego zestawu danych (mock-up).
- **Wskazówki architektoniczne**:
    - Podział na pliki: `index.html`, `style.css`, `app.js`.
    - Stworzenie modułu `data.js` z tablicą obiektów reprezentujących pojazdy.
    - Logika renderowania kart przeniesiona do osobnej funkcji w `ui.js`.
- **Kryteria akceptacji**:
    - Po uruchomieniu strony widocznych jest min. 6 różnych ogłoszeń.
    - Układ strony jest przejrzysty i dostosowany do rozdzielczości HD.

### Etap 2: Wyszukiwanie i Szczegóły Ogłoszenia
**Cel dla użytkownika:** Możliwość znalezienia konkretnego modelu i zapoznania się z jego pełną specyfikacją.
- **Zakres funkcjonalny**:
    - Wyszukiwarka tekstowa na stronie głównej (filtrowanie po nazwie).
    - Widok szczegółów pojazdu aktywowany po kliknięciu w kartę (szczegółowe parametry: rok, przebieg, paliwo).
    - Możliwość powrotu z widoku szczegółów do listy głównej.
- **Wskazówki architektoniczne**:
    - Implementacja prostego "routera" opartego na przełączaniu widoczności sekcji (SPA - Single Page Application).
    - Dodanie obsługi zdarzeń (Event Listeners) dla wyszukiwarki i interakcji z kartami.
- **Kryteria akceptacji**:
    - Wpisanie marki w wyszukiwarkę natychmiast zawęża listę widocznych kart.
    - Kliknięcie w ogłoszenie poprawnie wyświetla dedykowany widok z danymi technicznymi tego konkretnego auta.

### Etap 3: Zaawansowane Filtrowanie
**Cel dla użytkownika:** Precyzyjne zawężenie wyników wyszukiwania do aut spełniających konkretne kryteria budżetowe i techniczne.
- **Zakres funkcjonalny**:
    - Panel boczny z filtrami: Zakres ceny (od-do), Rok produkcji, Rodzaj paliwa (dropdown).
    - Dynamiczny licznik "Znaleziono X ofert" aktualizowany w czasie rzeczywistym.
- **Wskazówki architektoniczne**:
    - Wprowadzenie centralnego obiektu stanu (`state`), przechowującego aktualne filtry.
    - Stworzenie modułu `logic.js` z czystymi funkcjami (pure functions) do filtrowania tablicy danych na podstawie stanu.
- **Kryteria akceptacji**:
    - Wybranie filtra (np. "Benzyna") powoduje natychmiastowe ukrycie aut z innym rodzajem paliwa.
    - Filtry działają kumulatywnie (np. Cena + Paliwo).

### Etap 4: Dodawanie Ogłoszenia (Local State)
**Cel dla użytkownika:** Możliwość wystawienia własnego auta na sprzedaż i natychmiastowe zobaczenie go w serwisie.
- **Zakres funkcjonalny**:
    - Formularz dodawania ogłoszenia z walidacją podstawowych pól.
    - Dodawanie nowego obiektu do globalnej listy ogłoszeń w pamięci aplikacji.
    - Powiadomienie o pomyślnym dodaniu ogłoszenia.
- **Wskazówki architektoniczne**:
    - Obsługa formularza (`FormData` API).
    - Aktualizacja stanu aplikacji i automatyczne ponowne wywołanie funkcji renderującej listę.
    - (Opcjonalnie) Zapis stanu w `localStorage`, aby dane przetrwały odświeżenie strony.
- **Kryteria akceptacji**:
    - Po wypełnieniu formularza nowe auto pojawia się na początku listy ogłoszeń.
    - Próba wysłania pustego formularza jest blokowana przez walidację.

## Instrukcja Uruchomienia
Ze względu na wykorzystanie modułów JavaScript (ES6 Modules), projekt musi być serwowany przez protokół HTTP.
1. Otwórz folder projektu w terminalu.
2. Uruchom serwer: `python -m http.server 8000`
3. Wejdź na: `http://localhost:8000`
