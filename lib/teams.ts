import teams from "./data/teams.json";
import teamStats from "./data/teamStats.json";

export function getAllTeamIds() {
  return teams.map((t) => ({ params: { id: t.id } }));
}

export function getTeamData(id) {
  return teams.find((t) => t.id === id);
}

export function getTeamStats(id) {
  return teamStats[id];
}
