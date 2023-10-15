import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { AddMoreButtonComponent } from "../Add-More-Component";

function UserComponent() {
  type TUserForm = {
    firstName: string;
    lastName: string;
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
