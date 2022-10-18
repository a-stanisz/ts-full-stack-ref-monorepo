FROM node:18.10-bullseye-slim AS builder
RUN apt update
WORKDIR /app
RUN yarn global add turbo
ENV PATH /app/node_modules/.bin:$PATH
COPY . .
RUN turbo prune --scope=order-service --docker

FROM node:18.10-bullseye-slim AS installer
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN yarn turbo run build --filter=order-service...

FROM node:18.10-bullseye-slim AS runner
WORKDIR /app

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT 9229 9230

RUN addgroup --system --gid 1001 node_app
RUN adduser --system --uid 1001 node_app
USER node_app
COPY --from=installer /app .
RUN yarn install
RUN yarn build

CMD node services/order-service/.dist/index.js
