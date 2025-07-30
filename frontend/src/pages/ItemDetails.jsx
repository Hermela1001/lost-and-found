import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css'; // adjust if your CSS is elsewhere

const dummyListings = [
  {
    id: '1',
    image: 'Backpack.jpg',
    title: 'Lost: Backpack',
    description: 'Black backpack with books',
    location: 'Library',
    contact: 'alice@example.com',
  },
  {
    id: '2',
    image: 'waterbottle.jpg',
    title: 'Found: Water Bottle',
    description: 'Blue water bottle near the library',
    location: 'Cafeteria',
    contact: 'bob@example.com',
  },
  {
    id: '3',
    image: 'laptop.jpg',
    title: 'Lost: Laptop',
    description: 'Silver laptop in a black case',
    location: 'Lecture Hall B',
    contact: 'carol@example.com',
  },
  {
    id: '4',
    image: 'keys.jpg',
    title: 'Found: Keys',
    description: 'Set of keys with a keychain',
    location: 'Gym',
    contact: 'dave@example.com',
  },
];

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const item = dummyListings.find((item) => item.id === id);

  if (!item) {
    return (
      <div className="item-details not-found">
        <h2>Item Not Found</h2>
        <button className="btn green" onClick={() => navigate('/')}>
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="item-details">
      <button className="btn back-btn" onClick={() => navigate('/')}>
        ← Back
      </button>
      <img src={`/${item.image}`} alt={item.title} className="detail-image" />
      <h2>{item.title}</h2>
      <p>{item.description}</p>
      <p><strong>Location:</strong> {item.location}</p>
      <p><strong>Contact:</strong> {item.contact}</p>
    </div>
  );
};

export default ItemDetails;
