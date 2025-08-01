import React, { useState } from "react";
import "./ReportForm.css";

const ReportForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("lost");
  const [dateFound, setDateFound] = useState("");
  const [category, setCategory] = useState("");
  const [shareContact, setShareContact] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title || !description || !location || !status) {
      setError("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("status", status);
    formData.append("date_found", dateFound);
    formData.append("category", category);
    if (imageFile) formData.append("image", imageFile);
    formData.append("share_contact", shareContact);

    try {
      const res = await fetch("http://localhost:3000/items", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Report submitted successfully!");
        setTimeout(() => setSuccess(""), 3000); // Optional UX improvement

        // Reset form fields
        setTitle("");
        setDescription("");
        setLocation("");
        setStatus("lost");
        setDateFound("");
        setCategory("");
        setImageFile(null);
        setImagePreview(null);
        setShareContact(false);
      } else {
        setError(data.error || data.errors?.join(", ") || "Submission failed.");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="report-form-container">
      <h2>Report Lost or Found Item</h2>

      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}

      <form className="report-form" onSubmit={handleSubmit}>
        <label>Item Title</label>
        <input
          type="text"
          placeholder="e.g., Backpack, Phone, Keys"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Description</label>
        <textarea
          placeholder="Describe the item in detail, including color, brand, and any distinguishing features."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)} required>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>

        <label>Location</label>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        >
          <option value="">Select Location</option>
          <option value="Library">Library</option>
          <option value="Cafeteria">Cafeteria</option>
          <option value="Classroom">Classroom</option>
        </select>

        <label>Date Found</label>
        <input
          type="date"
          value={dateFound}
          onChange={(e) => setDateFound(e.target.value)}
        />

        <label>Category</label>
        <input
          type="text"
          placeholder="e.g., Electronics, Clothing"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <div className="map-preview">
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" />
          ) : (
            <img src="map.png" alt="Map" />
          )}
        </div>

        <label>Image</label>
        <input
          type="file"
          className="file-upload"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
          }}
        />

        <div className="toggle-section">
          <label>Share Contact Information</label>
          <p className="toggle-description">
            Enable to share your contact information with the finder or owner.
          </p>
          <label className="switch">
            <input
              type="checkbox"
              checked={shareContact}
              onChange={() => setShareContact(!shareContact)}
            />
            <span className="slider round"></span>
          </label>
        </div>

        <button type="submit" className="submit-btn">
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default ReportForm;
