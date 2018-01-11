var firebase = require("firebase-admin");
var axios = require('axios');

var serviceAccount = require("./serviceAccountKey.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://hola-b4c27.firebaseio.com"
});

firebase
  .database()
  .ref('pushTokens')
  .once('value', (snap) => {
    snap.forEach((uid) => {
      const { expo } = uid.val();
      console.log(expo);
      axios({
        url: 'https://exp.host/--/api/v2/push/send',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          "to": expo,
          "sound": "default",
          "body": "Hello world!"
        },
      })
      .then((response) => {
        console.log(response.data)
      });
    })
  });
