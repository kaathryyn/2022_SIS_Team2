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

async function getAllUsers() {
  await firestore.collection("users").get().then(query => {
    query.forEach(document => {
      console.log(JSON.stringify(document.data()));
    });
  });
}

async function addUser(user) {
  const { email, password } = user;
  const res = await firestore.collection("users").add(user);
  console.log("Added new document with ID: ", res.id);
}

async function getUser(username) {
  let user = null;
  await firestore.collection("users").get().then(query => {
    query.forEach(document => {
      if (document.data().Email === username) { user = document.data(); return; };
    });
  });
  return user;
}

async function checkUser(credentials) {
  let returnFlag = false;
  const user = getUser(credentials.Email);
  if ( credentials.Password === user.Password) {returnFlag = true};
  return returnFlag;
}

// Exposure points
module.exports = { checkUser, addUser };
