
// const express = require("express");

// const PORT = process.env.PORT || 3001;

// const app = express();

// app.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
// });

const fb = require("./firebase");
require('dotenv').config();

const http = require('http');
const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const vision = require("./vision");


//Initialise server
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Run when client connects
io.on('connection', socket => {
    console.log('New WS Connection...')
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Incoming file storage function
const multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.env.UPLOAD_LOC);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage });


// API Endpoints
app.use(express.json());
app.use(express.urlencoded({extended:true})); // Change this for different HTTP bodies
app.get('/', (req, res)=>{
    console.log(req.headers);
    res.send("Welcome to your server");
});
app.post('/upload', upload.single("image"), async(req, res)=>{
    const file = req.file.filename;
    const loc = req.file.destination;
    const path = "./" + loc + "/" + file;
    // const func = await vision.detectLandmark(path); // Commented to reduce usage
    res.send("Successful post");
});

app.post('/login', async(req, res) => {
    // require("firebase-admin");
    // const fs = firestore(app);
    // console.log(fs.collection("users"));
});


// require("./vision");