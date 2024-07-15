# Testing op-sqlite with Turso on an Expo/React Native project

## Description

This projects is a test ground for connecting a [Turso](https://turso.tech) database to an [Expo/React Native](https://docs.expo.dev) project using [op-sqlite](https://github.com/OP-Engineering/op-sqlite) (set up to use [libsql](https://ospfranco.notion.site/Libsql-Support-c56ac2afb939460182ee7bd910b08fbf) as the database source) leveraging Turso's [embedded replicas](https://docs.turso.tech/features/embedded-replicas/introduction).

Turso's embedded replicas allow database reads to always happen from a locally installed SQLite database providing very fast reads while writes always happen to the remote database and are then automatically synced to a local replica.

The main `index.tsx` file allows for displaying, adding and deleting data from the database.

## System dependencies

This project assumes you have an Expo/React Native development environment already. If you don't, you can follow the relevant steps below:

- Install [Node.js](https://nodejs.org/en/) LTS version
- Install [Expo command line tools](https://docs.expo.dev/more/expo-cli/)
- For Android builds follow [this guide](https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&device=simulated&mode=development-build&buildEnv=local) to install and configure OpenJDK, Android Studio, and an Android Emulator
- For iOS buids (Mac users only), follow [this guide](https://docs.expo.dev/get-started/set-up-your-environment/?platform=ios&device=simulated&mode=development-build&buildEnv=local) to install and configure Xcode, an iOS simulator and [watchman](https://facebook.github.io/watchman/docs/install#macos)
  - You will likely need [Homebrew](https://brew.sh) to manage packages in your Mac.

## Steps to make this project work:

You can use your favorite package manager. I'm using [pnpm](https://pnpm.io) in this example. But you can replace any `pnpm` calls with `npm` or `yarn`. If you do, also make sure to replace any `pnpm dlx` with `npx` on the project's `package.json`.

### 1. Clone or fork the project

```bash
git clone https://github.com/theorib/op-sqlite-expo-turso-test.git
```

### 2. install dependencies

```bash
pnpm install
```

### 3. Create a new turso database and populate it:

1. If you don't have it already, begin by installing the Turso CLI:

```bash
brew install tursodatabase/tap/turso
```

2. Authenticate or create a new account with Turso

```bash
turso auth signup
```

3. Create a database from the included sql dump file

```bash
turso db create op-sqlite-libsql-test --from-dump ./dbDump/dump.sql
```

4. Get your new database URL

```bash
turso db show op-sqlite-libsql-test
```

5. Get an authentication token for the database

```bash
turso db tokens create op-sqlite-libsql-test
```

6. Rename the `sample.env` file in the root of this project folder to `.env` and replace the value of the environment variables with the URL and authentication token you got from the previous two steps

### 4. Create a project build and run it in your iOS or Android simulators

```bash
pnpm expo run:ios
pnpm expo run:android
```

### 5. Start the project at any time

```bash
pnpm start
```

## Extra info

This projects uses a nearly "vanilla" installation of Expo with very few changes. Most notably:

- [op-sqlite](https://github.com/OP-Engineering/op-sqlite) is installed as a dependency since this is what we are testing
- [faker-js](https://fakerjs.dev/) is installed to provide mock data
- [expo-dev-client](https://docs.expo.dev/versions/latest/sdk/dev-client/) to allow for Expo custom builds (necessary when using op-sqlite)
