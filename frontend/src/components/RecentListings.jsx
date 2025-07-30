import React from 'react';
import ListingCard from './ListingCard';
import '../App.css';

const listings = [
  {
    image: 'Backpack.jpg',
    title: 'Lost: Backpack',
    description: 'Black backpack with books',
  },
  {
    image: 'waterbottle.jpg',
    title: 'Found: Water Bottle',
    description: 'Blue water bottle near the library',
  },
  {
    image: 'laptop.jpg',
    title: 'Lost: Laptop',
    description: 'Silver laptop in a black case',
  },
  {
    image: 'keys.jpg',
    title: 'Found: Keys',
    description: 'Set of keys with a keychain',
  },
];

const RecentListing = () => {
  return (
    <section className="recent" id="recent">
      <h2>Recent Listings</h2>
      <div className="cards">
        {listings.map((item, idx) => (
          <ListingCard key={idx} {...item} />
        ))}
      </div>
      <div className="center-button">
        <button className="view-btn">View All Listings</button>
      </div>
    </section>
  );
};

export default RecentListing;
