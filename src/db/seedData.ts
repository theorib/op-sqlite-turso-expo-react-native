import { ItemInsert } from '@/db/schema';
import { faker } from '@faker-js/faker';

export const createItemData = (): ItemInsert => {
  return {
    name: faker.commerce.productName(),
    value: faker.number.int({ min: 100, max: 100000 }),
    image: faker.image.urlPicsumPhotos({ height: 600, width: 600 }),
  };
};
