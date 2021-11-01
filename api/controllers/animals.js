module.exports = (app) => {
  const controller = {};

  controller.getAnimals = async (req, res) => {
    try {
      const { fid } = req.query;

      const collection = app.data.db.collection("animals");

      if (fid) {
        const doc = await collection.doc(fid).get();
        if (doc.exists) {
          return res.status(200).json({
            ...doc.data(),
            fid: doc.id,
          });
        } else {
          return res.status(404).json({ message: "Animal não encontrado" });
        }
      } else {
        const querySnapshot = await collection.get();
        if (!querySnapshot.empty) {
          const docs = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            fid: doc.id,
          }));
          return res.status(200).json(docs);
        } else {
          return res.status(404).json({ message: "Nenhum animal encontrado" });
        }
      }
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  };

  controller.addAnimal = async (req, res) => {
    try {
      const doc = await app.data.db.collection("animals").add(req.body);
      return res.status(200).json({ fid: doc.id });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  };

  controller.updateAnimal = async (req, res) => {
    try {
      const { fid, ...data } = req.body;
      const doc = await app.data.db.collection("animals").doc(fid).update(data);
      return res.status(200).json({ fid: doc.id });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  };

  controller.deleteAnimal = async (req, res) => {
    try {
      await app.data.db.collection("animals").doc(req.query.fid).delete();
      return res.status(200).json({ message: "Animal removido" });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  };

  return controller;
};
