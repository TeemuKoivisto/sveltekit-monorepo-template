# [sveltekit-monorepo-template](https://github.com/teemukoivisto/sveltekit-monorepo-template)

## How to install

You must have `pnpm` >=7 installed globally: `npm i -g pnpm`. Also you need Docker. And Postgres to access the Heroku Postgres instance with `psql`.

1. Install all dependencies: `pnpm i`
2. Start the databases: `docker-compose up -d postgres`
3. Copy the environment variables: `cp ./packages/api/.env-example ./packages/api/.env && cp ./packages/client/.env-example ./packages/client/.env && cp ./packages/db/.env-example ./packages/db/.env`
4. Migrate the database: `pnpm --filter db migrate`
5. And seed it with test data: `pnpm --filter db seed`
6. Start the app in http://127.0.0.1:5175: `pnpm start`

## Commands

`pnpm` is pretty neat.
