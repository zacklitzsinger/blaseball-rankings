export type ApiGameResult = {
  id: string;
  awayScore: number;
  awayTeam: string;
  awayTeamName: string;
  awayTeamColor: string;
  awayTeamEmoji: string;
  homeScore: number;
  homeTeam: string;
  homeTeamName: string;
  homeTeamColor: string;
  homeTeamEmoji: string;
  gameComplete: boolean;
  season: number;
  day: number;
  isPostseason: boolean;
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
