const Scrap = require("../models/Scrap");

exports.predict = async (req, res) => {

  try {

    const total = await Scrap.aggregate([
      {
        $group: {
          _id: null,
          totalWeight: {
            $sum: "$weight"
          }
        }
      }
    ]);

    const current =
      total[0]?.totalWeight || 0;

    const forecast = [];

    let value = current;
    const monthNames = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


    for (let i = 0; i <6; i++) {

      value = value * 1.08;

      forecast.push({
        month: monthNames[i],
        predictedWeight:
          Math.round(value)
      });
    }

    res.json(forecast);

  } catch (err) {

    res.status(500).json({ error: err.message });

  }
};