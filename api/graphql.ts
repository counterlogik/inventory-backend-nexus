import { schema } from 'nexus';
import { intArg } from '@nexus/schema';

schema.objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.email();
    t.model.password();
    t.model.name();
    t.model.image();
    t.model.categories();
    t.model.locations();
    t.model.tags();
    t.model.items();
  },
});

schema.objectType({
  name: 'Item',
  definition(t) {
    t.model.id();
    t.model.owner();
    t.model.ownerId();
    t.model.description();
    t.model.model();
    t.model.categories();
    t.model.locations();
    t.model.spark();
    t.model.count();
    t.model.monetaryValue();
    t.model.link();
    t.model.notes();
    t.model.tags();
    t.model.image();
  },
});

schema.objectType({
  name: 'Category',
  definition(t) {
    t.model.id();
    t.model.owner();
    t.model.ownerId();
    t.model.title();
    t.model.description();
    t.model.image();
    t.model.items();
  },
});

schema.objectType({
  name: 'Location',
  definition(t) {
    t.model.id();
    t.model.owner();
    t.model.ownerId();
    t.model.title();
    t.model.image();
    t.model.items();
  },
});

schema.objectType({
  name: 'Tag',
  definition(t) {
    t.model.id();
    t.model.owner();
    t.model.ownerId();
    t.model.title();
    t.model.items();
  },
});

schema.objectType({
  name: 'Query',
  definition(t) {
    t.crud.user();
    t.crud.users();
    t.crud.item();
    t.crud.items();
    t.crud.location();
    t.crud.locations();
    t.crud.category();
    t.crud.categories();
    t.crud.tag();
    t.crud.tags();

    // TODO: should move to  computed inputs avoid requirement requiring ownerId
    t.field('categoriesByUser', {
      type: 'Category',
      list: true,
      args: {
        ownerId: intArg(),
      },
      resolve(_root, { ownerId }, ctx) {
        return ctx.db.category.findMany({
          where: {
            owner: { id: ownerId },
          },
        });
      },
    });

    t.field('locationsByUser', {
      type: 'Location',
      list: true,
      args: {
        ownerId: intArg(),
      },
      resolve(_root, { ownerId }, ctx) {
        return ctx.db.location.findMany({
          where: {
            owner: { id: ownerId },
          },
        });
      },
    });

    t.field('tagsByUser', {
      type: 'Tag',
      list: true,
      args: {
        ownerId: intArg(),
      },
      resolve(_root, { ownerId }, ctx) {
        return ctx.db.tag.findMany({
          where: {
            owner: { id: ownerId },
          },
        });
      },
    });
  },
});

schema.objectType({
  name: 'Mutation',
  definition(t) {
    t.crud.createOneUser();
    t.crud.createOneLocation();
    t.crud.createOneCategory();
    t.crud.createOneTag();
    t.crud.createOneItem();

    t.crud.deleteOneCategory();
    t.crud.deleteOneItem();

    t.crud.updateOneUser();
    t.crud.updateOneLocation();
    t.crud.updateOneCategory();
    t.crud.updateOneTag();
    t.crud.updateOneItem();

    t.crud.upsertOneItem();
  },
});
