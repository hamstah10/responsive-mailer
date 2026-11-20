# E-Mail Template Viewer - Product Requirements Document

## Original Problem Statement
Erstellen von responsiven E-Mail-Templates für TuningFiles Download.
- Farben: #121212, #bd1f22, #171717
- React-basierter Viewer zum Vorschauen und Kopieren des HTML-Codes
- 6 Template-Typen: Newsletter, Transaktion, Willkommen, Passwort-Reset, Grundvorlage, Black Week

## Footer Requirements
- Adresse links: tuningfiles-download.com, Hauptstr. 231a, 98529 Suhl, Deutschland
- Kontakt rechts: Telefon, E-Mail
- Social Media: Instagram, Facebook, WhatsApp
- Google Reviews Button
- Legal Links: Impressum, Datenschutz
- Nahtlos in #171717 Hintergrund integriert

---

## Implemented Features

### 2024-11 Session 1
- [x] React-basierter E-Mail Template Viewer
- [x] NewsletterTemplate.js - Marketing & Promotions
- [x] TransactionTemplate.js - Bestellbestätigung
- [x] WelcomeTemplate.js - Neue Kunden
- [x] PasswordResetTemplate.js - Passwort zurücksetzen
- [x] BasicTemplate.js - Leere Grundvorlage
- [x] Footer mit 2-Spalten (Adresse/Kontakt)
- [x] Social Media Icons
- [x] Google Reviews Button
- [x] Impressum/Datenschutz Links
- [x] Desktop/Mobile Vorschau Toggle
- [x] HTML kopieren & Download Funktion

### 2024-11 Session 2 (Current)
- [x] BlackWeekTemplate.js - Sale & Angebote
  - BLACK WEEK / MEGA SALE Banner
  - BIS ZU 50% RABATT Highlight
  - 3 Produkt-Angebote mit Rabatten
  - Rabattcode-Box (BLACKWEEK50)
  - CTA Button
  - Dringlichkeits-Banner

---

## Code Architecture

```
/app/frontend/src/
├── App.js
├── pages/
│   └── EmailTemplatePage.js       # Viewer UI
└── components/
    └── email-templates/
        ├── index.js
        ├── BasicTemplate.js
        ├── BlackWeekTemplate.js    # NEW
        ├── NewsletterTemplate.js
        ├── PasswordResetTemplate.js
        ├── TransactionTemplate.js
        └── WelcomeTemplate.js
```

---

## Technical Notes

**CRITICAL:** 
- Templates verwenden `<table>` Layouts und **inline CSS** für E-Mail-Client-Kompatibilität
- KEIN Tailwind CSS in den Template-Dateien (*Template.js)
- Tailwind/Shadcn nur für die Viewer-App (EmailTemplatePage.js)

---

## Backlog / Future Tasks

### P1 - Nice to Have
- [ ] Weitere Aktions-Templates (Weihnachten, Ostern, etc.)
- [ ] Template-Editor mit Live-Daten-Eingabe
- [ ] Dark/Light Mode Toggle für Vorschau

### P2 - Future
- [ ] Export als .eml Datei
- [ ] Direkte Integration mit E-Mail-Service

## 2026-06 – Countdown Banner
- Static countdown block (Tage/Stunden/Minuten + "Aktion endet am ...") in Black Week KESS3 (after badge) and Black Week Credits (replaces old "Gültig bis" box). Shared helper: components/email-templates/countdownBlock.js
- Editable in editor: countdownEnd (datetime-local, default 2026-11-30T23:59), countdownLabel (default "NUR NOCH"). Values computed at render/export time; shows "AKTION BEENDET" after end.

## 2026-06 – Letzte Chance Schalter
- Toggle "Letzte Chance (Erinnerung)" in editor for both Black Week templates (data.lastChance): red urgency bar on top (auto text "LETZTE CHANCE – Endet am <countdownEnd>" or custom urgencyText) + CTA becomes "JETZT NOCH SICHERN".
- Listmonk export name gets suffix " - Letzte Chance" when toggle is on (so it doesn't overwrite the normal version).
