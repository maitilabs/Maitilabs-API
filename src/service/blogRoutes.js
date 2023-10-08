import express from 'express';
import Blog from '../mongo/model/Blog.js';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// Retrieve a list of blogs with titles and excerpts
router.get('/blogs', async (req, res) => {
    const { page = 1, limit = 6 } = req.query;
    try {
      const totalCount = await Blog.countDocuments({});
      const blogs = await Blog.find()
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .select('date title content author language') 
        .lean(); 
  
      // Create excerpts for each blog
      const blogsWithExcerpts = blogs.map(blog => {
        const excerpt = blog.content.substring(0, 100); 
        return {
          _id: blog._id,
          date:blog.date,
          title: blog.title,
          excerpt,
          content:blog.content,
          author:blog.author,
          language:blog.language
        };
      });
  
      res.json({blogsWithExcerpts,totalCount});
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
// Retrieve a specific blog by ID
router.get('/blogs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    // res.json(blog);
    res.send("Title: " + blog.title + "<br /><br />Author: " + blog.author+ "<br /><br />content: " + blog.content+ "<br /><br />date: " + blog.date );
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/search', async (req, res) => {
    console.log('API Endpoint Called');
    const query  = req.query;
    try {
      const blogs = await Blog.find({ $text: { $search: query, $caseSensitive: false } });
      res.json(blogs);
    } catch (err) {
      console.error('Error:', err); // Log the error for debugging
      res.status(500).json({ error: 'Internal server error - 1' });
    }
  });
  

//Retrieve html blogForm to accept user blog and upload
router.get('/addBlog', (req, res) => {
  Blog.find({})
  .then((data, err)=>{
      if(err){
          console.log(err);
      }
      res.sendFile('/views/blogForm.html', { root: '.' });
  })
});


//******************************************************** */

router.post('/blogs', (req, res) => {
  // const { title, content, author, language, date } = req.body;

    // const newBlog = new Blog({ title, content, author, language, date });
    // console.log(req.file);
    var newBlog = new Blog({
      date: Date.now(),
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      language: req.body.language,

  });
  Blog.create(newBlog)
  .then ((err, item) => {
      if (err) {
          console.log(err);
      }
      else {
          // item.save();
          res.redirect('/');
      }
  });


});
//******************************************************** */


export default router;
