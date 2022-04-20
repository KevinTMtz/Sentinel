import dotenv from 'dotenv';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

dotenv.config();

const PORT = process.env.PORT || 3001;

export const SERVER = {
  port: PORT,
};

const API_KEY = process.env.REACT_APP_API_KEY || '';
const AUTH_DOMAIN = process.env.REACT_APP_AUTH_DOMAIN || '';
const PROJECT_ID = process.env.REACT_APP_PROJECT_ID || '';
const STORAGE_BUCKET = process.env.REACT_APP_STORAGE_BUCKET || '';
const MESSAGING_SENDER_ID = process.env.REACT_APP_MESSAGING_SENDER_ID || '';
const APP_ID = process.env.REACT_APP_APP_ID || '';

export const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;

export const firebaseAuth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);
