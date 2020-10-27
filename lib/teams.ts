import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getAllTeamIds() {
  return await prisma.team.findMany({ select: { id: true } });
}

export async function getTeamData(id: string) {
  return prisma.team.findOne({ where: { id } });
}

export async function getTeamStats(id: string) {
  return prisma.stats.findMany({ where: { teamId: id } });
}
