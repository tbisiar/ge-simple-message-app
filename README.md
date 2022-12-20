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

To develop all apps and packages, you'll need to have the CDK stacks deployed and update the .env configuration with the appropriate values.
CDK and Turbo-repo are not setup to work together (yet!), so to spin up CDK stack you will need to have your AWS CLI configured (https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html) and use the following steps:

```
cd simple-messenger-app/packages/appsync-chat-app-cdk
npm run build
npm run cdk -- bootstrap aws://<YOUR_ACCT_NUM_HERE>/us-west-2
npm run cdk deploy
```

These steps navigate to the directory, transpile the ts -> js, bootstrap your account with the "stuff" required to run CDK, and deploy the CDK stacks to CloudFormation.  More information can be found in the readme within the appsync-chat-app-cdk directory.

Once the backend services are all ready, you'll have to populate the .env file with the appropriate values for the services, then you can run the following command to spin up a local next.js frontend:

```
cd simple-messenger-app
npm run dev
```

## Useful Links

Learn more about the power of Turborepo:

- [Pipelines](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
