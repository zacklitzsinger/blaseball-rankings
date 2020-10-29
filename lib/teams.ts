import { getLatestSeason } from "./seasons";
import prisma from "./client";

export async function getAllTeamIds() {
  return await prisma.team.findMany({ select: { id: true } });
}

export async function getTeamData(id: string) {
  return prisma.team.findOne({ where: { id } });
}

export async function getTeamStats(id: string, season: number | null) {
  const selectedSeason = season ?? (await getLatestSeason());
  return prisma.stats.findMany({
    where: { teamId: id, season: selectedSeason },
  });
}
