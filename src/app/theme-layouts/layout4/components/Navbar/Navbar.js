import React, { useState } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import { Box, Typography } from "@mui/material";
import Navigation from "app/theme-layouts/shared-components/Navigation";
import style from './Navbar.module.css'

const Navbar = () => {
  const [open, setOpen] = useState(true);

  // const handleClick = () => {
  //   setOpen(!open);
  // };

  return (
    <>
    
      <List
      className={style.list}
        sx={{ width: "100%", maxWidth: 240, bgcolor:'primary.dark'}}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            className="flex gap-10 items-center mt-40"
            sx={{bgcolor:'primary.dark'}}
          >
            <Box className="rounded-full bg-[#D9D9D9] w-[24px] h-[24px]" />

            <Typography variant="h5" color='white'>نام شرکت</Typography>
          </ListSubheader>
        }
      >
        <Navigation layout="vertical" />
      </List>






      
      {/* {navigationConfig.map((config) =>
        config.children.map((child) => {
          return (
            <div>
              <h1>{child.title}</h1>
              {child.children &&
                child.children.map((item) => {
                  return <p>{item.title}</p>;
                })}
            </div>
          );
        })
      )} */}
    </>
  );
};

export default Navbar;
