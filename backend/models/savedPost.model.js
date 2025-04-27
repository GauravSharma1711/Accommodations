import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const SavedPostSchema = new Schema(
  {
    savedBy: { // post saved by
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    createdBy: {  // saved post has new document which was created by clicking this post
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  },
  {
    timestamps: false
  }
);


SavedPostSchema.index({ savedBy: 1, createdBy: 1 }, { unique: true });


const SavedPost = model('SavedPost', SavedPostSchema);

export default SavedPost;
