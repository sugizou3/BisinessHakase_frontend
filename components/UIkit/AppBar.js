import Button from "@mui/material/Button";
import { SearchComponent } from "./index.js";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookie from "universal-cookie";

const cookie = new Cookie();

export default function AppBar() {
  const router = useRouter();

  const logout = () => {
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
        <Button
          type="submit"
          fullWidth
          variant="outlined"
          sx={{ fontWeight: "bold", width: 90 }}
          className="flex items-center "
          onClick={logout}
        >
          ログイン
        </Button>
    </div>
  );
}
