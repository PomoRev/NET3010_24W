// Run Game - testing script

theDeck = new Deck ( 1, 0 );

/* steps for playing the game:
    1) check to see if the deck has less than 50% of cards 
        1a) if so shuffle
    2) take an ante of 10 chips from each player add to pot
    3) enable the bid button and the hold button 
    4) bidding adds 10 chips to pot each time it is pressed as long 
       as there are at least 10 chips in their chipstack.
    5) hold button starts the game 
    6) deal one card, face up to player 
    7) deal one card, face down to the dealer
    8) deal one card, face up to player 
    9) deal one card, face up to the dealer 
    10) evaluate player hand, if 21
        10a) disable hit button 
    11) if hit button pressed
        11a) deal faceup card to player
        11b) evaluate player hand, if 21 disable hit button
    12) if hold button pressed
        12a) disable buttons
        12b) reveal dealer card
        12c) while dealer hand evaluates less than 17
            12ca) deal one card face up to dealer
        12d) evaluate dealer hand
        12e) evaluate player hand
        12f) if dealer hand > 21 (bust)  then award bet * 2 to player 
        12g) 

 */

theDeck.shuffle();


console.log( " created a deck and shuffled it " );

// deal a card to eachplayer then the dealer until two cards 
// each and flip one dealer card and both player cards

dealer = new Player ( 0, "none", "dealerhand");

playerOne = new Player ( 1500, "playerchips", "playerhand");

playerOne.hand.addCard( theDeck.dealCard() );
playerOne.hand.addCard( theDeck.dealCard() );
playerOne.hand.addCard( theDeck.dealCard() );

playerOne.hand.displayHand();

/* dealerHand = new Hand("dealerhand");
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


 */



