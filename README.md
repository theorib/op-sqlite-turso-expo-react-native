# Debugging op-sqlite with libsql

## Description

All this project is doing is connecting to a turso database and displaying the data from a `lights` table in a list. If there is an error it's being logged to the console and an error message appears on the app's ui.

This project assumes you have the expo cli, x-code, and ios simulator installed.

## Steps to make this project work:

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

6. Rename the `sample.env` file in the root of this project folder to `.env` and replate the value of the environment variables with the URL and authentication token you got form the previous two steps

### 3. Create a project build and run it in your ios simulator

```bash
pnpm expo run:ios
```
