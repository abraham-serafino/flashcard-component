class Deck {
  constructor (startingCards) {
    this.cards = startingCards.clone() || [];
    this.currentCard = 0;
    this.currentlyDisplayedFace = 'front';
  }

  shuffle () {
    let shuffledCards = [];
    let index = 0;
    let cards = this.cards;

    while (cards.length > 0) { // O(n)
      index = Math.floor( Math.random() * cards.length );
      shuffledCards.push( (cards.splice( index, 1 )) [0] );
    }

    this.cards = shuffledCards;
    this.currentCard = 0;
  }

  nextCard () {
    let nextIndex = this.currentCard + 1;

    if (nextIndex < this.cards.length) {
      this.currentCard = nextIndex;
    }
  }

  previousCard () {
    let previousIndex = this.currentCard - 1;

    if (previousIndex >= 0) {
      this.currentCard = previousIndex;
    }
  }

  flipCard () {
    let face = this.currentlyDisplayedFace === 'front' ? 'back' : 'front';

    if (this.cards.length > 0) {
      this.currentlyDisplayedFace = face;
    }
  };

  removeCard () {
    let currentCard = this.currentCard;
    let lastCard = this.cards.length - 1;

    if (lastCard < 0) {
      return;
    }

    this.cards.splice(currentCard, 1);

    // avoid ArrayIndexOutOfBounds
    if (currentCard === lastCard) {
      this.currentCard =  0;
    }
  }
}
