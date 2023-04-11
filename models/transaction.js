const { Schema, model, SchemaTypes } = require("mongoose");
const { handleError } = require("../helpers");
const now = new Date();

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
      enum: {
        values: [
          "main expenses",
          "products",
          "car",
          "self care",
          "child care",
          "household products",
          "education",
          "leisure",
          "other expenses",
          "income",
        ],
      },
      default: "income",
    },
    comment: {
      type: String,
      default: "",
    },
    date: {
      type: Object,
      default: {
        time: now.getTime(),
        day: now.getDate(),
        month: now.getMonth(),
        year: now.getFullYear(),
      },
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
