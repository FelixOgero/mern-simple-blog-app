import React, { useEffect, useState } from 'react';
// import API from '../api/api';
// import PostCard from '../components/PostCard';

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="display-4 fw-bold mb-4">Welcome to Our Blog</h1>
        <p className="lead text-muted">
          Discover engaging articles, insightful stories, and the latest updates. 
          Stay informed and inspired!
        </p>
        <a href="/" className="btn btn-primary btn-lg mt-3">
          Learn More About Us
        </a>
      </div>
    </div>
  );
};

export default Home;