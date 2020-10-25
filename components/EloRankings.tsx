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
          <TableCell></TableCell>
          <TableCell>Team</TableCell>
          <TableCell>ELO</TableCell>
          <TableCell>Wins</TableCell>
          <TableCell>Losses</TableCell>
          <TableCell>%</TableCell>
          <TableCell>RF</TableCell>
          <TableCell>RA</TableCell>
          <TableCell>RD</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedRankings.map((row, idx) => (
          <StyledTableRow key={row.team}>
            <TableCell padding="checkbox" align="right">
              {idx + 1}
            </TableCell>
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
            <TableCell>{row?.runsFor}</TableCell>
            <TableCell>{row?.runsAgainst}</TableCell>
            <TableCell>{row?.runsFor - row?.runsAgainst}</TableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  );
}
