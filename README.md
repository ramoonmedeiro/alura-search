# CineQuest

## Description
CineQuest é uma aplicação web onde visa a busca de filmes, com a possibilidade de visualizar detalhes sobre o filme, como: sinopse e ano de lançamento.
Cinequest foi o início de um projeto maior que só veio a tona devido à competição do time da Alura, na qual agradeço a inspiração e conteúdo ministrados na semana da imersão dev, sem isso, eu não conseguiria ter aprendido ferramentas como: html, css e javascript.

## Tecnologias

As seguintes tecnologias foram utilizadas:
- Front-end:
  - HTML
  - CSS
  - JavaScript

No front-end evitei usar frameworks prontos, para de fato me desafiar nas diversas features e elementos que css e html possuem.
Criei a página homepage.html para apresentar a tela inicial já com o poder de busca acessível. E criei a página search.html, que
era a página que os usuários são redirecionados quando executam de fato uma busca no sistema.
O javascript auxiliou na dinamização do projeto, criação de cards dinâmicos por exemplo, e tbm na chamada da API, que foi criada e explicada abaixo 
com o fastAPI.


- Back-end:
  - Python (FastAPI e Flask)
  - Meilisearch

Eu optei por utilizar um backend voltado a Python que é a minha linguagem principal.
Ela é dividida em duas partes: WEB (criada com o flask) e API (criada com o fastAPI).
O flask fica como servidor web, para acessarmos as páginas e controlar rotas.
E a API serve dois endpoints, que trazem os resultados das buscas enviadas pelo usuário.
E para isso, eu usei o meilisearch, que é uma ferramente que vem ganhando bastante espaço
e na qual tenho bastante familiaridade.

Na imagem abaixo tem o pipeline de tecnologias utilizadas no projeto.

![Pipeline de Tecnologias](pipeline.png)

O desafio consistia em fazer uma aplicação web, focada no frontend. Por isso o backend deste projeto é relativamente simples e não foi levado em conta todas as questões de segurança e performance que um projeto real necessitaria. Mas serviu como base para enriquecer o que o frontend poderia fazer.

## Como rodar o projeto
Muito em breve o projeto estará no ar, estou trabalhando o mais rápido possível nisso.

Caso queira rodar localmente, basta ter o docker instalado e rodar o comando abaixo:

```bash
docker-compose up
```

## Agradecimentos
Gostaria de agradecer à equipe Alura por proporcionar esse desafio, onde pude explorar e me aventurar nesse
"novo" mundo que é o front-end.

## Palavras finais
Este projeto foi criado em um pouco mais de um dia, então com o tempo irei atualizando ele.
