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
        let body = document.querySelector('body');
        let texto = '* Sua Lista está vazia!!!'
        let teste = document.createElement('h1');
        teste.innerHTML = texto;
        body.appendChild(teste);
    }
});