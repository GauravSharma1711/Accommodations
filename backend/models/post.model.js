import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    bedroom: {
      type: Number,
      required: true,
    },
    bathroom: {
      type: Number,
      required: true,
    },
    latitude: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["SELL", "RENT", "LEASE","BUY"], 
      required: true,
    },
    property: {
      type: String,
      enum: ["APARTMENT", "HOUSE", "LAND"], 
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
     
    },
    postDetail: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PostDetail',
    },
    savedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SavedPost',
      }
    ]
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: false } } // Prisma has only createdAt
);

const Post = model('Post', PostSchema);

export default Post;
