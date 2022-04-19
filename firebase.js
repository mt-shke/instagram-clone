import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
    apiKey: "AIzaSyB0MhToAGI2eWuHoWSBzwtdmPc3S789PGY",
    authDomain: "instagram-clone-f1890.firebaseapp.com",
    projectId: "instagram-clone-f1890",
    storageBucket: "instagram-clone-f1890.appspot.com",
    messagingSenderId: "801819767200",
    appId: "1:801819767200:web:779eac2628478623ef74c5",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

// ---- firebase function

// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       allow read, write;
//     }
//   }
// }

// ----
