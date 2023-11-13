import React, { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack, Button, FormHelperText } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDispatch, useSelector } from "react-redux";
import { updateLog } from "app/store/logSlice";
import { textFieldStyles, inputStyles } from "../../../customStyles/Styles";

const schema = yup.object().shape({
  systemName: yup.string().required("پرکردن این فیلد الزامی است"),
  organizationName: yup.string().required("پرکردن این فیلد الزامی است"),
  category: yup.string().required("پرکردن این فیلد الزامی است"),
  eventType: yup.string().required("پرکردن این فیلد الزامی است"),
  eventSensitivity: yup.string().required("پرکردن این فیلد الزامی است"),
});

const LogEditModal = ({ modalState, selectedRow, onClose }) => {
  const logsData = useSelector((state) => state.log.logs);
  const dispatch = useDispatch();

  const prevValues = logsData.find((data) => data.id === selectedRow.id);

  const defaultValues = {
    systemName: prevValues.systemName,
    organizationName: prevValues.organizationName,
    category: prevValues.category,
    eventType: prevValues.eventType,
    eventSensitivity: prevValues.eventSensitivity,
  };

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const [systemName, setSystemName] = useState(prevValues.systemName);
  const [organizationName, setOrganizationName] = useState(prevValues.organizationName);
  const [category, setCategory] = useState(prevValues.category);
  const [eventType, setEventType] = useState(prevValues.eventType);
  const [eventSensitivity, setEventSensitivity] = useState(prevValues.eventSensitivity);

  const onSubmit = (data) => {
    const newObject = { ...data, id: selectedRow.id };
    dispatch(updateLog(newObject));
    onClose();
  };

  return (
    <>
      <Dialog
        open={modalState}
        onClose={onClose}
        sx={{
          padding: "24px",
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "center",
            marginY: "16px",
          }}
        >
          ویرایش اطلاعات
        </DialogTitle>
        <DialogContent>
          {/* Form */}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
                    <em>سازمان</em>
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
            <DialogActions
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "16px",
                padding: "24px",
              }}
            >
              <Button type="submit" variant="confirm">
                ذخیره
              </Button>
              <Button variant="cancel" onClick={onClose}>
                لغو
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LogEditModal;
