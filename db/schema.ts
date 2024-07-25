export type Item = {
  id: number;
  name: string;
  value: number;
  image: string | null;
};

export type ItemInsert = Omit<Item, 'id'>;
export type ItemSelect = Item;
