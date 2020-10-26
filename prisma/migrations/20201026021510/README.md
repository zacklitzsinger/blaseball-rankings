# Migration `20201026021510`

This migration has been generated at 10/25/2020, 10:15:10 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "mainColor" TEXT NOT NULL,
PRIMARY KEY ("id")
)

CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "awayScore" INTEGER NOT NULL,
    "homeScore" INTEGER NOT NULL,
PRIMARY KEY ("id")
)
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201026021510
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,24 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = ["sqlite", "postgresql"]
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Team {
+  id        String @id
+  fullName  String
+  emoji     String
+  mainColor String
+}
+
+model Game {
+  id        String @id
+  awayScore Int
+  homeScore Int
+}
```


