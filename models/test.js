import mongoose, { Schema } from "mongoose";

const testSchema = new Schema(
  {
    title: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

const TestModel = mongoose.models.Test || mongoose.model("Test", testSchema);

export default TestModel;
