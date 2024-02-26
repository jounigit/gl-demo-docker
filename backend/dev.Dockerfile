FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm install

ENV DEBUG=galleria-backend:*

CMD [ "npm", "run",  "dev"]