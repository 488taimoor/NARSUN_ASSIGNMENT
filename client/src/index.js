import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./store/index";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import './index.css';


import Root from './routes'
const theme = createMuiTheme({
  palette: {
     
      typography: {
          "fontFamily": "\"roboto\"",
         
         }

  },
});


const font = "'Roboto', sans-serif";

render(
  <Provider store={store} >
      <Root />

  </Provider>,
  document.getElementById("app")
);
