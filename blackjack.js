// Objects and Game Logic for the Black Jack Game
// Prof. Frank Emanuel (c) 20204

// constants for the game 

const JOKER = 0, HEARTS = 1, SPADES = 2, DIAMONDS = 3, CLUBS = 4;
const ACE = 1, JACK = 11, QUEEN = 12, KING = 13;
const CARDBACK = "cardback.png";

// object definitions 

function Card( cardSuit, cardValue ) {

   /*   This constructor expects a suit value from 0-4 and a value from 1-13, if a 0 is given 
        for the suit then the value is not important as the card will be a joker.
        Cards are meant to be created in a Deck object.   
        Data:   the card suit, the card value, if it is faceup (default is false), the 
                filename of the card back image, and the filename of the image for the front 
                of the card.
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

    // build an algorithm

}
