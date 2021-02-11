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

    /** Muda o CSS do span para mostrar a mensagem ou não na lista e o botão de exluir
     * a tabela. 
     */
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
        let arrayAdicionados = JSON.parse(localStorage.getItem("listaProdutos"));

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

    /** Pega o input[checkbox] selecionado e manda para a função alteraStatus*/
    $('.product-add').on("click", "input", (input) => {
        alteraStatus(input);
    });
    $('.product-deleted').on("click", "input", (input) => {
        alteraStatus(input);
    });

    /**
     *  Pega o checkbox que recebeu o click, pega o id dele, remove o nome padrão dos checkbox
     *  usando regex. 
     *  No primeiro if faz uma busca com o metodo some() para ver se o id existe no array de 
     * produtos adicionados. Caso positivo, localiza a posição no array, o remove do mesmo,
     * atualiza seu status para false e adiciona no array de removidos/concluidos.
     * Se negativo, procura no array de removidos, se positivo remove do array, 
     * adiciona no array de produtos, ordena o mesmo e sai do if.
     * No final atualiza o localStorage e carrega a tabela modificada.  
     * @param {checkbox que recebeu o click} input 
     */
    function alteraStatus(input) {
        let arrayProdutos = JSON.parse(localStorage.getItem('listaProdutos'));
        let arrayRemovidos = JSON.parse(localStorage.getItem('listaRemovidos'));
        let id = input.currentTarget.id;
        id = id.replace(/([^\d])+/gim, '');

        if (arrayProdutos.some((objeto) => objeto.id == id)) {
            let adicionado = arrayProdutos.find((objeto) => objeto.id == id);
            let index = arrayProdutos.indexOf(adicionado);
            if (index > -1) {
                arrayProdutos.splice(index, 1);
                adicionado.check = true;
                arrayRemovidos.push(adicionado);
            }
        } else {
            if (arrayRemovidos.some((objeto) => objeto.id == id)) {
                let removido = arrayRemovidos.find((objeto) => objeto.id == id);
                let index = arrayRemovidos.indexOf(removido);
                if (index > -1) {
                    arrayRemovidos.splice(index, 1);
                    removido.check = false;
                    arrayProdutos.push(removido);
                    arrayProdutos.sort((itemA, itemB) => {
                        return (itemA.id > itemB.id) ? 1 : ((itemB.id > itemA.id) ? -1 : 0);
                    });
                }
            }
        }

        localStorage.setItem("listaRemovidos", JSON.stringify(arrayRemovidos));
        localStorage.setItem("listaProdutos", JSON.stringify(arrayProdutos));
        carregarLista();
    }

    /** Fica escutando o clique nas tabelas para a chamada da função deletarItem,
     * passa o botao como parâmetro. 
     */
    $('.product-add').on("click", ".btn-deletar", (botao) => {
        deletarItem(botao, 'listaProdutos');
    });

    $('.product-deleted').on("click", ".btn-deletar", (botao) => {
        deletarItem(botao, 'listaRemovidos');
    });

    /**
     * Deleta o item que foi clicado. Procura o id com o metodo find, localiza ele
     * com o metodo indexOf e remove ele com o metodo splice, atualiza o localstorage 
     * e atualiza a tabela.
     *  
     * @param {Botão que foi clicado na chamada da função} botao 
     * @param {Qual lista que vai ser buscado o id do item a ser deletado} lista 
     * 
     */
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

    /** Saber qual das tabelas foi clicadas e passar o nome da lista e o botão para a função */
    $('.product-add').on("click", ".btn-editar", (botao) => {
        editarItem(botao, 'listaProdutos');
    });

    $('.product-deleted').on("click", ".btn-editar", (botao) => {
        editarItem(botao, 'listaRemovidos');
    });
    /**
     * Ao chamar a função abre o modal, pega a lista passada para buscar o elemento,
     * tranforma o id para o padrão de busca usando regex, localiza o mesmo usando o 
     * metodo find, adiciona os valores do objeto nos input's do modal, fica escutando
     * o click no botão de Salvar. Caso positivo altera o objeto, atualiza o localStorage,
     * oculta o modal, reseta o form do modal, para não ficar com o último elemento editado
     * salvo no cache e por fim atualiza a tabela. 
     * Botão deletar, foi colocado caso se queira deletar o produto da lista. 
     * 
     * @param {Botão que foi clicado na tabela} botao 
     * @param {Saber qual lista do localStorage usar} lista 
     * 
     */
    function editarItem(botao, lista) {
        $('#abrirModal').show(600);
        $('#abrirModal').css({display:"flex"});

        let listaObjetos = JSON.parse(localStorage.getItem(lista));
        let id = botao.currentTarget.id;
        id = id.replace(/([^\d])+/gim, '');

        let objeto = listaObjetos.find((chave) => chave.id == id);

        document.getElementById('productLabel').value = objeto.produto;
        document.getElementById('quantityLabel').value = objeto.quantidade;
        
        $('#btn-salvar').click((ev) => {
            let produto = document.getElementById('productLabel').value;
            let span = document.getElementById('errorModal');
            if (produto.trim() == '') {
                span.style.visibility = 'visible';
                ev.preventDefault();
            } else {
                objeto.produto = produto;
                objeto.quantidade = document.getElementById('quantityLabel').value;
                localStorage.setItem(lista, JSON.stringify(listaObjetos));
                carregarLista();
                $('#abrirModal').hide(600);
                ev.preventDefault();
            }
           
        });

        $('#btn-deletar').click((ev) => {
            let index = listaObjetos.indexOf(objeto);
            if (index > -1) {
                listaObjetos.splice(index, 1);
                localStorage.setItem(lista, JSON.stringify(listaObjetos));
                carregarLista();
                $('#abrirModal').hide(900);
                ev.preventDefault();
            }
            
        })
    }

    /** Se clicado no botão cancelar do modal, fecha o mesmo. */
    $('#btn-cancelar').click(function (ev) {
        ev.preventDefault();
        $('#abrirModal').hide(600);
    });

    $('.fechar').click(function (ev) {
       $('#abrirModal').hide(600);
       ev.preventDefault();
    });

    /**Quando a lista de produtos adicionados estiver vazia e a lista de concluidos
     * estiver com mais de um item selecionado aparece o botão de deletar a lista
     * então limpa o localstorage, limpa as listas e cria novos vetores no localstorage
     */
    $('#delete-list').click((ev) => {
        localStorage.clear();
        $('.product-add tbody').empty();
        $('.product-deleted tbody').empty();
        criarLista();
        ev.preventDefault();
    });

});