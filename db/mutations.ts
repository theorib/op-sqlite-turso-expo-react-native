import { db } from '@/db';
import { Item, ItemInsert } from '@/db/schema';
import { logError } from '@/lib/helpers';

export const insertItem = async (newItem: ItemInsert): Promise<Item | null> => {
  let item: Item | null = null;
  await db.transaction(async tx => {
    try {
      await tx.executeAsync(
        'INSERT INTO items (name, value, image) VALUES (?, ?, ?)',
        [newItem.name, newItem.value, newItem.image]
      );
      const { res } = await tx.executeAsync(
        'SELECT * FROM items WHERE id = last_insert_rowid()',
        []
      );
      item = res?.at(0);
      if (!item) throw new Error('Item not found');
      tx.commit();
    } catch (error) {
      tx.rollback();
      logError('Error adding new item to Turso database', error);
    }
  });

  return item;
};

export const deleteItemById = async (id: number): Promise<Item | null> => {
  let item: Item | null = null;
  await db.transaction(async tx => {
    try {
      const { res } = await tx.executeAsync(
        'SELECT * FROM items WHERE id = ?',
        [id]
      );
      item = res?.at(0);
      if (!item) throw new Error('Item not found');

      await tx.executeAsync('DELETE FROM items WHERE id = ?', [id]);
      tx.commit();
    } catch (error) {
      tx.rollback();
      logError('Error deleting item from Turso database', error);
      item = null;
    }
  });

  return item;
};

export const insertNewItemSync = (newItem: ItemInsert): Item | null => {
  try {
    db.execute('INSERT INTO items (name, value, image) VALUES ( ?, ?, ?)', [
      newItem.name,
      newItem.value,
      newItem.image,
    ]);
    const { res } = db.execute(
      'SELECT * FROM items WHERE id = last_insert_rowid()'
    );

    if (!res?.at(0)) throw new Error('item not found');
    return res?.at(0);
  } catch (error) {
    logError('Error adding new item to Turso database', error);
    return null;
  }
};

export const deleteItemByIdSync = (id: string) => {
  try {
    const data = db.execute('DELETE FROM items WHERE id = ?', [id]);
  } catch (error) {
    logError('Error deleting item from the Turso database', error);
  }
};
