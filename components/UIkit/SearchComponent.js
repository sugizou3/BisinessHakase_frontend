import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

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
        width: 600,
        height: 42,
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="検索"
        inputProps={{ "aria-label": "検索" }}
      />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchComponent;
