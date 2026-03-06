# Firebase Setup for Portfolio Dashboard

The dashboard uses **Firebase Firestore** to store your portfolio data so it syncs across devices and browsers.

## Quick Setup

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **Create a project** (or use an existing one)
3. Follow the setup wizard

### 2. Enable Firestore

1. In the Firebase Console, go to **Build** → **Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (or production with custom rules)
4. Select a location and click **Enable**

### 3. Set Firestore Security Rules

Go to **Firestore Database** → **Rules** and use:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /portfolio/{document=**} {
      allow read, write: if true;
    }
  }
}
```

> **Security note:** This allows anyone to read and write. For production, add [Firebase Authentication](https://firebase.google.com/docs/auth) and restrict writes to authenticated users only.

### 4. Get Your Config

1. Click the **gear icon** → **Project settings**
2. Under **Your apps**, click **Add app** (Web icon `</>`)
3. Register your app (e.g. "Portfolio")
4. Copy the `firebaseConfig` object

### 5. Add Config to Your Project

Open `firebase-config.js` and replace the placeholder values:

```javascript
const firebaseConfig = {
  apiKey: 'AIza...',
  authDomain: 'your-project.firebaseapp.com',
  projectId: 'your-project-id',
  storageBucket: 'your-project.appspot.com',
  messagingSenderId: '123456789',
  appId: '1:123456789:web:abc123'
};
```

## Fallback

If Firebase is not configured (config has placeholder values), the app falls back to **localStorage**. Data will work locally but won't sync across devices.
