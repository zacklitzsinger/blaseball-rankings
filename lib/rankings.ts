import { getAllTeamIds } from "./teams";
import prisma from "./client";
import { getLatestSeason } from "./seasons";
import { Stats } from "@prisma/client";
import { keyBy } from "lodash";

export async function getTeamRankings(season: number | null) {
  const selectedSeason = season ?? (await getLatestSeason());
  const d = await prisma.stats.findMany({
    orderBy: { day: "desc" },
    where: { season: selectedSeason },
    distinct: "teamId",
    take: 20, // assumes 20 teams per season
  });
  return keyBy(d, "teamId");
}
