"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
const nexus_plugin_prisma_1 = require("nexus-plugin-prisma");
// Enables the Prisma plugin
nexus_1.use(nexus_plugin_prisma_1.prisma());
