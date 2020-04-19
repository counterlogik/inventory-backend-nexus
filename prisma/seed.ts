import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

main();

async function main() {
  const seedUserResults = await Promise.all(
    [
      {
        email: `jastaplesiv@gmail.com`,
        password: `12345`,
      },
      {
        email: `addison.staples@accenture.com`,
        password: `67890`,
      },
    ].map((data) => db.user.create({ data })),
  );

  const seedCategoryResults = await Promise.all([
    db.category.create({
      data: {
        owner: { connect: { email: `jastaplesiv@gmail.com` } },
        title: `Category 01`,
      },
    }),
    db.category.create({
      data: {
        owner: { connect: { email: `addison.staples@accenture.com` } },
        title: `Category X`,
      },
    }),
  ]);

  db.disconnect();
}
