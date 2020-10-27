# Migration `20201027013920-stats`

This migration has been generated at 10/26/2020, 9:39:20 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "Stats" (
    "id" TEXT NOT NULL,
    "elo" INTEGER NOT NULL,
    "eloDelta" INTEGER NOT NULL,
    "wins" INTEGER NOT NULL,
    "losses" INTEGER NOT NULL,
    "runsFor" INTEGER NOT NULL,
    "runsAgain" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,
    "season" INTEGER NOT NULL,
    "teamId" TEXT,

    FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE,
PRIMARY KEY ("id")
)
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201026035926..20201027013920-stats
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
@@ -15,8 +15,9 @@
   mainColor String
   slogan    String
   homeGames Game[] @relation("awayTeamGames")
   awayGames Game[] @relation("homeTeamGames")
+  stats     Stats[]
 }
 model Game {
   id         String @id
@@ -28,4 +29,16 @@
   homeTeam   Team   @relation("homeTeamGames", fields: [homeTeamId], references: [id])
   day        Int
   season     Int
 }
+
+model Stats {
+  id     String @id
+  elo    Int
+  eloDelta Int
+  wins Int
+  losses Int
+  runsFor Int
+  runsAgain Int
+  day Int
+  season Int
+}
```


