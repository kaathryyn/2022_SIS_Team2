import "./webcam.css"
import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import axios from "axios";
import { Button, ButtonGroup, Grid } from "@mui/material"
import { FileUpload, RefreshRounded, CameraAltOutlined } from '@mui/icons-material';
import Navbar from '../Navbar/Navbar';

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

export default function WebcamSample() {
    const videoElement = useRef(null);
    const [captureData, setCaptureData] = useState("");
    const [landmark, setLandmark] = useState("");
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

        const raw = captureData.replace("data:image/png;base64,", "");
        const buffer = base64ToArrayBuffer(raw);
        const blob = createBlob(buffer);
        const file = new File([blob], "test.png");

        var formData = new FormData();
        formData.append("image", file);
        // document.getElementById("camera-image").src = (URL.createObjectURL(file));
        UseVision(formData, "camera-canvas");

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
        // document.getElementById("camera-image").src = (URL.createObjectURL(file));
        UseVision(formData, "camera-canvas");

        refreshCapture();
    };
    
    const handleInput = (event) => {
        const file = event.target.files[0];
        
        var formData = new FormData();
        formData.append("image", file);
        document.getElementById("preview-image").src = (URL.createObjectURL(file));
        UseVision(formData, "preview-canvas", document.getElementById("preview-image"));
    };

    const UseVision = useCallback((data, target, img="") => {
        setLandmark(null);
        axios.post("http://localhost:3001/vision", data, { headers: {'Content-Type': 'multipart/form-data'} }).then((res) => {
            if (!res.data[0]) throw "No landmark";
            var regex = /\_/g;
            const markName = res.data[0].replace(regex, " ");
            setLandmark(markName);

            var poly = res.data.slice(1);
            var canvas = document.getElementById(target);
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext("2d");

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            ctx.strokeStyle = "red";
            ctx.lineWidth = 3;
            ctx.strokeRect(poly[0][0], poly[0][1], poly[2][0]-poly[0][0], poly[2][1]-poly[0][1]);
        })
        .catch(() => {
            var canvas = document.getElementById(target);
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext("2d");

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        });
    }, []);

    const handleUpload = async (target) => {
        if (!target) return;
        var img = document.getElementById(target);
        var file = await fetch(img.src)
            .then(res => res.blob())
            .then(blob => { return new File([blob], 'upload.png', blob) });

        console.log(file);
        var formData = new FormData();
        formData.append("image", file);
        formData.append("id", localStorage.getItem("user"));
        formData.append("landmark", landmark);
        axios
            .post("http://localhost:3001/upload", formData, {headers: {'Content-Type': 'multipart/form-data'}})
            .then((res) => {
                console.log(res.data)
            })
            .catch((e) => {
                console.log(e);
            })
    };

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
                        <div>
                            <img id="camera-image" src={captureData} style={{borderRadius: '15px',}}/>
                            {/* <canvas id="camera-canvas" /> */}
                        </div>
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
                                onClick={() => handleUpload("camera-image")}
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
                        <Button onClick={() => handleUpload("preview-image")}>Upload</Button>
                    </ButtonGroup>
                </div>
                <div><h1>{(landmark || "No landmark") + " detected"}</h1></div>
                <div><img id="preview-image" hidden /><canvas id="preview-canvas" /></div>
            </Grid>
        </div>
        </>
    );
};
