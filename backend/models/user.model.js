import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      }
    ],
    savedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SavedPost',
      }
    ],
    chats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
      }
    ],
    friends:[
      {
      type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
  ]
  },

  { timestamps: { createdAt: 'createdAt', updatedAt: false } }
);

const User = model('User', UserSchema);

export default User;
