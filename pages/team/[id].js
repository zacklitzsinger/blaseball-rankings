import { Typography, Box } from "@material-ui/core";
import React from "react";
import { getAllTeamIds, getTeamData, getTeamStats } from "../../lib/teams";
import {
  VictoryChart,
  VictoryVoronoiContainer,
  VictoryAxis,
  VictoryLine,
  VictoryTheme,
  VictoryTooltip,
} from 'victory';
import Layout from '../../components/Layout';
import TeamIcon from '../../components/TeamIcon';

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
  return (
    <Layout>
      <Box display="flex" alignItems="center">
        <TeamIcon id={id} size={48} /><Typography variant="h2">{team.fullName}</Typography></Box>
      <Typography variant="caption"><i>{team.slogan}</i></Typography>
      <VictoryChart
        theme={VictoryTheme.material}
        width={1100}
        height={400}
        containerComponent={
          <VictoryVoronoiContainer
            voronoiDimension="x"
            labels={({ datum }) => `${datum.y}`}
            labelComponent={<VictoryTooltip flyoutStyle={{ fill: "white" }} />}
          />
        }
      >
        <VictoryAxis tickValues={[0, 20, 40, 60, 80, 100]} />
        <VictoryAxis tickFormat={(f) => `${f}`} dependentAxis />
        <VictoryLine
          style={{
            data: { stroke: team?.mainColor },
            parent: { border: "1px solid #ccc" },
          }}
          data={(stats).map((d, idx) => ({ x: idx, y: d?.elo }))}
        />
      </VictoryChart>
    </Layout>
  );
}
