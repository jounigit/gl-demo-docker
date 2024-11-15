FROM node:20

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm install

ENV DEBUG=galleria-back-dev:*

CMD ["npm", "run", "dev", "--", "--host"]
