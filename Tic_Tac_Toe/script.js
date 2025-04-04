let gameBoxDiv = document.querySelectorAll(".gameBoxDivision");
let newGameBtn = document.querySelector("#newButton");

let zerosTurn = true;

const winningPattrens = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to disable boxes after winning
const disableGameBoxDiv = () => {
    for(let box of gameBoxDiv){
        box.disabled = true;
    }
}

// Function to enable boxes after winning
const enableGameBoxDiv = () => {
    for(let box of gameBoxDiv){
        box.disabled = false;
        box.innerText = "";
    }
}

// Function to start a new game
const newGame = () => {
    zerosTurn = true;
    enableGameBoxDiv(); //calling enable function 
}

// Event listeners for each game box
gameBoxDiv.forEach((box) => {
    box.addEventListener("click", () => {
        if (zerosTurn) { // zerosTurn => zerosTurn === true
            box.innerText = "O";
            box.style.color = "red";
            zerosTurn = false;
        } else {
            box.innerText = "X";
            box.style.color = "#618B4A";
            zerosTurn = true;
        }
        box.disabled = true; // to disable reclicking after one click

        // Check for winner after the move
        if (checkWinner()) { // Only check if there is a winner
            return; // Exit if there's a winner
        }

        // Check for draw
        if ([...gameBoxDiv].every(box => box.innerText !== "")) {
            alert("It's a draw!");
        }
    });
});

// Function to check winner
const checkWinner = () => { 
    for(let pattren of winningPattrens) {
        let pos1Val = gameBoxDiv[pattren[0]].innerText;   
        let pos2Val = gameBoxDiv[pattren[1]].innerText;
        let pos3Val = gameBoxDiv[pattren[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != "") { // ensures that there is no empty box 
            if(pos1Val === pos2Val && pos1Val === pos3Val) { // check for winning pattern 
                alert(`Congratulations, ${pos1Val} is the winner`); 
                disableGameBoxDiv(); // function call to disable boxes after winning
                return true; // Return true if there's a winner
            }
        }
    }
    return false; // Return false if no winner found
};

// Event listener for new game button
newGameBtn.addEventListener("click", newGame);
