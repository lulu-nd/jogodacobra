//playBoard= tela ou tabuleiro
/* container onde a cobrinha e a comida serão renderizadas */
const playBord = document.querySelector(".play-board");

//placar atual
const scoreElement = document.querySelector(".score");

//record(maior pontuação)
const highScoreElement = document.querySelector(".high-score")

//controle de movimento
/* seleciona elemento <I> Icones botões para diversos mobiles*/
const controls = document.querySelectorAll(".controls i")

//cadastro de variaveis
/* variavele boleana que indica que o jogo terminou */
let gameOver = false;

//variavel para armazenar as as cordenadas X e Y da comida
let foodX, foodY;

//armzenamento as cordenadas X e Y da cabeça da cobra (posição inicial 5)
let saneKeX = 5, snakeY = 5;

//variavel para armazenar a velocidade nas direções X e Y, inicialmente em 0
let velocityX = 0, velocityY = 0;

//uma Array para armazenar as cordenadas de cada segmento do corpo, primeiro elemento é a cabeça
let snakeBody = [];

//variavel para armazenar o id do intervalo que sera usado para atualizar o jogo em um determinado ritmo
let setIntervaloID;

//uma variavel para manter o controle da pontuação atual do jogador 
let score = 0;

//obtenha pontuação alta para armazenamento local
let highScore = localStorage.getItem("high-score") || 0;

 const updateFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () => {
    clearInterval(setIntervalID);
    alert("Game Over! Aperte OK para tentar novamente...");
    location.reload();
}

//função para mudar a direção da cobrinha
const changeDirection = e => {
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

controls.forEach(button => button.addEventListen("click", () => changeDirection({ key: button.dataset.key})));

//incializar o game = initgame
const initGame = () => {
    if (gameOver) return handleGameOver();
    let html = `<div class="food" style="grind-area: ${foodY} / ${foodX}"`;

    //quando a cobra se alimenta
    if (snakeX === foodX && snakeY === foodY) {
        updateFoodPosition();
        snakeBody.push([foodY, foodX]);
        score++;
        highScore = score >= highSocre ? score : highScore

        localStorage.setItem("high-score", highScore);
        scoreElement.innerHTML = `Score: ${score}`;
        highScoreElement.innerHTML = `High Score: ${highScore}`;

    }

    snakeX += velocityX;
    snakeY += velocityY;

    for (let i = snakeBody.length -1; i > 0; i--){
        snakeBody[i] = snake[i -1];
    }

    snakeBody[0] = [sanekeX, sanekeY];
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
        return gameOver  = true;
    }
}