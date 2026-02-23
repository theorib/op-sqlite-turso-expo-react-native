# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Expo/React Native project demonstrating op-sqlite integration with Turso's libsql database. The app showcases Turso's embedded replicas feature, allowing fast local SQLite operations with remote sync capabilities.

Key technologies:
- **Expo SDK 53** with React Native 0.79.5
- **op-sqlite** (v14.1.1) with libsql support for Turso integration
- **TanStack Query** for data fetching and state management
- **TypeScript** for type safety
- **pnpm** as package manager (Node.js 22.13.0)

## Development Commands

### Essential Commands
- `pnpm start` - Start development server with dev client
- `pnpm start:clear` - Start with cache cleared
- `pnpm ios` - Build and run iOS app (macOS only)
- `pnpm android` - Build and run Android app
- `pnpm pod` - Install iOS pods (troubleshooting iOS builds)
- `pnpm test` - Run Jest tests in watch mode
- `pnpm lint` - Run Expo linting

### Build Commands
- `pnpm prebuild` - Generate native directories
- `pnpm prebuild:clean` - Clean prebuild
- `pnpm rebuild` - Full rebuild (clears builds, prebuilds, pods, runs iOS)

### Database Setup
Required environment variables in `.env`:
```
EXPO_PUBLIC_TURSO_DATABASE_URL=your-database-url
EXPO_PUBLIC_TURSO_AUTH_TOKEN=your-auth-token  
EXPO_PUBLIC_TURSO_ENCRYPTION_KEY=your-encryption-key
```

Create Turso database and seed with `dbDump/dump.sql`:
```bash
turso db create your-db-name
turso db shell your-db-name < dbDump/dump.sql
```

## Architecture

### Database Layer (`src/db/`)
- `index.ts` - Database initialization with Turso sync configuration
- `schema.ts` - TypeScript types for database entities
- `queries.ts` - SELECT operations
- `mutations.ts` - INSERT/DELETE operations within transactions
- `seedData.ts` - Mock data generation using faker.js

### App Structure (`src/app/`)
- `_layout.tsx` - Root layout with QueryClient provider
- `index.tsx` - Main screen with items CRUD operations

### Key Configuration
- **op-sqlite config** (package.json): `performanceMode: true, libsql: true`
- **Custom Expo plugin**: `expoPlugins/withUseThirdPartySQLitePod.js` for iOS SQLite pod
- **Metro config**: Standard Expo setup
- **App config**: Deep linking scheme `opsqliteexpotursotest://`

### Database Features
- **Embedded replicas**: Local-first with remote sync
- **Offline writes**: Changes sync when connection restored  
- **Encryption at rest**: Local database encrypted
- **Periodic sync**: Configurable sync intervals (4000ms default)
- **Transactions**: All mutations wrapped in transactions

## Important Implementation Details

- All database operations use async/await patterns
- TanStack Query handles data fetching, caching, and invalidation
- Manual sync triggered after mutations via `sync()` function from `src/db/index.ts`
- Database client initialized with `openSync()` - handles both local and remote setup
- Items table schema: `id`, `name`, `value`, `image` columns
- Error handling uses helper function from `src/lib/helpers.ts`

## Development Notes

- Requires Expo dev client for custom native modules (op-sqlite)
- iOS builds require macOS and Xcode setup
- Android builds require Android Studio and Java/Kotlin setup  
- Use `pnpm pod` if iOS builds fail
- Database URL and auth token must be configured before running
- App demonstrates real-time local/remote database sync patterns