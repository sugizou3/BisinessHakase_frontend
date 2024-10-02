import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { getSearch } from "src/reducks/post/postSlice";
import { useRouter } from "next/router";
import {
  setSearchText,
  resetSearchText,
  selectSearchText,
} from "src/reducks/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";

const SearchComponent = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const searchFunc = async (e) => {
    e.preventDefault();
    dispatch(setSearchText(text));
    router.push("/search");
  };

  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      e.preventDefault()
      searchFunc(e);
    }
  };

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
      className="w-full maxWidth-SearchComponent mx-5 "
    >
      <InputBase
        sx={{ mx: 1, flex: 1 }}
        placeholder="検索"
        inputProps={{ "aria-label": "検索" }}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          handleKeyDown(e);
        }}
      />
      <IconButton
        type="submit"
        sx={{ p: "10px" }}
        aria-label="delete"
        disableRipple={true}
        //onClick={searchFunc}
      >
        <ClearIcon />
      </IconButton>
      <Divider orientation="vertical" flexItem />
      <IconButton
        type="submit"
        sx={{ p: "10px" }}
        aria-label="search"
        disableRipple={true}
        onClick={searchFunc}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchComponent;
