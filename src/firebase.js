import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCu2-iIAgu_TlWwhD41FJ4vfdsFznMu5TM",
    authDomain: "messenger-yy.firebaseapp.com",
    projectId: "messenger-yy",
    storageBucket: "messenger-yy.appspot.com",
    messagingSenderId: "1076065998125",
    appId: "1:1076065998125:web:4c5772e898fc131579efa4",
    measurementId: "G-S8EHFCLWS8"
    };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;