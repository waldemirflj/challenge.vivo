## O básico
Baixe o [Postman do projeto](https://www.getpostman.com/collections/9e47afe730ebd6a88dfc).  
Com o Postman do projeto já configurado siga com os demais passos.  

## Instalações necessárias
* Docker
* Node
* NPM 

## Setup com Docker

```bash
# Na raiz do projeto execute o comando abaixo
$ docker-compose -f docker-compose.dev.yml up -d

# Necessário configurar o proxy para registry.npmjs.org
# Para finalizar o processo execute o comando abaixo
$ docker-compose -f docker-compose.dev.yml down -v

```

## Setup sem Docker

```bash
# Na raiz do projeto execute o comando abaixo
$ docker-compose -f docker-compose.dev.yml up -d mongo

# Na raiz do projeto execute o comando abaixo
$ npm i
$ npm run dev

# Na raiz do projeto execute o comando abaixo
# Necessário ter um container com MongoDB rodando
$ npm test
$ npm run coverage
```

### Dependências do projeto
Nodejs, NPM, Docker e MongoDB
