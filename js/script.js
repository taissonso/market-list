import {
    adicionarNaTabela
} from './elementos.js';

window.addEventListener("load", () => {

    if (localStorage.hasOwnProperty('listaProdutos')) {
        carregarLista();
    } else {
        criarLista();
    }

    /**
     * Cria um array
     * Adiciona o array no localStorage
     * Chama a função mostrarMensagem para tratar caso não tenha itens no localStorage.
     */
    function criarLista() {
        let listaProdutos = new Array();
        localStorage.setItem("listaProdutos", JSON.stringify(listaProdutos));
        mostrarMensagem(listaProdutos.length);
    }

    /** Pega lista do localStorage
     * Chama a função 'mostrarMensagem' para tratar a mensagem de lista vazia.
     * Chama a função para adicionar na tabela usando o for..of
     */
    function carregarLista() {
        let lista = JSON.parse(localStorage.getItem("listaProdutos"));
        mostrarMensagem(lista.length);

        for (let chave of lista) {
            adicionarNaTabela(chave);
        }
    }

    /** Muda o CSS do span para mostrar a mensagem ou não na lista*/
    function mostrarMensagem(tamanhoLista) {
        let span = document.getElementById('lista-vazia');
        if(tamanhoLista > 0){
            span.style.display = 'none';
        } else {
            span.style.display = 'flex';
        }
    }

    /**
     *  Pega os valores do input's e o elemento span de erro. 
     *  Verifica se o input Produto está vazio e faz o tratamento do erro.
     *  Se não estiver campo vazio, chama a função para adionar o item no localStorage.
     */
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
     *  Copia os valores do localStorage para o array
     *  Adiciona o item no final do array com push
     *  Adiciona o vetor atualizado no localStorage com springify (transforma dados 
     *  do objeto no formato JSON).
     *  Chama a função para apagar a mensagem de lista vazia caso a mesma esteja ativa. 
     *  Adiciona o item na tabela. 
     */
    function adicionarItem(produto, quantidade) {
        let arrayTemporario = new Array();
        const item = {
            produto,
            quantidade
        };
        arrayTemporario = JSON.parse(localStorage.getItem("listaProdutos"));
        arrayTemporario.push(item);
        localStorage.setItem("listaProdutos", JSON.stringify(arrayTemporario));
        mostrarMensagem(arrayTemporario.length);
        adicionarNaTabela(item);
    }

});