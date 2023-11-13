import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Stack, Box, FormHelperText, Button } from "@mui/material";
import CustomContainer from "app/theme-layouts/layout4/components/CustomContainer/CustomContainer";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogTable from "app/theme-layouts/layout4/components/Log/LogTable/LogTable";
// import { logData } from "../../../../../db2";
import { useDispatch, useSelector } from "react-redux";
import { addNewLog, fetchLogs } from "app/store/logSlice";
import Loader from "app/theme-layouts/layout4/components/Loader/Loader";
import {
  textFieldStyles,
  inputStyles,
} from "../../../../theme-layouts/layout4/customStyles/Styles";

const schema = yup.object().shape({
  systemName: yup.string().required("پرکردن این فیلد الزامی است"),
  organizationName: yup.string().required("پرکردن این فیلد الزامی است"),
  category: yup.string().required("پرکردن این فیلد الزامی است"),
  eventType: yup.string().required("پرکردن این فیلد الزامی است"),
  eventSensitivity: yup.string().required("پرکردن این فیلد الزامی است"),
});

const defaultValues = {
  systemName: "",
  organizationName: "",
  category: "",
  eventType: "",
  eventSensitivity: "",
};

const Log = () => {
  const logsData = useSelector((state) => state.log.logs);
  const dispatch = useDispatch();
  const logsStatus = useSelector((state) => state.log.status);

  useEffect(() => {
    dispatch(fetchLogs());
  }, [dispatch, logsData.length]);

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const [systemName, setSystemName] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [category, setCategory] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventSensitivity, setEventSensitivity] = useState("");

  const onSubmit = (data) => {
    dispatch(addNewLog(data));
    setSystemName("");
    setOrganizationName("");
    setCategory("");
    setEventType("");
    setEventSensitivity("");
    reset();
  };

  if (logsStatus === "loading") {
    return (
      <Loader/>
    )
  }

  return (
    <>
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
              {/* system name ******** */}
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

              {/* organization name ******** */}
              <FormControl sx={{ ...textFieldStyles }}>
                <Select
                  {...register("organizationName")}
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  error={!!errors.organizationName}
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
                  displayEmpty
                  IconComponent={KeyboardArrowDownIcon}
                >
                  <MenuItem disabled value="">
                    <em>نام سازمان</em>
                  </MenuItem>
                  <MenuItem value="سازمان 1">سازمان 1</MenuItem>
                  <MenuItem value="سازمان 2">سازمان 2</MenuItem>
                  <MenuItem value="سازمان 3">سازمان 3</MenuItem>
                </Select>
                {errors?.organizationName?.message && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    {errors?.organizationName?.message}
                  </FormHelperText>
                )}
              </FormControl>

              {/* category ******** */}
              <FormControl sx={{ ...textFieldStyles }}>
                <Select
                  {...register("category")}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  error={!!errors.category}
                  inputProps={{
                    sx: {
                      ...inputStyles,
                      borderColor: `${
                        errors.category
                          ? "error.main"
                          : dirtyFields.category && "success.light"
                      }`,
                    },
                  }}
                  displayEmpty
                  IconComponent={KeyboardArrowDownIcon}
                >
                  <MenuItem disabled value="">
                    <em>دسته بندی</em>
                  </MenuItem>
                  <MenuItem value="دسته بندی 1">دسته بندی 1</MenuItem>
                  <MenuItem value="دسته بندی 2">دسته بندی 2</MenuItem>
                  <MenuItem value="دسته بندی 3">دسته بندی 3</MenuItem>
                </Select>
                {errors?.category?.message && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    {errors?.category?.message}
                  </FormHelperText>
                )}
              </FormControl>

              {/* event type ******** */}
              <FormControl sx={{ ...textFieldStyles }}>
                <Select
                  {...register("eventType")}
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  error={!!errors.eventType}
                  inputProps={{
                    sx: {
                      ...inputStyles,
                      borderColor: `${
                        errors.eventType
                          ? "error.main"
                          : dirtyFields.eventType && "success.light"
                      }`,
                    },
                  }}
                  displayEmpty
                  IconComponent={KeyboardArrowDownIcon}
                >
                  <MenuItem disabled value="">
                    <em>نوع رویداد</em>
                  </MenuItem>
                  <MenuItem value="Logout">Logout</MenuItem>
                  <MenuItem value="Login">Login</MenuItem>
                  <MenuItem value="Change password">Change password</MenuItem>
                </Select>
                {errors?.eventType?.message && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    {errors?.eventType?.message}
                  </FormHelperText>
                )}
              </FormControl>

              {/* event sensitivity ******** */}
              <FormControl sx={{ ...textFieldStyles }}>
                <Select
                  {...register("eventSensitivity")}
                  value={eventSensitivity}
                  onChange={(e) => setEventSensitivity(e.target.value)}
                  error={!!errors.eventSensitivity}
                  inputProps={{
                    sx: {
                      ...inputStyles,
                      borderColor: `${
                        errors.eventSensitivity
                          ? "error.main"
                          : dirtyFields.eventSensitivity && "success.light"
                      }`,
                    },
                  }}
                  displayEmpty
                  IconComponent={KeyboardArrowDownIcon}
                >
                  <MenuItem disabled value="">
                    <em>حساسیت رویداد</em>
                  </MenuItem>
                  <MenuItem value="کم">کم</MenuItem>
                  <MenuItem value="نرمال">نرمال</MenuItem>
                  <MenuItem value="بحرانی">بحرانی</MenuItem>
                </Select>
                {errors?.eventSensitivity?.message && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    {errors?.eventSensitivity?.message}
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
          <LogTable data={logsData} />
        </CustomContainer>
      </Box>
    </>
  );
};

export default Log;
