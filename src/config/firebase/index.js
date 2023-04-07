import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDHdRhW8GAEvcK7qucLZBQC18mG4HO492c",
  authDomain: "azero-creative.firebaseapp.com",
  projectId: "azero-creative",
  storageBucket: "azero-creative.appspot.com",
  messagingSenderId: "1059039467973",
};

const app = initializeApp(
  {
    ...firebaseConfig,
    appId: "1:1059039467973:web:1e2f00f4a67b1e7d1ed3ac",
    measurementId: "G-H8ZC662VRE"
  },
  'Main'
);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

const otherApp = initializeApp(
  {
    ...firebaseConfig,
    appId: "1:1059039467973:web:b1ed6f6ddd93b6c81ed3ac",
    measurementId: "G-XH36KBM9QS"
  },
  'Secondary'
);
const otherAuth = getAuth(otherApp);

export { app, analytics, auth, db, storage, otherApp, otherAuth };
