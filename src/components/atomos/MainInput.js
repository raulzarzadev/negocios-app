import React from "react";
import { MenuItem, TextField } from "@material-ui/core";

export default function MainInput({
  multiline,
  rows,
  label,
  defaultValue,
  value,
  id,
  name,
  helperText,
  onChange,
  select,
  medium,
  options = [],
  placeholder,
}) {
  return (
    <>
      <TextField
        placeholder={placeholder}
        select={select}
        onChange={onChange}
        size="small"
        variant="outlined"
        multiline={multiline}
        rows={rows}
        value={value || defaultValue}
        label={placeholder}
        defaultValue={defaultValue}
        id={id}
        name={name}
        helperText={helperText}
        style={{ width: medium ? 250 : 150 }}
      >
        {select && (
          <MenuItem value="" disabled>
            <em>{placeholder}</em>
          </MenuItem>
        )}
        {options?.map((option) => (
          <MenuItem value={option.value}>{option.label}</MenuItem>
        ))}
      </TextField>
    </>
  );
}
