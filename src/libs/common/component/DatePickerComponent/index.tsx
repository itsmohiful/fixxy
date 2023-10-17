import { SxProps } from "@mui/material/styles";
import * as React from "react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldPath,
  FieldValues,
  get,
} from "react-hook-form";
import { CustomDatePicker } from "../CustomDatePicker/CustomDatePicker.component";

// @ts-ignore
interface IFormDatePickerProps<TFormType, TName extends FieldPath<TFormType>> {
  name: TName; // @ts-ignore
  control: Control<TFormType>; // @ts-ignore
  errors?: FieldErrors<TFormType>;
  label?: string;
  title?: string;
  sx?: SxProps;
  onChange?: (value: string) => void;
  color?: "error" | "info" | "primary" | "secondary" | "success" | "warning";
}

export function FormDatePicker<
  TFormType extends FieldValues,
  TName extends FieldPath<TFormType>,
>(props: IFormDatePickerProps<TFormType, TName>) {
  const { control, sx, title = "", label, color = "info" } = props;

  const error = get(props.errors || {}, props.name);

  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field }) => {
        console.log("field-value", field);
        return (
          <CustomDatePicker
            {...props}
            error={!!error?.message}
            helperText={error?.message}
            value={field.value as string}
            onChange={field.onChange}
            label={label}
            sx={{
              ...sx,
              "& .MuiFormTextField-root-uses-label": {
                "& .MuiFormLabel-root": {
                  top: "-8px",
                  "&.Mui-focused, &.MuiFormLabel-filled": {
                    top: "0",
                  },
                },
              },
            }}
          />
        );
      }}
    />
  );
}
