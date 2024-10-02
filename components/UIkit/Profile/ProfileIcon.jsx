import * as React from "react";

import { useSelector } from "react-redux";

import { selectProfile } from "../../../src/reducks/auth/authSlice.js";
import Avatar from "@mui/material/Avatar";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export default function ProfileIcon({ scale, profile = null, image = null }) {
  const userProf = useSelector(selectProfile);
  if (profile == null) {
    profile = userProf;
  }
  var img = null;
  if (image != null) {
    img = image;
  } else if (profile.img) {
    img = profile.img;
  }

  const textScale = scale * 0.6;

  return (
    <div>
      {img || profile.nickName == "anonimous" ? (
        <Avatar alt="Who?" src={img} sx={{ width: scale, height: scale }} />
      ) : (
        <Avatar
          sx={{
            width: scale,
            height: scale,
            fontSize: textScale,
            bgcolor: stringToColor(profile.nickName),
          }}
        >
          {profile.nickName.slice(0, 1).toUpperCase()}
        </Avatar>
      )}
    </div>
  );
}
