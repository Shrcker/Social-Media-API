const { Schema, Types } = require("mongoose");

const postSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    postName: {
      type: String,
      required: false,
      maxLength: 50,
      minLength: 4,
      default: "Unnamed Post"
    },
    postContent: {
      type: String,
      required: true,
      maxLength: 60,
      minLength: 4
    },
    likes: {
      type: Number,
      required: true,
      // temporary random number of likes for each post
      default: () => Math.floor(Math.random() * 100)
    },
    createdOn: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

module.exports = postSchema;
