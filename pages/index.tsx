import EloRankings from "../components/EloRankings";
import { getTeamRankings } from "../lib/rankings";
import Layout from "../components/Layout";
import { Stats } from "@prisma/client";
import Link from "next/link";
import { Box } from "@material-ui/core";
import { getAllSeasons } from "../lib/seasons";
import { Link as MuiLink } from "@material-ui/core";

export async function getServerSideProps(context: any) {
  const season = context.query?.season
    ? parseInt(context.query?.season, 10)
    : null;
  const teamRankings = await getTeamRankings(season);
  const allSeasons = await getAllSeasons();
  return {
    props: {
      season,
      allSeasons,
      teamRankings,
    },
  };
}

type HomeProps = {
  teamRankings: Record<string, Stats | null>;
  season: number;
  allSeasons: number[];
};

export default function Home({ teamRankings, season, allSeasons }: HomeProps) {
  return (
    <Layout>
      <Box display="inline-flex">
        {allSeasons.map((s) => (
          <Link key={s} passHref href={`/?season=${s}`}>
            <MuiLink style={{ paddingRight: 10 }}>{`Season ${s}`}</MuiLink>
          </Link>
        ))}
      </Box>
      <EloRankings teamRankings={teamRankings} season={season} />
    </Layout>
  );
}
