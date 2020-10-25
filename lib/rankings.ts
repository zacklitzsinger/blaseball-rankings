import { last } from "lodash";
import teamStats from "./data/season/9/teamStats.json";

export function getTeamRankings() {
  const rankings = Object.keys(teamStats).map((team) => ({
    team,
    ...last(teamStats[team]),
  }));
  return rankings;
}
