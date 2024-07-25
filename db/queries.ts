import { db } from '@/db';
import { Item } from '@/db/schema';

import { logError } from '@/lib/helpers';

export const selectAllItems = function (): Item[] {
  let syncData: Item[] = [];
  try {
    const data = db.execute(`
      SELECT * FROM items 
      ORDER BY substr(id, 15, 4) || substr(id, 10, 4) || substr(id, 1, 8) DESC
    `);
    syncData = data?.rows?._array || [];
  } catch (error) {
    logError('Error getting items from Turso database', error);
  }
  return syncData;
};
