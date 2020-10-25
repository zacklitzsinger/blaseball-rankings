export type ApiGameResult = {
  id: string;
  awayScore: number;
  awayTeam: string;
  awayTeamName: string;
  homeScore: number;
  homeTeam: string;
  homeTeamName: string;
  gameComplete: boolean;
  // more
};

export type GameResult = {
  won: boolean;
  opponent: string;
};

export type GameData = {
  elo: number;
  eloDelta?: number;
  opponent?: string;
  runsFor: number;
  runsAgainst: number;
  wins: number;
  losses: number;
};

export type TeamData = {
  [key: string]: GameData[];
};
