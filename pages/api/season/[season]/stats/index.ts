import { getTeamRankings } from "../../../../../lib/rankings";

export default async function handler(req: any, res: any) {
  const {
    query: { season },
  } = req;

  const rankings = await getTeamRankings(parseInt(season, 10));

  res.status(200).json(rankings);
}
