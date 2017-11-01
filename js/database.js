 // Set the configuration for your app
  // TODO: Replace with your project's config object
  var config = {
    apiKey: "AIzaSyAU0YAgO-PYj1GE7wO7-il55nOSQN7tmHk",
    authDomain: "projectId.firebaseapp.com",
    databaseURL: "https://endless-d1bc6.firebaseio.com",
  };
  firebase.initializeApp(config);

  // Get a reference to the database service
  var database = firebase.database();