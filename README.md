# Testing op-sqlite with Turso on an Expo/React Native project

## Table of Contents

1. [Description](#description)
2. [Supported Platforms](#supported-platforms)
3. [Prerequisites](#prerequisites)
4. [Steps to make this project work](#steps-to-make-this-project-work)
   - [Clone, download or fork the project](#1-clone-download-or-fork-the-project)
   - [Install dependencies](#2-install-dependencies)
   - [Create a new turso database and populate it](#3-create-a-new-turso-database-and-populate-it)
   - [Create a project build and run it](#4-create-a-project-build-and-run-it-in-your-ios-or-android-simulators)
   - [Start the project](#5-start-the-project-at-any-time)
5. [Troubleshooting](#troubleshooting)
6. [Extra info](#extra-info)

## Description

This projects is a test ground for connecting a [Turso](https://turso.tech) database to an [Expo/React Native](https://docs.expo.dev) project using [op-sqlite](https://github.com/OP-Engineering/op-sqlite) (set up to use [libsql](https://ospfranco.notion.site/Libsql-Support-c56ac2afb939460182ee7bd910b08fbf) as the database source) leveraging Turso's [embedded replicas](https://docs.turso.tech/features/embedded-replicas/introduction).

Turso's embedded replicas allow database reads and/or writes to always happen from a local SQLite database first, providing very fast reads and/or writes which are then synced to a remote database.

The project is currently set up to leverage Turso's main features of interest such as:

- Embedded replicas
- [Offline writes](https://turso.tech/blog/turso-offline-sync-public-beta) with sync
- Local database [encryption at rest](https://docs.turso.tech/features/embedded-replicas/introduction#encryption-at-rest)
- [Periodic sync](https://docs.turso.tech/features/embedded-replicas/introduction#periodic-sync)
- [Read your writes](https://docs.turso.tech/features/embedded-replicas/introduction#read-your-writes)

## Project Structure

The main `src/app/index.tsx` file allows for displaying, adding, deleting and refreshing a list of items from the database. New items are automatically generated for demonstration purposes.

The `src/db` folder is where most of the op-sqlite code is located.

- The `src/db/index.ts` creates and exports the database client as well as a sync function.
- The `src/db/schema.ts` file currenly mainly contains TypeScript types
- The `src/db/queries.ts` file contains query functions to retrieve data from the database
- The `src/db/mutations.ts` file contains insert and delete functions
- The `src/db/seedData.ts` file mainly contains a function to create data on the fly using faker.js

## Suported Platforms

This project was created on a Mac with an M1 chip running MacOS Sequoia 15.5.

- For Android builds it should work on most computers that have the correct development environment set up.
- For iOS builds you will likelly need a work on MacOS computer.

## Prerequisites

This project assumes you have an Expo/React Native development environment already. If you don't, you can follow the relevant steps below:

- Install [Node.js](https://nodejs.org/en/) LTS version
- Install [Expo command line tools](https://docs.expo.dev/more/expo-cli/)
- For Android builds follow [this guide](https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&device=simulated&mode=development-build&buildEnv=local) to install and configure OpenJDK, Android Studio, and an Android Emulator
- For iOS buids (Mac users only), follow [this guide](https://docs.expo.dev/get-started/set-up-your-environment/?platform=ios&device=simulated&mode=development-build&buildEnv=local) to install and configure Xcode, an iOS simulator and [watchman](https://facebook.github.io/watchman/docs/install#macos)
  - You will likely need [Homebrew](https://brew.sh) to manage packages in your Mac.

## Steps to make this project work:

You can use your favorite package manager. I'm using [pnpm](https://pnpm.io) in this example. But you can replace any `pnpm` in the scripts section of the project's `package.json` to calls for `npm` or `yarn`. If you do, also make sure to replace any `pnpm dlx` with `npx` (if using `npm`) or `yarn dlx` (if using `yarn`).

### 1. Clone, download or fork this repository

```bash
git clone https://github.com/theorib/op-sqlite-turso-expo-react-native.git
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

3. Create a new database (replace db-name with the name you want to give to your database)

```bash
turso db create db-name
```

4. Seed the database with the included sql dump file

```bash
turso db shell db-name < dbDump/dump.sql
```

5. Get your new database URL

```bash
turso db show db-name
```

6. Get an authentication token for the database

```bash
turso db tokens create db-name
```

7. Rename the `.env.sample` file in the root of this project folder to `.env` and replace the value of the environment variables with the URL and authentication token you got from the previous two steps

### 4. Create a project build and run it in your iOS or Android simulators

```bash
pnpm ios
pnpm android
```

### 5. Start the project at any time

```bash
pnpm start
```

## Troubleshooting

If you are running into problems with your iOS build try running a pod install first with

```bash
pnpm pod
```

## Extra info

This projects uses a nearly "vanilla" installation of Expo with very few changes. Most notably:

- [TanStack Query](https://tanstack.com/query/latest) to make data fetching and syncing with Turso more straightforward while handling pending and loading states properly
- [op-sqlite](https://github.com/OP-Engineering/op-sqlite) is installed as a dependency since this is what we are testing
- [faker-js](https://fakerjs.dev/) is installed to provide mock data
- [expo-dev-client](https://docs.expo.dev/versions/latest/sdk/dev-client/) to allow for Expo custom builds (necessary when using op-sqlite)
