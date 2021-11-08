FROM node:14.18 as build

WORKDIR /usr/app

COPY . .

RUN yarn
RUN yarn add -D express@^4.17.1 path
RUN yarn build

EXPOSE 8080/tcp

CMD ["node", "app.js"]
