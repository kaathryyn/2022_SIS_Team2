const { initializeApp } = require('firebase/app');
const admin = require('firebase-admin');
const { getDatabase, getDatabaseWithUrl } = require('firebase-admin/database');
const fbStorage = require("firebase/storage");

const SERVICE_ACCOUNT = require('../firebase_key.json');

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyC7pD_Wbd6cqiQpxAFCNnnsHM3l3bZmGGo",
  authDomain: "spr22-sis-team2.firebaseapp.com",
  projectId: "spr22-sis-team2",
  storageBucket: "spr22-sis-team2.appspot.com",
  messagingSenderId: "672994537716",
  appId: "1:672994537716:web:4a7af45030ed42b1782ea1"
};

const app = initializeApp(FIREBASE_CONFIG);
admin.initializeApp({
  credential: admin.credential.cert(SERVICE_ACCOUNT),
  ...FIREBASE_CONFIG
})

const firestore = admin.firestore();
const cloudStorage = fbStorage.getStorage(app);

async function getAllUsers() {
  await firestore.collection("users").get().then(query => {
    query.forEach(document => {
      console.log(JSON.stringify(document.data()));
    });
  });
}

async function getAllFilesinCloudStorage() {
  const listRef = fbStorage.ref(cloudStorage, "Test");
  
  await fbStorage.listAll(listRef)
    .then((res) => {
      res.items.forEach((imgRef) => {
        console.log(`Full file path: ${imgRef}`);
      });
    }).catch((err => {
      console.log("Cannot get files in cloud storage");
    }));
}

// getAllFilesinCloudStorage();

// getAllUsers();
