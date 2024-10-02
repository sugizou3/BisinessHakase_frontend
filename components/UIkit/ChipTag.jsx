import * as React from "react";
import Chip from "@mui/material/Chip";
import useRouter from "next/router";
import setSearchText from "src/reducks/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import selectPostEditState from "src/reducks/post/postSlice";

export default function ChipTag({
  label = "",
  href = "search/",
  id,
  deleteWord,
  children,
  menu = false,
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const editState = useSelector(selectPostEditState);
  // console.log(deleteWord);

  const searchFunc = async (text) => {
    // e.preventDefault();
    if (!menu) {
      dispatch(setSearchText(text));
      console.log("tetetet");
      router.push("/search");
    }
    router.push(href);
  };

  return (
    <div className="pr-3">
      {editState ? (
        <div>
          {children ? (
            <Chip
              icon={children}
              label={label}
              sx={{ pl: 0.7, pr: 0.4, py: 0.2, fontSize: 15 }}
              onDelete={() => deleteWord(id)}
              // onClick={() => searchFunc(label)}
            />
          ) : (
            <Chip
              label={label}
              sx={{ px: 0.4, py: 0.2, fontSize: 15 }}
              onDelete={() => deleteWord(id)}
              // onClick={() => searchFunc(label)}
            />
          )}
        </div>
      ) : (
        <div>
          {children ? (
            <Chip
              icon={children}
              label={label}
              sx={{ pl: 0.7, pr: 0.4, py: 0.2, fontSize: 15 }}
              onClick={() => searchFunc(label)}
            />
          ) : (
            <Chip
              label={label}
              sx={{ px: 0.4, py: 0.2, fontSize: 15 }}
              onClick={() => searchFunc(label)}
            />
          )}
        </div>
      )}
    </div>
  );
}
