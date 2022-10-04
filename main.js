const gameBoard = document.querySelector('.game-board');


function buildGameBoard() {
    let gameBox;
    let gameBoxIds = []
    for (let i = 0; i < 56; i++) {
        gameBox = document.createElement('div');
        gameBoard.appendChild(gameBox);
        gameBox.classList.add('game-box');
        gameBox.setAttribute('id', i);
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

buildGameBoard()