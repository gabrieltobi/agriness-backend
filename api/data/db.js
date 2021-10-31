const admin = require("firebase-admin");

module.exports = (app) => {
  return admin.firestore();
};
