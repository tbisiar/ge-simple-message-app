# Simple Messanger App

This is an quick and dirty simple chat message application built using a few new technologies I wanted to try out

## What's inside?

This turborepo uses [npm](https://www.npmjs.com/) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `docs/decisions`: a repo to track architectural decision records
- `web`: the primary [Next.js](https://nextjs.org/) chat app
- `ui`: a stub React component library to enable sharing by both `web` and other applications
- `sma-types`: common types used by the `web` & `ui` packages
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo
- `appsync-chat-app-cdk` an aws example repo that spins up cloudformation stacks for API, Auth, Database, & FileStorage (forked directly from https://github.com/aws-samples/appsync-chat-app-cdk with no modifications made)

### Build

To build all apps and packages, run the following command:

```
cd simple-messenger-app
npm run build
```

### Develop

To develop all apps and packages, run the following command:

```
cd simple-messenger-app
npm run dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Pipelines](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
