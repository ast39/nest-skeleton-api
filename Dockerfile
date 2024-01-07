FROM node:18.16-alpine

WORKDIR /app

COPY package*.json ./
COPY ./prisma ./prisma

RUN npm install

RUN npm i @nestjs/config

RUN npm install prisma --save-dev
RUN npm install @prisma/client
RUN npx prisma generate

RUN npm i @nestjs/swagger
RUN npm i @nestjs/jwt bcryptjs
RUN npm i @types/bcryptjs

COPY . .

COPY ./dist ./dist

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]
