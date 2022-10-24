import React from "react";
import logo from "../../Assets/Main-Logo.png";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  makeStyles,
  Typography,
  useTheme,
  useMediaQuery
} from "@material-ui/core";
import { Link } from "react-router-dom";
import DrawerComponent from "./Drawer.js";

const useStyles = makeStyles((theme) => ({
  navlinks: { marginLeft: theme.spacing(135), display: "flex", },
  logo: { flexGrow: "1", cursor: "pointer", display: "static",},
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "25px",
    marginLeft: theme.spacing(2),
    "&:hover": { color: "yellow", borderBottom: "1px solid yellow" }
  }
}));

function Navbar() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo} >
        <a href="/home">  
                <img
                    alt="Main Logo"
                    src={logo}
                    className="main-logo"
                ></img>
                </a>
        </Typography>
        {isMobile ? (
          <DrawerComponent />
        ) : (
          <div className={classes.navlinks}>
            <Link to="/home" className={classes.link}>
              Home
            </Link>
            <Link to="/login" className={classes.link}>
              Login
            </Link>
            <Link to="/signup" className={classes.link}>
              Signup
            </Link>
            <Link to="/gallery" className={classes.link}>
              Gallery
            </Link>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
