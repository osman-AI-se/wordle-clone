from flask import Flask, render_template, request, session, jsonify
from word_manager import WordManager
from game_rules import GameRules

app = Flask(__name__)
app.secret_key = "super_secret_wordle_key"

word_manager = WordManager()


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/game')
def game(): # start new game
    
    target_word = word_manager.get_random_word()

    session['target_word'] = target_word
    session['attempts'] = 0
    session['guesses'] = []
    session['game_over'] = False
    session['won'] = False

    return render_template('game.html')


@app.route('/guess', methods=['POST'])
def guess():
    if session.get('game_over'):
        return jsonify({'error': 'Game is already over', 'valid': False})

    data = request.get_json()
    guess_word = data.get('guess')

    # validate guess provided
    if not guess_word:
        return jsonify({'error': 'No guess provided', 'valid': False})

    # validate guess is a valid word 
    if not word_manager.is_valid_word(guess_word):
        return jsonify({'error': 'Invalid word', 'valid': False})

    # recreate game object from session
    game = GameRules(session['target_word'])
    game.attempts = session['attempts']
    game.guesses = session['guesses']
    game.game_over = session['game_over']
    game.won = session['won']

    result = game.check_guess(guess_word)

    # update session
    session['attempts'] = game.attempts
    session['guesses'] = game.guesses
    session['game_over'] = game.game_over
    session['won'] = game.won

    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)
