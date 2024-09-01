import mongoose from "mongoose";

const testSetSchema = mongoose.Schema(
   {
      title: { type: String }, // android, iOS
      description: { type: String }, // galaxy a10, iPhone 15
   },
   { timestamps: true, versionKey: false }
);
const testSet = mongoose.model('testSet', testSetSchema, 'testSet');
export default testSet;