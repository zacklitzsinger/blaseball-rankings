import { Container, Typography } from "@material-ui/core";
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
      team,
      stats,
    },
  };
}

export default function TeamPage({ team, stats }) {
  return (
    <Layout>
      <Typography variant="h2">{team.fullName}</Typography>
      <Typography variant="caption">{team.slogan}</Typography>
      <VictoryChart
        theme={VictoryTheme.material}
        height={200}
        containerComponent={
          <VictoryVoronoiContainer
            voronoiDimension="x"
            labels={({ datum }) => `${datum.y}`}
            labelComponent={<VictoryTooltip flyoutStyle={{ fill: "white" }} />}
          />
        }
      >
        <VictoryAxis />
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
