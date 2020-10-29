// Creates ELO statistics

import type { ApiGameResult, GameData, TeamData } from "../types";
import EloRank from "elo-rank";
import { last } from "lodash";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ELO_K = 15;
const INITIAL_RATING = 1500;

const calc = async (season: number) => {
  console.log("Calculating elo for season", season);
  const data: ApiGameResult[] = require(path.join(
    __dirname,
    `season${season}.json`
  ));

  const teamData: TeamData = {};

  const elo = new EloRank(ELO_K);

  const initialData: GameData = {
    elo: INITIAL_RATING,
    runsFor: 0,
    runsAgainst: 0,
    wins: 0,
    losses: 0,
    gameData: null,
  } as any;

  data.forEach((gr) => {
    const { awayTeam, homeTeam, homeScore, awayScore } = gr;
    if (homeScore === awayScore || !gr.gameComplete || gr.isPostseason) {
      return;
    }
    const hlast: GameData = last(teamData[homeTeam]) ?? initialData;
    const alast: GameData = last(teamData[awayTeam]) ?? initialData;

    const helo = hlast.elo;
    const aelo = alast.elo;
    const expectedScoreHome = elo.getExpected(helo, aelo);
    const expectedScoreAway = elo.getExpected(aelo, helo);
    const won = homeScore > awayScore ? 1 : 0;
    const homeRating = elo.updateRating(expectedScoreHome, won, helo);
    const awayRating = elo.updateRating(expectedScoreAway, 1 - won, aelo);
    teamData[homeTeam] = teamData[homeTeam] ?? [];
    teamData[awayTeam] = teamData[awayTeam] ?? [];
    teamData[homeTeam].push({
      elo: homeRating,
      eloDelta: homeRating - hlast.elo,
      runsFor: hlast.runsFor + homeScore,
      runsAgainst: hlast.runsAgainst + awayScore,
      wins: hlast.wins + (won ? 1 : 0),
      losses: hlast.losses + (won ? 0 : 1),
      gameData: gr,
    });
    teamData[awayTeam].push({
      elo: awayRating,
      eloDelta: awayRating - alast.elo,
      runsFor: alast.runsFor + awayScore,
      runsAgainst: alast.runsAgainst + homeScore,
      wins: alast.wins + (won ? 0 : 1),
      losses: alast.losses + (won ? 1 : 0),
      gameData: gr,
    });
  });

  const doStuff = async () => {
    console.log("Writing data to db for season", season);
    for (const tid in teamData) {
      const games = teamData[tid];
      for (const g of games) {
        await prisma.stats.create({
          data: {
            season: season,
            day: g.gameData.day,
            elo: g.elo,
            eloDelta: g.eloDelta as number,
            wins: g.wins,
            losses: g.losses,
            team: {
              connect: {
                id: tid,
              },
            },
            runsFor: g.runsFor,
            runsAgainst: g.runsAgainst,
          },
        });
      }
    }
  };

  await doStuff();
};

const doAll = async () => {
  for (const season of [9]) {
    await calc(season);
  }
};
doAll()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    console.log("Done");
    await prisma.$disconnect();
  });
