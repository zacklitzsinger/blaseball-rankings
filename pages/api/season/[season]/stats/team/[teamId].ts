import { getTeamStats } from "../../../../../../lib/teams";

export default async function handler(req: any, res: any) {
  const {
    query: { season, teamId },
  } = req;

  const rankings = await getTeamStats(teamId, parseInt(season, 10));

  res.status(200).json(rankings);
}
