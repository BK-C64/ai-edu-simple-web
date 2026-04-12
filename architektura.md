# Architektura Projektu: AutoGram (Etap 1)

## Opis Rozwiązania
Aplikacja została zaprojektowana jako nowoczesny, modularny prototyp serwisu ogłoszeń motoryzacyjnych, inspirowany stylem wizualnym Instagrama. W pierwszym etapie skupiono się na stworzeniu solidnego fundamentu pod dalszą rozbudowę, wykorzystując natywne moduły JavaScript (ES6).

## Struktura Plików
- `index.html`: Główny szkielet aplikacji. Ładuje style oraz moduł wejściowy JavaScript.
- `src/css/`:
  - `base.css`: Style bazowe, reset, zmienne CSS (kolory, typografia) oraz layout kontenerów.
  - `card.css`: Style komponentu karty samochodu (Instagram-style feed card).
- `src/js/`:
  - `app.js`: Punkt wejścia (entry point). Zarządza przepływem danych między API, stanem a UI.
  - `state.js`: Centralny stan aplikacji (**Single Source of Truth**). Zarządza danymi o samochodach, filtrach i statusie ładowania.
  - `api.js`: Warstwa dostępu do danych. Symuluje pobieranie z API.
  - `ui.js`: Warstwa prezentacji. Odpowiada za generowanie HTML i manipulację DOM.
  - `data/cars.js`: Moduł z danymi testowymi (mocki).

## Wykorzystane Wzorce i Zasady
- **Separation of Concerns (SoC)**: Rozdzielenie danych (`data/`), logiki pobierania (`api.js`), logiki renderowania (`ui.js`) i stylizacji (`css/`).
- **DRY (Don't Repeat Yourself)**: Wykorzystanie funkcji formatujących i reużywalnych komponentów HTML generowanych przez JS.
- **YAGNI (You Ain't Gonna Need It)**: Implementacja tylko niezbędnych funkcji dla Etapu 1, bez nadmiarowych bibliotek czy złożonych systemów routingu.
- **SOLID**:
  - *Single Responsibility*: Każdy moduł JS ma jedną, jasno określoną odpowiedzialność.
- **ES6 Modules**: Umożliwiają czyste zarządzanie zależnościami bez zanieczyszczania globalnej przestrzeni nazw.

## Decyzje Projektowe
1. **Stylistyka**: Wybrano minimalistyczny styl z jasnym tłem, wyraźnymi obramowaniami i zaokrąglonymi rogami, co nawiązuje do nowoczesnych aplikacji mobilnych.
2. **Asynchroniczność**: Nawet w wersji z mockami, dane są pobierane asynchronicznie (`async/await`), co przygotowuje aplikację na integrację z prawdziwym API w przyszłości.
3. **Formatowanie danych**: Użyto `Intl.NumberFormat` do czytelnego wyświetlania cen w walucie PLN.
