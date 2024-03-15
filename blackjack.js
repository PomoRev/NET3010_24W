// Objects and Game Logic for the Black Jack Game
// Prof. Frank Emanuel (c) 20204

// constants for the game 

const JOKER = 0, HEARTS = 1, SPADES = 2, DIAMONDS = 3, CLUBS = 4;
const ACE = 1, JACK = 11, QUEEN = 12, KING = 13;
const DECKSIZE = 52;
const CARDBACK = "cardback.png";

// object definitions 

function Card( cardSuit, cardValue ) {

   /*   This constructor expects a suit value from 0-4 and a value from 1-13, 
        if a 0 is given for the suit then the value is not important as 
        the card will be a joker.
        Cards are meant to be created in a Deck object.   
        Data:   the card suit, the card value, if it is faceup (default is false), 
                the filename of the card back image, and the filename of the image 
                for the front of the card.
        Methods (interface):
            returnFacing()  - returns true if the card is face up, otherwise returns false.
            flip()          - reverses the facing of the card.
            returnValue()   - returns the numeric value of the card.
            returnSuit()    - returns the numeric value for the card's suit.
            returnValueText()   - returns the text for the card's value if it is an ace or face card.
            returnSuitText()    - returns the text for the suit of the card.
    */ 

    this.suit = cardSuit;
    this.value = cardValue;
    this.faceup = false;
    this.backimage = CARDBACK;
    if ( this.suit == JOKER ){
        this.frontimage = "joker_red.svg"
    } else {

        switch (this.suit) {
            case HEARTS: this.frontimage = "hearts_";
                            break;
            case SPADES: this.frontimage = "spades_";
                            break;                
            case DIAMONDS: this.frontimage = "diamonds_";
                            break;                
            case CLUBS: this.frontimage = "clubs_";
                            break;  
        }

        switch (this.value) {
            case ACE: this.frontimage += "ace.svg";
                break;
            case JACK: this.frontimage += "jack.svg";
                break;
            case QUEEN: this.frontimage += "queen.svg";
                break;
            case KING: this.frontimage += "king.svg";
                break;    
            default:
                this.frontimage += this.value + ".svg";
                break;
        }
    } 
}

function Deck( numberDecks, numberJokers ){

    /*  This constructor expects a number of 52 card decks to include in 
        the deck as well as a variable number of jokers to add to the deck.   
        Data:   the main data is an array containing all of the cards of a deck. 
                Because the use of a deck is destructive, we will also store 
                the number of decks and the number of jokers in case we need 
                to refresh the deck.
        Methods (interface):
            dealCard()  - pops the last card off of the array of cards.
            numberOfCardsRemaining()  - returns the number of cards left in the deck.
            shuffle()   - randomizes the deck array using a Fisher-Yates algorithm.
            muckDeck()  - removes any remaining cards in the deck to prepare for full shuffle.
    */ 

    this.numberOfDecks = numberDecks;
    this.numberOfJokers = numberJokers;

    this.deck = [];

    for ( i = 0; i < numberDecks; i++){

        for ( iSuit = 1; iSuit <= 4; iSuit++ ){

            for ( iValue = 1; iValue <= KING; iValue++ ){

                this.deck.push( new Card(iSuit, iValue));

            }
        }
    }

    for ( i = 0; i < numberJokers; i++ ){
        this.deck.push( new Card (JOKER, JOKER) );
    }

}

function Hand( holder ){

    /*  This constructor creates an array for holding cards as well as functions 
        to allow the game to work. The constructor expects an class name for 
        display purposes, this is where the first card will be displayed.   
        Data:   The main data is an array of cards. The hand will contain an x 
                and y offset for positioning the hand on the screen. 
        Methods (interface):
            addCard()       - append a card to the hand's card array.
            setPosition( holder )  - allows us to modify the hand position on the display
            numberOfCardsRemaining()  - returns the number of cards left in the hand.
            displayHand()   - randomizes the deck array using a Fisher-Yates algorithm.
            evaluateHand()  - returns the value of the hand using Black Jack Rules.
            muckCard()      - discards a card from the hand.
            revealHand()    - turns all the cards in the hand face up.
    */    
   
        this.LocationDiv = holder;
        this.cards = [];
}

function Player ( wager, holder ){

    /*  This constructor creates a player who has a hand and an amount of 
        money with which to place wagers. There is a special player called 
        the dealer who has no limits to the amount of money available and 
        also has special rules for playing the game. 
        Data: hand of cards, amount of money available, are they a dealer.
        Methods (interface):
            addMoney()      - increase the amount you have available to bet
            betMoney()      - remove money for a bet
            chipsLeft()     - returns the number of chips left in player's stack
            displayMoney()  - update the number of chips available
            toggleDealer()  - inverts the dealer flag
            showPlayerType()- shows if they are a dealer or not
            showLocation()  - returns the ID for the div of chip pile
    */

    this.chipStack = wager;
    this.LocationDiv = holder;
    this.dealer = false;
}

// member functions

