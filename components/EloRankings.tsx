import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  createStyles,
  Theme,
  withStyles,
} from "@material-ui/core";
import { orderBy } from "lodash";
import React from "react";
import Team from "./Team";

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

export type EloRankingsProps = { teamRankings: any };

export default function EloRankings({ teamRankings }) {
  const sortedRankings = orderBy(teamRankings, "elo", "desc");
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Team</TableCell>
          <TableCell>ELO</TableCell>
          <TableCell>Wins</TableCell>
          <TableCell>Losses</TableCell>
          <TableCell>%</TableCell>
          <TableCell>Run Differential</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedRankings.map((row) => (
          <StyledTableRow key={row.team}>
            <TableCell>
              <Team id={row.team} />
            </TableCell>
            <TableCell>{row?.elo}</TableCell>
            <TableCell>{row?.wins}</TableCell>
            <TableCell>{row?.losses}</TableCell>
            <TableCell>
              {Math.round((row?.wins / (row?.wins + row?.losses)) * 1000) /
                1000}
            </TableCell>
            <TableCell>{row?.runDifferential}</TableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  );
}
