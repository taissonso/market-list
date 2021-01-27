import {criarElemento, integrarElemento} from './elementos.js';


/**
 *  - Ao carregar o arquivo, verifica se existe a lista no localStorage.
 *      - Se positivo, verifica se a lista ta vazia e mostra uma mensagem.
 *        ou carrega os elementos na tabela.
 *      - Se negativo, cria a lista de produtos e mostra a mensagem de lista vazia.   
 */

window.addEventListener("load", ()=> {

    if (localStorage.hasOwnProperty('listaProdutos')){
        carregarLista();
    } else {
        criarLista();
    }

    function criarLista() {
        let listaProdutos = new Array();
        localStorage.setItem("listaProdutos", JSON.stringify(listaProdutos));
        console.log(listaProdutos.length);
        mostrarMensagem();
    }

    function carregarLista() {
        let lista = JSON.parse(localStorage.getItem("listaProdutos"));
        if(lista.length == 0) mostrarMensagem();
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

        let entrada = document.getElementById("product").value;
        let span = document.getElementById('error');
        if(entrada.trim() == '') {
           span.style.visibility = 'visible';
        } else {
            span.style.visibility = 'hidden';
        }
        document.querySelector('form').reset();
        ev.preventDefault();
    });

});