//Car land is a kids game with similar functionality to candy land
//gameCardsInPlay array will hold card options to display. As cards are flipped over they will go to cardChosen and used they will get pushed to gameCardsUsed array
let gameCardsInPlay = [];
//let gameCardsUsed = [];
let cardChosen = [];
//card represents div in html that will hold card boxes(boxes with card deck options)
const card = document.querySelector('.card');
//divs that will hold single or double color cards depending on card array selection
const firstCardSlot = document.querySelector('.first-slot');
const secondCardSlot = document.querySelector('.second-slot');
//selects draw button
const drawButton = document.querySelector('.draw');
const directions = document.querySelector('.directions');
//defines current player
let currentPlayer = 1;
let newSpaceId;
let playerDisplay = document.getElementById('player-display');
//arrays will be filled in startGame function. id array contains all data ids as integers. colored arrays sort integers by what color their game space is.
let idarray = [];
let greenIds = [];
let blueIds = [];
let orangeIds = [];
let purpleIds = [];
//selects reset button to add click event to
const resetButton = document.querySelector('.reset');

//builds gameboard, called when web page loads and refreshes
function buildGameBoard() {
    const gameBoard = document.querySelector('.game-board');
    //gameBox represents individual square on game board. gameBox is devided into top and bottom to display player 1 and 2 respectively
    let gameBox;
    let gameBoxTop;
    let gameBoxBottom;
    for (let i = 0; i < 56; i++) {
        //adds gameBoxes to gameBoard and gives them each unique id
        gameBox = document.createElement('div');
        gameBoard.appendChild(gameBox);
        gameBox.classList.add('game-box');
        gameBox.setAttribute('data-id', i);
        //divides each game box into a top half to hold player1 car and a bottom half to hold player2 car
        idarray.push(i);
        gameBoxTop = document.createElement('div');
        gameBox.appendChild(gameBoxTop);
        gameBoxTop.classList.add('game-box-top');
        gameBoxBottom = document.createElement('div');
        gameBox.appendChild(gameBoxBottom);
        gameBoxBottom.classList.add('game-box-bottom');
        // adds color to spaces
        if (i === 14 || i === 25 || i === 36 || i === 55) {
            gameBox.classList.add('special');
        }
        if (i === 1 || i === 5 || i === 9 || i === 13 || i === 18 || i === 22 || i === 27 || i === 31 || i === 35 || i === 40 || i === 44 || i === 48 || i === 52 || i === 55) {
            gameBox.classList.add('green');
            greenIds.push(i);
        }
        if (i === 2 || i === 6 || i === 10 || i === 15 || i === 19 || i === 23 || i === 28 || i === 32 || i === 37 || i === 41 || i === 45 || i === 49 || i === 53 || i === 55) {
            gameBox.classList.add('blue');
            blueIds.push(i);
        }
        if (i === 3 || i === 7 || i === 11 || i === 16 || i === 20 || i === 24 || i === 29 || i === 33 || i === 38 || i === 42 || i === 46 || i === 50 || i === 54 || i === 55) {
            gameBox.classList.add('orange');
            orangeIds.push(i);
        }
        if (i === 4 || i === 8 || i === 12 || i === 17 || i === 21 || i === 26 || i === 30 || i === 34 || i === 39 || i === 43 || i === 47 || i === 51 || i === 55) {
            gameBox.classList.add('purple');
            purpleIds.push(i);
        }
        //adds characters to special spaces
        if (i === 55) {
            iconBox = document.createElement('div');
            gameBox.appendChild(iconBox);
            iconBox.classList.add('icon-box');
            iconBox.innerHTML = '<i class="fa-solid fa-flag-checkered"></i>';
        }
        if (i === 36) {
            iconBox = document.createElement('div');
            gameBox.appendChild(iconBox);
            iconBox.classList.add('icon-box');
            iconBox.innerHTML = '<i class="fa-solid fa-music"></i>';
        }
        if (i === 25) {
            iconBox = document.createElement('div');
            gameBox.appendChild(iconBox);
            iconBox.classList.add('icon-box');
            iconBox.innerHTML = '<i class="fa-solid fa-city"></i>';
        }
        if (i === 14) {
            iconBox = document.createElement('div');
            gameBox.appendChild(iconBox);
            iconBox.classList.add('icon-box');
            iconBox.innerHTML = '<i class="fa-solid fa-gift"></i>';
        }
        if (i === 0) {
            gameBoxTop.innerHTML = '<i class="fa-solid fa-car-side player1"></i>';
            gameBoxBottom.innerHTML = '<i class="fa-solid fa-car-side player2"></i>';
        }
    }
}
buildGameBoard();

