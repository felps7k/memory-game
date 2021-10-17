'use restrict';

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
        <div>${pontos}</div>
        <div>${dificuldade}</div>
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
    bancof.forEach((item, indice) => Crianome (item.nome, item.pontos, item.dificuldade, indice));
}

const inserirItem = (evento) =>{
    const tecla = evento.key;
    if(tecla === 'Enter'){
        const bancof = getBancof();
        bancof.push ({'nome': evento.target.value, 'pontos': ''})
        setBancof(bancof);
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
