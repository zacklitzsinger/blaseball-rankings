import { Typography, Box, Card } from "@material-ui/core";
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

export async function getStaticProps({ params }) {
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

export default function TeamPage({ id, team, stats }) {
  const bestGame = maxBy<any>(stats, "eloDelta");
  const worstGame = minBy<any>(stats, "eloDelta");

  return (
    <Layout>
      <Box display="flex" alignItems="center">
        <TeamIcon id={id} size={48} />
        <Typography variant="h2">{team.fullName}</Typography>
      </Box>
      <Typography variant="caption">
        <i>{team.slogan}</i>
      </Typography>
      <SeasonEloChart team={team} stats={stats} />
      <Box display="flex" flexDirection="column">
        <Typography variant="h4">Best win</Typography>
        <span>
          <b>Elo Gain:</b> +{bestGame?.eloDelta}
        </span>
        <span>
          <b>Opponent:</b> <Team id={bestGame?.opponent} />
        </span>
      </Box>
      <Box display="flex" flexDirection="column">
        <Typography variant="h4">Worst loss</Typography>
        <span>
          <b>Elo Loss:</b> {worstGame?.eloDelta}
        </span>
        <span>
          <b>Opponent:</b> <Team id={worstGame?.opponent} />
        </span>
      </Box>
    </Layout>
  );
}
