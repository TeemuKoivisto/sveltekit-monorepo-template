#####################
# The Node.js image #
#####################
# Not using builder image since it's quite tedious to copy / install everything all over
# Not using Alpine since installing Prisma is broken on it using MBP M1 as of v4.2.1 https://github.com/prisma/prisma/issues/8478
FROM node:16.10.0-slim

ENV NODE_ENV build
ENV INSTALL_PATH /usr/local/example_api

WORKDIR ${INSTALL_PATH}

RUN npm install -g pnpm@7
RUN apt-get update && apt-get -y install openssl

COPY package.json tsconfig.json pnpm-lock.yaml pnpm-workspace.yaml ./
# Copy package.jsons first to cache pnpm install to run only if they were changed, not on source file changes
COPY packages/api/package.json ./packages/api/package.json
COPY packages/db/package.json ./packages/db/package.json
COPY packages/types/package.json ./packages/types/package.json

RUN pnpm i --frozen-lockfile --filter @awesome-org/api \
  --filter @awesome-org/db \
  --filter @awesome-org/types

COPY packages/db ./packages/db
RUN pnpm --filter @awesome-org/db generate
COPY packages/db/prisma/schema.prisma ./packages/api/node_modules/schema.prisma

COPY packages/types ./packages/types
RUN pnpm --filter @awesome-org/types build

COPY packages/api ./packages/api
# RUN pnpm test --filter @awesome-org/api test
RUN pnpm --filter @awesome-org/api build

# RUN pnpm prune

ENV NODE_ENV production
ENV CORS_ENABLED 0

EXPOSE ${PORT}

CMD pnpm --filter @awesome-org/db prod:migrate && node ./packages/api/dist/index.js