const bcrypt = require("bcryptjs");

module.exports = (app) => {
  const controller = {};

  controller.login = async (req, res) => {
    try {
      const { user, password } = req.body;

      const querySnapshot = await app.data.db
        .collection("users")
        .where("user", "==", user)
        .get();

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();

        if (bcrypt.compareSync(password, userData.password)) {
          return res.status(200).json({ email: userData.user });
        } else {
          return res.status(400).json({ message: "Senha incorreta" });
        }
      } else {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  };

  controller.register = async (req, res) => {
    try {
      const { user, password } = req.body;

      const salt = "$2a$10$fFXbqzU6wbIAfdLL22pJ4u";
      const hash = bcrypt.hashSync(password, salt);

      const doc = await app.data.db.collection("users").add({
        user,
        password: hash,
      });

      return res.status(200).json({ fid: doc.id });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  };

  return controller;
};
