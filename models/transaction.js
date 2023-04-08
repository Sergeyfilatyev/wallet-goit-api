const { Schema, model, SchemaTypes } = require("mongoose");
const { handleError } = require("../helpers");
const transactionSchema = new Schema(
  {
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    income: {
      type: Boolean,
      required: [true, "Income is required"],
    },
    category: {
      type: String,
      enum: [
        "main expenses",
        "products",
        "car",
        "self care",
        "child care",
        "household products",
        "education",
        "leisure",
        "other expenses",
      ],
      default: "other expenses",
    },
    comment: {
      type: String,
      default: "",
    },
    date: {
      type: String,
      default: new Date().toLocaleString(),
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);
transactionSchema.post("save", handleError);
const Transaction = model("transaction", transactionSchema);

module.exports = Transaction;
