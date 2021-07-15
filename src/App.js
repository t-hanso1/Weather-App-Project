import React from "react";
import WeatherApp from "./WeatherApp.js";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 48,
    padding: "0 30px",
    marginTop: "30px",
    align: "center!"
  }
}));

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    align: "center!"
  }
});

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    align: "center!"
  }
});

export default function App() {
  const classes = useStyles();
  const [dark, setLight] = React.useState(true);

  return (
    <div className={classes.root}>
      <ThemeProvider theme={dark ? darkTheme : lightTheme}>
        <CssBaseline />
        <Paper>
          <WeatherApp />
        </Paper>
        <Button
          onClick={() => setLight((prev) => !prev)}
          variant="outlined"
          color="inherit"
        >
          Toggle Theme
        </Button>
      </ThemeProvider>
    </div>
  );
}
