import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  createStyles,
  Theme,
  withStyles,
  Box,
} from "@material-ui/core";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { Stats } from "@prisma/client";
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

export type EloRankingsProps = { teamRankings: Record<string, Stats | null> };

export default function EloRankings({ teamRankings }: EloRankingsProps) {
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
        {sortedRankings.map(
          (row, idx) =>
            row && (
              <StyledTableRow key={row.teamId}>
                <TableCell padding="checkbox" align="right">
                  {idx + 1}
                </TableCell>
                <TableCell>
                  <Team id={row.teamId} />
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    {row.elo}
                    {row.eloDelta > 20 && <ArrowUpward htmlColor="green" />}
                    {row.eloDelta < -20 && <ArrowDownward htmlColor="red" />}
                  </Box>
                </TableCell>
                <TableCell>{row.wins}</TableCell>
                <TableCell>{row.losses}</TableCell>
                <TableCell>
                  {Math.round((row.wins / (row.wins + row.losses)) * 1000) /
                    1000}
                </TableCell>
                <TableCell>{row.runsFor}</TableCell>
                <TableCell>{row.runsAgainst}</TableCell>
                <TableCell>{row.runsFor - row.runsAgainst}</TableCell>
              </StyledTableRow>
            )
        )}
      </TableBody>
    </Table>
  );
}
