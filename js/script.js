let jogo = document.getElementById("jogo")
let contexto = jogo.getContext("2d")
let teclas = {}
let bola = { 
    x: jogo.width / 2 - 15,
    y: jogo.height / 2 - 15,
    altura: 30,
    largura: 30,
    direcaoX: - 1,
    direcaoY: 1,
    modificador: 0,
    velocidade: 50,
}
let jogadorEsquerda = {
    x: 10,
    y: jogo.height / 2 - 60,
    altura: 120,
    largura: 30,
    pontos: 0,
    velocidade: 15
}
let jogadorDireita = {
    x: 560,
    y: jogo.height / 2 - 60,
    altura: 120,
    largura: 30,
    pontos: 0,
    velocidade: 15
}

function desenha() {
    contexto.fillStyle = "white"
    contexto.fillRect(jogadorEsquerda.x, jogadorEsquerda.y, jogadorEsquerda.largura, jogadorEsquerda.altura)
    contexto.fillRect(jogadorDireita.x, jogadorDireita.y, jogadorDireita.largura, jogadorDireita.altura)
    contexto.fillRect(bola.x, bola.y, bola.largura, bola.altura)
}

desenha()