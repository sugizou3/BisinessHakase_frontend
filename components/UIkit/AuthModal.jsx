import * as React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { TextField, CircularProgress } from "@mui/material";
import {
  selectIsLoadingAuth,
  selectOpenModal,
  selectIsLoginTrueRegiFalse,
  resetOpenModal,
  changeIsLoginTrueRegiFalse,
  fetchCredStart,
  fetchCredEnd,
  fetchAsyncLogin,
  fetchAsyncRegister,
  fetchAsyncGetMyProf,
  fetchAsyncGetProfs,
  fetchAsyncCreateProf,
  isLoggedInOn,
} from "../../src/reducks/auth/authSlice";

export default function AuthModal({ openLimitation = false }) {
  var openModal = useSelector(selectOpenModal);
  const openFunc = () => {
    if (!openLimitation) {
      dispatch(resetOpenModal());
    }
  };

  const isLoginTrueRegiFalse = useSelector(selectIsLoginTrueRegiFalse);
  const isLoadingAuth = useSelector(selectIsLoadingAuth);
  const dispatch = useDispatch();
  var values = {}

  return (
    <div>
      <Modal
        open={openModal}
        onClose={() => {
          openFunc();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-96 minWidth-Modal  bg-gray-200 p-8 rounded-2xl">
          {isLoginTrueRegiFalse ? (
            <Formik
              initialErrors={{ email: "required" }}
              initialValues={{ email: "", password: "" }}
              onSubmit={async (values) => {
                console.log(values);
                await dispatch(fetchCredStart());
                const result = await dispatch(fetchAsyncLogin(values));
                console.log('test3');
                if (fetchAsyncLogin.fulfilled.match(result)) {
                  await dispatch(fetchAsyncGetProfs());

                  await dispatch(fetchAsyncGetMyProf());
                }
                dispatch(isLoggedInOn())
                await dispatch(fetchCredEnd());
                await dispatch(resetOpenModal());
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email("email format is wrong")
                  .required("email is must"),
                password: Yup.string().required("password is must").min(4),
              })}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                errors,
                touched,
                isValid,
              }) => (
                <div>
                  <form onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                      <h1 className="text-center text-4xl">BisiHaku</h1>
                      <br />
                      <div className="flex justify-center">
                        {isLoadingAuth && <CircularProgress />}
                      </div>
                      <br />

                      <TextField
                        variant="standard"
                        placeholder="email"
                        type="input"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        className="bg-gray-200"
                      />

                      {touched.email && errors.email ? (
                        <div className="text-red-600 text-center cursor-pointer">
                          {errors.email}
                        </div>
                      ) : null}
                      <br />

                      <TextField
                        variant="standard"
                        placeholder="password"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      />
                      {touched.password && errors.password ? (
                        <div className="text-red-600 text-center cursor-pointer">
                          {errors.password}
                        </div>
                      ) : null}
                      <br />
                      <br />
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={!isValid}
                        type="submit"
                      >
                        Login
                      </Button>
                      <br />
                      <br />
                      <Link href="/" passHref>
                        <Typography
                          className="mb-2 flex justify-center"
                          onClick={() => {
                            dispatch(resetOpenModal());
                          }}
                        >
                          Home
                        </Typography>
                      </Link>
                      <Typography
                        className="mb-4 flex justify-center"
                        onClick={async () => {
                          await dispatch(changeIsLoginTrueRegiFalse());
                        }}
                      >
                        新規登録
                      </Typography>
                    </div>
                  </form>
                </div>
              )}
            </Formik>
          ) : (
            <Formik
              initialErrors={{ email: "required" }}
              initialValues={{ email: "", password: "" }}
              onSubmit={async (values) => {
                console.log('test2');
                await dispatch(fetchCredStart());
                const resultReg = await dispatch(fetchAsyncRegister(values));

                if (fetchAsyncRegister.fulfilled.match(resultReg)) {
                  await dispatch(fetchAsyncLogin(values));
                  await dispatch(
                    fetchAsyncCreateProf({ nickName: "anonimous" })
                  );
                  await dispatch(fetchAsyncGetProfs());
                  await dispatch(fetchAsyncGetMyProf());
                }
                await dispatch(fetchCredEnd());
                await dispatch(resetOpenModal());
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email("email format is wrong")
                  .required("email is must"),
                password: Yup.string().required("password is must").min(4),
              })}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                errors,
                touched,
                isValid,
              }) => (
                <div>
                  <form onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                      <h1 className="text-center text-4xl">BisiHaku</h1>
                      <br />
                      <div className="flex justify-center">
                        {isLoadingAuth && <CircularProgress />}
                      </div>
                      <br />

                      <TextField
                        variant="standard"
                        placeholder="email"
                        type="input"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                      <br />
                      {touched.email && errors.email ? (
                        <div className="text-red-600 text-center cursor-pointer">
                          {errors.email}
                        </div>
                      ) : null}

                      <TextField
                        variant="standard"
                        placeholder="password"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      />
                      {touched.password && errors.password ? (
                        <div className="text-red-600 text-center cursor-pointer">
                          {errors.password}
                        </div>
                      ) : null}
                      <br />
                      <br />

                      <Button
                        variant="contained"
                        color="primary"
                        disabled={!isValid}
                        type="submit"
                      >
                        Register
                      </Button>
                      <br />
                      <br />
                      <Typography
                        className="mb-2 flex justify-center"
                        onClick={() => {
                          dispatch(resetOpenModal());
                        }}
                      >
                        Home
                      </Typography>
                      <Typography
                        className="my-4 flex justify-center"
                        onClick={async () => {
                          await dispatch(changeIsLoginTrueRegiFalse());
                        }}
                      >
                        すでにアカウントを持っている方
                      </Typography>
                    </div>
                  </form>
                </div>
              )}
            </Formik>
          )}
        </Box>
      </Modal>
    </div>
  );
}
