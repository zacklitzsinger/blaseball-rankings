import { last, sumBy } from "lodash";
import teamStats from "./data/season/9/teamStats.json";

export function getTeamRankings() {
  const rankings = Object.keys(teamStats).map((team) => ({
    team,
    ...last(teamStats[team]),
    eloTrend: sumBy(
      teamStats[team].slice(Math.max(teamStats[team].length - 10, 0)),
      "eloDelta"
    ),
  }));
  return rankings;
}
