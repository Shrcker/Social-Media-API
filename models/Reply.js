const { Schema, model } = require("mongoose");
const { formatDate } = require("../utils/dateHelper");
const date = new Date();


const replySchema = new Schema(
  {
    replyId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    replyContent: {
      type: String,
      required: true,
      maxLength: 280,
      minLength: 1
    },
    username: {
      type: String,
      required: true,
    },
    createdOn: {
      type: Date,
      default: formatDate(date)
    }
  }
);

module.exports = replySchema;
