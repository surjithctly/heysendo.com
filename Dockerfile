FROM node:20.19-alpine3.20 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV SKIP_ENV_VALIDATION="true"
ENV DOCKER_OUTPUT=1
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_IS_CLOUD="false"
RUN corepack enable

# ============================================
# DEPENDENCIES STAGE
# ============================================
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY ./apps ./apps
COPY ./packages ./packages

RUN pnpm add turbo@^2.5.2 -g
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# ============================================
# WEB APP (Main App)
# ============================================
FROM base AS web-builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY --from=deps /app .

ARG APP_VERSION=unknown
ARG GIT_SHA=unknown
ENV NEXT_PUBLIC_APP_VERSION=$APP_VERSION
ENV NEXT_PUBLIC_GIT_SHA=$GIT_SHA

RUN pnpm turbo run build --filter=web

FROM base AS web-runner
WORKDIR /app

# Install openssl for Prisma
RUN apk add --no-cache openssl

COPY --from=web-builder /app/apps/web/next.config.js .
COPY --from=web-builder /app/apps/web/package.json .
COPY --from=web-builder /app/pnpm-lock.yaml .
COPY --from=web-builder /app/apps/web/.next/standalone ./
COPY --from=web-builder /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=web-builder /app/apps/web/public ./apps/web/public

# Prisma files
COPY --from=web-builder /app/apps/web/prisma/schema.prisma ./apps/web/prisma/schema.prisma
COPY --from=web-builder /app/apps/web/prisma/migrations ./apps/web/prisma/migrations
COPY --from=web-builder /app/apps/web/node_modules/prisma ./node_modules/prisma
COPY --from=web-builder /app/apps/web/node_modules/@prisma ./node_modules/@prisma
COPY --from=web-builder /app/apps/web/node_modules/.prisma ./node_modules/.prisma

RUN mkdir -p node_modules/.bin
RUN ln -s /app/node_modules/prisma/build/index.js ./node_modules/.bin/prisma

ENV SKIP_ENV_VALIDATION="false"
ENV PORT=3000

COPY ./docker/start.sh ./start.sh
RUN chmod +x ./start.sh

EXPOSE 3000

CMD ["sh", "start.sh"]

# ============================================
# MARKETING SITE
# ============================================
FROM base AS marketing-builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY --from=deps /app .

RUN pnpm turbo run build --filter=marketing

FROM base AS marketing-runner
WORKDIR /app

COPY --from=marketing-builder /app/apps/marketing/next.config.js .
COPY --from=marketing-builder /app/apps/marketing/package.json .
COPY --from=marketing-builder /app/apps/marketing/.next/standalone ./
COPY --from=marketing-builder /app/apps/marketing/.next/static ./apps/marketing/.next/static
COPY --from=marketing-builder /app/apps/marketing/public ./apps/marketing/public

ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "apps/marketing/server.js"]

# ============================================
# SMTP SERVER
# ============================================
FROM base AS smtp-builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY --from=deps /app .

RUN pnpm turbo run build --filter=smtp-server

FROM base AS smtp-runner
WORKDIR /app

COPY --from=smtp-builder /app/apps/smtp-server/dist ./apps/smtp-server/dist
COPY --from=smtp-builder /app/apps/smtp-server/package.json ./apps/smtp-server/
COPY --from=smtp-builder /app/node_modules ./node_modules

WORKDIR /app/apps/smtp-server

ENV NODE_ENV=production

EXPOSE 2525
EXPOSE 3000

CMD ["node", "dist/index.js"]
