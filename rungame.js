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

dealerHand = new Hand("dealerhand");
playerHand = new Hand("playerhand");

playerOne.displayMoney();
playerOne.displayWager();

function startGame() {

    // disable the play again button and remove any messages and cards

    document.getElementById('endgame').style.display = 'none';
    document.getElementById('playagain').style.visibility = 'hidden';

    dealerHand.muckHand();
    playerHand.muckHand();

    playerHand.displayHand();
    dealerHand.displayHand();

    // assume game is a loss until we know otherwise (global)

    gameWon = LOSE;
    
    // check to see if the deck has less than 50% of cards, if not shuffle it

    if ( theDeck.numberOfCardsRemaining() < (DECKSIZE / 2) )
        theDeck.shuffle();

    // ante 10 chips 

    if ( playerOne.chipsLeft() < 10 ) {

    // gambling addiction message and rebuy

        document.getElementById('hit').style.visibility = 'hidden';
        document.getElementById('hold').style.visibility = 'hidden';
        document.getElementById('playagain').style.visibility = 'visible';
        document.getElementById('warning').style.display = 'block';

    } else { 
        
        bid( 10 );

    // enable bid and hold 

        if ( playerOne.chipsLeft() > 0 )
            document.getElementById('bid').style.visibility = 'visible';
        document.getElementById('hold').style.visibility = 'visible';
    
    }

}

function runHand() {

    // Process the user hand creation 

    if (!handRunning) {

        handRunning = true;

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

}

function bid( amount ) {

    document.getElementById('endgame').style.display = 'none';

    playerOne.betMoney( 10 );
    playerOne.displayMoney();
    playerOne.displayWager();
    
    if ( playerOne.chipsLeft() < 10 )  
    document.getElementById('bid').style.visibility = 'hidden';

} 

function rebuy() {

    playerOne.addMoney( 100 );
    playerOne.displayMoney();

    document.getElementById('warning').style.display = 'none';

}

