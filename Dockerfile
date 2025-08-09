FROM node:22.16.0-alpine AS base
RUN apk add --no-cache libc6-compat
RUN apk update
RUN corepack enable
RUN npm install -g turbo

FROM base AS prune

WORKDIR /app
COPY . .
RUN turbo prune api
RUN turbo prune web

FROM base AS builder

WORKDIR /app
COPY --from=prune /app/out .
RUN pnpm install
RUN pnpm run build

FROM base AS runner

WORKDIR /app
EXPOSE 5000
EXPOSE 3000
COPY --from=builder /app .
# RUN turbo db:migrate
CMD ["pnpm", "run", "start"]