import React, { useState, useContext, memo } from "react";
import FuseSuspense from "@fuse/core/FuseSuspense";
import AppContext from "app/AppContext";
import { useRoutes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Navbar from "./components/Navbar/Navbar";
// eslint-disable-next-line import/no-cycle
import Appbar from "./components/Appbar/Appbar";

const customTheme = createTheme({
  direction: "rtl",

  components: {
    MuiPaginationItem: {
      defaultProps: {
        // @ts-expect-error Material-UI issue
        components: {
          previous: KeyboardArrowRightIcon,
          next: KeyboardArrowLeftIcon,
          last: KeyboardDoubleArrowLeftIcon,
          first: KeyboardDoubleArrowRightIcon,
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "confirm" },
          style: {
            backgroundColor: "#3E7BFA",
            color: "#fff",
            borderRadius: 8,
            outline: "1px solid #3E7BFA",
            fontSize: "12px",
            fontWeight: "500",
            width: "120px",
            height: "32px",
            "&:hover": {
              backgroundColor: "#6698FA",
            },
          },
        },
        {
          props: { variant: "delete" },
          style: {
            backgroundColor: "#FF3B3B",
            color: "#fff",
            borderRadius: 8,
            outline: "1px solid #FF3B3B",
            fontSize: "12px",
            fontWeight: "500",
            width: "120px",
            height: "32px",
            "&:hover": {
              backgroundColor: "#f35252",
            },
          },
        },
        {
          props: { variant: "cancel" },
          style: {
            backgroundColor: "tranparent",
            color: "#1C1C28",
            borderRadius: 8,
            outline: "1px solid #E4E4EB",
            fontSize: "12px",
            fontWeight: "500",
            width: "120px",
            height: "32px",
            "&:hover": {
              opacity: ".9",
            },
          },
        },
      ],
    },
  },

  palette: {
    primary: {
      main: "#3E7BFA",
      light: "#a1c0ff",
      dark: "#3E7BFA",
      contrastText: "#fff",
    },
    secondary: {
      main: "#FF3B3B",
      light: "#f35252",
      dark: "#ca1e1e",
      contrastText: "#fff",
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: "IranSans, sans-serif",
    fontSize: 16,
    h1: {
      fontWeight: 700,
      fontSize: 40,
      color: "#1C1C28",
    },
    h2: {
      fontWeight: 700,
      fontSize: 32,
      color: "#1C1C28",
    },
    h3: {
      fontWeight: 700,
      fontSize: 28,
      color: "#1C1C28",
    },
    h4: {
      fontWeight: 700,
      fontSize: 24,
      color: "#1C1C28",
    },
    h5: {
      fontWeight: 700,
      fontSize: 20,
      color: "#1C1C28",
    },
    h6: {
      fontWeight: 700,
      fontSize: 16,
      color: "#1C1C28",
    },
    body1: {
      fontWeight: 400,
      fontSize: 16,
      color: "#1C1C28",
    },
    body2: {
      fontWeight: 300,
      fontSize: 14,
      color: "#1C1C28",
    },
    subtitle1: {
      fontWeight: 400,
      fontSize: 12,
      color: "#1C1C28",
    },
    subtitle2: {
      fontWeight: 600,
      fontSize: 10,
      color: "#1C1C28",
    },
  },
});



function Layout4(props) {
  const appContext = useContext(AppContext);
  const { routes } = appContext;

  

  return (
    <>
        <ThemeProvider theme={customTheme}>
          <Navbar />
          <div className="min-w-[calc(100%-240px)]">
            <Appbar />
            <div className="flex flex-col flex-auto min-h-0 relative z-10 m-5">
              <FuseSuspense>{useRoutes(routes)}</FuseSuspense>

              {props.children}
            </div>
          </div>
        </ThemeProvider>

      {/* <Navbar/>
      <Appbar/> */}
    </>
  );
}

export default memo(Layout4);
