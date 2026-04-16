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

ARG PORT=8080
ARG BETTER_AUTH_URL
ARG FRONTEND_URL

ENV PORT=$PORT
ENV BETTER_AUTH_URL=$BETTER_AUTH_URL
ENV FRONTEND_URL=$FRONTEND_URL

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

EXPOSE 8080

CMD ["node", "dist/server.js"]