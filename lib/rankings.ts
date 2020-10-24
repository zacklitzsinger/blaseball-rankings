import { last } from "lodash";
import teamStats from "./data/teamStats.json";

export function getTeamRankings() {
  const rankings = Object.keys(teamStats).map((team) => ({
    team,
    ...last(teamStats[team]),
  }));
  return rankings;
}
