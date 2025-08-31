import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Firebase configuration using Vite environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
}

// Validate that all required environment variables are present
const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID'
] as const

for (const envVar of requiredEnvVars) {
  if (!import.meta.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`)
  }
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Auth
export const auth = getAuth(app)

// Initialize Firestore
export const db = getFirestore(app)

// Export the Firebase app instance
export { app }

// Export Firebase configuration for debugging (only in development)
if (import.meta.env.DEV) {
  console.log('Firebase initialized with config:', {
    apiKey: firebaseConfig.apiKey ? ' Present' : ' Missing',
    authDomain: firebaseConfig.authDomain ? ' Present' : ' Missing',
    projectId: firebaseConfig.projectId ? ' Present' : ' Missing',
    storageBucket: firebaseConfig.storageBucket ? ' Present' : ' Missing',
    messagingSenderId: firebaseConfig.messagingSenderId ? ' Present' : ' Missing',
    appId: firebaseConfig.appId ? ' Present' : ' Missing',
    measurementId: firebaseConfig.measurementId ? ' Present' : ' Missing'
  })
}