import { Typography } from "@material-ui/core";
import React from "react";
//import ColorLensIcon from "@material-ui/icons/ColorLens";
import { CirclePicker as Picker } from "react-color";

export default function ColorPicker({ color, setColor }) {
  const handleOnChageComplete = (e) => {
    setColor(e.hex);
    console.log("color seleccionado", e.hex);
  };
  return (
    <>
      <Typography variant="h5">Color</Typography>
      <div>
        <em>Selecciona un color de fondo</em>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Picker
          id="raised-button-color"
          color={color}
          name="backgroundColor"
          onChangeComplete={handleOnChageComplete}
        />
        <label htmlFor="raised-button-color">
          {/* <Button variant="raised" component="span">
          Selecciona Color <ColorLensIcon fontSize="small" style={{ color }} />
        </Button> */}
        </label>
      </div>
    </>
  );
}
