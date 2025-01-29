import React from 'react';

const PostCard = ({ post, onDelete, onEdit }) => (
  <div className="card mb-3 shadow-sm">
    <img src={post.image} className="card-img-top" alt="Post" style={{ objectFit: 'cover', width: '100%', height: '400px', borderTopLeftRadius: '0.25rem', borderTopRightRadius: '0.25rem' }}/>
    <div className="card-body">
      <h5 className="card-title">{post.title}</h5>
      <p className="card-text">{post.content}</p>
      <p className="card-text">
        <small className="text-muted">Author: {post.author?.name}</small>
      </p>
      <div className="d-flex justify-content-between">
        <button className="btn btn-primary" onClick={() => onEdit(post)}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(post._id)}>
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default PostCard;
