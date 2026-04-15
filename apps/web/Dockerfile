# syntax=docker/dockerfile:1

# ==================== Base Stage ====================
FROM node:20-alpine AS base

# Install libc6-compat for some native dependencies (sharp, etc.)
RUN apk add --no-cache libc6-compat

WORKDIR /app

# ==================== Dependencies Stage ====================
FROM base AS deps

# Copy only package files first for better caching
COPY package.json package-lock.json* ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# ==================== Builder Stage ====================
FROM base AS builder

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the Next.js app (produces .next/ and .next/standalone when output: 'standalone')
RUN npm run build

# ==================== Production Runner Stage ====================
FROM node:20-alpine AS runner

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
EXPOSE 3000

# Copy only the minimal standalone output from builder
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Change ownership to non-root user
USER nextjs

# Start the standalone server
CMD ["node", "server.js"]