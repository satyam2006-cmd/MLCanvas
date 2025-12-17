
// To be used in server-side code
import { initializeApp, getApp, getApps, FirebaseApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore'
import { firebaseConfig } from './config';

let auth: Auth;
let firestore: Firestore;

if (process.env.NODE_ENV === 'production') {
    // In production, we assume Firebase App Hosting provides the config.
    const firebaseApp = getApps().length ? getApp() : initializeApp();
    auth = getAuth(firebaseApp);
    firestore = getFirestore(firebaseApp);
} else {
    // In development, we can't rely on the auto-init, so we use our config.
    const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    firestore = getFirestore(app);
}

export { auth, firestore };
