import { Typography, Box } from "@material-ui/core";
import React from "react";
import { getAllTeamIds, getTeamData } from "../../lib/teams";
import Layout from "../../components/Layout";
import TeamIcon from "../../components/TeamIcon";
import SeasonEloChart from "../../components/SeasonEloChart";
import type { Team as TeamType, Stats } from "@prisma/client";
import useSWR from "swr";
import { useRouter } from "next/router";

export async function getStaticPaths() {
  const paths = (await getAllTeamIds()).map(({ id }) => ({ params: { id } }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  const team = await getTeamData(context.params.id);
  return {
    props: {
      team,
    },
  };
}

type TeamPageProps = {
  team: TeamType;
};

export default function TeamPage({ team }: TeamPageProps) {
  // const bestGame = maxBy(stats, "eloDelta");
  // const worstGame = minBy(stats, "eloDelta");
  const {
    query: { season },
  } = useRouter();
  const { data: stats } = useSWR<Stats[]>(
    () => "/api/season/" + season + "/stats/team/" + team.id
  );

  return (
    <Layout>
      <Box display="flex" alignItems="center">
        <TeamIcon id={team.id} size={48} />
        <Typography variant="h2">{team?.fullName}</Typography>
      </Box>
      <Typography variant="caption">{/* <i>{team?.slogan}</i> */}</Typography>
      {stats && <SeasonEloChart team={team} stats={stats} />}
      {/* <Box display="flex" justifyContent="space-around">
        <Box display="flex" flexDirection="column">
          <Typography variant="h5">Best win</Typography>
          <span>
            <b>Elo Gain:</b> +{bestGame?.eloDelta}
          </span>
          <span>Day {bestGame?.gameData?.day}</span>
          <span>
            <Team id={bestGame?.gameData?.awayTeam} /> @&nbsp;
            <Team id={bestGame?.gameData?.homeTeam} />
          </span>
        </Box>
        <Box display="flex" flexDirection="column">
          <Typography variant="h5">Worst loss</Typography>
          <span>
            <b>Elo Loss:</b> {worstGame?.eloDelta}
          </span>
          <span>Day {worstGame?.gameData?.day}</span>
          <span>
            <Team id={worstGame?.gameData?.awayTeam} /> @&nbsp;
            <Team id={worstGame?.gameData?.homeTeam} />
          </span>
        </Box>
      </Box> */}
    </Layout>
  );
}
