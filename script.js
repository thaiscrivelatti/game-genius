geniusOrder = [];
playerOrder = [];
playerCanPlay = false;
sounds = [];
level = 0;

let colors = [
    document.querySelector('.green'),
    document.querySelector('.red'),
    document.querySelector('.yellow'),
    document.querySelector('.blue')
];

let loadSounds = [
    "sons/simonSound1.mp3",
    "sons/simonSound2.mp3",
    "sons/simonSound3.mp3",
    "sons/simonSound4.mp3",
].forEach(sound => {
    const audio = new Audio(sound);
    sounds.push(audio);
});

colors.forEach((color, index) => {
    color.onclick = () => userClick(index)
});

function start() {
    playerOrder = [];
    level++;
    document.getElementById('nivel').innerHTML = level.toString();
    document.getElementById("iniciar").disabled = true;
    randomColor();
    console.log('game order: ', geniusOrder);
    playSequence();
}

function randomColor() {
    geniusOrder.push(Math.floor(Math.random()*4));
}

function playSequence() {
    let count = 0, active = true;
    playerOrder = [];
    playerCanPlay = false;

    const interval = setInterval(() => {
        if (active) {
            if (count === geniusOrder.length) {
                playerCanPlay = true;
                colors[colorIndex].classList.remove('blink');
                clearInterval(interval);
                return;
            }
            colorIndex = geniusOrder[count];
            colors[colorIndex].classList.add('blink');
            sounds[colorIndex].play();
            count++;
        } else {
            removeBlink();
        }
        active = !active;
    }, 750);
}

function removeBlink() {
    colors.forEach((color) => {
        color.classList.remove('blink');
    });
}

function userClick(colorIndex) {
    if (playerCanPlay) {
        playerOrder.push(colorIndex);
        colors[colorIndex].classList.add('blink');
        sounds[colorIndex].play();
       
        setTimeout(() => {
            colors[colorIndex].classList.remove('blink');
        }, 400);

        compareOrder(playerOrder.length);
    }
}

// Compara se a ordem clicada é a mesma ordem do genius
function compareOrder(length) {
    let index = length-1;
    if (playerOrder[index] !== geniusOrder[index]) {
        playerOrder = [];
        gameOver();
        return;
    }

    if (playerOrder.length === geniusOrder.length) {
        start();
    }
}

function gameOver() {
    geniusOrder = [];
    playerCanPlay = false;
    level = 0;
    document.getElementById('nivel').innerHTML = "";
    alert("Você perdeu!");
    document.getElementById('iniciar').disabled = false;
}