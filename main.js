//selects gameBoard from html and function buildGameBoard builds game board and inserts it in that div
const gameBoard = document.querySelector('.game-board');
//gameBox represents individual square on game board. gameBox is devided into top and bottom to display player 1 and 2 respectively
let gameBox;
let gameBoxTop;
let gameBoxBottom;
//gameCardsInPlay array will hold full deck of cards. As cards are flipped over and used they will get pushed to gameCardsUsed array
let gameCardsInPlay = [];
let gameCardsUsed = [];
//card represents div in html that will hold card boxes(boxes with card deck options)
const card = document.querySelector('.card');

//builds gameboard initially and will be called to reset game upon clicking reset button
function startGame() {
    function buildGameBoard() {
        for (let i = 0; i < 56; i++) {
            //adds gameBoxes to gameBoard and gives them each unique id
            gameBox = document.createElement('div');
            gameBoard.appendChild(gameBox);
            gameBox.classList.add('game-box');
            gameBox.setAttribute('id', i);
            //divides each game box into a top half to hold player1 car and a bottom half to hold player2 car
            gameBoxTop = document.createElement('div');
            gameBox.appendChild(gameBoxTop);
            gameBoxTop.classList.add('game-box-top');
            gameBoxBottom = document.createElement('div');
            gameBox.appendChild(gameBoxBottom);
            gameBoxBottom.classList.add('game-box-bottom');
            // adds color to spaces
            if (i === 14|| i===25||i===36||i===55) {
                gameBox.classList.add('special');
            }
            if (i===1||i===5||i===9||i=== 13||i===18||i===22||i===27||i===31||i===35||i===40||i===44||i===48||i===52) {
                gameBox.classList.add('red');
            }
            if (i===2||i===6||i===10||i=== 15||i===19||i===23||i===28||i===32||i===37||i===41||i===45||i===49||i===53) {
                gameBox.classList.add('blue');
            }
            if (i===3||i===7||i===11||i=== 16||i===20||i===24||i===29||i===33||i===38||i===42||i===46||i===50||i===54) {
                gameBox.classList.add('orange');
            }
            if (i===4||i===8||i===12||i=== 17||i===21||i===26||i===30||i===34||i===39||i===43||i===47||i===51||i===54) {
                gameBox.classList.add('purple');
            }
            //adds characters to special spaces
            if (i===55) {
                gameBox.innerHTML = '<i class="fa-solid fa-flag-checkered"></i>';
            }
            if (i===36) {
                gameBox.innerHTML = '<i class="fa-solid fa-music"></i>';
            }
            if (i===25) {
                gameBox.innerHTML = '<i class="fa-solid fa-city"></i>';
            }
            if (i===14) {
                gameBox.innerHTML = '<i class="fa-solid fa-gift"></i>';
            }
            if (i===0) {
                gameBoxTop.innerHTML = '<i class="fa-solid fa-car-side player1"></i>';
                gameBoxBottom.innerHTML = '<i class="fa-solid fa-car-side player2"></i>';
            }
                    //blank tiles
            // if(i=== 1 || i===24-26 || i===4) {
            //     gameBox.classList.add('blank');
            // }
            //red tiles
    
            // gameBoxIds.push(gameBox.getAttribute('data-id'));
        }
        
        // let gameBoxes = document.querySelectorAll('[game-box]');
        // console.log(gameBoxes);
        // let gameBoxes = gameBox.getAttribute('data-id');
        // console.log(gameBoxes);
    }
    buildGameBoard();
    
    //builds representation of cards and pushes them to gameCardsInPlay array
    function buildCardDeck () {
        for(let i=0; i<6; i++) {
            gameCardsInPlay.push('singleGreen');
            gameCardsInPlay.push('singleOrange');
            gameCardsInPlay.push('singleBlue');
            gameCardsInPlay.push('singlePurple');
        }
        for(let i=0; i<4; i++) {
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
}
startGame();

//will be used as an onclick function attached to reset button to restart game
function reset () {
    gameCardsInPlay = [];
    gameCardsUsed = [];
    //remove any classLists on board*********************************
    startGame()
}

console.log(gameCardsInPlay);

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
