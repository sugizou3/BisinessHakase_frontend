import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import Divider from '@mui/material/Divider';

const SearchComponent = (props) => {
  return (
    <Paper
      elevation={0}
      variant="outlined"
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        height: 42,
      }}
      className="w-full mx-5 "
    >
      <InputBase
        sx={{ mx: 1, flex: 1 }}
        placeholder="検索"
        inputProps={{ "aria-label": "検索" }}
      />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="delete" disableRipple={true} >
        <ClearIcon />
      </IconButton>
      <Divider orientation="vertical" flexItem />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search" disableRipple={true} >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchComponent;
