import React from "react";
import {
  VictoryChart,
  VictoryVoronoiContainer,
  VictoryAxis,
  VictoryLine,
  VictoryTheme,
  VictoryTooltip,
} from "victory";

type SeasonEloChartProps = {
  team?: { mainColor: string };
  stats?: { elo: number }[];
};

export default function SeasonEloChart({ team, stats }: SeasonEloChartProps) {
  if (!stats) {
    return null;
  }
  return (
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
        data={stats.map((d, idx) => ({ x: idx, y: d?.elo }))}
      />
    </VictoryChart>
  );
}
