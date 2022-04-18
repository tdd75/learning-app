FROM node:lts-alpine

WORKDIR /app

COPY ./package.json .

RUN yarn

RUN mkdir src

COPY ./src ./src

EXPOSE 8091

CMD ["yarn", "start"]