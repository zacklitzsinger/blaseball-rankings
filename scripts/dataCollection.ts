import { ApiGameResult } from "../types";
const nodeFetch = require("node-fetch");
const qs = require("query-string");
const fs = require("fs");
const path = require("path");

const BASE_URL = "https://blaseball.com/database";

const games: ApiGameResult[] = [];

const season = 10;

const doStuff = async () => {
  for (let day = 1; day <= 100; day++) {
    console.log("Fetching day", day);
    const url = BASE_URL + "/games?" + qs.stringify({ day, season });
    const res = await nodeFetch(url);
    const results: ApiGameResult[] = await res.json();
    games.push(...results);
  }

  const filePath = path.join(
    __dirname,
    "../lib/data/season",
    "" + season,
    "game-data.json"
  );
  console.log("Writing to ");
  fs.writeFileSync(filePath, JSON.stringify(games));
};

doStuff();
