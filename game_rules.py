class GameRules:
    
    MAX_ATTEMPTS = 6
    WORD_LENGTH = 5
    
    def __init__(self, target_word):
        self.target_word = target_word.upper()
        self.attempts = 0
        self.guesses = []
        self.game_over = False
        self.won = False
    
    def check_guess(self, guess):
        guess = guess.upper()
        
        if len(guess) != self.WORD_LENGTH:
            return {
                'error': 'Word must be 5 letters',
                'valid': False
            }
        
        self.attempts += 1
        self.guesses.append(guess)
        
        result = ['gray'] * self.WORD_LENGTH
        target_letters = list(self.target_word)
        guess_letters = list(guess)
        
        # First pass: mark greens
        for i in range(self.WORD_LENGTH):
            if guess_letters[i] == target_letters[i]:
                result[i] = 'green'
                target_letters[i] = None
                guess_letters[i] = None
        
        # Second pass: mark yellows
        for i in range(self.WORD_LENGTH):
            if guess_letters[i] is not None:
                if guess_letters[i] in target_letters:
                    result[i] = 'yellow'
                    idx = target_letters.index(guess_letters[i])
                    target_letters[idx] = None
        
        if guess == self.target_word:
            self.won = True
            self.game_over = True
            status = 'won'
        elif self.attempts >= self.MAX_ATTEMPTS:
            self.game_over = True
            status = 'lost'
        else:
            status = 'continue'
        
        return {
            'guess': guess,
            'result': result,
            'status': status,
            'attempts': self.attempts,
            'max_attempts': self.MAX_ATTEMPTS,
            'valid': True
        }


if __name__ == "__main__":
    print("Testing GameRules...")
    
    # Test 1
    game = GameRules("ROBOT")
    result = game.check_guess("ROBOT")
    assert result['result'] == ['green', 'green', 'green', 'green', 'green']
    print("Test 1 passed")
    
    # Test 2 - FIXED expected value
    game = GameRules("ROBOT")
    result = game.check_guess("FLOOR")
    # Position 3 is green because O matches O
    assert result['result'] == ['gray', 'gray', 'yellow', 'green', 'yellow']
    print("Test 2 passed")
    
    # Test 3
    game = GameRules("ROBOT")
    result = game.check_guess("SLEEK")
    assert result['result'] == ['gray', 'gray', 'gray', 'gray', 'gray']
    print("Test 3 passed")
    
    # Test 4
    game = GameRules("ROBOT")
    for i in range(6):
        result = game.check_guess("WRONG")
    assert result['status'] == 'lost'
    print("Test 4 passed")
    
    print("All tests passed!")