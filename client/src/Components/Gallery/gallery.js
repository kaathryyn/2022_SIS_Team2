import React, { useState, useCallback } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { photos } from "./photos";
import { Box } from "@mui/system";
import Navbar from "../Navbar/Navbar";
import "./gallery.css"
import { green } from "@mui/material/colors";


function PhotoGallery() {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  return (
    <>
    
    <Navbar></Navbar>
    <div className="gallery-div">
    <h1 id = "title">Images Scanned Using Vision API</h1>
    <Box
    sx={{
      display: 'flex',
      flexWrap: 'wrap',
      '& > :not(style)': {
        m: 10,
        width: 950,
        height: 300,
        backgroundColor: green,
        
      },
  }}>
    
    <div className = "gallery" >
      <Gallery photos={photos} onClick={openLightbox} columns = {3} rows = {3}/>
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map(x => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
    </Box>
    </div>
    </>
  );
}

export default PhotoGallery

