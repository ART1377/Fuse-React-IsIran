import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import SvgIcon from "@mui/material/SvgIcon";
import ProfileSvg from "../../svg/ProfileSvg";
import MailSvg from "../../svg/MailSvg";

const Appbar = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: "white",
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.04)",
          }}
        >
          <Toolbar className="mr-auto">
            <Box border="1px solid #d9d9d9" padding="6px" borderRadius="8px">
              <SvgIcon sx={{ fontSize: "24px" }}>
                <MailSvg />
              </SvgIcon>
            </Box>
            <Box
              border="1px solid #d9d9d9"
              padding="6px"
              borderRadius="8px"
              marginRight={1}
            >
              <SvgIcon sx={{ fontSize: "24px" }}>
                <ProfileSvg />
              </SvgIcon>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Appbar;
