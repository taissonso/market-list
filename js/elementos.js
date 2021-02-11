export {
    adicionarNaTabela
};


/** Cria um td (celula) para adicionar o checkbox, cria e adiciona o 
 * checkbox no td(celula), chamando uma função para criar o checkbox 
 * e dar o tipo do input e adiciona o mesmo na linha */
function adicionarNaTabela(lista, item) {
    let corpoTabela = lista;
    let linha = criarElemento('tr');
    let celula;
    let botao;
    let label;
    celula = criarElemento('td');
    integrarElemento(celula, criarCheckbox(item, 'check-'+item.id));
    integrarElemento(linha, celula);

    celula = criarElemento('td');
    label = criarElemento('label');
    label.setAttribute("for",  "check-" + item.id)
    label.innerHTML = item.produto;
    integrarElemento(celula, label);
    integrarElemento(linha, celula);

    celula = criarElemento('td');
    if(item.quantidade.trim() == ''){
        celula.innerHTML = '-';
    }else {
        celula.innerHTML = item.quantidade;
    }
    integrarElemento(linha, celula);

    celula = criarElemento('td');
    botao = criarBotao('edit-'+item.id, 'editar');
    integrarElemento(celula, botao);
    integrarElemento(linha, celula);

    celula = criarElemento('td');
    botao = criarBotao('delet-'+item.id, 'deletar');
    integrarElemento(celula, botao);
    integrarElemento(linha, celula);

    integrarElemento(corpoTabela, linha);
}

function criarElemento(elemento) {
    return document.createElement(elemento);
}

function integrarElemento(ondeAdicionar, elemento) {
    return ondeAdicionar.appendChild(elemento);
}

function criarCheckbox(item, id) {
    let checkbox = criarElemento('input');
    checkbox.type = 'checkbox';
    checkbox.id = id;
    
    if (item.check == true) {
        checkbox.checked = true;
    } else {
        checkbox.checked = false;
    }
    return checkbox;
}

function criarBotao(id, nome){
    let botao = criarElemento('button');
    botao.id = id;
    botao.className = 'btn-' + nome;
    botao.innerHTML = nome;
    return botao;
}