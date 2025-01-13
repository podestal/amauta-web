// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: 'AIzaSyAgQnoCVJQUg92kyIdN1yNTaEyAxn_8pEI',
    authDomain: 'amauta-8e7cd.firebaseapp.com',
    projectId: 'amauta-8e7cd',
    storageBucket: 'amauta-8e7cd.firebasestorage.app',
    messagingSenderId: '365843324204',
    appId: '1:365843324204:web:0762a5193773a1eef02089',

  };

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { app, messaging, getToken, onMessage };
