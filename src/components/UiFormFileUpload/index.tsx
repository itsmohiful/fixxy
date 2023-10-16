import { FormHelperText } from "@mui/material";
import Box from "@mui/material/Box";
import {
  Control,
  Controller,
  FieldErrors,
  FieldPath,
  get,
} from "react-hook-form";
import { IUiFileUploadProps, UiFileUpload } from "../UiFileUpload";

type TUiFormFileUploadProps<
  TFormType,
  TName extends FieldPath<TFormType>,
> = IUiFileUploadProps & {
  name: TName;
  control: Control<TFormType>;
  errors?: FieldErrors<TFormType>;
  multiple?: boolean;
  afterChange?: (data: any) => void;
  afterDelete?: (data: any) => void;
};

export function UiFormFileUpload<TFormType, TName extends FieldPath<TFormType>>(
  props: TUiFormFileUploadProps<TFormType, TName>,
) {
  const error = get(props.errors || {}, props.name);
  const { afterDelete } = props;
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field }) => {
        const formValues: string[] = Array.isArray(field.value)
          ? !props.multiple
            ? [field.value]
            : [...field.value, ""]
          : [field.value];

        const onChangeHandler = (fileName: string, inputName: string) => {
          if (!Array.isArray(field.value)) {
            field.onChange(fileName);
          } else if (Array.isArray(field.value)) {
            field.onChange([...field.value, fileName]);
          }
        };
        const onRemoveHandler = (fileName: string, inputName: string) => {
          if (!Array.isArray(field.value)) {
            field.onChange("");
          } else if (Array.isArray(field.value)) {
            const fieldValue: string[] = field.value;
            const fileIndex = Number(inputName.split(".").pop());
            fieldValue.splice(fileIndex, 1);
            field.onChange(fieldValue);
          }
          afterDelete && afterDelete({ value: fileName, name: inputName });
        };
        let uploadComponentIsFirstMount = true;
        const getTitle = () => {
          if (uploadComponentIsFirstMount) {
            uploadComponentIsFirstMount = false;
            return props.title;
          }
          return "";
        };
        const originalFileName = props.originalFileName || "";
        const getOriginalFileName = (index: number) => {
          if (Array.isArray(originalFileName)) {
            return originalFileName[index];
          }
          return originalFileName;
        };
        return (
          <Box sx={{ width: "100%" }}>
            <Box sx={{ width: "100%" }}>
              {formValues.map((value, formValueIndex) => (
                <UiFileUpload
                  key={formValueIndex}
                  {...props}
                  error={!!error?.message}
                  originalFileName={getOriginalFileName(formValueIndex)}
                  title={getTitle()}
                  value={value}
                  name={
                    Array.isArray(field.value)
                      ? `${props.name}.${formValueIndex}`
                      : props.name
                  }
                  onChange={onChangeHandler}
                  fileOnRemove={onRemoveHandler}
                />
              ))}
            </Box>
            {!!error?.message && (
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
                {/*<UiIcon*/}
                {/*  iconName="icon-error"*/}
                {/*  color={'error'}*/}
                {/*  sx={{*/}
                {/*    fontSize: '10px',*/}
                {/*    mr: '5px',*/}
                {/*  }}*/}
                {/*/>*/}

                <FormHelperText error={error}>{error?.message}</FormHelperText>
              </Box>
            )}
          </Box>
        );
      }}
    />
  );
}
