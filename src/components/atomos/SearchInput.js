import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useBarrios } from "../../hooks/useBarrios";
import MyLink from "./MyLink";

const useStyles = makeStyles((theme) => ({
  searchInput: { position: "static" },
  input: {
    textAlign: "center",
    border: "none",
    borderRadius: theme.spacing(1),
  },
  search_result: {
    position: "absolute",
    bottom: "100%",
    left: "calc(50% - 150px)",
    width: 300,
    textAlign: "center",
  },
  search_list: {
    listStyle: "none",
    padding: theme.spacing(1),
    margin: 0,
  },
  search_item: {
    cursor: "pointer",
    padding: theme.spacing(0.5),
    background: " #fff",
    margin: theme.spacing(0.5),
    borderRadius: theme.spacing(1),
    "&:hover": {
      boxShadow: "0px 2px 17px 4px rgb(0 0 0 / 100%)",
    },
  },
}));
export default function SearchInput() {
  const classes = useStyles();
  const { getBarrios } = useBarrios();
  const [input, setInput] = useState("");
  const [barrios, setBarrios] = useState();
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    getBarrios().then((res) => setBarrios(res.data.barrios));
  }, []);

  const handleChange = (e) => {
    const searchTerm = e.target.value;
    setInput(searchTerm);
    if (searchTerm === "") return setSearchResults(null);
    const res = barrios.filter((barrio) =>
      barrio.name.toLowerCase().includes(searchTerm)
    );
    setSearchResults(res);
    setDisplayNone(false);
  };
  const [displayNone, setDisplayNone] = useState(false);

  const handleChangeDisplay = (display) => {
    setDisplayNone(display);
  };

  return (
    <div className={classes.searchInput}>
      <input
        value={input}
        type="text"
        placeholder="Buscar un barrio"
        className={classes.input}
        onChange={handleChange}
      />

      {searchResults && (
        <div
          className={classes.search_result}
          style={{ display: displayNone ? "none" : "block" }}
        >
          <ul className={classes.search_list}>
            {searchResults?.map((item) => (
              <MyLink
                to={`/${item.shortName}`}
                onClick={() => handleChangeDisplay(true)}
              >
                <li className={classes.search_item} key={item.id}>
                  {item.name}
                </li>
              </MyLink>
            ))}
            {searchResults.length === 0 && (
              <li
                className={classes.search_item}
                onClick={() => {
                  setInput("");
                  setSearchResults(null);
                }}
              >
                No se econtraron barrios... (borrar)
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
