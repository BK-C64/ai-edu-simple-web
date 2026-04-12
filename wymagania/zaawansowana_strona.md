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
**Cel dla użytkownika:** Możliwość szybkiego odnalezienia konkretnego modelu oraz zapoznania się z jego pełną specyfikacją bez opuszczania kontekstu listy.

**Historyjki Użytkownika:**
- Jako użytkownik, chcę wpisać nazwę auta w wyszukiwarkę, aby natychmiast zobaczyć pasujące oferty.
- Jako użytkownik, chcę kliknąć w kartę auta, aby zobaczyć jego szczegółowe parametry w czytelnym oknie.

**Kryteria Akceptacji (AC):**
1. **Wyszukiwarka (Real-time Search):**
    - Na górze strony znajduje się pole wyszukiwania (Search Bar) o minimalistycznym wyglądzie (inspirowany Instagramem).
    - Filtrowanie odbywa się w czasie rzeczywistym podczas wpisywania tekstu (zdarzenie `input`).
    - System przeszukuje zarówno pola **marka**, jak i **model** (wielkość liter nie ma znaczenia).
    - W przypadku braku wyników, zamiast pustej strony wyświetlany jest komunikat "Brak ofert spełniających kryteria".
    - Stan wyszukiwania (wpisana fraza) jest synchronizowany z `state.js`.

2. **Widok Szczegółów (Modal/Overlay):**
    - Kliknięcie w dowolny element karty samochodu otwiera widok szczegółowy.
    - Widok szczegółów jest realizowany jako modal (nakładka) przykrywająca listę, co pozwala zachować kontekst przeglądania.
    - Informacje w szczegółach obejmują: duże zdjęcie, markę i model, cenę oraz parametry techniczne (rok produkcji, przebieg, rodzaj paliwa).
    - Modal zawiera wyraźny przycisk zamknięcia (ikona "X") oraz umożliwia zamknięcie poprzez kliknięcie w tło (overlay).
    - Po zamknięciu modala użytkownik wraca do przefiltrowanej wcześniej listy.

3. **Techniczne i UX:**
    - Obsługa zdarzeń (`click`, `input`) musi być zaimplementowana w modułach i skoordynowana przez `app.js`.
    - Zmiana widoku (pokazanie/ukrycie modala) odbywa się poprzez manipulację klasami CSS lub DOM, bez przeładowania strony (SPA style).
    - Interfejs jest zoptymalizowany pod rozdzielczość 1920x1080 (HD) na systemie Windows (czytelne fonty, odpowiednie proporcje).

**Wskazówki architektoniczne**:
- Rozbudowa `state.js` o pola: `searchQuery` oraz `selectedCarId`.
- Funkcja renderująca listę powinna filtrować dane z `state.js` w oparciu o `searchQuery`.
- Style modala powinny zostać wydzielone do osobnego pliku CSS (np. `modal.css`).
- Wykorzystanie `dataset` w HTML do przechowywania ID samochodu na karcie, co ułatwi identyfikację klikniętego elementu.

### Etap 3: Zaawansowane Filtrowanie
**Cel dla użytkownika:** Możliwość precyzyjnego zawężenia listy ofert do pojazdów spełniających konkretne wymagania techniczne i budżetowe, bez konieczności przeglądania wszystkich ogłoszeń.

**Historyjki Użytkownika:**
- Jako użytkownik, chcę określić minimalną i maksymalną cenę, aby widzieć tylko auta w moim budżecie.
- Jako użytkownik, chcę przefiltrować auta po roku produkcji, aby znaleźć nowsze egzemplarze.
- Jako użytkownik, chcę wybrać rodzaj paliwa (np. Hybryda), aby zobaczyć tylko interesujące mnie napędy.
- Jako użytkownik, chcę, aby filtry działały razem z wyszukiwarką tekstową, dając mi bardzo precyzyjne wyniki.

**Kryteria Akceptacji (AC):**
1. **Interfejs Filtrów (UI):**
    - Sekcja filtrów znajduje się bezpośrednio pod wyszukiwarką lub jest dostępna jako rozwijany panel ("Pokaż filtry").
    - Stylistyka jest spójna z resztą aplikacji (Clean UI, styl nowoczesny/Instagramowy).
    - Pola wejściowe:
        - Cena: dwa pola typu `number` ("Cena od", "Cena do").
        - Rok produkcji: dwa pola typu `number` ("Rok od", "Rok do").
        - Rodzaj paliwa: element `select` z opcjami (np. Wszystkie, Benzyna, Diesel, Hybryda, Elektryczny).
    - Widoczny licznik wyników: "Znaleziono X ofert" aktualizowany dynamicznie.

2. **Logika i Filtrowanie:**
    - Filtrowanie odbywa się w czasie rzeczywistym (zdarzenie `input` lub `change`). Dynamiczna aktualizacja listy jest preferowanym wzorcem UX dla nowoczesnych prototypów.
    - Wszystkie aktywne filtry oraz fraza z wyszukiwarki są łączone operatorem logicznym **AND** (koniunkcja).
    - Puste pola "od" / "do" oznaczają brak ograniczenia w danym kierunku.
    - System poprawnie obsługuje wartości brzegowe (np. cena dokładnie równa "Cena do").

3. **Zarządzanie Stanem (State Management):**
    - Wszystkie wartości filtrów (priceMin, priceMax, yearMin, yearMax, fuelType) są przechowywane w centralnym obiekcie w `state.js`.
    - Zmiana dowolnego filtra aktualizuje stan, co automatycznie wywołuje ponowne renderowanie listy ofert.

4. **Techniczne i UX (Windows HD):**
    - Układ filtrów zoptymalizowany pod rozdzielczość 1920x1080 (HD) na systemie Windows.
    - Elementy formularza mają wyraźne etykiety (labels) i placeholdery.
    - Dodany przycisk "Wyczyść filtry", który resetuje stan filtrów i przywraca pełną listę.

**Wskazówki architektoniczne**:
- Rozbudowa `state.js` o pod-obiekt `filters`.
- Stworzenie funkcji pomocniczej, która iteruje po wszystkich autach i sprawdza, czy spełniają one komplet warunków (search query + wszystkie filtry).
- Wydzielenie stylów filtrów do `src/css/search.css`.

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
