var player1Name, player2Name;
var player1Win = 0, player1Lose = 0, player1Draw = 0;
var player2Win = 0, player2Lose = 0, player2Draw = 0;
var autoPlayState = false;
var refresh;

setTimeout(initializeGame, 1000);


function initializeGame()
{
    getNames();
    setNames();
}

function getNames()
{
    player1Name = prompt("Enter name for first player: ");
    if(!player1Name)
        player1Name = "Player 1";
    while((player2Name = prompt("Enter name for second player: ")) === player1Name)
        alert("Same names cannot be used for both players, pick a different name!");
    if(!player2Name)
        player2Name = "Player 2";
}

function setNames() {
    document.querySelector(".player1-name").innerText = player1Name;
    document.querySelector(".player2-name").innerText = player2Name;
    document.querySelector(".player1-score").innerText = player1Name + " (W/L/D): " + player1Win + "/" + player1Lose + "/" + player1Draw
    document.querySelector(".player2-score").innerText = player2Name + " (W/L/D): " + player2Win + "/" + player2Lose + "/" + player2Draw
}

document.querySelector("#roll-btn").addEventListener("click", () => {
    play();
});

document.querySelector("#reset-btn").addEventListener("click", () => {
    location.reload();
});

document.querySelector("#auto-btn").addEventListener("click", () => {
    if(!autoPlayState)
        startAutoPlay();
    else
        stopAutoPlay();
});


function startAutoPlay()
{
    refresh = setInterval(play, 2000);
    autoPlayState = true;
    document.querySelector("#auto-btn").innerText = "Stop";
    document.querySelector("#auto-btn").setAttribute("class", "btn_active");
}

function stopAutoPlay()
{
    clearInterval(refresh);
    refresh = null;
    autoPlayState = false;
    document.querySelector("#auto-btn").innerText = "Autoplay";
    document.querySelector("#auto-btn").setAttribute("class", "btn-std");
}

function play()
{
    let dice1 = rollDice();
    let dice2 = rollDice();
    setDiceImages(dice1, dice2);
    setScores(dice1, dice2);
}

function rollDice()
{
    return Math.floor(Math.random() * (6 - 1 + 1)) + 1;
}

function setDiceImages(dice1, dice2)
{
    let path1 = "./assets/images/dice" + dice1 + ".png";
    let path2 = "./assets/images/dice" + dice2 + ".png";

    document.querySelector(".img1").setAttribute("src", path1);
    document.querySelector(".img2").setAttribute("src", path2);
    document.querySelector(".img1").classList.remove("hidden-img");
    document.querySelector(".img1").classList.add("visible-img");
    document.querySelector(".img2").classList.remove("hidden-img");
    document.querySelector(".img2").classList.add("visible-img");
}

function setScores(dice1, dice2)
{
    if(dice1 > dice2) {
        player1Win++;
        player2Lose++;
        document.querySelector("h1").innerText = player1Name + " Wins!!";
    }
    else if (dice1 < dice2) {
        player2Win++;
        player1Lose++;
        document.querySelector("h1").innerText = player2Name + " Wins!!";
    }
    else {
        player1Draw++;
        player2Draw++;
        document.querySelector("h1").innerText = "Draw!!";
    }

    document.querySelector(".player1-score").innerText = player1Name + " (W/L/D): " + player1Win + "/" + player1Lose + "/" + player1Draw;
    document.querySelector(".player2-score").innerText = player2Name + " (W/L/D): " + player2Win + "/" + player2Lose + "/" + player2Draw;
}


