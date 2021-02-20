import { makeStyles, Tooltip } from "@material-ui/core";
import React, { useState } from "react";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
const useStyles = makeStyles((theme) => ({
  filter_bar: {},
  filter_labels: {
    display: "flex",
    justifyContent: "center",
    overflow: "auto",
  },
  filter_label: {
    padding: "4px",
    margin: 4,
    cursor: "pointer",
    "& * ": {
      fontSize: "2rem",
    },
    "&:hover": {
      boxShadow: "1px 1px 1px #000",
    },
  },
}));

export default function Filtro({ handleSetFilter, labels }) {
  const classes = useStyles();
  const [filtro, setFiltro] = useState("Todos");
  const handleChangeFilter = (filter) => {
    handleSetFilter(filter);
  };

  return (
    <div className={classes.filter_bar}>
      <div className={classes.filter_labels}>
        <Tooltip title="Todos">
          <div
            className={classes.filter_label}
            style={{
              boxShadow: filtro === "Todos" && "1px 1px 1px #000",
            }}
            onClick={() => {
              handleChangeFilter("");
              setFiltro("Todos");
            }}
          >
            <ViewModuleIcon />
          </div>
        </Tooltip>
        {labels.map((label) => (
          <Tooltip title={label.label}>
            <div
              style={{
                boxShadow: filtro === label.label && "1px 1px 1px #000",
              }}
              className={classes.filter_label}
              onClick={() => {
                handleChangeFilter(label.value);
                setFiltro(label.label);
              }}
            >
              {label.icon}
            </div>
          </Tooltip>
        ))}
      </div>
      <p className={classes.filter_display}>{filtro}</p>
    </div>
  );
}
