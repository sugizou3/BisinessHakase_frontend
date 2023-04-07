import * as React from "react";
import { ProfileIcon,dateFunction } from ".";
import { selectProfile } from "../../src/reducks/auth/authSlice.js";
import { useSelector, useDispatch } from "react-redux";

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
          <div className="mx-1">{profile.nickName}</div>
          <div>{dateFunction(comment.created_on)}</div>
        </div>
        <div className=" break-words pr-8 pb-2">{text}</div>
      </div>
    </div>
  );
}
