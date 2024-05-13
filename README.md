# Bitcoin Server API

Projeto que tem como objetivo uma api de investimentos.

. Express usado como framework para o servidor

. Tsyringe para injeção de dependências

. Cron para obter dados de compra/venda da API MercadoBitcoin

. Banco Postgresql como sgbd principal 

. Salva cache de novos dados em cache Redis

. Salva histórico de transações (depósitos, compra e venda);

. MailerSend usado para enviar emails de notificação;


## Como começar

Para iniciar o projeto, siga estas etapas:

1. Certifique-se de ter o Docker instalado.
2. Execute o seguinte comando na raiz do projeto para iniciar os serviços:

docker-compose up

3. Execute o seguinte comando para rodar as migrações e iniciar o servidor:

npm run backend



## Acesso aos Serviços

- O servidor estará disponível em [http://localhost:3003](http://localhost:3003).
- O PGAdmin estará disponível em [http://localhost:16543](http://localhost:16543).

## Tarefas Agendadas

O projeto usa o node-cron para executar duas tarefas agendadas:

- Obtenção de registros da API de Bitcoin a cada 10 segundos.
- Exclusão de registros antigos do histórico de Bitcoin a cada hora.


## Envio de Emails

Este projeto utiliza a API do MailerSend para enviar emails. Certifique-se de configurar corretamente as credenciais de API no arquivo `.env`.


## Testes unitários

Para executar testes, execute o seguinte comando na raiz do projeto:

npm run test