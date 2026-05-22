# syntax=docker/dockerfile:1.7

ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-alpine AS base

RUN apk add --no-cache libc6-compat

WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV TURBO_TELEMETRY_DISABLED=1

RUN corepack enable

FROM base AS pruner

COPY . .

RUN pnpm dlx turbo prune webhux-web --docker

FROM base AS installer

COPY tsconfig.base.json ./tsconfig.base.json
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile

FROM base AS builder

COPY --from=installer /app/ .
COPY --from=pruner /app/out/full/ .

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

ARG NEXT_PUBLIC_WEBHOOK_BASE_URL
ENV NEXT_PUBLIC_WEBHOOK_BASE_URL=$NEXT_PUBLIC_WEBHOOK_BASE_URL

RUN pnpm exec turbo run build --filter=webhux-web

FROM node:${NODE_VERSION}-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

RUN addgroup -S nodejs && adduser -S webhux-web -G nodejs

# server.js lands at /app/server.js
COPY --from=builder /app/apps/web/.next/standalone ./

# server.js expects static files at /app/.next/static
COPY --from=builder /app/apps/web/.next/static ./.next/static

# server.js expects public files at /app/public
COPY --from=builder /app/apps/web/public ./public

USER webhux-web

EXPOSE 3000

CMD ["node", "server.js"]