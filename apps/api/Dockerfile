FROM node:20-alpine AS base

WORKDIR /app

COPY package*.json ./
RUN npm install

# Dev image: fast startup + file-watching (no build step)
FROM base AS dev
ENV NODE_ENV=development
EXPOSE 8080
CMD ["npm", "run", "dev"]

# Build image: compile TypeScript to dist/
FROM base AS build
RUN npm run build

# Prod image: run compiled output
FROM node:20-alpine AS prod
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
EXPOSE 8080
CMD ["node", "dist/server.js"]