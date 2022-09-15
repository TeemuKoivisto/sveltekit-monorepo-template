# [sveltekit-monorepo-template](https://github.com/teemukoivisto/sveltekit-monorepo-template)

Monorepo boilerplate that I use, transformed into its own template repository.

## How to install

You must have `pnpm` >=7 installed globally: `npm i -g pnpm`. Also you need Docker. And if you want to access the Postgres instance `psql`.

1. Install all dependencies: `pnpm i`
2. Start the databases: `docker-compose up -d postgres`
3. Copy the environment variables: `cp ./packages/api/.env-example ./packages/api/.env && cp ./packages/client/.env-example ./packages/client/.env && cp ./packages/db/.env-example ./packages/db/.env`
4. Migrate the database: `pnpm --filter db migrate`
5. And seed it with test data: `pnpm --filter db seed`
6. Start the app in http://127.0.0.1:5175: `pnpm start`

## Commands

`pnpm` is a package manager that uses linking to reduce installation times.

It's pretty cool _but_ sometimes the linking might get funky, eg you remove a package from `packages/` and the links might not work anymore even after doing `pnpm i`. In that case trusty ol `rm -rf ./**/node_modules && pnpm i` helps.

- Install packages with: `pnpm --filter api add jsonwebtoken`.
- To install as devDependency use -D: `pnpm --filter client add -D rollup-svelte-plugin`
- Run commands with: `pnpm --filter client lint`
- To run command recursively in all packages: `pnpm -r lint`. NOTE: this will halt on first error so you might want to run it as script instead with `concurrently`.
- [You can use various filter options](https://pnpm.io/filtering): `pnpm --filter=!api lint`
- [Update dependencies to latest given their version range](https://pnpm.io/cli/update): `pnpm update`

## Changesets

This project uses changesets https://github.com/changesets/changesets to generate changelogs but in short, when you commit from terminal the changeset prompt is opened in which you should write your functionality using conventional commits https://www.conventionalcommits.org/en/v1.0.0/ to create a changeset (which is for something that changes the library for the downstream users).
