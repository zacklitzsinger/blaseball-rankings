import EloRankings from "../components/EloRankings";
import Layout from "../components/Layout";
import { Stats } from "@prisma/client";
import Link from "next/link";
import { Box, CircularProgress } from "@material-ui/core";
import { getAllSeasons } from "../lib/seasons";
import { Link as MuiLink } from "@material-ui/core";
import useSWR from "swr";
import { last } from "lodash";

export async function getServerSideProps(context: any) {
  const allSeasons = await getAllSeasons();
  const season = context.query?.season
    ? parseInt(context.query?.season, 10)
    : last(allSeasons);
  return {
    props: {
      season,
      allSeasons,
    },
  };
}

type HomeProps = {
  season: number;
  allSeasons: number[];
};

export default function Home({ season, allSeasons }: HomeProps) {
  const { data: teamRankings } = useSWR<Record<string, Stats>>(
    () => "/api/season/" + season + "/stats"
  );
  return (
    <Layout>
      <Box display="inline-flex" mb={2}>
        {allSeasons.map((s) => (
          <Link key={s} passHref href={`/?season=${s}`}>
            <MuiLink style={{ paddingRight: 10 }}>{`Season ${s}`}</MuiLink>
          </Link>
        ))}
      </Box>
      {teamRankings ? (
        <EloRankings teamRankings={teamRankings} season={season} />
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          minHeight="80vh"
        >
          <CircularProgress />
        </Box>
      )}
    </Layout>
  );
}
