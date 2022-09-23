import React from 'react';
import Navbar from "./Navbar.js"
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import logo from "../../Assets/Main-Logo.png";
import brown from "@material-ui/core/colors/brown";
import Typography from '@mui/material/Typography';


export default class Home extends React.Component {
    render() {
        return (
            <React.Fragment>
            <Navbar>
               
            </Navbar>
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        backgroundImage: `url(${logo})`,
        backgroundColor: "#ADD8E6",
        
        '& > :not(style)': {
          m: 10,
          width: 2500,
          height: 1250,
          
        },
      }}
    >
         <Paper >
              <Typography
                // style={{ width: "70%", margin: "auto" }}
                variant="h3"
                color="textPrimary"
                component="span"
                
              >
                Monument.io is a brand new way to share travel experiences with friends and family!
              </Typography>
            </Paper>
      
      <Paper classname = "numberone" 
      variant="outlined" 
      square elevation={25} 
      sx ={{backgroundColor: "white", 
            border: `3px solid ${brown[200]}`
            }}/>
       
     
   
      
    </Box>
            
       </React.Fragment> )
    }
}