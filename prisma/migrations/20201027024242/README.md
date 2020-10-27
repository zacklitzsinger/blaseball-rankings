# Migration `20201027024242`

This migration has been generated at 10/26/2020, 10:42:42 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Stats" (
    "teamId" TEXT NOT NULL,
    "elo" INTEGER NOT NULL,
    "eloDelta" INTEGER NOT NULL,
    "wins" INTEGER NOT NULL,
    "losses" INTEGER NOT NULL,
    "runsFor" INTEGER NOT NULL,
    "runsAgainst" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,
    "season" INTEGER NOT NULL,

    FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE,
PRIMARY KEY ("day","season","teamId")
);
INSERT INTO "new_Stats" ("elo", "eloDelta", "wins", "losses", "runsFor", "day", "season", "teamId") SELECT "elo", "eloDelta", "wins", "losses", "runsFor", "day", "season", "teamId" FROM "Stats";
DROP TABLE "Stats";
ALTER TABLE "new_Stats" RENAME TO "Stats";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201027020051..20201027024242
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
@@ -31,16 +31,17 @@
   season     Int
 }
 model Stats {
-  id String @id @default(uuid())
   team  Team @relation(fields: [teamId], references: [id])
   teamId String
   elo    Int
   eloDelta Int
   wins Int
   losses Int
   runsFor Int
-  runsAgain Int
+  runsAgainst Int
   day Int
   season Int
+
+  @@id([day, season, teamId])
 }
```


