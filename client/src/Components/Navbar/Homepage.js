import React from 'react';
import Navbar from "./Navbar.js"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import { Button } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Link } from "react-router-dom"; 

import Grid from '@mui/material/Grid';
import "./homepage.css"


function Home() {
  
  return (
    <React.Fragment>
      <Navbar/>
      <div className = "outerdiv">
      <Grid sx = {{
        backgroundColor: "green",
        alignItems: "flex-end"
      }}>
      </Grid>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          borderColor: 'error.main',
          
          '& > :not(style)': {
            m: 1,
            width: 900,
            height: 600,
          },
        }}
      >
      <Button style={{maxWidth: '155px', maxHeight: '50px', minWidth: '155px', minHeight: '50px', backgroundColor: "#688C40",}}  component={Link} to="/camera" variant="contained" endIcon={<PhotoCamera />} >
      Vision API
      </Button>
      <ImageList sx={{ 
        display: 'static',
        
        '&::-webkit-scrollbar': { 
        width: 0,
        },
      }}>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div" backgroundColor = "blue">
          <Typography
            variant="h6"
            color="textPrimary"
            component="span"
            backgroundColor="transparent"
          >
            Images scanned using Monument.io
          </Typography>
        </ListSubheader>
      </ImageListItem>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=248&fit=contain&auto=format`}
            srcSet={`${item.img}?w=248&fit=contain&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
            onClick
          />
          <ImageListItemBar title={item.title} />
        </ImageListItem>
      ))}
    </ImageList>
    
    </Box>
    </div>  
  </React.Fragment> )
}

export default Home; 

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Opera House',
    
    
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Sydney Tower',
    
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Monument 3',
    
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Monument 4',
    
    
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Monument 5',
   
   
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Monument 6',
    
   
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Monument 7',
    
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Monument 8',
    
  },

];