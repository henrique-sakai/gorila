# Teste Gorila

Este projeto tem como objetivo desenvolver uma SPA de uma carteira de investimentos, possibilitando ao usuário salvar investimentos de dois tipos: Renda fixa e Renda variável. Também é possível visualizar os investimentos salvos e um resumo geral dos valores investidos.

Ele está hospedado no Heroku: https://stormy-refuge-66041.herokuapp.com/

Para o desenvolvimento foram utilizadas as tecnologias:

-Node.js para o backend

-Vue.js para o front-end

-MongoDB para o banco de dados(https://cloud.mongodb.com)

## Rodar localmente

Para rodar a aplicação localmente, utilizando o mesmo banco de dados:

-No diretório 'server':
```
npm run dev
```
-No diretório 'client':
```
npm run serve
```

Para utilizar outro banco de dados:
-Altere a string de conexão da funcção connectCollection no arquivo C:\Users\sakai\Desktop\Gorila\server\routes\api\utils.js

## Deploy no Heroku

Para fazer deploy no Heroku pelo terminal(necessário heroku CLI instalado) é necessário primeiro 
gerar uma pasta 'public' relativa ao arquivos de 'client' na pasta 'server'. Para isso rode o comando "npm run build" no diretório 'client'.

Em seguida vá no diretório do projeto e faça os seguintes comandos:

```
git add .
```

```
git commit -m "changes"
```

```
heroku login
```

```
heroku create 
```

No site do heroku: na sua conta procure pela aplicação criada, vá em Deploy e copie o comando mostrado para Clone the repository(algo como 'heroku git:....'). Rode o comando copiado.

```
git push heroku master;
```

E receberá o link da aplicação
