import React, { useEffect, useState } from 'react';
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
import axios from 'axios';


export default function Home() {
  const [itemData, setItemData] = useState([]);
  useEffect(() => {
    var user = localStorage.getItem("user");
    const data = {"docId": user};
    axios
      .post("http://localhost:3001/gallery", data, {headers: {'Content-Type': "application/json"}})
      .then((res) => {
        // res.data.forEach(img => {
        //   console.log();
        // });
        var images = [...res.data];
        images.forEach((img, index) => {
          images[index].src = "http://localhost:3001/" + user + "/" + img.landmark + ".png";
        });
        setItemData(images);
      })
      .catch((e) => console.log(e.message));
  }, [localStorage.getItem("user")]);


  const arrayBufferToBase64 = (buffer) => {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
};
  
  return (
    <div>
      <Navbar/>
      <div
        className = "outerdiv"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: "center",
        }}
      >
        <Grid
          container
          columnSpacing={5}
          sx = {{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: "center",
            verticalAlign: "center",
          }}
        >
          <Grid
            item
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: "center",
              borderColor: 'error.main',
              
              '& > :not(style)': {
                m: 1,
                width: "75vw",
                height: "85vh",
              },
            }}
          >
            <ImageList sx={{ 
              display: 'static',
              
              '&::-webkit-scrollbar': { 
              width: 0,
              },
            }}>
              {itemData.map((item) => (
                <ImageListItem key={item.imageContent}>
                  <img
                    src={`${item.src}`}
                    srcSet={`${item.src}`}
                    // src={`${"data:image/png;base64," + item.imageContent}?w=248&fit=contain&auto=format`}
                    // srcSet={`${"data:image/png;base64," + item.imageContent}?w=248&fit=contain&auto=format&dpr=2 2x`}
                    alt={item.landmark}
                    loading="lazy"
                    onClick
                  />
                  <ImageListItemBar title={item.landmark} />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
          <Grid
            item
            sx = {{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: "center",
              padding: "1rem",
            }}
          >
            <Button
              variant="contained"
              endIcon={<PhotoCamera />}
              component={Link} to="/camera"
              style={{maxWidth: '155px', maxHeight: '50px', minWidth: '155px', minHeight: '50px', backgroundColor: "#688C40",}}
            >
              Upload
            </Button>
          </Grid>
        </Grid>
      </div>  
    </div>
  )
}

// const itemData = [
//   {
//     img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
//     title: 'Opera House',
    
    
//     featured: true,
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
//     title: 'Sydney Tower',
    
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
//     title: 'Monument 3',
    
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
//     title: 'Monument 4',
    
    
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
//     title: 'Monument 5',
   
   
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
//     title: 'Monument 6',
    
   
//     featured: true,
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
//     title: 'Monument 7',
    
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
//     title: 'Monument 8',
    
//   },

// ];