export {
    adicionarNaTabela
};


/** Cria um td (celula) para adicionar o checkbox, cria e adiciona o 
 * checkbox no td(celula), chamando uma função para criar o checkbox 
 * e dar o tipo do input e adiciona o mesmo na linha */
function adicionarNaTabela(item) {
    let corpoTabela = document.querySelector('.product-add-table tbody');
    let linha = criarElemento('tr');
    let celula;
    
    celula = criarElemento('td');
    integrarElemento(celula, criarCheckbox());
    integrarElemento(linha, celula);

    celula = criarElemento('td');
    celula.innerHTML = item.produto;
    integrarElemento(linha, celula);

    celula = criarElemento('td');
    if(item.quantidade.trim() == ''){
        celula.innerHTML = '-';
    }else {
        celula.innerHTML = item.quantidade;
    }

    integrarElemento(linha, celula);
    integrarElemento(corpoTabela, linha);
}

export default function criarElemento(elemento) {
    return document.createElement(elemento);
}

function integrarElemento(ondeAdicionar, elemento) {
    return ondeAdicionar.appendChild(elemento);
}

function criarCheckbox() {
    let checkbox = criarElemento('input');
    checkbox.type = 'checkbox';
    return checkbox;
}