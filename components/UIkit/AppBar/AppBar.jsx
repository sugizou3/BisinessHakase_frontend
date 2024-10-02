import { SearchComponent } from "../index.jsx";
import { ProRegIcon } from "../index.jsx";
import { useDispatch } from "react-redux";
import { createTheme } from "@mui/material/styles";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
    },
  },
});

export default function AppBar() {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-between items-center h-14 mx-4">
      <div className=" ml-4 bg-gray-500 h-9 w-12 flex items-center justify-center rounded-md">
        <LightbulbIcon theme={theme} color="primary" />
      </div>
      <div className="flex items-center justify-center flex-grow h-10">
        <SearchComponent />
      </div>
      <ProRegIcon />
    </div>
  );
}
