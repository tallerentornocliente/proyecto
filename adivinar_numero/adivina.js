let secretNumber = Math.floor(Math.random() * 10) + 1;
let attempts = 0;

document.getElementById('submit').addEventListener('click', checkGuess);

function checkGuess() {
    let guess = parseInt(document.getElementById('guess').value);
    attempts++;

    if (guess === secretNumber) {
        document.getElementById('result').innerHTML = `¡Felicidades! Adivinaste el número en ${attempts} intentos.`;
        document.getElementById('result').classList.add('correct');
    } else if (guess < secretNumber) {
        document.getElementById('result').innerHTML = `Tu número es demasiado bajo. Intenta de nuevo.`;
        document.getElementById('result').classList.add('incorrect');
    } else {
        document.getElementById('result').innerHTML = `Tu número es demasiado alto. Intenta de nuevo.`;
        document.getElementById('result').classList.add('incorrect');
    }
}