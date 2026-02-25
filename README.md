# Wordle Clone - Agilt Projekt

Ett fullständigt fungerande Wordle-spel byggt med Flask, HTML, CSS och JavaScript enligt agila metoder.

## 👥 Team

| Namn | Roll | Ansvar |
|------|------|--------|
| **Osman** | Scrum Master | Ordlista (JSON), Spelregler, GitHub Projects |
| **Ali** | Backend-utvecklare | Flask, Routes, Session-hantering |
| **Kosar** | Frontend-utvecklare | HTML, CSS, Responsiv design |
| **Didar** | Frontend-utvecklare | JavaScript, Spellogik, Tangentbord |

---

## 🎮 Om Spelet

Detta är en klon av det populära ordspelet Wordle där spelaren har 6 försök att gissa ett hemligt 5-bokstavsord.

**Spelregler:**
- 🟩 **Grön** = Rätt bokstav på rätt plats
- 🟨 **Gul** = Rätt bokstav på fel plats
- ⬜ **Grå** = Bokstaven finns inte i ordet

---


### Förutsättningar
- Python 3.x
- Flask

### Installation

```bash
# 1. Klona repository
git clone https://github.com/osman-AI-se/wordle-clone.git
cd wordle-clone

# 2. Installera Flask
pip install flask

# 3. Kör applikationen
python app.py

# 4. Öppna i webbläsare
# http://localhost:5000/game
```

---

## 📁 Projektstruktur

```
wordle-clone/
├── data/
│   └── words.json              # Ordlista i JSON-format (50 ord)
├── templates/
│   ├── index.html              # Startsida
│   └── game.html               # Spelvy
├── static/
│   ├── css/
│   │   └── style.css           # Styling och responsiv design
│   └── js/
│       └── game.js             # Spellogik och frontend-interaktion
├── word_manager.py             # Hanterar ordlista och validering
├── game_rules.py               # Wordle-spelregler och färgkodning
├── app.py                      # Flask-applikation
├── README.md                   # Denna fil
└── .gitignore                  # Git-ignorerade filer
```

---

## 🔧 Teknisk Implementation

### Backend (Python/Flask)

#### word_manager.py
Hanterar ordlistan med JSON-format.

**Funktioner:**
- `get_random_word()` - Hämtar slumpmässigt ord för nytt spel
- `is_valid_word(word)` - Validerar att gissningen finns i ordlistan

**Varför JSON?**
Vi valde JSON istället för textfiler för:
- Bättre struktur och flexibilitet
- Möjlighet att lägga till metadata (svårighetsgrad, kategorier)
- Standardformat i webbutveckling
- Lärarens rekommendation

#### game_rules.py
Innehåller all Wordle-spellogik.

**Funktioner:**
- `check_guess(guess)` - Jämför gissning med rätt ord
- Använder två-pass algoritm för korrekt färgkodning
- Hanterar duplicerade bokstäver korrekt
- Returnerar spelstatus (won/lost/continue)

**Algoritm:**
1. **Pass 1:** Markera alla gröna (exakt matchning)
2. **Pass 2:** Markera alla gula (fel position)
3. **Återstående:** Markera som grå

#### app.py
Flask-applikation med session-hantering.

**Routes:**
- `GET /` - Startsida
- `GET /game` - Spelvy (startar nytt spel)
- `POST /new-game` - API för att starta nytt spel
- `POST /guess` - API för att skicka gissning

### Frontend

#### game.html
Komplett spelgränssnitt med:
- 6×5 spelbräda
- On-screen tangentbord (QWERTY-layout)
- Meddelande-område för feedback
- Responsiv design

#### style.css
Professionell design med:
- Dark mode tema
- CSS-variabler för enkel anpassning
- Färgkodning enligt Wordle-standard
- Hover och active states för tangentbord

#### game.js
Frontend-logik som:
- Hanterar tangentbordsinmatning 
- Kommunicerar med Flask backend via Fetch API
- Uppdaterar UI baserat på backend-svar
- Animerar färgbyten
- Visar vinst/förlust-meddelanden

