# syntax=docker/dockerfile:1.7

ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-alpine AS base

WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV TURBO_TELEMETRY_DISABLED=1

RUN corepack enable

FROM base AS pruner

COPY . .

RUN pnpm dlx turbo prune webhux-api --docker

FROM base AS installer

COPY tsconfig.base.json ./tsconfig.base.json
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile

FROM base AS builder

COPY --from=installer /app/ .
COPY --from=pruner /app/out/full/ .

RUN pnpm exec turbo run build --filter=webhux-api

FROM node:${NODE_VERSION}-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

ARG FRONTEND_URL
ARG BACKEND_URL          
ENV FRONTEND_URL=$FRONTEND_URL
ENV BACKEND_URL=$BACKEND_URL   

RUN addgroup -S nodejs && adduser -S webhux-api -G nodejs

# Root dependencies and workspace package node_modules
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=builder /app/packages ./packages

# App build
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/package.json ./apps/api/package.json

USER webhux-api

EXPOSE 8080

CMD ["node", "apps/api/dist/server.js"]