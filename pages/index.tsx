import EloRankings from "../components/EloRankings";
import { getTeamRankings } from "../lib/rankings";
import Layout from "../components/Layout";
import { Stats } from "@prisma/client";

export async function getStaticProps() {
  const teamRankings = await getTeamRankings();
  return {
    props: {
      teamRankings,
    },
  };
}

type HomeProps = {
  teamRankings: Record<string, Stats | null>;
};

export default function Home({ teamRankings }: HomeProps) {
  return (
    <Layout>
      <EloRankings teamRankings={teamRankings} />
    </Layout>
  );
}
