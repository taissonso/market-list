import {
    adicionarNaTabela
} from './elementos.js';


/**
 *  - Ao carregar o arquivo, verifica se existe a lista no localStorage.
 *      - Se positivo, verifica se a lista ta vazia e mostra uma mensagem.
 *        ou carrega os elementos na tabela.
 *      - Se negativo, cria a lista de produtos e mostra a mensagem de lista vazia.   
 */

window.addEventListener("load", () => {

    if (localStorage.hasOwnProperty('listaProdutos')) {
        carregarLista();
    } else {
        criarLista();
    }

    function criarLista() {
        let listaProdutos = new Array();
        localStorage.setItem("listaProdutos", JSON.stringify(listaProdutos));
        mostrarMensagem();
    }

    function carregarLista() {
        let lista = JSON.parse(localStorage.getItem("listaProdutos"));
        if (lista.length == 0){
            mostrarMensagem();
        } 

        for (let chave of lista) {
            adicionarNaTabela(chave);
        }
    }

    function mostrarMensagem() {
        let tabela = document.querySelector('.product-add-table');
        let texto = '* Sua Lista está vazia!!!'
        let footerTable = document.createElement('tfoot');
        footerTable.innerHTML = texto;
        tabela.appendChild(footerTable);
    }

    var btnEnviar = document.getElementById('btn-enviar');
    btnEnviar.addEventListener('click', (ev) => {

        let produto = document.getElementById("product").value;
        let quantidade = document.getElementById("quantity").value;
        let span = document.getElementById('error');
        if (produto.trim() == '') {
            span.style.visibility = 'visible';
        } else {
            span.style.visibility = 'hidden';
            adicionarItem(produto, quantidade);
        }
        document.querySelector('form').reset();
        ev.preventDefault();
    });

    /** 
     *  Cria um vetor para receber uma copia dos valores do localStorage caso existam.
     *  Adiciona os valores dos inputs no objeto. 
     *  Copia os valores do localStorage para o array.
     *  Adiciona o item no final do array
     *  E atualiza o localStorage
     */
    function adicionarItem(produto, quantidade) {
        let arrayTemporario = new Array();
        const item = {produto, quantidade };
        arrayTemporario = JSON.parse(localStorage.getItem("listaProdutos"));
        arrayTemporario.push(item);
        localStorage.setItem("listaProdutos", JSON.stringify(arrayTemporario));
        adicionarNaTabela(item);
    }

});