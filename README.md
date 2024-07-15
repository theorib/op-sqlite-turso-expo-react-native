# Testing op-sqlite with Turso in a React Native/Expo project

## Description

This projects is a test ground for connecting a [Turso](https://turso.tech) database to a [React Native/Expo](https://docs.expo.dev) project using [op-sqlite](https://github.com/OP-Engineering/op-sqlite) with [libsql](https://github.com/tursodatabase/libsql) using [Turso's embedded replicas](https://docs.turso.tech/features/embedded-replicas/introduction).

The main `index.tsx` file allows for displaying, adding and deleting data from the database.

## System dependencies

This project assumes you have installed:

- If you are on a Mac and want to create iOS builds, you will need x-code and an ios simulator installed and configured:
  - You will likelly need [Homebrew](https://brew.sh) to manage packages in your Mac.
  - Follow [this guide](https://docs.expo.dev/get-started/set-up-your-environment/?platform=ios&device=simulated&mode=development-build&buildEnv=local) to install and configure x-code, the iOS simulator and watchman
- To create Android builds, you will need Android Studio with an emulator:

  - Follow [this guide](https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&device=simulated&mode=development-build&buildEnv=local) to install and configure OpenJDK, Android Studio, and an emulator, there are steps to follow for both Mac and Windows users.

- The [expo cli](https://docs.expo.dev/more/expo-cli/)

You can find extra info on local builds on [Expo's documentation](https://docs.expo.dev/guides/local-app-development/)

## Steps to make this project work:

You can use your favorite package manager. I'm using [pnpm](https://pnpm.io) in this example.

### 1. install dependencies

```bash
pnpm install
```

### 2. Create a new turso database and populate it:

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

### 3. Create a project build and run it in your iOS and Android simulators

```bash
pnpm expo run:ios
pnpm expo run:android
```
