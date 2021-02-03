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
     * Limpa as tabela e carrega elas para não precisar fazer reload em toda a
     * página
     * Chama a função para adicionar na tabela usando o for..of
     */
    function carregarLista() {
        let listProduct = JSON.parse(localStorage.getItem("listaProdutos"));
        let listDeleted = JSON.parse(localStorage.getItem("listaRemovidos"));
        let tabelaAdd = document.querySelector('.product-add tbody');
        let tabelaDeleted = document.querySelector('.product-deleted tbody');

        $('.product-add tbody').empty();
        $('.product-deleted tbody').empty();;

        mostrarMensagem(listProduct.length);

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

        document.querySelector('.form-principal').reset();
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
        arrayAdicionados = JSON.parse(localStorage.getItem("listaProdutos"));

        let id = gerarID();
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

    /** Gera o id do produto conforme o tamanho da lista. Verifica qual o id mais alto
     * entre os dois arrays de objetos e soma mais 1 ao final dessa verificação
     */
    function gerarID() {
        let arrayAdicionados = JSON.parse(localStorage.getItem("listaProdutos"));
        let arrayRemovidos = JSON.parse(localStorage.getItem("listaRemovidos"));
        let idAdicionados = 0;
        let idRemovidos = 0;
        let maior = 0;

        for (let objeto of arrayAdicionados) {
            if (objeto.id > idAdicionados) {
                idAdicionados = objeto.id;
            }
        }

        for (let objeto of arrayRemovidos) {
            if (objeto.id > idRemovidos) {
                idRemovidos = objeto.id;
            }
        }
        maior = Math.max(idAdicionados, idRemovidos);
        return maior + 1;
    }

    /** Verifica alguma mudança na tabela e verifica qual checkbox teve mudança no 
     * atributo checked
     */
    document.querySelector('.product-add').addEventListener('change', () => {
        let lista = document.querySelectorAll('td input');
        lista.forEach((checkbox) => {
            if (checkbox.checked) {
                let id = checkbox.getAttribute('data-id');
                alterandoTrue(id);
            }
        })
    });


    /** Verifica alguma mudança na tabela e verifica qual checkbox teve mudança no 
     * atributo checked
     */
    document.querySelector('.product-deleted').addEventListener('change', () => {
        let lista = document.querySelectorAll('td input');
        lista.forEach((checkbox) => {
            if (checkbox.checked == false) {
                let id = checkbox.getAttribute('data-id');
                alterandoFalse(id);
            }
        })
    });

    /** Altera o status do checkbox e remove o elemento desse array e insere no array
     * de elementos concluidos
     */
    function alterandoTrue(id) {
        let listaProdutos = new Array();
        let listaRemovidos = new Array();

        listaProdutos = JSON.parse(localStorage.getItem("listaProdutos"));
        listaRemovidos = JSON.parse(localStorage.getItem("listaRemovidos"))

        let achou = listaProdutos.find((chave) => chave.id == id);
        let index = listaProdutos.indexOf(achou);
        if (index > -1) {
            listaProdutos.splice(index, 1);
            localStorage.setItem("listaProdutos", JSON.stringify(listaProdutos));
            achou.check = true;
            listaRemovidos.push(achou);
            localStorage.setItem("listaRemovidos", JSON.stringify(listaRemovidos));
            carregarLista();
        }
    }

    /** Altera o status do checkbox e remove o elemento desse array e insere no array
     * de elementos concluidos
     */
    function alterandoFalse(id) {
        let listaProdutos = new Array();
        let listaRemovidos = new Array();

        listaProdutos = JSON.parse(localStorage.getItem("listaProdutos"));
        listaRemovidos = JSON.parse(localStorage.getItem("listaRemovidos"))

        let achou = listaRemovidos.find((chave) => chave.id == id);

        let index = listaRemovidos.indexOf(achou);
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

    $('.product-add').on("click", ".btn-deletar", (botao) => {
        deletarItem(botao, 'listaProdutos');
    });

    $('.product-deleted').on("click", ".btn-deletar", (botao) => {
        deletarItem(botao, 'listaRemovidos');
    });

    function deletarItem(botao, lista) {
        let listaObjetos = JSON.parse(localStorage.getItem(lista));
        let idAchado = botao.currentTarget.id;

        idAchado = idAchado.replace(/([^\d])+/gim, '');
        let achou = listaObjetos.find((chave) => chave.id == idAchado);
        let index = listaObjetos.indexOf(achou);
        if (index > -1) {
            listaObjetos.splice(index, 1);
            localStorage.setItem(lista, JSON.stringify(listaObjetos));
            carregarLista();
        }
    }

    $('.product-add').on("click", ".btn-editar", (botao) => {
        editarItem(botao, 'listaProdutos');
    });

    $('.product-deleted').on("click", ".btn-editar", (botao) => {
        editarItem(botao, 'listaRemovidos');
    });

    function editarItem(botao, lista) {
        $('#abrirModal').show();
        let listaObjetos = JSON.parse(localStorage.getItem(lista));
        let id = botao.currentTarget.id;
        id = id.replace(/([^\d])+/gim, '');
        console.log(id)

        let objeto = listaObjetos.find((chave) => chave.id == id);
        console.log(objeto);
        document.getElementById('productLabel').value = objeto.produto;
        document.getElementById('quantityLabel').value = objeto.quantidade;
        $('#btn-salvar').click( ()=> {
            objeto.produto = document.getElementById('productLabel').value;
            objeto.quantidade = document.getElementById('quantityLabel').value;
            console.log(objeto)
            localStorage.setItem(lista, JSON.stringify(listaObjetos));
            $('#abrirModal').hide();
            document.querySelector('form').reset();
        });
        carregarLista();

    }

    $('#btn-cancelar').click(function (ev){
        ev.preventDefault();
        $('#abrirModal').hide();
    });
});