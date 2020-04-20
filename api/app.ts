import { server, use } from 'nexus';
import { prisma } from 'nexus-plugin-prisma';
const cors = require('cors');

// Enables the Prisma plugin
use(prisma());
server.express.use(cors());
