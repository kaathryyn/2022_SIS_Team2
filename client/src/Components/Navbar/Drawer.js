import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Toolbar,
  Typography,
  makeStyles,
  Box
} from "@material-ui/core";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(() => ({
  link: { textDecoration: "none", color: "blue", fontSize: "20px" },
  icon: { color: "white" },
  logo: { flexGrow: "1", cursor: "pointer" },
  draw: { background: "red" }
}));

function DrawerComponent() {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <Drawer
        anchor="left"
        sx={{ width: 250, color: "#fff" }}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Toolbar sx={{ backgroundColor: "primary.main" }}>
          <Typography variant="h4" className={classes.logo}>
            Monument.io 
          </Typography>
          <CloseIcon 
           onClick={() => setOpenDrawer(!openDrawer)}/>
        </Toolbar>
        <Box sx={{ backgroundColor: "primary.main" }} height="1000vh">
          <List height="100vh">
            <Divider />
            <ListItem onClick={() => setOpenDrawer(false)}>
              <ListItemText>
                <Link to="/home" className={classes.link}>
                  Home
                </Link>
              </ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText>
                <Link to="/login" className={classes.link}>
                  Login
                </Link>
              </ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText>
                <Link to="/signup" className={classes.link}>
                  Signup
                </Link>
              </ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText>
                <Link to="/" className={classes.link}>
                  FAQ
                </Link>
              </ListItemText>
            </ListItem>
            <Divider />
          </List>
        </Box>
      </Drawer>
      <IconButton
        className={classes.icon}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
}

export default DrawerComponent;
