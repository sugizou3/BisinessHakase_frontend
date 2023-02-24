import * as React from "react";
import { ProfileIcon } from ".";
import { selectProfile } from "../../src/reducks/auth/authSlice.js";
import { useSelector, useDispatch } from "react-redux";

export default function CommentBox({profile = null, text }) { 
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
          <div>12時間前</div>
        </div>
        <div className=" break-words pr-8 pb-2">{text}</div>
      </div>
    </div>
  );
}
