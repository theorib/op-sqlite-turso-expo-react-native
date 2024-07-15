# Testing op-sqlite with Turso in a React Native/Expo project

## Description

This projects is a test ground for connecting a [Turso](https://turso.tech) database to a [React Native/Expo](https://docs.expo.dev) project using [op-sqlite](https://github.com/OP-Engineering/op-sqlite) with [libsql](https://github.com/tursodatabase/libsql) using [Turso's embedded replicas](https://docs.turso.tech/features/embedded-replicas/introduction).

The main `index.tsx` file allows for displaying, adding and deleting data from the database.

This project assumes you have:

- [The expo cli](https://docs.expo.dev/more/expo-cli/)
- [X-code](https://developer.apple.com/xcode/), and an ios simulator installed and configured
- [Android studio](https://developer.android.com/studio), and an android emulator installed and configured
- [Homebrew](https://brew.sh) to manage packages in your Mac (Windows users will not be able to use the iOS simulator).
- [openjdk@17](https://formulae.brew.sh/formula/openjdk#default) Development kit for the Java programming language, necessary for the android build (recommended version 17)

If you haven't, you can follow [this getting started guide](https://docs.expo.dev/get-started/set-up-your-environment/) from Expo's documentation as well as [Expo's local app development guide](https://docs.expo.dev/guides/local-app-development/)

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

### 3. Create a project build and run it in your ios simulator

```bash
pnpm expo run:ios
```
