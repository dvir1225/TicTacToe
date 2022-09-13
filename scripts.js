const selectors = {
    firstScreen: document.querySelector('.firstScreen'),
    secondScreen: document.querySelector('.secondScreen'),
    winnerScreen: document.querySelector('.winnerScreen'),
    startGameBtn: document.getElementById('startGameBtn'),
    restartGameBtn: document.getElementById('restartGameBtn'),
    p1Name: document.getElementById('p1Name').value,
    p2Name: document.getElementById('p2Name').value,
    gameCells: document.querySelectorAll('.cell')
}



const Game = (() => {
    const cellClasses = {
        x: 'x',
        circle: 'circle'
    }
    const gameMarks = {
        x: '<i class="fa-solid fa-x"></i>',
        circle: '<i class="fa-regular fa-circle"></i>'
    }

    let gameboard = [];
    let player1 = selectors.p1Name;
    let player2 = selectors.p2Name;
    let circleTurn = false;

    const placeMark = (cell, currentClass) => {
        cell.classList.add(currentClass);
        if (currentClass === cellClasses.circle){
            cell.innerHTML = gameMarks.circle;
            gameboard.push('o')
        } else {
            cell.innerHTML = gameMarks.x;
            gameboard.push('x');
        }
    }

    const handleClick = (event) => {
        const cell = event.target;
        const currentClass = circleTurn ? cellClasses.circle : cellClasses.x;
        placeMark(cell, currentClass);
        (swapTurns = () => {
            circleTurn = !circleTurn
        })()
    }

    selectors.gameCells.forEach(cell => {
        cell.addEventListener('click', handleClick);
    })
    
})()