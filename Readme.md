# Boas Vindas

# Contexto
Este projeto trata-se de uma ferramenta para controle de tarefas com apontamento de horas.

## Técnologias usadas

Front-end:

> Desenvolvido usando: 
* React
* React-hooks
* Context-api
* CSS3
* HTML5

Back-end:

> Desenvolvido usando:
* NodeJS
* ExpressJS
* MongoDB
* Swagger

#

## Clonando o projeto

```bash
  git clone git@github.com:Alexsandro-01/IngaCode.git
```

#

## Iniciando o projeto

O projeto está configurado com docker-compose, para iniciar o projeto basta executar o comando abaixo no terminal da raíz do projeto.

As portas `3000`, `3001` e `27017` precisam estar livres para a plicação funcionar corretamente.

```bash
  docker-compose up
```

#

## Token JWT

Na raíz da aplicação de Back-end há um arquivo chamador  `jwt.key.example`. Para que o JWT funcione corretamente, renomeie este arqui para `jwt.key`, Do contrário a a autenticação ná irá funcionar. <br />
Caso queira usar a secret que utilizei no desenvolvimento, subistitua o conteúdo arquivo por `yhK9&fhMO12`, assim os tokens no arquivo do Postman vão funcionar e você não vai precisar trocar.

#

## Populando as collections de Users e Collaborators

Os arquivos para popular as collections estão nos seguintes diretórios.
```
  ./Back-end/src/querys/Users.mongodb
  ./Back-end/src/querys/Collaborators.mongodb
```

**Note:** Nos arquivos para popular as collections há comentários com as senhas, não criptografadas, dos usuários para fazer login.

#

## Caso queira iniciar os Serviços separadamente

No terminal de Front-end executar no terminal
```bash
  npm start
```

No terminal de Back-end executar no terminal
```bash
  npm run dev
```

**Note:** Será necessário um serviço Mongo na porta `27017` para a aplicação funcionar.

#


## Acessando os serviços

Front-end: `localhost:3000/` <br />
Back-end: `localhost:3001/`

## Documentação da API

<b>Suagger:</b> As rotas da API estão mapeadas com o Swagger. Para ter acessar visite no seu navegador acesse: `http://localhost:3001/doc/#/`

Ifelizmente não consegui mapear a tempo os dados de requisição e responsta de cada endpoint com o swagger. Mas a documentção ainda mostra o caminho para todos os endpoints e dados básicos sobre cada um.

<b>Postman:</b> A uma collection do `Postman` na raíz do diretório de Back-end chamada `ingacode.postman_collection.json`. Caso queira utilizar, basta importá-la no `Postman`. Essa coleção foi utilizada por mim enquanto construia a API. Alguns dados como id de collections, tasks, users, com certeza vão estar desatualizados, então precisar ser substituídos pelos criados quando a aplicação estiver funcionando.

