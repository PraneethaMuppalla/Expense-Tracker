const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String },
  email: {
    type: String,
    required: true,
  },
  password: { type: String, required: true },
  isPremiumUser: {
    type: Boolean,
    default: false,
  },
  totalExpenses: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("users", userSchema);
