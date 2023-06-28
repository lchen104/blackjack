
let player = {
    name: "Leo",
    age: 52,
    chips: 100,
    cards: [],
    sum: 0,
    hasBlackjack: false,
    isAlive: false
}

let dealer = {
    name: "Dealer",
    age: 21,
    chips: 100,
    cards: [],
    sum: 0,
    hasBlackjack: false,
    isAlive: false
}


let playerMessage = ""
let playerMessageEl = document.getElementById("player-message-el")

let dealerMessage = ""
let dealerMessageEl = document.getElementById("dealer-message-el")

let playerSumEl = document.getElementById("player-sum-el")
let dealerSumEl = document.getElementById("dealer-sum-el")

let playerCardsEl = document.getElementById("player-cards-el")
let dealerCardsEl = document.getElementById("dealer-cards-el")

let playerEl = document.getElementById("player-el")
let dealerEl = document.getElementById("dealer-el")

playerEl.textContent = player.name + ": $" + player.chips;
dealerEl.textContent = dealer.name + ": $" + dealer.chips;



function newGame() {
    // console.log(player);
    // console.log(dealer);
    // console.log(player.name);
    // console.log(player.chips);
    dealerMessage = "";
    playerMessage = "";
    dealer.sum = 0;
    player.sum = 0;
    dealerCardsEl.innerHTML = `<img class="cardImg" src="/imgs/BACK.png">`;
    dealerSumEl.textContent = 'Dealer Sum:';

    if (player.chips < 20) {
        playerMessageEl.textContent = "Sorry, you do not have enough funds to play";
    } else {
        player.isAlive = true;
        player.hasBlackJack = false;
        // console.log(player);
        let playerFirstCard = getRandomCard();
        let playerSecondCard = getRandomCard();
  
        player.cards = [playerFirstCard, playerSecondCard];
        player.sum = playerFirstCard + playerSecondCard;

        // dealer.isAlive = true;
        // dealer.hasBlackJack = false;

        // let dealerFirstCard = getRandomCard();
        // let dealerSecondCard = getRandomCard();

        // dealer.cards = [dealerFirstCard, dealerSecondCard];
        // dealer.sum = dealerFirstCard + dealerSecondCard;

        renderGame();
    }
}

function getRandomCard() {
    return andomNum = Math.floor(Math.random()*11) + 1;

    // let randomNum = Math.floor(Math.random()*13) + 1;
    // if (randomNum > 10) {
    //     return 10;
    // } else if (randomNum === 1) {
    //     return 11;
    // } else {
    //     return randomNum;
    // }
}

function renderGame() {
    playerCardsEl.textContent = "Player Cards: "
    for (let i = 0; i < player.cards.length; i++) {
        // playerCardsEl.textContent += player.cards[i] + " "
        let num = Math.floor(Math.random() * 4) + 1;
        let suit;
        switch (num) {
            case 1:
                suit = 'c';
                break;
            case 2:
                suit = 'd';
                break;
            case 3:
                suit = 's';
                break;
            case 4:
                suit = 'h';
                break;
        }

        playerCardsEl.innerHTML += `<img class='cardImg' src='./imgs/${player.cards[i]}-${suit}.png'>`;
    }

    // dealerCardsEl.textContent = "Dealer Cards: "
    // for (let j = 0; j < dealer.cards.length; j++) {
    //     dealerCardsEl.textContent += dealer.cards[j] + " "
    // }
    
    playerSumEl.textContent = "Player Sum: " + player.sum

    // dealerSumEl.textContent = "Dealer Sum: " + dealer.sum

    if (player.sum <= 20) {
        playerMessage = "Do you want to draw a new card?"
    } else if (player.sum === 21) {
        playerMessage = "You've got Blackjack!"
        player.hasBlackJack = true;
        // player.chips += 20;
        playerEl.textContent = player.name + ": $" + player.chips;
    } else {
        playerMessage = "You're out of the game!"
        // console.log(this.chips)
        player.chips -= 20;
        dealer.chips += 20;
        // console.log(this.chips)
        player.isAlive = false;
        playerEl.textContent = player.name + ": $" + player.chips;
        dealerEl.textContent = dealer.name + ": $" + dealer.chips;
    }
    playerMessageEl.textContent = playerMessage;
}

function newCard() {
    // console.log("Here: " + Player)
    if (player.isAlive === true && player.hasBlackJack === false) {
        let card = getRandomCard();
        player.sum += card;
        player.cards.push(card);
        renderGame();    
    }
}

function stand() {
    if (player.sum > 0 && player.isAlive === true) {
        player.isAlive = false;
        dealer.isAlive = true;
        dealer.hasBlackJack = false;

        let dealerFirstCard = getRandomCard();
        let dealerSecondCard = getRandomCard();

        dealer.cards = [dealerFirstCard, dealerSecondCard];
        dealer.sum = dealerFirstCard + dealerSecondCard;
        dealersTurn();
        player.sum = 0;
        
    }
    
}

function addFunds() {
    player.chips += 20;
    playerEl.textContent = player.name + ": $" + player.chips;
}


function dealersTurn() {
    console.log('Dealers turn!');
    console.log(dealer.chips);
    
    // dealerMessage = "Dealer Draws"

    dealerCardsEl.textContent = "Dealer Cards: "
    for (let j = 0; j < dealer.cards.length; j++) {
        // dealerCardsEl.textContent += dealer.cards[j] + " "

        let num = Math.floor(Math.random() * 4) + 1;
        let suit;
        switch (num) {
            case 1:
                suit = 'c';
                break;
            case 2:
                suit = 'd';
                break;
            case 3:
                suit = 's';
                break;
            case 4:
                suit = 'h';
                break;
        }

        dealerCardsEl.innerHTML += `<img class='cardImg' src='./imgs/${dealer.cards[j]}-${suit}.png'>`;



    }

    dealerSumEl.textContent = "Dealer Sum: " + dealer.sum

    console.log(dealer.sum + ":" + player.sum)

    if (dealer.sum < 17) {
        if (dealer.isAlive === true && dealer.hasBlackJack === false) {
            let card = getRandomCard();
            dealer.sum += card;
            dealer.cards.push(card);
            dealersTurn();    
        }
    } else if (dealer.sum === 21) {
        dealerMessage = "Dealer got Blackjack!"
        playerMessage = "Sorry, you lost!"
        dealer.hasBlackJack = true;
        dealer.chips += 20;
        player.chips -= 20;
        // dealerEl.textContent = dealer.name + ": $" + dealer.chips;
    } else {
        // dealerMessage = "Dealer is out of the game!"
        // console.log(dealer.chips)
        // dealer.chips -= 20;
        // player.chips += 20;
        // console.log(dealer.chips)
        dealer.isAlive = false;

        if (dealer.sum < 22 && dealer.sum > player.sum) {
            dealerMessage = "Dealer WINS!"
            playerMessage = ""
            player.chips -= 20;
            dealer.chips += 20;
        } else {
            playerMessage = "Player WINS!"
            player.chips += 20;
            dealer.chips -= 20;
        }

        playerEl.textContent = player.name + ": $" + player.chips;
        dealerEl.textContent = dealer.name + ": $" + dealer.chips;
    }
    playerMessageEl.textContent = playerMessage
    dealerMessageEl.textContent = dealerMessage
}