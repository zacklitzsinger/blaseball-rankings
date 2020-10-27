import { Box, Avatar } from "@material-ui/core";
import React from "react";
import teams from "../lib/data/teams.json";
import Link from "next/link";
import TeamIcon from "./TeamIcon";
import queryString from "query-string";

export type TeamProps = {
  id?: string;
  season?: number;
};

const Team: React.FC<TeamProps> = ({ id, season }) => {
  if (!id) {
    return null;
  }
  const team = teams.find(({ id: teamId }) => teamId === id);
  return (
    <Box display="inline-flex" alignItems="center">
      <TeamIcon id={id} />
      <Link
        href={queryString.stringifyUrl({
          url: `/team/${id}`,
          query: { season },
        })}
      >
        {team?.fullName ?? ""}
      </Link>
    </Box>
  );
};

export default Team;
