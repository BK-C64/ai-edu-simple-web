# Projekt Edukacyjny: Zaawansowany Prototyp Serwisu Ogłoszeń

To jest projekt edukacyjny skupiony na zaawansowanym prototypowaniu w Vanilla JS. Wszystkie działania muszą być zgodne z zasadami inkrementacyjnego rozwoju i czystej architektury.

## Metodologia Pracy

W projekcie wykorzystujemy wyspecjalizowanych agentów Gemini CLI do realizacji zadań:

1.  **Product Manager (`product-manager`)**:
    *   Definiuje etapy "User Value" (co użytkownik zyskuje w danej iteracji).
    *   Zarządza specyfikacją wymagań w `wymagania/zaawansowana_strona.md`.
    *   Pilnuje, aby każdy etap był działającym prototypem.

2.  **Software Developer (`software-developer-pl`)**:
    *   Implementuje kod zgodnie z architekturą modułową (ES6 Modules).
    *   Stosuje zasadę *Separation of Concerns* (API vs UI vs State).
    *   Dostarcza czysty, profesjonalny kod HTML/CSS/JS.

## Zasady Techniczne

*   **Brak Backend Serwera**: Cała logika biznesowa, dane i stan aplikacji znajdują się po stronie klienta (frontend).
*   **Dane (Mocki)**: Dane są przechowywane jako obiekty/tablice JavaScript w dedykowanych modułach.
*   **Lokalny Serwer Statyczny**: Serwer Python (`python -m http.server`) służy wyłącznie do udostępniania plików HTML/CSS/JS przeglądarce, co jest wymagane przez moduły ES6.
*   **Cel**: Edukacja o inkrementacyjnym dostarczaniu wartości i strukturze kodu.
