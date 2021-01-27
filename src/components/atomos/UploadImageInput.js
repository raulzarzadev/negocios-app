import { Button } from "@material-ui/core";
import React from "react";
//import AvatarEditor from "react-avatar-editor";

function UploadImageInput({ handleSetImage, image }) {


  return (
    <div>
      
      
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="raised-button-file"
        type="file"
        onChange={handleSetImage}
      />
      <label htmlFor="raised-button-file">
        <Button variant="raised" component="span">
          Subir imagen{" "}
        </Button>
      </label>
    </div>
  );
}

export default UploadImageInput;
