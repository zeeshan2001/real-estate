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
    required: true,
  },
  loiDate: {
    type: Date,
    required: true,
  },
  contractDate: {
    type: Date,
    required: true,
  },
  famOrSr: {
    type: String,
    required: true,
  },
  landSize: {
    type: Number,
    required: true,
  },
  ami: {
    type: Number,
    required: true,
  },
  closingYear: {
    type: String,
    required: true,
  },
  startYear: {
    type: String,
    required: true,
  },
  zoning: {
    type: String,
    required: true,
  },
  qctDda: {
    type: String,
    required: true,
  },
  sitePlanApproval: {
    type: String,
    required: true,
  },
  sitePlanningAgency: {
    type: String,
    required: true,
  },
  percentage: {
    type: String,
    required: true,
  },
  presentZoning: {
    type: String,
    required: true,
  },
  units: {
    type: Number,
    required: true,
  },
  landPrice: {
    type: Number,
    required: true,
  },
  landPricePerUnit: {
    type: Number,
    required: true,
  },
  tdc: {
    type: Number,
    required: true,
  },
  tdcPerUnit: {
    type: Number,
    required: true,
  },
  gcFees: {
    type: Number,
    required: true,
  },
  gcFeesPerUnit: {
    type: Number,
    required: true,
  },
  devFees: {
    type: Number,
    required: true,
  },
  devFeesPerUnit: {
    type: Number,
    required: true,
  },
  defferedFees: {
    type: Number,
    required: true,
  },
  defferedFeesPerUnit: {
    type: Number,
    required: true,
  },
  totalAlFees: {
    type: Number,
    required: true,
  },
  hardDebt: {
    type: Number,
    required: true,
  },
  softDebt: {
    type: Number,
    required: true,
  },
  lihtcEquity: {
    type: Number,
    required: true,
  },
  totalSources: {
    type: Number,
    required: true,
  },
  noi: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = mongoose.model("Property", PropertySchema);
