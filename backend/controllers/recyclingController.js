const Recycling = require("../models/Recycling");
const Scrap = require("../models/Scrap");

exports.recycleScrap = async (req, res) => {
  try {

    const { scrapId, recycledMaterial, quantity } = req.body;
    // Validation: Check if fields are empty
    if (!scrapId || !recycledMaterial || !quantity) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if scrap actually exists in database
    const scrapExists = await Scrap.findById(scrapId);
    if (!scrapExists) {
      return res.status(404).json({ message: "Scrap ID not found in database" });
    }


    const recycling = await Recycling.create({
      scrapId,
      recycledMaterial,
      quantity
    });

    await Scrap.findByIdAndUpdate(
      scrapId,
      {
        status: "RECYCLED"
      }, { new: true }
    );

    res.status(201).json(recycling);

  } catch (err) {
    console.error("Error in recycleScrap:", err);
    return res.status(500).json({ message: "Server Error", error: err.message }); 

    // res.status(500).json(err);
    
  }
};

exports.getRecyclingLogs = async (req, res) => {

  try {

    const logs = await Recycling.find()
      .populate({
        path: "scrapId",
        select: "status text details" // only pull required fields, safe fallback
    });

    res.json(logs);

  } catch (err) {
    console.error("Error in getRecyclingLogs:", err);

    res.status(500).json({ message: "Server Error", error: err.message });
  }

};