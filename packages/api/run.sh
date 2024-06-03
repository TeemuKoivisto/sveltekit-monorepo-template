#!/bin/sh

# Here retrieve secrets from secret managers to env etc if you have any

pnpm --filter @awesome-org/db prod:migrate
node ./packages/api/dist/index.js
