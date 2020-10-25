import EloRankings from '../components/EloRankings';
import { getTeamRankings } from "../lib/rankings";
import Layout from '../components/Layout';

export async function getStaticProps() {
  const teamRankings = getTeamRankings();
  return {
    props: {
      teamRankings,
    },
  };
}

type HomeProps = {
  teamRankings: ReturnType<typeof getTeamRankings>;
}

export default function Home({ teamRankings }: HomeProps) {
  return (
    <Layout>
      <EloRankings teamRankings={teamRankings} />
    </Layout>
  )
}
