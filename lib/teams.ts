import teamStats from "./data/season/9/teamStats.json";
import { TeamData } from "../types";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getAllTeamIds() {
  return (
    await prisma.team.findMany({ select: { id: true } })
  ).map(({ id }) => ({ params: { id } }));
}

export async function getTeamData(id: string) {
  return prisma.team.findOne({ where: { id } });
}

export function getTeamStats(id: string) {
  return (teamStats as TeamData)[id] ?? null;
}
