const { Schema, model } = require("mongoose");
const postSchema = require("./Post");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      max_length: 50
    },
    posts: [postSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const User = model("user", userSchema);

module.exports = User;
