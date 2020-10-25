export type ApiGameResult = {
  id: string;
  awayScore: number;
  awayTeam: string;
  awayTeamName: string;
  homeScore: number;
  homeTeam: string;
  homeTeamName: string;
  gameComplete: boolean;
  season: number;
  day: number;
  // more
};

export type GameResult = {
  won: boolean;
  opponent: string;
};

export type GameData = {
  elo: number;
  eloDelta?: number;
  runsFor: number;
  runsAgainst: number;
  wins: number;
  losses: number;
  gameData: ApiGameResult;
};

export type TeamData = {
  [key: string]: GameData[];
};
