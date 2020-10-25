import { Typography, Box } from "@material-ui/core";
import React from "react";
import { getAllTeamIds, getTeamData, getTeamStats } from "../../lib/teams";
import Layout from "../../components/Layout";
import TeamIcon from "../../components/TeamIcon";
import SeasonEloChart from "../../components/SeasonEloChart";
import { maxBy, minBy } from "lodash";
import Team from "../../components/Team";

export async function getStaticPaths() {
  const paths = getAllTeamIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const team = getTeamData(params.id);
  const stats = getTeamStats(params.id);
  return {
    props: {
      id: params.id,
      team,
      stats,
    },
  };
}

type TeamPageProps = {
  id: string;
  team: ReturnType<typeof getTeamData>;
  stats: ReturnType<typeof getTeamStats>;
};

export default function TeamPage({ id, team, stats }: TeamPageProps) {
  const bestGame = maxBy(stats, "eloDelta");
  const worstGame = minBy(stats, "eloDelta");

  return (
    <Layout>
      <Box display="flex" alignItems="center">
        <TeamIcon id={id} size={48} />
        <Typography variant="h2">{team?.fullName}</Typography>
      </Box>
      <Typography variant="caption">
        <i>{team?.slogan}</i>
      </Typography>
      <SeasonEloChart team={team} stats={stats} />
      <Box display="flex" justifyContent="space-around">
        <Box display="flex" flexDirection="column">
          <Typography variant="h5">Best win</Typography>
          <span>
            <b>Elo Gain:</b> +{bestGame?.eloDelta}
          </span>
          <span>Day {bestGame?.gameData?.day}</span>
          <span>
            <Team id={bestGame?.gameData?.awayTeam} /> @&nbsp;
            <Team id={bestGame?.gameData?.homeTeam} />
          </span>
        </Box>
        <Box display="flex" flexDirection="column">
          <Typography variant="h5">Worst loss</Typography>
          <span>
            <b>Elo Loss:</b> {worstGame?.eloDelta}
          </span>
          <span>Day {worstGame?.gameData?.day}</span>
          <span>
            <Team id={worstGame?.gameData?.awayTeam} /> @&nbsp;
            <Team id={worstGame?.gameData?.homeTeam} />
          </span>
        </Box>
      </Box>
    </Layout>
  );
}
