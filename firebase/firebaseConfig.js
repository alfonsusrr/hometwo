// Import the functions you need from the SDKs you need
import { getApps, initializeApp, getApp } from "firebase/app";
import { getDatabase } from "firebase/database"

const firebaseConfig = JSON.parse(process.env.FIREBASE_AUTH);

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getDatabase()

export { app, db }

