const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const defaultModel = new Schema({
  test: { type: Boolean, default: true },
});

defaultModel.index({ test: 1 }, { unique: true });

const Default = mongoose.model("Default", defaultModel);

module.exports = Default;
