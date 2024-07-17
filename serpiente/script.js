const playBoard = document.querySelector('.play-board');
const scoreElement = document.querySelector('.score');
const highScoreElement = document.querySelector('.high-score');

let foodx;
let foody;

let gameOver = false;
let setIntervalId;

//posicion de la serpiente
let snakex = 10;
let snakey = 10;

//puntaje
let score = 0;
//si no tiene nada localStorage.getItem("high-score") que valga 0
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerHTML = `High score: ${highScore}`;

//crece el cuerpo de la serpiente
let snakeBody = [];

// velocidades
let velocityX = 0;
//console.log('x inicial', velocityX);
let velocityY = 0;
//console.log('y inicial', velocityY);


const changeFoodPosition = () => {
    foodx = Math.floor(Math.random()* 30) +1;
    foody = Math.floor(Math.random()* 30) +1;
}

const handleGameOver = () => {
    //detiene la ejecucion del juego
    clearInterval(setIntervalId);
    // alert("gameover");
    // //recargar el navegador para recargar pantalla
    // location.reload();

    Swal.fire({
        title: "Game Over",
        text: "¡Has perdido! Tu puntaje final es: " + score,
        icon: "error",
        confirmButtonText: "Reiniciar"
    }).then(() => {
        location.reload();
    });
}

const changeDirection = (e) => {
    //console.log(e);
    //&& velocityY !=1 = solo ira para una direccion no podra ir de izquierda y luego derecha
    if(e.key === "ArrowUp" && velocityY !=1){
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.key === "ArrowDown" && velocityY !=-1){
        velocityX = 0;
        velocityY = 1;
    }

    else if(e.key === "ArrowLeft" && velocityX !=1){
        velocityX = -1;
        velocityY = 0;
    }
    else if(e.key === "ArrowRight" && velocityX !=-1){
        velocityX = 1;
        velocityY = 0;
    }

    //initGame();
}
const initGame = () => {
    if(gameOver){
        return handleGameOver();
    }
    let htmlMarkut = `<div class="food" style="grid-area: ${foody}/${foodx}"> </div>`;
    if(snakex == foodx && snakey === foody){
        changeFoodPosition();
        snakeBody.push([foodx, foody]);
        //console.log(snakeBody);
        score++;
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerHTML = `Score : ${score}`;
        highScoreElement.innerHTML = `High score: ${highScore}`;
    }
    //sumar o restar velocidades dependiendo de la tecla que se toque
    snakex +=velocityX;
    // console.log('velocityY: ', velocityX);
    snakey +=velocityY; // y = 10

    //tocar las paredes para que el juegue culmine
    if(snakex <= 0 || snakex>30 || snakey<=0 || snakey > 30){
        //console.log("gameOver" );
        gameOver = true;
    }

    // console.log('velocityY: ', velocityY);
    //comida se añada a la serpiente
    for(let i = snakeBody.length-1; i>0; i--){
        snakeBody[i] = snakeBody[i-1];
    }
    // creando serpiente
    // asignar coordinadas iniciales
    snakeBody[0] = [snakex, snakey];
    for(let i =0; i< snakeBody.length; i++){
        htmlMarkut += `<div class="head" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]}"> </div>`;
        // snakeBody[0][1] === snakeBody[i][1] igual al siguiente elemento 
        //choca con el cuerpo tambien termina el juego
        if(i !==0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver = true;
        }
    }
    //htmlMarkut += `<div class="head" style="grid-area: ${snakey}/${snakex}"> </div>`;
    playBoard.innerHTML = htmlMarkut;
}

changeFoodPosition();

setIntervalId = setInterval(initGame, 125);
document.addEventListener("keydown", changeDirection);


//initGame();
