const express = require("express");
const config = require("config");
const consign = require("consign");

const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

module.exports = () => {
  const app = express();

  app.set("port", process.env.PORT || config.get("server.port"));

  // MIDDLEWARES
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  // ENDPOINTS
  consign({ cwd: "api" })
    .then("data")
    .then("controllers")
    .then("routes")
    .into(app);

  return app;
};
