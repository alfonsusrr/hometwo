var admin = require("firebase-admin");

const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY);
console.log(serviceAccount)

if (!admin.apps.length) {
    admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://home-two-f88fe-default-rtdb.firebaseio.com"
    });
}