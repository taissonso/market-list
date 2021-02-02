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
        let listaRemovidos = new Array();
        localStorage.setItem("listaProdutos", JSON.stringify(listaProdutos));
        localStorage.setItem("listaRemovidos", JSON.stringify(listaRemovidos));
        mostrarMensagem(listaProdutos.length);
    }

    /** Pega lista do localStorage
     * Chama a função 'mostrarMensagem' para tratar a mensagem de lista vazia.
     * Chama a função para adicionar na tabela usando o for..of
     */
    function carregarLista() {
        let listProduct = JSON.parse(localStorage.getItem("listaProdutos"));
        let listDeleted = JSON.parse(localStorage.getItem("listaRemovidos"));
        $('.product-add tbody').empty();
        $('.product-deleted tbody').empty();;

        
        
        mostrarMensagem(listProduct.length);

        let tabelaAdd = document.querySelector('.product-add tbody');
        let tabelaDeleted = document.querySelector('.product-deleted tbody');

        for (let chave of listProduct) {
            adicionarNaTabela(tabelaAdd, chave);
        }

        for (let chave of listDeleted) {
            adicionarNaTabela(tabelaDeleted, chave);
        }
    }

    /** Muda o CSS do span para mostrar a mensagem ou não na lista*/
    function mostrarMensagem(tamanhoLista) {
        let span = document.getElementById('lista-vazia');
        if (tamanhoLista > 0) {
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
        let tableAdd = document.querySelector('.product-add tbody');

        let arrayAdicionados = new Array();
        let arrayRemovidos = new Array();

        arrayAdicionados = JSON.parse(localStorage.getItem("listaProdutos"));
        arrayRemovidos = JSON.parse(localStorage.getItem("listaRemovidos"));

        let id = arrayAdicionados.length + arrayRemovidos.length + 1;
        let check = false;
        const item = {
            produto,
            quantidade,
            check,
            id
        }
        arrayAdicionados.push(item);
        localStorage.setItem("listaProdutos", JSON.stringify(arrayAdicionados));
        mostrarMensagem(arrayAdicionados.length);
        adicionarNaTabela(tableAdd, item);
    }

    document.querySelector('.product-add').addEventListener('change', () => {
        let lista = document.querySelectorAll('td input');
        lista.forEach((teste) => {
            // console.log(teste.checked)
            if (teste.checked) {
                let id = teste.getAttribute('data-id');
                alterandoTrue(id);
            } 
        })
    });

    document.querySelector('.product-deleted').addEventListener('change', () => {
        let lista = document.querySelectorAll('td input');
        lista.forEach((teste) => {
            // console.log(teste.checked)
            if (teste.checked == false) {
                let id = teste.getAttribute('data-id');
                alterandoFalse(id);
            } 
        })
    });

    function alterandoTrue(id) {
        // console.log('TRUE');
        let listaProdutos = new Array();
        listaProdutos = JSON.parse(localStorage.getItem("listaProdutos"));

        let listaRemovidos = new Array();
        listaRemovidos = JSON.parse(localStorage.getItem("listaRemovidos"))

        let achou = listaProdutos.find((chave) => chave.id == id);
        // console.log(achou);
        var index = listaProdutos.indexOf(achou);
        if (index > -1) {
            listaProdutos.splice(index, 1);
            localStorage.setItem("listaProdutos", JSON.stringify(listaProdutos));
            achou.check = true;
            listaRemovidos.push(achou);
    
            // console.log(listaRemovidos);
            localStorage.setItem("listaRemovidos", JSON.stringify(listaRemovidos));
            carregarLista();
        }
    }

    function alterandoFalse(id) {
        // console.log('FALSE');
        let listaProdutos = new Array();
        listaProdutos = JSON.parse(localStorage.getItem("listaProdutos"));

        let listaRemovidos = new Array();
        listaRemovidos = JSON.parse(localStorage.getItem("listaRemovidos"))

        let achou = listaRemovidos.find((chave) => chave.id == id);

        var index = listaRemovidos.indexOf(achou);

        if (index > -1) {
            listaRemovidos.splice(index, 1);
            localStorage.setItem("listaRemovidos", JSON.stringify(listaRemovidos));
            achou.check = false;
            listaProdutos.push(achou);

            listaProdutos.sort((itemA, itemB) => {
                return (itemA.id > itemB.id) ? 1 : ((itemB.id > itemA.id) ? -1 : 0);
            });
            localStorage.setItem("listaProdutos", JSON.stringify(listaProdutos));

            carregarLista();
        }
    }

});