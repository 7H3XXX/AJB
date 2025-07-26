FROM node:22.16.0 AS base
ENV PNPM_HOME="/usr/local/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN mkdir -p $PNPM_HOME
RUN npm install -g pnpm
RUN pnpm add turbo --global

FROM base AS prune
WORKDIR /app
COPY . .
RUN turbo prune api
RUN turbo prune web

FROM base AS builder
WORKDIR /app
COPY --from=prune /app/out .
RUN pnpm install
RUN turbo build

FROM base AS runner
WORKDIR /app
EXPOSE 5000
EXPOSE 3000
COPY --from=builder /app .
RUN turbo db:migrate
CMD ["turbo", "start"]