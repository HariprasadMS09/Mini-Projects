//function to get bot choice
const getBotChoice = () => {
    const options = ["rock","paper","scissor"];
    let randIndex = Math.floor(Math.random() * 3);
    return options[randIndex];
}

//function to find out who won
const stonePaperScissor = (userChoice) => {
    console.log(`User Choice = ${userChoice}`);
    const botChoice = getBotChoice();
    console.log(`Bot Choice = ${botChoice}`);
    alert(`Bot played ${botChoice}`);

    if(userChoice == botChoice){
        console.log("Its a tie");
    }else{
        let userWin = true;
        if(userChoice === "rock"){
            //if bot choose paper then userWin=false else true
            userWin = botChoice === "paper" ? false : true;
        }else if(userChoice === "paper"){
            //if bot choose scissor then userWin=false else true
            userWin = botChoice === "scissor" ? false : true;
        }else{
            //if bot choose rock then userWin=false else true
            userWin = botChoice === "rock" ? false : true;
        }
        showWinner(userWin);
    }
}

//function to show winner
const showWinner = (userWin) => {
    if(userWin){
        user_score++;
        userScorePart.innerText = `User : ${user_score}`;
        console.log("You won!");
    }else{
        bot_score++;
        botScorePart.innerText = `Bot : ${bot_score}`;
        console.log("You lose!");
    }
}

let user_score = 0;
let bot_score = 0;

const emoji_btn = document.querySelectorAll(".emojiButton");
const userScorePart = document.querySelector("#userScore");
const botScorePart = document.querySelector("#botScore");

emoji_btn.forEach((emoji_btn) => {
    emoji_btn.addEventListener("click", () => {
        let userChoice = emoji_btn.getAttribute("id"); // here we get to know the user choice
        stonePaperScissor(userChoice); //functional call to find out who won
    });
});
