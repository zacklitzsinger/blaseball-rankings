import { last, omit, sumBy } from "lodash";
import teamStats from "./data/season/9/teamStats.json";
import type { TeamData } from "../types";

const ELO_TREND_DAYS = 10;

export function getTeamRankings() {
  return Object.keys(teamStats).map((team) => {
    const stats = (teamStats as TeamData)[team];
    return {
      team,
      ...omit(last(stats), "gameData"),
      eloTrend: sumBy(
        stats.slice(Math.max(stats.length - ELO_TREND_DAYS, 0)),
        "eloDelta"
      ),
    };
  });
}
