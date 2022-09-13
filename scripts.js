const selectors = {
    firstScreen: document.querySelector('.firstScreen'),
    secondScreen: document.querySelector('.secondScreen'),
    winnerScreen: document.querySelector('.winnerScreen'),
    winnerText: document.getElementById('winnerText'),
    startGameBtn: document.getElementById('startGameBtn'),
    restartGameBtn: document.getElementById('restartGameBtn'),
    p1Name: document.getElementById('p1Name'),
    p2Name: document.getElementById('p2Name'),
    p1NameScoreTable: document.getElementById('p1NameValue'),
    p2NameScoreTable: document.getElementById('p2NameValue'),
    gameCells: document.querySelectorAll('.cell'),
    gameboard: document.querySelector('.gameboard'),
    p1Score: document.getElementById('p1Score'),
    p2Score: document.getElementById('p2Score')
}

const Game = (() => {
    let gameboard = [];
    selectors.startGameBtn.addEventListener('click', () =>{
        selectors.firstScreen.classList.remove('show')
        selectors.secondScreen.classList.add('show')
        selectors.p1NameScoreTable.innerText = selectors.p1Name.value;
        selectors.p2NameScoreTable.innerText = selectors.p2Name.value;
    })

    
    const cellClasses = {
        x: 'x',
        circle: 'circle'
    }
    const gameMarks = {
        x: '<i class="fa-solid fa-x"></i>',
        circle: '<i class="fa-regular fa-circle"></i>'
    }

    
    
    let circleTurn = false;
    selectors.gameboard.classList.add(cellClasses.x);
    let p1Score = 0;
    let p2Score = 0;
    getScore();

    const placeMark = (cell, currentClass) => {
        cell.classList.add(currentClass);
        if (currentClass === cellClasses.circle){
            cell.innerHTML = gameMarks.circle;
            gameboard.push('o')
        } else {
            cell.innerHTML = gameMarks.x;
            gameboard.push('x');
        } cell.style.color = "black";
    }

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3 ,6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    function checkWin(currentClass) {
        return winningCombinations.some(combination =>{
            return combination.every(index => {
              return selectors.gameCells[index].classList.contains(currentClass);
            })
        })
    }

    function endGame (draw) {
        if (draw){
            selectors.winnerText.innerText = "It's a draw!"
        } else {
            selectors.winnerText.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
            circleTurn ? p2Score += 1 : p1Score += 1;
            getScore();
        }
        selectors.winnerScreen.classList.add('show');
    }

    function isDraw (){
        return [...selectors.gameCells].every(cell => {
            return cell.classList.contains(cellClasses.x) ||
            cell.classList.contains(cellClasses.circle)
        })
    }

    const handleClick = (event) => {
        const cell = event.target;
        const currentClass = circleTurn ? cellClasses.circle : cellClasses.x;
        placeMark(cell, currentClass);
        if (checkWin(currentClass)){
            endGame(false);
        } else if (isDraw()){
            endGame(true)
        } else {
            (swapTurns = () => {
            circleTurn = !circleTurn
            })()
        }
    }

    function getScore(){
        selectors.p1Score.innerText = p1Score;
        selectors.p2Score.innerText = p2Score;
    }

    selectors.gameCells.forEach(cell => {
        cell.addEventListener('click', handleClick, {once: true});
    })

    selectors.restartGameBtn.addEventListener('click', () => {
        selectors.winnerScreen.classList.remove('show');
        circleTurn = false;
        selectors.gameCells.forEach(cell => {
            cell.classList.remove(cellClasses.x);
            cell.classList.remove(cellClasses.circle);
            cell.removeEventListener('click', handleClick);
            cell.addEventListener('click', handleClick);
            cell.innerHTML = '';
        })
        // selectors.gameCells.removeEventListener('click', handleClick);
        // selectors.gameCells.addEventListener('click', handleClick);
        gameboard = []
    })
})()