import React, { useRef } from "react";
import Webcam from "react-webcam";
import Button from '@mui/material/Button'; 
import { Grid } from "@mui/material";
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Navbar from "../Navbar/Navbar";
import "./camera.css"
 
const Camera = () => {
  const webcamRef = useRef(null);
  const [url, setUrl] = React.useState(null);
 
  const capturePhoto = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    
    setUrl(imageSrc);
  }, [webcamRef]);
 
  const onUserMedia = (e) => {
    console.log(e);
  };
 
  
  return (
    <>
    <div className="login-div">
    <Navbar/>
    <div id = "buttons" > 
      <Button variant="contained" onClick={() => capturePhoto()}>Capture{<CameraAltOutlinedIcon/>}</Button>
      <Button variant="contained" onClick={() => setUrl(null)}>Refresh {<RefreshRoundedIcon />}</Button>
      <Button variant="contained" component="label" endIcon={<FileUploadIcon />}>Upload
      <input hidden accept="image/*" multiple type="file" />
      </Button>
      </div>
    <Grid
    container spacing={42}
    direction="row"
    alignItems="flex-end"
    justifyContent="center"
    style={{ minHeight: '100vh' }}
    >
     
    
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/png"
        
        onUserMedia={onUserMedia}
        mirrored={true}
        
      
        
      />
      
      
      {url && (
        <div >
        <img src={url} alt="Screenshot" />
        </div>
      )}

    </Grid>
    </div>
    </>
  );
};
 
export default Camera;