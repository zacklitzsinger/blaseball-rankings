import { PrismaClient } from "@prisma/client";
import { ApiGameResult } from "../types";

const prisma = new PrismaClient();

const doStuff = async (season: number) => {
  const results: ApiGameResult[] = require(`./season${season}.json`);
  console.log("Importing season", season);
  for (let r of results) {
    if (r.isPostseason) {
      return;
    }
    await prisma.game.create({
      data: {
        id: r.id,
        awayScore: r.awayScore,
        homeScore: r.homeScore,
        day: r.day,
        season: r.season,
        awayTeam: {
          connectOrCreate: {
            where: { id: r.awayTeam },
            create: {
              id: r.awayTeam,
              fullName: r.awayTeamName,
              emoji: r.awayTeamEmoji,
              mainColor: r.awayTeamColor,
              slogan: "",
            },
          },
        },
        homeTeam: {
          connectOrCreate: {
            where: { id: r.homeTeam },
            create: {
              id: r.homeTeam,
              fullName: r.homeTeamName,
              emoji: r.homeTeamEmoji,
              mainColor: r.homeTeamColor,
              slogan: "",
            },
          },
        },
      },
    });
  }
  console.log("Done");
};

const doAll = async () => {
  for (let season of [2, 3, 4, 5, 6, 7, 8, 9, 10]) {
    await doStuff(season);
  }
};

doAll()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
