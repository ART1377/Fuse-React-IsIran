import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { inputStyles, textFieldStyles } from "../../customStyles/Styles";

const SearchBar = ({ value, changeHandler }) => {
  return (
    <>
      <InputBase
        value={value}
        onChange={changeHandler}
        sx={{
          ...textFieldStyles,
          width: "140px",
          // maxWidth: "160px",
          margin: "0",
          backgroundColor: "#fff",
          borderRadius: "8px",
        }}
        placeholder="جستجو"
        inputProps={{
          sx: {
            ...inputStyles,
            paddingRight: "24px",
          },
        }}
      />
      <IconButton
        type="button"
        sx={{
          position: "absolute",
          marginRight: "-135px",
          color: "primary.main",
          padding: "0px",
          top: "50%",
          transform: "translateY(-50%)",
        }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </>
  );
};

export default SearchBar;
