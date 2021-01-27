import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
import MyTextInput from "../atomos/MyTextInput";
import MyButton from "../atomos/MyButton";
import AdvertCard from "../atomos/AdvertCard";
//import MyLink from "../atomos/MyLink";
import ContactInputs from "./ContactInputs";
import SelectLabels from "./SelectLabels";

import BackupIcon from "@material-ui/icons/Backup";
import MyBackButton from "../atomos/MyBackButton";
import ColorPicker from "../atomos/ColorPicker";
import UploadImageInput from "../atomos/UploadImageInput";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    //padding: theme.spacing(3),
  },
  formSeccion: {
    display: "flex",
    justifyContent: "center",
  },
}));

function getSteps() {
  return ["Titulo y descripción ", "Clasificación", "Contactos"];
}

export default function VerticalStepper({
  PageTitle,
  handleChange,
  advert,
  setAdvert,
  onSubmit,
  setImage,
  loading,
}) {
  const classes = useStyles();
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

  const [color, setColor] = useState(advert?.backgroundColor || "");
  useEffect(() => {
    setAdvert({ ...advert, backgroundColor: color });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);

  console.log(color);

  return (
    <div className={classes.root}>
      <Box m={1} textAlign="start">
        <MyBackButton />
      </Box>
      <Box m={1}>
        <Typography variant="h4">{PageTitle}</Typography>
      </Box>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>
                <Typography variant="h5">{label}</Typography>
              </StepLabel>
              <StepContent>
                <div>
                  {activeStep !== 0 && (
                    <Box m={4}>
                      <MyButton
                        variant="outlined"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.button}
                      >
                        Atras
                      </MyButton>
                    </Box>
                  )}

                  {activeStep === 0 && (
                    <Box display="flex" justifyContent="center" mt={4}>
                      <Box width="80%">
                        <MyTextInput
                          onChange={handleChange}
                          defaultValue={advert?.title}
                          name="title"
                          label="Titulo"
                        />
                        <MyTextInput
                          onChange={handleChange}
                          defaultValue={advert?.description}
                          name="description"
                          label="Descripción"
                          multiline
                          rows={4}
                        />
                      </Box>
                    </Box>
                  )}
                  {activeStep === 1 && (
                    <>
                      <SelectLabels advert={advert} setAdvert={setAdvert} />
                    </>
                  )}
                  {activeStep === 2 && (
                    <>
                      <ContactInputs advert={advert} setAdvert={setAdvert} />
                    </>
                  )}

                  <div className={classes.actionsContainer}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      Siguiente
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Box paddingY={2}>
              <ColorPicker color={color} setColor={setColor} />
              <Box>
                <UploadImageInput
                  image={advert?.image?.src}
                  handleSetImage={setImage}
                />
  
              </Box>
            </Box>

            <Box maxWidth={220} margin="0 auto">
              <AdvertCard advert={advert} />
            </Box>
            <Box m={2}>
              <MyButton
                variant="outlined"
                onClick={handleReset}
                className={classes.button}
              >
                Regresar
              </MyButton>
            </Box>
            <Box m={2}>
              <MyButton
                type="submit"
                color="primary"
                variant="contained"
                label="Guardar Anuncio"
                loading={loading}
              />
            </Box>
          </Paper>
        )}
      </form>
    </div>
  );
}
