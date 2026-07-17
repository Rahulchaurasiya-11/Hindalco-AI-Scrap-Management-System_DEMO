const Scrap = require("../models/Scrap");
const Department = require("../models/Department");

exports.getStats = async (req, res) => {
  try {

    const totalGenerated = await Scrap.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$weight" }
        }
      }
    ]);

    const recycled = await Scrap.aggregate([
      {
        $match: {
          status: "RECYCLED"
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$weight" }
        }
      }
    ]);

    const pending = await Scrap.aggregate([
      {
        $match: {
          status: "PENDING"
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$weight" }
        }
      }
    ]);

    const departments =
      await Department.countDocuments();

    res.json({

      totalGenerated: totalGenerated.length > 0 ? totalGenerated[0].total : 0, 
      totalRecycled: recycled.length > 0 ? recycled[0].total : 0, 
      totalPending: pending.length > 0 ? pending[0].total : 0, 
      activeDepartments: departments || 0 



      // totalGenerated:totalGenerated[0]?.total || 0,
      // totalRecycled:recycled[0]?.total || 0,
      // totalPending:pending[0]?.total || 0,
      // activeDepartments:departments ||0
    });

  } catch (err) {
    console.error("Backend Stats Error:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message }); 
    // res.status(500).json(err);

  }
};