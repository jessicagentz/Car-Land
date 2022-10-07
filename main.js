//selects gameBoard from html and function buildGameBoard builds game board and inserts it in that div
const gameBoard = document.querySelector('.game-board');
//gameBox represents individual square on game board. gameBox is devided into top and bottom to display player 1 and 2 respectively
let gameBox;
let gameBoxTop;
let gameBoxBottom;
//gameCardsInPlay array will hold card options to display. As cards are flipped over they will go to cardChosen and used they will get pushed to gameCardsUsed array
let gameCardsInPlay = [];
let gameCardsUsed = [];
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




//builds gameboard initially and will be called to reset game upon clicking reset button
function startGame() {
    function buildGameBoard() {
        for (let i = 0; i < 56; i++) {
            //adds gameBoxes to gameBoard and gives them each unique id
            gameBox = document.createElement('div');
            gameBoard.appendChild(gameBox);
            gameBox.classList.add('game-box');
            gameBox.setAttribute('data-id', i);
            //divides each game box into a top half to hold player1 car and a bottom half to hold player2 car
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
            if (i === 1 || i === 5 || i === 9 || i === 13 || i === 18 || i === 22 || i === 27 || i === 31 || i === 35 || i === 40 || i === 44 || i === 48 || i === 52) {
                gameBox.classList.add('green');
            }
            if (i === 2 || i === 6 || i === 10 || i === 15 || i === 19 || i === 23 || i === 28 || i === 32 || i === 37 || i === 41 || i === 45 || i === 49 || i === 53) {
                gameBox.classList.add('blue');
            }
            if (i === 3 || i === 7 || i === 11 || i === 16 || i === 20 || i === 24 || i === 29 || i === 33 || i === 38 || i === 42 || i === 46 || i === 50 || i === 54) {
                gameBox.classList.add('orange');
            }
            if (i === 4 || i === 8 || i === 12 || i === 17 || i === 21 || i === 26 || i === 30 || i === 34 || i === 39 || i === 43 || i === 47 || i === 51) {
                gameBox.classList.add('purple');
            }
            //adds characters to special spaces
            if (i === 55) {
                gameBox.innerHTML = '<i class="fa-solid fa-flag-checkered"></i>';
            }
            if (i === 36) {
                gameBox.innerHTML = '<i class="fa-solid fa-music"></i>';
            }
            if (i === 25) {
                gameBox.innerHTML = '<i class="fa-solid fa-city"></i>';
            }
            if (i === 14) {
                gameBox.innerHTML = '<i class="fa-solid fa-gift"></i>';
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
}
startGame();

let ids = document.querySelectorAll('[data-id]');
let idCurrentSpacePlayer1;
let idCurrentSpacePlayer2;
let greenIds = [];
let blueIds = [];
let orangeIds = [];
let purpleIds = [];
let specialIds = [];
//creates array of ids for different colored spaces that will be used to target and move spaces
function idSpacesByColor() {
    for (let i = 0; i < ids.length; i++) {
        if (ids[i].className === 'game-box green') {
            greenIds.push(ids[i].dataset.id);
        }
        if (ids[i].className === 'game-box blue') {
            blueIds.push(ids[i].dataset.id);
        }
        if (ids[i].className === 'game-box orange') {
            orangeIds.push(ids[i].dataset.id);
        }
        if (ids[i].className === 'game-box purple') {
            purpleIds.push(ids[i].dataset.id);
        }
        if (ids[i].className === 'game-box special') {
            specialIds.push(ids[i].dataset.id);
        }
    }
}
idSpacesByColor();

//will be used as an onclick function attached to reset button to restart game
function reset() {
    gameCardsInPlay = [];
    gameCardsUsed = [];
    drawButton.style.display = 'inline block';
    card.style.display = 'none';
    //remove any classLists on board*********************************
    startGame()
}

//finds current player space to compare to space arrays to make move
function currentSpace(player) {
    if (player === 1) {
        for (let i = 0; i < ids.length; i++) {
            if (ids[i].firstElementChild.innerHTML === ('<i class="fa-solid fa-car-side player1"></i>')) {
                return ids[i].dataset.id;
            }
        }
    }
    if (player === 2) {
        for (let i = 0; i < ids.length; i++) {
            if (ids[i].lastChild.innerHTML === ('<i class=\"fa-solid fa-car-side player2\"></i>')) {
                return ids[i].dataset.id;
            }
        }
    }
}

//handles click event lister for draw button to display card and update directions
function drawCard() {
    //rebuilds deck if no cards remain
    if (gameCardsInPlay === null) {
        startGame.buildCardDeck();
    }
    //adds random number to select random card from gameCardsInPlay and push to cardChosen
    let randomCardId = Math.floor(Math.random() * gameCardsInPlay.length);
    cardChosen.push(gameCardsInPlay[randomCardId]);
    //changes display from button to card selected and updates with next directions
    drawButton.style.display = 'none';
    card.style.display = 'flex';
    directions.innerHTML = 'Click game space';
    // let cardChosen = ['doubleGreen'];
    console.log(cardChosen[0]);
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
        firstBlue = blueIds.find(id => id > currentSpace(currentPlayer));
        newSpaceId = blueIds.find(id => id > firstBlue);
    }
    if (cardChosen[0] === 'doubleGreen') {
        firstCardSlot.classList.add('green');
        secondCardSlot.classList.add('card-box');
        secondCardSlot.classList.add('green');
        firstGreen = greenIds.find(id => id > currentSpace(currentPlayer));
        newSpaceId = greenIds.find(id => id > firstGreen);
    }
    if (cardChosen[0] === 'doubleOrange') {
        firstCardSlot.classList.add('orange');
        secondCardSlot.classList.add('card-box');
        secondCardSlot.classList.add('orange');
        firstOrange = orangeIds.find(id => id > currentSpace(currentPlayer));
        newSpaceId = orangeIds.find(id => id > firstOrange);
    }
    if (cardChosen[0] === 'doublePurple') {
        firstCardSlot.classList.add('purple');
        secondCardSlot.classList.add('card-box');
        secondCardSlot.classList.add('purple');
        firstPurple = purpleIds.find(id => id > currentSpace(currentPlayer));
        newSpaceId = purpleIds.find(id => id > firstPurple);
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
    alert('function works')
    //accepts click in correct game space
    //alert if clicks anywhere outside of correct game space
    //define currentSpace for player
    //resets cardChosen array to empty and puts used card in used array
    gameCardsUsed.push(cardChosen);
    //checks for current player and changes player
    //update directions
    //display draw button and hide card
}
// let singleGreen;
//     let doubleGreen;
//     let singleBlue;
//     let doubleBlue;
//     let singleOrange;
//     let doubleOrange;
//     let singlePurple;
//     let doublePurple;
//     let gift;
//     let city;
//     let music;

// gameBoxIds.push(gameBox.getAttribute('data-id'));
//let gameBoxes = document.querySelectorAll('[game-box]');

//console.log(gameBoxes);
//let gameBoxes = gameBox.getAttribute('data-id');
//console.log(gameBoxes);


//console.log(ids);
//console.log(ids[2].dataset.id);
//console.log(ids[0].innerHTML);
//console.log(ids[0].firstElementChild.innerHTML)