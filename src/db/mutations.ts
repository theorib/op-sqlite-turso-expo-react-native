import { db } from '@/db';
import { ItemInsert } from '@/db/schema';
export const insertItem = async (newItem: ItemInsert): Promise<void> => {
  await db.transaction(async tx => {
    await tx.execute(
      'INSERT INTO items (name, value, image) VALUES (?, ?, ?)',
      [newItem.name, newItem.value, newItem.image]
    );
  });
};

export const deleteItemById = async (id: number): Promise<void> => {
  await db.transaction(async tx => {
    await tx.execute('DELETE FROM items WHERE id = ?', [id]);
  });
};
