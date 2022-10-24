import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {IconButton} from "@material-ui/core";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";

export default function DrawerComponent() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
     

                <IconButton sx={{  }}
                size="large"
                aria-label="account of current user"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
		            aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
            <MenuItem divider = "true" dense = "true" component={Link} to="/home"> Home</MenuItem>

            <MenuItem divider = "true" dense = "true" component={Link} to="/login" onClick={handleClose}> Login</MenuItem>

            <MenuItem divider = "true" dense = "true" component={Link} to="/signup"> Signup</MenuItem>

            <MenuItem dense = "true" component={Link} to="/gallery" onClick={handleClose}>Gallery </MenuItem>
      </Menu>
    </div>
  );
}

