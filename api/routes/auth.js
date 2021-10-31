module.exports = (app) => {
  const controller = app.controllers.auth;

  app.route("/api/v1/login").post(controller.login);
  app.route("/api/v1/register").put(controller.register);
};
