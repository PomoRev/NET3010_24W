// Run Game - testing script

theDeck = new Deck ( 1, 0 );

/* steps for playing the game:
    0) disable play again button
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
    11) else if hit button pressed
        11a) deal faceup card to player
        11b) evaluate player hand, if 21 disable hit button
    12) if hold button pressed
        12a) disable all game buttons
        12b) set win condition to LOSE
        12c) reveal dealer card
        12d) evaluate both hands
        12e) if player is natural 21 and dealer does not
            12ea) award bet * 2.5 to player
            12eb) set win condition to BONUS
        12f) else while dealer hand less than 17 and dealer hand less than player hand
            12fa) deal one card face up to dealer
            12fb) evaluate dealer hand
        12g) if dealer hand > 21 (bust)   (these need to short circuit)
            12g1) award bet * 2 to player
            12g2) set win condition to WIN
        12h) else if dealer hand equal to player hand
            12ha) return bet to player
            12hb) set win condition to TIE
        12i) else if dealer hand < player hand
            12ia) award bet * 2 to player
            12ib) set win condition to WIN
    13) display response based on win condition
    14) activate a play again button
        


 */

theDeck.shuffle();


console.log( " created a deck and shuffled it " );

// deal a card to eachplayer then the dealer until two cards 
// each and flip one dealer card and both player cards

dealer = new Player ( 0, "none", "dealerhand");

playerOne = new Player ( 1500, "playerchips", "playerhand");

playerOne.hand.addCard( theDeck.dealCard() );
playerOne.hand.addCard( theDeck.dealCard() );
// playerOne.hand.addCard( theDeck.dealCard() );

playerOne.hand.revealHand();
playerOne.hand.displayHand();

console.log( "player has " + playerOne.hand.evaluateHand() );

playerOne.displayMoney();

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



