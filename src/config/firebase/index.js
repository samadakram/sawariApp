import firebase from 'firebase';
import * as Facebook from 'expo-facebook';

// Optionally import the services that you want to use
import "firebase/auth";
//import "firebase/database";
import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCmHvjVFAIWs2OAnXAATzIj7SGty_xp7rI",
    authDomain: "book-sawari.firebaseapp.com",
    projectId: "book-sawari",
    storageBucket: "book-sawari.appspot.com",
    messagingSenderId: "975107111320",
    appId: "1:975107111320:web:548a58950d08c6ec7c13ed",
    measurementId: 'G-measurement-id',
};

// firebase.initializeApp(firebaseConfig);

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

const db = firebase.firestore();
const auth = firebase.auth();


function storeLocation( userId, location) {
    return db.collection('users').doc(userId).set({
        location,
    })
}

function storeDriverLocation(userName, userId, location) {
    return db.collection('drivers').doc(userId).set({
        userName,
        location
    })
}

function getNearestDrivers(b) {
    return db.collection('drivers')
        .orderBy('geohash')
        .startAt(b[0])
        .endAt(b[1]);
}

export {
    storeLocation,
    storeDriverLocation,
    getNearestDrivers,
    auth
}