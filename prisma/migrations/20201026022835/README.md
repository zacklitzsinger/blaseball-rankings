# Migration `20201026022835`

This migration has been generated at 10/25/2020, 10:28:35 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" TEXT NOT NULL,
    "awayScore" INTEGER NOT NULL,
    "homeScore" INTEGER NOT NULL,
    "awayTeamId" TEXT NOT NULL,
    "homeTeamId" TEXT NOT NULL,

    FOREIGN KEY ("awayTeamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("homeTeamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE,
PRIMARY KEY ("id")
);
INSERT INTO "new_Game" ("id", "awayScore", "homeScore") SELECT "id", "awayScore", "homeScore" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201026021510..20201026022835
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = ["sqlite", "postgresql"]
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -14,11 +14,17 @@
   id        String @id
   fullName  String
   emoji     String
   mainColor String
+  homeGames Game[] @relation(name: "awayTeamGames")
+  awayGames Game[] @relation(name: "homeTeamGames")
 }
 model Game {
-  id        String @id
-  awayScore Int
-  homeScore Int
+  id         String @id
+  awayScore  Int
+  homeScore  Int
+  awayTeam   Team   @relation(name: "awayTeamGames", fields: [awayTeamId], references: [id])
+  awayTeamId String
+  homeTeam   Team   @relation(name: "homeTeamGames", fields: [homeTeamId], references: [id])
+  homeTeamId String
 }
```


