import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import styles from "../styles/Home.module.css";
import theme from "../components/theme";
import Header from "../components/Header";
import { Container } from "@material-ui/core";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Blaseball Rankings</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <Header />
        <Container>{children}</Container>

        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
          </a>
        </footer>
      </ThemeProvider>
    </>
  );
}
