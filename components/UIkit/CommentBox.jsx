import * as React from "react";
import { ProfileIcon,dateFunction } from ".";
import { selectProfile } from "../../src/reducks/auth/authSlice.js";
import { useSelector, useDispatch } from "react-redux";
import Typography from '@mui/material/Typography';

export default function CommentBox({profile = null, text,comment }) { 
  const userProf = useSelector(selectProfile);
  if (profile == null) {
    profile = userProf;
  }

  return (
    <div className=" flex">
      <ProfileIcon profile={profile} />
      <div className=" mx-2 w-full">
        <div className="flex ">
          <Typography className="mx-1">{profile.nickName}</Typography>
          <Typography>{dateFunction(comment.created_on)}</Typography>
        </div>
        <Typography className=" break-words pr-8 pb-2">{text}</Typography>
      </div>
    </div>
  );
}
