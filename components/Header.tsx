import { AppBar, Toolbar, Typography } from "@material-ui/core";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4">
            <Link href="/">Blaseball Rankings</Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </header>
  );
}
