import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { SearchComponent } from "./index.js";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookie from "universal-cookie";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAuthen,
  editEmail,
  editPassword,
} from "../../src/reducks/login/loginSlice.js";

const cookie = new Cookie();

export default function AppBar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const authen = useSelector(selectAuthen);

  const logout = () => {
    dispatch(editEmail(""));
    dispatch(editPassword(""));
    cookie.remove("access_token", { path: "/" });
    router.push("/signup");
  };

  return (
    <div className="flex justify-between items-center h-14 mx-4">
      <div className="-ml-3">
        <img
          className="h-8 w-8 ml-3"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
      </div>
      <div className="flex items-center justify-center flex-grow h-10">
        <SearchComponent />
      </div>
      {authen.email ? (
        <button onClick={logout}>
          <Avatar>H</Avatar>
        </button>
      ) : (
        <Link href="signup/">
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            sx={{ fontWeight: "bold", width: 90 }}
            className="flex items-center "
          >
            ログイン
          </Button>
        </Link>
      )}
    </div>
  );
}
