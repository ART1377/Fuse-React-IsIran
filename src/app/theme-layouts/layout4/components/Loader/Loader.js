import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography, Box } from "@mui/material";

const Loader = () => {
  return (
    <div>
      <Backdrop sx={{ color: "#fff", zIndex: 100 }} open>
        <Box
          sx={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            bgcolor: "#fff",
            padding: "16px",
            borderRadius: 1,
          }}
        >
          <Typography variant="h5">درحال بارگذاری</Typography>
          <CircularProgress sx={{color:'primary.main'}} />
        </Box>
      </Backdrop>
    </div>
  );
};

export default Loader;
