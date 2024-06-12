const { Schema, Types } = require("mongoose");
const userSchema = require("./User");
const replySchema = require("./Reply");
const { formatDate } = require("../utils/dateHelper");
const date = new Date();

const postSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    postContent: {
      type: String,
      required: true,
      maxLength: 280,
      minLength: 1
    },
    likes: {
      type: Number,
      required: true,
      // temporary random number of likes for each post
      default: 0
    },
    createdOn: {
      type: String,
      default: formatDate(date)
    },
    username: {
      type: String,
      required: true,
      default: userSchema.username
    },
    replies: [replySchema]
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

postSchema.virtual("replyCount").get(function () {
  return this.replies.length;
});

// const Post = model("post", postSchema);

module.exports = postSchema;
