FROM node:lts-alpine3.16

WORKDIR /app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY ./.env ./

COPY . .

RUN yarn build

EXPOSE 8080

CMD ["yarn", "start"]