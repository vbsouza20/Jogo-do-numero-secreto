// Modo mais simples de declarar variável.
// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do número secreto';
// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10';

let numeroSorteados = [];
let numeroLimete = 10;
let numeroSecreto = gerarNumero();
let tentativas = 1;

// Função criada para declarar as variáveis do texto na página (exibe na tela), sem retorno.
function exibirTexto (tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagem () {
    exibirTexto ('h1' , 'Jogo do número secreto');
    exibirTexto ('p' , 'Escolha um número entre 1 e 10');
}

exibirMensagem();

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTexto ('h1' , 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTexto ('p' , mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTexto ('p' , 'O número secreto é menor');   
        } else {
            exibirTexto ('p' , 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumero() {
    let numeroEscolhido = parseInt (Math.random() * numeroLimete + 1);
    let elementosNaLista = numeroSorteados.length;

    if (elementosNaLista == 3) {
        numeroSorteados = [];
    }

    if (numeroSorteados.includes(numeroEscolhido)) {
        return gerarNumero();
    } else {
        numeroSorteados.push (numeroEscolhido);
        console.log(numeroSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiciniarJogo() {
    numeroSecreto = gerarNumero();
    limparCampo();
    tentativas = 1;
    exibirMensagem();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
