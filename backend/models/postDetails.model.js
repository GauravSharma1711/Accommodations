import mongoose from 'mongoose';



const PostDetailSchema = new mongoose.Schema(
  {
    desc: {
      type: String,
      required: true,
    },
    utilities: {
      type: String,
      default: null,
    },
    pet: {
      type: String,
      default: null,
    },
    income: {
      type: String,
      default: null,
    },
     roomsize: {
      type: Number,
      default: null,
    },
    bedroomsize: {
      type: Number,
      default: null,
    },
    bathroomsize: {
      type: Number,
      default: null,
    },
    school: {
      type: Number,
      default: null,
    },
    bus: {
      type: Number,
      default: null,
    },
    restaurant: {
      type: Number,
      default: null,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
      unique: true, 
    }
  },
  { timestamps: false }
);

const PostDetail = mongoose.model('PostDetail', PostDetailSchema);

export default PostDetail;
