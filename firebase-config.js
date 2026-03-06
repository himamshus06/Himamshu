/**
 * Firebase Configuration
 *
 * SETUP INSTRUCTIONS:
 * 1. Go to https://console.firebase.google.com/
 * 2. Create a new project (or use existing)
 * 3. Enable Firestore: Build > Firestore Database > Create database
 * 4. Set Firestore rules (Build > Firestore > Rules) - for public read/write:
 *    rules_version = '2';
 *    service cloud.firestore {
 *      match /databases/{database}/documents {
 *        match /portfolio/{document=**} { allow read, write: if true; }
 *      }
 *    }
 *    (Note: For production, add authentication and restrict write access)
 * 5. Get config: Project Settings (gear) > General > Your apps > Add app (Web)
 * 6. Copy the firebaseConfig object and replace the values below
 */
const firebaseConfig = {
  apiKey: "AIzaSyCV0O4lGIZ2cJOmk_GrbBviJLIRvKrKPCQ",
  authDomain: "portfolio-6ba23.firebaseapp.com",
  projectId: "portfolio-6ba23",
  storageBucket: "portfolio-6ba23.firebasestorage.app",
  messagingSenderId: "894999293084",
  appId: "1:894999293084:web:6cfec601ac98d585a79159",
  measurementId: "G-81YPZZV12E"
};