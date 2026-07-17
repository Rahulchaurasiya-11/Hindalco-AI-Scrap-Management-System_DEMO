const Scrap = require("../models/Scrap");

exports.createScrap = async (req, res) => {
  try {
// Ensuring status is always saved uppercase
if(req.body.status) {
  req.body.status = req.body.status.toUpperCase();
}

    const scrap = await Scrap.create(req.body);

    res.status(201).json(scrap);

  } catch (err) {

    res.status(500).json(err);

  }
};

exports.getAllScrap = async (req, res) => {

  try {

    const scrap = await Scrap.find()
      .populate("departmentId");

    res.json(scrap);

  } catch (err) {

    res.status(500).json(err);

  }
};

exports.updateScrap = async (req, res) => {
    try {
  
      const scrap = await Scrap.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
  
      res.json(scrap);
  
    } catch (err) {
  
      res.status(500).json(err);
  
    }
  };



  exports.deleteScrap = async (req, res) => {
    try {
  
      await Scrap.findByIdAndDelete(
        req.params.id
      );
  
      res.json({
        message: "Scrap Deleted Successfully"
      });
  
    } catch (err) {
  
      res.status(500).json(err);
  
    }
  };