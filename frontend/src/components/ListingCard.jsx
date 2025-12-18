
import React from 'react';
import { Link } from 'react-router-dom'; 
import '../App.css';

const ListingCard = ({ image, title, description }) => {
  const encodedTitle = encodeURIComponent(title); 

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
