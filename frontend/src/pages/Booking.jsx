import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/Booking.css";
import emailjs from "emailjs-com";

const Booking = () => {
  const { id } = useParams();

  const [car, setCar] = useState(null);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    location: ""
  });

  // 🔹 Fetch selected car
  useEffect(() => {
    fetch(`http://localhost:8080/backend/products?id=${id}`)
      .then(res => res.json())
      .then(data => setCar(data))
      .catch(err => console.error("Error fetching car:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    // 🔹 Detect selected location object
    if (name === "location") {
      const loc = locations.find(
        l => `${l.name} (${l.city})` === value
      );
      setSelectedLocation(loc || null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔒 Validation
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.date 
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (!/^[0-9]{8,15}$/.test(form.phone)) {
      alert("Please enter a valid phone number.");
      return;
    }

    const templateParams = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      date: form.date,
      car: car.modelName,
      location: form.location,
      address: selectedLocation?.address || ""
    };

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
        alert("Booking confirmed, but email failed (demo).");
      });
  };

  if (!car) return <div className="loading">Loading booking...</div>;

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
            required
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            onChange={handleChange}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            required
            onChange={handleChange}
          />

          <input
            type="date"
            name="date"
            required
            onChange={handleChange}
          />


          <button type="submit">Confirm Booking</button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
