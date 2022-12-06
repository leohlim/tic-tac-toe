const gameboard = (() => {
    let board = ["","","","","","","","",""];
    let player1 = createPlayer(1,"X", true);
    let player2 = createPlayer(2,"O", false);
    let winner = null;
    let stalemate = null;
    const arrayX = [];
    const arrayO = [];


    function createPlayer(playerNumber, playerSign, turn) {
        return{
            playerNumber,
            playerSign,
            turn,
            getPlayerNumber() {playerNumber; 
        }};
    }    

    
    const playRound = () => {
        const boardButtons = document.querySelectorAll(".gridbox");

        // Adds player sign to the board with a click
        boardButtons.forEach(boardButton => {
            boardButton.addEventListener('click', e => {
                if (player1.turn == true && winner == null && e.target.textContent =="") {
                    board[e.target.id] = player1.playerSign;
                    boardButton.textContent = player1.playerSign;
                    arrayX.push(Number(e.target.id));
                    player1.turn = false;
                    player2.turn = true;
                } else if (player2.turn == true && winner == null && e.target.textContent == "") {
                    board[e.target.id] = player2.playerSign;
                    boardButton.textContent = player2.playerSign;
                    arrayO.push(Number(e.target.id));
                    player1.turn = true;
                    player2.turn = false;

                } else {
                    return;
                }
                winCheck();
                if (stalemate === null) {stalemateCheck()};
                displayController.showStatus();


            })
        return {boardButtons};
        })    
    };

    const stalemateCheck = () => {
        if ((!board.some(el => el === ""))) {
            winner = "nobody";
            stalemate = true;
            return console.log("It's a tie");
        }
    }

    const winCheck = () => {
        const winCombos =[
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];

 
        
        winCombos.forEach(combo => {
            const countX = [];
            const countO = [];
            combo.forEach(num => {
                if (stalemate === false) return;
                if (arrayX.includes(num)) {
                    countX.push(num);
                    if(countX.length === 3) {
                        stalemate = false;
                        winner = "Player X";
                        return console.log(winner + " wins");
                    } 
                } else if (arrayO.includes(num)) {
                    countO.push(num);
                    if(countO.length === 3) {
                        stalemate = false;
                        winner = "Player O";
                        return console.log(winner + " wins");
                    }
                } else {
                    return console.log("Still playing");
                }
            })
        })


      


    };

    const getWinner = () => {
        return winner;
    }

    

    return {playRound, winCheck, getWinner};

})();

const displayController = (() => {
    // Updates grid using the array of X's and O's
    gameboard.playRound();

    const showStatus = () => {
        const status = document.querySelector(".status");
        if (gameboard.getWinner()) {
            status.textContent = "Congrats, " + gameboard.getWinner() + "!";
            let btn = document.createElement("button");
            btn.innerHTML = "Play Again?";
            status.appendChild(btn);
            btn.onclick = function () {
                location.reload();
              };
        }
        else { 
            status.textContent = "May the best player win";
        };
    }

    return {showStatus};
})();

