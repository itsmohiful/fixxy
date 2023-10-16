import { FormLabel, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { SxProps } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import { DatePicker } from "@mui/x-date-pickers";
import * as React from "react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldPath,
  get,
} from "react-hook-form";

interface IFormDatePickerProps<TFormType, TName extends FieldPath<TFormType>> {
  name: TName;
  control: Control<TFormType>;
  errors?: FieldErrors<TFormType>;
  label?: string;
  title?: string;
  sx?: SxProps;
  onChange?: (value: string) => void;
}

export function FormDatePicker<TFormType, TName extends FieldPath<TFormType>>(
  props: IFormDatePickerProps<TFormType, TName>,
) {
  const { control, name, onChange, sx, title = "", label, errors } = props;

  const error = get(errors || {}, name);
  // const onChangeHandler = (value: Date | null) => {
  //   if (onChange) {
  //     if (value?.getTime && !isNaN(value.getTime())) {
  //       onChange(format(value, "yyyy-MM-dd"));
  //     } else {
  //       onChange("");
  //     }
  //   }
  // };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <DatePicker
            onChange={(value: Date | null) => {
              if (value?.getTime && !isNaN(value.getTime())) {
                field?.onChange(format(value, "yyyy-MM-dd"));
              } else {
                field?.onChange("");
              }
            }}
            label={label}
            renderInput={(params) => {
              return (
                <Box>
                  {title && <FormLabel>{title}</FormLabel>}
                  <Box
                    className={label ? "MuiFormTextField-root-uses-label" : ""}
                  >
                    <TextField {...params} />
                  </Box>
                  {error && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: "5px",
                        "& .uiFormHelperText": {
                          m: 0,
                        },
                      }}
                    >
                      <Typography variant="body2" component="span">
                        {error}
                      </Typography>
                    </Box>
                  )}
                </Box>
              );
            }}
          />
        );
      }}
    />
  );
}
