"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
nexus_1.schema.objectType({
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
nexus_1.schema.objectType({
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
nexus_1.schema.objectType({
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
nexus_1.schema.objectType({
    name: 'Location',
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
nexus_1.schema.objectType({
    name: 'Tag',
    definition(t) {
        t.model.id();
        t.model.owner();
        t.model.ownerId();
        t.model.title();
        t.model.items();
    },
});
nexus_1.schema.objectType({
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
    },
});
nexus_1.schema.objectType({
    name: 'Mutation',
    definition(t) {
        t.crud.createOneUser();
        t.crud.createOneLocation();
        t.crud.createOneCategory();
        t.crud.createOneTag();
        t.crud.createOneItem();
    },
});
