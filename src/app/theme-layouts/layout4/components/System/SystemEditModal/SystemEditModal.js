import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateSystem } from "app/store/systemSlice";
import { textFieldStyles, inputStyles } from "../../../customStyles/Styles";

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

const SystemEditModal = ({ modalState, selectedRow, onClose }) => {
  const systemsData = useSelector((state) => state.system.systems);
  const dispatch = useDispatch();

  const prevValues = systemsData.find((data) => data.id === selectedRow.id);

  const defaultValues = {
    systemName: prevValues.systemName,
    systemLatinName: prevValues.systemLatinName,
    systemNumber: +prevValues.systemNumber,
    portNumber: +prevValues.portNumber,
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

  const onSubmit = (data) => {
    const newObject = { ...data, id: selectedRow.id };
    dispatch(updateSystem(newObject));
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
              sx={{ justifyContent: "center" }}
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

export default SystemEditModal;
