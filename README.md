# Projekt Edukacyjny: Zaawansowany Prototyp Serwisu Ogłoszeń

Ten projekt ma na celu nauczenie uczniów 5. klasy technikum elektronicznego zasad **inkrementacyjnego tworzenia oprogramowania** (Agile) oraz **dobrej architektury frontendowej**.

## Cel Projektu
Budowa zaawansowanego prototypu serwisu ogłoszeń motoryzacyjnych (wyszukiwarka samochodów) przy użyciu czystego HTML, CSS i JavaScript (ES6 Modules).

## Główne Cele Edukacyjne
- **Dziel i Rządź (Iteracyjność)**: Dostarczanie wartości użytkowej (User Value) w każdym etapie prac.
- **Architektura Oprogramowania**: Modułowość, Separation of Concerns, Single Source of Truth (Zarządzanie stanem).
- **Prototypowanie z Mockami**: Praca bez backendu, wykorzystując dane testowe w JS.

## Struktura Pracy (Etapy Agile)
1. **MVP**: Lista ofert (Strona główna).
2. **Wyszukiwanie i Detale**: Znajdowanie konkretnego pojazdu.
3. **Zaawansowane Filtrowanie**: Zawężanie wyników po parametrach.
4. **Dodawanie Ogłoszeń**: Formularz zapisu do lokalnego stanu.

## Uruchamianie (Tylko Frontend)
Projekt jest aplikacją typu **Pure Frontend** i nie posiada serwera backendowego. Ze względu na wykorzystanie modułów JavaScript (ES6), wymaga jednak lokalnego serwera HTTP do poprawnego serwowania plików statycznych przez przeglądarkę:

```bash
python -m http.server
```
Następnie otwórz `http://localhost:8000` w przeglądarce. Cała logika (dane, filtrowanie, stan) działa wyłącznie po stronie klienta.

