module.exports = (app) => {
  const controller = app.controllers.animals;

  app.route("/api/v1/animals").get(controller.getAnimals);
  app.route("/api/v1/animals").put(controller.addAnimal);
  app.route("/api/v1/animals").delete(controller.deleteAnimal);
};
