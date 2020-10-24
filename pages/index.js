import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import styles from '../styles/Home.module.css'
import EloRankings from '../components/EloRankings';
import { getTeamRankings } from "../lib/rankings";
import theme from '../components/theme';
import { Container, Typography } from '@material-ui/core';

export async function getStaticProps() {
  const teamRankings = getTeamRankings();
  return {
    props: {
      teamRankings,
    },
  };
}

export default function Home({ teamRankings }) {
  return (
    <>
      <Head>
        <title>Blaseball Rankings</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <Typography variant="h3">
            Blaseball Rankings
          </Typography>
          <EloRankings teamRankings={teamRankings} />
        </Container>

        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
          </a>
        </footer>
      </ThemeProvider>
    </>
  )
}
