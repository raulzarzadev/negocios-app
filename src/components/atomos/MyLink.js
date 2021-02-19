import { makeStyles } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: "#000",
    "&:hover": {
      color: "#000",
      textDecoration: "none",
      fontWeight: 500,
    },
  },
  decoratedLink: {
    border: "1px solid",
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
  },
}));

export default function MyLink({
  to,
  children,
  component,
  decorated,
  onClick,
}) {
  const classes = useStyles();
  return (
    <Link
      onClick={onClick}
      className={classes.link}
      to={to}
      component={component}
    >
      {children}
    </Link>
  );
}
