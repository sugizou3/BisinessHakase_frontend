import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
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
} from "../../src/reducks/auth/authSlice";

export default function AuthModal() {
  const openModal = useSelector(selectOpenModal);
  const isLoginTrueRegiFalse = useSelector(selectIsLoginTrueRegiFalse);
  const isLoadingAuth = useSelector(selectIsLoadingAuth);
  const dispatch = useDispatch();

  return (
    <div>
      <Modal
        open={openModal}
        onClose={async () => {
          await dispatch(resetOpenModal());
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-96 bg-gray-200 p-8 rounded-2xl">
          {isLoginTrueRegiFalse ? (
            <Formik
              initialErrors={{ email: "required" }}
              initialValues={{ email: "", password: "" }}
              onSubmit={async (values) => {
                await dispatch(fetchCredStart());
                const result = await dispatch(fetchAsyncLogin(values));
                if (fetchAsyncLogin.fulfilled.match(result)) {
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
                      <span
                        className="my-4 flex justify-center"
                        onClick={async () => {
                          await dispatch(changeIsLoginTrueRegiFalse());
                        }}
                      >
                        You dont have a account ?
                      </span>
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
                await dispatch(fetchCredStart());
                const resultReg = await dispatch(fetchAsyncRegister(values));

                if (fetchAsyncRegister.fulfilled.match(resultReg)) {
                  await dispatch(fetchAsyncLogin(values));
                  await dispatch(
                    fetchAsyncCreateProf({ nickName: "anonymous" })
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
                      <span
                        className="my-4 flex justify-center"
                        onClick={async () => {
                          await dispatch(changeIsLoginTrueRegiFalse());
                        }}
                      >
                        You already have a account ?
                      </span>
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
