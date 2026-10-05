Projeto: CRUD de Pacientes

Este projeto consiste em uma aplicação web para cadastro e consulta de pacientes. A aplicação foi desenvolvida utilizando NestJS para o back-end, React para o front-end e PostgreSQL como banco de dados.

Toda a aplicação é executada utilizando Docker, facilitando a execução.

Sumário:

1 - Requisitos

2 - Estrutura do projeto

3 - Como executar

4 - Como derrubar os recursos

Requisitos:

Para executar o projeto, é necessário ter:

Git

Node.js

Docker Desktop

Docker Compose

Estrutura:

O projeto está organizado da seguinte forma:

api/ - contém a API desenvolvida com NestJS.

front/ - contém a aplicação front-end desenvolvida com React.

deploy/ - contém os arquivos necessários para o Docker Compose e as variáveis de ambiente.

Como executar:

Primeiro, é necessário clonar o repositório:

git clone 

Depois, entrar na pasta do projeto:

cd projeto-docker-pacientes/deploy


Por fim, executar o Docker Compose:

docker compose up -d --build


O comando irá criar e iniciar os containers da aplicação, além de realizar o build das imagens.

Como parar os recursos:

Para parar e remover os containers criados pelo Docker Compose, basta executar:

docker compose down

Caso também queira remover o volume utilizado pelo banco de dados, pode ser utilizado:

docker compose down -v

Nesse caso, os dados armazenados no volume do banco também serão removidos.