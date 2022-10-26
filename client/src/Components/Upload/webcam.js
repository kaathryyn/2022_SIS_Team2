import "./webcam.css"
import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import axios from "axios";
import { Button, ButtonGroup } from "@mui/material"
import { FileUpload, RefreshRounded, CameraAltOutlined } from '@mui/icons-material';
import Navbar from '../Navbar/Navbar';


export default function WebcamSample() {
    const videoElement = useRef(null);
    const [url, setUrl] = useState("");
    const videoConstraints = useState({
        width: 450,
        height: 500,
        facingMode: "mirror"
    }); 
    
    const onUserMedia = (e) => console.log(e);

    const capturePhoto = useCallback(async () => {
        let stream = videoElement.current.stream;
        const tracks = stream.getTracks();
        await tracks.forEach(track => track.stop());
        const imageSrc = videoElement.current.getScreenshot();
        setUrl(imageSrc);
    }, [videoElement]);


    const refreshCapture = () => {
        setUrl(null);
    };

    const uploadPhoto = () => {
        const raw = url.replace("data:image/png;base64,", "");
        const img = createBlob(base64ToArrayBuffer(raw));
        var formData = new FormData();
        formData.append("image", img);
        axios.post("http://localhost:3001/vision", formData, { headers: {'Content-Type': 'multipart/form-data'} }).then((res) => {
            console.log(res);
        });
        refreshCapture();
    };

    const createBlob = (data) => {
        return new Blob([data], {type: "application/octet-stream"});
    };
    
    const base64ToArrayBuffer = (base64) => {
        var binary_string = window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    };

    return (
        <>
        <Navbar />
        <div id="myDiv">
            <div id="camView" >
                {!url ? (
                    <Webcam 
                        audio={false} 
                        ref={videoElement}
                        mirrored={true}
                        videoConstraints={videoConstraints}
                        onUserMedia={onUserMedia}
                        screenshotFormat="image/png" 
                        style={{borderRadius: '15px',}}
                    />
                ) : (
                    <img id="screengrab" src={url} alt="Screenshot" style={{borderRadius: '15px',}}/>
                )}
            </div>
            <div className="buttons">
                <ButtonGroup variant="contained">
                    <Button
                        size="small"
                        endIcon={<CameraAltOutlined />}
                        onClick={() => capturePhoto()}
                    >Capture Image</Button>

                    <Button
                        size="small"
                        endIcon={<RefreshRounded />}
                        onClick={() => refreshCapture()}
                    >Refresh</Button>

                    {url &&
                        <Button
                            size="small"  
                            endIcon={<FileUpload />}
                            onClick={() => uploadPhoto()}
                        >Upload</Button>
                    }
                </ButtonGroup>
            </div> 
        </div>
        </>
    );
};
