FROM node:19-slim
WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm i -g ts-node nodemon typescript knex
EXPOSE 3000
