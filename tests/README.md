# E2E Tests für Lernkarten App

Diese Tests decken alle implementierten Funktionen der Lernkarten-App ab.

## Test-Abdeckung

### Navigation
- ✅ Alle Navigationselemente werden angezeigt
- ✅ Navigation zwischen Seiten funktioniert
- ✅ Aktive Navigation wird hervorgehoben

### Learn Page - Flashcard Funktionalität
- ✅ Lernkarten werden mit deutschen Wörtern angezeigt
- ✅ Karten können umgedreht werden
- ✅ Antwort-Buttons erscheinen nach dem Umdrehen
- ✅ Fortschritt zur nächsten Karte nach Antwort
- ✅ Falsche Antworten werden für Wiederholungsmodus gespeichert
- ✅ Fortschrittsbalken wird angezeigt
- ✅ Session-Info wird angezeigt
- ✅ Neustart-Button funktioniert

### Add Card Page
- ✅ Formular zum Hinzufügen von Karten wird angezeigt
- ✅ Neue Karten können erstellt werden
- ✅ Fehlermeldung bei leeren Feldern
- ✅ Karten können gelöscht werden
- ✅ Leerer Zustand wird angezeigt

### Integration Tests
- ✅ Eigene Karten werden im Lernmodus verwendet
- ✅ Karten werden über Seitenneuladen hinweg gespeichert

### Responsive Design
- ✅ App funktioniert auf mobilen Geräten

## Test ausführen

### Alle Tests ausführen
```bash
npm test
```

### Tests mit UI ausführen (interaktiv)
```bash
npm run test:ui
```

### Tests im Browser ausführen (headed mode)
```bash
npm run test:headed
```

### Tests im Debug-Modus ausführen
```bash
npm run test:debug
```

### Spezifische Tests ausführen
```bash
npx playwright test --grep "Navigation"
npx playwright test --grep "Flashcard"
```

## Browser-Unterstützung

Die Tests werden in folgenden Browsern ausgeführt:
- Chromium
- Firefox
- WebKit (Safari)
- Mobile Chrome
- Mobile Safari

## Test-Struktur

```
tests/
├── e2e.spec.ts          # Haupttest-Datei
└── README.md           # Diese Datei
```

## Hinweise

- Die Tests starten automatisch den Entwicklungsserver
- Tests verwenden localStorage für Persistenz-Tests
- Alle Tests sind unabhängig und können parallel ausgeführt werden
- Tests warten automatisch auf UI-Elemente 