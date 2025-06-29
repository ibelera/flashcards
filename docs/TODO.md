To-Do-Liste: Lernkarten Web App (MVP)
Dieses Dokument gliedert die Entwicklungsaufgaben, die auf dem PRD basieren, in eine priorisierte Liste.

Phase 1: Projekt-Setup & Grundgerüst
[x] Projektinitialisierung:

[x] Neues Projekt mit Vite, React (--template react-ts) und TypeScript aufsetzen.

[x] Tailwind CSS nach der offiziellen Anleitung für Vite installieren und konfigurieren.

[x] Grundlegende Ordnerstruktur:

[x] Ordner für Komponenten (/components), Seiten/Ansichten (/pages) und Typ-Definitionen (/types) erstellen.

[x] Navigation/Routing:

[x] Eine einfache Navigation erstellen (z.B. in einer Navbar-Komponente).

[x] Links zu den Hauptseiten implementieren: "Lernen", "Quiz", "Statistik", "Karte hinzufügen".

Phase 2: Kernfunktionalität der Lernkarten (FR-1 & FR-2)
[x] Daten-Setup:

[x] Eine JSON- oder TS-Datei mit den vordefinierten 250 deutschen Wörtern und deren Übersetzungen erstellen.

[x] Typ-Definitionen für eine Card und ein Deck erstellen.

[x] Lernkarten-Komponente (Flashcard.tsx):

[x] Komponente erstellen, die eine einzelne Karte anzeigt (zuerst die deutsche Seite).

[x] Klick/Tipp-Handler implementieren, um eine CSS-basierte Flip-Animation auszulösen.

[x] Nach dem Umdrehen die englische Übersetzung anzeigen.

[x] Lern-Seite (LearnPage.tsx):

[x] Die Lernkarten-Komponente auf der Seite einbinden.

[x] Logik implementieren, um durch den Kartensatz zu blättern.

[x] Buttons "Falsch" und "Richtig" unter der umgedrehten Karte anzeigen.

[x] Den Status für "falsch" beantwortete Karten verwalten (z.B. in einem useState-Array).

[x] Eigene Karten hinzufügen (AddCardPage.tsx):

[x] Ein Formular mit Feldern für "Deutsch" und "Englisch" erstellen.

[x] Logik implementieren, um neue Karten im localStorage zu speichern.

[x] Sicherstellen, dass selbst erstellte Karten im Lernmodus verwendet werden können.

Phase 3: Lernmodi (FR-3)
[ ] Wiederholungsmodus ("Review Mode"):

[ ] Eine Funktion oder Seite erstellen, die nur die als "falsch" markierten Karten anzeigt.

[ ] Logik implementieren, um eine Karte aus der "Falsch"-Liste zu entfernen, wenn sie im Wiederholungsmodus korrekt beantwortet wird.

[ ] Quiz-Modus (QuizPage.tsx):

[ ] Die Seite für den Quiz-Modus erstellen.

[ ] Multiple-Choice-Fragen:

[ ] Eine deutsche Vokabel anzeigen.

[ ] Vier englische Antwortmöglichkeiten generieren (eine korrekte, drei zufällige aus dem gleichen Deck).

[ ] Feedback bei Auswahl einer Antwort geben (richtig/falsch).

[ ] Lückentext-Fragen:

[ ] Eine englische Vokabel und ein Texteingabefeld anzeigen.

[ ] Die Eingabe des Benutzers mit der korrekten deutschen Übersetzung vergleichen (ohne Berücksichtigung von Groß-/Kleinschreibung).

[ ] Feedback zur Eingabe geben.

Phase 4: Statistik & Feinschliff (FR-4 & DU)
[ ] Statistik-Logik:

[ ] Zähler für "Gesamt gelernt", "Richtig beantwortet", "Falsch beantwortet" und "Eigene Karten erstellt" implementieren.

[ ] Diese Zähler nach jeder relevanten Aktion aktualisieren und im localStorage speichern.

[ ] Statistik-Seite (StatsPage.tsx):

[ ] Die gespeicherten Statistiken vom localStorage laden und anzeigen.

[ ] Design & UX (DU-1 bis DU-4):

[ ] Responsivität: Die gesamte Anwendung auf verschiedenen Bildschirmgrößen (Mobil, Tablet, Desktop) testen und sicherstellen, dass sie gut aussieht und funktioniert.

[ ] Visuelles Feedback: Animationen und Übergänge verfeinern (z.B. beim Kartenwechsel, bei richtiger/falscher Antwort im Quiz).

[ ] Code-Qualität: Den Code aufräumen, Kommentare hinzufügen und auf Konsistenz prüfen.

[ ] Endtests: Die gesamte Anwendung gründlich testen, um Fehler vor dem "Go-Live" zu finden.