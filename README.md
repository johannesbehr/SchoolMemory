Alles klar — hier ist **eine einzige, durchgehende README.md-Datei ohne zusätzliche Codeblöcke oder Teilstücke**:

```md
# 🧠 Schüler-Memory (Namenslernspiel)

Ein interaktives Memory-Spiel, mit dem Lehrkräfte die Namen ihrer Schüler:innen spielerisch trainieren können.  
Die Spielenden ordnen zufällig verdeckten Schülerbildern die passenden Namen zu.

---

## 🎮 Spielprinzip

- Es werden 9 Schülerbilder (3x3 Grid) angezeigt, zunächst verdeckt
- Rechts daneben befinden sich 9 Namens-Buttons
- Ablauf:
  - Karte auswählen → Bild wird sichtbar
  - Namen auswählen
  - Bewertung:
    - Richtig: Button wird grün, bleibt deaktiviert, Bild bleibt sichtbar
    - Falsch: Bild wird wieder verdeckt
- Ziel: Alle 9 Schüler korrekt zuordnen

---

## 📁 Projektstruktur

/projekt
│
├── index.html          Hauptseite
├── style.css           Layout & Design
├── script.js           Spiellogik
├── scholars.json       Schülerdaten
└── *.png               Schülerbilder

---

## 📦 Datenformat (scholars.json)

[
  {
    "firstname": "Leonie",
    "lastname": "Schneider"
  }
]

---

## 🖼️ Bildbenennung

Nachname, Vorname.png

Beispiel:
Schneider, Leonie.png

Die Bilddateien müssen im selben Ordner liegen wie die index.html.

---

## 🚀 Starten

Einfach index.html im Browser öffnen.

Alternativ über lokalen Server:

npx serve

oder

python -m http.server

---

## 🧩 Technologien

- HTML5
- CSS3 (Flexbox & Grid)
- Vanilla JavaScript (ohne Frameworks)

---

## 📌 Features

- 3x3 Memory-Grid
- Zufällige Schüleranordnung
- Klickbasierte Zuordnung von Bild zu Name
- Visuelles Feedback (richtig/falsch)
- Spielende-Erkennung

---

## 💡 Erweiterungsmöglichkeiten

- Punkte- oder Fehlersystem
- Zeitmodus
- Mehr als 9 Schüler (Level-System)
- Soundeffekte
- Speicherung von Fortschritten (LocalStorage)
- Mobile Optimierung

---

## 👨‍🏫 Ziel

Dieses Projekt dient dem schnellen und spielerischen Lernen von Schülernamen im Unterricht, z. B. in neuen Klassen oder Vertretungsstunden.

---

## 📄 Lizenz

Freie Nutzung im Bildungsbereich.
```
