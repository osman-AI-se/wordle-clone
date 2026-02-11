# Wordle Clone - Agilt Projekt

## 👥 Gruppmedlemmar

| Namn | Roll | Ansvar |
|------|------|--------|
| **Osman** | Scrum Master | Ordlista, Spelregler, GitHub Projects |
| **Ali** | Backend-utvecklare | Flask, Routes, API |
| **Kosar** | Frontend-utvecklare | HTML, CSS, Design |
| **Didar** | Frontend-utvecklare | JavaScript, Spellogik |

---

## 📋 Projektöversikt

Vi utvecklar en Wordle-klon med Flask, HTML, CSS och JavaScript enligt agila metoder.

**Spelregler:**
- Gissa ett 5-bokstavsord på engelska
- 6 försök totalt
- 🟩 Grön = Rätt bokstav, rätt position
- 🟨 Gul = Rätt bokstav, fel position
- ⬜ Grå = Bokstaven finns inte i ordet

---

## 🗂️ Projektstruktur

```
wordle-clone/
├── data/                    # Ordlistor (Osman)
│   ├── answers.txt          # Möjliga svar 
│   └── valid_words.txt      # Alla giltiga ord 
├── templates/               # HTML-filer (Kosar)
│   ├── index.html           # Startsida
│   └── game.html            # Själva spelet
├── static/                  # Statiska filer
│   ├── css/                 # CSS-filer (Kosar)
│   │   └── style.css        # Huvudstil
│   ├── js/                  # JavaScript-filer (Didar)
│   │   └── game.js          # Spellogik
│   └── images/              # Bilder (valfritt)
├── word_manager.py          # Ordhantering (Osman)
├── game_rules.py            # Spelregler (Osman)
├── app.py                   # Flask-applikation (Ali)
├── README.md                # Git-ignorerade filer
└── .gitignore               
```

---

## ✅ TODO-lista

### 🔵 Osman (Scrum Master + Ordlista + Regler)

#### Vecka 1:
- [x] Skapa GitHub repository
- [x] Skapa projektstruktur (mappar)
- [ ] Ladda ner ordlistor från GitHub
- [ ] Implementera `word_manager.py`
- [ ] Implementera `game_rules.py`
- [ ] Testa att modulerna fungerar
- [ ] Pusha till GitHub
- [ ] Bjud in team medlemmar till repository
- [ ] Skapa GitHub Projects board med kolumner:
  - Backlog
  - To Do
  - In Progress
  - Review
  - Done
- [ ] Skapa work items (issues) för alla i teamet

#### Vecka 2-4:
- [ ] Hålla med vecko standups 
- [ ] Uppdatera GitHub Projects board
- [ ] Hjälpa teamet integrera modulerna
- [ ] Förbereda sprint demos 
- [ ] Koordinera teamarbete

---

### 🟢 Ali (Flask Backend)

#### Vecka 1:
- [ ] Klona repository: `git clone <repo-url>`
- [ ] Installera Flask: `pip install flask`
- [ ] Jobba på `app.py` med grundläggande Flask-setup
- [ ] Importera Osmans `word_manager.py` och `game_rules.py`
- [ ] Skapa grundläggande routes:
  - `/` - Startsida
  - `/game` - Spelvy
  - `/guess` - API endpoint för gissningar
- [ ] Testa Flask-appen lokalt: `python app.py`
- [ ] Pusha till GitHub (skapa pull request)

#### Vecka 2:
- [ ] Implementera session-hantering
- [ ] Skapa API endpoint för nytt spel: `/new-game`
- [ ] Koppla ihop frontend med backend
- [ ] Hantera spelstatus (vinst/förlust)

#### Vecka 3-4:
- [ ] Bugfixar och optimering
- [ ] Integrera med JavaScript (Didars kod)
- [ ] Testa hela flödet
- [ ] Förbereda demo

**Tips för Ali:**
```python
# Exempel app.py struktur
from flask import Flask, render_template, request, session, jsonify
from word_manager import WordManager
from game_rules import GameRules

app = Flask(__name__)
app.secret_key = 'din-hemliga-nyckel-här'  # Byt ut!

word_manager = WordManager()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/new-game')
def new_game():
    target_word = word_manager.get_random_word()
    session['target_word'] = target_word
    session['attempts'] = 0
    return jsonify({'message': 'Nytt spel startat!'})

# Fortsätt med fler routes...
```

---

### 🟡 Kosar (HTML/CSS)

#### Vecka 1:
- [ ] Klona repository: `git clone <repo-url>`
- [ ] Jobba på `templates/index.html` - välkomstskärm
- [ ] Jobba på `templates/game.html` - spelvy med:
  - 6 rader × 5 kolumner (för gissningar)
  - Tangentbord (A-Z, Enter, Backspace)
  - Resultat-område
- [ ] Skapa `static/css/style.css` - grundläggande styling
- [ ] Pusha till GitHub (skapa pull request)

#### Vecka 2:
- [ ] Styla spelbrädet:
  - Rutorna för bokstäver
  - Färger
  - Animationer vid gissning
- [ ] Styla tangentbordet
- [ ] Responsiv design (funkar på mobil)

#### Vecka 3-4:
- [ ] Finjustera design
- [ ] Lägga till vinn/förlust-meddelanden
- [ ] Polera utseendet
- [ ] Testa på olika skärmstorlekar

