// Objects and Game Logic for the Black Jack Game
// Prof. Frank Emanuel (c) 20204

// constants for the game 

const JOKER = 0, HEARTS = 1, SPADES = 2, DIAMONDS = 3, CLUBS = 4;
const ACE = 1, JACK = 11, QUEEN = 12, KING = 13;
const CARDBACK = "cardback.png";

// object definitions 

function Card( cardSuit, cardValue ) {

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

    const deck = [];

    for ( i = 0; i < numberDecks; i++){

        for ( iSuit = 1; iSuit <= 4; iSuit++ ){

            for ( iValue = 1; iValue <= KING; iValue++ ){

                deck.push( new Card(iSuit, iValue));

            }
        }
    }

}

Card.prototype.returnFacing = function () {
    return (this.faceup) ? this.frontimage : this.backimage;
}
Card.prototype.flip = function () {
    this.faceup = !(this.faceup);
}
Card.prototype.returnValue = function () { return this.value; }
Card.prototype.returnSuit = function () { return this.suit; }

Deck.prototype.dealCard = function () { return this.deck.pop(); }

