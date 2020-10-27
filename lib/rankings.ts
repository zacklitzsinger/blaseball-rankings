import { getAllTeamIds } from "./teams";
import { PrismaClient, Stats } from "@prisma/client";
const prisma = new PrismaClient();

const ELO_TREND_DAYS = 10;

export async function getTeamRankings() {
  const teams = (await getAllTeamIds()).map((t) => t.id);
  const data: Record<string, Stats | null> = {};
  for (const team of teams) {
    const d = await prisma.stats.findFirst({
      orderBy: { day: "desc" },
      where: { teamId: team },
    });
    data[team] = d;
  }
  console.log("GET TEAM RANKINGS: ", data);
  return data;
}

// export function getTeamRankings() {

//   return Object.keys(teamStats).map((team) => {
//     const stats = (teamStats as TeamData)[team];
//     return {
//       team,
//       ...omit(last(stats), "gameData"),
//       eloTrend: sumBy(
//         stats.slice(Math.max(stats.length - ELO_TREND_DAYS, 0)),
//         "eloDelta"
//       ),
//     };
//   });
// }
