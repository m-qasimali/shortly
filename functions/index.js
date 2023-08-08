/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin")
const functions = require('firebase-functions')

admin.initializeApp();

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// exports.linkCreated = functions.firestore.document("users/{userUid}/links/{link}").onCreate((snapshot, context) => {
//   console.log(context.params);
//   const { userUid, link } = context.params;
//   const { longURL, shortCode } = snapshot.data();

//   return admin.firestore().doc(`links/${shortCode}`).set({
//     userId: userUid,
//     link,
//     longURL
//   })
// })


exports.linkDeleted = functions.firestore.document("users/{userUid}/links/{link}").onDelete((snapshot, context) => {
  const { shortCode } = snapshot.data();
  return admin.firestore().doc(`links/${shortCode}`).delete();
})