# Architektura Projektu: AutoGram (Etap 2)

## Opis Rozwiązania
W drugim etapie aplikacja została wzbogacona o interaktywne funkcje wyszukiwania ofert w czasie rzeczywistym oraz widok szczegółowy (modal). Utrzymano modularną strukturę i styl wizualny Instagrama.

## Struktura Plików
- `index.html`: Rozbudowany o pasek wyszukiwania w nagłówku oraz ukryty kontener dla modala.
- `src/css/`:
  - `base.css`: Style bazowe i layout.
  - `card.css`: Style kart ogłoszeń.
  - `search.css`: Nowy plik ze stylami dla wyszukiwarki i komunikatu "Brak wyników".
  - `modal.css`: Nowy plik ze stylami dla modala (overlay, animacje, responsywność).
- `src/js/`:
  - `app.js`: Dodano obsługę zdarzeń (`input` dla wyszukiwarki, delegacja zdarzeń `click` dla kart, obsługa zamykania modala).
  - `state.js`: Dodano pola `searchTerm` oraz logikę filtrowania danych (`applyFilters`).
  - `ui.js`: Dodano funkcje `renderModal(car)` i `closeModal()`, obsługujące dynamiczne wyświetlanie szczegółów.

## Nowe Funkcjonalności i Wzorce
- **Real-time Search**: Wykorzystanie zdarzenia `input` do natychmiastowego filtrowania listy ofert bez odświeżania strony.
- **Event Delegation (Delegacja Zdarzeń)**: Zastosowanie jednego listenera na kontenerze listy do obsługi kliknięć we wszystkie (również dynamicznie dodawane) karty samochodów. Optymalizuje to wydajność i upraszcza zarządzanie pamięcią.
- **State-Driven UI**: Ponowne renderowanie listy wynika bezpośrednio ze zmiany stanu (`state.searchTerm` -> `state.filteredCars`), co zapewnia spójność danych.
- **Modal Pattern**: Implementacja modala jako nakładki (overlay) z animacjami CSS, blokadą scrolla tła i możliwością zamknięcia na kilka sposobów (przycisk, tło).

## Decyzje Projektowe
1. **Filtrowanie w stanie**: Logika filtrowania została umieszczona w `state.js`, aby oddzielić operacje na danych od warstwy UI.
2. **Animacje**: Dodano subtelne animacje wejścia dla modala (`modalSlideUp`), aby poprawić UX i nadać aplikacji nowoczesny charakter.
3. **Responsywność**: Modal automatycznie zmienia układ z dwukolumnowego na jednokolumnowy na urządzeniach mobilnych.