---

## 🔄 Agilt Arbetssätt

### GitHub Projects
Vi använde GitHub Projects board för att organisera arbetet:
- **Backlog** - Framtida idéer
- **Todo** - Uppgifter för aktuell sprint
- **In Progress** - Pågående arbete
- **Review** - Väntar på code review
- **Done** - Färdiga uppgifter

### Workflow
1. Skapa issue för varje feature
2. Skapa feature branch (`git checkout -b feature/namn`)
3. Utveckla och testa
4. Skapa Pull Request
5. Code review av teammedlem
6. Merge till main

### Sprint Demos
Vi genomförde sprint demos på:
- **Lektion 12** - Grundläggande struktur och backend
- **Lektion 14** - Frontend integration och färgkodning
- **Lektion 16** - Polering och bugfixar

---

## ✨ Features

### Implementerade Features
- ✅ Komplett Wordle-spelmekanik
- ✅ Validering av ord mot ordlista
- ✅ Färgkodning (grön/gul/grå)
- ✅ 6 försök per spel
- ✅ Tangentbordsstöd (fysiskt + on-screen)
- ✅ Responsiv design
- ✅ Session-hantering
- ✅ Felhantering och användarfeedback
- ✅ "New Game" funktionalitet

### Möjliga Framtida Förbättringar
- Statistik (antal vinster, genomsnittligt antal försök)
- Delningsfunktion (dela resultat)
- Flera svårighetsgrader
- Större ordlista
- Dagligt ord (alla spelar samma ord)
- Användarinloggning

---

## 🐛 Kända Problem & Lösningar

### Problem 1: Duplicerade bokstäver
**Problem:** SPEED vs ERASE - hur hanteras två E:n?
**Lösning:** Två-pass algoritm där gröna markeras först, sedan gula.

### Problem 2: Merge conflicts
**Problem:** Flera personer redigerade samma fil (game.html)
**Lösning:** Scrum Master löste konflikten och informerade teamet.

### Problem 3: CSS-klassnamn
**Problem:** JavaScript använde fel klassnamn (right/wrong istället för correct/present)
**Lösning:** Standardiserade klassnamn mellan CSS och JavaScript.

---

## 📊 Projektstatistik

- **Utvecklingstid:** 4 veckor
- **Antal commits:** 18+
- **Antal Pull Requests:** 6+
- **Antal Issues:** 4+
- **Kodrader:** ~400 (Python + JavaScript + CSS)
- **Ordlista:** 50 engelska ord

---

## 🎓 Lärdomar

**Tekniska:**
- JSON är bättre än textfiler för strukturerad data
- Session-hantering i Flask för spelstatus
- Fetch API för kommunikation mellan frontend och backend
- Vikten av konsekvent namngivning (CSS-klasser)

**Agila:**
- Vecko standups håller teamet synkat
- GitHub Projects visualiserar progress tydligt
- Code reviews förbättrar kodkvalitet
- Merge conflicts är normala och hanterbara

**Teamwork:**
- Tydlig rollfördelning är viktigt
- Kommunikation löser de flesta problem
- Att dokumentera beslut sparar tid senare
---

## 🔗 Länkar

- **Repository:** https://github.com/osman-AI-se/wordle-clone
- **Original Wordle:** https://www.nytimes.com/games/wordle/index.html
- **Flask Documentation:** https://flask.palletsprojects.com/

---

## 📝 Licens

Detta projekt är skapat för utbildningsändamål som en del av kursen "Agilt Arbete med Flask".

---

## 🙏 Tack

Tack till:
- **Kimmo Ahola** - Kurslärare och handledare
- **Vårt team** - För hårt arbete och bra samarbete
- **New York Times** - För det ursprungliga Wordle-spelet

---

**Skapad:** 2026-02-05  
**Senast uppdaterad:** 2026-02-19  
**Version:** 1.0  
