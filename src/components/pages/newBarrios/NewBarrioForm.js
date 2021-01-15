import React from "react";
import {
  Button,
  Grid,
  makeStyles,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
  Box,
} from "@material-ui/core";
import { ESTADOS_LABEL_MX } from "../../../HardData/ESTADOS_MX";
import MyBackButton from "../../atomos/MyBackButton";
import MainInput from "../../atomos/MainInput";
import MyButton from "../../atomos/MyButton";

const useStyles = makeStyles((theme) => ({
  inputsGrid: {
    marginTop: theme.spacing(6),
    height: 180,
  },
  newBarrioCard: {
    height: 180,
  },
}));

export default function NewBarrioForm({ alert, handleSubmit, loading }) {
  const classes = useStyles();
  const [statesList] = React.useState(ESTADOS_LABEL_MX);
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  //console.log(watch("name"));
  const [form, setForm] = React.useState({});

  const handleSelectState = (e) => {
    setForm({
      ...form,
      state: e.target.value,
      stateData: statesList.find((state) => state.value === e.target.value),
    });
  };
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  function getSteps() {
    return ["¿Dónde?", "Nombre Completo", "Nombre corto"];
  }

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        /* Entre mas info mejor para ti y tus clientes */
        return "Selecciona el lugar donde está este barrio";
      case 1:
        return "Escribe el nombre completo del barrio";
      case 2:
        return "Escribe un nombre corto. Este debe ser único";
      default:
        return "Unknown stepIndex";
    }
  }

  return (
    <div className={classes.newBarrioContent}>
      {alert}
      <Box m={1} textAlign="start">
        <MyBackButton />
      </Box>
      <Box m={1}>
        <Typography variant="h4">Nuevo barrio</Typography>
      </Box>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(form);
          }}
          autoComplete="on"
        >
          {activeStep === steps.length ? (
            <Paper>
              <Box p={2}>
                <Typography className={classes.instructions}>
                  Verifica sí la información es correcta.
                </Typography>
                <Box className={classes.newBarrioCard}>
                  <Typography>
                    <em>Lugar:</em>
                  </Typography>
                  <Typography variant="h5">{form?.stateData?.label}</Typography>
                  <Typography>
                    <em>Nombre:</em>
                  </Typography>
                  <Typography variant="h6">{form?.name}</Typography>
                  <Typography>
                    <em>Nombre corto:</em>
                  </Typography>
                  <Typography variant="h6">{form?.shortName}</Typography>
                </Box>
                <Box m={2} display="flex" justifyContent="space-around">
                  <Button onClick={handleReset}>Regresar</Button>
                  <MyButton
                    loading={loading}
                    type="submit"
                    color="primary"
                    variant="contained"
                  >
                    Guardar
                  </MyButton>
                </Box>
              </Box>
            </Paper>
          ) : (
            <div>
              <Paper>
                <Typography className={classes.instructions}>
                  {getStepContent(activeStep)}
                </Typography>
                <Grid container spacing={2} className={classes.inputsGrid}>
                  <Grid
                    item
                    xs={12}
                    style={{ display: activeStep === 0 || "none" }}
                  >
                    <MainInput
                      select
                      medium
                      label="Estado"
                      name="stateLabel"
                      options={statesList}
                      value={form?.stateData?.value}
                      placeholder="Selecciona un Estado"
                      onChange={handleSelectState}
                      helperText="[Solo en México, por ahora]"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    style={{ display: activeStep === 1 || "none" }}
                  >
                    <MainInput
                      value={form.name}
                      medium
                      name="name"
                      onChange={handleChange}
                      label="Nombre del barrio"
                      variant="outlined"
                      placeholder="Barrio"
                      helperText="[Ej. Villas de La Hacienda, Atizapán]"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    style={{ display: activeStep === 2 || "none" }}
                  >
                    <MainInput
                      value={form.shortName}
                      medium
                      name="shortName"
                      label="Nombre corto"
                      variant="outlined"
                      onChange={handleChange}
                      placeholder="Nombre Corto"
                      helperText="[ Ej. lasvillas]"
                    />
                  </Grid>
                </Grid>

                <Box p={2} display="flex" justifyContent="space-around">
                  <Box>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.backButton}
                    >
                      Atras
                    </Button>
                  </Box>
                  <Box>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                    >
                      Siguiente
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
