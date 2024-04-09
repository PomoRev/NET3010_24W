// Game logic as functions that use the objects for cards and players
// Prof. Frank Emanuel (c) 2024 

// constants and globals 

const LOSE = 0, BONUS = 2, WIN = 1, TIE = 47;

let gameWon = LOSE;

// create a deck object 

theDeck = new Deck ( 1, 0 );
theDeck.shuffle();

// create the two players and set up the screen elements 

dealer = new Player ( 0, "none", "dealerhand");
playerOne = new Player ( 70, "playerchips", "playerhand");

playerOne.displayMoney();
playerOne.displayWager();

function startGame() {

    // disable the play again button and remove any messages

    document.getElementById('endgame').style.display = 'none';
    document.getElementById('playagain').style.visibility = 'hidden';

    // assume game is a loss until we know otherwise (global)

    gameWon = LOSE;
    
    // check to see if the deck has less than 50% of cards, if not shuffle it

    if ( theDeck.numberOfCardsRemaining() < (DECKSIZE / 2) )
        theDeck.shuffle();

    // ante 10 chips 

    bid( 10 );

    // enable bid and hold 

    if ( playerOne.chipsLeft() > 0 )
        document.getElementById('bid').style.visibility = 'visible';
    
    document.getElementById('hold').style.visibility = 'visible';

}

/* steps for playing the game:

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

function runHand() {

    // Process the user hand creation 

    if (!handRunning) {

        handRunning = true;

        dealerHand = new Hand("dealerhand");
        playerHand = new Hand("playerhand");

        playerHand.addCard( theDeck.dealCard() );
        dealerHand.addCard( theDeck.dealCard() );
        playerHand.addCard( theDeck.dealCard() );
        dealerHand.addCard( theDeck.dealCard() );

        playerHand.cards[0].flip();
        playerHand.cards[1].flip();
        dealerHand.cards[1].flip();

        playerHand.displayHand();
        dealerHand.displayHand();

        document.getElementById('bid').style.visibility = 'hidden';

        if (playerHand.evaluateHand() !== 21 ){    
            document.getElementById('hit').style.visibility = 'visible';
            document.getElementById('hold').style.visibility = 'visible';
        } else {
            runHand();
        }

    } else {

        // completing the hand 

        handRunning = false;

        document.getElementById('hit').style.visibility = 'hidden';
        document.getElementById('hold').style.visibility = 'hidden';

        dealerHand.revealHand();
        dealerHand.displayHand();

        // check for natural 21 on player only a natural 21 for dealer will matter

        if ( (playerHand.evaluateHand() == 21 
            && (playerHand.numberOfCardsRemaining() == 2)) ){

        // player has a natural 21 

            if ( dealerHand.evaluateHand() !== 21 ) gameWon = BONUS;

        } else {

            while ( dealerHand.evaluateHand() < 17 ){
                dealerHand.addCard( theDeck.dealCard() );
                dealerHand.revealHand();
                dealerHand.displayHand();
            }

            if ( dealerHand.evaluateHand() > 21 ){

        // dealer busted 

                gameWon = WIN;

            } else if ( dealerHand.evaluateHand() == playerHand.evaluateHand() ) {
                    
                    gameWon = TIE;

                } else if ( dealerHand.evaluateHand() < playerHand.evaluateHand()) {

                        gameWon = WIN;

                    } else gameWon = LOSE;
        }

        endGame();
    }
}

function addCard() {

// if you are here hit is visible and hold is visible 

    playerHand.addCard( theDeck.dealCard() );
    playerHand.revealHand();
    playerHand.displayHand();

    if (playerHand.evaluateHand() == 21 ){  

        document.getElementById('hit').style.visibility = 'hidden';
        document.getElementById('hold').style.visibility = 'hidden';
        runHand();  

    } else if ( playerHand.evaluateHand() > 21 ){

    // player busts

            document.getElementById('hit').style.visibility = 'hidden';
            document.getElementById('hold').style.visibility = 'hidden';

            endGame();

        } 
}

function endGame() {

    // deal with payouts and messaging 

    switch (gameWon) {

        case LOSE:
                document.getElementById('endgame').innerText = "You have lost!";
            break;
        case TIE:
                document.getElementById('endgame').innerText = "No harm, no foul";
                playerOne.addMoney( playerOne.getWager() );
            break;
        case WIN:
                document.getElementById('endgame').innerText = "Winner, winner!";
                playerOne.addMoney( playerOne.getWager() * 2 );
            break;
        case WIN:
            document.getElementById('endgame').innerText = "Big winner!!!";
            playerOne.addMoney( playerOne.getWager() * 2.5 );
            break;

    }

    document.getElementById('endgame').style.display = 'block';

    playerOne.resetWager();
    playerOne.displayMoney();
    playerOne.displayWager();

    // playerHand.

    document.getElementById('playagain').style.visibility = 'visible';

    console.log("button made visible");

}

function bid( amount ) {

    document.getElementById('endgame').style.display = 'none';

    playerOne.betMoney( 10 );
    playerOne.displayMoney();
    playerOne.displayWager();
    
    if ( playerOne.chipsLeft() < 10 )  
    document.getElementById('bid').style.visibility = 'hidden';

} 


