const { Schema, model } = require("mongoose");
const { handleError } = require("../helpers");

const tokenSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    refreshToken: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);
tokenSchema.post("save", handleError);
const Token = model("token", tokenSchema);

module.exports = Token;
