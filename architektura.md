# Architektura Projektu: AutoGram (Etap 3)

## Opis Rozwiązania
W trzecim etapie aplikacja została wzbogacona o zaawansowane filtrowanie ofert (cena, rok, paliwo) oraz licznik wyników. Wszystkie parametry są synchronizowane z centralnym stanem aplikacji i działają w czasie rzeczywistym.

## Struktura Plików
- `index.html`: Dodano sekcję filtrów (`.filters-container`) pod nagłówkiem oraz kontener na licznik wyników (`#results-count`).
- `src/css/`:
  - `filters.css`: Nowy plik ze stylami dla panelu filtrów, wejść numerycznych i przycisku resetu. Stylizacja spójna z "Clean UI".
- `src/js/`:
  - `app.js`: Dodano obsługę zdarzeń dla nowych pól filtrów (`input` / `change`) oraz przycisku resetowania filtrów. Zastosowano debouncing dla pól numerycznych.
  - `state.js`: Rozbudowano obiekt `state` o pod-obiekt `filters`. Zaktualizowano `applyFilters` o logikę łączącą wyszukiwanie tekstowe z filtrami numerycznymi i kategorycznymi (operator AND). Dodano funkcje `setFilter` i `resetFilters`.
  - `ui.js`: Dodano funkcję `renderResultsCount`, która dynamicznie informuje użytkownika o liczbie znalezionych ofert.

## Nowe Funkcjonalności i Wzorce
- **Advanced Multi-criteria Filtering**: Implementacja logiki filtrującej, która łączy wiele warunków (cena od/do, rok od/do, typ paliwa, fraza tekstowa).
- **Synchronized UI State**: Wszystkie pola filtrów są synchronizowane ze stanem. Przycisk "Wyczyść filtry" resetuje zarówno stan, jak i wartości w polach formularza w UI.
- **Dynamic Result Counting**: Licznik ofert aktualizuje się przy każdej zmianie parametrów wyszukiwania, poprawiając UX poprzez natychmiastową informację zwrotną.
- **Debouncing**: Zastosowany dla wszystkich pól tekstowych i numerycznych, aby uniknąć nadmiernego renderowania przy szybkim wpisywaniu wartości.

## Decyzje Projektowe
1. **Koniunkcja Filtrów (AND)**: Zdecydowano, że wszystkie filtry muszą być spełnione jednocześnie, co pozwala na precyzyjne zawężanie wyników.
2. **Obsługa Wartości Pustych**: Puste pola filtrów (null) są traktowane jako brak ograniczenia, co jest intuicyjne dla użytkownika.
3. **Sticky Filters**: Panel filtrów został ustawiony jako `sticky`, aby był zawsze dostępny podczas przewijania długiej listy ofert (poprawa użyteczności).

