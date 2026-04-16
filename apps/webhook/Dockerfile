FROM node:20-alpine AS base
WORKDIR /app

COPY package*.json ./
RUN npm ci

FROM base AS build
COPY . .
RUN npm run build

FROM node:20-alpine AS prod
WORKDIR /app

ENV NODE_ENV=production

ARG PORT=5000

ENV PORT=$PORT

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

EXPOSE 5000

CMD ["node", "dist/server.js"]