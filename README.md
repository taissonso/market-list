# market-list
    Se trata de uma lista de compras para supermercado/feira. A medida que se insere os itens, os
    mesmos serão mostrados em uma tabela, com a descrição e quantidade inseridos, juntos com dois botões
    para editar e deletar o mesmo. No primeiro campo da tabela de cada item terá um checkbox para 
    marcar item quando concluído. Quando concluídos, os itens irão para o final da tabela. Os itens podem
    ser devolvidos para a lista original ao selecionar seu checkbox. Então o item é devolvido para sua
    posição original.    

    -- A lista de compras será salva no localStorage, ao carregar a página verifica se já existe 
    uma lista no localStorage. 
        - Se positivo, carrega a lista e mostra os itens na tabela. 
        - Se negativo, cria o vetor no localStorage e mostra a mensagem de lista vazia na tabela.

    -- Campos de entrada: os input's 'Produto' e 'Quantidade' podem enviar produtos repetidos, 
    a única restrição será o envio de itens vazios no campo 'Produto'.
        - Caso positivo para itens vazios irá mostrar uma mensagem alertando o eventual erro.
        - Caso de envio com sucesso, irá limpar os input's e adicionara o item há tabela. 

    -- Tabela: lista todos os produtos adicionados, cria o checkbox no primeiro
    campo, para ser marcado quando o item for concluído/comprado. 
        - No campo quantidade, quando não for adicionado uma quantidade, será inserido um sinal de
        menos (-).
        - Checkbox:   
            - Se for clicado, manda para o fim da tabela e deixa o checked com true.
            - Quando estiver ativado (true) e for clicado retorna o item para a sua posição
            original com o checkbox em 'false' (desmarcado).
            - O checkbox também pode ser marcado ao se clicar em cima do nome do item. 

    -- Botão 'Editar': irá abrir um modal para a editar o item/produto selecionado.

    -- Botão 'Deletar': deleta o item/produto da tabela.

    -- Botão 'Limpar Lista': caso queira deletar toda a tabela.
    
    -- Modal: quando aberto o mesmo irá carregar o item selecionado nos inputs de "Produto" e "Quantidade".
    No modal existem 3 opções:
        -- Salvar: quando feito as alterações atualiza o item modificado no localStorage. 
        
        -- Deleta: deleta o item da tabela e do localstorage.
        
        -- Cancelar: fecha o modal. 
        
        -- X: outra opção de fechar/cancelar o modal. 