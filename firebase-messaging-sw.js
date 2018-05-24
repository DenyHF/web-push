// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
// Initialize Firebase
importScripts('https://www.gstatic.com/firebasejs/4.13.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.13.0/firebase-messaging.js');

var config = {
    apiKey: "AIzaSyAMl9GARuvD4Iv6zp1vUSxxfzVNntOk2qo",
    authDomain: "test-f9817.firebaseapp.com",
    databaseURL: "https://test-f9817.firebaseio.com",
    projectId: "test-f9817",
    storageBucket: "test-f9817.appspot.com",
    messagingSenderId: "114469939995"
};

firebase.initializeApp(config);


var messaging  = firebase.messaging();
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
  var newsTitle = payload.data.title || "BREAKING: Today's Top Stories.";
  var message = payload.data.data || "Click now for the latest news headlines.";
  var icon = payload.data.icon || "https://pushible.com/content/images/newsicon.jpg";
  var image = payload.data.image || "https://pushible.com/content/images/news.jpg";
  var myTopic = payload.data.topic || "default";
  var myToken = payload.data.token || "default";

    var myOptions = {
        tag: myToken,
        body: image,
        icon: icon,
        image: image,
        data: payload.data,
        requireInteraction: true
    };


    return self.registration.showNotification(newsTitle, myOptions);
});
// [END background_handler]
