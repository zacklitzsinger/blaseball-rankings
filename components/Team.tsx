import { Box, Avatar } from "@material-ui/core";
import React from "react";
import teams from "../lib/data/teams.json";
import Link from "next/link";

export type TeamProps = {
  id: string;
};

const Team: React.FC<TeamProps> = ({ id }) => {
  const team = teams.find(({ id: teamId }) => teamId === id);
  return (
    <Box display="flex" alignItems="center">
      <Avatar
        style={{
          backgroundColor: team?.mainColor,
          fontSize: 24,
          marginRight: 5,
        }}
      >
        {team?.emoji &&
          !isNaN(parseInt(team.emoji)) &&
          String.fromCodePoint(parseInt(team.emoji))}
      </Avatar>
      <Link href={`/team/${id}`}>{team?.fullName ?? ""}</Link>
    </Box>
  );
};

export default Team;
