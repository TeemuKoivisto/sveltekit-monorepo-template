#####################
# The Node.js image #
#####################
# Not using builder image since it's quite tedious to copy / install everything all over
FROM node:20.5.1-alpine

ENV NODE_ENV build
ENV INSTALL_PATH /usr/local/awesome_api

WORKDIR ${INSTALL_PATH}

RUN npm install -g pnpm@9
RUN apk upgrade --update-cache --available && \
  apk add --no-cache curl openssl && \
  rm -rf /var/cache/apk/*

COPY package.json tsconfig.json pnpm-lock.yaml pnpm-workspace.yaml ./
# Copy package.jsons first to cache pnpm install to run only if they were changed, not on source file changes
COPY packages/api/package.json ./packages/api/package.json
COPY packages/db/package.json ./packages/db/package.json
COPY packages/types/package.json ./packages/types/package.json
COPY packages/utils/package.json ./packages/utils/package.json

RUN pnpm i --frozen-lockfile --filter @awesome-org/api \
  --filter @awesome-org/db \
  --filter @awesome-org/types \
  --filter @awesome-org/utils

COPY packages/db ./packages/db
RUN pnpm --filter @awesome-org/db generate
COPY packages/db/prisma/schema.prisma ./packages/api/.prisma/schema.prisma

COPY packages/types ./packages/types
RUN pnpm --filter @awesome-org/types build

COPY packages/utils ./packages/utils
RUN pnpm --filter @awesome-org/utils build

COPY packages/api ./packages/api
RUN pnpm --filter @awesome-org/api build

ENV NODE_ENV production
ENV CORS_ENABLED 0

EXPOSE ${PORT}

CMD ./packages/api/run.sh