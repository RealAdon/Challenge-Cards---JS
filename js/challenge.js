class Pile {
    constructor() {
      this.name = 'Pile';
      this.playedCards = [];
      this.direction = 'up';
      this.topCard = this.direction === 'up' ? 1 : 100; // Initialize topCard based on direction
    }
  
    playCard(card) {
      if (this.direction === 'up') {
        if (card > this.topCard || card === this.topCard - 10) {
          this.topCard = card;
          return true;
        }
      } else {
        if (card < this.topCard || card === this.topCard + 10) {
          this.topCard = card;
          return true;
        }
      }
      return false;
    }
  
    checkCard(card) {
      if (this.direction === 'up') {
        if (card > this.topCard || card === this.topCard - 10) {
          return true;
        }
      } else {
        if (card < this.topCard || card === this.topCard + 10) {
          return true;
        }
      }
      return false;
    }
  }
  
class UpwardPile extends Pile {
    constructor() {
        super();
        this.name = 'UpwardPile';
        this.topCard = 1;
        this.direction = 'up';
    }
}

class DownwardPile extends Pile {
    constructor() {
        super();
        this.name = 'DownwardPile';
        this.topCard = 100;
        this.direction = 'down';
    }
}

class Hand {
    constructor(maxCards) {
        this.cards = [];
        this.maxCards = maxCards;
    }
}

class Deck {
    constructor() {
        this.name = 'Deck';
        this.cards = this.shuffleCards(Array.from({length: 98}, (_, i) => i + 2)); // Create and shuffle cards
        this.pile1 = new UpwardPile();
        this.pile2 = new UpwardPile();
        this.pile3 = new DownwardPile();
        this.pile4 = new DownwardPile();
        this.hand = new Hand(8);
        this.dealCards();
    }

    shuffleCards(cards) {
        for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]]; // Swap
        }
        return cards;
    }

    dealCards() {
        const cardsToDraw = this.hand.maxCards - this.hand.cards.length;
        if (cardsToDraw > 0) {
        this.hand.cards.push(...this.cards.splice(0, cardsToDraw)); // Draw cards from the deck
        this.hand.cards.sort((a, b) => a - b); // Sort the hand
        return true;
        }
        return false;
    }

    checkPossibleMoves() {
        return this.hand.cards.some(card => 
        [this.pile1, this.pile2, this.pile3, this.pile4].some(pile => pile.checkCard(card))
        );
    }

    checkStateOfChallenge() {
        if (this.hand.cards.length === 0 && this.cards.length === 0) {
          return 'won';
        } else if (this.hand.cards.length > this.hand.maxCards - 2 && !this.checkPossibleMoves()) {
          return 'lost';
        } else if (this.hand.cards.length <= this.hand.maxCards - 2) {
          return 'draw';
        }
        return 'ongoing';
    }

    playCard(card, pileName) {
      // Convert card value to integer
      card = parseInt(card);
      const pile = this[pileName];
      if (!pile) {
          console.error(`Pile ${pileName} not found.`);
          return false;
      }
      if (!this.hand.cards.includes(card)) {
          console.error(`Card ${card} not found in hand.`);
          return false;
      }
      if (pile.playCard(card)) {
          this.hand.cards = this.hand.cards.filter(c => c !== card);
          return true;
      } else {
          return false;
      }
    }
}

class Challenge {
    constructor() {
        this.name = 'The Challenge';
    }

    newGame() {
        this.deck = new Deck();
        return true;
    }
}
