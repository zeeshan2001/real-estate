const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stickyNoteSchema = new Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  propertyId: { type: Schema.Types.ObjectId, ref: "Property", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  contact: { type: String, required: true },
  description: { type: String, required: true },
  //   filePath: { type: String, required: true },
  //   sharedLink: { type: String },
});

module.exports = mongoose.model("StickyNote", stickyNoteSchema);
