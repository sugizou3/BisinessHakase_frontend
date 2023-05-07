import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import React from "react";
import store from "../src/reducks/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import Layout from "components/Layout";

let persistor = persistStore(store);

function MyApp({ Component, pageProps }) {

  const theme = createTheme({
    typography: {
      fontFamily: ["Noto Sans Japanese", "Roboto"].join(","),
    },
  });


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Layout>
            <Component {...pageProps}></Component>
          </Layout>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
