import { AppBar, Typography } from "@material-ui/core";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header>
      <AppBar position="static">
        <Typography variant="h4">
          <Link href="/">Blaseball Rankings</Link>
        </Typography>
      </AppBar>
    </header>
  );
}
