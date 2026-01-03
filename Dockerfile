FROM node:20.19-alpine3.20 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV SKIP_ENV_VALIDATION="true"
ENV DOCKER_OUTPUT=1
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_IS_CLOUD="false"
RUN corepack enable

# ============================================
# WEB APP
# ============================================
FROM base AS web-builder
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY ./apps/web ./apps/web
COPY ./packages ./packages
RUN pnpm add turbo@^2.5.2 -g
ENV REDIS_URL="redis://localhost:6379"
RUN pnpm turbo prune web --docker

FROM base AS web-installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
COPY .gitignore .gitignore
COPY --from=web-builder /app/out/json/ .
COPY --from=web-builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
ARG APP_VERSION=unknown
ARG GIT_SHA=unknown
ENV NEXT_PUBLIC_APP_VERSION=$APP_VERSION
ENV NEXT_PUBLIC_GIT_SHA=$GIT_SHA
COPY --from=web-builder /app/out/full/ .
ENV REDIS_URL="redis://localhost:6379"
RUN pnpm turbo run build --filter=web...

FROM base AS web-runner
WORKDIR /app
COPY --from=web-installer /app/apps/web/next.config.js .
COPY --from=web-installer /app/apps/web/package.json .
COPY --from=web-installer /app/pnpm-lock.yaml .
COPY --from=web-installer /app/apps/web/.next/standalone ./
COPY --from=web-installer /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=web-installer /app/apps/web/public ./apps/web/public
COPY --from=web-installer /app/apps/web/prisma/schema.prisma ./apps/web/prisma/schema.prisma
COPY --from=web-installer /app/apps/web/prisma/migrations ./apps/web/prisma/migrations
COPY --from=web-installer /app/apps/web/node_modules/prisma ./node_modules/prisma
COPY --from=web-installer /app/apps/web/node_modules/@prisma ./node_modules/@prisma
RUN mkdir node_modules/.bin
RUN ln -s /app/node_modules/prisma/build/index.js ./node_modules/.bin/prisma
ENV SKIP_ENV_VALIDATION="false"
ENV PORT=3000
COPY ./docker/start.sh ./start.sh
EXPOSE 3000
CMD ["sh", "start.sh"]

# ============================================
# MARKETING SITE
# ============================================
FROM base AS marketing-builder
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY ./apps/marketing ./apps/marketing
COPY ./packages ./packages
RUN pnpm add turbo@^2.5.2 -g
RUN pnpm turbo prune marketing --docker

FROM base AS marketing-installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
COPY .gitignore .gitignore
COPY --from=marketing-builder /app/out/json/ .
COPY --from=marketing-builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY --from=marketing-builder /app/out/full/ .
RUN pnpm turbo run build --filter=marketing...

FROM nginx:alpine AS marketing-runner
COPY --from=marketing-installer /app/apps/marketing/out /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# ============================================
# SMTP SERVER
# ============================================
FROM base AS smtp-builder
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY ./apps/smtp-server ./apps/smtp-server
COPY ./packages ./packages
RUN pnpm add turbo@^2.5.2 -g
RUN pnpm turbo prune smtp-server --docker

FROM base AS smtp-installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
COPY .gitignore .gitignore
COPY --from=smtp-builder /app/out/json/ .
COPY --from=smtp-builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY --from=smtp-builder /app/out/full/ .
RUN pnpm turbo run build --filter=smtp-server...

FROM base AS smtp-runner
WORKDIR /app/apps/smtp-server
COPY --from=smtp-installer /app/apps/smtp-server/dist ./dist
COPY --from=smtp-installer /app/apps/smtp-server/package.json ./
COPY --from=smtp-installer /app/node_modules /app/node_modules
ENV NODE_ENV=production
EXPOSE 2525 3000
CMD ["node", "dist/index.js"]
