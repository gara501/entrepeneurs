import firebase from 'firebase';
const config = {
  apiKey: "AIzaSyDqeTHpvB6GVsc1hYq3xjwl2PSfQSZZCuI",
  authDomain: "feels-a40bb.firebaseapp.com",
  databaseURL: "https://feels-a40bb.firebaseio.com",
  projectId: "feels-a40bb",
  storageBucket: "feels-a40bb.appspot.com",
  messagingSenderId: "748354675025"
};
firebase.initializeApp(config);
const db = firebase.firestore();
export default db;