import { ApiGameResult } from "../types";
import nodeFetch from "node-fetch";
import qs from "query-string";
import fs from "fs";
import path from "path";

const BASE_URL = "https://blaseball.com/database";

const doStuff = async (season: number) => {
  const games: ApiGameResult[] = [];
  for (let day = 0; day <= 100; day++) {
    console.log("Fetching", "S", season, "D", day);
    const url = BASE_URL + "/games?" + qs.stringify({ day, season });
    const res = await nodeFetch(url);
    const results: ApiGameResult[] = await res.json();
    games.push(...results);
  }

  const filePath = path.join(__dirname, `season${season + 1}.json`);
  console.log("Writing to ", filePath);
  fs.writeFileSync(filePath, JSON.stringify(games));
};

doStuff(1);
doStuff(2);
doStuff(3);
doStuff(4);
