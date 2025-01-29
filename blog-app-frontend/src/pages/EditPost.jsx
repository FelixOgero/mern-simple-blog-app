// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import API from '../api/api';

// const EditPost = () => {
//   const { state: post } = useLocation();
//   const [title, setTitle] = useState(post.title);
//   const [content, setContent] = useState(post.content);
//   const [image, setImage] = useState(post.image);
//   const navigate = useNavigate();

//   const handleUpdatePost = async (e) => {
//     e.preventDefault();
//     try {
//       await API.put(`/posts/${post._id}`, { title, content, image });
//       navigate('/dashboard');
//     } catch (err) {
//       console.error(err.response?.data?.message || 'Failed to update post');
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h1>Edit Post</h1>
//       <form onSubmit={handleUpdatePost}>
//         <div className="mb-3">
//           <label>Title</label>
//           <input
//             type="text"
//             className="form-control"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label>Content</label>
//           <textarea
//             className="form-control"
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label>Image URL</label>
//           <input
//             type="text"
//             className="form-control"
//             value={image}
//             onChange={(e) => setImage(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Update Post
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditPost;



import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../api/api';

const EditPost = () => {
  const { state: post } = useLocation();
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [image, setImage] = useState(post.image);
  const [error, setError] = useState(null);  // State for managing error message
  const navigate = useNavigate();

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/posts/${post._id}`, { title, content, image });
      navigate('/dashboard');
    } catch (err) {
      // Check for the specific error response and show the message
      if (err.response?.status === 403) {
        setError('You are not authorized to edit this post');
      } else {
        setError(err.response?.data?.message || 'Failed to update post');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1>Edit Post</h1>
      
      {/* Display error notification if there's an error */}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleUpdatePost}>
        <div className="mb-3">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Content</label>
          <textarea
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Image URL</label>
          <input
            type="text"
            className="form-control"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;




// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import API from '../api/api';

// const EditPost = () => {
//   const { state: post } = useLocation();
//   const [title, setTitle] = useState(post.title);
//   const [content, setContent] = useState(post.content);
//   const [image, setImage] = useState(post.image);
//   const [isAuthor, setIsAuthor] = useState(false);
//   const navigate = useNavigate();

//   // Get the logged-in user's ID (assuming it's stored in localStorage)
//   const loggedInUserId = localStorage.getItem('userId');

//   useEffect(() => {
//     // Check if the logged-in user is the author of the post
//     if (post.author._id === loggedInUserId) {
//       setIsAuthor(true);
//     } else {
//       setIsAuthor(false);
//     }
//   }, [post, loggedInUserId]);

//   const handleUpdatePost = async (e) => {
//     e.preventDefault();
//     try {
//       await API.put(`/posts/${post._id}`, { title, content, image });
//       navigate('/dashboard');
//     } catch (err) {
//       console.error(err.response?.data?.message || 'Failed to update post');
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h1>Edit Post</h1>
//       <form onSubmit={handleUpdatePost}>
//         <div className="mb-3">
//           <label>Title</label>
//           <input
//             type="text"
//             className="form-control"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label>Content</label>
//           <textarea
//             className="form-control"
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label>Image URL</label>
//           <input
//             type="text"
//             className="form-control"
//             value={image}
//             onChange={(e) => setImage(e.target.value)}
//             required
//           />
//         </div>
//         <button 
//           type="submit" 
//           className="btn btn-primary"
//           disabled={!isAuthor}  // Disable the button if not the author
//         >
//           Update Post
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditPost;

