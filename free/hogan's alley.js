const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Configuração do alvo
const target = { x: 100, y: 100, width: 50, height: 50 };

// Desenha o alvo
function drawTarget() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "red";
    ctx.fillRect(target.x, target.y, target.width, target.height);
}

// Detecta clique no alvo
canvas.addEventListener("click", function(event) {
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    if (clickX >= target.x && clickX <= target.x + target.width &&
        clickY >= target.y && clickY <= target.y + target.height) {
        console.log("Alvo acertado!");
    } else {
        console.log("Errou!");
    }
});

drawTarget();