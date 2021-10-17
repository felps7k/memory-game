'use restrict';

let bancod = [
    //{'nome':'Naruto', 'pontos': '10'},
];


const getBancod = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const  setBancod = (bancod) => localStorage.setItem("todoList", JSON.stringify(bancod));

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
    const bancod = getBancod();
    bancod.forEach( (item, indice) => Crianome (item.nome, item.pontos, item.dificuldade, indice));
}

const inserirItem = (evento) =>{
    const tecla = evento.key;
    if(tecla === 'Enter'){
        const bancod = getBancod();
        bancod.push ({'nome': evento.target.value, 'pontos': ''})
        setBancod(bancod);
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
    const bancod = getBancod();
    bancod.splice (indice, 1 );
    setBancod(bancod);
    atualizarTela();
}

/*function atualizarItem (indice){
   const bancod = getBancod();
    bancod[indice].pontos = bancod[indice].pontos === '' ? 'checked' : '';
    setBancod(bancod);
    atualizarTela();
}*/
document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem);

atualizarTela();
