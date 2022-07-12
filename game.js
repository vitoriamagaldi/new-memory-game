const grid = document.querySelector('.grid');
var minutes = 0,
seconds = 0,
counter = '';

function start(){
    counter = setInterval(timer, 1000);
}
function timer(){
    seconds ++;
    if(seconds == 60){
        seconds = 0;
        minutes ++;
        if(minutes == 60){
            alert('Tempo excedido');
            minutes = 0;
            seconds = 0;
        }
    }
    var format = (minutes < 10? '0' + minutes : minutes) + ':' + (seconds < 10? '0' + seconds : seconds);
    document.querySelector('.tempo').textContent = format;
}
start();
const characters = [
  'beth',
  'jerry',
  'jessica',
  'morty',
  'pessoa-passaro',
  'pickle-rick',
  'rick',
  'summer',
  'meeseeks',
  'scroopy',
];
// criar uma função createElement
// criar função createCard que usa createElement e coloca elementos html -> setAttribute('data-character', character)
// criar função loadGame com outro array para espalhar os elementos da array
// forEach character createCard e coloca no grid

const createElement = (tag, className) =>{
    var element = document.createElement(tag);
    element.className = className;
    return element
}

let firstCard = '';
let secondCard = '';
function confirmar(){
    var confirmacao = confirm('Deseja jogar novamente?');
    if(confirmacao == true){
        location.reload(true);
    }
    else{
        return;
    }
}

function checkEnd(){
    const disables = document.querySelectorAll('.disabled-card');
    if(disables.length === 20){
        clearInterval(counter);
        setTimeout(confirmar, 1000);
    }
}

var erros = 0;
const checkCards = () =>{
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if(firstCharacter === secondCharacter){
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';
        checkEnd();
    }
    else{
        setTimeout(() =>{
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');
            firstCard = '';
            secondCard = '';
            erros ++;
            document.querySelector('.tentativas').textContent = erros;
        }, 500);
    }
}

const revealCard = ({target}) =>{
    if(target.parentNode.className.includes('reveal-card')){
        return; // sai daqui
    }
    if(firstCard === ''){ //se ainda não foi clicado
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if(secondCard === ''){ // se o segundo tambem não foi clicado
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards(); // uma vez que o primeiro e segundo cards ja foram clicados, é hora de verificar
    }
}





const createCard = (personagem) => {
    var card = createElement('div', 'card');
    const front = createElement('div', 'view front-view');
    var back = createElement('div', 'view back-view');
    card.setAttribute('data-character', personagem);

    front.style.backgroundImage = `url(images/${personagem}.png)`;
    card.appendChild(front);
    card.appendChild(back);
    card.addEventListener('click', revealCard);

    return card;
}

function loadGame(){
    var duplicatedCharacters = [ ...characters, ...characters];
    var mixedCharacters = duplicatedCharacters.sort(() => Math.random() - 0.5);
    //const duplicatedCharacters = [ ...characters, ...characters];
    //const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    mixedCharacters.forEach((character) =>{
        const card = createCard(character);
        grid.appendChild(card);
    })
}

loadGame();