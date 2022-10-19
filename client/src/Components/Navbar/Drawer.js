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
  link: { textDecoration: "none", color: "#688c40", fontSize: "20px" },
  icon: { color: "white" },
  logo: { flexGrow: "1", cursor: "pointer" },
 
}));


function DrawerComponent() {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <Drawer
        anchor="left"
        sx={{ width: 250, color: "#688c40" }}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        drawerBackgroundColor = "black"
      >
        <Toolbar sx={{ bgColor: "#green" }}>
          <Typography variant="h4" className={classes.logo}>
            Monument.io 
          </Typography>
          <CloseIcon 
           onClick={() => setOpenDrawer(!openDrawer)}/>
        </Toolbar>
        <Box sx={{ backgroundColor: "#688c40" }} height="1000vh">
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
                  Gallery
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