//builds representation of cards and pushes them to gameCardsInPlay array and shuffles array
function buildCardDeck() {
    for (let i = 0; i < 6; i++) {
        gameCardsInPlay.push('singleGreen');
        gameCardsInPlay.push('singleOrange');
        gameCardsInPlay.push('singleBlue');
        gameCardsInPlay.push('singlePurple');
    }
    for (let i = 0; i < 4; i++) {
        gameCardsInPlay.push('doubleGreen');
        gameCardsInPlay.push('doubleOrange');
        gameCardsInPlay.push('doubleBlue');
        gameCardsInPlay.push('doublePurple');
    }
    gameCardsInPlay.push('gift');
    gameCardsInPlay.push('city');
    gameCardsInPlay.push('music');
}
buildCardDeck()
drawButton.addEventListener('click', drawCard);

//ids created when buildGameBoard is called and game board is created. ids will be used to target and move spaces on game board
let ids = document.querySelectorAll('[data-id]');

//will be used as an onclick function attached to reset button to restart game
function reset() {
    ids[newSpaceId].removeEventListener('click', makeMove);
    drawButton.removeEventListener('click', drawCard)
    //resets card deck
    gameCardsInPlay = [];
    gameCardsUsed = [];
    cardChosen = [];
    buildCardDeck();
    //removes players from board and puts them in start space
    ids[currentSpace(1)].firstElementChild.innerHTML = "";
    ids[currentSpace(2)].children[1].innerHTML = "";
    ids[0].firstElementChild.innerHTML = '<i class="fa-solid fa-car-side player1"></i>';
    ids[0].children[1].innerHTML = '<i class="fa-solid fa-car-side player2"></i>';
    //sets player display and current player to 1
    currentPlayer = 1;
    playerDisplay.classList.remove('player2');
    playerDisplay.classList.add('player1');
    //ensures draw button is one showing
    drawButton.style.display = 'inline-block';
    card.style.display = 'none';
    directions.innerHTML = 'Draw a card';
    //reset card slots to baseline
    firstCardSlot.classList = 'card-box first-slot';
    secondCardSlot.classList = 'second-slot';
    firstCardSlot.innerHTML = '';
    drawButton.addEventListener('click', drawCard);
}
resetButton.addEventListener('click', reset);

//finds current player space to compare to space arrays to make move
function currentSpace(player) {
    if (player === 1) {
        for (let i = 0; i < ids.length; i++) {
            if (ids[i].firstElementChild.innerHTML.includes('player1')) {
                return parseInt(ids[i].dataset.id);
            }
        }
    }
    if (player === 2) {
        for (let i = 0; i < ids.length; i++) {
            if (ids[i].children[1].innerHTML.includes('player2')) {
                return parseInt(ids[i].dataset.id);
            }
        }
    }
}

