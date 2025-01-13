// importScripts('https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/10.3.0/firebase-messaging.js');

// const firebaseConfig = {
//     apiKey: 'AIzaSyAgQnoCVJQUg92kyIdN1yNTaEyAxn_8pEI',
//     authDomain: 'amauta-8e7cd.firebaseapp.com',
//     projectId: 'amauta-8e7cd',
//     storageBucket: 'amauta-8e7cd.firebasestorage.app',
//     messagingSenderId: '365843324204',
//     appId: '1:365843324204:web:0762a5193773a1eef02089',

//   };

// const messaging = firebase.messaging();

// messaging.setBackgroundMessageHandler(function(payload) {
//     console.log('[firebase-messaging-sw.js] Received background message ', payload);
//     // Customize notification here
//     const notificationTitle = 'Background Message Title';
//     const notificationOptions = {
//         body: 'Background Message body.',
//         icon: '/firebase-logo.png'
//     };

//     return self.registration.showNotification(notificationTitle, notificationOptions);
// });


importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyAgQnoCVJQUg92kyIdN1yNTaEyAxn_8pEI",
    authDomain: "amauta-8e7cd.firebaseapp.com",
    projectId: "amauta-8e7cd",
    storageBucket: "amauta-8e7cd.firebasestorage.app",
    messagingSenderId: "365843324204",
    appId: "1:365843324204:web:1234567890abcdef",
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
    console.log("[firebase-messaging-sw.js] Received background message", payload);

    const notificationTitle = payload.notification.title || "Background Message Title";
    const notificationOptions = {
        body: payload.notification.body || "Background Message Body",
        icon: payload.notification.icon || "/firebase-logo.png",
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});