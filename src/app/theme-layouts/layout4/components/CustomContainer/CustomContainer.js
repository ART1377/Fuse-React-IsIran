import { Box } from "@mui/material";


const CustomContainer = ({ children }) => {

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        boxShadow:
          "0px 4px 8px 0px rgba(96, 97, 112, 0.16), 0px 0px 2px 0px rgba(40, 41, 61, 0.04)",
        borderRadius: "8px",
        maxWidth: "1104px",
      }}
    >
      {children}
    </Box>
  );
};

export default CustomContainer;
