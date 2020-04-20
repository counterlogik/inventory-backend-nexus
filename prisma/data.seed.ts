import { PrismaClient } from '@prisma/client';
import * as categories from './data/categories.json';
import * as locations from './data/locations.json';
import * as items from './data/items.json';

const db = new PrismaClient();

main();

async function main() {
  await Promise.all(
    [1, 2, 3, 4, 5]
      .map((digit: number) => {
        return {
          email: `fake${digit}@gmail.com`,
          password: '12345',
        };
      })
      .map((data) => db.user.create({ data })),
  );

  const categoryResults = await Promise.all(
    categories.map((category: string) =>
      db.category.create({
        data: {
          owner: { connect: { id: 1 } },
          title: category,
        },
      }),
    ),
  );

  const locationResults = await Promise.all(
    locations.map((location: string) =>
      db.location.create({
        data: {
          owner: { connect: { id: 1 } },
          title: location,
        },
      }),
    ),
  );

  await Promise.all(
    items.map((item) =>
      db.item.create({
        data: {
          owner: { connect: { id: 1 } },
          description: item.description,
          model: item.model,
          categories: {
            connect: item.categories.map((title) => {
              return {
                id: categoryResults.find((category) => category.title === title)
                  .id,
              };
            }),
          },
          locations: {
            connect: item.locations.map((title) => {
              return {
                id: locationResults.find((location) => location.title === title)
                  .id,
              };
            }),
          },
          spark: item.spark as 'LIKE' | 'LOVE' | 'NEED' | 'LOSE',
          count: item.count,
          link: item.link,
        },
      }),
    ),
  );

  db.disconnect();
}
