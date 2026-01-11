import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/Booking.css";
import emailjs from "emailjs-com";

const Booking = () => {
  const { id } = useParams();

  const [car, setCar] = useState(null);
  const [locations, setLocations] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    location: ""
  });

  // Fetch available Subaru locations from backend
  useEffect(() => {
    fetch("http://localhost:8080/backend/locations")
      .then(res => res.json())
      .then(data => setLocations(data))
      .catch(err => console.error("Location fetch error:", err));
  }, []);

  // Fetch details of the selected car using its ID
  useEffect(() => {
    fetch(`http://localhost:8080/backend/products?id=${id}`)
      .then(res => res.json())
      .then(data => setCar(data))
      .catch(err => console.error("Car fetch error:", err));
  }, [id]);

  // Update form state when input values change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle booking form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic form validation before submission
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.date ||
      !form.location
    ) {
      alert("Please fill in all fields.");
      return;
    }

    // Simple phone number format check
    if (!/^[0-9]{8,15}$/.test(form.phone)) {
      alert("Invalid phone number.");
      return;
    }

    const templateParams = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      date: form.date,
      car: car.modelName,
      location: form.location
    };

    // Send booking confirmation email using EmailJS
    emailjs
      .send(
        "service_06zvrqu",
        "template_30sab79",
        templateParams,
        "ev5UzQLhnL_eRxcDT"
      )
      .then(() => {
        alert("Booking confirmed! Email sent.");
      })
      .catch(() => {
        alert("Booking confirmed (demo mode).");
      });
  };

  if (!car) return <div className="loading">Loading...</div>;

  return (
    <div className="booking-page">
      <h1 className="booking-title">Book {car.modelName}</h1>

      <div className="booking-card">
        <img src={car.sideImageUrl} alt={car.modelName} />

        <form className="booking-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
          />

          <input
            type="date"
            name="date"
            onChange={handleChange}
          />

          <select
            name="location"
            value={form.location}
            onChange={handleChange}
            required
          >
            <option value="">Select Subaru Location</option>

            {locations.map((loc, index) => (
              <option
                key={index}
                value={`${loc.city}, ${loc.state}`}
              >
                {loc.city}, {loc.state}
              </option>
            ))}
          </select>

          <button type="submit">Confirm Booking</button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
