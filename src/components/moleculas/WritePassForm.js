import React from "react";
import { Box, Button, CircularProgress, TextField } from "@material-ui/core";

export default function WritePassForm({
  handleChange,
  handleSubmit,
  loading,
  state = {},
}) {
  console.log(state);
  const passwordEqual = !(state?.password === state?.passwordConfirm);
  const dirty = state.password !== "";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Box m={2}>
        <TextField
          onChange={handleChange}
          value={state.pasword}
          type="password"
          name="password"
          label="Contraseña"
          variant="outlined"
        />
      </Box>
      <Box m={2}>
        <TextField
          onChange={handleChange}
          value={state.passwordConfirm}
          type="password"
          name="passwordConfirm"
          label="Confirma tu contraseña"
          variant="outlined"
          helperText={
            !dirty || (passwordEqual && "las contraseñas deben coincidir")
          }
        />
      </Box>
      <Box m={2}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Button
            disabled={passwordEqual}
            variant="contained"
            color="primary"
            type="submit"
          >
            Enviar
          </Button>
        )}
      </Box>
    </form>
  );
}
