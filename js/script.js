let jogo = document.getElementById("jogo")
let contexto = jogo.getContext("2d")
let teclas = {}
let bola = { 
    x: jogo.width / 2 - 15,
    y: jogo.height / 2 - 15,
    altura: 30,
    largura: 30,
    direcaoX: Math.floor(Math.random() * 2) == 1 ? - 1 : 1,
    direcaoY: Math.floor(Math.random() * 2) == 1 ? - 1 : 1,
    modificador: 0,
    velocidade: 1,
}
let jogadorEsquerda = {
    x: 10,
    y: jogo.height / 2 - 60,
    altura: 120,
    largura: 30,
    pontos: 0,
    velocidade: 10
}
let jogadorDireita = {
    x: 560,
    y: jogo.height / 2 - 60,
    altura: 120,
    largura: 30,
    pontos: 0,
    velocidade: 10
}

document.addEventListener("keydown", function(e) {
    teclas[e.keyCode] = true;

    //alert(e.keyCode);
}, false)

document.addEventListener("keyup", function(e) {
    delete teclas[e.keyCode]
}, false)

function moveBloco() {
    if (87 in teclas && jogadorEsquerda.y > 0) {
        jogadorEsquerda.y -= jogadorEsquerda.velocidade;
    } else if (83 in teclas && jogadorEsquerda.y + jogadorEsquerda.altura < jogo.height ) {
        jogadorEsquerda.y += jogadorEsquerda.velocidade;
    }

    if (38 in teclas && jogadorDireita.y > 0) {
        jogadorDireita.y -= jogadorDireita.velocidade;
    } else if (40 in teclas && jogadorDireita.y + jogadorDireita.altura < jogo.height ) {
        jogadorDireita.y += jogadorDireita.velocidade;
    }
}

function moveBola() {
    if (bola.x <= 0) {
        novoJogo("Jogador 2")
    } else if (bola.x + bola.largura >= jogo.height) {
        novoJogo("Jogador 1")
    }

    if (bola.y + bola.altura >= jogadorEsquerda.y 
     && bola.y <= jogadorEsquerda.y + jogadorEsquerda.altura 
     && bola.x <= jogadorEsquerda.x + jogadorEsquerda.largura) {
         bola.direcaoX = 1
         bola.modificador += 0.2
    }
    else if (bola.y + bola.altura >= jogadorDireita.y 
     && bola.y <= jogadorDireita.y + jogadorDireita.altura 
     && bola.x + bola.largura >= jogadorDireita.x) {
        bola.direcaoX = -1
        bola.modificador += 0.2
    }

    if (bola.y <= 0) {
        bola.direcaoY = 1
    }
    else if (bola.y + bola.altura >= jogo.height) {
        bola.direcaoY = -1
    }

    bola.x += (bola.velocidade + bola.modificador) * bola.direcaoX
    bola.y += (bola.velocidade + bola.modificador) * bola.direcaoY
}

function novoJogo(vencedor) {
    if (vencedor == "Jogador 1") {
        jogadorEsquerda.pontos++
    } else {
        jogadorDireita.pontos++
    }

    jogadorEsquerda.y = jogo.height / 2 - jogadorEsquerda.altura / 2
    jogadorDireita.y = jogadorEsquerda.y
    bola.y = jogo.height / 2 - bola.altura / 2
    bola.x = jogo.width / 2 - bola.largura / 2
    bola.velocidade = 1
    bola.modificador = 0
    bola.direcaoX = Math.floor(Math.random() * 2) == 1 ? - 1 : 1
    bola.direcaoY = Math.floor(Math.random() * 2) == 1 ? - 1 : 1
}

function desenha() {
    contexto.clearRect(0, 0, jogo.width, jogo.height)

    moveBloco()

    moveBola()

    contexto.fillStyle = "white"

    contexto.fillRect(jogadorEsquerda.x, jogadorEsquerda.y, jogadorEsquerda.largura, jogadorEsquerda.altura)
    contexto.fillRect(jogadorDireita.x, jogadorDireita.y, jogadorDireita.largura, jogadorDireita.altura)
    contexto.fillRect(bola.x, bola.y, bola.largura, bola.altura)

    contexto.font = "20px Arial"

    contexto.fillText("Jogador 1: " + jogadorEsquerda.pontos, 50, 20)
    contexto.fillText("Jogador 2: " + jogadorDireita.pontos, jogo.height - 170, 20)
}

function reiniciar() {
    window.location.reload();
}

setInterval(desenha, 5)