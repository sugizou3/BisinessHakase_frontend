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
      <Link href="signup/">
          <div className="flex hover:bg-gray-100 h-12 items-center font-NotoSansJP">
            <HomeIcon color="action" className="mx-4 " />
            <div>ホーム</div>
          </div>
        </Link>
        <Link href="signup/">
          <div className="flex hover:bg-gray-100 h-12 items-center font-NotoSansJP">
            <SearchIcon color="action" className="mx-4 " />
            <div>検索</div>
          </div>
        </Link>
        <Link href="signup/">
          <div className="flex hover:bg-gray-100 h-12 items-center font-NotoSansJP">
            <BorderColorIcon color="action" className="mx-4 " />
            <div>作成</div>
          </div>
        </Link>
        <Link href="signup/">
          <div className="flex hover:bg-gray-100 h-12 items-center font-NotoSansJP">
            <MenuBookIcon color="action" className="mx-4 " />
            <div>マイページ</div>
          </div>
        </Link>
        <Divider />
        <Link href="search/">
          <MenuItem sx={{ height: 45 }}>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText>検索</ListItemText>
          </MenuItem>
        </Link>
      </MenuList>

      
    </Paper>
  );
}
