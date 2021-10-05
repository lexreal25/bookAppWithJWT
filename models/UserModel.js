const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = {
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    requored: true,
  },
  password: {
    type: String,
    requored: true,
  },
  accounts: [
    {
      id: {
        type: Schema.Types.ObjectId,
        ref: "Books",
      },
    },
  ],
  authors: [
    {
      id: {
        type: Schema.Types.ObjectId,
        ref: "Author",
      },
    },
  ],
};

const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;