//handles click event lister for draw button to display card and update directions
function drawCard() {
    //rebuilds deck if no cards remain
    // if (gameCardsInPlay === null) {
    //     buildCardDeck();
    // }
    //generates a random number to plug into gameCardsInPlay array to select random card and push to cardChosen
    selectRandomNumber = () => {
        return Math.floor(Math.random() * gameCardsInPlay.length);
    }
    cardChosen.push(gameCardsInPlay[selectRandomNumber()]);
    //changes display from button to card selected and updates with next directions
    drawButton.style.display = 'none';
    card.style.display = 'flex';
    directions.innerHTML = 'Click game space';
    //adds functionality to display selected card depending on cardChosen
    //finds correct game space for selected card depending on currentSpace
    //last line adds event listener for a click to newSpaceId
    if (cardChosen[0] === 'singleBlue') {
        firstCardSlot.classList.add('blue');
        newSpaceId = blueIds.find(id => id > currentSpace(currentPlayer));
    }
    if (cardChosen[0] === 'singleGreen') {
        firstCardSlot.classList.add('green');
        newSpaceId = greenIds.find(id => id > currentSpace(currentPlayer));
    }
    if (cardChosen[0] === 'singleOrange') {
        firstCardSlot.classList.add('orange');
        newSpaceId = orangeIds.find(id => id > currentSpace(currentPlayer));
    }
    if (cardChosen[0] === 'singlePurple') {
        firstCardSlot.classList.add('purple');
        newSpaceId = purpleIds.find(id => id > currentSpace(currentPlayer));
    }
    if (cardChosen[0] === 'doubleBlue') {
        firstCardSlot.classList.add('blue');
        secondCardSlot.classList.add('card-box');
        secondCardSlot.classList.add('blue');
        let firstBlue = blueIds.find(id => id > currentSpace(currentPlayer));
        if (firstBlue === 55) {
            newSpaceId = 55;
        } else {
            newSpaceId = blueIds.find(id => id > firstBlue);
        }
    }
    if (cardChosen[0] === 'doubleGreen') {
        firstCardSlot.classList.add('green');
        secondCardSlot.classList.add('card-box');
        secondCardSlot.classList.add('green');
        let firstGreen = greenIds.find(id => id > currentSpace(currentPlayer));
        if (firstGreen === 55) {
            newSpaceId = 55;
        } else {
            newSpaceId = greenIds.find(id => id > firstGreen);
        }
        
    }
    if (cardChosen[0] === 'doubleOrange') {
        firstCardSlot.classList.add('orange');
        secondCardSlot.classList.add('card-box');
        secondCardSlot.classList.add('orange');
        let firstOrange = orangeIds.find(id => id > currentSpace(currentPlayer));
        if (firstOrange === 55) {
            newSpaceId = 55;
        } else {
            newSpaceId = orangeIds.find(id => id > firstOrange);
        }
        
    }
    if (cardChosen[0] === 'doublePurple') {
        firstCardSlot.classList.add('purple');
        secondCardSlot.classList.add('card-box');
        secondCardSlot.classList.add('purple');
        let firstPurple = purpleIds.find(id => id > currentSpace(currentPlayer));
        if (firstPurple === 55) {
            newSpaceId = 55;
        } else {
            newSpaceId = purpleIds.find(id => id > firstPurple);
        }
        
    }
    if (cardChosen[0] === 'gift') {
        firstCardSlot.classList.add('special');
        firstCardSlot.innerHTML = '<i class="fa-solid fa-gift"></i>';
        newSpaceId = 14;
    }
    if (cardChosen[0] === 'city') {
        firstCardSlot.classList.add('special');
        firstCardSlot.innerHTML = '<i class="fa-solid fa-city"></i>';
        newSpaceId = 25;
    }
    if (cardChosen[0] === 'music') {
        firstCardSlot.classList.add('special');
        firstCardSlot.innerHTML = '<i class="fa-solid fa-music"></i>';
        newSpaceId = 36;
    }
    ids[newSpaceId].addEventListener('click', makeMove);
}

//handles click event when player clicks on correct game space or alerts player to try again if correct space is not selected
function makeMove() {
    //resets cardChosen array to empty and puts used card in used array
    //gameCardsUsed.push(cardChosen);
    cardChosen = [];
    //moves red car if player1 and yellow car if player2, changes player, and changes player display
    if (currentPlayer === 1) {
        ids[currentSpace(1)].firstElementChild.innerHTML = "";
        ids[newSpaceId].firstElementChild.innerHTML = '<i class="fa-solid fa-car-side player1"></i>';
        currentPlayer = 2;
        playerDisplay.classList.remove('player1');
        playerDisplay.classList.add('player2');
    }
    else if (currentPlayer === 2) {
        ids[currentSpace(2)].children[1].innerHTML = "";
        ids[newSpaceId].children[1].innerHTML = '<i class="fa-solid fa-car-side player2"></i>';
        currentPlayer = 1;
        playerDisplay.classList.remove('player2');
        playerDisplay.classList.add('player1');
    }
    //reset card slots to baseline
    firstCardSlot.classList = 'card-box first-slot';
    secondCardSlot.classList = 'second-slot';
    firstCardSlot.innerHTML = '';
    //displays draw button, hides card, and updates player directions
    drawButton.style.display = 'inline-block';
    card.style.display = 'none';
    directions.innerHTML = 'Draw a card';
    ids[newSpaceId].removeEventListener('click', makeMove);
    if (newSpaceId === 55) {
        if (currentPlayer === 1) {
            currentPlayer = 2;
            playerDisplay.classList.remove('player1');
            playerDisplay.classList.add('player2');
        }
        else if (currentPlayer === 2) {
            currentPlayer = 1;
            playerDisplay.classList.remove('player2');
            playerDisplay.classList.add('player1');
        }
        directions.innerHTML = `Player ${currentPlayer} Wins!`;
        drawButton.removeEventListener('click', drawCard);
    }
}