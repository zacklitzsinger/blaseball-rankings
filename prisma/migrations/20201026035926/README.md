# Migration `20201026035926`

This migration has been generated at 10/25/2020, 11:59:26 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" TEXT NOT NULL,
    "awayScore" REAL NOT NULL,
    "homeScore" REAL NOT NULL,
    "awayTeamId" TEXT NOT NULL,
    "homeTeamId" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "season" INTEGER NOT NULL,

    FOREIGN KEY ("awayTeamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("homeTeamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE,
PRIMARY KEY ("id")
);
INSERT INTO "new_Game" ("id", "awayScore", "homeScore", "awayTeamId", "homeTeamId", "day", "season") SELECT "id", "awayScore", "homeScore", "awayTeamId", "homeTeamId", "day", "season" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
CREATE TABLE "new_Team" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "mainColor" TEXT NOT NULL,
    "slogan" TEXT NOT NULL,
PRIMARY KEY ("id")
);
INSERT INTO "new_Team" ("id", "fullName", "emoji", "mainColor") SELECT "id", "fullName", "emoji", "mainColor" FROM "Team";
DROP TABLE "Team";
ALTER TABLE "new_Team" RENAME TO "Team";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201026024941..20201026035926
--- datamodel.dml
+++ datamodel.dml
@@ -1,26 +1,28 @@
 generator client {
-  provider = "prisma-client-js"
+  provider        = "prisma-client-js"
+  previewFeatures = ["connectOrCreate"]
 }
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url = "***"
 }
 model Team {
   id        String @id
   fullName  String
   emoji     String
   mainColor String
+  slogan    String
   homeGames Game[] @relation("awayTeamGames")
   awayGames Game[] @relation("homeTeamGames")
 }
 model Game {
   id         String @id
-  awayScore  Int
-  homeScore  Int
+  awayScore  Float
+  homeScore  Float
   awayTeamId String
   homeTeamId String
   awayTeam   Team   @relation("awayTeamGames", fields: [awayTeamId], references: [id])
   homeTeam   Team   @relation("homeTeamGames", fields: [homeTeamId], references: [id])
```


