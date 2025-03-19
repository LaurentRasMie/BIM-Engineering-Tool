// index.js - Point d'entrée de l'application React
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./index.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#005A9C", // Bleu Egis
    },
    secondary: {
      main: "#A5ACAF", // Gris clair Egis
    },
    background: {
      default: "#F4F4F4", // Fond gris clair
      paper: "#FFFFFF",
    },
    text: {
      primary: "#333333",
      secondary: "#555555",
    },
  },
  typography: {
    fontFamily: "Arial, Helvetica, sans-serif",
    h6: {
      fontWeight: 600,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
