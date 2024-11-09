ARG NODE_VERSION=22.11.0
ARG POSTGRES_VERSION=17.0

# -------------- postgres-baseline ------------- #

FROM postgres:${POSTGRES_VERSION} AS postgres-baseline

RUN set -x \
  && apt-get update \
  && apt-get upgrade -y \
  && apt-get install \
  curl \
  postgis \
  -y

# ---------------- node-baseline --------------- #

FROM node:${NODE_VERSION} AS node-baseline

ARG NODE_ENV=production

ENV CHOKIDAR_USEPOLLING true

ENV NODE_ENV $NODE_ENV

RUN set -x \
  && mkdir -p /geo-projects-platform

RUN set -x \
  && apt-get update \
  && apt-get upgrade -y \
  && apt-get install \
  curl \
  zip \
  wget \
  git \
  unzip \
  -y

RUN set -x \
  && corepack enable \
  \
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

RUN ls -la


# ----------------- step-app ------------------- #

FROM node-baseline AS step-app

WORKDIR /geo-projects-platform

COPY . .

COPY --from=step-deps /geo-projects-platform/node_modules .


# ----------------- postgres ------------------- #

FROM postgres-baseline AS postgres


# -------------------- cli --------------------- #

FROM node-baseline AS cli

WORKDIR /geo-projects-platform

COPY --from=step-app /geo-projects-platform .

CMD ["bash"]
