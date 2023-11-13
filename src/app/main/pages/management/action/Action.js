import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Stack, Box, Button, FormHelperText } from "@mui/material";
import CustomContainer from "app/theme-layouts/layout4/components/CustomContainer/CustomContainer";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ActionTable from "app/theme-layouts/layout4/components/Action/ActionTable/ActionTable";
// import { actionData } from "../../../../../db2";
import { useDispatch, useSelector } from "react-redux";
import { addNewAction, fetchActions } from "app/store/actionsSlice";
import Loader from "app/theme-layouts/layout4/components/Loader/Loader";
import {
  textFieldStyles,
  inputStyles,
} from "../../../../theme-layouts/layout4/customStyles/Styles";

const schema = yup.object().shape({
  organizationName: yup
    .string()
    .required("پرکردن این فیلد الزامی است")
    .min(3, "نام سازمان باید حداقل 3 کاراکتر باشد"),
  systemName: yup.string().required("پرکردن این فیلد الزامی است"),
  operatingSystemAddress: yup.string().required("پرکردن این فیلد الزامی است"),
  operatingSystemPort: yup
    .string()
    .required("پرکردن این فیلد الزامی است")
    .matches(/^[0-9]+$/, "پورت سامانه عامل باید مقدار عددی باشد")
    .length(4, "پورت سامانه عامل باید 4 کاراکتر باشد"),
  mainSystemAddress: yup.string().required("پرکردن این فیلد الزامی است"),
  mainSystemPort: yup
    .string()
    .required("پرکردن این فیلد الزامی است")
    .matches(/^[0-9]+$/, "پورت سامانه اصلی باید مقدار عددی باشد")
    .length(4, "شماره پورت باید 4 کاراکتر باشد"),
  situation: yup.string().required("پرکردن این فیلد الزامی است"),
});

const defaultValues = {
  organizationName: "",
  systemName: "",
  operatingSystemAddress: "",
  operatingSystemPort: "",
  mainSystemAddress: "",
  mainSystemPort: "",
  situation: "",
};

const Action = () => {
  const actionsData = useSelector((state) => state.actions.actions);
  const dispatch = useDispatch();
  const actionsStatus = useSelector((state) => state.actions.status);

  useEffect(() => {
    dispatch(fetchActions());
  }, [dispatch, actionsData.length]);

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

  const [systemName, setSystemName] = useState("");
  const [situation, setSituation] = useState("");

  const onSubmit = (data) => {
    dispatch(addNewAction(data));
    setSystemName();
    setSituation();
    reset();
  };

  if (actionsStatus === "loading") {
    return <Loader />;
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
                name="organizationName"
                error={!!errors.organizationName}
                helperText={errors?.organizationName?.message}
                placeholder="نام سازمان"
                variant="outlined"
                sx={{ ...textFieldStyles }}
                inputProps={{
                  sx: {
                    ...inputStyles,
                    borderColor: `${
                      errors.organizationName
                        ? "error.main"
                        : dirtyFields.organizationName && "success.light"
                    }`,
                  },
                }}
                {...register("organizationName")}
              />
              <FormControl sx={{ ...textFieldStyles }}>
                <Select
                  {...register("systemName")}
                  value={systemName}
                  onChange={(e) => setSystemName(e.target.value)}
                  error={!!errors.systemName}
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
                  displayEmpty
                  IconComponent={KeyboardArrowDownIcon}
                >
                  <MenuItem disabled value="">
                    <em>نام سامانه</em>
                  </MenuItem>
                  <MenuItem value="سامانه 1">سامانه 1</MenuItem>
                  <MenuItem value="سامانه 2">سامانه 2</MenuItem>
                  <MenuItem value="سامانه 3">سامانه 3</MenuItem>
                </Select>
                {errors?.systemName?.message && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    {errors?.systemName?.message}
                  </FormHelperText>
                )}
              </FormControl>

              <TextField
                name="operatingSystemAddress"
                error={!!errors.operatingSystemAddress}
                helperText={errors?.operatingSystemAddress?.message}
                placeholder="آدرس سامانه عامل"
                variant="outlined"
                sx={{ ...textFieldStyles }}
                inputProps={{
                  sx: {
                    ...inputStyles,
                    borderColor: `${
                      errors.operatingSystemAddress
                        ? "error.main"
                        : dirtyFields.operatingSystemAddress && "success.light"
                    }`,
                  },
                }}
                {...register("operatingSystemAddress")}
              />

              <TextField
                type="number"
                name="operatingSystemPort"
                error={!!errors.operatingSystemPort}
                helperText={errors?.operatingSystemPort?.message}
                placeholder="پورت سامانه عامل"
                variant="outlined"
                sx={{ ...textFieldStyles }}
                inputProps={{
                  sx: {
                    ...inputStyles,
                    borderColor: `${
                      errors.operatingSystemPort
                        ? "error.main"
                        : dirtyFields.operatingSystemPort && "success.light"
                    }`,
                  },
                }}
                {...register("operatingSystemPort")}
              />

              <TextField
                name="mainSystemAddress"
                error={!!errors.mainSystemAddress}
                helperText={errors?.mainSystemAddress?.message}
                placeholder="آدرس سامانه اصلی"
                variant="outlined"
                sx={{ ...textFieldStyles }}
                inputProps={{
                  sx: {
                    ...inputStyles,
                    borderColor: `${
                      errors.mainSystemAddress
                        ? "error.main"
                        : dirtyFields.mainSystemAddress && "success.light"
                    }`,
                  },
                }}
                {...register("mainSystemAddress")}
              />

              <TextField
                type="number"
                name="mainSystemPort"
                error={!!errors.mainSystemPort}
                helperText={errors?.mainSystemPort?.message}
                placeholder="پورت سامانه اصلی"
                variant="outlined"
                sx={{ ...textFieldStyles }}
                inputProps={{
                  sx: {
                    ...inputStyles,
                    borderColor: `${
                      errors.mainSystemPort
                        ? "error.main"
                        : dirtyFields.mainSystemPort && "success.light"
                    }`,
                  },
                }}
                {...register("mainSystemPort")}
              />
              <FormControl sx={{ ...textFieldStyles }}>
                <Select
                  {...register("situation")}
                  value={situation}
                  onChange={(e) => setSituation(e.target.value)}
                  error={!!errors.situation}
                  inputProps={{
                    sx: {
                      ...inputStyles,
                      borderColor: `${
                        errors.situation
                          ? "error.main"
                          : dirtyFields.situation && "success.light"
                      }`,
                    },
                  }}
                  displayEmpty
                  IconComponent={KeyboardArrowDownIcon}
                >
                  <MenuItem disabled value="">
                    <em>وضعیت</em>
                  </MenuItem>
                  <MenuItem value="وضعیت 1">وضعیت 1</MenuItem>
                  <MenuItem value="وضعیت 2">وضعیت 2</MenuItem>
                  <MenuItem value="وضعیت 3">وضعیت 3</MenuItem>
                </Select>
                {errors?.situation?.message && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    {errors?.situation?.message}
                  </FormHelperText>
                )}
              </FormControl>
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
          <ActionTable data={actionsData} />
        </CustomContainer>
      </Box>
    </>
  );
};

export default Action;
