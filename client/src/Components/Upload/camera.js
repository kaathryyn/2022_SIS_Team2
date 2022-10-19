import React, { useRef } from "react";
import Webcam from "react-webcam";
import Button from '@mui/material/Button'; 
import { Grid } from "@mui/material";
import "./camera.css"
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Navbar from "../Navbar/Navbar";

const videoConstraints = {
  height: 500,
  width: 400,
  facingMode: "environment",
  position: 'relative',
  transform: 'rotateY(180deg) translateX(50%)',
  
};
 
const Camera = () => {
  const webcamRef = useRef(null);
  const [url, setUrl] = React.useState(null);
 
  const capturePhoto = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const response = await fetch('/upload', {
        method:'POST',
        headers: { 'Content-Type': 'multipart/form-data'},
        body: JSON.stringify(imageSrc)
    })
    setUrl(imageSrc);
  }, [webcamRef]);
 
  const onUserMedia = (e) => {
    console.log(e);
  };
 
  
  return (
    <div className="login-div">
      <Navbar/>
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
        videoConstraints={videoConstraints}
        onUserMedia={onUserMedia}
        mirrored={true}
        style={{borderRadius: '30px',}}
      
        
      />
     
    <Button style={{maxWidth: '155px', maxHeight: '50px', minWidth: '155px', minHeight: '50px', backgroundColor: "#688C40", borderRadius: 35, marginRight: 25, }} variant="contained" onClick={capturePhoto}>Capture{<CameraAltOutlinedIcon/>}</Button>
      <Button style={{maxWidth: '155px', maxHeight: '50px', minWidth: '155px', minHeight: '50px', backgroundColor: "#688C40", borderRadius: 35}} variant="contained" onClick={() => setUrl(null)}>Refresh {<RefreshRoundedIcon />}</Button>
      <Button style={{maxWidth: '155px', maxHeight: '50px', minWidth: '155px', minHeight: '50px', backgroundColor: "#688C40" , borderRadius: 35, marginLeft: 25, }} variant="contained" component="label" endIcon={<FileUploadIcon />}>Upload
        <input hidden accept="image/*" multiple type="file" />
      </Button>
      
      
      {url && (
        <div>
          <img src={url} alt="Screenshot" />
        </div>
      )}

    </Grid>
    
    </div>
  );
};
 
export default Camera;