import teams from "./data/teams.json";
import teamStats from "./data/season/9/teamStats.json";
import { TeamData } from "../types";

export function getAllTeamIds() {
  return teams.map((t) => ({ params: { id: t.id } }));
}

export function getTeamData(id: string) {
  return teams.find((t) => t.id === id);
}

export function getTeamStats(id: string) {
  return (teamStats as TeamData)[id];
}
