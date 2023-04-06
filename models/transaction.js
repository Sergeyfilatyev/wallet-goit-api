const { Schema, model, SchemaTypes } = require("mongoose");

const transactionSchema = new Schema(
  {
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    type: {
      type: Boolean,
      required: [true, "Type is required"],
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
      type: Date,
      default: Date.now(),
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false }
);

const Transaction = model("transaction", transactionSchema);

module.exports = Transaction;
