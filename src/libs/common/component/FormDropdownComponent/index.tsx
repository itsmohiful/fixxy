import { OverridableStringUnion } from "@mui/types";
import * as React from "react";
import TextField, {
  TextFieldPropsColorOverrides,
} from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller } from "react-hook-form";

interface FormDropDownComponentProps {
  name: string;
  control: any; // pass the 'control' from useForm
  label?: string;
  // @ts-ignore
  color?: "error" | "info" | "primary" | "secondary" | "success" | "warning";
  options: { id: string; label: string }[];
  error: boolean;
  helperText?: string;
  required?: boolean;
  onChange: (id: string) => void;
}

export default function FromDropDownComponent({
  name,
  control,
  label = "",
  options = [{ id: "", label: "" }],
  error,
  color = "info",
  helperText = "",
  required = false,
  onChange,
}: FormDropDownComponentProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange: onFieldChange, onBlur, value, name, ref },
      }) => (
        <Autocomplete
          id="country-select-demo"
          sx={{ width: 300 }}
          options={options}
          autoHighlight
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(e, data) => {
            const selectedId = data ? data.id : ""; // Extract the id from the selected option
            onChange(selectedId); // Pass only the id to the onChange function
            onFieldChange(data); // Update the field value
          }}
          onBlur={onBlur}
          value={value}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              error={error}
              helperText={helperText}
              inputRef={ref}
              required={required}
              color={color}
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password", // disable autocomplete and autofill
              }}
            />
          )}
        />
      )}
    />
  );
}
