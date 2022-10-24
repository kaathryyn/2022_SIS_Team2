import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import "./webcam.css"
import FileUploadIcon from '@mui/icons-material/FileUpload';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import Navbar from '../Navbar/Navbar';
function WebcamSample() {

    const videoElement = useRef(null);

    
    const [url, setUrl] = React.useState(null);
    
    const capturePhoto = React.useCallback(async () => {
    const imageSrc = videoElement.current.getScreenshot();
        
    setUrl(imageSrc); }, [videoElement]);

    const onUserMedia = (e) => {
    console.log(e);};

    const videoConstraints = {
        width: 450,
        height: 500,
        facingMode: "user"
    }
    
    const [isShowVideo, setIsShowVideo] = useState(true);


    const startCam = () => {
        setIsShowVideo(true);
    }

    const stopCam = () => {
        let stream = videoElement.current.stream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        setIsShowVideo(false);
    }


    return (
        <>
        <Navbar></Navbar>
        <div className="bigdiv">
            <div id = "myDiv">
             
            <div id="camView" >
                {isShowVideo &&
                    <Webcam 
                    audio={false} 
                    ref={videoElement} 
                    videoConstraints={videoConstraints}
                    onUserMedia={onUserMedia}
                    screenshotFormat="image/png" 
                    style={{borderRadius: '15px',}}/>
                }
            </div>
            {url && (
        <div id = "camView">
        <img id = "screengrab" src={url} alt="Screenshot"   style={{borderRadius: '15px',}}/>
        </div>
      )}
            <div className = "buttons">
            <ButtonGroup  variant = "contained" >
            <Button
                onClick={() => {
                    capturePhoto();
                    stopCam();
                  
                }}
                size = "small"
                
             >
                Capture Image
                {<CameraAltOutlinedIcon/>}
             </Button>
             

             <Button
                onClick={() => {
                    setUrl(null)
                    startCam();
                  
                }}   
                size = "small"
             >
                Refresh
                {<RefreshRoundedIcon />}
             </Button>

             <Button
                onClick={() => {
                    setUrl(null)
                    startCam();
                  
                }} 
                size = "small"  
             >
                Upload
                {<FileUploadIcon />}
             </Button>

             </ButtonGroup>
             </div> 
             </div>
            
        </div>
        </>
    );
};


export default WebcamSample;