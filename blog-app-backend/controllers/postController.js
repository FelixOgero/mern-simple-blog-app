const Post = require('../models/Post');

// Create Post
exports.createPost = async (req, res) => {
  const { title, content, image } = req.body;

  try {
    const post = await Post.create({ title, content, image, author: req.user.id });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get All Posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'name email');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update Post
// exports.updatePost = async (req, res) => {
//   const { id } = req.params;
//   const { title, content, image } = req.body;

//   try {
//     const post = await Post.findByIdAndUpdate(id, { title, content, image }, { new: true });
//     res.status(200).json(post);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };


exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, image } = req.body;

  try {
    // Find the post by its ID
    const post = await Post.findById(id);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the logged-in user is the author of the post
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to edit this post' });
    }

    // If the user is the author, proceed with updating the post
    post.title = title;
    post.content = content;
    post.image = image;

    // Save the updated post
    await post.save();

    // Send the updated post as a response
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};



// Delete Post
// exports.deletePost = async (req, res) => {
//   const { id } = req.params;

//   try {
//     await Post.findByIdAndDelete(id);
//     res.status(200).json({ message: 'Post deleted' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

exports.deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the post by its ID
    const post = await Post.findById(id);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the logged-in user is the author of the post
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to delete this post' });
    }

    // If the user is the author, delete the post
    await post.deleteOne();

    // Send a response indicating the post has been deleted
    res.status(200).json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
