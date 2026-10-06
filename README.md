Projeto: CRUD de Pacientes

Este projeto consiste em uma aplicação web para cadastro, consulta, atualização e remoção de pacientes.

A aplicação foi desenvolvida utilizando NestJS para o back-end, React com Vite para o front-end e PostgreSQL como banco de dados.

Para facilitar a execução e organização do projeto, todos os serviços são executados utilizando Docker e Docker Compose.

Sumário

1 - Requisitos

2 - Estrutura do projeto

3 - Como executar

4 - Endereços da aplicação

5 - Banco de dados

6 - Endpoints da API

7 - Exemplos

8 - Swagger

9 - Redes Docker

10 - Persistência dos dados

11 - Como derrubar os recursos

12 - Logs

13 - Rebuild

Requisitos:

Para executar o projeto, é necessário ter instalado:

Git

Node.js

Docker Desktop

Docker Compose

É necessário que as seguintes portas estejam livres:

8080 - porta do Front

3000 - porta da API

5433 - porta banco

Estrutura:

O projeto está organizado da seguinte forma:

projeto-docker-pacientes/
README.md
.gitignore
 api/
 front/
 deploy/
    docker-compose.yml
    .env


A pasta api/ contém a aplicação desenvolvida com NestJS. Nela estão os controllers, services, DTOs, entidade Patient e o Dockerfile.

A pasta front/ contém a aplicação desenvolvida com React e Vite. Também possui o Nginx, utilizado para servir o front e encaminhar as requisições para a API.

A pasta deploy/ contém o arquivo docker-compose e o arquivo .env, que possuem as configurações para executar.

Como executar:

Primeiro, é necessário clonar o repositório:

git clone <urlaqui>

Depois, entrar na pasta deploy:

cd projeto-docker-pacientes/deploy

executar:

docker compose up -d --build


Esse comando irá criar as imagens e iniciar os três containers.

Para verificar se os serviços estão funcionando, pode ser utilizado:

docker compose ps


Depois que os serviços estiverem iniciados, a aplicação poderá ser acessada pelos seguintes endereços.
Front-end: http://localhost:8080
API: http://localhost:3000
Swagger: http://localhost:3000/docs
Banco Postgres: localhost:5433

Banco de dados:

O banco de dados utilizado no projeto é o Postgres 16.

As principais configurações estão no arquivo deploy/.env:
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=appdb


A porta 5433 é utilizada para acessar o Postgres pelo computador.

Os dados do banco são armazenados em um volume chamado pgdata. Assim os dados continuam salvos mesmo quando os containers são removidos.

Para acessar o banco diretamente pelo container, pode usar:
docker compose exec db psql -U postgres -d appdb


Tabela patients:

A aplicação utiliza a tabela patients.

Os principais campos:

id - identificador

full_name - nome completo

document - documento

blood_type - tipo sanguineo

allergies - alergias dele

Endpoints da API

A API possui os seguintes endpoints:

Método/Rota/Descrição

GET	    /patients	    Lista todos os pacientes
GET	    /patients/:id	Busca um paciente pelo ID
POST	/patients	    Cadastra um novo paciente
PATCH	/patients/:id	Atualiza um paciente
DELETE	/patients/:id	Remove um paciente
Exemplos
Criar um paciente

Para cadastrar um paciente, deve ser realizada uma requisição POST para:

/patients


Com o seguinte JSON:

{
  "full_name": "Lucas Cardoso o brabo",
  "document": "12345678900",
  "blood_type": "O+",
  "allergies": "amendoim"
}


A resposta será semelhante a:

{
  "id": 1,
  "full_name": "Lucas Cardoso",
  "document": "12345678900",
  "blood_type": "O+",
  "allergies": "amendoim"
}

Listar pacientes

Para listar todos os pacientes:

GET /patients


Exemplo de resposta:

[
  {
    "id": 1,
    "full_name": "Vinicius de Faveri",
    "document": "12345678900",
    "blood_type": "O+",
    "allergies": "Batata doce"
  },
  {
    "id": 2,
    "full_name": "Jorge blau",
    "document": "44444432122",
    "blood_type": "A+",
    "allergies": "Nenhuma"
  }
]

Buscar um paciente

Para buscar um paciente específico, basta informar o id dele:

GET /patients/1


Caso o paciente não exista, retorna erro 404.

Por exemplo:

GET /patients/999


Resposta:

{
  "message": "Paciente 999 não encontrado",
  "error": "Not Found",
  "statusCode": 404
}

Atualizar um paciente

Para atualizar um paciente:

PATCH /patients/1


É possível enviar somente o campo que deseja alterar. Por exemplo:

{
  "allergies": "Dipirona"
}


Isso é possível porque o dto de atualização utiliza PartialType, permitindo atualizar apenas os campos especificos.

Remover um paciente

Para remover um paciente:

DELETE /patients/2


A API retorna uma mensagem informando que o paciente foi removido:

{
  "mensagem": "Paciente 2 removido"
}

Validação

A API utiliza class-validator para validar os dados.

Por exemplo, uma requisição com dados em branco:

{
  "full_name": "",
  "document": "",
  "blood_type": ""
}


deve retornar:

400 Bad Request

Swagger

O projeto possui Swagger para facilitar os testes e a visualização dos endpoints.

Depois que a aplicação estiver rodando, a documentação pode ser acessada em:

http://localhost:3000/docs


Pelo Swagger é possível visualizar os endpoints e também realizar requisições diretamente no navegador.

Redes Docker

O projeto utiliza duas redes Docker para separar a comunicação entre os serviços.

rede_db

Essa rede é utilizada para a comunicação entre:

db <-> api

rede_front

Essa rede é utilizada para a comunicação entre:

front <-> api


O container do front-end não possui acesso direto ao banco de dados.

A API é o único serviço que participa das duas redes.

Persistência dos dados

Os dados do PostgreSQL são armazenados no volume pgdata.

Para parar os containers sem apagar os dados, pode ser utilizado:

docker compose down


Depois, para iniciar novamente:

docker compose up -d


Os pacientes cadastrados continuarão salvos no banco.

Como derrubar os recursos

Para parar e remover os containers e as redes criadas pelo Docker Compose:

docker compose down


Caso também queira remover o volume do banco de dados, pode ser utilizado:

docker compose down -v


Nesse caso, os dados armazenados no PostgreSQL também serão apagados.

Logs

Para visualizar os logs da API:

docker compose logs -f api


Para visualizar os logs do banco:

docker compose logs -f db


Também é possível verificar o estado dos containers com:

docker compose ps

Rebuild

Caso alguma alteração seja feita no código e seja necessário criar as imagens novamente, pode ser utilizado:

docker compose up -d --build


Esse comando irá realizar o build novamente e iniciar os serviços com as alterações realizadas.