import * as path from "path";

import { makeSchema, declarativeWrappingPlugin, objectType, intArg } from "nexus";
import { nexusPrisma } from "nexus-plugin-prisma";

const User = objectType({
  name: "User",
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

const Item = objectType({
  name: "Item",
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

const Category = objectType({
  name: "Category",
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

const Location = objectType({
  name: "Location",
  definition(t) {
    t.model.id();
    t.model.owner();
    t.model.ownerId();
    t.model.title();
    t.model.image();
    t.model.items();
  },
});

const Tag = objectType({
  name: "Tag",
  definition(t) {
    t.model.id();
    t.model.owner();
    t.model.ownerId();
    t.model.title();
    t.model.items();
  },
});

const Query = objectType({
  name: "Query",
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

    // TODO: should move to computed inputs to avoid requirement requiring ownerId
    t.field("categoriesByUser", {
      type: "Category",
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

    t.field("locationsByUser", {
      type: "Location",
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

    t.field("tagsByUser", {
      type: "Tag",
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

const Mutation = objectType({
  name: "Mutation",
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

export const schema = makeSchema({
  types: [User, Item, Category, Location, Tag, Query, Mutation],
  plugins: [nexusPrisma({ experimentalCRUD: true }), declarativeWrappingPlugin()],
  outputs: {
    schema: path.join(__dirname, "..", "generated", "schema.graphql"),
    typegen: path.join(__dirname, "..", "generated", "nexus-typegen.d.ts"),
  },
  contextType: {
    module: require.resolve("./context"),
    alias: "ContextModule",
    export: "Context",
  },
  sourceTypes: {
    modules: [
      {
        module: require.resolve(".prisma/client/index.d.ts"),
        alias: "prisma",
      },
    ],
  },
});
