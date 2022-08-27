var admin = require("firebase-admin");

console.log(process.env.SERVICE_ACCOUNT_KEY + "aa")
const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY);


if (!admin.apps.length) {
    admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://home-two-f88fe-default-rtdb.firebaseio.com"
    });
}