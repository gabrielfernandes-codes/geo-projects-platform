ARG NODE_VERSION=22.11.0-alpine3.20
ARG POSTGRES_VERSION=17.0

# -------------- postgres-baseline ------------- #

FROM postgres:${POSTGRES_VERSION} AS postgres-baseline

WORKDIR /

RUN set -x \
  && apt-get update \
  && apt-get upgrade -y \
  && apt-get install -y \
  curl \
  postgis

# ---------------- node-baseline --------------- #

FROM node:${NODE_VERSION} AS node-baseline

ARG NODE_ENV=production

ENV CHOKIDAR_USEPOLLING=true
ENV NODE_ENV=$NODE_ENV

WORKDIR /

RUN set -x \
  && mkdir -p /geo-projects-platform

RUN set -x \
  && apk update \
  && apk upgrade \
  && apk add --no-cache \
  curl \
  zip \
  wget \
  git \
  unzip

RUN set -x \
  && corepack enable \
  && pnpm config set global-bin-dir /usr/local/bin \
  && pnpm config set store-dir /opt/pnpm/stored

# ------------------ step-deps ------------------ #

FROM node-baseline AS step-deps

WORKDIR /geo-projects-platform

COPY package*.json .
COPY pnpm-*.yaml .

RUN set -x \
  && corepack install \
  && pnpm install --frozen-lockfile

# ----------------- step-app ------------------- #

FROM node-baseline AS step-app

WORKDIR /geo-projects-platform

COPY . .
COPY --from=step-deps /geo-projects-platform/node_modules .

# -------------------- cli --------------------- #

FROM node-baseline AS cli

ENV PATH="/root/.fly/bin:$PATH"

WORKDIR /

RUN set -x \
  && curl -L https://fly.io/install.sh | ash

WORKDIR /geo-projects-platform

COPY --from=step-app /geo-projects-platform .

CMD ["ash"]

# ------------- database-postgres -------------- #

FROM postgres-baseline AS database-postgres

WORKDIR /

# -------------- app-service-api --------------- #

FROM node-baseline AS app-service-api

WORKDIR /geo-projects-platform

COPY --from=step-app /geo-projects-platform .

RUN set -x \
  && pnpm build \
  && pnpm prune --prod

CMD ["pnpm", "--filter", "@platform/api",  "start"]
