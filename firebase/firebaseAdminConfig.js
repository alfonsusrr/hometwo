var admin = require("firebase-admin");

var serviceAccount = require("../config/serviceAccountKey.json");

if (!admin.apps.length) {
    admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://home-two-f88fe-default-rtdb.firebaseio.com"
    });
}