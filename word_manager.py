import random
import json
import os

class WordManager:
    """Hanterar ordlistor med JSON"""
    
    def __init__(self):
        base_dir = os.path.dirname(os.path.abspath(__file__))
        json_path = os.path.join(base_dir, 'data', 'words.json')
        
        with open(json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        self.answers = [word.upper() for word in data['answers']]
        self.valid_words = [word.upper() for word in data['valid_words']]
    
    def get_random_word(self):
        """Hämta slumpmässigt ord"""
        return random.choice(self.answers)
    
    def is_valid_word(self, word):
        """Kontrollera om ord är giltigt"""
        word_upper = word.upper()
        return word_upper in self.valid_words or word_upper in self.answers
    
    def get_word_count(self):
        """Antal ord (statistik)"""
        return {
            'answers': len(self.answers),
            'valid_words': len(self.valid_words)
        }


# ============ TEST ============
if __name__ == "__main__":
    print("Testar WordManager (JSON)...")
    print("-" * 50)
    
    try:
        wm = WordManager()
        
        # Test 1: Random word
        print("\n Test 1: Slumpmässigt ord")
        word = wm.get_random_word()
        print(f"   Ord: {word}")
        assert len(word) == 5, "Måste vara 5 bokstäver!"
        print("   ✓ GODKÄND!")
        
        # Test 2: Valid words
        print("\n Test 2: Validering")
        print(f"   'HELLO' giltig? {wm.is_valid_word('HELLO')}")
        print(f"   'ZZZZZ' giltig? {wm.is_valid_word('ZZZZZ')}")
        assert wm.is_valid_word('ZZZZZ') == False
        print("   ✓ GODKÄND!")
        
        # Test 3: Counts
        print("\n Test 3: Antal ord")
        counts = wm.get_word_count()
        print(f"   Svar: {counts['answers']}")
        print(f"   Giltiga: {counts['valid_words']}")
        print("   ✓ GODKÄND!")
        
        print("\n" + "=" * 50)
        print(" ALLA TESTER GODKÄNDA!")
        print("=" * 50)
        
    except FileNotFoundError:
        print("\n FEL: Kunde inte hitta data/words.json")
        print("   Skapa filen först!")
    except Exception as e:
        print(f"\n FEL: {e}")