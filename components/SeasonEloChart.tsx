import { Paper } from "@material-ui/core";
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
  stats?: { elo: number }[];
};

export default function SeasonEloChart({ stats }: SeasonEloChartProps) {
  if (!stats) {
    return null;
  }
  return (
    <Paper>
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
            data: { stroke: "black" },
            parent: { border: "1px solid #ccc" },
          }}
          data={stats.map((d, idx) => ({ x: idx, y: d?.elo }))}
        />
      </VictoryChart>
    </Paper>
  );
}
