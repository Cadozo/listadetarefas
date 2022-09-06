let contador = 0;
let input = document.getElementById('inputTarefa');
let btnAdd = document.getElementById('btnAdd');
let main = document.getElementById('areaLista');

let inputList=[];

function addTarefa() {
    //pegar o valor digitado no input
    let valorInput = input.value;

    //se não for vazio, nem indefinido, nem nulo
    if((valorInput !=="") && (valorInput !==null) && (valorInput !==undefined))
   
    ++contador;
   
    let newInput = {
        id:contador,
        valor: valorInput
    }

    inputList.push(newInput);


    {let novoItem = `<div id="${contador}" class="item">
    <div onclick="marcarTarefa(${contador})" class="item-icone">
        <i id="icone_${contador}"class="mdi mdi-circle-outline"></i>
    </div>
    <div onclick="marcarTarefa(${contador})" class="item-nome">
        ${valorInput}
    </div>
    <div class="item-botao">
        <button onclick="deletar(${contador})" class="delete"><i class="mdi mdi-delete"></i>Deletar</button>

        </button>
    </div>;
    
    </div>`

    //adicionar novo item no main
main.innerHTML += novoItem;

//zerar os campos
input.value= "";
input.focus();

    }
    saveList();
}

function saveList(){
    let ListAsJson = JSON.stringify(inputList);
    window.localStorage.setItem('ListaFerias', ListAsJson);
}

function importList(){
    let importedString = window.localStorage.getItem('ListaFerias');
    let treadList = JSON.parse(importedString);
    return treadList;
}

function deletar(id){
    var tarefa = document.getElementById(id);
    tarefa.remove();
}

function marcarTarefa(id){
    var item = document.getElementById(id);
    var classe = item.getAttribute('class');
    console.log(classe);

    if(classe=="item"){
        item.classList.add('clicado')

        var icone = document.getElementById('icone_'+id);
        icone.classList.remove('mdi-circle-outline');
        icone.classList.add('mdi-check-circle');

        item.parentNode.appendChild(item);

    }else{
        item.classList.remove('clicado')

        var icone = document.getElementById('icone_'+id);
        icone.classList.remove('mdi-check-circle');
        icone.classList.add('mdi-circle-outline');
    }
}

function deletar (id) {
    var tarefa = document.getElementById(id);
    tarefa.remove();

    //procura na lista de inputs o elemnto que possui o meso id e pega qual é o index
    let indexToRemove = inputList.findIndex((input)=> input.id ==id);
    //remove da lista de input pelo index
    inputList.splice(indexToRemove);
    saveList();

}




input.addEventListener("keyup", function(event) {
    //se teclou enter (13)
    if (event.keyCode ===13) {
        event.preventDefault();
        btnAdd.click();
    }
    
});