const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
$('#modalStart').modal();
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }
  secondCard = this;
  checkForMatch();
}

function ajuda(){
  cards.forEach(card => {
  card.classList.add('flip');
  })
  setTimeout(() => {
      cards.forEach(card => {
      card.classList.remove('flip');
  })
}, 1500);
}

function reRun(){
  cards.forEach(card => {
  card.classList.add('flip');
  })
  setTimeout(() => {
      cards.forEach(card => {
      card.classList.remove('flip');
      $('#modalwin').modal('hide');
  })
  reset();
  start();
}, 1500);
}

function flipCardall(){
  this.classList.add('flip');
  card = this;
}

function checkForMatch() {

  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  if(isMatch){
    point +=5;
    match ++;
    disableCards(); 
  }else{
    unflipCards();
  }
  if (match==2 && point>0){
    point +=20;
    pause();
    $('#modalwin').modal({
      backdrop : 'static'
    })
  }
  return point;
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
};

//-----------------------------------------cronometro-------------------------------------------

"use strict";

let hour = 0;
let minute = 0;
let second = 0;
let millisecond = 0;
let point = 0;
let match = 0;

let cron;

document.form_main.start.onclick = () => start();
document.form_main.pause.onclick = () => pause();
document.form_main.reset.onclick = () => reset();

function start() {
  if(second>0){
    pause();
    cron = setInterval(() => { timer(); }, 10);
    cards.forEach(card => card.addEventListener('click', flipCard));
  }else{
  pause();
  cron = setInterval(() => { timer(); }, 10);
  cards.forEach(card => card.addEventListener('click', flipCard));
  shuffle();
  }
}

function pause() {
  document.getElementById('pontos').innerHTML = returnData(point);
  clearInterval(cron);
  cards.forEach(card => card.removeEventListener('click', flipCard));
}

function reset() {
  hour = 0;
  minute = 0;
  second = 0;
  millisecond = 0;
  match = 0;
  document.getElementById('hour').innerText = '00';
  document.getElementById('minute').innerText = '00';
  document.getElementById('second').innerText = '00';
  //document.getElementById('millisecond').innerText = '000';
  document.getElementById('pontos').innerHTML = '0';

  if(point>0){
    point=0;

  }
}

function timer() {
  if ((millisecond += 10) == 1000) {
    millisecond = 0;
    second++;
  }
  if (second == 60) {
    second = 0;
    minute++;
  }
  if (minute == 60) {
    minute = 0;
    hour++;
  }
  if(minute == 0 && second == 10){
    encerraGame();
  }
  //document.getElementById('hour').innerText = returnData(hour);
  document.getElementById('minute').innerText = returnData(minute);
  document.getElementById('second').innerText = returnData(second);
  //document.getElementById('millisecond').innerText = returnData(millisecond);
  document.getElementById('pontos').innerHTML = returnData(point);
}

function returnData(input) {
  return input > 10 ? input : `0${input}`
}

function iniciaModal(modalID){
  const modal = document.getElementById(modalID)
  modal.classList.add('mostrar');
  modal.addEventListener('click', (evento) =>{
    if(evento.target.className == 'btn btn-secondary'){
      window.location.href="final.html";
    }
  });
}
function vencegame(modalID){
  const modalwin = document.getElementById(modalID)
  modalwin.classList.add('mostrar');
  modalwin.addEventListener('click', (evento) =>{
    if(evento.target.className == 'btn btn-secondary'){
      window.location.href="final.html";
    }
  });
}

function encerraGame(){
  pause();
  $('#modallose').modal({
    backdrop : 'static'
  })
  //iniciaModal('modal');
}

//------------------------------------nomeu-suário------------

'use restrict';

let dificuldad = 'Fácil';
let bancof = [
    //{'nome':'Naruto', 'pontos': '10'},
];

const getBancof = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const  setBancof = (bancof) => localStorage.setItem("todoList", JSON.stringify(bancof));

function Crianome(nome, pontos, dificuldade, indice){
    const item = document.createElement('label');    
    item.classList.add('todo__item');
    //<input type="checkbox" ${pontos} data-indice= ${indice}></input>
    item.innerHTML= `
        <div>${nome}</div>
        <input type='button' value='x' data-indice= ${indice}>
    `
    document.getElementById('todoList').appendChild(item);
}

function limparUsuarios(){
    const todoList= document.getElementById('todoList');
    while(todoList.firstChild){
        todoList.removeChild(todoList.lastChild);
    }
}

function atualizarTela() {
    limparUsuarios();
    const bancof = getBancof();
    bancof.forEach( (item, indice) => Crianome (item.nome, item.pontos, item.dificuldade, indice));
}

const inserirItem = (evento) =>{
    const tecla = evento.key;
    if(tecla === 'Enter'){
        const bancof = getBancof();
        bancof.push ({'nome': evento.target.value, 'pontos': point, 'dificuldade': dificuldad})
        setBancof(bancof);
        window.location.href = "../ranking/rfacil.html";
        atualizarTela();
        evento.target.value='';
    }
}

function clickItem (evento){
    const elemento = evento.target;
    if(elemento.type === 'button'){
        const indice = elemento.dataset.indice;
        removerItem(indice);
    }else if (elemento.type === 'checkbox'){
        const indice = elemento.dataset.indice;
        atualizarItem (indice);
    }
}

function removerItem (indice){
    const bancof = getBancof();
    bancof.splice (indice, 1 );
    setBancof(bancof);
    atualizarTela();
}

/*function atualizarItem (indice){
   const bancof = getBancof();
    bancof[indice].pontos = bancof[indice].pontos === '' ? 'checked' : '';
    setBancof(bancof);
    atualizarTela();
}*/
document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem);

atualizarTela();