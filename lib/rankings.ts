import { last, sumBy } from "lodash";
import teamStats from "./data/season/9/teamStats.json";
import type { TeamData } from "../types";

export function getTeamRankings() {
  return Object.keys(teamStats).map((team) => {
    const stats = (teamStats as TeamData)[team];
    return {
      team,
      ...last(stats),
      eloTrend: sumBy(stats.slice(Math.max(stats.length - 10, 0)), "eloDelta"),
    };
  });
}
