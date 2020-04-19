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
    t.model.description();
    t.model.owner();
    t.model.ownerId();
    t.model.image();
    t.model.title();
    t.model.items();
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
    t.crud.item();
    t.crud.location();
    t.crud.category();
    t.crud.tag();
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

    t.field('createCategorySpecial', {
      type: 'Category',
      resolve: (_, _x, ctx) => {
        console.log(ctx);
        return ctx.db.category.create({
          data: {
            owner: {
              connect: { email: 'jastaplesiv2@gmail.com' },
            },
            title: ' ',
          },
        });
      },
    });
  },
});
