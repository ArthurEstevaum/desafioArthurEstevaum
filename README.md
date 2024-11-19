Requisitos para rodar o projeto: 
  - Node js 22
  - Docker (docker engine desktop) para mante um banco de dados em execução
  - .env file contendo informações conforme .env.example deste repositório
Etapas para executar o projeto:
  - executar no terminal comando 'docker compose up -d' (no mesmo diretório do arquivo docker-compose.yml)
  -  executar no terminal comando 'npm i' (no diretório raiz do projeto, que contém o arquivo package.json)
  -  executar no terminal comando 'npx prisma migrate dev'
  -  executar no terminal comando 'npm run dev'
Após seguir esses passos, o servidor estará disponível em http://localhost:3000
As rotas estão no arquivo server.ts