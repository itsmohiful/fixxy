import { FormHelperText, FormLabel } from "@mui/material";
import Box from "@mui/material/Box";
import { SxProps, Theme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers";
import { format } from "date-fns";
import * as React from "react";
import { useMemo } from "react";

type InputFormatType = "dd/MM/yyyy" | "dd-MM-yyyy";
type ColorType =
  | "error"
  | "info"
  | "primary"
  | "secondary"
  | "success"
  | "warning";

type TAutoComplete = "off" | "on";

/* eslint-disable-next-line */
export interface CustomPickerPropsType {
  title?: React.ReactNode;
  color?: ColorType;
  variant?: "outlined" | "filled" | "standard";
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: React.ReactNode;
  placeholder?: string;
  label?: string;
  fullWidth?: boolean;
  size?: "medium" | "small";
  autoComplete?: TAutoComplete;
  value?: string;
  name?: string;
  className?: string;
  maxDate?: Date;
  minDate?: Date;
  defaultCalendarMonth?: Date;
  sx?: SxProps<Theme>;
  onChange?: (value: string) => void;
  views?: Array<"day" | "month" | "year">;
  readonly?: boolean;
  disableFuture?: boolean;
  disablePast?: boolean;
  inputFormat?: InputFormatType;
}

export function CustomDatePicker(props: CustomPickerPropsType) {
  const {
    variant = "outlined",
    required,
    disabled,
    title,
    error,
    helperText,
    placeholder,
    label,
    size = "medium",
    sx = {},
    fullWidth,
    color,
    autoComplete = "off",
    value,
    onChange,
    className,
    name,
    maxDate,
    minDate,
    defaultCalendarMonth,
    views = ["year", "month", "day"],
    readonly = true,
    disableFuture = false,
    disablePast = false,
    inputFormat = "dd/MM/yyyy",
  } = props;

  const onChangeHandler = (value: any) => {
    if (onChange) {
      if (value["$d"] && !isNaN(value["$d"])) {
        onChange(format(value["$d"], "yyyy-MM-dd"));
      } else {
        onChange("");
      }
    }
  };
  const getValue = useMemo(() => {
    if (!value) return "";
    // @ts-ignore
    return new Date(value);
  }, [value]);
  return (
    <DatePicker
      defaultCalendarMonth={defaultCalendarMonth}
      //@ts-ignore
      value={value}
      onChange={onChangeHandler}
      maxDate={maxDate}
      minDate={minDate}
      views={views}
      // @ts-ignore
      inputFormat={inputFormat}
      label={label}
      disabled={disabled}
      disablePast={disablePast}
      disableFuture={disableFuture}
      //@ts-ignore
      renderInput={(params) => {
        return (
          <Box sx={{ mt: 1 } as SxProps<Theme>}>
            {title && (
              <Box sx={{ pr: 1 }}>
                <FormLabel
                  sx={{
                    fontSize: "0.8em",
                    color: "#373737",
                    background: "none",
                  }}
                  error={error}
                  // className={classNames(className)}
                  component={"label"}
                >
                  {title}
                  {/*<Box component="span" sx={{ color: 'red', pl: 0.2, pr: 1 }}>*/}
                  {/*    {content}*/}
                  {/*</Box>*/}
                </FormLabel>
              </Box>
            )}
            <Box className={label ? "MuiFormTextField-root-uses-label" : ""}>
              <TextField
                {...params}
                inputProps={{
                  ...params.inputProps,
                  readOnly: readonly,
                }}
                name={name}
                className={className}
                color={color}
                required={required}
                autoComplete={autoComplete}
                fullWidth={fullWidth}
                error={error}
                variant={variant}
                disabled={disabled}
                helperText={undefined}
                size={size}
                placeholder={placeholder}
                sx={{
                  backgroundColor: disabled ? "#f5f5f5" : "#fff",
                  fontStyle: disabled ? "italic" : "normal",
                }}
              />
            </Box>
            {helperText && (
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
                <FormHelperText
                  error={error}
                  sx={sx}
                  // className={classNames('uiFormHelperText', className)}
                >
                  {helperText}
                </FormHelperText>
              </Box>
            )}
          </Box>
        );
      }}
    />
  );
}
