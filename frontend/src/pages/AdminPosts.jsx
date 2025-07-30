// src/pages/AdminPosts.jsx
import React, { useState } from 'react';
import '../AdminPosts.css'; // ✅ updated path

const posts = [
  { title: 'Lost: Wallet', category: 'Personal Items', status: 'Pending' },
  { title: 'Found: Keys', category: 'Personal Items', status: 'Verified' },
  { title: 'Lost: Backpack', category: 'Personal Items', status: 'Matched' },
  { title: 'Found: Phone', category: 'Electronics', status: 'Pending' },
  { title: 'Lost: Laptop', category: 'Electronics', status: 'Verified' },
];

const AdminPosts = () => {
  const [filter, setFilter] = useState('All');

  const filteredPosts = posts.filter((post) => {
    if (filter === 'All') return true;
    return post.title.toLowerCase().startsWith(filter.toLowerCase());
  });

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2 className="logo">CampusConnect</h2>
        <nav>
          <ul>
            <li>Dashboard</li>
            <li className="active">Posts</li>
            <li>Users</li>
            <li>Categories</li>
            <li>Settings</li>
          </ul>
        </nav>
        <div className="help">❓ Help and feedback</div>
      </aside>

      <main className="admin-main">
        <h1>Posts</h1>
        <p className="subtext">Manage posts from users</p>

        <div className="tabs">
          {['All', 'Lost', 'Found'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={filter === tab ? 'tab active-tab' : 'tab'}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="search-bar">
          <input type="text" placeholder="🔍 Search posts" />
        </div>

        <table className="posts-table">
          <thead>
            <tr>
              <th>Post</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.map((post, index) => (
              <tr key={index}>
                <td>{post.title}</td>
                <td className="category">{post.category}</td>
                <td><span className={`status ${post.status.toLowerCase()}`}>{post.status}</span></td>
                <td className="view-link">View</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default AdminPosts;
