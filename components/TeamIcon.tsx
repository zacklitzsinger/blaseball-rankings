import { Avatar } from "@material-ui/core";
import React from "react";
import teams from "../lib/data/teams.json";

export type TeamProps = {
  id: string;
  size?: number;
};

const TeamIcon: React.FC<TeamProps> = ({ id, size = 30 }) => {
  const team = teams.find(({ id: teamId }) => teamId === id);
  return (
    <Avatar
      style={{
        backgroundColor: team?.mainColor,
        fontSize: (size * 2) / 3,
        width: size,
        height: size,
        marginRight: 5,
      }}
    >
      {team?.emoji &&
        !isNaN(parseInt(team.emoji)) &&
        String.fromCodePoint(parseInt(team.emoji))}
    </Avatar>
  );
};

export default TeamIcon;
