import { getAllTeamIds } from "./teams";
import { PrismaClient, Stats } from "@prisma/client";
const prisma = new PrismaClient();

export async function getLatestSeason() {
  return (
    await prisma.stats.findFirst({
      orderBy: { season: "desc" },
      select: { season: true },
    })
  )?.season;
}

export async function getAllSeasons() {
  return (
    await prisma.stats.findMany({
      distinct: "season",
      select: { season: true },
    })
  )?.map((i) => i.season);
}
