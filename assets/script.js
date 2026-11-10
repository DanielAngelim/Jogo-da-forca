// Função pra sortear um número (Usada pra sortear a palavra)
function sortearNumero(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Função para cada letra do teclado 
function escrever(letra, palavra) {
    // Conta mais uma tentativa 
    tentativas++
    // Se tiver a letra na palavra...
    if (palavra.includes(letra.id)) {
        // ... Muda o estilo da letra no teclado ...
        letra.classList.add('certo');
        // ... Percorre a palavra ...
        for (let i = 0; i < palavra.length; i++) {
            if (letras[i].innerText == letra.id) {
                // ... Mostra as letras na palavra ...
                letras[i].classList.remove('hidden');
                // ... Conta mais um acerto ...
                acertos++
            }
        }
        // ... Altera a mensagem final.
        mensagem.innerText = "Parabéns! Você acertou"
    } else if (listaBoneco.length > 0) {
        // Se não tiver, mostra uma parte do boneco 
        const showBoneco = listaBoneco.pop(0);
        showBoneco.style.stroke = "#2c3e50";
        // Muda o estilo da letra no teclado
        letra.classList.add('errado');
        // ... Altera a mensagem final.
        mensagem.innerText = "Você errou! Fim de jogo"
    }
    if (listaBoneco.length == 0 || acertos == palavra.length) {
        // Atualiza as informações do painel
        showTentativas.innerText = "Tentativas: " + tentativas;
        showPalavra.innerText = "Palavra certa: " + palavra;
        // Mostra o painel de fim de jogo.
        shadow.style.display = "block";
        painel.style.display = "flex";
    }
}

// Lista das palavras para usar
const listaPalavras = ["abacate", "ampulheta", "baleia", "bumerangue", "cachorro",
    "camaleao", "computador", "dinossauro", "elefante", "escaravelho",
    "ferragem", "flamingo", "geladeira", "girassol",
    "helicoptero", "hipopotamo", "iogurte", "jacare", "labirinto",
    "lagartixa", "lobisomem", "macarrao", "mariposa", "microfone",
    "morcego", "navalha", "orquestra", "oxigenio", "papagaio",
    "paralelepipedo", "passaporte", "pinguim", "quadrado", "quibe",
    "radiador", "relampago", "sabonete", "salamandra", "tartaruga",
    "teclado", "telescopio", "tijolo", "trampolim", "travesseiro",
    "vassoura", "ventilador", "viking", "xilofone", "zebra"];
// Sorteando e adicionando a palavra
const palavra = listaPalavras[sortearNumero(0, listaPalavras.length)].toUpperCase()
const palavraOculta = document.querySelector(".palavra-certa");

// Definindo a quantidade de espaços que vão aparecer (conforme as letras)
for (let i = 0; i < palavra.length; i++) {
    // Cria um h2 com cada letra da palavra em questão 
    const letra = document.createElement('h2');
    // adiciona os estilos de letra e oculto
    letra.classList.add("letra");
    letra.classList.add("hidden");
    // Adiciona a letra especifica
    letra.innerText = palavra[i];
    // Adiciona no campo da palavra oculta
    palavraOculta.append(letra);
}

// Pegando as letras ocultas e as partedos do boneco
const letras = document.querySelectorAll('.letra');
const boneco = document.querySelectorAll('.boneco');
const listaBoneco = [...boneco];
listaBoneco.reverse();

// Elementos que vão aparecer no fim do jogo
const shadow = document.querySelector('#shadow');
const painel = document.querySelector("#painel");
const showTentativas = document.querySelector('#tentativas');
const showPalavra = document.querySelector('#palavra-certa');
const mensagem = document.querySelector('h3');

// Contador de tentativas totais e de acertos
let tentativas = 0;
let acertos = 0;

// Lista pra linkar teclado físico e virtual
const teclas = []

// Criando o teclado com alfabeto
const linhas = document.querySelectorAll('.linha');
alfabeto = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"]
for (let i = 0; i < 26; i++) {
    const letra = document.createElement('button');
    letra.classList.add("tecla");
    letra.innerHTML = alfabeto[i];
    letra.id = alfabeto[i];
    letra.addEventListener('click', escrever.bind(null, letra, palavra), { once: true });
    if (i < 10) {
        linhas[0].append(letra);
    } else if (i < 19) {
        linhas[1].append(letra);
    } else {
        linhas[2].append(letra);
    }
    teclas.push(letra)
}
document.addEventListener('keydown', (e) => {
    const clique = e.key.toUpperCase();
    if (alfabeto.includes(clique)) {
        teclas.forEach((tecla) => {
            if (clique == tecla.id) {
                escrever(tecla, palavra);
            }
        })
    }
})