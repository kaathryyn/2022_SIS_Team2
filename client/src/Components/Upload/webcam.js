import "./webcam.css"
import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import axios from "axios";
import { Button, ButtonGroup, Grid } from "@mui/material"
import { FileUpload, RefreshRounded, CameraAltOutlined } from '@mui/icons-material';
import Navbar from '../Navbar/Navbar';


export default function WebcamSample() {
    const videoElement = useRef(null);
    const [captureData, setCaptureData] = useState("");
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
        setCaptureData(imageSrc);
    }, [videoElement]);


    const refreshCapture = () => {
        setCaptureData(null);
    };

    const uploadPhoto = () => {
        const raw = captureData.replace("data:image/png;base64,", "");
        const buffer = base64ToArrayBuffer(raw);
        const blob = createBlob(buffer);
        const file = new File([blob], "test.png");
        var formData = new FormData();
        formData.append("image", file);
        axios.post("http://localhost:3001/vision", formData, { headers: {'Content-Type': 'multipart/form-data'} }).then((res) => {
            console.log(res.data);
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

    const arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };

    const handleUpload = () => {

    };

    const handleInput = (event) => {
        const file = event.target.files[0];
        var formData = new FormData();
        formData.append("image", file);
        axios.post("http://localhost:3001/vision", formData, { headers: {'Content-Type': 'multipart/form-data'} }).then((res) => {
            console.log(res.data);
        });
        document.getElementById("preview-image").src = (URL.createObjectURL(file));
    }

    return (
        <>
        <Navbar />
        <div id="myDiv">
            <Grid
                container
                direction={"column"}
                sx = {{
                    width: "100%",
                    display: "flex",
                    flexwrap: "wrap",
                    justifyContent: "center",
                    verticalAlign: "center",
                    textAlign: "center"
                }}
            >
                <div id="camView" >
                    {!captureData ? (
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
                        <img id="screengrab" src={captureData} alt="Screenshot" style={{borderRadius: '15px',}}/>
                    )}
                </div>
                <div>
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

                        {captureData &&
                            <Button
                                size="small"  
                                endIcon={<FileUpload />}
                                onClick={() => uploadPhoto()}
                            >Upload</Button>
                        }
                    </ButtonGroup>
                </div> 
                <div className="buttons">
                    <ButtonGroup variant="contained">
                        <Button
                            variant="contained"
                            component="label"
                            sx = {{
                                borderColor: "#364d2a !important",
                                backgroundColor: "#688C40 !important",
                            }}
                        >Browse...<input type="file" accept=".jpg, .jpeg, .png, .bmp" onChange={(event) => handleInput(event)} hidden /></Button>
                        <Button onClick={() => handleUpload()}>Submit</Button>
                    </ButtonGroup>
                </div>
                <div><img id="preview-image"></img></div>
            </Grid>
        </div>
        </>
    );
};
