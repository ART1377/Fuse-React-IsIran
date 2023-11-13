import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useDispatch } from "react-redux";
import { deleteSystem } from "app/store/systemSlice";
import { deleteLog } from "app/store/logSlice";
import { deleteAction } from "app/store/actionsSlice";

const DeleteModal = ({ state, selectedRowId, onClose, category }) => {

  const dispatch = useDispatch();

  const deleteHandler = () => {
    if (category === "system") {
      dispatch(deleteSystem(selectedRowId));
    }
    if (category === "log") {
      dispatch(deleteLog(selectedRowId));
    }
    if (category === "action") {
      dispatch(deleteAction(selectedRowId));
    }
    onClose();
  };

  return (
    <>
      <Dialog
        open={state}
        onClose={onClose}
        sx={{
          padding: "24px",
        }}
      >
        <DialogContent sx={{ minWidth: { xs: 300, sm: 400, md: 480 } }}>
          <DialogContentText variant="body2">
            آیا شما از حذف این فایل مطمئن هستید؟
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            gap: "16px",
            marginTop: "32px",
            padding: "24px",
          }}
        >
          <Button variant="delete" onClick={deleteHandler}>
            حذف
          </Button>
          <Button variant="cancel" onClick={onClose}>
            لغو
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteModal;
