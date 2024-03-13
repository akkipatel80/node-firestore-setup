const { Firestore } = require("@google-cloud/firestore");

// Replace the path with the location of your service account key JSON file
const serviceAccount = require("./serviceAccountKey.json");

exports.firestore = new Firestore({
  projectId: serviceAccount.project_id,
  keyFilename: __dirname + "/serviceAccountKey.json",
});
