import { schema } from 'nexus';

schema.objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.handle();
    t.model.email();
    t.model.password();
    t.model.name();
    t.model.image();
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
    t.model.locationId();
    t.model.spark();
    t.model.count();
    t.model.monetaryValue();
    t.model.tags();
    t.model.link();
    t.model.notes();
    t.model.image();
  },
});

schema.objectType({
  name: 'Category',
  definition(t) {
    t.model.id();
    t.model.owner();
    t.model.ownerId();
    t.model.description();
    t.model.owner();
    t.model.ownerId();
    t.model.image();
    t.model.title();
  },
});

schema.objectType({
  name: 'Location',
  definition(t) {
    t.model.id();
    t.model.owner();
    t.model.ownerId();
    t.model.description();
    t.model.owner();
    t.model.ownerId();
    t.model.image();
    t.model.title();
  },
});

schema.objectType({
  name: 'Tag',
  definition(t) {
    t.model.id();
    t.model.owner();
    t.model.ownerId();
    t.model.title();
  },
});

schema.queryType({
  definition(t) {
    t.list.field('items', {
      type: 'Item',
      resolve(_root, _args, ctx) {
        return ctx.db.item.findMany();
      },
    });
  },
});

schema.mutationType({
  definition(t) {
    t.crud.updateOneItem();
  },
});
