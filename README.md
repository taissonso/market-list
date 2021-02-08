# market-list
    Se trata de uma lista de compras para supermercado/feira. A medida que se insere os itens, os
    mesmos serão mostrados em uma tabela, com a descrição e quantidade inseridos, juntos com dois botões para editar e deletar o mesmo. No primeiro campo de cada item terá um checkbox para 
    marcar item quando concluido. Quando concluido os itens irão para o final da tabela.
    Quando os itens adicionados terminam um botão de deletar a lista é mostrado ao final da tabela.   

    -- A lista de compras será salva no localStorage, ao carregar a página verifica se já existe 
    uma lista no localStorage. 
        - Se positivo, carrega a lista e mostra os itens na tabela. Se a lista estiver vazia mostra
        uma mensagem na tabela. 
        - Se negativo, cria o vetor no localStorage e mostra a mensagem de lista vazia na tabela.

    -- Campos de entrada: os input's 'Produto' e 'Quantidade' podem enviar produtos repetidos, 
    a única restrição será o envio de itens vazios no campo 'Produto'.
        - Caso positivo para itens vazios irá mostrar uma mensagem alertando o eventual erro.
        - Caso de envio com sucesso, irá limpar os campos de entrada.

    -- Tabela de produtos: lista todos os produtos adicionados, cria o checkbox no primeiro
    campo, para ser marcado quando o item for concluído/comprado. 
        - No campo quantidade, quando não for adicionado uma quantidade, será inserido um sinal de
        menos (-).

    -- Checkbox na tabela:   
        - Se for clicado, manda para o fim da tabela e deixa o checked com true.
        - Se for clicado quando 'true' ativo retorna o item para a sua posição
        original com o checkbox em 'false'.

    -- Botão 'Editar': irá abrir um modal para a editar o item/produto selecionado.

    -- Botão 'Deletar': deleta o item/produto da lista.

    -- Botão 'Limpar Lista': caso queira limpar toda a lista.
    
    -- Modal: 