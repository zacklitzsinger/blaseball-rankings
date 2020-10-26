# Migration `20201026024906`

This migration has been generated at 10/25/2020, 10:49:06 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201026022835..20201026024906
--- datamodel.dml
+++ datamodel.dml
@@ -1,30 +1,27 @@
-// This is your Prisma schema file,
-// learn more about it in the docs: https://pris.ly/d/prisma-schema
+generator client {
+  provider = "prisma-client-js"
+}
 datasource db {
-  provider = ["sqlite", "postgresql"]
-  url = "***"
+  provider = "sqlite"
+  url = "***"
 }
-generator client {
-  provider = "prisma-client-js"
-}
-
 model Team {
   id        String @id
   fullName  String
   emoji     String
   mainColor String
-  homeGames Game[] @relation(name: "awayTeamGames")
-  awayGames Game[] @relation(name: "homeTeamGames")
+  homeGames Game[] @relation("awayTeamGames")
+  awayGames Game[] @relation("homeTeamGames")
 }
 model Game {
   id         String @id
   awayScore  Int
   homeScore  Int
-  awayTeam   Team   @relation(name: "awayTeamGames", fields: [awayTeamId], references: [id])
   awayTeamId String
-  homeTeam   Team   @relation(name: "homeTeamGames", fields: [homeTeamId], references: [id])
   homeTeamId String
+  awayTeam   Team   @relation("awayTeamGames", fields: [awayTeamId], references: [id])
+  homeTeam   Team   @relation("homeTeamGames", fields: [homeTeamId], references: [id])
 }
```


