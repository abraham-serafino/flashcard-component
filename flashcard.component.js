(function() {

  let template = `
    <style>

      #card-content, #title {
        text-align: center;
      }

      #card-content {
        position: absolute;
        top: 40%;
        transform: translateY(-40%);
        left: 5%;
        right: 5%;
      }

      #shuffle-button:hover {
        cursor: pointer;
      }

      #shuffle-button {
        position: absolute;
        bottom: 3%;
      }

      #card-count {
        position: absolute;
        bottom: 0;
        right: 5%;
      }

    </style>

    <div class="container">

      <div id="title"><content q="deck-title"></content></div>

      <button id="shuffle-button">Re-shuffle</button>
      <h3 id="card-count"></h3>
      </div>

      <h1 id="card-content"></h1>

    </div>
  `;

  class FlashcardView extends HTMLElement {
    createdCallback () {
      this.createShadowRoot().innerHTML = template;

      this.$cardCount     = this.shadowRoot.querySelector('#card-count');
      this.$shuffleButton = this.shadowRoot.querySelector('#shuffle-button');
      this.$cardContent   = this.shadowRoot.querySelector('#card-content');

      this.initializeEvents();
      this.reshuffle();
    }

    attatchedCallback () {}

    attributeChangedCallback (attributeName, oldValue, newValue) {}

    initializeEvents () {
      document.addEventListener('keyup', this.onKeyUp.bind(this));
      this.$shuffleButton.addEventListener('click', this.reshuffle.bind(this));

      let swipeTarget = Hammer(this.$cardContent);
      swipeTarget.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

      swipeTarget.on('swipeleft',   () => this.navigate('next'));
      swipeTarget.on('swiperight',  () => this.navigate('previous'));
      swipeTarget.on('tap',         () => this.navigate('flip'));
      swipeTarget.on('swipeup',     () => this.navigate('remove'));
    }

    onKeyUp (event) {

      switch(event.which) {
      case 39: this.navigate('next');     // right arrow
        break;

      case 37: this.navigate('previous'); // left arrow
        break;

      case 32: this.navigate('flip');     // spacebar
        break;

      case 13: this.navigate('remove');   // return key
        break;

      default: // do nothing
      }

      this.showCard(face);
    }

    navigate(action) {

      if (! ['next', 'previous', 'flip', 'remove'].includes(action)) {
        throw new Error("Action must be one of next, previous, flip or remove");
      }

      this.deck[action + 'Card']();

      let face = action !== 'flip' ? 'front' : this.deck.currentlyDisplayedFace;
      this.showCard(face);
    }

    reshuffle () {

      if (!this.deck || !this.deck.cards || this.deck.cards.length <= 0) {
        this.deck = new Deck(STARTING_CARDS);
      }

      this.deck.shuffle();
      this.showCard();
    }

    showCard (face) {
      let deck        = this.deck;
      let cards       = deck.cards;
      let currentCard = deck.currentCard;

      if (cards.length === 0) {
        this.$cardCount.innerHTML = '0/0';
        this.$cardContent.innerHTML = 'No cards remaining - good work!';

      } else {
        this.$cardContent.innerHTML = cards[currentCard][face || 'front'];
        this.$cardCount.innerHTML = `${currentCard + 1}/${cards.length}`;
      }
    }
  }

  document.registerElement('flashcard-component', FlashcardView);

})();
