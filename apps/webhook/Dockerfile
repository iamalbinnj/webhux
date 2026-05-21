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

RUN pnpm dlx turbo prune webhux-webhook --docker

FROM base AS installer

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile

FROM base AS builder

COPY --from=installer /app/ .
COPY --from=pruner /app/out/full/ .

RUN pnpm exec turbo run build --filter=webhux-webhook

FROM node:${NODE_VERSION}-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -S nodejs && adduser -S webhux-webhook -G nodejs

# Root dependencies
COPY --from=installer /app/node_modules ./node_modules

# App files
COPY --from=builder /app/apps/webhook/dist ./apps/webhook/dist
COPY --from=builder /app/apps/webhook/package.json ./apps/webhook/package.json

USER webhux-webhook

EXPOSE 5000

CMD ["node", "apps/webhook/dist/server.js"]