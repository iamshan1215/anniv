const intro = document.getElementById('intro');
const cat = document.querySelector('.cat');
const gameContainer = document.querySelector('.game-container');
const obstacle = document.querySelector('.obstacle');
const gameOverContainer = document.getElementById('game-over');
const jumpButton = document.getElementById('jumpButton');
const jumpSound = document.getElementById('jumpSound');
const collisionSound = document.getElementById('collisionSound'); 
const jumpCountElement = document.getElementById('jumpCount');

let isJumping = false;
let isGameOver = false;
let jumpCount = 0;

intro.addEventListener('click', () => {
    intro.style.display = 'none';
    gameContainer.style.display = 'block';
    jumpButton.style.display = 'block';
    jumpCountElement.style.display = 'block';
});

jumpButton.addEventListener('click', () => {
    if (!isJumping && !isGameOver) {
        jumpSound.currentTime = 0; 
        jumpSound.play();
        jump();
        jumpCount++;
        updateJumpCount();
        if (jumpCount === 5) {
            showPopup();
        }        
    }
});

function jump() {
    isJumping = true;
    let position = 0;
    let timerId = setInterval(function () {
        if (position === 150) {
            clearInterval(timerId);
            let downTimerId = setInterval(function () {
                if (position === 0) {
                    clearInterval(downTimerId);
                    isJumping = false;
                }
                position -= 5;
                cat.style.bottom = position + 'px';
            }, 20);
        }
        position += 5;
        cat.style.bottom = position + 'px';
    }, 20);
}

function updateJumpCount() {
    jumpCountElement.innerText = `score \n ${jumpCount}`;
}

function checkCollision() {
    const catRect = cat.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
        catRect.left < obstacleRect.left + obstacleRect.width &&
        catRect.left + catRect.width > obstacleRect.left &&
        catRect.top < obstacleRect.top + obstacleRect.height &&
        catRect.top + catRect.height > obstacleRect.top
    ) {
        isGameOver = true;
        obstacle.style.animation = 'none';
        obstacle.style.right = `${obstacleRect.right}px`;
        collisionSound.currentTime = 0; 
        collisionSound.play();
        showGameOverMessage();
    }
}

function showGameOverMessage() {
    gameOverContainer.style.display = 'block';
    const message = document.createElement('h1');
    message.innerText = 'luh. hindi umilag nabasa tuloy ako. ayoko na ibigay!!';
    gameOverContainer.appendChild(message);
    createTryAgainButton();
    
    // Hide the game container, jump button, and score
    gameContainer.style.display = 'none';
    jumpButton.style.display = 'none';
    jumpCountElement.style.display = 'none';
}

function createTryAgainButton() {
    const button = document.createElement('button');
    button.innerText = 'ulit.';
    button.classList.add('try-again-button');
    button.addEventListener('click', tryAgain);
    gameOverContainer.appendChild(button);
}

function tryAgain() {
    window.location.reload();
}

function showPopup() {
    alert('congratulations bb! kemi lang sa 143 na score. 4 lang okay na kasi ikaw ang 4-me and i am 4-you tapos 4-ever na tayo.');
    window.location.href = './love page/index.html';
}

setInterval(checkCollision, 10);
