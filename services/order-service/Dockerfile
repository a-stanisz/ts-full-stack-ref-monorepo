FROM node:18.10-alpine AS builder
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN yarn global add turbo
ENV PATH /app/node_modules/.bin:$PATH
COPY . .
RUN turbo prune --scope=order-service --docker

FROM node:18.10-alpine AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN yarn turbo run build --filter=order-service...

FROM node:18.10-alpine AS runner
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

CMD node services/order-service/.dist/index.js
