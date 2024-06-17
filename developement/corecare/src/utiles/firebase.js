import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAGNKipmU8_l1Xyh1Y6mVZAt8jWmM59ovg",
    authDomain: "corecare-c469d.firebaseapp.com",
    projectId: "corecare-c469d",
    storageBucket: "corecare-c469d.appspot.com",
    messagingSenderId: "637755235545",
    appId: "1:637755235545:web:2f15d21962e081f0a572c8",
    measurementId: "G-MG8B649VCT"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export default firebase;
