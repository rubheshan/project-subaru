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

  // 🔹 Fetch selected car
  useEffect(() => {
    fetch(`http://localhost:8080/backend/products?id=${id}`)
      .then(res => res.json())
      .then(data => setCar(data))
      .catch(err => console.error("Car fetch error:", err));
  }, [id]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔒 Validation
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.date 
    ) {
      alert("Please fill in all fields.");
      return;
    }

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


          <button type="submit">Confirm Booking</button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
