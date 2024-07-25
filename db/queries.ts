import { db } from '@/db';
import { Item } from '@/db/schema';
import { logError } from '@/lib/helpers';

export const selectAllItems = async function (): Promise<Item[]> {
  let data: Item[] = [];
  try {
    const { res } = await db.executeAsync(`
      SELECT * FROM items 
      ORDER BY substr(id, 15, 4) || substr(id, 10, 4) || substr(id, 1, 8) DESC
    `);

    data = res || [];
  } catch (error) {
    logError('Error getting items from Turso database', error);
  }
  return data;
};

export const selectAllItemsSync = function (): Item[] {
  let data: Item[] = [];
  try {
    const { rows } = db.execute(`
      SELECT * FROM items 
      ORDER BY substr(id, 15, 4) || substr(id, 10, 4) || substr(id, 1, 8) DESC
    `);

    data = rows?._array || [];
  } catch (error) {
    logError('Error getting items from Turso database', error);
  }
  return data;
};
