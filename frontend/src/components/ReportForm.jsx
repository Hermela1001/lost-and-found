import React, { useState } from "react";
import "./ReportForm.css";

const ReportForm = () => {
  const [shareContact, setShareContact] = useState(false);

  return (
    <div className="report-form-container">
      <h2>Report Lost or Found Item</h2>

      <form className="report-form">
        <label>Item Title</label>
        <input type="text" placeholder="e.g., Backpack, Phone, Keys" />

        <label>Description</label>
        <textarea placeholder="Describe the item in detail, including color, brand, and any distinguishing features." />

        <label>Location</label>
        <select>
          <option value="">Select Location</option>
          <option value="Library">Library</option>
          <option value="Cafeteria">Cafeteria</option>
          <option value="classroom">classroom</option>
        </select>

        <div className="map-preview">
          <img src="map.png" alt="Map" />
        </div>

        <label>Image</label>
        <input type="file" className="file-upload" />

        <div className="toggle-section">
          <label>Share Contact Information</label>
          <p className="toggle-description">Enable to share your contact information with the finder or owner.</p>
          <label className="switch">
            <input type="checkbox" checked={shareContact} onChange={() => setShareContact(!shareContact)} />
            <span className="slider round"></span>
          </label>
        </div>

        <button type="submit" className="submit-btn">Submit Report</button>
      </form>
    </div>
  );
};

export default ReportForm;