Card.prototype.returnFacing = function () {
    return (this.faceup) ? this.frontimage : this.backimage;
}
Card.prototype.flip = function () {
    this.faceup = !(this.faceup);
}
Card.prototype.returnValue = function () { return this.value; }
Card.prototype.returnSuit = function () { return this.suit; }
Card.prototype.returnValueText = function () { 
    let valueToReturn = "none";
    if (this.value == JOKER) {
        valueToReturn = "joker";
    } else {
        switch (this.value) {
            case ACE:   valueToReturn = "ace";
                break;
            case JACK:  valueToReturn = "jack";
                break;
            case QUEEN: valueToReturn = "queen";
                break;
            case KING:  valueToReturn = "king";
                break;    
            default:    valueToReturn = this.value;
                break;
        }
    }
    return valueToReturn;
}
Card.prototype.returnSuitText = function () {
    let valueToReturn = "joker";
    switch (this.suit) {
        case HEARTS: valueToReturn = "hearts";
            break;
        case SPADES: valueToReturn = "spades";
            break;                
        case DIAMONDS: valueToReturn = "diamonds";
            break;                
        case CLUBS: valueToReturn = "clubs";
            break;  
    }
    return valueToReturn;
}

Deck.prototype.dealCard = function () { return this.deck.pop(); }
Deck.prototype.numberOfCardsRemaining = function () { return this.deck.length; }
Deck.prototype.shuffle = function () {

        /*  Fisher Yates Array Shuffle Algorithm (modified)

        1.  Determine the size of the array, we will start at one end 
            of the array and move through the array.
        2.  Pick a random number between 1 and the 
            number of touched numbers remaining inclusive of the
            number of the current element itself.
        3.  Swap the current element with the random element.
        4.  Freeze the current element
        5.  Continue with the next element in the array until all
            elements have been visited once.
    
        The array should be sufficiently randomized. 
    */

    for ( i = (this.deck.length - 1); i > 1; i--) {

        let randomTarget = Math.floor(Math.random() * (i+1));

// console.log ( "swapping " + i + " with " + randomTarget );

        let temp = this.deck[i];
        this.deck[i] = this.deck[randomTarget];
        this.deck[randomTarget] = temp;

    }

}
Deck.prototype.muckDeck = function () {

    // empty the array

    let numberOfIterations = this.numberOfCardsRemaining();

    for (i = 0; i < numberOfIterations; i++){
        this.dealCard();
    }

    // repopulate the deck with a full set of cards and jokers

    for ( i = 0; i < this.numberOfDecks; i++){

        for ( iSuit = 1; iSuit <= 4; iSuit++ ){

            for ( iValue = 1; iValue <= KING; iValue++ ){
                this.deck.push( new Card(iSuit, iValue));
            }
        }
    }

    for ( i = 0; i < this.numberOfJokers; i++ ){
        this.deck.push( new Card (JOKER, JOKER) );
    }
}

Hand.prototype.setPosition = function (holder) {
    this.LocationDiv = holder;
}
Hand.prototype.addCard = function ( card ) { this.cards.push(card);}
Hand.prototype.numberOfCardsRemaining = function () { return this.cards.length; }
Hand.prototype.displayHand = function() {
    
    // start at rigth 30 for each card and z-index starts a 1

    // for each card in hand 
    //     set right style property to 30 * card number (start at 1)
    //     set the z index incrementing from 1
    //     display the card on the screen

    let firstPosition = 30;
    let zValue = 1;
    divholder = document.getElementsByClassName(this.LocationDiv)[0];
    divholder.innerHTML = "";  // clear out old cards

    for (const currentCard of this.cards) {
        imageToDisplay = (currentCard.faceup) ? currentCard.frontimage : currentCard.backimage;
        divholder.innerHTML += "<IMG src='images/" + imageToDisplay + "' style='right:" 
            + firstPosition + "px; z-index: " + zValue + "'>";
        zValue += 1;
        firstPosition += 30;   
    }
}

Hand.prototype.evaluateHand = function () {

    let handValue = 0;

    // build an algorithm

    return handValue;
}

Hand.prototype.muckCard = function ( cardOffset ) {

    // build an algorithm
    
}

Hand.prototype.revealHand = function () {

    for (const card of this.cards) {
        card.faceup = true;
    }

}

Player.prototype.addMoney( amount ) {
    this.chipStack += amount;
}

Player.prototype.betMoney( amount ) {
    this.chipStack -= amount;
}

Player.prototype.chipsLeft () {
    return this.chipStack;
}


// Run Game

theDeck = new Deck ( 1, 0 );

theDeck.shuffle();

console.log( " created a deck and shuffled it " );

// deal a card to eachplayer then the dealer until two cards 
// each and flip one dealer card and both player cards

dealerHand = new Hand("dealerhand");
playerHand = new Hand("playerhand");

console.log( "length of deck before deal = " + theDeck.numberOfCardsRemaining() );

playerHand.addCard( theDeck.dealCard() );
dealerHand.addCard( theDeck.dealCard() );
playerHand.addCard( theDeck.dealCard() );
dealerHand.addCard( theDeck.dealCard() );
playerHand.addCard( theDeck.dealCard() );

console.log( "length of deck after deal = " + theDeck.numberOfCardsRemaining() );

playerHand.cards[0].flip();
playerHand.cards[1].flip();
playerHand.cards[2].flip();
dealerHand.cards[1].flip();

playerHand.displayHand();
dealerHand.displayHand();

document.getElementById("hold").style.visibility = "visible";

function revealHands() {

    dealerHand.revealHand();
    dealerHand.displayHand();

}


