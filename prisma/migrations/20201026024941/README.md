# Migration `20201026024941`

This migration has been generated at 10/25/2020, 10:49:41 PM.
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
    "day" INTEGER NOT NULL,
    "season" INTEGER NOT NULL,

    FOREIGN KEY ("awayTeamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("homeTeamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE,
PRIMARY KEY ("id")
);
INSERT INTO "new_Game" ("id", "awayScore", "homeScore", "awayTeamId", "homeTeamId") SELECT "id", "awayScore", "homeScore", "awayTeamId", "homeTeamId" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201026024906..20201026024941
--- datamodel.dml
+++ datamodel.dml
@@ -3,9 +3,9 @@
 }
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url = "***"
 }
 model Team {
   id        String @id
@@ -23,5 +23,7 @@
   awayTeamId String
   homeTeamId String
   awayTeam   Team   @relation("awayTeamGames", fields: [awayTeamId], references: [id])
   homeTeam   Team   @relation("homeTeamGames", fields: [homeTeamId], references: [id])
+  day        Int
+  season     Int
 }
```


