const Scrap = require("../models/Scrap");

exports.getInventory = async (req, res) => {
  try {

    const inventory = await Scrap.aggregate([
      {
        $match: {
          status: "PENDING"
        }
      },
      {
        $group: {
          _id: "$scrapType",
          totalWeight: {
            $sum: "$weight"
          },
          count: {
            $sum: 1
          }
        }
      }
    ]);




        // PRESENTATION TRICK: Agar database khali hai, to presentation ke liye automatic dummy data bhejega
        if (!inventory || inventory.length === 0) {
          const dummyInventory = [
            { _id: "Aluminum Scrap (Grade A)", totalWeight: 4520, count: 12 },
            { _id: "Copper Wire Scrap", totalWeight: 2850, count: 8 },
            { _id: "Bauxite Tailings", totalWeight: 7100, count: 15 },
            { _id: "Zinc Dross", totalWeight: 1250, count: 5 }
          ];
          return res.json(dummyInventory);
        }
    
    

    res.json(inventory);

  } catch (err) {
    res.status(500).json(err);
  }
};