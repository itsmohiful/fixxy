import * as yup from "yup";

export const yupNumber = () =>
  yup
    .number()
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr));

export const yupString = () => yup.string().nullable();

export const yupStringRequired = () =>
  yupString().required("This field is required");
export const yupBoolean = () => yup.boolean().nullable();
export const yupArray = () => yup.array().nullable();
export const yupArrayRequired = () =>
  yup.array().min(1, "This field is required");
export const yupPhoneNoRequired = () =>
  yup
    .string()
    .matches(/^[\d]+$/, "Phone number is not valid")
    .required("This field is required");
