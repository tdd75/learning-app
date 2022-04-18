FROM node:lts-alpine

WORKDIR /app

COPY ./package.json .

RUN yarn

COPY ./src .

EXPOSE 8091

CMD ["yarn", "start"]