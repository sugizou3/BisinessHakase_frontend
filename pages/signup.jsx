import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useRouter } from "next/router";
import Cookie from "universal-cookie";
import { useSelector, useDispatch } from "react-redux";
import {
  editEmail,
  editPassword,
  toggleMode,
  selectAuthen,
  selectIsLoginView,
  selectProfile,
  fetchAsyncRegister,
  fetchAsyncProf,
} from "../src/reducks/login/loginSlice";

const cookie = new Cookie();

const theme = createTheme();

export default function Auth() {
  const dispatch = useDispatch();
  const authen = useSelector(selectAuthen);
  const isLoginView = useSelector(selectIsLoginView);
  const btnDisabler = authen.email === "" || authen.password === "";

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  // const login = async () => {
  //   if (isLoginView) {
  //     await dispatch(fetchAsyncLogin(authen));
  //   } else {
  //     const result = await dispatch(fetchAsyncRegister(authen));

  //     if (fetchAsyncRegister.fulfilled.match(result)) {
  //       await dispatch(fetchAsyncLogin(authen));
  //     }
  //   }
  // };

  // return (
  //   <>
  //     <ThemeProvider theme={theme}>
  //       <Container component="main" maxWidth="xs">
  //         <CssBaseline />
  //         <Box
  //           sx={{
  //             marginTop: 8,
  //             display: "flex",
  //             flexDirection: "column",
  //             alignItems: "center",
  //           }}
  //         >
  //           <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
  //             <LockOutlinedIcon />
  //           </Avatar>
  //           <Typography component="h1" variant="h5">
  //             {isLoginView ? "Sign in" : "Sign up"}
  //           </Typography>
  //           <Box component="form"  noValidate sx={{ mt: 1 }}>
  //             <TextField
  //               margin="normal"
  //               required
  //               fullWidth
  //               id="email"
  //               label="Email Address"
  //               name="email"
  //               autoComplete="email"
  //               autoFocus
  //               onChange={(e) => {
  //                 dispatch(editEmail(e.target.value))
  //               }}
  //             />
  //             <TextField
  //               margin="normal"
  //               required
  //               fullWidth
  //               name="password"
  //               label="Password"
  //               type="password"
  //               id="password"
  //               autoComplete="current-password"
  //               onChange={(e) => {
  //                 dispatch(editPassword(e.target.value))
  //               }}
  //             />

  //             <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold mt-5 mb-5 w-full py-2 px-4 rounded"
  //               onClick={login}>
  //             {isLoginView ? "ログイン" : "サインアップ"}
  //             </button>
  //             <div className="mt-16 text-center flex flex-col">
  //               <span onClick={() => dispatch(toggleMode())}>
  //                 {isLoginView ? "サインアップを行う" : "サインインする"}
  //               </span>
  //               <Link href="/" variant="body2" className="text-lg mt-10">
  //                 ホーム
  //               </Link>
  //             </div>
  //           </Box>
  //         </Box>
  //       </Container>
  //     </ThemeProvider>
  //   </>
  // );

  const login = async () => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/auth/jwt/create/`,
        {
          method: "POST",
          body: JSON.stringify({ email: email, password: password }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.status === 400) {
            throw "authentication failed";
          } else if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          const options = { path: "/" };
          cookie.set("access_token", data.access, options);
          dispatch(editEmail(email));
          dispatch(editPassword(password));
        });
      router.push("/");
    } catch (err) {
      alert(err);
    }
  };

  const authUser = async (e) => {
    e.preventDefault();
    if (isLogin) {
      login();
    } else {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/register/`, {
          method: "POST",
          body: JSON.stringify({ email: email, password: password }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => {
          if (res.status === 400) {
            throw "authentication failed";
          }
        });
        login();
      } catch (err) {
        alert(err);
      }
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={authUser} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold mt-5 mb-5 w-full py-2 px-4 rounded">
                ログイン
              </button>
              <div className="mt-16 text-center flex flex-col">
                  <Link href="#" variant="body2" className="text-lg ">
                    すでにアカウントを持っている
                  </Link>
                  <Link href="/" variant="body2" className="text-lg mt-10">
                    ホーム
                  </Link>
                </div>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
