import * as React from "react";
import { ProfileIcon } from ".";
import { selectProfile } from "../../src/reducks/auth/authSlice.js";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { useState } from "react";
import { postComment, getComments } from "src/reducks/post/postSlice";
import { useSWRConfig } from "swr";

const apiUrlComment = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/comment/`;

export default function CommentField({ profile = null, postId }) {
  const { mutate } = useSWRConfig();

  const [text, setText] = useState("");

  const commentPost = async (e) => {
    e.preventDefault();
    const packet = { text: text, post: 1 };
    await postComment(packet);
    mutate(apiUrlComment);
    setText("");
    console.log(e.target.value);
    e.target.value = "";
  };

  const userProf = useSelector(selectProfile);

  if (userProf) {
    profile = userProf;
  }

  return (
    <div className="flex mb-4">
      <div className="flex items-center">
        <ProfileIcon profile={profile} />
      </div>
      <div className="w-full ml-2 ">
        <Input
          placeholder="コメントを追加"
          multiline
          className="w-full "
          onChange={(e) => setText(e.target.value)}
        />
        <button
          variant="contained"
          type="submit"
          className="mt-2 "
          disabled={!text.length}
          onClick={commentPost}
        >
          コメント
        </button>
      </div>
    </div>
  );
}
