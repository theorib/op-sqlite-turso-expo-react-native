import { logError } from '@/lib/helpers';
import { DB, openRemote, openSync } from '@op-engineering/op-sqlite';

let db: DB;

try {
  // initialize the database client
  db = openSync({
    name: 'myDb.sqlite',
    url: process.env.EXPO_PUBLIC_TURSO_DATABASE_URL!,
    libsqlSyncInterval: 4000,
    authToken: process.env.EXPO_PUBLIC_TURSO_AUTH_TOKEN!,
  });

  // Make the initial sync from the remote to the local database
  db.sync();
  
  // Create the items table if it doesn't exist
  db.execute(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      value INTEGER NOT NULL,
      image TEXT
    )
  `);
} catch (error) {
  const updatedError = logError('Error initializing database client', error);
  throw updatedError;
}

const sync = function () {
  try {
    db.sync();
  } catch (error) {
    logError('Error syncing Turso database', error);
  }
};

export { db, sync };
