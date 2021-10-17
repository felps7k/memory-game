'use restrict';

let bancom = [
    //{'nome':'Naruto', 'pontos': '10'},
];


const getBancom = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const  setBancom = (bancom) => localStorage.setItem("todoList", JSON.stringify(bancom));

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
    const bancom = getBancom();
    bancom.forEach( (item, indice) => Crianome (item.nome, item.pontos, item.dificuldade, indice));
}

const inserirItem = (evento) =>{
    const tecla = evento.key;
    if(tecla === 'Enter'){
        const bancom = getBancom();
        bancom.push ({'nome': evento.target.value, 'pontos': ''})
        setBancom(bancom);
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
    const bancom = getBancom();
    bancom.splice (indice, 1 );
    setBancom(bancom);
    atualizarTela();
}

/*function atualizarItem (indice){
   const bancom = getBancom();
    bancom[indice].pontos = bancom[indice].pontos === '' ? 'checked' : '';
    setBancom(bancom);
    atualizarTela();
}*/
document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem);

atualizarTela();
