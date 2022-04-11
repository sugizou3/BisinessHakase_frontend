import * as React from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import ContentCut from "@mui/icons-material/ContentCut";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentPaste from "@mui/icons-material/ContentPaste";
import Cloud from "@mui/icons-material/Cloud";

import SearchIcon from "@mui/icons-material/Search";
import NoteIcon from "@mui/icons-material/Note";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";

export default function IconMenu() {
  return (
    <Paper sx={{ width: 320, maxWidth: "100%" }}>
      <MenuList>
        <Link href="/">
          <MenuItem sx={{ height: 45 }}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>ホーム</ListItemText>
          </MenuItem>
        </Link>
        <Link href="search/">
          <MenuItem sx={{ height: 45 }}>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText>検索</ListItemText>
          </MenuItem>
        </Link>
        <Link href="create/">
          <MenuItem sx={{ height: 45 }}>
            <ListItemIcon>
              <BorderColorIcon />
            </ListItemIcon>
            <ListItemText>作成</ListItemText>
          </MenuItem>
        </Link>
        <Link href="mypage/">
          <MenuItem sx={{ height: 45 }}>
            <ListItemIcon>
              <MenuBookIcon />
            </ListItemIcon>
            <ListItemText>マイページ</ListItemText>
          </MenuItem>
        </Link>
        <Divider />
        <Link href="signup/">
          <MenuItem sx={{ height: 45 }}>
            <ListItemIcon>
              <Cloud fontSize="small" />
            </ListItemIcon>
            <ListItemText>Web Clipboard</ListItemText>
          </MenuItem>
        </Link>
      </MenuList>
    </Paper>
  );
}
