from flask import Flask, render_template, request, session, redirect, url_for
from word_manager import *
from game_rules import *


app = Flask(__name__)


@app.route('/')
def index():
    # Homepage
    return render_template('index.html')

@app.route("/game")
def game():
    # Game page 
    return render_template("game.html")





if __name__ == "__main__":
    app.run()