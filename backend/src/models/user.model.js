import mongoose from "mongoose";

const userSchema = mongoose.Schema(
   {
      email: { type: String, trim: true, unique: true, required: true },
      name: { type: String, trim: true, required: true },
      password: { type: String, trim: true, required: true }
   },
   { timestamps: true, versionKey: false }
);

const user = mongoose.model('user', userSchema, 'user');

export default user;