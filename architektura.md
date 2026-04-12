# Architektura Projektu: AutoGram (Etap 4)

## Opis Rozwiązania
W czwartym etapie aplikacja została wzbogacona o system dodawania własnych ogłoszeń przez użytkownika w ramach bieżącej sesji. Funkcjonalność obejmuje interaktywny formularz w oknie modalnym, walidację danych oraz system powiadomień (toasty).

## Struktura Plików
- `index.html`: Dodano przycisk "Dodaj ogłoszenie" w nagłówku oraz strukturę drugiego modala (`#add-car-modal`) i kontener na powiadomienia (`#notification-container`).
- `src/css/`:
  - `modal.css`: Dodano style dla formularza dodawania ogłoszenia (form-grid, inputs, button) oraz system powiadomień wizualnych.
  - `base.css`: Dodano stylizację przycisku akcji w nagłówku.
- `src/js/`:
  - `app.js`: Dodano obsługę otwierania formularza, przechwytywanie zdarzenia `submit`, zbieranie danych przez `FormData` oraz integrację z `state.js` i `ui.js`.
  - `state.js`: Dodano funkcję `addCar(newCar)`, która generuje unikalne ID i aktualizuje listę ogłoszeń w stanie aplikacji.
  - `ui.js`: Dodano funkcje `renderAddCarForm` (dynamiczne generowanie formularza) oraz `showNotification` (system toastów). Zrefaktoryzowano `closeModal`, aby obsługiwała wiele okien modalnych.

## Nowe Funkcjonalności i Wzorce
- **Local State Persistence (Session-only)**: Użytkownik może dodawać nowe oferty, które są natychmiast renderowane na liście dzięki reaktywności stanu.
- **Dynamic Form Generation**: Formularz nie jest na stałe w HTML, lecz generowany dynamicznie przy otwarciu modala, co ułatwia zarządzanie jego stanem początkowym.
- **FormData API**: Wykorzystanie nowoczesnego API do pobierania danych z formularza w sposób strukturalny.
- **Notification System (Toast)**: System krótkich, nieinwazyjnych komunikatów informujących o sukcesie lub błędzie operacji, co znacząco poprawia UX.
- **Universal Modal Management**: Refaktoryzacja logiki zamykania modali (ESC, tło, przyciski X) w celu obsługi wielu niezależnych okien.

## Decyzje Projektowe
1. **Walidacja po stronie klienta**: Zastosowano atrybuty HTML5 (required, min, max, type="url") oraz dodatkową walidację w JS przed dodaniem do stanu.
2. **Auto-ID Generation**: System automatycznie wylicza nowe ID na podstawie aktualnej listy, zapewniając unikalność kluczy w ramach sesji.
3. **Instant Feedback**: Po dodaniu ogłoszenia, lista jest od razu przefiltrowana i odświeżona, a użytkownik otrzymuje wizualne potwierdzenie (toast).
4. **Placeholder Images**: Jeśli użytkownik nie poda URL zdjęcia, system automatycznie przypisuje czytelny placeholder.
