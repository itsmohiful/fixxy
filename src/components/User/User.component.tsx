import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { AddMoreButtonComponent } from "../Add-More-Component";
import { UiFormFileUpload } from "../UiFormFileUpload";
import axios from "axios";

function UserComponent() {
  const [selectedDate, setSelectedDate] = useState(null);
  console.log({ selectedDate });
  type TUserForm = {
    firstName: string;
    lastName: string;
    filePath: string;
    date: string;
    address: [
      {
        street: string;
        city: string;
      },
    ];
  };

  const defaultValue: TUserForm = {
    firstName: "",
    lastName: "",
    filePath: "",
    date: "",
    address: [
      {
        street: "",
        city: "",
      },
    ],
  };

  const validation = yup
    .object({
      firstName: yup.string().nullable(),
      lastName: yup.string().required("This Field Is Required"),
    })
    .required("This Field Is Required");

  const {
    control,
    formState: { errors, isSubmitting },
    setValue,
    handleSubmit,
    register,
    reset,
  } = useForm<TUserForm>({
    defaultValues: defaultValue,
    resolver: yupResolver(validation),
  });

  const { fields, append, remove } = useFieldArray<TUserForm, "address">({
    control,
    name: "address",
  });

  console.log({ fields });
  console.log({ errors });

  const demoData = [
    { street: "test1", city: "test1" },
    { street: "test2", city: "test2" },
    { street: "test2", city: "test2" },
  ];

  useEffect(() => {
    setValue("firstName", "test");
    setValue("lastName", "last test");
    setValue("address", demoData);
  }, []);

  const AdminAuthTempFileServer = axios.create({
    baseURL: "http://10.11.106.135:8080/storage/api/v1/file/upload?domain=TEMP",
  });

  const onSubmit = (data: TUserForm) => {
    console.log("data", data);
    return;
  };

  const onClear = () => {
    reset();
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
        height: "500rem",
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label="First Name"
        variant="outlined"
        {...register("firstName")}
      />
      <TextField
        id="outlined-basic"
        label="Last Name"
        variant="outlined"
        {...register("lastName")}
      />

      {/*<TextField*/}
      {/*  id="outlined-basic"*/}
      {/*  type={"file"}*/}
      {/*  label="File Path"*/}
      {/*  variant="outlined"*/}
      {/*  {...register("filePath")}*/}
      {/*/>*/}
      <UiFormFileUpload
        control={control}
        name={"filePath"}
        server={AdminAuthTempFileServer}
      />

      <DatePicker
        label={"Date"}
        value={selectedDate}
        onChange={(newValue) => {
          setSelectedDate(newValue);
        }}
      />
      <Box sx={{ py: 3 }}>
        {fields?.map((field, index) => {
          const arrayIndex = index.toString();
          // @ts-ignore
          return (
            <Box key={index}>
              <Box>{index}</Box>
              <TextField
                id="outlined-basic"
                label="street"
                variant="outlined"
                {...register(`address.${arrayIndex}.street`)}
                // value={field.street}
              />
              <TextField
                id="outlined-basic"
                label="city"
                variant="outlined"
                {...register(`address.${arrayIndex}.city`)}
                // value={field.city}
              />
            </Box>
          );
        })}

        <AddMoreButtonComponent
          append={append}
          defaultValue={{ street: "", city: "" }}
        />
      </Box>

      <Box>
        <Button variant="contained" onClick={onClear}>
          Clear
        </Button>

        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleSubmit(onSubmit)}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default UserComponent;
