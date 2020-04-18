# Migration `20200418112939-fails`

This migration has been generated by addison staples at 4/18/2020, 11:29:39 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Category" DROP COLUMN "itemId";

ALTER TABLE "public"."Location" DROP COLUMN "itemId";

ALTER TABLE "public"."Tag" DROP COLUMN "itemId";
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200418110637-fix-relations..20200418112939-fails
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 generator prisma_client {
   provider = "prisma-client-js"
@@ -27,16 +27,16 @@
   createdAt     DateTime   @default(now())
   updatedAt     DateTime   @updatedAt
   description   String
   model         String?
-  categories    Category[] @relation(references: [id])
-  locations     Location[] @relation(references: [id])
+  categories    Category[]
+  locations     Location[]
   spark         Int?
   count         Int        @default(1)
   monetaryValue Float
   link          String
   notes         String
-  tags          Tag[]      @relation(references: [id])
+  tags          Tag[]
   image         String
 }
 model Category {
@@ -46,9 +46,8 @@
   createdAt   DateTime @default(now())
   title       String
   description String?
   image       String?
-  itemId      Int?
   @@unique([ownerId, title])
 }
@@ -59,9 +58,8 @@
   createdAt   DateTime @default(now())
   title       String
   description String?
   image       String?
-  itemId      Int?
   @@unique([ownerId, title])
 }
@@ -70,9 +68,8 @@
   owner     User     @relation(fields: [ownerId], references: [id])
   ownerId   Int
   createdAt DateTime @default(now())
   title     String
-  itemId    Int?
   @@unique([ownerId, title])
 }
```

