import React from 'react';
import Navbar from "./Navbar.js"
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';



export default class Home extends React.Component {
    render() {
        return (
            <React.Fragment>
              
            <Navbar>
               
            </Navbar>
            
      
            
            <Paper  
            elevation ={8}
            variant = "outlined"
            sx={{  
              backgroundColor : "#ADD8E6",
              justifyContent: "center",
              alignItems: "center",
              verticalAlign: "middle",
              border: "1px solid black",
              padding: 2 
              
            }}>
              <Typography
                // style={{ width: "70%", margin: "auto" }}
                variant="h7"
                color="textPrimary"
                component="span"

                
                
              >
                Monument.io is a brand new way to share travel experiences with friends and family! Using Google Vision API our application can scan images taken by users and return detailed descriptions. Below are images that have been scanned by users and uploaded to our database. 
              </Typography>
            </Paper>  

    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        
        backgroundColor: "#ADD8E6",
        
        '& > :not(style)': {
          m: 10,
          width: 2500,
          height: 1250,
          
        },
      }}
    >
      <ImageList sx={{ 
      display: 'static',
      width: 900, 
      height: 500, 
      '&::-webkit-scrollbar': { 
      width: 0,
      },
      }}>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">
          <Typography
                // style={{ width: "70%", margin: "auto" }}
                variant="h6"
                color="textPrimary"
                component="span"
                
              >
                Images scanned using Monument.io
              </Typography></ListSubheader>
      </ImageListItem>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=248&fit=contain&auto=format`}
            srcSet={`${item.img}?w=248&fit=contain&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
           
           
          />
        </ImageListItem>
      ))}
    </ImageList>

   
    </Box>
            
       </React.Fragment> )
    }
}
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
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Monument 9',
   
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Monument 10',
    
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Monument 11',
    
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Monument 12',
    
    
  },
];