import firebase from "@firebase/app";
import "@firebase/firestore";

const config = {
    apiKey: "<apiKey>",
    authDomain: "<authDomain>",
    databaseURL: "<databaseURL>",
    projectId: "<projectId>",
    storageBucket: "",
    messagingSenderId: "<messageingSenderId>"
};

const app = firebase.initializeApp(config);
// const firestore = firebase.firestore({
//     app: app
// });

// export default firestore;

// import Firebase from 'firebase';
//
// var firebaseConfig = {
//     apiKey: "AIzaSyBk7t9o1n3xLUJw5b014-e7DE9wA6jJaNI",
//     authDomain: "store-manager-63b8c.firebaseapp.com",
//     databaseURL: "https://store-manager-63b8c.firebaseio.com",
//     projectId: "store-manager-63b8c",
//     storageBucket: "store-manager-63b8c.appspot.com",
//     messagingSenderId: "287630952590",
//     appId: "1:287630952590:web:e7b7d9277e67fced"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
