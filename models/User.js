const { Schema, model } = require("mongoose");
const postSchema = require("./Post");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      max_length: 50
    },
    email: {
      type: String,
      required: true,

    },
    posts: [postSchema],
    friends: [userSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;
