import { ProfileIcon, dateFunction } from "..";
import { selectProfiles } from "../../../src/reducks/auth/authSlice.js";
import { React, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";

export default function CommentBox({ comment }) {
  const dispatch = useDispatch();

  useEffect(() => {
    async () => {
      await dispatch(fetchAsyncGetProfs());
    };
  }, []);

  const profiles = useSelector(selectProfiles);

  const prof_array = profiles.filter((prof) => {
    return prof.userProfile === comment.userComment;
  });
  var prof = prof_array[0];

  return (
    <div className=" flex my-2">
      <ProfileIcon profile={prof} />
      <div className="mx-3 w-full">
        <div className="flex gap-x-4 ">
          <Typography className="">{prof.nickName}</Typography>
          <Typography>{dateFunction(comment.created_on)}</Typography>
        </div>
        <Typography className=" break-words pr-8 pb-2">
          {comment.text}
        </Typography>
      </div>
    </div>
  );
}
