import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  // img:
  //   {
  //     type: String,
  //     required: true,
  //   },
    // img: {
    //   data: Buffer,
    //   contentType: String,
    // },
});
// blogSchema.index({ title: 'text', content: 'text' });

const Blog = mongoose.model('Blog', blogSchema);

Blog.createIndexes({ title: 'text', content: 'text' });


export default Blog;
