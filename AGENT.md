# Agent Guidelines

## Commands
- **Build**: `pnpm prebuild` or `pnpm prebuild:clean` (clean build)
- **Test**: `pnpm test` (jest with watchAll), `pnpm test --watchAll=false` (single run)
- **Lint**: `pnpm lint` (expo lint)
- **Start**: `pnpm start` (expo start), `pnpm ios`, `pnpm android`
- **Rebuild**: `pnpm rebuild` (clears expo builds, prebuilds, pods, and runs iOS)
- **Pod Install**: `pnpm pod` (for iOS builds)

## Architecture
- **Expo Router**: Main app in `src/app/` with `_layout.tsx` and `index.tsx`
- **Database**: Turso remote SQLite via `@op-engineering/op-sqlite` in `src/db/`
  - `index.ts`: DB client initialization with `openRemote()` 
  - `schema.ts`: TypeScript types (Item, ItemInsert, ItemSelect)
  - `queries.ts`: Read operations, `mutations.ts`: Write operations
- **Hooks**: Custom hooks in `src/hooks/`
- **Utils**: Helper functions in `src/lib/helpers.ts`
- **Path alias**: `@/*` maps to `src/*`

## Code Style
- **TypeScript**: Strict mode enabled
- **Imports**: Use `@/` alias for src imports
- **Error Handling**: Use `logError()` helper from `@/lib/helpers`
- **Database**: Separate read/write operations, use TypeScript types
- **Expo**: React Native 0.79.5, Expo 53.0.17, Node 22.13.0
