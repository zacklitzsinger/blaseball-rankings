import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#ffab40",
    },
  },
  // palette: {

  //     primary: {
  //         main: '#556cd6',
  //     },
  //     secondary: {
  //         main: '#19857b',
  //     },
  //     error: {
  //         main: red.A400,
  //     },
  //     background: {
  //         default: '#fff',
  //     },
  // },
});

export default theme;
