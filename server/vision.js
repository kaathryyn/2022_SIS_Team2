// VISION API
const vision = require("@google-cloud/vision");
const { ok } = require("assert");
const GCP_CREDENTIALS = require("./GCP_CREDS.json");

const CREDENTIALS = JSON.parse(JSON.stringify(GCP_CREDENTIALS));

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
        landmarks.forEach((l) => console.log(l.description));
        landmarkVertices = landmarks[0].boundingPoly.vertices;

        //Adding landmark name to landmarkInfo[0]
        landmarkInfo.push(landmarks[0].description);

        // Add Coords of Bounding Box to array - top_left > top_right > bottom_right > bottom_left
        for (let i = 0; i < 4; i++) {
            landmarkInfo.push(landmarkVertices[i].x);
            landmarkInfo.push(landmarkVertices[i].y);
        }
    } else {
        console.log(`No famous landmark detected for file ${img}`);
        console.log("----------------------------------------------------------------------------------------------------");
    }

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
