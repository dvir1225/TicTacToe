const Game = (() => {
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

    let gameboard = [];

    const cellClasses = {
        x: 'x',
        circle: 'circle'
    }

    const gameMarks = {
        x: '<i class="fa-solid fa-x"></i>',
        circle: '<i class="fa-regular fa-circle"></i>'
    }

    selectors.gameboard.classList.add(cellClasses.x);
    let circleTurn = false;
    let p1Score = 0;
    let p2Score = 0;

    function getScore() {
        selectors.p1Score.innerText = p1Score;
        selectors.p2Score.innerText = p2Score;
    }

    getScore();

    const gameFunctions = {
        startGame: function startGame(){
            selectors.firstScreen.classList.remove('show')
            selectors.secondScreen.classList.add('show')
            selectors.p1NameScoreTable.innerText = selectors.p1Name.value;
            selectors.p2NameScoreTable.innerText = selectors.p2Name.value;
        },
        placeMark: function placeMark(cell, currentClass){
            cell.classList.add(currentClass);
            if (currentClass === cellClasses.circle){
                cell.innerHTML = gameMarks.circle;
                gameboard.push('o')
            } else {
                cell.innerHTML = gameMarks.x;
                gameboard.push('x');
            } cell.style.color = "black";
        },
        checkWin: function checkWin(currentClass) {
            return winningCombinations.some(combination =>{
                return combination.every(index => {
                  return selectors.gameCells[index].classList.contains(currentClass);
                })
            })
        },
        endGame: function endGame (draw) {
            if (draw){
                selectors.winnerText.innerText = "It's a draw!"
            } else {
                selectors.winnerText.innerText =
                 `${circleTurn ? selectors.p2Name.value : selectors.p1Name.value} Wins!`
                circleTurn ? p2Score += 1 : p1Score += 1;
                getScore();
            }
            selectors.winnerScreen.classList.add('show');
        },
        isDraw: function isDraw (){
            return [...selectors.gameCells].every(cell => {
                return cell.classList.contains(cellClasses.x) ||
                cell.classList.contains(cellClasses.circle)
            })
        },
        handleClick: function handleClick(event){
            const cell = event.target;
            const currentClass = circleTurn ? cellClasses.circle : cellClasses.x;
            gameFunctions.placeMark(cell, currentClass);
            if (gameFunctions.checkWin(currentClass)){
                gameFunctions.endGame(false);
            } else if (gameFunctions.isDraw()){
                gameFunctions.endGame(true)
            } else {
                (swapTurns = () => {
                circleTurn = !circleTurn
                })()
            }
        },
        restartGame: function restartGame (){
            selectors.winnerScreen.classList.remove('show');
            circleTurn = false;
            selectors.gameCells.forEach(cell => {
                cell.classList.remove(cellClasses.x);
                cell.classList.remove(cellClasses.circle);
                cell.removeEventListener(
                    'click', gameFunctions.handleClick);
                cell.addEventListener(
                    'click', gameFunctions.handleClick);
                cell.innerHTML = '';
            })
            gameboard = []
        }
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

    function nameValidation() {
        if (selectors.p1Name.value.length === 0 ||
            selectors.p2Name.value.length === 0 ) {
            return false
        } else return true;
    }

    const attachEventListeners = (() => {
        selectors.startGameBtn.addEventListener(
            'click', () =>{
                if(nameValidation() === true){
                        gameFunctions.startGame();
                    }  else if (nameValidation() === false){
                        alert("You must insert both players' names");
                    }
                });

        selectors.gameCells.forEach(cell => {
            cell.addEventListener(
                'click', gameFunctions.handleClick, {once: true});
        });
        selectors.restartGameBtn.addEventListener(
            'click', gameFunctions.restartGame);
        [selectors.p1Name, selectors.p2Name].forEach(input => {
            input.addEventListener('keyup', event => {
                if (
                    event.key === 'Enter' && nameValidation() === true){
                    gameFunctions.startGame();
                } else if (
                    event.key === 'Enter' && nameValidation() === false){
                    alert("You must insert both players' names");
                    }
            })
        })
        selectors.restartGameBtn.addEventListener('keyup', event => {
            if (event.key === 'Enter'){
                gameFunctions.restartGame();
            }
        })
    })()
})()