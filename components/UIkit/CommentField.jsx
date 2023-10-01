import * as React from "react";
import { ProfileIcon } from ".";
import { selectProfile } from "../../src/reducks/auth/authSlice.js";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { useState } from "react";
import {
  postComment,
  getComments,
  selectProfiles,
} from "src/reducks/post/postSlice";
import { useSWRConfig } from "swr";

const apiUrlComment = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/comment/`;

export default function CommentField({ profile = null, postId }) {
  const { mutate } = useSWRConfig();

  const [text, setText] = useState("");

  const commentPost = async (e) => {
    e.preventDefault();
    const packet = { text: text, post: postId };
    await postComment(packet);
    mutate(apiUrlComment);
    setText("");
  };

  const userProf = useSelector(selectProfile);

  if (userProf) {
    profile = userProf;
  }

  return (
    <div>
      <div className="flex mb-1">
        <div className="flex items-center">
          <ProfileIcon profile={profile} />
        </div>
        <div className="w-full ml-3 ">
          <Input
            placeholder="コメントを追加"
            multiline
            className="w-full "
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </div>
      <div className=" flex justify-end mb-2">
        <Button
          variant="contained"
          type="button"
          disabled={!text.length}
          onClick={commentPost}
        >
          投稿
        </Button>
      </div>
    </div>
  );
}
