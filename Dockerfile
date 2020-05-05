# imagem
FROM node:12.14.0-alpine

# define qual diretório será usado para nossa aplicação dentro do container
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

# copia o arquivo package.json para dentro do container
COPY package.json ./

# instala todas as dependências declaradas no package.json
RUN npm install --verbose

# copia todos os arquivos da raiz da nossa aplicação para a pasta deinida no WORKDIR
COPY --chown=node:node . .

USER node

# expõe a porta 3000 do container
EXPOSE 3000

# roda o comando 'npm start'
# CMD ["npm","start"]
