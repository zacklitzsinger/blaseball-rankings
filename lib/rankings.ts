import { getAllTeamIds } from "./teams";
import prisma from "./client";
import { getLatestSeason } from "./seasons";
import { Stats } from "@prisma/client";

export async function getTeamRankings(season: number | null) {
  const selectedSeason = season ?? (await getLatestSeason());
  const teams = (await getAllTeamIds()).map((t) => t.id);
  const data: Record<string, Stats | null> = {};
  for (const team of teams) {
    const d = await prisma.stats.findFirst({
      orderBy: { day: "desc" },
      where: { teamId: team, season: selectedSeason },
    });
    if (d) {
      data[team] = d;
    }
  }
  return data;
}
