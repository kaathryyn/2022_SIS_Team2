const { initializeApp, applicationDefault } = require('firebase-admin/app');

const SERVICE_ACCOUNT = require('../firebase_key.json');

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyC7pD_Wbd6cqiQpxAFCNnnsHM3l3bZmGGo",
  authDomain: "spr22-sis-team2.firebaseapp.com",
  projectId: "spr22-sis-team2",
  storageBucket: "spr22-sis-team2.appspot.com",
  messagingSenderId: "672994537716",
  appId: "1:672994537716:web:4a7af45030ed42b1782ea1"
};

initializeApp({
  credential: applicationDefault(),
  projectId: 'Spr22_SIS_Team2',
  storageBucket: 'spr22-sis-team2.appspot.com'
});