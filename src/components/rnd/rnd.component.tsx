import { yupResolver } from "@hookform/resolvers/yup";
import SendIcon from "@mui/icons-material/Send";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { ObjectSchema } from "yup";
import * as yup from "yup";
import { AddMoreButtonComponent } from "../../libs/common/component/AddMoreButtonComponent";
import { FormDatePicker } from "../../libs/common/component/DatePickerComponent";
import FromDropDownComponent from "../../libs/common/component/FormDropdownComponent";
import { FormFileUpload } from "../../libs/common/component/FormFileUploadComponent";
import { yupString } from "../../libs/common/customYupValidation";

export default function RndComponent() {
  type TForm = {
    name: string;
    filePath: string;
    date: string | null;
    country: string;
    addresses: {
      district: string;
      division: string;
    }[];
  };

  const defaultValue: TForm = {
    name: "",
    filePath: "",
    date: null,
    country: "",
    addresses: [
      {
        district: "",
        division: "",
      },
    ],
  };

  const validation: ObjectSchema<NonNullable<any>> = yup
    .object({
      name: yupString(),
      filePath: yupString(),
      date: yupString(),
      addresses: yup.array().of(
        yup
          .object({
            district: yupString(),
            division: yupString(),
          })
          .required(),
      ),
    })
    .required();

  const {
    control,
    formState: { errors, isSubmitting },
    setValue,
    handleSubmit,
    reset,
    register,
  } = useForm<TForm>({
    defaultValues: defaultValue,
    resolver: yupResolver(validation),
  });

  const { fields, append, remove } = useFieldArray<TForm>({
    control,
    name: "addresses",
  });

  const onSubmit = (data: TForm) => {
    console.log("data", data);
    return;
  };

  const onClear = () => {
    reset();
  };

  const countries = [
    { id: "AD", label: "Andorr" },
    {
      id: "AE",
      label: "United Arab Emirates",
    },
    { id: "AF", label: "Afghanista" },
    {
      id: "AG",
      label: "Antigua and Barbuda",
    },
    { id: "AI", label: "Anguill" },
  ];

  const AdminAuthTempFileServer = axios.create({
    baseURL: "http://10.11.106.135:8080/storage/api/v1/file/upload?domain=TEMP",
  });

  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "100%" },
          height: "500rem",
        }}
        noValidate
        autoComplete="off"
      >
        <Box sx={{ my: 4, display: "flex", justifyContent: "space-between" }}>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            color="info"
          />
          <FromDropDownComponent
            color="info"
            name="country"
            control={control}
            label="Choose a country"
            options={countries}
            error={!!errors?.country?.message}
            helperText={errors?.country?.message}
            onChange={(id) => setValue("country", id)}
            required
          />
        </Box>

        {/*<TextField*/}
        {/*  id="outlined-basic"*/}
        {/*  type={"file"}*/}
        {/*  label="File Path"*/}
        {/*  variant="outlined"*/}
        {/*  {...register("filePath")}*/}
        {/*/>*/}

        <Box sx={{ my: 10, display: "flex", gap: "4rem" }}>
          <FormFileUpload
            control={control}
            name={"filePath"}
            server={AdminAuthTempFileServer}
            sx={{ width: "100%" }}
          />

          <FormDatePicker
            label={"Date"}
            control={control}
            name={"date"}
            errors={errors}
            title="Date"
            color="info"
          />
        </Box>
        <Box sx={{ py: 5, border: "1px solid #ddd" }}>
          {fields?.map((field, index) => {
            const arrayIndex = index.toString();
            // @ts-ignore
            return (
              <Box key={index}>
                <Box sx={{ mr: 3 }}>{index}</Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: "4rem",
                  }}
                >
                  <TextField
                    id="outlined-basic"
                    label="District"
                    variant="outlined"
                    {...register(`addresses.${arrayIndex}.district`)}
                    color="info"

                    // value={field.street}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Division"
                    variant="outlined"
                    {...register(`addresses.${arrayIndex}.division`)}
                    color="info"
                    // value={field.city}
                  />
                </Box>
              </Box>
            );
          })}

          <AddMoreButtonComponent
            append={append}
            defaultValue={{ street: "", city: "" }}
          />
        </Box>
        <Box sx={{ display: "flex", gap: "4rem", mt: 2 }}>
          <Button variant="contained" onClick={onClear} color="secondary">
            Clear
          </Button>

          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleSubmit(onSubmit)}
            color="info"
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </>
  );
}
