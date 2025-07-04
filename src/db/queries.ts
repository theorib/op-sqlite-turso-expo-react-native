import { db } from '@/db';
import { Item } from '@/db/schema';

export const selectAllItems = async function (): Promise<Item[]> {
  let data: Item[] = [];

  const response = await db.execute('SELECT * FROM items;');
  data = response.rows as Item[];

  return data;
};
