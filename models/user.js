const { Schema, model } = require("mongoose");
const { handleError } = require("../helpers");
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    password: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    token: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      enum: ["password auth", "google auth"],
      default: "password auth",
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false, timestamps: true }
);
userSchema.post("save", handleError);
const User = model("user", userSchema);

module.exports = User;
