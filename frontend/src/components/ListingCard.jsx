// src/components/ListingCard.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // ✅ Import Link
import '../App.css';

const ListingCard = ({ image, title, description }) => {
  const encodedTitle = encodeURIComponent(title); // Optional: safer URL

  return (
    <Link to={`/item/${encodedTitle}`} className="card-link">
      <div className="card">
        <img src={image} alt={title} />
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );
};

export default ListingCard;
