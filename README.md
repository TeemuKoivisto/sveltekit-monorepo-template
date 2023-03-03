# [sveltekit-monorepo-template](https://github.com/teemukoivisto/sveltekit-monorepo-template)

Monorepo boilerplate that I use, transformed into its own template repository.

### [Netlify](https://marvelous-madeleine-842e30.netlify.app)

### [GitHub pages](https://teemukoivisto.github.io/sveltekit-monorepo-template/)

Not working as of 22.12.2022 due to how base paths are configured with SvelteKit

## How to setup

1. Copy the template using `Use this template`
2. Add [GH_ACTIONS_DEPLOY_KEY](https://docs.github.com/en/developers/overview/managing-deploy-keys#deploy-keys). Basically, run `ssh-keygen -t ed25519 -C "your_email@example.com"` and copy the public key to `Settings > Deploy keys > Add deploy key` (I named it `GH_ACTIONS_DEPLOY_KEY - public SSH key`). Then copy the private key to `Settings > Secrets > Actions` with name `GH_ACTIONS_DEPLOY_KEY`. This is required for the Github pages deployment and you can use it to SSH to other instances as well
3. For default GITHUB_TOKEN permissions at `Settings > Actions > General` tick `Allow all actions and reusable workflows` `Read and write permissions` and check `Allow GitHub actions to create and approve pull requests`. This is required for the Changesets to create PRs and push tags (eg `@awesome-org/types@0.1.2`) from CI
4. Add also to secrets API_URL (the IP or URL of your deployed instance), [DOCKER_PAT](https://docs.docker.com/docker-hub/access-tokens/) & DOCKER_USER for pushing [API image to docker.io registry](https://hub.docker.com/r/tekkk/example-api) and optionally NPM_TOKEN if you want to publish packages to npm
5. Clone the repo
6. Run copy & replace for `@awesome-org` and `@teemukoivisto` using your own organization / username
7. Follow **How to run** instructions to run the app, then commit your changes preferably using https://www.conventionalcommits.org/en/v1.0.0/ This makes your CHANGELOGs much nicer

## NPM packages

You can publish your component & other packages to npm. However, to use private npm packages you must either upgrade your npm account or use [Github package registry](https://docs.github.com/en/packages/learn-github-packages/introduction-to-github-packages). There's a one example package at `packages/private-pkg`. Basically, how it goes is you _must_ use your org/user name as the package's org. Then you must add a Github access token (I use the env GH_PAT) to the repository secrets which allows writing to package registry. Also anyone who wants to use that package will need an access token as well. Otherwise the flow is very much the same, use changesets to generate CHANGELOGs and code away!

## How to run

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
