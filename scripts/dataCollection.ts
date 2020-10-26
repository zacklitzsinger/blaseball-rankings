// import { ApiGameResult } from "../types";
// import nodeFetch from "node-fetch";
// import qs from "query-string";
// import fs from "fs";
// import path from "path";
import results from "../lib/data/season/8/game-data.json";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const doStuff = async () => {
  prisma.$connect();
  for (let r of results) {
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
};

doStuff()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
