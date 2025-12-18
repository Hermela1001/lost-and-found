import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../AdminPosts.css';

const AdminPosts = () => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:3000/items', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch items');
      }

      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) => {
    if (filter !== 'All' && post.status.toLowerCase() !== filter.toLowerCase()) return false;
    if (searchTerm && !post.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
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
          <input
            type="text"
            placeholder="🔍 Search posts"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <p>Loading posts...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>Error: {error}</p>
        ) : (
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
              {filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center' }}>
                    No posts found.
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr key={post.id}>
                    <td>{post.title}</td>
                    <td className="category">{post.category}</td>
                    <td>
                      <span className={`status ${post.status.toLowerCase()}`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="view-link">
                      <button onClick={() => navigate(`/items/${post.id}`)}>
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
};

export default AdminPosts;