**HTML-struktur exempel:**
```html
<!-- game.html -->
<div class="game-board">
  <div class="row" id="row-0">
    <div class="tile"></div>
    <div class="tile"></div>
    <div class="tile"></div>
    <div class="tile"></div>
    <div class="tile"></div>
  </div>
  <!-- 5 rader till... -->
</div>

<div class="keyboard">
  <!-- Bokstäver A-Z -->
</div>
```

---

### 🟠 Didar (JavaScript/Spellogik)

#### Vecka 1:
- [ ] Klona repository: `git clone <repo-url>`
- [ ] Jobba på `static/js/game.js`
- [ ] Implementera tangentbordshantering:
  - Visa bokstäver på skärmen
  - Hantera Enter och Backspace
- [ ] Pusha till GitHub (skapa pull request)

#### Vecka 2:
- [ ] Skicka gissningar till Flask backend 
- [ ] Ta emot svar från backend (grön/gul/grå)
- [ ] Uppdatera UI baserat på svar:
  - Ändra färg på rutorna
  - Ändra färg på tangentbordet
- [ ] Hantera spelslut (vinst/förlust)

#### Vecka 3-4:
- [ ] Lägga till animationer
- [ ] Visa felmeddelanden (ogiltigt ord)
- [ ] Implementera "shake"-animation vid fel
- [ ] Implementera "flip"-animation vid rätt
- [ ] Bugfixar och optimering

**JavaScript-struktur exempel:**
```javascript
// game.js
let currentRow = 0;
let currentTile = 0;
let currentGuess = '';

document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
  if (event.key === 'Enter') {
    submitGuess();
  } else if (event.key === 'Backspace') {
    deleteLetter();
  } else if (isLetter(event.key)) {
    addLetter(event.key);
  }
}

async function submitGuess() {
  const response = await fetch('/guess', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ guess: currentGuess })
  });
  
  const result = await response.json();
  updateBoard(result);
}

// Fortsätt med fler funktioner...
```

---

## 🚀 Komma Igång

### Installation

```bash
# 1. Klona repository
git clone https://github.com/DIT-ANVÄNDARNAMN/wordle-clone.git
cd wordle-clone

# 2. Installera Flask (bara Ali behöver detta)
pip install flask

# 3. Kör applikationen (när Ali har skapat app.py)
python app.py

# 4. Öppna i webbläsare
# http://localhost:5000
```

### Git-workflow

```bash
# Hämta senaste ändringar
git pull origin main

# Skapa ny branch för din feature
git checkout -b feature/mitt-feature

# Gör dina ändringar...

# Lägg till och committa
git add .
git commit -m "Beskrivning av vad jag gjort"

# Pusha till GitHub
git push origin feature/mitt-feature

# Skapa Pull Request på GitHub
# Be någon granska din kod innan merge!
```

---

## 📅 Tidsplan

### Vecka 1 (före Lektion 10)
- Setup: Repository, mappar, grundläggande filer
- Osman: Ordlista + regler klara
- Ali: Flask setup
- Kosar: Grundläggande HTML
- Didar: Tangentbordshantering

**Sprint Demo: Lektion 12**

### Vecka 2
- Integration: Koppla ihop frontend och backend
- Få grundläggande spel att fungera
- Färgkodning implementerad

**Sprint Demo: Lektion 14**

### Vecka 3
- Polera: Design, animationer, bugfixar
- Testa hela flödet
- Förbereda presentation

**Sprint Demo: Lektion 16**

### Vecka 4
- Sista bugfixar
- Förbered final presentation
- Öva demo

**Final Presentation: Lektion 18 (26 Februari)** ⚠️ OBLIGATORISK!

---

## 🎯 Definition of Done

En feature är klar när:
- [ ] Koden fungerar utan buggar
- [ ] Koden är pushad till GitHub
- [ ] Pull request är skapad och granskad
- [ ] Koden är merged till main branch
- [ ] Teamet har testat att det fungerar tillsammans

---

## Kontakt & Hjälp

### Om du fastnar:
1. Fråga i gruppchatt 
2. Fråga under lektionerna
3. Ta upp det på sprint demo
4. Googla felmeddelandet
5. Titta på dokumentation:
   - Flask: https://flask.palletsprojects.com/
   - JavaScript: https://developer.mozilla.org/
   - Git: https://git-scm.com/doc

### Viktiga länkar:
- **Original Wordle**: https://www.nytimes.com/games/wordle/index.html
- **Ordlistor**: https://github.com/tabatkins/wordle-list
- **GitHub Projects**: (länk kommer här när Osman skapat det)

---

## 📝 Noteringar

- **Språk**: Vi kör engelska ord (lättare att hitta ordlistor)
- **Databas**: Inte i första versionen (kanske senare om vi hinner)
- **Statistik**: Kanske senare, fokus på grundspelet först
- **Focus**: Agilt arbetssätt viktigare än perfekt produkt!

  Logic: 
  Frontend (JS)
      ↓
  POST /guess
      ↓
  Flask (Backend)
      ↓
  GameRules
      ↓
  JSON response
      ↓
  Frontend update UI


---

## ✨ Lycka till!

**Kom ihåg**: Det viktigaste är att vi arbetar agilt och lär oss teamwork. 
Spelet behöver inte vara perfekt! 🎉

---

**Skapad**: [2026-02-05]  
**Version**: 1.0
