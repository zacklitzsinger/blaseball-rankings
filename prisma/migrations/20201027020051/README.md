# Migration `20201027020051`

This migration has been generated at 10/26/2020, 10:00:51 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Stats" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "elo" INTEGER NOT NULL,
    "eloDelta" INTEGER NOT NULL,
    "wins" INTEGER NOT NULL,
    "losses" INTEGER NOT NULL,
    "runsFor" INTEGER NOT NULL,
    "runsAgain" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,
    "season" INTEGER NOT NULL,

    FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE,
PRIMARY KEY ("id")
);
INSERT INTO "new_Stats" ("id", "elo", "eloDelta", "wins", "losses", "runsFor", "runsAgain", "day", "season", "teamId") SELECT "id", "elo", "eloDelta", "wins", "losses", "runsFor", "runsAgain", "day", "season", "teamId" FROM "Stats";
DROP TABLE "Stats";
ALTER TABLE "new_Stats" RENAME TO "Stats";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201027013920-stats..20201027020051
--- datamodel.dml
+++ datamodel.dml
@@ -4,9 +4,9 @@
 }
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url = "***"
 }
 model Team {
   id        String @id
@@ -31,9 +31,11 @@
   season     Int
 }
 model Stats {
-  id     String @id
+  id String @id @default(uuid())
+  team  Team @relation(fields: [teamId], references: [id])
+  teamId String
   elo    Int
   eloDelta Int
   wins Int
   losses Int
```


