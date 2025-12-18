import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ItemDetails.css"; 

const ItemDetails = ({ currentUserId }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "",
    location: "",
    date_found: "",
    category: "",
    image: null,
    share_contact: false,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [deleteMsg, setDeleteMsg] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("Invalid item ID.");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:3000/items/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch item details");
        return res.json();
      })
      .then((data) => {
        setItem(data);
        setForm({
          title: data.title || "",
          description: data.description || "",
          status: data.status || "",
          location: data.location || "",
          date_found: data.date_found?.split("T")[0] || "",
          category: data.category || "",
          image: null,
          share_contact: data.share_contact || false,
        });
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (name === "image") {
      setForm((prev) => ({ ...prev, image: files[0] }));
    } else if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key] !== null) {
        formData.append(`item[${key}]`, form[key]);
      }
    });

    fetch(`http://localhost:3000/items/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.errors?.join(", ") || "Update failed");
          });
        }
        return res.json();
      })
      .then((updatedItem) => {
        setItem(updatedItem);
        setSuccessMsg("✅ Item updated successfully.");
        setForm((prev) => ({ ...prev, image: null }));
      })
      .catch((e) => setError(e.message));
  };

  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    fetch(`http://localhost:3000/items/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          setDeleteMsg("🗑️ Item deleted successfully.");
          setTimeout(() => {
            navigate("/admin-posts");
          }, 1500);
        } else {
          throw new Error("Failed to delete item");
        }
      })
      .catch((e) => setError(e.message));
  };

  if (loading) return <p>Loading item details...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;
  if (!item) return <p>Item not found.</p>;

  const isOwner = item.user_id === currentUserId;

  return (
    <div className="report-form-container">
      <button onClick={() => navigate("/admin-posts")} className="back-button">
        ← Back
      </button>
      <h2>Edit / View Item</h2>

      {successMsg && <p className="success-message">{successMsg}</p>}
      {deleteMsg && <p className="success-message">{deleteMsg}</p>}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleUpdate} className="report-form">
        <label>Title:</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          type="text"
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
        />

        <label>Status:</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>

        <label>Location:</label>
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          type="text"
        />

        <label>Date Found:</label>
        <input
          type="date"
          name="date_found"
          value={form.date_found}
          onChange={handleChange}
          max={new Date().toISOString().split("T")[0]}
        />

        <label>Category:</label>
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          type="text"
        />

        <label>Image:</label>
        {item.image_url && (
          <div className="map-preview">
            <img
              src={`http://localhost:3000${item.image_url}`}
              alt="Item"
            />
          </div>
        )}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="file-upload"
        />

        <div className="toggle-section">
          <label className="switch">
            <input
              type="checkbox"
              name="share_contact"
              checked={form.share_contact}
              onChange={handleChange}
            />
            <span className="slider"></span>
          </label>
          <p className="toggle-description">Share contact with finder</p>
        </div>

        {isOwner ? (
          <>
            <button type="submit" className="submit-btn">
              Update
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="submit-btn"
              style={{ backgroundColor: "#e53935" }}
            >
              Delete
            </button>
          </>
        ) : (
          <p>You do not have permission to modify this item.</p>
        )}
      </form>
    </div>
  );
};

export default ItemDetails;
