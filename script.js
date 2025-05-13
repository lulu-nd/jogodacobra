// Play Board é a tela ou tabuleiro
// Container onde a cobra e a comida serão renderizadas
const playBoard = document.querySelector(".play-board");


// Pontuação atual do jogador
const scoreElement = document.querySelector(".score");


// Maior pontuação (Recorde)
const highScoreElement = document.querySelector(".high-score");


// Controles de movimento (ícones em dispositivos móveis)
const controls = document.querySelectorAll(".controls i");


// Variáveis principais
let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 5;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;


// Obtenha pontuação alta do armazenamento local
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerHTML = `High Score: ${highScore}`;


// Atualiza posição da comida (valores de 1 a 30)
const updateFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};


// Função para lidar com o fim do jogo
const handleGameOver = () => {
  clearInterval(setIntervalId);
  alert("Game Over!!! Aperte Ok para iniciar novamente...");
  location.reload();
};


// Função para mudar a direção da cobra
const changeDirection = e => {
  if (e.key === "ArrowUp" && velocityY !== 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown" && velocityY !== -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowLeft" && velocityX !== 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowRight" && velocityX !== -1) {
    velocityX = 1;
    velocityY = 0;
  }
};


// Eventos de clique para controles em dispositivos móveis
controls.forEach(button =>
  button.addEventListener("click", () =>
    changeDirection({ key: button.dataset.key })
  )
);


// Função principal do jogo
const initGame = () => {
  if (gameOver) return handleGameOver();


  let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;


  // Quando a cobra come a comida
  if (snakeX === foodX && snakeY === foodY) {
    updateFoodPosition();
    snakeBody.push([snakeX, snakeY]);
    score++;


    if (score > highScore) {
      highScore = score;
      localStorage.setItem("high-score", highScore);
    }


    scoreElement.innerHTML = `Score: ${score}`;
    highScoreElement.innerHTML = `High Score: ${highScore}`;
  }


  // Atualiza posição da cabeça
  snakeX += velocityX;
  snakeY += velocityY;


  // Move o corpo da cobra
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  snakeBody[0] = [snakeX, snakeY];


  // Verifica colisão com parede
  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    gameOver = true;
  }


  // Renderiza a cobra e verifica colisão com ela mesma
  for (let i = 0; i < snakeBody.length; i++) {
    html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    if (i !== 0 && snakeBody[0][0] === snakeBody[i][0] && snakeBody[0][1] === snakeBody[i][1]) {
      gameOver = true;
    }
  }


  playBoard.innerHTML = html;
};


// Inicializa o jogo
updateFoodPosition();
setIntervalId = setInterval(initGame, 100);
document.addEventListener("keyup", changeDirection);
