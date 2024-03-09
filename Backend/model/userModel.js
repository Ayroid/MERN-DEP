import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
});

const userModel = mongoose.model("user", userSchema);

export { userModel as USERMODEL };
