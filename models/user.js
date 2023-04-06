const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    token: {
      type: String,
      default: "",
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false }
);

const User = model("user", userSchema);

module.exports = User;
