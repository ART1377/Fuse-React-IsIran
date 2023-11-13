import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Stack, Box, Button } from "@mui/material";
import CustomContainer from "app/theme-layouts/layout4/components/CustomContainer/CustomContainer";
import SystemTable from "app/theme-layouts/layout4/components/System/SystemTable/SystemTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchSystems, addNewSystem } from "app/store/systemSlice";
import Loader from "app/theme-layouts/layout4/components/Loader/Loader";
import {
  textFieldStyles,
  inputStyles,
} from "../../../../theme-layouts/layout4/customStyles/Styles";

const schema = yup.object().shape({
  systemName: yup
    .string()
    .required("پرکردن این فیلد الزامی است")
    .min(3, "نام سامانه باید حداقل 3 کاراکتر باشد"),

  systemLatinName: yup
    .string()
    .required("پرکردن این فیلد الزامی است")
    .min(3, "نام لاتین سامانه باید حداقل 3 کاراکتر باشد"),
  systemNumber: yup
    .string()
    .required("پرکردن این فیلد الزامی است")
    .matches(/^[0-9]+$/, "شماره سامانه باید مقدار عددی باشد")
    .length(10, "شماره سامانه باید 10 کاراکتر باشد"),
  portNumber: yup
    .string()
    .required("پرکردن این فیلد الزامی است")
    .matches(/^[0-9]+$/, "شماره پورت باید مقدار عددی باشد")
    .length(10, "شماره پورت باید 10 کاراکتر باشد"),
});

const defaultValues = {
  systemName: "",
  systemLatinName: "",
  systemNumber: "",
  portNumber: "",
};

const Organization = () => {
  const systemsData = useSelector((state) => state.system.systems);
  const dispatch = useDispatch();
  const systemsStatus = useSelector((state) => state.system.status);

  useEffect(() => {
    dispatch(fetchSystems());
  }, [dispatch, systemsData.length]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
  } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(addNewSystem(data));
    reset();
  };


  if (systemsStatus === "loading") {
    return (
      <Loader/>
    )
  }

  return (
    <>
      {/* Form */}
      <Box sx={{ marginX: "32px", marginTop: "40px", marginBottom: "16px" }}>
        <CustomContainer>
          <form
            className="p-[24px]"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <Stack
              direction="row"
              flexWrap="wrap"
              sx={{ justifyContent: { xs: "center", md: "start" } }}
            >
              <TextField
                name="systemName"
                error={!!errors.systemName}
                helperText={errors?.systemName?.message}
                placeholder="نام سامانه"
                variant="outlined"
                sx={{ ...textFieldStyles }}
                inputProps={{
                  sx: {
                    ...inputStyles,
                    borderColor: `${
                      errors.systemName
                        ? "error.main"
                        : dirtyFields.systemName && "success.light"
                    }`,
                  },
                }}
                {...register("systemName")}
              />
              <TextField
                name="systemLatinName"
                error={!!errors.systemLatinName}
                helperText={errors?.systemLatinName?.message}
                placeholder="نام لاتین سامانه"
                variant="outlined"
                sx={{ ...textFieldStyles }}
                inputProps={{
                  sx: {
                    ...inputStyles,
                    borderColor: `${
                      errors.systemLatinName
                        ? "error.main"
                        : dirtyFields.systemLatinName && "success.light"
                    }`,
                  },
                }}
                {...register("systemLatinName")}
              />
              <TextField
                type="number"
                name="systemNumber"
                error={!!errors.systemNumber}
                helperText={errors?.systemNumber?.message}
                placeholder="شماره سامانه"
                variant="outlined"
                sx={{ ...textFieldStyles }}
                inputProps={{
                  sx: {
                    ...inputStyles,
                    borderColor: `${
                      errors.systemNumber
                        ? "error.main"
                        : dirtyFields.systemNumber && "success.light"
                    }`,
                  },
                }}
                {...register("systemNumber")}
              />
              <TextField
                type="number"
                name="portNumber"
                error={!!errors.portNumber}
                helperText={errors?.portNumber?.message}
                placeholder="شماره پورت"
                variant="outlined"
                sx={{ ...textFieldStyles }}
                inputProps={{
                  sx: {
                    ...inputStyles,
                    borderColor: `${
                      errors.portNumber
                        ? "error.main"
                        : dirtyFields.portNumber && "success.light"
                    }`,
                  },
                }}
                {...register("portNumber")}
              />
            </Stack>
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "end" },
                marginLeft: "24px",
              }}
            >
              <Button type="submit" variant="confirm">
                ذخیره
              </Button>
            </Box>
          </form>
        </CustomContainer>
      </Box>

      {/* Table */}
      <Box sx={{ marginX: "32px", marginY: "16px" }}>
        <CustomContainer>
          <SystemTable data={systemsData} />
        </CustomContainer>
      </Box>
    </>
  );
};

export default Organization;

// http://127.0.0.1:3500/system
// http://127.0.0.1:3500/log
// http://127.0.0.1:3500/action
