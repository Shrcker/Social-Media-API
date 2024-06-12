const { Schema, model } = require("mongoose");
const postSchema = require("./Post");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      max_length: 50,
      unique: true
    },
    email: {
      type: String,
      required: true,

    },
    posts: [postSchema],
    friends: [{ type: Schema.Types.ObjectId, ref: "user" }]
    // friends: ["user"]
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
