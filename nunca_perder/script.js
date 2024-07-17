var character = document.getElementById("character");

document.addEventListener("click", jump);

function jump() {
    if (character.classList.contains("animate")) { return; }
    character.classList.add("animate");
    setTimeout(removeJump, 300);
}

function removeJump() {
    character.classList.remove("animate");
}

function checkDead() {
    var characterTop = getComputedStyle(character).getPropertyValue("top");
    var blockLeft = getComputedStyle(block).getPropertyValue("left");
    if (characterTop >= 130 && blockLeft <= 20) {
        alert("Game Over!");
    }
}

setInterval(checkDead, 10);