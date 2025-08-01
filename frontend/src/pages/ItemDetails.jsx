import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ItemDetails = ({ currentUserId, onBack }) => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "",
    location: "",
    date_found: "",
    category: "",
    image: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  useEffect(() => {
    console.log("Fetching item with ID:", id);

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
        console.log("Fetched item:", data);
        setItem(data);
        setForm({
          title: data.title || "",
          description: data.description || "",
          status: data.status || "",
          location: data.location || "",
          date_found: data.date_found?.split("T")[0] || "",
          category: data.category || "",
          image: null,
        });
        setLoading(false);
      })
      .catch((e) => {
        console.error("Error fetching item:", e);
        setError(e.message);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm((prev) => ({ ...prev, image: files[0] }));
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
        Authorization: localStorage.getItem("token"),
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
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (res.ok) {
          alert("Item deleted.");
          onBack?.();
        } else {
          throw new Error("Failed to delete item");
        }
      })
      .catch((e) => setError(e.message));
  };

  if (loading) return <p>Loading item details...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!item) return <p>Item not found.</p>;

  const isOwner = item.user_id === currentUserId;

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "1rem" }}>
      <button onClick={onBack} style={{ marginBottom: "1rem" }}>
        ← Back
      </button>

      <h2>Item Details</h2>

      <form onSubmit={handleUpdate}>
        <label>
          Title:
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
        </label>
        <br />

        <label>
          Description:
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </label>
        <br />

        <label>
          Status:
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          >
            <option value="">Select</option>
            <option value="Lost">Lost</option>
            <option value="Found">Found</option>
          </select>
        </label>
        <br />

        <label>
          Location:
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </label>
        <br />

        <label>
          Date Found:
          <input
            type="date"
            name="date_found"
            value={form.date_found}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </label>
        <br />

        <label>
          Category:
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </label>
        <br />

        <label>
          Image:
          <br />
          {item.image_url && (
            <img
              src={item.image_url}
              alt="Item"
              style={{ maxWidth: "200px", marginBottom: "10px" }}
            />
          )}
          <input type="file" name="image" accept="image/*" onChange={handleChange} />
        </label>
        <br />

        {isOwner ? (
          <>
            <button type="submit">Update</button>
            <button
              type="button"
              onClick={handleDelete}
              style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}
            >
              Delete
            </button>
          </>
        ) : (
          <p>You cannot edit or delete this item.</p>
        )}
      </form>

      {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
    </div>
  );
};

export default ItemDetails;
