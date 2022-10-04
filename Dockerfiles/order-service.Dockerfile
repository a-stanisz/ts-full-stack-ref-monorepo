FROM node:18.10-alpine

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT 9229 9230

RUN npm i npm@latest -g

RUN mkdir /opt/libraries && chown node:node /opt/libraries
RUN mkdir /opt/node_app && chown node:node /opt/node_app

USER node
COPY --chown=node:node ./libraries /opt/libraries
RUN for dir in /opt/libraries/*; do (cd "$dir" && npm install && npm cache clean --force); done

WORKDIR /opt/node_app
USER node
COPY --chown=node:node ./services/order-service/package.json ./services/order-service/package-lock.json ./
RUN npm install && npm cache clean --force
ENV PATH /opt/node_app/node_modules/.bin:$PATH

WORKDIR /opt/node_app/app
COPY --chown=node:node . .

CMD [ "node", "./.dist/bin/www" ]
