import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/Store.jsx";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import theme from "./theme/Theme.jsx";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeStudent from './HomeStudent/index.jsx'

ReactDOM.createRoot(document.querySelector("#root")).render(
  <React.StrictMode>
 
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
