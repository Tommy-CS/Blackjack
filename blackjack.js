//buttons
let playEl = document.getElementById("play-btn");
let hitEl = document.getElementById("hit-btn");
let resetEl = document.getElementById("reset-btn")
let standEl = document.getElementById("stand-btn");

// player section
let playerSumEl = document.getElementById("playerSum-el");
let playerCardsEl = document.getElementById("playerCards-el");
let coinsEl = document.getElementById("coins-el");
let firstCard = 0;
let secondCard = 0;
let myCards = [];
let playerSum = 0;

//dealer section
let dealerCardsEl = document.getElementById("dealerCards-el");
let dealerSumEl = document.getElementById("dealerSum-el");
let dealerFirstCard = 0;
let dealerSecondCard = 0;
let dealerCards = [];
let dealerSum = 0;

//misc
let messageEl = document.getElementById("message-el");
let hasBlackJack = false;
let isAlive = false;
let message = "";
let min = 1;
let max = 11;
let randomNum = 0;
let playerCoins = 200;
let betAmount = 0;
let winningBet = 0;

//main function that starts when player hits play.
function play() {
    isAlive = true;
    placeBet();
    if (betAmount >= 0) {
        cards();
        BJMessagePrompts();
        sumMessage();  
        updateBetMax();
    }
    else {
        messageEl.textContent = "Invalid bet amount. Please enter a valid amount within your coin balance."
    }

}

//generates player and dealer cards
function cards() {
    firstCard = calculateRandomNum();
    secondCard = calculateRandomNum();

    myCards.push(firstCard);
    myCards.push(secondCard);
    playerCardsEl.textContent = "Your Cards: " + firstCard + " " + secondCard
    playerSum = firstCard + secondCard;

    dealerFirstCard = calculateRandomNum();
    dealerSecondCard = calculateRandomNum();

    dealerCards.push(dealerFirstCard);
    dealerCards.push(dealerSecondCard);
    dealerCardsEl.textContent = "Dealer Cards: " + dealerFirstCard + " " + dealerSecondCard;
    dealerSum = dealerFirstCard + dealerSecondCard;
}

//Creates the new card for player
function hit() {

    if (playerSum < 21) {
        let newCard = calculateRandomNum();
        myCards.push(newCard);

        playerSum += newCard;
        playerCardsEl.textContent = "Your Cards: " + myCards.join(" ");
        playerSumEl.textContent = "Your Sum: " + playerSum;

        BJMessagePrompts();
    }
    else {
        messageEl.textContent = "Reset to play again.";
    }
}

//when the player stands, the dealerHit() function is called until dealer's sum is < 21
function stand() {
    if (dealerSum > playerSum) {
        message = "Dealer won! You stink!";
        return;
    }
    while (dealerSum < 21) {
        dealerHit();
        if (dealerSum > playerSum && dealerSum <= 21) {
            messageEl.textContent = "Dealer won! You suck 😈";
            playerCoins -= betAmount;
            coinsEl.textContent = "Your Coins: $" + playerCoins;
        }
        else if (dealerSum > 21 && playerSum <= 21) {
            messageEl.textContent = "Dealer busted! You won!!! 🎉🎉🎉";
            playerCoins += winningBet;
            coinsEl.textContent = "Your Coins: $" + playerCoins;
        }
    }
}

//generates a new card for the dealer
function dealerHit() {
    let newCard = calculateRandomNum();
    dealerCards.push(newCard);

    dealerSum += newCard;
    dealerCardsEl.textContent = "Dealer Cards: " + dealerCards.join(" ");
    dealerSumEl.textContent = "Dealer Sum: " + dealerSum;
}

//BJ prompts
function BJMessagePrompts() {
    coinsEl.textContent = "Your Coins: $" + playerCoins;

    //if the dealer and player both get 21 off the start, coins remain unchanged 
    if (dealerSum == 21 && playerSum == 21) {
        message = "You both got blackjack! It's a tie."
    }
    else if(dealerSum == 21 && playerSum != 21) {
        message = "Very unlucky! Dealer got blackjack."
        playerCoins -= betAmount;
        coinsEl.textContent = "Your Coins: $" + playerCoins;
    }
    else if (playerSum == 21 && dealerSum != 21) {
        message = "YOU GOT BLACKJACK! 🎉🎉🎉";
        playerCoins += winningBet;
        coinsEl.textContent = "Your Coins: $" + playerCoins;
        hasBlackJack = true;
    }
    else if (playerSum < 21) {
        message = "Do you want to draw a new card?";   
    } 
    else {
        message = "YOU BUSTED 😂";
        playerCoins -= betAmount;
        coinsEl.textContent = "Your Coins: $" + playerCoins;
        isAlive = false;
    }
    messageEl.textContent = message;
}

//BETTING FUNCTIONS
function placeBet() {
    betAmount = parseInt(document.getElementById('bet-amount').value);

    // Check if the bet amount is valid, if it is then deduct that amount
    if (betAmount > 0 && betAmount <= playerCoins) {
        coinsEl.textContent = "Remaining Coins After Bet: $" + playerCoins + " - $" + betAmount + " = $" + (playerCoins - betAmount); 
        updateBetMax();
        messageEl.textContent = "You placed a bet of $"+ betAmount;
    } else {
        messageEl.textContent = "Invalid bet amount. Please enter a valid amount within your coin balance.";
    }
}

function updateBetMax() {
    let betInput = document.getElementById('bet-amount');
    winningBet = betAmount * 2;
    console.log(winningBet);
    betInput.max = playerCoins;
}

//MISC
function sumMessage() {
    playerSumEl.textContent = "Your Sum: " + playerSum;
    dealerSumEl.textContent = "Dealer Sum " + dealerSum;
}

function calculateRandomNum() {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//This resets the code to allow the user to keep playing. However, it does not reset the amount of coins.
function reset() {
    firstCard = calculateRandomNum();
    secondCard = calculateRandomNum();
    messageEl.textContent = "Think you'll win? Hit play to test your luck!";
    myCards = [];
    playerCardsEl.textContent = "Your Cards: ";
    playerSumEl.textContent = "Your Sum: ";
    playerSum = firstCard + secondCard;

    dealerFirstCard = calculateRandomNum();
    dealerSecondCard = calculateRandomNum();
    dealerCards = [];
    dealerCardsEl.textContent = "Dealer Cards: ";
    dealerSumEl.textContent = "Dealer Sum: ";
    dealerSum = dealerFirstCard + dealerSecondCard;

    coinsEl.textContent = "Your Coins: $" + playerCoins;

    updateBetMax();
}

//This FULLY resets the code. Resets the coins to the original amount of $200.
function fullReset() {
    firstCard = calculateRandomNum();
    secondCard = calculateRandomNum();
    messageEl.textContent = "Think you'll win? Hit play to test your luck!";
    myCards = [];
    playerCardsEl.textContent = "Your Cards: ";
    playerSumEl.textContent = "Your Sum: ";
    playerSum = firstCard + secondCard;

    dealerFirstCard = calculateRandomNum();
    dealerSecondCard = calculateRandomNum();
    dealerCards = [];
    dealerCardsEl.textContent = "Dealer Cards: ";
    dealerSumEl.textContent = "Dealer Sum: ";
    dealerSum = dealerFirstCard + dealerSecondCard;

    playerCoins = 200;
    coinsEl.textContent = "Your Coins: $" + playerCoins;

    updateBetMax();
}