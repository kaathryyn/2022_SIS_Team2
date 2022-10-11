// VISION API
const vision = require("@google-cloud/vision");
const { ok } = require("assert");
const GCP_CREDENTIALS = require("./GCP_CREDS.json");

const CREDENTIALS = JSON.parse(
    JSON.stringify(GCP_CREDENTIALS)
);

const CONFIG = {
    credentials: {
        private_key: CREDENTIALS.private_key,
        client_email: CREDENTIALS.client_email,
    },
};

const bucketName = "gs://spr22-sis-team2.appspot.com/Test";
const filename = "sydney-opera-house-selfie.jpg";
// var img = `${bucketName}/${filename}`;
var img = "gs://cloud-samples-data/vision/landmark/st_basils.jpeg";

async function detectLandmark(img) {
    const client = new vision.ImageAnnotatorClient(CONFIG);

    var landmarkInfo = [];
    var landmarkVertices;

    const [result] = await client.landmarkDetection(img);
    const landmarks = result.landmarkAnnotations;

    // landmarkAnnotations[0] = result with highest score (match)
    if (landmarks[0]?.description) {
        console.log(`Landmark identified for file ${img}:`);
        landmarks.forEach(l => console.log(l.description));
        landmarkVertices = landmarks[0].boundingPoly.vertices;
        
        // Getting Coords of Bounding Box
        var topLeft_x = landmarkVertices[0].x;
        var topLeft_y = landmarkVertices[0].y;
        var topRight_x = landmarkVertices[1].x;
        var topRight_y = landmarkVertices[1].y;
        var bottomRight_x = landmarkVertices[2].x;
        var bottomRight_y = landmarkVertices[2].y;
        var bottomLeft_x = landmarkVertices[3].x;
        var bottomLeft_y = landmarkVertices[3].y;

        // Pushing all landmark information to variable
        landmarkInfo.push(landmarks[0].description);
        // Bounding box order = top_left > top_right > bottom_right > bottom_left
        landmarkInfo.push(topLeft_x);
        landmarkInfo.push(topLeft_y);
        landmarkInfo.push(topRight_x);
        landmarkInfo.push(topRight_y);
        landmarkInfo.push(bottomRight_x);
        landmarkInfo.push(bottomRight_y);
        landmarkInfo.push(bottomLeft_x);
        landmarkInfo.push(bottomLeft_y);
    }
    else console.log(`No famous landmark detected for file ${img}`);
    console.log("----------------------------------------------------------------------------------------------------");

    console.log(landmarkInfo);
    return landmarkInfo;
}

// detectLandmark(img);

////////////////////////////
///////--- Tests ---////////
////////////////////////////
console.log("====================================================================================================");
console.log("Beginning Tests...");
console.log("Batch Read");
console.log("====================================================================================================");
const fs = require("fs");
const path = require("path");
const files = fs.readdirSync(path.resolve(process.env.TEST_LOC));
// files.forEach((path) => detectLandmark("./test_landmarks/" + path));
// console.log("====================================================================================================");




// Exposure points
module.exports = { detectLandmark };