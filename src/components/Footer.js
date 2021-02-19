import React from "react";
import { makeStyles } from "@material-ui/core";
import MyLink from "./atomos/MyLink";
import negdelbar_logo from "../assets/negdelbar_logo.png";
import { Search } from "@material-ui/icons";
import SearchInput from "./atomos/SearchInput";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "sticky",
    bottom: 0,
    left: 0,
    right: 0,
  },
  searchBox: {
    margin: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
  },

  reference: {
    fontSize: ".7rem",
    margin: 4,
    textAlign: "center",
  },
}));

export default function Footer(minHeight) {
  const classes = useStyles();
  return (
    <div className={classes.footer} style={{ minHeight }}>
      <div>
        <div className={classes.searchBox}>
          <SearchInput />
        </div>
      </div>
      <div>
        <p className={classes.reference}>
          Una app de
          <a href="https://www.raulzarza.com" target="__blank">
            RZ
          </a>
        </p>
      </div>
    </div>
  );
}
