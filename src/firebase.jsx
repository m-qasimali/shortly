import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBpEZeurmCyl5GLNdc_VHs48YEpWGUTGZg',
  authDomain: 'shortly-7e7be.firebaseapp.com',
  projectId: 'shortly-7e7be',
  storageBucket: 'shortly-7e7be.appspot.com',
  messagingSenderId: '266316770004',
  appId: '1:266316770004:web:75a26130371de86b5be941',
  measurementId: 'G-5P8R51W195',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099');
  connectFirestoreEmulator(firestore, 'localhost', 8080);
}

export { app, auth, firestore };
