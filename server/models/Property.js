const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: Number,
    required: true,
  },
  censusTrackNumber: {
    type: Number,
  },
  loiDate: {
    type: Date,
  },
  contractDate: {
    type: Date,
  },
  famOrSr: {
    type: String,
  },
  landSize: {
    type: Number,
  },
  ami: {
    type: Number,
  },
  closingYear: {
    type: String,
  },
  startYear: {
    type: String,
  },
  zoning: {
    type: String,
  },
  qctDda: {
    type: String,
  },
  sitePlanApproval: {
    type: String,
  },
  sitePlanningAgency: {
    type: String,
  },
  percentage: {
    type: String,
  },
  presentZoning: {
    type: String,
  },
  units: {
    type: Number,
  },
  landPrice: {
    type: Number,
  },
  landPricePerUnit: {
    type: Number,
  },
  tdc: {
    type: Number,
  },
  tdcPerUnit: {
    type: Number,
  },
  gcFees: {
    type: Number,
  },
  gcFeesPerUnit: {
    type: Number,
  },
  devFees: {
    type: Number,
  },
  devFeesPerUnit: {
    type: Number,
  },
  defferedFees: {
    type: Number,
  },
  defferedFeesPerUnit: {
    type: Number,
  },
  totalAlFees: {
    type: Number,
  },
  hardDebt: {
    type: Number,
  },
  softDebt: {
    type: Number,
  },
  lihtcEquity: {
    type: Number,
  },
  totalSources: {
    type: Number,
  },
  noi: {
    type: Number,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = mongoose.model("Property", PropertySchema);
