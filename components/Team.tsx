import { Box, Avatar } from "@material-ui/core";
import React from "react";
import teams from "../lib/data/teams.json";
import Link from "next/link";
import TeamIcon from "./TeamIcon";

export type TeamProps = {
  id: string;
};

const Team: React.FC<TeamProps> = ({ id }) => {
  const team = teams.find(({ id: teamId }) => teamId === id);
  return (
    <Box display="inline-flex" alignItems="center">
      <TeamIcon id={id} />
      <Link href={`/team/${id}`}>{team?.fullName ?? ""}</Link>
    </Box>
  );
};

export default Team;
