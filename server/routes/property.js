const express = require("express");
const moment = require("moment");
const mongoose = require("mongoose");
const router = express.Router();
const Property = require("../models/Property");

//Add property route /api/property/add
router.post("/add", async (req, res) => {
  try {
    // const {
    //     name,
    //     status,
    //     address,
    //     city,
    //     country,
    //     state,
    //     zipCode,
    //     censusTrackNumber,
    //     loiDate,
    //     contractDate,
    //     famOrSr,
    //     landSize,
    //     ami,
    //     closingYear,
    //     startYear,
    //     zoning,
    //     qctDda,
    //     sitePlanApproval,
    //     sitePlanningAgency,
    //     percentage,
    //     presentZoning,
    //     units,
    //     landPrice,
    //     landPricePerUnit,
    //     tdc,
    //     tdcPerUnit,
    //     gcFees,
    //     gcFeesPerUnit,
    //     devFees,
    //     devFeesPerUnit,
    //     defferedFees,
    //     defferedFeesPerUnit,
    //     totalAlFees,
    //     hardDebt,
    //     softDebt,
    //     lihtcEquity,
    //     totalSources,
    //     noi,
    //   } = req.body;
    let reqData = { ...req.body };
    const currentDate = moment().format("YYYY-MM-DD");
    reqData["loiDate"] = moment(req.body["loiDate"]).format("YYYY-MM-DD");
    reqData["contractDate"] = moment(req.body["contractDate"]).format(
      "YYYY-MM-DD"
    );
    reqData["createdAt"] = currentDate;
    reqData["updatedAt"] = currentDate;
    // Create a new property object
    const newProperty = new Property(reqData);
    const lastAddedProperty = await newProperty.save();
    res.json(lastAddedProperty);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

//Get all properties, route /api/property/add
router.get("/getAll", async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

//Get property by id, route /api/property/:id
router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ error: "Record not found" });
    }
    res.json(property);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

//Update property, route /api/property/update/:id
router.put("/update/:id", async (req, res) => {
  try {
    const propertyId = req.params.id;
    const updateData = { ...req.body };
    const currentDate = moment().format("YYYY-MM-DD");
    updateData["loiDate"] = moment(req.body["loiDate"]).format("YYYY-MM-DD");
    updateData["contractDate"] = moment(req.body["contractDate"]).format(
      "YYYY-MM-DD"
    );
    updateData["updatedAt"] = currentDate;

    const updatedProperty = await Property.findByIdAndUpdate(
      propertyId,
      updateData,
      { new: true }
    );
    res.json(updatedProperty);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

//Delete property, route /api/property/delete/:id
router.delete("/delete", async (req, res) => {
  try {
    const { ids } = req.body;
    await Property.deleteMany({ _id: { $in: ids } });
    const properties = await Property.find();
    res.json({
      success: true,
      message: "Property deleted successfully!",
      properties: properties,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

//Get dashboard data, route /api/property/dashboard/data
router.get("/dashboard/data", async (req, res) => {
  const { startYear, yearRange, state, percentage } = req.query;
  try {
    let response = {};

    let match = {};
    if (startYear) match.startYear = startYear;
    if (state) match.state = state;
    if (percentage) match.percentage = percentage;
    if (yearRange && yearRange.length > 0) {
      match.startYear = { $gte: yearRange[0] };
      match.closingYear = { $lte: yearRange[1] };
    }
    //Query to get data for portfolio tab
    const portfolio = await Property.aggregate([
      {
        $match: match,
      },
      {
        $group: {
          _id: null,
          totalUnits: { $sum: "$units" },
          totalDevFees: { $sum: "$devFees" },
          totalGcFees: { $sum: "$gcFees" },
          totalCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "properties",
          let: {},
          pipeline: [
            {
              $match: match,
            },
            {
              $group: {
                _id: {
                  state: "$state",
                  percentage: "$percentage",
                },
                count: { $sum: 1 },
              },
            },
            {
              $group: {
                _id: "$_id.percentage",
                percentageCounts: {
                  $push: {
                    state: "$_id.state",
                    count: "$count",
                  },
                },
              },
            },
            {
              $sort: { _id: 1 }, // Sort by percentage in ascending order
            },
          ],
          as: "properties",
        },
      },
    ]);

    // The states you are interested in
    const states = [
      "Florida",
      "Atlanta MSA",
      "South Carolina",
      "North Carolina",
      "Virginia",
      "Maryland",
    ];

    // Post-process the portfolio
    portfolio.forEach((doc) => {
      doc.properties.forEach((prop) => {
        const presentStates = prop.percentageCounts.map((count) => count.state);
        states.forEach((state) => {
          if (!presentStates.includes(state)) {
            prop.percentageCounts.push({ state: state, count: 0 });
          }
        });
      });
    });

    // //Query to get data for single tab
    // const singleTabData = await Property.findOne().sort({ _id: -1 }).exec();

    // //Calculation to get data for multi tab
    // const latestDocs = await Property.find()
    //   .sort({ createdAt: -1 }) // Sort by descending order of creation date
    //   .limit(3);

    // const ids = latestDocs.map((doc) => doc._id);
    // const multiTabData = await Property.aggregate([
    //   { $match: { _id: { $in: ids } } },
    //   {
    //     $group: {
    //       _id: null,
    //       totalUnits: { $sum: "$units" },
    //       avgPricePerUnit: { $avg: "$landPricePerUnit" },
    //       totalTDC: { $sum: "$tdc" },
    //       avgTDCPerUnit: { $avg: "$tdcPerUnit" },
    //       totalDevFees: { $sum: "$devFees" },
    //       avgDevFeesPerUnit: { $avg: "$devFeesPerUnit" },
    //       avgDefferedFeesPerUnit: { $avg: "$defferedFeesPerUnit" },
    //       totalGCFees: { $sum: "$gcFees" },
    //       avgGCFeesPerUnit: { $avg: "$gcFeesPerUnit" },
    //       totalHardDebt: { $sum: "$hardDebt" },
    //       totalSoftDebt: { $sum: "$softDebt" },
    //       totalLIHTCEquity: { $sum: "$lihtcEquity" },
    //       totalNOI: { $sum: "$noi" },
    //       properties: {
    //         $push: {
    //           id: "$_id",
    //           status: "$status",
    //         },
    //       },
    //     },
    //   },
    // ]);

    const propertyStatusRecords = await Property.aggregate([
      {
        $match: match,
      },
      {
        $group: {
          _id: "$status", // grouping by status
          count: { $sum: 1 }, // counting records for each status
          properties: {
            $push: {
              // pushing the properties of each record into an array
              _id: "$_id",
              name: "$name",
              status: "$status",
              address: "$address",
              city: "$city",
              state: "$state",
              country: "$country",
              // add more properties if needed...
            },
          },
        },
      },
    ]);

    const financialChartData = await Property.aggregate([
      {
        $match: match,
      },
      {
        $group: {
          _id: "$status",
          totalUnits: { $sum: "$units" },
          totalDevFees: { $sum: "$devFees" },
          totalGcFees: { $sum: "$gcFees" },
          properties: {
            $push: {
              // pushing the properties of each record into an array
              _id: "$_id",
              name: "$name",
              status: "$status",
              address: "$address",
              city: "$city",
              state: "$state",
              country: "$country",
              devFees: "$devFees",
              gcFees: "$gcFees",
              units: "$units",
              // add more properties if needed...
            },
          },
        },
      },
    ]);

    const existingProperties = await Property.find({}).select("id name");

    response["portfolio"] = portfolio;
    response["existingProperties"] = existingProperties;
    response["propertyChartData"] = propertyStatusRecords;
    response["financialChartData"] = financialChartData;
    // response["singleTabData"] = singleTabData;
    // response["multiTabData"] = multiTabData;
    res.json(response);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

//Get data for multi properties, route /api/dashboard/multi
router.post("/dashboard/multi", async (req, res) => {
  try {
    // ids array from request body
    const { ids } = req.body;

    const results = await Property.aggregate([
      {
        $match: {
          _id: { $in: ids.map((id) => new mongoose.Types.ObjectId(id)) },
        },
      },
      {
        $group: {
          _id: null,
          totalUnits: { $sum: "$units" },
          totalLandPrice: { $sum: "$landPrice" },
          totalDefferedFees: { $sum: "$defferedFees" },
          avgPricePerUnit: { $avg: "$landPricePerUnit" },
          totalTDC: { $sum: "$tdc" },
          avgTDCPerUnit: { $avg: "$tdcPerUnit" },
          totalDevFees: { $sum: "$devFees" },
          avgDevFeesPerUnit: { $avg: "$devFeesPerUnit" },
          avgDefferedFeesPerUnit: { $avg: "$defferedFeesPerUnit" },
          totalGCFees: { $sum: "$gcFees" },
          avgGCFeesPerUnit: { $avg: "$gcFeesPerUnit" },
          totalHardDebt: { $sum: "$hardDebt" },
          totalSoftDebt: { $sum: "$softDebt" },
          totalLIHTCEquity: { $sum: "$lihtcEquity" },
          totalNOI: { $sum: "$noi" },
          properties: {
            $push: {
              id: "$_id",
              name: "$name",
              status: "$status",
              address: "$address",
              city: "$city",
              state: "$state",
              country: "$country",
            },
          },
        },
      },
    ]);

    res.json(results);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
