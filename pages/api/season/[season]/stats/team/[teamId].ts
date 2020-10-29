import { getTeamStats } from "../../../../../../lib/teams";

export default async function handler(req: any, res: any) {
  const {
    query: { season, teamId },
  } = req;

  if (!season) {
    res.status(400).json({ message: "Missing season parameter" });
  }

  if (isNaN(parseInt(season, 10))) {
    res.status(400).json({ message: "Season provided is not a number" });
  }

  if (!teamId) {
    res.status(400).json({ message: "Missing team id" });
  }

  const rankings = await getTeamStats(teamId, parseInt(season, 10));

  res.status(200).json(rankings);
}
