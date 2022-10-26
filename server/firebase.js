const admin = require('firebase-admin');
const { getDatabase, getDatabaseWithUrl } = require('firebase-admin/database');
const { user } = require('firebase-functions/v1/auth');

const SERVICE_ACCOUNT = require('../firebase_key.json');

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyC7pD_Wbd6cqiQpxAFCNnnsHM3l3bZmGGo",
  authDomain: "spr22-sis-team2.firebaseapp.com",
  projectId: "spr22-sis-team2",
  storageBucket: "spr22-sis-team2.appspot.com",
  messagingSenderId: "672994537716",
  appId: "1:672994537716:web:4a7af45030ed42b1782ea1"
};

try {
  admin.initializeApp({
    credential: admin.credential.cert(SERVICE_ACCOUNT),
    ...FIREBASE_CONFIG
  });
  console.log("Firebase app is now running...")
}
catch(err) {
  console.log("Error! Firebase app cannot start :(")
}

const firestore = admin.firestore();

function checkId(id) {
  const regEx = /^[a-z0-9]+$/i;
  return regEx.exec(id);
}

function encodeData(data) {
  return Buffer.from(data).toString("utf16le");
}

async function getAllUsers() {
  await firestore.collection("users").get().then(query => {
    query.forEach(document => {
      console.log(JSON.stringify(document.data()));
    });
  });
}

async function getUser(username) {
  let user = null;
  let id = null;
  await firestore.collection("users").get().then(query => {
    query.forEach(document => {
      if (document.data().email === username) { user = document.data(); id = document.id; return; };
    });
  });
  return {user, id};
}

async function checkUserExists(email) {
  let userExists = false;
  await firestore.collection("users").get().then((query) => {
      query.forEach((document) => {
        if (document.data().email === email) {
            userExists = true;
        }
        // console.log(`Email: ${document.data().email}`);
      });
    });

  return userExists;
}

async function addUser(user) {
  const { email, name, password } = user;
  const userExists = await checkUserExists(email);
  // console.log(`UserExists? ${userExists}`);

  if (!(email && name && password)) {
    console.log("Empty fields!");
    return null;
  }

  if (userExists) {
    console.log("User with this email already exists!");
    return null;
  }

  // user.password = encodeData(password);
  const res = await firestore.collection("users").add(user);
  console.log("Added new document with ID: ", res?.id);
  return res?.id;
}

async function checkUser(credentials) {
  let returnFlag = false;
  const { email, password } = credentials;
  if (!(email && password)) return null;

  const {user, id} = await getUser(credentials.email);
  // console.log(encodeData(user.Password));
  if (credentials.Password === user.Password) { returnFlag = true };
  return returnFlag && id;
}

async function addToGallery(id, image, landmark) {
  try {
    const imageDoc = {
      imageContent: image,
      landmark: landmark,
      dateCreated: Date.now(),
    }
    const res = await firestore.collection("users").doc(id).collection("gallery").add(imageDoc);
    console.log("Added new image with ID: ", res.id);
    return true;
  }
  catch { return false; }
}

async function getGallery(id) {
  let gallery = [];
  if (!checkId(id)) return null;
  await firestore.collection("users").doc(id).collection("gallery").get().then(query => {
    query.forEach(document => {
      gallery.push(document.data());
    })
  });
  return gallery;
}

// Exposure points
module.exports = { checkUser, addUser, getGallery, addToGallery };
