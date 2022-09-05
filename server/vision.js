// VISION API
const vision = require("@google-cloud/vision");

const CREDENTIALS = JSON.parse(
    JSON.stringify({
        type: "service_account",
        project_id: "spr22-sis-team2",
        private_key_id: "4b630b6dcd770ccb36a55407b117b67f79af4131",
        private_key:
            "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCcBUbW4g4ommSt\n8hjF1xbO19wOalXsd1Jqd455fNdLZLtLPOiCI8YHqiktfwfVjWfJQGMAXQZAx9PT\n3R6GK13oib1b+r4VVCDKAtFLQZ+4OXJZ4Su7D+uEAbr4pTfxVuGattQbehlIGtPw\n5l4KmwlJodeWLpDTwJd43kDSDF2ECb7UYSOPwnN7pjP6/f2cskNTV4jYvOQ/sQdd\ngcolMfuPYXHiegg+Gmn+3Km7Gqg8E8mm0VVteOISMO9io2R4/qif2Br5UH/i/Dag\n6FMUCQh7j9DIVeNFAxxvYD6FWTvvN8JjeO8CYnHmcL3fIG84UPuP+ScTOgnOh33z\nS8XViq0TAgMBAAECggEAP+uhhDQFHPl0Ohevso5Wl9O0ImvKXCDesSPeSUOuaQMS\nANcpYvgJD+bVDAC5UvKmDLvGU8XI5A16aZh0AwANb1HPNLnb2p0m+dyBptVx/GX8\nxXoNEoyJLwIOegQmkUfJEjvJVqCFbxcesdmPucSe333g93SIfViwNiLIZ8YNIiS/\nosQMoRrVIg7chEsC6l8HGSXrciiCQUCRct/bw1rBVDyfGHBFviiz5mkbBEVOWADo\nd8s0e5z9IMUhaP1IiMf0lVq7/yxZGHrJP7YjHfHPKIu/4eEElnF6Z/RCVGNCWogg\n4fi1Qv/Su5qw6lvbbk0dChUlYuwPFggdVXtEyW6hkQKBgQDZi6eSU512AeW3duGH\nQ8htHyPd3NRK98nq+xWWfe3KoL4lp0nLRr+ss0t4rmJCbQnK2qVKXyP3Ay3FOJD9\nVFBBjbgzSX0I3oZYZFGsu4JO1KnnTmQLOfzYFCJAL02/Yo9xffa/WmdaevnaL9FU\nUKJTHoOPmWJxwsoZdosxCXIGPQKBgQC3mYD1IDuVow4hJVzASIilyUq3b22tOq4g\nVkhJ+LRntSooz2XgksMB86GAP7A6966X88gBTdEu45cK1T8uZMRlJsOA2V+20GdI\nchoG0Il/rdl+e/n7XSJxWGnjLQM0G9J7oQRWtkqN3LhZFP7/p28Wq0smPoFJuqDa\nOPnELUIFjwKBgQCfaLVfBQRSD6vb1zIFo0a/p1zp20J4uL/t/xTflOFlZIpRHxd0\n7B/SFgPMp8P6ttnBGpyaNcMt4tdsODoOV/UDRCzg8A2+LQk2xjQPJcujpjPl+cxX\naaN8VqyOadtHzZoc6NehekZXx9tD5Vw3s2pvC+INnLDFeZ4MMJBoW2qBZQKBgHuJ\nRRUq0AzafwpcenFDHPb4X1bYGiMiRcGqbM+hEbpqUujMzE70UVSB2txRfkHfIFJM\nDPqborH7H0mBvRZ5ZRBuqcOL//QhfC1p4QtOzAXmM18BCm5Q93jutajPQ8WPJuxa\npnG2DKoxprUCBKZ+waeuME2WZyX19n9/MMgIb9EPAoGBALSgiEYdKikO5WmcVgJ6\neyCC/kCH97yJHNbiDdvGGrsmaMPj3oBTx9D5ezUSIw+ZIYqD8nHYg83nynKG/vTn\n8CPVd1qGP/z1ZyeQ5nJyDfRjqEXpYm5T75wOQylmDRbTA5/YTalnoZ5FALAi0ijH\n0jaDJEqaOxbjmGHziJKhgjE2\n-----END PRIVATE KEY-----\n",
        client_email: "spr22-sis-team2@spr22-sis-team2.iam.gserviceaccount.com",
        client_id: "100726545995442463250",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url:
            "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url:
            "https://www.googleapis.com/robot/v1/metadata/x509/spr22-sis-team2%40spr22-sis-team2.iam.gserviceaccount.com",
    })
);

const CONFIG = {
    credentials: {
        private_key: CREDENTIALS.private_key,
        client_email: CREDENTIALS.client_email,
    },
};

const client = new vision.ImageAnnotatorClient(CONFIG);

const bucketName = "gs://spr22-sis-team2.appspot.com/Test";
const filename = "sydney-opera-house-selfie.jpg";
var img = `${bucketName}/${filename}`;

// landmarkAnnotations[0] = result with highest score (match)
const detectLandmark = async (img) => {
    let [result] = await client.landmarkDetection(img);
    const landmarks = result.landmarkAnnotations;
    console.log(`Landmarks in ${filename}:`);
    landmarks.forEach((landmark) => console.log(landmark));
    // console.log("\nImage:", img);
    // if (result.landmarkAnnotations[0]) {
    //     console.log(result.landmarkAnnotations[0].description);
    // } else console.log("No famous landmark detected.");
};

detectLandmark(img);

////////////////////////////
///////--- Tests ---////////
////////////////////////////
// console.log("Batch Read");
// const fs = require("fs");
// const path = require("path");
// const files = fs.readdirSync(path.resolve("test_landmarks"));
// files.forEach((path) => detectLandmark("./test_landmarks/" + path));
