// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
importScripts('https://www.gstatic.com/firebasejs/5.0.3/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.0.3/firebase-messaging.js');
// Initialize Firebase
var config = {
    'messagingSenderId': '114469939995'
};
firebase.initializeApp(config);

const messaging = firebase.messaging();

/**
 * Here is is the code snippet to initialize Firebase Messaging in the Service
 * Worker when your app is not hosted on Firebase Hosting.

 // [START initialize_firebase_in_sw]
 // Give the service worker access to Firebase Messaging.
 // Note that you can only use Firebase Messaging here, other Firebase libraries
 // are not available in the service worker.
 importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
 importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

 // Initialize the Firebase app in the service worker by passing in the
 // messagingSenderId.
 firebase.initializeApp({
   'messagingSenderId': 'YOUR-SENDER-ID'
 });

 // Retrieve an instance of Firebase Messaging so that it can handle background
 // messages.

 // [END initialize_firebase_in_sw]
 **/

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]
messaging.setBackgroundMessageHandler(function(payload) {
  var newsTitle = payload.notification.title || "BREAKING: Today's Top Stories.";
  var message = payload.notification.data || "Click now for the latest news headlines.";
  var icon = payload.notification.icon || "https://pushible.com/content/images/newsicon.jpg";
  var image = payload.data.image || "https://pushible.com/content/images/news.jpg";
  var myTopic = payload.data.topic || "default";
  var myToken = payload.data.token || "default";

    var myOptions = {
        tag: myToken,
        body: message,
        icon: icon,
        image: image,
        data: payload.data,
        requireInteraction: true
    };

    return self.registration.showNotification(newsTitle, options);
});
// [END background_handler]
