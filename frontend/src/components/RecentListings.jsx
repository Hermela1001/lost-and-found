// src/components/RecentListings.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListingCard from "./ListingCard";
import "../App.css";

const staticListings = [
  {
    id: "1",
    image: "Backpack.jpg",
    title: "Lost: Backpack",
    description: "Black backpack with books",
  },
  {
    id: "2",
    image: "waterbottle.jpg",
    title: "Found: Water Bottle",
    description: "Blue water bottle near the library",
  },
  {
    id: "3",
    image: "laptop.jpg",
    title: "Lost: Laptop",
    description: "Silver laptop in a black case",
  },
  {
    id: "4",
    image: "keys.jpg",
    title: "Found: Keys",
    description: "Set of keys with a keychain",
  },
];

const RecentListing = () => {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState("");

  const fetchListings = async () => {
    try {
      const response = await fetch("http://localhost:3000/items", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch items");

      const data = await response.json();

      const backendListings = data.map((item) => ({
        id: `backend-${item.id}`,
        linkId: item.id,
        image: item.image_url || "placeholder.jpg",
        title: `${item.status === "lost" ? "Lost" : "Found"}: ${item.title}`,
        description: item.description,
        isStatic: false,
      }));

      const staticListingsWithPrefix = staticListings.map((item) => ({
        ...item,
        id: `static-${item.id}`,
        isStatic: true,
      }));

      setListings([...backendListings, ...staticListingsWithPrefix]);
      setError("");
    } catch (err) {
      console.error("Error fetching listings:", err);
      setError("Could not load latest listings. Showing offline items.");

      setListings(staticListings.map(item => ({
        ...item,
        id: `static-${item.id}`,
        isStatic: true,
      })));
    }
  };

  useEffect(() => {
    fetchListings();
    const interval = setInterval(fetchListings, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="recent" id="recent">
      <h2>Recent Listings</h2>
      {error && <p className="error">{error}</p>}
      <div className="cards">
        {listings.map((item) => (
          <div key={item.id} className="listing-with-actions">
            {item.isStatic ? (
              <ListingCard
                image={item.image}
                title={item.title}
                description={item.description}
              />
            ) : (
              <Link to={`/items/${item.linkId}`} style={{ textDecoration: "none", color: "inherit" }}>
                <ListingCard
                  image={item.image}
                  title={item.title}
                  description={item.description}
                />
              </Link>
            )}
          </div>
        ))}
      </div>

      <div className="center-button">
        <button className="view-btn">View All Listings</button>
      </div>
    </section>
  );
};

export default RecentListing;
