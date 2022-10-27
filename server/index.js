
// const express = require("express");

// const PORT = process.env.PORT || 3001;

// const app = express();

// app.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
// });

require('dotenv').config();

const http = require('http');
const express = require('express');
const path = require('path');
const cors = require("cors");
const socketio = require('socket.io');
const vision = require("./vision");
const fb = require("./firebase");
const wiki = require("./wikiAPI");

//Initialise server
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Run when client connects
io.on('connection', socket => {
    console.log('New WS Connection...')
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Incoming file storage function
const multer = require("multer");
const { ppid } = require('process');
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
    return res.send("Welcome to your server");
});

// Retrieves all user photos
app.post('/gallery', async(req, res) => {
    const {docId} = req.body;
    console.log(docId);
    if (docId.length === 20) {
        const result = await fb.getGallery(docId);
        
        const fs = require("fs");
        const files = [...result];
        files.forEach(file => {
            const path = require("path");
            var dir = path.resolve(process.env.PUBLIC_LOC + "/" + docId);
            if (!fs.existsSync(dir)) fs.mkdirSync(dir);
            fs.writeFileSync(dir + "/" + file.landmark + ".png", file.imageContent);
        })

        return res.send(result);
    }
    res.status(400).send("Bad Request!");
});

// Retrieves location data
app.get('/landmark', async(req, res) => {
    
});

// Runs Vision AI on incoming image
app.post('/vision', upload.single("image"), async(req, res)=>{
    try {
        const file = req.file.filename;
        const loc = req.file.destination;
        const path = "./" + loc + "/" + file;
        // const result = await vision.detectLandmark(path); // Commented to reduce usage
        // res.send(result);
        res.send("Done");
    }
    catch { res.status(405).send("Failed to process request."); }
});

// Add to User Gallery
app.post('/upload', upload.single("image"), async(req, res)=>{
    const {id, landmark} = req.body;
    if (!(id && landmark)) { return res.status(400).send("Bad Request!"); }
    try {
        const filename = req.file.filename;
        const location = req.file.destination;
        const path = "./" + location + "/" + filename;
    
        const fs = require("fs");
        const blob = fs.readFileSync(path, null);
        const result = fb.addToGallery(id, blob, landmark) // Boolean returned
        res.send(result);
    }
    catch { res.status(405).send("Failed to process request."); }
});

// Checks if user can log in
app.post('/login', async(req, res) => {
    const login = req.body;
    if (typeof login === "object") {
        const result = await fb.checkUser(login); // User ID is returned
        return result && res.send(result);
    }
    res.status(400).send("Bad Request!");
    
});

// Create new user
app.post('/signup', async(req, res) => {
    const user = req.body;
    if (typeof user === "object") {
        const result = await fb.addUser(user); // User ID is returned
        return res.send(result);
    }
    res.status(400).send("Bad Request!");
});
